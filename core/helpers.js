import fetch from "node-fetch";
import cheerio from "cheerio";
import utils from "./utils.js";

const verbose = false;

/**
 * Make a GET request.
 * @param {string} link - The link of the site.
 * @param {Object} options - The options to be used when making the request.
 * @param {string} options.headers - The headers to be used.
 * @param {string} options.referer - Overrides the referer in the headers with this one.
 * @param {string} options.data - Data to be sent in the body of the request.
 */
const get = async (link, options = {}) => {
    const init = {};
    if (options.params && !utils.isDictEmpty(options.params)) {
        link = utils.applyParams(link, options.params);
    }
    if (
        options.headers &&
        (Object(options.headers).hasOwnProperty("Referer") ||
            Object(options.headers).hasOwnProperty("referer"))
    ) {
        if (options.referer) {
            delete options.headers.referer;
            options.headers.Referer = options.referer;
        }
    }

    init.method = "GET";
    if (options.headers && !utils.isDictEmpty(options.headers)) {
        init.headers = options.headers;
    }
    if (options.data && !utils.isDictEmpty(options.data)) {
        init.body = utils.stringify(options.data);
        init.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }

    if (verbose)
        console.log(
            init.method ? init.method : "GET",
            link,
            JSON.stringify(init, null, 2)
        );

    return await fetch(link, init);
};

/**
 * Make a POST request.
 * @param {string} link - The link of the site.
 * @param {Object} options - The options to be used when making the request.
 * @param {string} options.headers - The headers to be used.
 * @param {string} options.referer - Overrides the referer in the headers with this one.
 * @param {string} options.data - Data to be sent in the body of the request.
 * @param {string} options.json - JSON to be sent in the body of the request.
 */
const post = async (link, options = {}) => {
    const init = {};
    if (options.params && !utils.isDictEmpty(options.params)) {
        link = utils.applyParams(link, options.params);
    }
    if (
        options.headers &&
        (Object(options.headers).hasOwnProperty("Referer") ||
            Object(options.headers).hasOwnProperty("referer"))
    ) {
        if (options.referer) {
            delete options.headers.referer;
            options.headers.Referer = options.referer;
        }
    }

    init.method = "POST";
    if (options.headers && !utils.isDictEmpty(options.headers)) {
        init.headers = options.headers;
    }

    if (
        options.data &&
        options.json &&
        !utils.isDictEmpty(data) &&
        !utils.isDictEmpty(json)
    ) {
        throw new Error("You can't have both data and json.");
    }

    if (options.data && !utils.isDictEmpty(options.data)) {
        init.body = utils.stringify(options.data);
        init.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }
    if (options.json && !utils.isDictEmpty(options.json)) {
        init.body = JSON.stringify(options.json);
        init.headers["Content-Type"] = "application/json"
    }

    if (verbose)
        console.log(
            init.method ? init.method : "GET",
            link,
            JSON.stringify(init, null, 2)
        );
    return await fetch(link, init);
};

/**
 * Make a request.
 * @param {string} link - The link of the site.
 * @param {Object} options - The options to be used when making the request.
 * @param {object} options.headers - The headers to be used.
 * @param {string} options.referer - Overrides the referer in the headers with this one.
 * @param {object} options.data - Data to be sent in the body of the request.
 * @param {string} options.method - HTTP Method
 */
const request = async (link, options = {}) => {
    const init = {};
    if (options.params && !utils.isDictEmpty(options.params)) {
        link = utils.applyParams(link, options.params);
    }
    if (
        options.headers &&
        (Object(options.headers).hasOwnProperty("Referer") ||
            Object(options.headers).hasOwnProperty("referer"))
    ) {
        if (options.referer) {
            delete options.headers.referer;
            options.headers.Referer = options.referer;
        }
    }
    if (options.method) {
        init.method = options.method;
    }
    if (options.headers && !utils.isDictEmpty(options.headers)) {
        init.headers = options.headers;
    }
    if (options.data && !utils.isDictEmpty(options.data)) {
        init.body = utils.stringify(options.data);
    }

    if (verbose)
        console.log(
            init.method ? init.method : "GET",
            link,
            JSON.stringify(init, null, 2)
        );
    return await fetch(link, init);
};

const soupify = async (html) => {
    if (html && typeof html !== "string" && typeof html.text === "function") {
        return cheerio.load(await html.text());
    } else if (typeof html === "string") {
        return cheerio.load(html);
    }
};

export default {
    get,
    post,
    soupify,
    request,
};
