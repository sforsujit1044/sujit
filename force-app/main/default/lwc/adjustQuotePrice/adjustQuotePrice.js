/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import {LightningElement , api} from "lwc";

export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";
  @api adjustedAmount = 0;

  handleAmountChange(event){
    this.adjustedAmount = event.target.value;
    const quoteAmountEvent = new CustomEvent("quoteamount", {
      detail: this.adjustedAmount
    });
    this.dispatchEvent(quoteAmountEvent);
  }
}
