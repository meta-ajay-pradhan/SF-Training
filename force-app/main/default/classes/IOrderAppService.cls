/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @description Service Interface for Order Application
*/
public interface IOrderAppService {
    
    /*******************************************************************************************************
    * @description Returns list of all Products
    * @return returns list of all Products
    */
    List<Product2> getProductList();

    /*******************************************************************************************************
    * @description Returns list of all ordered Product for a user
    * @return returns list of all list of all ordered Product for a user
    */
    List<Order_Line_Item__c> getOrderLineProducts();

    /*******************************************************************************************************
    * @description Places an order for a user
    * @param invoice:Integer auto generated random invoice number
    * @param orderedProds:Map<Id,Integer> map of product id and quantity of product
    * @return void
    */
    void placeOrder(Integer invoice, Map<Id, Integer> orderedProds);
}