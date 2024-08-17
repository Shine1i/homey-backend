import { HomeQScraper } from "./homeq";
import fs from "fs";

export async function start(){
    const homeQScraper = new HomeQScraper();
    const result = await homeQScraper.search();
    const jsonData = JSON.stringify(result);
    fs.writeFileSync("output.json", jsonData);

}

start();