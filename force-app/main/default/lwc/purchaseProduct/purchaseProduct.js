import { LightningElement, wire, track } from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';

export default class PurchaseProduct extends LightningElement {
    allProducts = {};
    selectedProductIds = [];
    @track cartProducts = {};
    columns=[
        {label: 'Product Name', fieldName: 'Name', type: 'text'},
        {label: 'Price', fieldName: 'Price__c', type: 'currency'},
        {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
        {label: 'Available Units', fieldName: 'Available_Units__c', type: 'number'},
    ]

    @wire(getProductList)
    wireProducts({error, data}) {
        if(data) {
            // this.allProducts = data;
            const allProds = {};
            for(let i = 0; i < data.length; ++i) {
                allProds[`${data[i].Id}`] = data[i];
            }
            this.allProducts = allProds;
        }
    }

    updateSelectedProducts(event) {
        this.selectedProductIds = event.detail;

        const cartProds = this.cartProducts;
        const selectedProdsSet = new Set(this.selectedProductIds);
        //deselected products ko remove karlo pehle
        Object.keys(cartProds).map( ids => {
            if(!selectedProdsSet.has(ids)) {
                delete cartProds[ids];
            }
        })

        //newly selected to add karo with quantity 1
        this.selectedProductIds.map(ids => {
            if(!(cartProds.hasOwnProperty(ids))) {
                cartProds[ids] = {
                    ...this.allProducts[ids],
                    Unit: 1,
                };
            }
        })

        this.cartProducts = {...cartProds};
    }

    updateQuantity(event) {
        
        const records = event.detail;
        
        for(let i = 0; i < records.length; ++i) {
            this.cartProducts[records[i].Id].Unit = records[i].Unit;
        }
    }

   
}