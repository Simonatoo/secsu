import { EcommerceAPI, LinksAPI } from "./interfaces";
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';


class Kabum {
    URL = "https://www.kabum.com.br/tv";

    async openPage() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(this.URL);
        
        const content = await page.content();
        const $ = cheerio.load(content);

        let arr:any = [];

        $('.priceCard').map(function() {
            arr.push($(this).text())
        })

        await browser.close();

        return await arr;
    }
}

const teste = new Kabum();

teste.openPage()
.then(result => {
    console.log(result)
}) 
.catch(err => {
    console.log(err);
})




























export class Ecommerce implements EcommerceAPI {
    readonly name: string;
    readonly URL: string;

    constructor(ecommerce_name: string, links: LinksAPI) {
        this.URL = links.main_url;
        this.name = ecommerce_name;
    }

    search(product_name: string) {
        console.log(`Looking for ${product_name} into ${this.name}. This can take a while...`)
    }
}
