public interface IProductsSelector extends fflib_ISObjectSelector {
    List<Product2> getAll();
    List<Product2> selectById(Set<Id> idSet);
}
