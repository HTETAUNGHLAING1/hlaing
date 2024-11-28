import { products } from "../core/data.js";
import { buttonUi,catagoriesTemplate } from "../core/selector.js";
import { productRender } from "./product.js";

export const catogriesUI=(catname) => {
    const template=catagoriesTemplate.content.cloneNode(true);
    template.querySelector(".but").innerText=catname;
    return template;
}
export const catogriesRender=(el) => {
    el.forEach(e=> {
        buttonUi.append(catogriesUI(e))
    });
};
export const hendlerRender=(event) => {
    if(event.target.classList.contains("cart")){
        const currentE=event.target;
        const cu=document.querySelector(".cart.active")?.classList.remove("active");
        currentE.classList.add("active");
        const currentCatories=event.target.innerText;
        productRender(products.filter(el => 
            el.category === currentCatories || currentCatories === "All"
        ))
    }
}