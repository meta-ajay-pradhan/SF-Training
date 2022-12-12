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
    public static final fflib_Application.ServiceFactory Service = 
            new fflib_Application.ServiceFactory(
                new Map<Type, Type> {
                    IOrderAppService.class => OrderAppServiceImpl.class
                }
            );
    
    //Selector Factory
    public static final fflib_Application.SelectorFactory Selector = 
            new fflib_Application.SelectorFactory(
                new Map<SObjectType, Type> {
                    Product2.SObjectType => ProductsSelector.class,
                    Order_Line_Item__c.SObjectType => OrderLineItemsSelector.class
                }
            );

    //Domain Factory
    public static final fflib_Application.DomainFactory Domain = 
            new fflib_Application.DomainFactory(
                Application.Selector,
                new Map<SObjectType, Type> {
                    Product2.SObjectType => Products.Constructor.class,
                    Order_Line_Item__c.SObjectType => OrderLineItems.Constructor.class,
                    Order__c.SObjectType => Orders.Constructor.class
                }
            );
}