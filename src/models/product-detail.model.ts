export class ProductDetailModel {
    _id: string;
    name: string;
    detail: string;
    images: Array<string>;
    price: number;
    isFavorite: Boolean;
    shippings: Array<ShippingModel>;
}

export class ShippingModel {
    ref: ShippingRefModel = new ShippingRefModel();
    price: number;
}

export class ShippingRefModel {
    name: string;
    detail: string;
}