import { LightningElement } from 'lwc';

export default class PurchaseManagement extends LightningElement {
    orderComponent = true;
    purchaseComponent = false;

    handleComponentChange(event) {
        const componentName = event.detail;
        this.orderComponent = false;
        this.purchaseComponent = false;
        if (componentName === "PURCHASE") {
            this.purchaseComponent = true;
        } else if (componentName === "ORDER") {
            this.orderComponent = true;;
        }
    }
}