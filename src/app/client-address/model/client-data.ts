import { ClientAddress } from "app/client-address/model/client-address";

export class ClientData {
    constructor(
        public id: number,
        public group_id: number,
        public default_billing: number,
        public default_shipping: number,
        public created_at: string,
        public updated_at: string,
        public created_in: string,
        public email: string,
        public firstname: string,
        public lastname: string,
        public store_id: number,
        public website_id: number,
        public disable_auto_group_change: number,
        public addresses: ClientAddress[]
    ) {}
}
