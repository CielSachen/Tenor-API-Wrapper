/** The preview content format of a GIF. */
export type PreviewContentFormat =
  | "preview"
  | "gifpreview"
  | "tinygifpreview"
  | "nanogifpreview"
  | "webppreview_transparent"
  | "tinywebppreview_transparent"
  | "nanowebppreview_transparent";

/** The content format of a GIF. */
export type ContentFormat =
  | PreviewContentFormat
  | "gif"
  | "mediumgif"
  | "tinygif"
  | "nanogif"
  | "mp4"
  | "loopedmp4"
  | "tinymp4"
  | "nanomp4"
  | "webm"
  | "tinywebm"
  | "nanowebm"
  | "webp_transparent"
  | "tinywebp_transparent"
  | "nanowebp_transparent"
  | "gif_transparent"
  | "tinygif_transparent"
  | "nanogif_transparent";

/**
 * The parameters of Tenor's API endpoints.
 * @template TContentFormat The content format of the GIFs to get.
 */
export interface EndpointParameters<TContentFormat extends ContentFormat = ContentFormat> {
  /**
   * The range of the aspect ratios of the GIFs to get.
   *
   * The accepted values are:
   * - `"all"` — fetch content with any aspect ratio.
   * - `"wide"` — 0.42 ≤ aspect ratio ≤ 2.36
   * - `"standard"` — 0.56 ≤ aspect ratio ≤ 1.78
   * @default "all"
   */
  aspectRatioRange?: "all" | "wide" | "standard";
  /** The key that represents the client's integration with Tenor's API. */
  clientKey?: string;
  /**
   * The level of the content safety filter to apply.
   *
   * The accepted values are:
   * - `"off"` — get content with any rating.
   * - `"low"` — only get G, PG, and PG-13-rated content
   * - `"medium"` — only get G and PG-rated content
   * - `"high"` — only get G-rated content
   * @default "off"
   */
  contentFilter?: "off" | "low" | "medium" | "high";
  /**
   * The two-letter {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes | ISO 3166-1} code of the client's country of
   * origin.
   * @default "US"
   */
  country?: Uppercase<string>;
  /** The ID of the GIF to register the share event of. */
  id?: string;
  /** The ID of the GIF or the array of IDs of the GIFs to get. */
  ids?: [string, ...string[]];
  /** The key to access Tenor's API. */
  key?: string;
  /**
   * The maximum number of GIFs, search terms, or autocompletes to get.
   * @default 20
   */
  limit?: number;
  /**
   * The two-letter {@link https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes | ISO 639-1} code of the
   * language to interpret search terms. An optional two-letter
   * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Codes | ISO 3166-1} country code can be attached to the end of the
   * language code with an underscore (_) to differentiate between the different dialects of the language.
   * @default "en_US"
   * @see {@link https://developers.google.com/tenor/guides/localization | Tenor documentation on localization} for a
   * list of the supported languages
   */
  locale?: Lowercase<string> | `${Lowercase<string>}_${Uppercase<string>}`;
  /** The array of the content formats of the GIFs to get. */
  contentFormats?: TContentFormat[];
  /**
   * The position ID from the {@link SearchEndpointResponseBody.next `next` property} of a previous set of
   * GIFs to get the next set of GIFs. The search terms of this and the previous query must match.
   */
  positionId?: string;
  /**
   * Whether the GIFs will be in random order.
   * @default false
   */
  isRandomOrder?: boolean;
  /**
   * The filter to apply to the GIF search.
   *
   * The accepted values are:
   * - `undefined` — only search for GIF content
   * - `["sticker"]` — only search for static and animated sticker content
   * - `["sticker", "-static"]` — only search for animated sticker content
   * - `["sticker", "static"]` — only search for static sticker content
   * @default undefined
   */
  searchFilter?: ["sticker"] | ["sticker", "-static" | "static"];
  /**
   * The type of categories to get.
   *
   * The accepted values are:
   * - `"featured"` — get the featured GIF categories
   * - `"trending"` — get the trending GIF categories
   * @default "featured"
   */
  type?: "featured" | "trending";
  /** The complete or partial search term to use. */
  searchTerm?: string;
}

/** The options to configure Tenor's API endpoints. */
export interface TenorApiOptions extends Pick<EndpointParameters, "key" | "clientKey" | "country" | "locale"> {}

/**
 * The parameters, with normalized names, of Tenor's API endpoints.
 * @template TContentFormat The content format of the GIFs to get.
 */
export interface NormalizedEndpointParameters<TContentFormat extends ContentFormat = ContentFormat>
  extends Omit<
    EndpointParameters<TContentFormat>,
    "aspectRatioRange" | "clientKey" | "contentFilter" | "contentFormats" | "positionId" | "searchFilter" | "searchTerm"
  > {
  /**
   * The range of the aspect ratios of the GIFs to get.
   *
   * The accepted values are:
   * - `"all"` — fetch content with any aspect ratio.
   * - `"wide"` — 0.42 ≤ aspect ratio ≤ 2.36
   * - `"standard"` — 0.56 ≤ aspect ratio ≤ 1.78
   * @default "all"
   */
  ar_range?: EndpointParameters<TContentFormat>["aspectRatioRange"];
  /** The key that represents the client's integration with Tenor's API. */
  client_key?: EndpointParameters<TContentFormat>["clientKey"];
  /**
   * The level of the content safety filter to apply.
   *
   * The accepted values are:
   * - `"off"` — get content with any rating.
   * - `"low"` — only get G, PG, and PG-13-rated content
   * - `"medium"` — only get G and PG-rated content
   * - `"high"` — only get G-rated content
   * @default "off"
   */
  contentfilter?: EndpointParameters<TContentFormat>["contentFilter"];
  /** The array of the content formats of the GIFs to get. */
  media_filter?: EndpointParameters<TContentFormat>["contentFormats"];
  /**
   * The position ID from the {@link SearchEndpointResponseBody.next `next` property} of a previous set of
   * GIFs to get the next set of GIFs. The search terms of this and the previous query must match.
   */
  pos?: EndpointParameters<TContentFormat>["positionId"];
  /**
   * Whether the GIFs will be in random order.
   * @default false
   */
  random?: EndpointParameters<TContentFormat>["isRandomOrder"];
  /**
   * The filter to apply to the GIF search.
   *
   * The accepted values are:
   * - `""` or `undefined` — only search for GIF content
   * - `"sticker" or ["sticker"]` — only search for static and animated sticker content
   * - `["sticker", "-static"]` — only search for animated sticker content
   * - `["sticker", "static"]` — only search for static sticker content
   * @default ""
   */
  searchfilter?: EndpointParameters<TContentFormat>["searchFilter"];
  /** The complete or partial search term to use. */
  q?: EndpointParameters<TContentFormat>["searchTerm"];
}

/**
 * The parameters of Tenor's Search API endpoint.
 * @template TContentFormat The content format of the GIFs to get.
 */
export interface SearchEndpointParameters<TContentFormat extends ContentFormat = ContentFormat>
  extends Pick<
    EndpointParameters<TContentFormat>,
    | "key"
    | "searchTerm"
    | "clientKey"
    | "searchFilter"
    | "country"
    | "locale"
    | "contentFilter"
    | "contentFormats"
    | "aspectRatioRange"
    | "isRandomOrder"
    | "limit"
    | "positionId"
  > {
  /** The search term to get relevant GIFs from. */
  searchTerm?: string;
  /**
   * The maximum number of GIFs to get.
   * @default 20
   */
  limit?: number;
}

/**
 * The parameters of Tenor's Featured API endpoint.
 * @template TContentFormat The content format of the GIFs to get.
 */
export interface FeaturedEndpointParameters<TContentFormat extends ContentFormat = ContentFormat>
  extends Pick<
    EndpointParameters<TContentFormat>,
    | "key"
    | "clientKey"
    | "searchFilter"
    | "country"
    | "locale"
    | "contentFormats"
    | "aspectRatioRange"
    | "contentFilter"
    | "limit"
    | "positionId"
  > {
  /**
   * The maximum number of featured GIFs to get.
   * @default 20
   */
  limit?: number;
}

/** The parameters of Tenor's Categories API endpoint. */
export interface CategoriesEndpointParameters
  extends Pick<EndpointParameters, "key" | "clientKey" | "country" | "locale" | "type" | "contentFilter"> {}

/** The parameters of Tenor's Search Suggestions API endpoint. */
export interface SearchSuggestionsEndpointParameters
  extends Pick<EndpointParameters, "key" | "searchTerm" | "clientKey" | "country" | "locale" | "limit"> {
  /** The search term to get suggestions for. */
  searchTerm?: string;
  /**
   * The maximum number of suggestions to get.
   * @default 20
   */
  limit?: number;
}

/** The parameters of Tenor's Autocomplete API endpoint. */
export interface AutocompleteEndpointParameters
  extends Pick<EndpointParameters, "key" | "searchTerm" | "clientKey" | "country" | "locale" | "limit"> {
  /** The partial search term to get autocompletes for. */
  searchTerm?: string;
  /**
   * The maximum number of autocompletes to get.
   * @default 20
   */
  limit?: number;
}

/** The parameters of Tenor's Trending Search Terms API endpoint. */
export interface TrendingSearchTermsEndpointParameters
  extends Pick<EndpointParameters, "key" | "clientKey" | "country" | "locale" | "limit"> {
  /**
   * The maximum number of trending search terms to get.
   * @default 20
   */
  limit?: number;
}

/** The parameters of Tenor's Register Share API endpoint. */
export interface RegisterShareEndpointParameters
  extends Pick<EndpointParameters, "key" | "id" | "clientKey" | "country" | "locale" | "searchTerm"> {
  /** The search term used to get the GIF. */
  searchTerm?: string;
}

/**
 * The parameters of Tenor's Posts API endpoint.
 * @template TContentFormat The content format of the GIF to fetch.
 */
export interface PostsEndpointParameters<TContentFormat extends ContentFormat = ContentFormat>
  extends Pick<EndpointParameters<TContentFormat>, "key" | "ids" | "clientKey" | "contentFormats"> {}

/** A GIF's media in one of the {@link ContentFormat | content formats}. */
export interface Media {
  /** The URL link to the media file. */
  readonly url: string;
  /** The duration of the media in seconds. */
  readonly duration: number;
  /**
   * The URL link to a preview image file for the media.
   * @deprecated Use the {@link EndpointParameters.contentFormats | `contentFormats`} parameter to filter for
   * {@link PreviewContentFormat | preview content formats} instead.
   */
  readonly preview: string;
  /** The width and height of the media in pixels. */
  readonly dims: readonly [width: number, height: number];
  /** The size of the media file in bytes. */
  readonly size: number;
}

/**
 * A GIF posted on Tenor's {@link https://tenor.com/ | website}.
 * @template TContentFormat The content format of the media of the GIF.
 */
export interface Gif<TContentFormat extends ContentFormat = ContentFormat> {
  /** The Tenor ID of the GIF. */
  readonly id: string;
  /** The title of the GIF's post on Tenor's {@link https://tenor.com | website}. */
  readonly title: string;
  /** The dictionary of the GIF's content formats and their respective media. */
  readonly media_formats: Partial<Record<TContentFormat, Media>>;
  /**
   * The most common pixel color of the content of the GIF.
   * @deprecated No obvious alternative or replacement is in place.
   */
  readonly bg_color: undefined;
  /** The UNIX timestamp of the date the GIF was posted to Tenor's {@link https://tenor.com | website}. */
  readonly created: number;
  /** The description of the content of the GIF. */
  readonly content_description: string;
  /** The full URL link of the GIF. */
  readonly itemurl: string;
  /** The shortened URL link of the GIF. */
  readonly url: string;
  /** The array of Tenor tags of the GIF. */
  readonly tags: readonly string[];
  /**
   * The array of flags signifying whether the content is a sticker or static image, has audio or is any combination of
   * these. An empty flags array signifies that the content is a regular GIF.
   */
  readonly flags: readonly ("audio" | "sticker" | "static")[];
  /** Whether the GIF contains audio. */
  readonly hasaudio: boolean;
  /**
   * Whether the GIF contains captions.
   * @deprecated No obvious alternative or replacement is in place.
   */
  readonly hascaption: undefined;
  /** The source of the {@link Gif.content_description | `content_description`} of the GIF. */
  readonly content_description_source: string;
}

/** A category of GIFs posted on Tenor's {@link https://tenor.com/ | website}. */
export interface GifCategory {
  /** The search term for getting the GIFs covered by the category. */
  readonly searchterm: string;
  /**
   * The {@link https://developers.google.com/tenor/guides/endpoints#search | Search API endpoint} URL path and query
   * string for getting the GIFs covered by the category.
   */
  readonly path: string;
  /** The URL link to a preview GIF for the category. */
  readonly image: string;
  /** The hashtag (#) name of the category. */
  readonly name: string;
}

/**
 * The JSON body of the response of Tenor's Search API endpoint.
 * @template TContentFormat The content format of the GIFs.
 */
export interface SearchEndpointResponseBody<TContentFormat extends ContentFormat = ContentFormat> {
  /** The array of GIFs. */
  readonly results: readonly Gif<TContentFormat>[];
  /**
   * The position ID for getting the next set of GIFs through the
   * {@link EndpointParameters.positionId `positionId` parameter}. If no additional results exist, the property's value
   * will be an empty string.
   */
  readonly next: string;
}

/**
 * The JSON body of the response of Tenor's Featured API endpoint.
 * @template TContentFormat The content format of the GIFs.
 */
export interface FeaturedEndpointResponseBody<TContentFormat extends ContentFormat = ContentFormat> {
  /** The locale of the featured GIFs. */
  readonly locale: string;
  /** The array of featured GIFs. */
  readonly results: readonly Gif<TContentFormat>[];
  /**
   * The position ID for getting the next set of featured GIFs through the
   * {@link EndpointParameters.positionId `positionId` parameter}. If no additional results exist, the property's value
   * will be an empty string.
   */
  readonly next: string;
}

/** The JSON body of the response of Tenor's Categories API endpoint. */
export interface CategoriesEndpointResponseBody {
  /** The locale of the GIF categories. */
  readonly locale: string;
  /** The array of GIF categories. */
  readonly tags: readonly GifCategory[];
}

/** The JSON body of the response of Tenor's Search Suggestions API endpoint. */
export interface SearchSuggestionsEndpointResponseBody {
  /** The locale of the search terms. */
  readonly locale: string;
  /** The array of search terms. */
  readonly results: readonly string[];
}

/** The JSON body of the response of Tenor's Autocomplete API endpoint. */
export interface AutocompleteEndpointResponseBody {
  /** The locale of the autocompletes. */
  readonly locale: string;
  /** The array of autocompletes. */
  readonly results: readonly string[];
}

/** The JSON body of the response of Tenor's Trending Search Terms API endpoint. */
export interface TrendingSearchTermsEndpointResponseBody {
  /** The locale of the trending search terms. */
  readonly locale: string;
  /** The array of trending search terms. */
  readonly results: readonly string[];
}

/** The JSON body of the response of Tenor's Register Share API endpoint. */
export interface RegisterShareEndpointResponseBody {
  /** Whether the registration was successful. */
  readonly status: boolean;
}

/**
 * The JSON body of the response of Tenor's Posts API endpoint.
 * @template TContentFormat The content format of the GIFs.
 */
export interface PostsEndpointResponseBody<TContentFormat extends ContentFormat = ContentFormat> {
  /** The array of GIFs. */
  readonly results: readonly Gif<TContentFormat>[];
}

/**
 * The JSON body of the response of Tenor's API endpoints.
 * @template TContentFormat The content format of the GIFs.
 */
export type EndpointResponseBody<TContentFormat extends ContentFormat = ContentFormat> =
  | SearchEndpointResponseBody<TContentFormat>
  | FeaturedEndpointResponseBody<TContentFormat>
  | CategoriesEndpointResponseBody
  | SearchSuggestionsEndpointResponseBody
  | AutocompleteEndpointResponseBody
  | TrendingSearchTermsEndpointResponseBody
  | RegisterShareEndpointResponseBody
  | PostsEndpointResponseBody<TContentFormat>;
