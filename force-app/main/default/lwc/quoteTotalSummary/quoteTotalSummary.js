/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    isModalOpen = false;
    totalQuoteAmount;
    handleAdjustQuoteClick() {
        const modalEvent = new CustomEvent("openmodal", {
            detail: true
            });
        this.dispatchEvent(modalEvent); 
    }
}
