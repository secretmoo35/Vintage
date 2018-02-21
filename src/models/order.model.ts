import { ItemCartModel, ShippingModel } from "./cart.model";
import { BidModel } from "./biddetail.model";

export class OrderModel {
    _id: string;
    items: Array<ItemCartModel>;
    itemsbid: Array<ItemBidModel>;
    shippingAddress: ShippingAddressModel = new ShippingAddressModel();
    coupon: CouponModel = new CouponModel();
    payment: PaymentModel = new PaymentModel();
    // estimateprice: EstimatePriceModel = new EstimatePriceModel();
    omiseToken: string;
    qty: number;
    amount: number;
    shippingamount: number;
    discountamount: number;
    totalamount: number;
    omiseresponse: any;
}

export class ShippingAddressModel {
    name: string;
    tel: string;
    address: AddressModel = new AddressModel();
    location: LocationModel = new LocationModel();
}

export class AddressModel {
    address: string;
    district: string;
    subdistrict: string;
    province: string;
    postcode: string;
}

export class LocationModel {
    lat: number;
    lng: number;
}

export class CouponModel {
    code: string;
    discount: number;
}

export class PaymentModel {
    paymenttype: string;
    creditno: string;
    creditname: string;
    expdate: string;
    creditcvc: string;
}

export class ItemBidModel {
    bid: BidModel = new BidModel();
    shipping: ShippingModel = new ShippingModel();
    remark: string;
    qty: number;
    amount: number;
}

// export class EstimatePriceModel {
//     tripDuration: number;
//     normalPrice: number;
//     netPrice: number;
//     discount: number;
//     distance: number;
//     responseCode: string;
//     responseDesc: string;
// }