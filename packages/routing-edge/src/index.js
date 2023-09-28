import { myLog } from "./utils/my-log.js";
import { mapRequestToCloudfrontByCatalog } from "./utils/handle-request.js";

import {
  fetchUrlOrNull as fetchCatalogFile,
  fetchLocalJSON,
} from "./utils/fetch-routes.js";

let frontEndCatalog = null;
export const CDN_CATALOG_URI = "https://d1wub6s1ympoc5.cloudfront.net/routes/frontend-catalog.json";

export const handler = async (event) => {
  let request = event.Records[0].cf.request;
  myLog.info(" >>> Initial request", JSON.stringify(request));

  if (request.method !== "GET") {
    return request;
  }

  const catalog = await getFrontendCatalog();
  request = mapRequestToCloudfrontByCatalog(request, catalog);

  myLog.info(`\n <<< Final Requests`, JSON.stringify(request));
  return request;
};

async function getFrontendCatalog() {
  //This lines are commented for example purposes, uncomment them to use the CDN
  // if (frontEndCatalog) {
  //   return frontEndCatalog;
  // }
  frontEndCatalog =
    await fetchCatalogFile(CDN_CATALOG_URI) ||
    fetchLocalJSON("../routes/frontend-catalog.json");
  return frontEndCatalog;
}
