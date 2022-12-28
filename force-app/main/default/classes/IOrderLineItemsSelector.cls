/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @group Order_Line_Item__c
*
* @description Selector layer on Order_Line_Item__c
*/
public interface IOrderLineItemsSelector extends fflib_ISObjectSelector {

    /*******************************************************************************************************
    * @description Returns list of all ordered Product for a user
    * @return returns list of all list of all ordered Product for a user
    */
    List<Order_Line_Item__c> getAll();
}