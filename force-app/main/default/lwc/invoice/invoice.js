import { api, LightningElement } from 'lwc';
import placeOrder from '@salesforce/apex/ProductController.placeOrder';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Invoice extends LightningElement {
    prods;
    @api
    get products() {
        return this.prods;
    }
    set products(value) {
        this.prods = Object.values(value);
        this.isDisabled = this.prods.length === 0;
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
    isDisabled = true;

    placeOrder() {
        const orderProds = {};
        for (let i = 0; i < this.prods.length; ++i) {
            orderProds[this.prods[i].Id] = this.prods[i].Unit;
        }
        const invoice = parseInt(Math.random() * 1000);
        placeOrder({
            invoice: invoice,
            orderedProds: orderProds
        }).then((result) => {
            const resetEvent = new CustomEvent('reset');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Success",
                    message: 'Successfully Placed Your Order!',
                    variant: "success"
                })
            );
            this.dispatchEvent(resetEvent);
        })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Something Went Wrong!",
                        message: error.body.message,
                        variant: "error"
                    })
                );
            });
    }

    switchToCart() {
        this.dispatchEvent(
            new CustomEvent('switchcomponent', {
                detail: "CART",
            })
        )
    }


}