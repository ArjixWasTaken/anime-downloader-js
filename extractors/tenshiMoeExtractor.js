import * as helpers from "../core/helpers.js";

export default {
    extractorName: "TenshiMoe",
    extractorUniqueID: "tenshi.moe.extractor",
    getStreams: async (episodeData) => {
        const req = await helpers.get(episodeData.link);
        const $ = await helpers.soupify(req);
        const $iframe = $($(".embed-responsive > iframe").toArray()[0]);

        const mp4moe = await helpers.soupify(
            await helpers.get(soup.attr("src"), { referer: episodeData.link })
        );
        const video = mp4moe("video#player");

        return video
            .find("source")
            .toArray()
            .map((x) => {
                x = video(x);

                quality = x.attr("title");
                return {
                    sourceLink: x.attr("src"),
                    mirrorName: `TenshiMoe - ${quality}`,
                    quality,
                };
            });
    },
};
