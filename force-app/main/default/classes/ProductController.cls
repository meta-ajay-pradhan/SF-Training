public with sharing class ProductController {
    public ProductController() {

    }

    @AuraEnabled(cacheable=false)
    public static List<Product2> getProductList(){
        try {
            return [SELECT Name, ProductCode, Price__c, Available_Units__c FROM Product2 WHERE Available_Units__c > 0];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Order_Line_Item__c> getOrderLineProducts(){
        try {
            return [SELECT Product__c, Status__c, Total__c FROM Order_Line_Item__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void placeOrder(Integer invoice, Map<Id, Integer> orderedProds){
        Savepoint sp = Database.setSavepoint();
        try {
            Set<Id> prodIds = orderedProds.keySet();
            List<Product2> products = [SELECT Available_Units__c, Price__c FROM Product2 Where Id in :prodIds];
            Order__c order = new Order__c();
            insert order;

            List<Order_Line_Item__c> orderProducts = new List<Order_Line_Item__c>();

            for(Product2 prod: products) {
                Order_Line_Item__c orderProd = new Order_Line_Item__c();
                orderProd.Order__c = order.id;
                orderProd.Price__c = prod.Price__c;
                orderProd.Quantity__c = orderedProds.get(prod.Id);
                orderProd.Product__c = prod.Id;
                orderProducts.add(orderProd);
                prod.Available_Units__c -= orderedProds.get(prod.Id); 
            }

            update products;
            insert orderProducts;
            
        } catch (Exception e) {
            Database.rollback(sp);
            throw new AuraHandledException(e.getMessage());
        }
    }
}