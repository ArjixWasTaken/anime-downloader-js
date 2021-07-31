import deepEquals from "./stackOverflowFunctions.js";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const stringify = (obj) => {
    const params = [];

    for (const [key, value] of Object.entries(obj)) {
        params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return params.join("&");
};

const isDictEmpty = (obj) => {
    if (!isDict(obj)) return;
    return Object.keys(obj).length === 0;
};
const isArrayEmpty = (obj) => {
    if (!isArray(obj)) return;
    return obj.length == 0;
};

const isArray = (obj) => Array.isArray(obj);
const isDict = (obj) => {
    if (typeof obj === "object" && !isArray(obj)) return true;
    return false;
};

/**
 * Apply querystring parameters to a URI.
 * @param {string} link - A URI.
 * @param {string} params - Query String Parameters.
 */
const applyParams = (link, params) => {
    if (typeof link !== "string") return;
    if (isDictEmpty(params)) return link;
    link = link.trim();

    if (link.split("?")[1] && link.split("?")[1].trim() !== "") {
        link += "&";
    } else {
        link = link.split("?")[0];
        link += "?";
    }
    return link + stringify(params);
};

const headersToJson = (obj) => {
    const newObj = {};

    for (const key of obj.keys()) {
        newObj[key] = obj.get(key);
    }
    return newObj;
};

const getProviders = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url)).replace(
        /\\/g,
        "/"
    );
    const providers = fs
        .readdirSync(`${__dirname}/../providers`)
        .filter((provider) => provider != "baseProvider.js")
        .map((f) => `${__dirname}/../providers/` + f);

    let providersObj = {};

    for (const pro of providers) {
        const a = await import("file://" + pro);
        providersObj[a.default.providerName] = a.default;
    }
    return providersObj;
};

const getExtractors = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url)).replace(
        /\\/g,
        "/"
    );
    const extractors = fs
        .readdirSync(`${__dirname}/../extractors`)
        .filter((extractor) => extractor != "baseExtractor.js")
        .map((f) => `${__dirname}/../extractors/` + f);

    extractorsObj = {};
    for (const ext of extractors) {
        const a = await import("file://" + ext);
        extractorsObj[a.extractorUniqueID] = a;
    }
    return extractorsObj;
};

const getProviderByName = async (providerName) => {
    const providers = await getProviders();
    return providers[providerName];
};

const getExtractorByID = (extractorID) => {
    const extractors = getExtractors();
    return extractors[extractorID];
};

export default {
    deepEquals,
    isDict,
    isArray,
    isDictEmpty,
    isArrayEmpty,
    applyParams,
    headersToJson,
    stringify,
    getExtractors,
    getProviders,
    getExtractorByID,
    getProviderByName,
};
