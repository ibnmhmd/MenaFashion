import { Region } from "app/client-address/model/region";

export class ClientAddress {
      // public specialNotes: string,
    constructor(
        public id: number,
        public customer_id: number,
        public region: Region,
        public region_id: number,
        public country_id: number,
        public street: [string],
        public company: string,
        public telephone: number,
        public postcode: number,
        public city: string,
        public firstname: string,
        public lastname: string,
     
        public default_billing?: boolean,
        public default_shipping?: boolean
       
    ) {}
}