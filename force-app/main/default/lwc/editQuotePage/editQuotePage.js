/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import GET_TOTAL_QUOTE_AMOUNT from '@salesforce/apex/QuoteController.getTotalQuoteAmount';
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import QUOTE_ID from "@salesforce/schema/Quote__c.Id";
import QUOTE_AMOUNT from "@salesforce/schema/Quote__c.TotalQuotedAmount__c";
export default class EditQuotePage extends LightningElement {
  @api recordId;
  isModalOpen = false;
  totalQuoteAmount
  quoteAmountToUpdate
  handleModal(){
    this.isModalOpen = true;
    GET_TOTAL_QUOTE_AMOUNT({recordId : this.recordId})
            .then(result => {
                console.log(result);
                this.totalQuoteAmount = result;
            })
            .catch(error => {
                this.error = error;
            });
            this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  saveAmountToQuote(){
    const fields = {};
    fields[QUOTE_ID.fieldApiName] = this.recordId;
    fields[QUOTE_AMOUNT.fieldApiName] = this.quoteAmountToUpdate;
    const recordInput = {
        fields: fields
    };

    updateRecord(recordInput).then((record) => {
        console.log(record);
    });
    this.showToastUtility('Success!', 'Saved Quote Details', 'success');
    this.isModalOpen = false;
  }

  showToastUtility(title, message, variant){
      const event = new ShowToastEvent({
        title: title,
        message: message,
        variant : variant
      });
      this.dispatchEvent(event);
  }
  quoteAmountToUpdate;
  handleQuoteAmount(event){
      this.quoteAmountToUpdate = event.detail;
  }
}
