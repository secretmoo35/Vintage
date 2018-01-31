export class BidModel {
    items: Array<ItemBidModel>;
}
export class ItemBidModel {
    image: string;
    time: string;
    price: number;
    isBid: boolean;
    pricestart:number;
    pricebid:number;
}