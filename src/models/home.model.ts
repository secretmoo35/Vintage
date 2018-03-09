export class HomeModel {
    bid: Array<HomeBidModel>;
    items: Array<HomeItemsModel>;
    maxLimit: number;
    limitItem: number;
}

export class HomeBidModel {
    _id: string;
    image: string;
    isBid: Boolean;
}

export class HomeItemsModel {
    _id: string;
    image: string;
    imagecount: number;
    isvideo: Boolean;
    type: string;
}