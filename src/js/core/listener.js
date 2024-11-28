import { butCart } from "../app/cart.js";
import { hendlerRender } from "../app/catorgries.js"
import { hendlerproduct } from "../app/product.js";
import { sheet } from "./function.js";
import { but, buttonUi, inven, iv, productUi } from "./selector.js";

const listener=() => {
    buttonUi.addEventListener("click",hendlerRender);
    but.addEventListener("click",sheet);
    iv.addEventListener("click",sheet);
    productUi.addEventListener("click",hendlerproduct);
    inven.addEventListener("click",butCart)
};
export default listener;