/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire ,track} from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from "lightning/uiRecordApi";
import GET_QUOTE_RECORD_DETAILS from '@salesforce/apex/QuoteController.GetQuoteRecordDetails';
import QUOTE_ID from "@salesforce/schema/Quote__c.Id";
import QUOTE_START_DATE from "@salesforce/schema/Quote__c.Start_Date__c";
import QUOTE_END_DATE from "@salesforce/schema/Quote__c.EndDate__c";

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData = { // Added @track because even if all the properties are trackable by default, the framework cannnot track inner value inside collection, hence need to use @track here
    name: '',
    endDate: '',
    startDate : ''
  };

  quoteRecordData;
  @wire(GET_QUOTE_RECORD_DETAILS, {recordId:'$recordId'})
  quoteData({data, error}){
    if(data){
      this.quoteRecordData = data;
      this.quoteData.name = this.quoteRecordData.name;
      this.quoteData.startDate = this.quoteRecordData.startDate;
      this.quoteData.endDate = this.quoteRecordData.endDate;
    }
    if(error){
      console.error(error);
    }
  }

  handleSave(){
    const fields = {};
    fields[QUOTE_ID.fieldApiName] = this.recordId;
    fields[QUOTE_START_DATE.fieldApiName] = this.StartDate;
    fields[QUOTE_END_DATE.fieldApiName] = this.EndDate;
    const recordInput = {
      fields: fields
    };

    updateRecord(recordInput).then((record) => {
      console.log(record);
    });
    this.showToastUtility('Success!', 'Saved Quote Details', 'success');
  }

  StartDate;
  EndDate;
  handleStartDateChange(event){
    this.StartDate = event.detail.value;
  }
  handleEndDateChange(event){
    this.EndDate = event.detail.value;
  }

  showToastUtility(title, message, variant){
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant : variant
    });
    this.dispatchEvent(event);
  }

}
