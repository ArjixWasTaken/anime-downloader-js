#!/usr/bin/env node

/*
Copyright 2021 ArjixWasTaken

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
This project is for educational purposes only.
Use this software on your own accord/discression.

All content that can be accessed by using the program is scraped from the internet.
And no content is/was hosted by me (the author) or any contributors.

If you find any content accessible by the usage of this software and you want to have it removed,
then do so at the websites this software is scraping.
I (the author) and any contributors have no control over the content that is found by the usage of this software.
*/

// Inspired by https://github.com/anime-dl/anime-downloader
// This is a port of anime-dl to NodeJS.

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import utils from "./core/utils.js";

// commands
import dl from "./commands/dl.js";

yargs(hideBin(process.argv))
    .option("debug", {
        alias: "v",
        type: "boolean",
        description: "Run with debug logging.",
    })
    .command(
        "dl <query>",
        "Downloads anime.",
        async (yargs) => {
            yargs.positional("query", {
                describe: "Anime Title to search for.",
            });
            yargs.option("provider", {
                alias: "p",
                type: "string",
                description: "Provider to use instead of the default one.",
                choices: Object.entries(await utils.getProviders()).map(
                    ([key, value]) => key
                ),
                default: "TenshiMoe",
            });
            yargs.option("quality", {
                alias: "q",
                type: "string",
                description: "Quality to attempt to download at.",
                choices: ["1080p", "720p", "540p", "480p", "360p"],
                default: "1080p",
            });
            yargs.option("url", {
                alias: "u",
                type: "boolean",
                description:
                    "Print the episode links instead of downloading them.",
                default: false,
            });
        },
        (argv) => {
            dl(argv);
        }
    ).argv;
