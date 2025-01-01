import type { EndpointParameters, NormalizedEndpointParameters } from "@/tenor.types.js";

type ObjectEntries<TObject extends object> = [key: keyof TObject, value: TObject[keyof TObject]][];

/**
 * Renames the keys in the passed parameters object into their raw names.
 * @param parameters An object containing the parameters to rename.
 * @returns A new object containing the renamed parameters.
 */
export function renameParameters(parameters: Readonly<EndpointParameters>): Readonly<NormalizedEndpointParameters> {
  const renamedParameters = {};
  const newParameterNames = Object.freeze({
    aspectRatioRange: "ar_range",
    clientKey: "client_key",
    contentFilter: "contentfilter",
    contentFormats: "media_filter",
    positionId: "pos",
    isRandomOrder: "random",
    searchFilter: "searchfilter",
    searchTerm: "q",
  }) satisfies Partial<Record<keyof EndpointParameters, keyof NormalizedEndpointParameters>>;

  for (const [currentName, value] of Object.entries(parameters) as ObjectEntries<EndpointParameters>) {
    const newName = Object.hasOwn(newParameterNames, currentName)
      ? newParameterNames[currentName as keyof typeof newParameterNames]
      : currentName;

    Object.assign(renamedParameters, { [newName]: value });
  }

  return Object.freeze(renamedParameters);
}

/**
 * Creates a new instance of `URLSearchParams` from the passed parameters object.
 *
 * This function will filter out undefined and empty array entries.
 * @param parameters An object containing the parameters to use.
 * @returns A new instance of `URLSearchParams` containing the filtered parameters.
 */
export function createUrlParameters(parameters: Readonly<NormalizedEndpointParameters>): URLSearchParams {
  const urlParameters = new URLSearchParams();

  for (const [name, value] of Object.entries(parameters) as ObjectEntries<NormalizedEndpointParameters>) {
    if (value) {
      if (Array.isArray(value) && value.length === 0) continue;

      urlParameters.append(name, value.toString());
    }
  }

  return urlParameters;
}
