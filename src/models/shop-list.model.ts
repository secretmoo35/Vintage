export class ShopListMasterModel {
    items: Array<ShopListModel>;
    maxLimit: number;
    limitItem: number;
}

export class ShopListModel {
    _id: string;
    coverimage: string
}