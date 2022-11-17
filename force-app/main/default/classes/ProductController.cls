public with sharing class ProductController {
    public ProductController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList(){
        try {
            return [SELECT Name, ProductCode, Price__c, Available_Units__c FROM Product2 WHERE Available_Units__c > 0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
