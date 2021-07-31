import utils from "../core/utils.js";
import { Table } from "console-table-printer";

export default async ({ query, debug, provider, quality, url }) => {
    const providerMod = await utils.getProviderByName(provider);

    const searchResults = await providerMod.search(query);
    const table = new Table({
        columns: [
            { name: "SlNo", color: "red" },
            { name: "Title", color: "green" },
        ],
        style: {
            headerTop: {
                left: "+",
                mid: "+",
                right: "+",
                other: "-",
            },
            headerBottom: {
                left: "+",
                mid: "+",
                right: "|",
                other: "-",
            },
            tableBottom: {
                left: "+",
                mid: "+",
                right: "+",
                other: "-",
            },
            vertical: "|",
        },
    });
    searchResults.forEach((result, index) => {
        table.addRow({
            SlNo: index,
            Title: result.title,
        });
    });

    console.log(table.table.renderTable());
};
