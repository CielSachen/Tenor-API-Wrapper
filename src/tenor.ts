import type {
  AutocompleteEndpointParameters,
  AutocompleteEndpointResponseBody,
  CategoriesEndpointParameters,
  CategoriesEndpointResponseBody,
  ContentFormat,
  EndpointParameters,
  FeaturedEndpointParameters,
  FeaturedEndpointResponseBody,
  GifCategory,
  PostsEndpointParameters,
  PostsEndpointResponseBody,
  RegisterShareEndpointParameters,
  RegisterShareEndpointResponseBody,
  SearchEndpointParameters,
  SearchEndpointResponseBody,
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseBody,
  TenorApiOptions,
  TrendingSearchTermsEndpointParameters,
  TrendingSearchTermsEndpointResponseBody,
} from "@/tenor.types.js";
import { fetchTenorApi, fetchTenorApiEndpoint } from "@/utils/fetch.js";
import { createUrlParameters, renameParameters } from "@/utils/parameters.js";

/** A wrapper for fetching Tenor's API endpoints. */
export class TenorApi {
  readonly #key: string;
  /** The options to configure the API's endpoints. */
  options?: Omit<TenorApiOptions, "key">;

  /**
   * Constructs a new Tenor API wrapper object using the passed key and parameters.
   * @param key The key to access the API.
   * @param options An object containing the options to configure the API's endpoints.
   */
  constructor(key: string, options?: Readonly<Omit<TenorApiOptions, "key">>) {
    this.#key = key;
    this.options = options;
  }

  #combineParameters(parameters?: Readonly<EndpointParameters>): Readonly<EndpointParameters> {
    return Object.freeze({ key: this.#key, ...this.options, ...parameters });
  }

  /**
   * Gets suggestions for the passed search term by fetching Tenor's Search Suggestions API endpoint with the passed
   * parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @param searchTerm The search term to get suggestions for.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of suggested search terms and their locale.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Five Search Term Suggestions
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { results: suggestedSearchTerms, locale } =
   *     await tenorApi.getSuggestedSearchTerms("smile", { limit: 5 });
   *
   *   // Handle the search term suggestions.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getSearchTermSuggestions(
    searchTerm: string,
    parameters?: Readonly<Omit<SearchSuggestionsEndpointParameters, keyof TenorApiOptions | "searchTerm">>,
  ): Promise<SearchSuggestionsEndpointResponseBody> {
    return fetchTenorApiEndpoint("search_suggestions", this.#combineParameters({ searchTerm, ...parameters }));
  }

  /**
   * Gets the autocompletes for the passed partial search term by fetching Tenor's Autocomplete API endpoint with the
   * passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @param searchTerm The partial search term to get autocompletes for.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of autocompletes and their locale.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Search Term Autocompletes
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { results: autocompletes, locale } =
   *     await tenorApi.getAutocompletes("exc");
   *
   *   // Handle the search term autocompletes.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getSearchTermAutocompletes(
    searchTerm: string,
    parameters?: Readonly<Omit<AutocompleteEndpointParameters, keyof TenorApiOptions | "searchTerm">>,
  ): Promise<AutocompleteEndpointResponseBody> {
    return fetchTenorApiEndpoint("autocomplete", this.#combineParameters({ searchTerm, ...parameters }));
  }

  /**
   * Gets search terms trending on Tenor's {@link https://tenor.com | website} by fetching Tenor's Trending Search Terms
   * API endpoint with the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of trending search terms and their locale.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Trending Search Terms
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { results: trendingSearchTerms, locale } =
   *     await tenorApi.getTrendingSearchTerms();
   *
   *   // Handle the trending search terms.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getTrendingSearchTerms(
    parameters?: Readonly<Omit<TrendingSearchTermsEndpointParameters, keyof TenorApiOptions>>,
  ): Promise<TrendingSearchTermsEndpointResponseBody> {
    return fetchTenorApiEndpoint("trending_terms", this.#combineParameters(parameters));
  }

  /**
   * Gets GIFs relevant to the passed search term by fetching Tenor's Search API endpoint with the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @template TContentFormat The content format of the GIFs to get.
   * @param searchTerm The search term to get relevant GIFs from.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of GIFs and the position ID of the next set of GIFs.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Eight GIFs
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { results: gifs, next: positionId } = await tenorApi.getGifsBySearch(
   *     "excited",
   *     { limit: 8 }
   *   );
   *
   *   // Handle the GIFs.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getGifsBySearch<TContentFormat extends ContentFormat = ContentFormat>(
    searchTerm: string,
    parameters?: Readonly<Omit<SearchEndpointParameters<TContentFormat>, keyof TenorApiOptions | "searchTerm">>,
  ): Promise<SearchEndpointResponseBody<TContentFormat>> {
    return fetchTenorApiEndpoint("search", this.#combineParameters({ searchTerm, ...parameters }));
  }

  /**
   * Gets GIFs covered by the passed GIF category by fetching Tenor's Search API endpoint with the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @template TContentFormat The content format of the GIFs to get.
   * @param category The category of the GIFs to get.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of GIFs and the position ID of the next set of GIFs.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Eight GIFs
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { tags: gifCategories } = tenorApi.getGifCategories();
   *   const randomGifCategory =
   *     gifCategories[Math.floor(Math.random() * gifCategories.length)];
   *   const { results: gifs, next: positionId } = await tenorApi.getGifsByCategory(
   *     randomGifCategory,
   *     { limit: 8 },
   *   );
   *
   *   // Handle the GIFs.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   */
  public async getGifsByCategory<TContentFormat extends ContentFormat = ContentFormat>(
    category: GifCategory,
    parameters?: Readonly<
      Omit<SearchEndpointParameters<TContentFormat>, keyof TenorApiOptions | "contentFilter" | "locale" | "searchTerm">
    >,
  ): Promise<SearchEndpointResponseBody<TContentFormat>> {
    return fetchTenorApi(
      `${category.path}&${createUrlParameters(renameParameters(this.#combineParameters(parameters))).toString()}`,
    );
  }

  /**
   * Gets GIFs with the passed IDs by fetching Tenor's Posts API endpoint with the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @template TContentFormat The content format of the GIFs to get.
   * @param ids The array of the IDs of the GIFs to get.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of GIFs.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting a Single GIF
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { results: gifs } = await tenorApi.fetchGifsById(
   *     "11586094175715197775",
   *   );
   *
   *   // Handle the GIFs.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getGifsById<TContentFormat extends ContentFormat = ContentFormat>(
    ids: [string, ...string[]],
    parameters?: Readonly<Omit<PostsEndpointParameters<TContentFormat>, keyof TenorApiOptions | "ids">>,
  ): Promise<PostsEndpointResponseBody<TContentFormat>> {
    return fetchTenorApiEndpoint("posts", this.#combineParameters({ ids, ...parameters }));
  }

  /**
   * Gets GIFs featured on Tenor's {@link https://tenor.com | website} by fetching Tenor's Featured API endpoint with
   * the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @template TContentFormat The content format of the GIFs to get.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of GIFs, their locale, and the position ID of the next set of GIFs.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting Featured GIFs
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const {
   *     results: featuredGifs,
   *     next: positionId,
   *     locale,
   *   } = await tenorApi.getFeaturedGifs();
   *
   *   // Handle the featured GIFs.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getFeaturedGifs<TContentFormat extends ContentFormat = ContentFormat>(
    parameters?: Readonly<Omit<FeaturedEndpointParameters<TContentFormat>, keyof TenorApiOptions>>,
  ): Promise<FeaturedEndpointResponseBody<TContentFormat>> {
    return fetchTenorApiEndpoint("featured", this.#combineParameters(parameters));
  }

  /**
   * Gets GIF categories by fetching Tenor's Categories API endpoint with the passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @param parameters An object containing the endpoint's parameters.
   * @returns An object containing the array of GIF categories and their locale.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Getting GIF Categories
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const { tags: gifCategories, locale } = tenorApi.getGifCategories();
   *
   *   // Handle the GIF categories.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async getGifCategories(
    parameters?: Readonly<Omit<CategoriesEndpointParameters, keyof TenorApiOptions>>,
  ): Promise<CategoriesEndpointResponseBody> {
    return fetchTenorApiEndpoint("categories", this.#combineParameters(parameters));
  }

  /**
   * Registers the share event of a GIF with the passed ID by fetching Tenor's Register Share API endpoint with the
   * passed parameters.
   *
   * This function uses `fetch()` under the hood. It sends a GET request to Tenor's API and parses the response body
   * content as JSON.
   * @param id The ID of the GIF to register the share event of.
   * @param parameters An object containing the endpoint's parameters.
   * @returns `true` if the GIF share event was registered or `false` if not.
   * @throws {GoogleApiError} if the Google API server generates an error.
   * @throws All errors thrown by `fetch()` for the same reasons.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch | The MDN documentation for `fetch()`}
   * for more information about the function.
   * @example Registering a GIF Share Event
   * ```ts
   * import { TenorApi } from "@cielsachen/tenor-api-wrapper";
   *
   * const tenorApi = new TenorApi(process.env.TENOR_KEY, {
   *   clientKey: "my_test_app",
   * });
   *
   * try {
   *   const status = tenorApi.registerGifShareEvent("16989471141791455574", {
   *     searchTerm: "excited",
   *   });
   *
   *   // Handle the registration status.
   * } catch (error) {
   *   // Handle any thrown errors.
   * }
   * ```
   */
  public async registerGifShareEvent(
    id: string,
    parameters?: Readonly<Omit<RegisterShareEndpointParameters, keyof TenorApiOptions | "id">>,
  ): Promise<boolean> {
    const response = await fetchTenorApiEndpoint<RegisterShareEndpointResponseBody>("registershare", {
      id,
      ...parameters,
    });

    return response.status;
  }
}
