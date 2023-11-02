import { EcommerceAPI, LinksAPI } from "./interfaces";
import puppeteer, { Browser } from 'puppeteer';
import * as cheerio from 'cheerio';

class Kabum {
    NAME = 'KABUM';
    WEBSITE = 'https://www.kabum.com.br/';

    async getHTMLContent(url:string) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto(url);
        
        const content = await page.content();

        await page.close();

        return content;
    }

    async search(product_name:string, page:number, page_size:number) {
        const query = `https://www.kabum.com.br/busca/${product_name}?page_number=${page}&page_size=${page_size}&facet_filters=&sort=most_searched`;
        
        console.log(`Starting product searching from ${query}. This can take a while...`)
        
        const $ = cheerio.load(await this.getHTMLContent(query));
        
        const result = $('.productCard').get().map( (e) => ({
            shop: this.NAME,
            website: this.WEBSITE,
            title: $(e).find('.sc-d79c9c3f-0').text().trim(),
            value: $(e).find('.sc-620f2d27-2').text().trim(),
            product_id: $(e).find('.sc-ba2ba4a7-10').attr('data-smarthintproductid')?.trim(),
            source_img: $(e).find('img').attr('src')?.trim()
        }));

        console.log("Searching completed");
        
        return result;
    }
}

const teste = new Kabum();

teste.search('samsung',1,1)
.then((res)=>{
    console.log(res);
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
