@isTest
private class OrderAppServiceTest {

    @isTest
    private static void getProductListTest() {
        List<Product2> testProdList = new List<Product2> {
            new Product2(
                Id = fflib_IDGenerator.generate(Product2.SObjectType),
                Name = 'Test Product',
                Price__c = 100,
                Available_Units__c = 50
            )
        };

        fflib_ApexMocks mocks = new fflib_ApexMocks();
        IProductsSelector ProductsSelectorMock = (IProductsSelector) mocks.mock(ProductsSelector.class);

        mocks.startStubbing();
        mocks.when(ProductsSelectorMock.sObjectType()).thenReturn(Product2.SObjectType);
        mocks.when(ProductsSelectorMock.getAll()).thenReturn(testProdList);
        mocks.stopStubbing();

        Application.Selector.setMock(ProductsSelectorMock);
        Test.startTest();
        List<Product2> resultProductList = OrderAppServiceImpl.getProductList();
        Test.stopTest();

        System.assertEquals(testProdList, resultProductList);

        ((IProductsSelector) mocks.verify(ProductsSelectorMock)).getAll();
    }

    @isTest
    private static void getOrderLineProductsTest() {
        List<Order_Line_Item__c> testItemList = new List<Order_Line_Item__c>{
            new Order_Line_Item__c(
                Id = fflib_IDGenerator.generate(Order_Line_Item__c.SObjectType),
                Order__c = fflib_IDGenerator.generate(Order__c.SObjectType)
            )
        };

        fflib_ApexMocks mocks = new fflib_ApexMocks();
        IOrderLineItemsSelector OrderLineItemsSelectorMock = (IOrderLineItemsSelector) mocks.mock(OrderLineItemsSelector.class);

        mocks.startStubbing();
        mocks.when(OrderLineItemsSelectorMock.sObjectType()).thenReturn(Order_Line_Item__c.SObjectType);
        mocks.when(OrderLineItemsSelectorMock.getAll()).thenReturn(testItemList);
        mocks.stopStubbing();

        Application.Selector.setMock(OrderLineItemsSelectorMock);

        Test.startTest();
        List<Order_Line_Item__c> resultList = OrderAppServiceImpl.getOrderLineProducts();
        Test.stopTest();

        System.assertEquals(testItemList, resultList);

        ((IOrderLineItemsSelector) mocks.verify(OrderLineItemsSelectorMock)).getAll();

    }

    @isTest
    private static void placeOrderTest() {

        //Data
        List<Product2> testProdList = new List<Product2> {
            new Product2(
                Id = fflib_IDGenerator.generate(Product2.SObjectType),
                Name = 'Test Product',
                Price__c = 100,
                Available_Units__c = 50
            )
        };

        Map<Id, Integer> testInputParam = new Map<Id,Integer>();
        testInputParam.put(testProdList[0].Id, 5);
        Set<Id> prodIdList = new Set<Id> {
            testProdList[0].Id
        };

        //mocks
        fflib_ApexMocks mocks = new fflib_ApexMocks();
        fflib_ISObjectUnitOfWork uowMock = new fflib_SObjectMocks.SObjectUnitOfWork(mocks);

        IProducts ProductsDomainMock = (IProducts) mocks.mock(Products.class);
        IOrders OrdersDomainMock = (IOrders) mocks.mock(Orders.class);
        IOrderLineItems OrderLineItemsDomainMock = (IOrderLineItems) mocks.mock(OrderLineItems.class);

        IProductsSelector ProductsSelectorMock = (IProductsSelector) mocks.mock(ProductsSelector.class);

        mocks.startStubbing();

        mocks.when(ProductsDomainMock.sObjectType()).thenReturn(Product2.SObjectType);
        mocks.when(OrdersDomainMock.sObjectType()).thenReturn(Order__c.SObjectType);
        mocks.when(OrderLineItemsDomainMock.sObjectType()).thenReturn(Order_Line_Item__c.SObjectType);
        mocks.when(ProductsSelectorMock.sObjectType()).thenReturn(Product2.SObjectType);
        mocks.when(ProductsSelectorMock.selectById(prodIdList)).thenReturn(testProdList);

        mocks.stopStubbing();

        Application.UnitOfWork.setMock(uowMock);
        Application.Domain.setMock((fflib_ISObjectDomain) ProductsDomainMock);
        Application.Domain.setMock((fflib_ISObjectDomain) OrdersDomainMock);
        Application.Domain.setMock((fflib_ISObjectDomain) OrderLineItemsDomainMock);
        Application.Selector.setMock(ProductsSelectorMock);

        Test.startTest();
        OrderAppServiceImpl.placeOrder(2342342, testInputParam);
        Test.stopTest();


        ((IProductsSelector) mocks.verify(ProductsSelectorMock)).selectById(prodIdList);
        ((IProducts) mocks.verify(ProductsDomainMock)).updateProducts();
        ((IOrders) mocks.verify(OrdersDomainMock)).addOrder();
        ((IOrderLineItems) mocks.verify(OrderLineItemsDomainMock)).addOrderLineItems();

        ((fflib_ISObjectUnitOfWork) mocks.verify(uowMock, 1)).commitWork();
        
    }
}