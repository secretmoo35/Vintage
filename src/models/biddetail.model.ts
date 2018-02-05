export class BidDetailModel {
    _id: string;
    shop: ShopBidModel = new ShopBidModel();
    product: ProductBidModel = new ProductBidModel();
    datestart: string;
    dateend: string;
    price: number;
    pricestart: number;
    pricebid: number;
    isBid: boolean;
    currentuser: CurrentuserBidModel = new CurrentuserBidModel();
}

export class ShopBidModel {
    name: string;
    image: string;
}

export class ProductBidModel {
    name: string;
    images: Array<string>;
    detail: string;
}

export class CurrentuserBidModel {
    _id: string;
    name: string;
    profileImageURL: string;
}