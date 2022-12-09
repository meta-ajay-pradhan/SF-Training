public class ProductsSelector extends fflib_SObjectSelector implements IProductsSelector {

    public List<Schema.SObjectField> getSObjectFieldList() {
        return new List<Schema.SObjectField> {
            Product2.Name,
            Product2.ProductCode,
            Product2.Price__c,
            Product2.Available_Units__c
        };
    }

    public Schema.SObjectType getSObjectType() {
        return Product2.sObjectType;
    }

    public List<Product2> getAll() {
        fflib_QueryFactory query = newQueryFactory();
        return (List<Product2>) Database.query(query.toSOQL());
    }
    public List<Product2> selectById(Set<Id> idSet) {
        fflib_QueryFactory query = newQueryFactory();
        query.setCondition('Id IN :idSet');
        return (List<Product2>) Database.query(query.toSOQL());
    }
}
