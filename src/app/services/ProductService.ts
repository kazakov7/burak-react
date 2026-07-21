import { serverApi } from "../../lib/config";
import { Product, ProductInquery } from "../../lib/types/product";
import axios from "axios";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }
  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCollection) {
        url += `&productCollection=${input.productCollection}`;
      }
      if (input.search) {
        url += `&search=${input.search}`;
      }
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log("Error", err);
      throw err;
    }
  }
}
export default ProductService;
