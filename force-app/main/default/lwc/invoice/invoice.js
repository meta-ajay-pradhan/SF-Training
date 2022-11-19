import { api, LightningElement } from 'lwc';

export default class Invoice extends LightningElement {
    prods;
    @api
    get products() {
        return this.prods;
    }
    set products(value) {
        this.prods = Object.values(value);
    }

    col;
    @api
    get columns() {
        return this.col;
    }
    set columns(value) {
        this.col = [
            ...value,
            { label: "Unit", fieldName: "Unit", type: "number", editable: false }
        ];
    }
} 