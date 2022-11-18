import { LightningElement, wire, api } from 'lwc';
import getProductList from '@salesforce/apex/ProductController.getProductList';

export default class Products extends LightningElement {
    error;
    allProducts = [];
    filteredProducts = [];
    @api selectedProductIds;
    products = [];
    currentPage = 1;
    totalPage = 0;
    productsPerPage = 5;
    totalProducts = 0;

    columns=[
        {label: 'Product Name', fieldName: 'Name', type: 'text'},
        {label: 'Price', fieldName: 'Price__c', type: 'currency'},
        {label: 'Product Code', fieldName: 'ProductCode', type: 'text'},
        {label: 'Available Units', fieldName: 'Available_Units__c', type: 'number'},
    ]

    @wire(getProductList)
    wireProducts({error, data}) {
        if(data) {
            this.allProducts = data;
            this.filteredProducts = this.allProducts;
            this.initPagination();
            this.handlePage();
        }
    }

    initPagination() {
        this.totalProducts = this.filteredProducts.length; 
        this.totalPage = parseInt(Math.ceil(this.totalProducts / this.productsPerPage));
        this.currentPage = 1;
    }

    handlePage() {
        this.products = this.filteredProducts?.slice((this.currentPage - 1)*this.productsPerPage,  (this.currentPage - 1)*this.productsPerPage + this.productsPerPage);
        this.template.querySelector(
            '[data-id="datarow"]'
          ).selectedRows = this.selectedProductIds;
    }

    updatePage(event) {
        console.log(event.detail);
        this.currentPage = event.detail;
        this.handlePage();
    }
    handleSearchProducts(event) {
        console.log(event.target.value);
        const filterString = event.target.value;

        if(filterString === '') {
            console.log('allprod');
            this.filteredProducts = this.allProducts;
        }else{
            this.filteredProducts = this.allProducts.filter( prod => prod.Name.toLowerCase().includes(filterString.toLowerCase())); 
        }
        this.initPagination();
        this.handlePage();
    }

    rowSelection(event) {
        // new selected Ids lene hain set pe
        const selectedProducts = [...event.detail?.selectedRows];
        const newSelectedIds = new Set(selectedProducts.map( prod => prod.Id));
        // old selected IDs ko set pe convert karna hain
        const currPageProdIds = new Set(this.products.map( prod => prod.Id));
        const oldSelectedIds = new Set(this.selectedProductIds);
        // dekhna hain ki koi purani selected item deselect ho gya ho,arthat deselected ko remove krna hain
        currPageProdIds.forEach( (id) => {
            if(oldSelectedIds.has(id) && !newSelectedIds.has(id)){
                oldSelectedIds.delete(id);
            }
        });
        // agar koi naya selected product hain toh usse vi selected wali set pe daal dena hain bass!
        newSelectedIds.forEach( (id) => {
            if(!oldSelectedIds.has(id)) {
                oldSelectedIds.add(id);
            }
        })
        // end main update krdena hain
        const updateSelectedProdEvent = new CustomEvent('selectedprodupdate', { detail: [...oldSelectedIds]});
        this.dispatchEvent(updateSelectedProdEvent);
    }

    log() {
        console.log(this.products);
    }
}