public class OrderLineItems extends fflib_SObjectDomain implements IOrderLineItems {
    public OrderLineItems(List<Order_Line_Item__c> sObjectList) {
        super(sObjectList);
    }

    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjectList) {
            return new OrderLineItems(sObjectList);
        }
    }

    public void addOrderLineItems(List<Order_Line_Item__c> orderLineItemList) {
        insert orderLineItemList;
    }
}