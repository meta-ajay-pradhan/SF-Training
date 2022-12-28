/**
* @author ajay.pradhan@metacube.com
* @date 2022
*
* @group Product2
*
* @description Domain layer on Product2
*/
public interface IProducts extends fflib_ISObjectDomain {
    /*******************************************************************************************************
    * @description updates List<Product2> to the db
    * List<Product2> must be set to this.Records
    * @return void
    */
    void updateProducts();
}