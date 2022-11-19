import { api, LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Cart extends LightningElement {
  @api allProducts;
  cartProd;
  @api
  get cartProducts() {
    return this.cartProd;
  }
  set cartProducts(value) {
    this.cartProd = Object.values(value);
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
    const recId =  event.detail.row.Id;  
    const actionName = event.detail.action.name;
    let customEvent;
    switch(actionName) {
        case 'Delete' : 
        customEvent = new CustomEvent('removefromcart', {
                detail: recId
            });
            break;
    }
    if(customEvent){
        this.dispatchEvent(customEvent);
    }
  }
}
