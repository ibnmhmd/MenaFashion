import { Product } from "app/client-orders/model/product";

export class Order {
    constructor(
        public order_number: number,
        public created_at: string,
        public customer_name: string,
        public product_details: Product[],
        public payment_method: string,
        public shipping_method: string,
        public cust_id: number,
        public subtotal: number,
        public shipping_amount: number,
        public grand_total: number,
        public currency: string,
        public status: string,
        public discount_amount: string,
        public coupon_code: string

    ) { }
}