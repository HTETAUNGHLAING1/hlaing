import { catogriesRender } from "./app/catorgries.js";
import { productRender } from "./app/product.js";
import { catogries, products } from "./core/data.js";
import listener from "./core/listener.js";

class shop{
 init(){
    catogriesRender(catogries);
    productRender(products);
    listener();
 }
};
export default shop;