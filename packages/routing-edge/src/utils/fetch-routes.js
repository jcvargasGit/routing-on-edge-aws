import fetch from "node-fetch";
import { myLog } from "./my-log.js";
import { readFile } from "fs/promises";

export async function fetchUrlOrNull(url) {
  try {
    return await fetchAsJson(url);
  } catch (error) {
    myLog.error(`error on fetch ${url} : `, error);
    return null;
  }
}

export async function fetchAsJson(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(
    `Error fetching routes from CDN: ${response.status} ${response.statusText}`
  );
}

export async function fetchLocalJSON(route) {
  const url = new URL(route, import.meta.url);
  const file = await readFile(url);
  return JSON.parse(file);
}
