/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @group Order_Line_Item__c
*
* @description Domain layer on Order_Line_Item__c
*/
public interface IOrderLineItems extends fflib_ISObjectDomain {
    /*******************************************************************************************************
    * @description adds order line items to DB
    * this.Records must be set with List<Order_Line_Item__c>
    * @return void
    */
    void addOrderLineItems();
}