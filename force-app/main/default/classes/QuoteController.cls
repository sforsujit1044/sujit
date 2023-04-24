public without sharing class QuoteController {
    @AuraEnabled(cacheable=true)
    public static QuoteDto GetQuoteRecordDetails(String recordId){
        Quote__c quote = [SELECT ID, Name, Start_Date__c, EndDate__c FROM Quote__c WHERE ID=:recordId LIMIT 1];
        QuoteDto quoteDto = new QuoteDto(quote);
        return quoteDto;
    }

    @AuraEnabled
    public static Decimal getTotalQuoteAmount(String recordId){
        return [SELECT ID, TotalQuotedAmount__c FROM Quote__c WHERE ID=:recordId LIMIT 1].TotalQuotedAmount__c;
    }
}