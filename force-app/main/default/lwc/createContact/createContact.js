import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import Contact from '@salesforce/schema/Contact';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Phone from '@salesforce/schema/Account.Phone';
import Email from '@salesforce/schema/Contact.Email';
import Fax from '@salesforce/schema/Account.Fax';

export default class CreateContact extends LightningElement {
    @api objectApiName;
    fields = [FirstName, LastName, Phone, Email, Fax];

    handleSuccess(event) {
        const showToastEvent = new ShowToastEvent({
            title: "Contact Successfully create",
            message: "Contact created ",
            variant: "success"
        });
        this.dispatchEvent(showToastEvent);
    }
}