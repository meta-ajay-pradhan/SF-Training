public with sharing class ProductController {
    public ProductController() {

    }

    @AuraEnabled(cacheable=false)
    public static List<Product2> getProductList(){
        try {
            return OrderAppServiceImpl.getProductList();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Order_Line_Item__c> getOrderLineProducts(){
        try {
            return OrderAppServiceImpl.getOrderLineProducts();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void placeOrder(Integer invoice, Map<Id, Integer> orderedProds){
        OrderAppServiceImpl.placeOrder(invoice, orderedProds);
    }
}