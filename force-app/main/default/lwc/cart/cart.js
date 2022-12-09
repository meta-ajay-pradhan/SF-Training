import { api, LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Cart extends LightningElement {
  isDisabled = true;
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

  invoiceProdIds = [];
  @api
  get invoiceProductIds() {
    return this.invoiceProdIds;
  }
  set invoiceProductIds(value) {
    this.invoiceProdIds = Object.keys(value);
    this.isDisabled = this.invoiceProductIds.length <= 0;
  }

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
    if (this.invoiceProductIds.length > 0) {
      this.template.querySelector(
        '[data-id="datarowcart"]'
      ).selectedRows = this.invoiceProductIds;
    }
  }

  updatePage(event) {
    this.currentPage = event.detail;
    this.handlePage();
  }

  rowSelection(event) {
    try {
      const newSelectedIds = [...event.detail?.selectedRows].map(prod => prod.Id);
      const newSelectedIdsSet = new Set(newSelectedIds);
      const invoiceSelectedIds = new Set(this.invoiceProductIds);
      const currPageProdIDs = this.products.map(prod => prod.Id);
      for (let i = 0; i < currPageProdIDs.length; ++i) {
        if ((!newSelectedIdsSet.has(currPageProdIDs[i])) && invoiceSelectedIds.has(currPageProdIDs[i])) {
          invoiceSelectedIds.delete(currPageProdIDs[i]);
        }
      }
      for (let i = 0; i < newSelectedIds.length; ++i) {
        invoiceSelectedIds.add(newSelectedIds[i]);
      }
      const invoiceChangeEvent = new CustomEvent("invoiceselectedproducts", {
        detail: [...invoiceSelectedIds]
      });
      this.dispatchEvent(invoiceChangeEvent);

    } catch (error) {
      console.log(error);
    }
  }

  switchToInvoice() {
    const compChangeEvt = new CustomEvent('switchcomponent', {
        detail: "INVOICE"
    })
    this.dispatchEvent(compChangeEvt);
  }

  switchToProd() {
    this.dispatchEvent(
      new CustomEvent( 'switchcomponent', {
        detail: "PRODUCT"
      })
    )
  }
}
