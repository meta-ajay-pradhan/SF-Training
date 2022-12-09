public class OrderLineItemsSelector extends fflib_SObjectSelector implements IOrderLineItemsSelector {
    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField> {
            Order_Line_Item__c.Product__c,
            Order_Line_Item__c.Status__c,
            Order_Line_Item__c.Total__c
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Order_Line_Item__c.sObjectType;
    }

    public List<Order_Line_Item__c> getAll() {
        fflib_QueryFactory query = newQueryFactory();
        return (List<Order_Line_Item__c>) Database.query(query.toSOQL());
    }
}