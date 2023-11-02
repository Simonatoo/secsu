"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ecommerce = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
class Kabum {
    constructor() {
        this.NAME = 'KABUM';
        this.WEBSITE = 'https://www.kabum.com.br/';
    }
    getHTMLContent(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(url);
            const content = yield page.content();
            yield page.close();
            return content;
        });
    }
    get(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `https://www.kabum.com.br/produto/${product_id}`;
            console.log(`Starting product searching from ${query}. This can take a while...`);
            const $ = cheerio.load(yield this.getHTMLContent(query));
            const result = $('main').get().map((e) => {
                var _a;
                return ({
                    shop: this.NAME,
                    website: this.WEBSITE,
                    title: $(e).find('.sc-89bddf0f-6').text().trim(),
                    value: $(e).find('.sc-5492faee-2').text().trim(),
                    source_img: (_a = $(e).find(`.image img`).attr('src')) === null || _a === void 0 ? void 0 : _a.trim()
                });
            });
            console.log("Searching completed");
            return result;
        });
    }
    search(product_name, page, page_size) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `https://www.kabum.com.br/busca/${product_name}?page_number=${page}&page_size=${page_size}&facet_filters=&sort=most_searched`;
            console.log(`Starting product searching from ${query}. This can take a while...`);
            const $ = cheerio.load(yield this.getHTMLContent(query));
            const result = $('.productCard').get().map((e) => {
                var _a, _b;
                return ({
                    shop: this.NAME,
                    website: this.WEBSITE,
                    title: $(e).find('.sc-d79c9c3f-0').text().trim(),
                    value: $(e).find('.sc-620f2d27-2').text().trim(),
                    product_id: (_a = $(e).find('.sc-ba2ba4a7-10').attr('data-smarthintproductid')) === null || _a === void 0 ? void 0 : _a.trim(),
                    source_img: (_b = $(e).find('img').attr('src')) === null || _b === void 0 ? void 0 : _b.trim()
                });
            });
            console.log("Searching completed");
            return result;
        });
    }
}
const teste = new Kabum();
teste.get(`420367`)
    .then((res) => {
    console.log(res);
});
class Ecommerce {
    constructor(ecommerce_name, links) {
        this.URL = links.main_url;
        this.name = ecommerce_name;
    }
    search(product_name) {
        console.log(`Looking for ${product_name} into ${this.name}. This can take a while...`);
    }
}
exports.Ecommerce = Ecommerce;
