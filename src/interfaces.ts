interface ProductItem {
    nome:string;
    description:string;
}

interface EcommerceAPI {
    readonly name:string;
    readonly URL:string;
    search(product_name:string):any;
}

interface LinksAPI {
    main_url:string;
    search_query:string;
}

export {ProductItem,EcommerceAPI,LinksAPI}