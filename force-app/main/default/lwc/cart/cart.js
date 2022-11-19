import { api, LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Cart extends LightningElement {
  products = [];
  @api allProducts;
  cartProd;
  @api
  get cartProducts() {
    return this.cartProd;
  }
  set cartProducts(value) {
    this.cartProd = Object.values(value);
    this.initPagination();
    this.handlePage();
  }

  @api selectedProductIds;

  col;
  @api
  get columns() {
    return this.col;
  }
  set columns(value) {
    this.col = [
      ...value,
      { label: "Unit", fieldName: "Unit", type: "number", editable: true },
      {
        type: "button",
        iconName: "utility:delete",
        typeAttributes: {
          iconName: "utility:delete",
          name: "Delete",
          title: "Delete",
          disabled: false,
          value: "delete",
          iconPosition: "right"
        },
        iconPosition: "center"
      }
    ];
  }
  draftValues;

  currentPage = 1;
  totalPage = 0;
  productsPerPage = 5;
  totalCartProducts = 0;

  handleSave(event) {
    const records = event.detail.draftValues.slice().map((draftValue) => {
      const fields = Object.assign({}, draftValue);
      return fields;
    });
    //validation add krna hain
    let error = "";
    records.map((r) => {
      if (
        parseInt(r.Unit) <= 0 ||
        parseInt(r.Unit) > this.allProducts[r.Id].Available_Units__c
      ) {
        error += this.allProducts[r.Id].Name + "\n";
      }
    });

    if (error.length > 0) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error, Invalid Unit for",
          message: error,
          variant: "error"
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent("updatequantity", {
          detail: records
        })
      );

      this.dispatchEvent(
        new ShowToastEvent({
          title: "Unit Successfully Updated!",
          variant: "success"
        })
      );
    }
    this.draftValues = [];
  }

  callRowAction(event) {
    const recId = event.detail.row.Id;
    const actionName = event.detail.action.name;
    let customEvent;
    switch (actionName) {
      case "Delete":
        customEvent = new CustomEvent("removefromcart", {
          detail: recId
        });
        break;
    }
    if (customEvent) {
      this.dispatchEvent(customEvent);
    }
  }

  initPagination() {
    this.totalCartProducts = this.cartProducts.length;
    this.totalPage = parseInt(
      Math.ceil(this.totalCartProducts / this.productsPerPage)
    );
    this.currentPage = 1;
  }

  handlePage() {
    this.products = this.cartProducts?.slice(
      (this.currentPage - 1) * this.productsPerPage,
      (this.currentPage - 1) * this.productsPerPage + this.productsPerPage
    );
    if (this.cartProducts.length > 0) {
      this.template.querySelector(
        '[data-id="datarowcart"]'
      ).selectedRows = this.selectedProductIds;
    }
  }

  updatePage(event) {
    this.currentPage = event.detail;
    this.handlePage();
  }

  rowSelection(event) {
    try {
      const selectedProducts = [...event.detail?.selectedRows].map(prod => prod.Id);
      const invoiceChangeEvent = new CustomEvent("invoiceselectedproducts", {
        detail: selectedProducts
      });
      this.dispatchEvent(invoiceChangeEvent);
    } catch (error) {
      console.log(error);
    }
  }
}
