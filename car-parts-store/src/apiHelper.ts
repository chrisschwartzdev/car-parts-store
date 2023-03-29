import { stringify } from "qs";
import { SessionManager } from "./sessionManager";

const mapResponseData = async (response: Response) => response.headers.has('content-type') ? await response.json() : null;

const dataMethods = ["POST", "PUT"]
const getRequestInit = (method: "POST" | "GET" | "PUT" | "DELETE", data?: any): RequestInit => {
  const isDataMethod = dataMethods.includes(method);
  const baseHeaders = {};
  const headers = isDataMethod ? { ...baseHeaders, "Content-Type": "application/json" } : baseHeaders;

  return ({
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: isDataMethod ? JSON.stringify(data) : undefined,
  })
}

const apiRoot = "https://localhost:7024/"

const catchUnauthorize = (response: Response) => {
  if (![401, 403].includes(response.status))
    return;

  console.log('Redirecting because received unauthorized / forbidden.')
  SessionManager.clear();
  document.location = '/';
}

export const apiPost = async (url = "", data = {}) => {
  const response = await fetch(apiRoot + url, getRequestInit("POST", data));
  catchUnauthorize(response);
  return { ok: response.ok, status: response.status, data: await mapResponseData(response) };
}

export const apiGet = async (url: string, query: any = null) => {
  const queryString = stringify(query);
  const response = await fetch(`${apiRoot}${url}?${queryString}`, getRequestInit("GET"));
  catchUnauthorize(response);
  return { ok: response.ok, status: response.status, data: await mapResponseData(response) };
}

export const apiDelete = async (url = "", query = "") => {
  const response = await fetch(`${apiRoot}${url}/${query}`, getRequestInit("DELETE"));
  catchUnauthorize(response);
  return { ok: response.ok, status: response.status, data: await mapResponseData(response) };
}