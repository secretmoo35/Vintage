export class CartModel {
    items: Array<ItemCartModel>;
    qty: number;
    amount: number;
}

export class ItemCartModel {
    product: ProductCartModel = new ProductCartModel();
    shipping: ShippingModel = new ShippingModel();
    remark: string;
    qty: number;
    amount: number;
}

export class ProductCartModel {
    name: string;
    price: number;
    shipping: Array<any>;
}

export class ShippingModel {
    ref: ShippingItemModel = new ShippingItemModel();
    price: number;
}

export class ShippingItemModel {
    name: string
}