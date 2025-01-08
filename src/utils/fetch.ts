import { GoogleApiError, type GoogleApiErrorResponseBody } from "@/errors/google-api-error.js";
import type { EndpointParameters } from "@/tenor.types.js";
import { createUrlParameters, renameParameters } from "@/utils/parameters.js";

/**
 * Fetches the response of Tenor's API using the passed URL path and query string.
 *
 * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
 * content as JSON.
 * @param path The URL path and query string to fetch.
 * @returns An object containing the fetched response's body.
 * @throws {GoogleApiError} if the Google API server generates an error.
 * @throws All errors thrown by `fetch()` for the same reasons.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`} for
 * more information about the function.
 */
export async function fetchTenorApi<TEndpointResponseBody extends object>(
  path: string,
): Promise<TEndpointResponseBody> {
  const response = await fetch(new URL(path, "https://tenor.googleapis.com/v2/"));
  const jsonResponse = await response.json();

  if (!response.ok) throw new GoogleApiError((jsonResponse as GoogleApiErrorResponseBody).error);

  return jsonResponse as TEndpointResponseBody;
}

/**
 * Fetches the response of the passed Tenor API endpoint with the passed endpoint parameters.
 *
 * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
 * content as JSON.
 * @param resourceName The resource name of the endpoint to fetch.
 * @param parameters An object containing the parameters of the endpoint to fetch.
 * @returns An object containing the fetched response's body.
 * @throws {GoogleApiError} if the Google API server generates an error.
 * @throws All errors thrown by `fetch()` for the same reasons.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`} for
 * more information about the function.
 */
export async function fetchTenorApiEndpoint<TEndpointResponseBody extends object>(
  resourceName:
    | "search"
    | "featured"
    | "categories"
    | "search_suggestions"
    | "autocomplete"
    | "trending_terms"
    | "registershare"
    | "posts",
  parameters: Readonly<EndpointParameters>,
): Promise<TEndpointResponseBody> {
  return fetchTenorApi(`${resourceName}?${createUrlParameters(renameParameters(parameters)).toString()}`);
}
