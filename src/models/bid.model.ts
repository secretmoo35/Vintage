export class BidMasterModel {
    datenow: Date;
    items: Array<BidModel>;
}
export class BidModel {
    type: string;
    items: Array<ItemBidModel>;
}
export class ItemBidModel {
    image: string;
    time: string;
    price: number;
    isBid: boolean;
    pricestart: number;
    pricebid: number;
}