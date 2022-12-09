public class Orders extends fflib_SObjectDomain implements IOrders {

    public Orders(List<Order__c> sObjectList) {
        super(sObjectList);
    }

    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjectList) {
            return new Orders(sObjectList);
        }
    }

    public void addOrder(List<Order__c> orderList) {
        insert orderList;
    }
}