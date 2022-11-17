import { LightningElement, track } from 'lwc';

export default class PurchaseProduct extends LightningElement {
    selectedProductIds = [];
    selectedProductsCount = {};

    updateSelectedProducts(event) {
        console.log('purprod')
        console.log('purprod', event);
        this.selectedProductIds = event.detail;
    }
}