public class Products extends fflib_SObjectDomain implements IProducts {

    public static IProducts newInstance(List<Product2> sObjectList) {
        return (IProducts) Application.Domain.newInstance(sObjectList);
    } 

    public Products(List<Product2> sObjectList) {
        super(sObjectList);
    }

    public class Constructor implements fflib_SObjectDomain.IConstructable {
        public fflib_SObjectDomain construct(List<SObject> sObjectList) {
            return new Products(sObjectList);
        }
    }

    public void updateProducts() {
        Database.update(this.getRecords());
    }
}