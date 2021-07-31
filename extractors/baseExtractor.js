module.exports = {
    extractorName: "BaseExtractor",
    extractorUniqueID: "base-extractor-7-21",
    getStreams: async (episodeData) => {
        // here you will receive a source from func<getSources()> in a provider.
        // you are expected to give this info in the return

        const exampleEpisodeData = {
            title: "Example source title.",
            extractor: "baseExtractor", // passing null as the extractor means that its a direct link
            link: "https://example.com/example-anime/episode-one/video.mp4",
            headers: {
                Referer: "https://example.com",
            },
        };

        return [
            {
                headers: {},
                sourceLink:
                    "https://some-streaming-platform.com/episode-one.mp4",
                mirrorName: "Source 1",
                quality: "720p",
            },
            {
                headers: {},
                sourceLink:
                    "https://another-streaming-platform.com/episode-one.mp4",
                mirrorName: "Source 2",
                quality: "1080p",
            },
        ];
    },
};
