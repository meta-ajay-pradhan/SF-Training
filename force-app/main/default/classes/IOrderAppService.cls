public interface IOrderAppService {
    List<Product2> getProductList();
    List<Order_Line_Item__c> getOrderLineProducts();
    void placeOrder(Integer invoice, Map<Id, Integer> orderedProds);
}