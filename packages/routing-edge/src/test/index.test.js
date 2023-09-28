import { expect } from "chai";
import LambdaTester from "lambda-tester";
import lambdaEventMock from "lambda-event-mock";
import nock from "nock";
import { handler, CDN_CATALOG_URI } from "../index.js";
import { fetchLocalJSON } from "../utils/fetch-routes.js";

const frontEndCatalogMock = {
  "/index.html": {
    originDomain: "d1zy0jbltv73es.cloudfront.net", 
    uri: "/default/index.html",
  },
  "/mfe1": {
    originDomain: "d1zy0jbltv73es.cloudfront.net", 
    uri: "/pages/mfe1/latest/index.html",
  },
  "/mfe2": {
    originDomain: "d1zy0jbltv73es.cloudfront.net", 
    uri: "/pages/mfe2/latest/index.html",
  },
  "/mfe3": {
    originDomain: "d1zy0jbltv73es.cloudfront.net", 
    uri: "/pages/mfe3/latest/index.html",
  },
};

function createEvent() {
  return lambdaEventMock
    .cloudfront()
    .distributionDomainName("d123.cloudfront.net")
    .distributionId("EDFDVBD6EXAMPLE")
    .eventType("viewer-request")
    .requestId("MRVMF7KydIvxMWfJIglgwHQwZsbG2IhRJ07sn9AkKUFSHS9EXAMPLE==")
    .body({
      action: "read-only",
      data: "eyJ1c2VybmFtZSI6IkxhbWJkYUBFZGdlIiwiY29tbWVudCI6IlRoaXMgaXMgcmVxdWVzdCBib2R5In0=",
      encoding: "base64",
      inputTruncated: false,
    })
    .clientIp("2001:0db8:85a3:0:0:8a2e:0370:7334")
    .querystring("size=large")
    .uri("/cloud-mfe1")
    .method("GET")
    .header("host", "Host", "d111111abcdef8.cloudfront.net")
    .header("user-agent", "User-Agent", "curl/7.51.0")
    .origin({
      s3: {
        authMethod: "none",
        customHeaders: {
          CDN_CATALOG_URI: [
            {
              key: "CDN_CATALOG_URI",
              value: "d1zy0jbltv73es.cloudfront.net",
            },
          ],
        },
        domainName: "orion-assets-library.s3.us-east-1.amazonaws.com",
        path: "",
      },
    });
}

afterEach(() => {
  nock.cleanAll();
});

describe("Testing request with cloud catalog success", () => {
  beforeEach(() => {
    nock(CDN_CATALOG_URI).get("").reply(200, frontEndCatalogMock);
  });

  describe("should return the same request when", () => {
    it("the request method is not GET", async () => {
      const event = createEvent().method("POST").build();
      const { request } = event.Records[0].cf;
      await LambdaTester(handler)
        .event(event)
        .expectResult((result) => {
          expect(result).to.deep.equal(request);
        });
    });

    it("the request uri is not part of the frontEndCatalogMock", async () => {
      const event = createEvent().uri("/a-route-not-in-the-catalog").build();
      const { request } = event.Records[0].cf;

      await LambdaTester(handler)
        .event(event)
        .expectResult((finalRequest) => {
          expect(finalRequest).to.deep.equal(request);
        });
    });

    it("the request uri has similar structure of cloudfront catalog but in different order", async () => {
      const event = createEvent().uri("/router/mfe1").build();
      const { request } = event.Records[0].cf;

      await LambdaTester(handler)
        .event(event)
        .expectResult((finalRequest) => {
          expect(finalRequest).to.deep.equal(request);
        });
    });

    it("the lambda event doesn't have cloud formation structure ", async () => {
      nock(CDN_CATALOG_URI).get("").reply(404, frontEndCatalogMock);
      await LambdaTester(handler)
        .event({ Records: [{ cf: { request: {} } }] })
        .expectResult((finalRequest) => {
          expect(finalRequest).to.deep.equal({});
        });
    });
  });

  describe("should return a modified CF request when", () => {
    it("the request uri is exactly contained on the cloud catalog", async function () {
      const event = createEvent().uri("/mfe1").build();
      await LambdaTester(handler)
        .event(event)
        .expectResult((finalRequest) => {
          expect(finalRequest.uri).to.equal(
            frontEndCatalogMock["/mfe1"].uri
          );
        });
    });

    it("the request uri partially contains a route in the cloud catalog ", async function () {
      const event = createEvent()
        .uri("/mfe1/products/new")
        .build();
      await LambdaTester(handler)
        .event(event)
        .expectResult((finalRequest) => {
          expect(finalRequest.uri).to.equal(
            frontEndCatalogMock["/mfe1"].uri
          );
        });
    });

    it("the request uri is exactly contained on the cloud catalog index.html", async function () {
      const event = createEvent().uri("/index.html").build();
      await LambdaTester(handler)
        .event(event)
        .expectResult((finalRequest) => {
          expect(finalRequest.uri).to.equal(
            frontEndCatalogMock["/index.html"].uri
          );
        });
    });
  });
});

describe("Testing front-end with cloud catalog error", () => {
  let localCatalog;
  let catalogItem;
  beforeEach(async () => {
    nock(CDN_CATALOG_URI).get("").reply(404, frontEndCatalogMock);
    localCatalog = await fetchLocalJSON("../routes/frontend-catalog.json");
    catalogItem = Object.keys(localCatalog)[0];
  });

  it("should return the same request if the uri is not part of the local catalog", async function () {
    const event = createEvent().uri("/uri-out-of-catalog").build();
    const { request } = event.Records[0].cf;
    await LambdaTester(handler)
      .event(event)
      .expectResult((finalRequest) => {
        expect(finalRequest).to.deep.equal(request);
      });
  });

  it("should return a refactored request if the uri is part of the local catalog", async function () {
    const event = createEvent().uri(catalogItem.uri).build();
    await LambdaTester(handler)
      .event(event)
      .expectResult((finalRequest) => {
        expect(finalRequest.uri).to.deep.equal(catalogItem.uri);
      });
  });
});

describe("Testing request content", () => {
  let catalogItem;
  beforeEach(() => {
    nock(CDN_CATALOG_URI).get("").reply(200, frontEndCatalogMock);
    catalogItem = Object.keys(frontEndCatalogMock)[0];
  });
  it("the request must have a valid cf host structure", async () => {
    const event = createEvent().uri(catalogItem).build();
    await LambdaTester(handler)
      .event(event)
      .expectResult((finalRequest) => {
        expect(finalRequest.headers.host).to.be.an("array");
        expect(finalRequest.headers.host[0]).to.be.an("object");
      });
  });
  it("the request must have a valid cf origin structure", async () => {
    const event = createEvent().uri(catalogItem).build();
    await LambdaTester(handler)
      .event(event)
      .expectResult((finalRequest) => {
        expect(finalRequest.origin).to.be.an("object");
        expect(finalRequest.origin.custom).to.be.an("object");
        expect(finalRequest.origin.custom.domainName).to.be.an("string");
      });
  });
});
