/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @group Product2
*
* @description Selector layer on Product2
*/
public interface IProductsSelector extends fflib_ISObjectSelector {
    
    /*******************************************************************************************************
    * @description gets list of all products
    * @return List<Product2>
    */
    List<Product2> getAll();

    /*******************************************************************************************************
    * @description gets list of products filtered by product id
    * @param idSet:Set<Id> set of products id to be fetched
    * @return List<Product2>
    */
    List<Product2> selectById(Set<Id> idSet);
}