import { LightningElement, wire, api } from 'lwc';


export default class Products extends LightningElement {
    isDisabled = true;
    error;
    allProds;
    @api
    get allProducts() {
        return this.allProds;
    }
    set allProducts(value) {
        this.allProds = Object.values(value);
        this.filteredProducts = this.allProds;
        this.initPagination();
        this.handlePage();

    }

    filteredProducts = [];
    sprod;
    @api
    get selectedProductIds() {
        return this.sprod;
    }
    set selectedProductIds(value) {
        this.sprod = value;
        this.isDisabled = this.sprod.length <= 0;
    }
    products = [];
    currentPage = 1;
    totalPage = 0;
    productsPerPage = 5;
    totalProducts = 0;

    @api columns;



    initPagination() {
        this.totalProducts = this.filteredProducts.length;
        this.totalPage = parseInt(Math.ceil(this.totalProducts / this.productsPerPage));
        this.currentPage = 1;
    }

    handlePage() {
        this.products = this.filteredProducts?.slice((this.currentPage - 1) * this.productsPerPage, (this.currentPage - 1) * this.productsPerPage + this.productsPerPage);

        if (this.selectedProductIds.length > 0) {
            const dataTable = this.template.querySelector(
                '[data-id="datarow"]'
            );
            if(dataTable){
                dataTable.selectedRows = this.selectedProductIds;
            }
        }


    }

    updatePage(event) {
        this.currentPage = event.detail;
        this.handlePage();
    }
    handleSearchProducts(event) {
        const filterString = event.target.value;

        if (filterString === '') {
            this.filteredProducts = this.allProducts;
        } else {
            this.filteredProducts = this.allProducts.filter(prod => prod.Name.toLowerCase().includes(filterString.toLowerCase()));
        }
        this.initPagination();
        this.handlePage();
    }

    rowSelection(event) {
        // new selected Ids lene hain set pe
        const selectedProducts = [...event.detail?.selectedRows];
        const newSelectedIds = new Set(selectedProducts.map(prod => prod.Id));
        // old selected IDs ko set pe convert karna hain
        const currPageProdIds = new Set(this.products.map(prod => prod.Id));
        const oldSelectedIds = new Set(this.selectedProductIds);
        // dekhna hain ki koi purani selected item deselect ho gya ho,arthat deselected ko remove krna hain
        currPageProdIds.forEach((id) => {
            if (oldSelectedIds.has(id) && !newSelectedIds.has(id)) {
                oldSelectedIds.delete(id);
            }
        });
        // agar koi naya selected product hain toh usse vi selected wali set pe daal dena hain bass!
        newSelectedIds.forEach((id) => {
            if (!oldSelectedIds.has(id)) {
                oldSelectedIds.add(id);
            }
        })
        // end main update krdena hain
        const updateSelectedProdEvent = new CustomEvent('selectedprodupdate', { detail: [...oldSelectedIds] });
        this.dispatchEvent(updateSelectedProdEvent);
    }

    log() {
        console.log(this.products);
    }

    switchToCart() {
        const compChangeEvt = new CustomEvent('switchcomponent', {
            detail: "CART"
        })
        this.dispatchEvent(compChangeEvt);
    }

    switchToOrder() {
        this.dispatchEvent(
            new CustomEvent('switchcomponent', {
                detail: "ORDER"
            })
        )
    }
}