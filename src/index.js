"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ecommerceBuilder_1 = require("./ecommerceBuilder");
const kabum_links = {
    main_url: "www.google.com.br",
    search_query: "a"
};
const kabum = new ecommerceBuilder_1.Ecommerce("Kabum Eletronicos", kabum_links);
kabum.search("Samsung");
