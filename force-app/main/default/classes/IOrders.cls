/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @group Order__c
*
* @description Domain layer on Order__c
*/
public interface IOrders extends fflib_ISObjectDomain {

    /*******************************************************************************************************
    * @description inserts List<Order__c> to DB
    * List<Order_c> must be set to this.Records s
    * @return void
    */
    void addOrder();
}