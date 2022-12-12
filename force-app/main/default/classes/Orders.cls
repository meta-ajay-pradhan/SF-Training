public class Orders extends fflib_SObjectDomain implements IOrders {

    public static IOrders newInstance(List<Order__c> sObjectList) {
        return (IOrders)  Application.Domain.newInstance(sObjectList);
    }

    public Orders(List<Order__c> sObjectList) {
        super(sObjectList);
    }

    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjectList) {
            return new Orders(sObjectList);
        }
    }

    public void addOrder() {
        Database.insert(this.getRecords());
    }
}