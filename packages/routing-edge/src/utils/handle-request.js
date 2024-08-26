export const mapRequestToCloudfrontByCatalog = (request, catalog) => {
  const catalogItem = findCatalogItemByCFuri(catalog, request.uri);
  return catalogItem
    ? mapRequestWithCatalogData(request, catalogItem)
    : request;
};

function findCatalogItemByCFuri(catalog = {}, CFuri = "") {
  const key = Object.keys(catalog).find((catalogUrl) =>
    isCloudfrontUriInCatalog(CFuri, catalogUrl)
  );

  const isDisabled = catalog[key]?.isDisabled;

  return isDisabled ? null : catalog[key];
}

function isCloudfrontUriInCatalog(cfUri, catalog) {
  const catalogArray = catalog.split("/").filter(Boolean);
  const cfUriArray = cfUri.split("/").filter(Boolean);

  if (catalogArray.length > cfUriArray.length) {
    return false;
  }

  let i = 0;
  let match = true;
  do {
    if (catalogArray[i] !== cfUriArray[i]) {
      match = false;
    }
    
    i++;
  } while (i < catalogArray.length && match );
  return match;
}

const mapRequestWithCatalogData = (request, catalogItem) => {
  const requestClone = JSON.parse(JSON.stringify(request));
  requestClone.uri = catalogItem.uri;
  const originDomain = catalogItem.originDomain;
  requestClone.origin = {
    custom: {
      domainName: originDomain,
      port: 443,
      protocol: "https",
      path: "",
      sslProtocols: ["TLSv1"],
      readTimeout: 5,
      keepaliveTimeout: 5,
      customHeaders: {},
    },
  };
  requestClone.headers = requestClone.headers || {};
  requestClone.headers.host = [
    {
      key: "Host",
      value: originDomain,
    },
  ];
  return requestClone;
};
