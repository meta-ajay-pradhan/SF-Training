import { LightningElement, wire, track } from "lwc";
import getProductList from "@salesforce/apex/ProductController.getProductList";

export default class PurchaseProduct extends LightningElement {
  prodComponent = true;
  cartComponent = false;
  invoiceComponent = false;
  allProducts = {};
  selectedProductIds = [];
  invoiceSelectedProducts = {};
  @track cartProducts = {};
  columns = [
    { label: "Product Name", fieldName: "Name", type: "text" },
    { label: "Price", fieldName: "Price__c", type: "currency" },
    { label: "Product Code", fieldName: "ProductCode", type: "text" },
    {
      label: "Available Units",
      fieldName: "Available_Units__c",
      type: "number"
    }
  ];

  // @wire(getProductList)
  // wireProducts({ error, data }) {
  //   if (data) {
  //     // this.allProducts = data;
  //     

  //   }
  // }
  connectedCallback() {
    getProductList().then(data => {
      const allProds = {};
      for (let i = 0; i < data.length; ++i) {
        allProds[`${data[i].Id}`] = data[i];
      }
      console.log(allProds);
      this.allProducts = allProds;
    })
      .catch(error => {
        this.error = error;
      });
  }

  updateSelectedProducts(event) {
    this.selectedProductIds = event.detail;

    const cartProds = this.cartProducts;
    const selectedProdsSet = new Set(this.selectedProductIds);
    //deselected products ko remove karlo pehle
    Object.keys(cartProds).map((ids) => {
      if (!selectedProdsSet.has(ids)) {
        delete cartProds[ids];
      }
    });

    //newly selected to add karo with quantity 1
    this.selectedProductIds.map((ids) => {
      if (!cartProds.hasOwnProperty(ids)) {
        cartProds[ids] = {
          ...this.allProducts[ids],
          Unit: 1
        };
      }
    });

    this.cartProducts = { ...cartProds };
    this.invoiceSelectedProducts = { ...cartProds };
  }

  updateQuantity(event) {
    const records = event.detail;

    for (let i = 0; i < records.length; ++i) {
      this.cartProducts[records[i].Id].Unit = records[i].Unit;
      if (this.invoiceSelectedProducts.hasOwnProperty(records[i].Id)) {
        this.invoiceSelectedProducts[records[i].Id].Unit = records[i].Unit;
      }
    }
    this.invoiceSelectedProducts = { ...this.invoiceSelectedProducts };
  }

  removeFromCart(event) {
    const recId = event.detail;
    const cartProds = this.cartProducts;
    this.selectedProductIds = this.selectedProductIds.filter(
      (prodId) => prodId !== recId
    );
    delete this.invoiceSelectedProducts[recId];
    delete cartProds[recId];
    this.cartProducts = { ...cartProds };
    this.invoiceSelectedProducts = { ...this.invoiceSelectedProducts };

  }

  handleInvoiceSelectedProducts(event) {
    try {
      const newSelectedIds = event.detail;
      const newInvoiceProds = {};
      for (let i = 0; i < newSelectedIds.length; ++i) {
        newInvoiceProds[newSelectedIds[i]] = this.cartProducts[newSelectedIds[i]];
      }
      this.invoiceSelectedProducts = { ...newInvoiceProds };
    } catch (error) {

    }
  }

  handleReset(event) {
    const orderedProdsList = Object.values(this.invoiceSelectedProducts);
    const allProds = JSON.parse(JSON.stringify(this.allProducts));
    for (let i = 0; i < orderedProdsList.length; ++i) {
      allProds[orderedProdsList[i].Id].Available_Units__c -= orderedProdsList[i].Unit;
      if (allProds[orderedProdsList[i].Id].Available_Units__c <= 0) {
        delete allProds[orderedProdsList[i].Id];
      }

    }
    console.log(allProds);
    this.allProducts = { ...allProds };
    this.cartProducts = {};
    this.selectedProductIds = [];
    this.invoiceSelectedProducts = {};

    this.dispatchEvent(
      new CustomEvent('switchcomponent', {
        detail: "ORDER"
      })
    );

  }
  handleComponentChange(event) {
    const component = event.detail;
    this.prodComponent = false;
    this.invoiceComponent = false;
    this.cartComponent = false;
    if (component === "CART") {
      this.cartComponent = true;
    } else if (component === "INVOICE") {
      this.invoiceComponent = true;
    } else if (component === "ORDER") {
      this.dispatchEvent(new CustomEvent('switchcomponent', {
        detail: component
      }));
    } else if (component === "PRODUCT") {
      this.prodComponent = true;
    }
  }
}
