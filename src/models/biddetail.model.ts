export class BidDetailModel {
    _id: string;
    shop: ShopBidModel = new ShopBidModel();
    product: ProductBidModel = new ProductBidModel();
    datestart: Date;
    dateend: Date;
    datenow: Date;
    price: number;
    pricestart: number;
    pricebid: number;
    isBid: boolean;
    currentuser: CurrentuserBidModel = new CurrentuserBidModel();
    timeleft: string;
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