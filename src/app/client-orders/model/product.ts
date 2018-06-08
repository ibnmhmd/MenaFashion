export class Product {
    constructor(
        public name: string,
        public sku: string,
        public price: number,
        public qty: number,
        public total_price: number,
        public image: string
    ) {}
}