module.exports = {
    providerName: "Example Anime!",
    providerLink: "https://example.com",
    isAdult: false, // to declare if the provider is a hentai one or not
    search: async (query) => {
        // inside here you will scrape all the search results
        // and return an array with the following format
        return [
            {
                title: "Example Anime Title!",
                link: "https://example.com/example-anime",
                poster: null,
                description: null,
                year: null,
            },
        ];
    },
    getDetails: async (animeLink) => {
        // here you will scrape all the metadata of an anime
        // along with its episodes with the following format

        return {
            title: "Example Anime Title.",
            description: "This is an example anime that was aired in 2069.",
            categories: ["Action", "School Life"],
            poster: null,
            year: 2069,
            episodes: [
                {
                    episodeNumber: 1,
                    episodeTitle: null,
                    episodeLink:
                        "https://example.com/example-anime/episode-one",
                    episodeThumbnail: null,
                },
            ],
        };
    },
    getSources: async (episodeLink) => {
        // here you will scrape the embed/video link for the episode given
        // if the link is an embed, then make sure to pass the correct name of the extractor it should use
        // and if any special headers are required then make sure to also pass those
        return {
            sources: [
                {
                    title: "Example source title.",
                    extractor: null, // passing null as the extractor means that its a direct link
                    link: "https://example.com/example-anime/episode-one/video.mp4",
                    headers: {
                        Referer: "https://example.com",
                    },
                },
            ],
        };
    },
};
