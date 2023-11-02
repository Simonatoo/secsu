import { Ecommerce } from "./ecommerceBuilder";
import { LinksAPI } from "./interfaces";

const kabum_links:LinksAPI = {
    main_url:"www.google.com.br",
    search_query:"a"
}

const kabum = new Ecommerce("Kabum Eletronicos",kabum_links);

kabum.search("Samsung");