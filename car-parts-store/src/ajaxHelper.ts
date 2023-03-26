const mapResponseData = async (response: Response) => response.headers.has('content-type') ? await response.json() : null;

const dataMethods = ["POST", "PUT"]
const getRequestInit = (method: "POST" | "GET" | "PUT" | "DELETE", data?: any): RequestInit => {
  const isDataMethod = dataMethods.includes(method);
  return ({
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: isDataMethod
      ? {
        "Content-Type": "application/json",
      }
      : {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: isDataMethod ? JSON.stringify(data) : undefined,
  })
}

const apiRoot = "https://localhost:7024/"

export const post = async (url = "", data = {}) => {
  const response = await fetch(apiRoot + url, getRequestInit("POST", data));
  return { ok: response.ok, status: response.status, data: await mapResponseData(response) };
}

export const get = async (url: string) => {
  const response = await fetch(apiRoot + url, getRequestInit("GET"));
  return { ok: response.ok, status: response.status, data: await mapResponseData(response) };
}