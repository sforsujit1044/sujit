public without sharing class QuoteDto extends BaseDto {
  public QuoteDto(Quote__c quote) {
    super(quote);
  }

  public override SObject refreshSo() {
    return null;
  }
}
