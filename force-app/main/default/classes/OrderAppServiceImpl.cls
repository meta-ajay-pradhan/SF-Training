/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @description logical implemetation of service
*/
public class OrderAppServiceImpl implements IOrderAppService {

    public List<Product2> getProductList() {
        List<Product2> productList = ProductsSelector.newInstance().getAll();
        return productList;
    }

    public List<Order_Line_Item__c> getOrderLineProducts() {
        List<Order_Line_Item__c> orderLineItemsList = OrderLineItemsSelector.newInstance().getAll();
        return orderLineItemsList;
    }

    public void placeOrder(Integer invoice, Map<Id, Integer> orderedProds) {
        fflib_ISObjectUnitOfWork uow = Application.UnitOfWork.newInstance();
        
        Set<Id> prodIds = orderedProds.keySet();

        List<Product2> productsList = ProductsSelector.newInstance().selectById(prodIds);
        Order__c order = new Order__c();
        List<Order__c> orderList = new List<Order__c>{order};
        Orders.newInstance(orderList).addOrder();

        List<Order_Line_Item__c> orderProducts = new List<Order_Line_Item__c>();

        for(Product2 prod: productsList) {
            Order_Line_Item__c orderProd = new Order_Line_Item__c();
            orderProd.Order__c = order.id;
            orderProd.Price__c = prod.Price__c;
            orderProd.Quantity__c = orderedProds.get(prod.Id);
            orderProd.Product__c = prod.Id;
            orderProducts.add(orderProd);
            prod.Available_Units__c -= orderedProds.get(prod.Id); 
        }

        Products.newInstance(productsList).updateProducts();
        OrderLineItems.newInstance(orderProducts).addOrderLineItems();
        
        uow.commitWork();
    }
}