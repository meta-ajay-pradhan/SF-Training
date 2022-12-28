/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @description Controller for the Order Application
*/
public with sharing class ProductController {

    private static final IOrderAppService orderAppService = new OrderAppServiceImpl();

    /*******************************************************************************************************
    * @description endpoint to provide list of products
    * @return List<Product2>
    */
    @AuraEnabled(cacheable=false)
    public static List<Product2> getProductList(){
        try {
            return orderAppService.getProductList();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*******************************************************************************************************
    * @description endpoint to get the ordered line items
    * @return List<Order_Line_Item__c>
    */
    @AuraEnabled(cacheable=true)
    public static List<Order_Line_Item__c> getOrderLineProducts(){
        try {
            return orderAppService.getOrderLineProducts();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    /*******************************************************************************************************
    * @description endpoint to place an order request
    * @param invoice:Integer an invoice number
    * @param orderedProds:Map<Id,Integer> map of product id and the product quantity to be ordered
    * @return void
    */
    @AuraEnabled
    public static void placeOrder(Integer invoice, Map<Id, Integer> orderedProds){
        orderAppService.placeOrder(invoice, orderedProds);
    }
}