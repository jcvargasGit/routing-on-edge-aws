import { expect } from "chai";
import { fetchAsJson, fetchLocalJSON } from "../utils/fetch-routes.js";
import sinon from "sinon";
import fetch from "node-fetch";

const jsonURl = "https://example.com";

const getSuccessPromise = (data) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  });

const errorPromise = Promise.resolve({
  ok: false,
});

const mockFetch = (promise) => sinon.stub(fetch, "Promise").returns(promise);
const mockFetchSuccess = (response) => mockFetch(getSuccessPromise(response));
const mockFetchError = () => mockFetch(errorPromise);

describe("fetchAsJson function", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("On success should return a JSON object", async () => {
    mockFetchSuccess({ foo: "bar" });
    const response = await fetchAsJson(jsonURl);
    expect(response).to.deep.equal({ foo: "bar" });
  });

  it("On error must throw an error", async () => {
    mockFetchError();
    let noError = false;
    try {
      await fetchAsJson(jsonURl);
      noError = true;
    } catch (error) {
      expect(error).to.exist;
    }

    if (noError) {
      expect.fail("Error not thrown");
    }
  });
});
