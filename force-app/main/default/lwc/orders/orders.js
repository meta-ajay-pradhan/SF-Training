import { LightningElement, wire } from 'lwc';
import getOrderLineProducts from '@salesforce/apex/ProductController.getOrderLineProducts';

export default class Orders extends LightningElement {
    orders;
    @wire(getOrderLineProducts)
    wireOrders({ error, data }) {
        if (data) {
            this.orders = data;
            this.initPagination();
            this.handlePage();
        }
    }

    viewOrder = [];
    currentPage = 1;
    totalPage = 0;
    OrdersPerPage = 5;
    totalOrders = 0;

    columns = [{ label: "PO Id", fieldName: "Product__c", type: "text" },
    { label: "Status", fieldName: "Status__c", type: "text" },
    { label: "Total", fieldName: "total__c", type: "currency" }]
    click() {
        console.log(this.orders);
    }

    initPagination() {
        this.totalOrders = this.orders.length;
        this.totalPage = parseInt(
            Math.ceil(this.totalOrders / this.OrdersPerPage)
        );
        this.currentPage = 1;
    }

    handlePage() {
        this.viewOrder = this.orders?.slice(
            (this.currentPage - 1) * this.OrdersPerPage,
            (this.currentPage - 1) * this.OrdersPerPage + this.OrdersPerPage
        );
    }

    updatePage(event) {
        this.currentPage = event.detail;
        this.handlePage();
    }

    switchToPurchase(event){
        const swithCompEvent = new CustomEvent('switchcomponent', {
            detail: "PURCHASE"
        })
        this.dispatchEvent(swithCompEvent);
    }
 }