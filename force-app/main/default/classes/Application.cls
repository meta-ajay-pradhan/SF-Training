public class Application {
    //UnitOfWork
    public static final fflib_Application.UnitOfWorkFactory UnitOfWork = 
        new fflib_Application.UnitOfWorkFactory(
            new List<SObjectType> {
                Product2.SObjectType,
                Order_Line_Item__c.SObjectType,
                Order__c.SObjectType
            }
        );

    //Service Factory
}