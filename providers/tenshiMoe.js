import helpers from "../core/helpers.js";

export default {
    providerName: "TenshiMoe",
    providerLink: "https://tenshi.moe",
    isAdult: false,
    search: async (query) => {
        const req = await helpers.get("https://tenshi.moe/anime", {
            params: { q: query },
            headers: {
                cookie: `loop-view=thumb;`,
            },
        });
        const $ = await helpers.soupify(req);
        return $("ul.thumb > li > a")
            .toArray()
            .map((result) => {
                const x = $(result);
                return {
                    title: x.attr("title"),
                    link: x.attr("href"),
                    poster: x.find("img").attr("src"),
                    description: x.attr("data-content"),
                };
            });
    },
    getDetails: async (animeLink) => {
        const req = await helpers.get(animeLink, {
            headers: {
                cookie: `loop-view=thumb;`,
            },
        });
        const $ = await helpers.soupify(req);

        return {
            title: $($(`span.value > span[title="English"]`).toArray()[0])
                .parent()
                .text()
                .trim(),
            description: $(".entry-description > .card-body").text(),
            categories: $(`a[class*="genre-"]`)
                .toArray()
                .map((genre) => {
                    return $(genre).attr("title");
                }),
            poster: $(`img.cover-image.img-thumbnail`).attr("src"),
            year: parseInt(
                $($("li.release-date .value").toArray()[0])
                    .text()
                    .match(/(\d{4})/)[1]
            ),
            episodes: $(`li[class*="episode"] > a`)
                .toArray()
                .map((episode, index) => {
                    const ep = $(episode);

                    return {
                        episodeLink: ep.attr("href"),
                        episodeTitle: ep.find(".episode-title").text().trim(),
                        episodeNumber: index + 1, // or ep.attr("href").match(/(\/\d+)/)[1]
                        episodeThumbnail: ep.find("img").attr("src"),
                    };
                }),
        };
    },
    getSources: async (episodeLink) => {
        return {
            sources: [
                {
                    title: "TenshiMoe",
                    extractor: "tenshi.moe.extractor",
                    link: episodeLink,
                },
            ],
        };
    },
};
