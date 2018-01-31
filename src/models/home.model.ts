export class HomeModel {
    bid: Array<HomeBidModel>;
    items: Array<HomeItemsModel>;
}

export class HomeBidModel {
    _id: string;
    image: string;
    isBid: Boolean;
}

export class HomeItemsModel {
    _id: string;
    image: string;
}