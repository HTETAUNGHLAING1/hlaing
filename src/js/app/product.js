import { products } from "../core/data.js";
import {  cartItemGroup, inven, opendrawer, productTemplate, productUi } from "../core/selector.js"
import { cartUi, UpdateCart, UpdateCount } from "./cart.js";
// import 'animate.css';
export const productU=(product) => {
    const template=productTemplate.content.cloneNode(true);
    template.querySelector(".productCart").setAttribute("product-id",product.id);
    template.querySelector(".product-title").innerText=product.title;
    template.querySelector(".product-ds").innerText=product.description;
    template.querySelector(".product-rc").innerText=`${product.rating.rate}/${product.rating.count}`;
    template.querySelector(".product-price").innerText=product.price;
    template.querySelector(".product-image").src=product.image;
    let star="";
    for(let i=1;i<=5;i++){
        star +=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                                class="size-6 ${i<=Math.round(product.rating.rate)?'fill-gray-700':'fill-gray-400'}">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                            </svg>`
    }
    template.querySelector(".product-star").innerHTML=star;
    const currentC=inven.querySelector(`[cart-item-id='${product.id}']`);
    if(currentC){
        template.querySelector(".pro").setAttribute("disabled",true);
        template.querySelector(".pro").innerText="Add";
    }
    return template;
};
export const productRender=(products) => {
    productUi.innerHTML="";
    products.forEach(el => {
        productUi.append(productU(el));
    });
};
export const hendlerproduct=(event) => {
    if(event.target.classList.contains("pro")){
        const currentBtn=event.target;
        currentBtn.setAttribute("disabled",true);
        currentBtn.innerText="Add";
        const currentProductCart=event.target.closest(".productCart");
        const currentProductId=parseInt(currentProductCart.getAttribute("product-id"));
        const currentProduct=products.find(el => el.id === currentProductId);
        const curr=currentProductCart.querySelector(".product-image");
        const animateImage=new Image();
        animateImage.src=curr.src;
        animateImage.style.position="fixed";
        animateImage.style.top=curr.getBoundingClientRect().top + "px";
        animateImage.style.left=curr.getBoundingClientRect().left + "px";
        animateImage.style.width=curr.getBoundingClientRect().width + "px";
        animateImage.style.height=curr.getBoundingClientRect().height + "px";
        document.body.append(animateImage);
        const keyframe=[
            {
                top:curr.getBoundingClientRect().top + "px",
                left:curr.getBoundingClientRect().left + "px"

            },
            {
                top:opendrawer.querySelector("svg").getBoundingClientRect().top + "px",
                left:opendrawer.querySelector("svg").getBoundingClientRect().left + "px",
                height:"0px",
                width:"0px",
                transform:"rotate(2turn)"
            }
        ];
        const duration=500;
        const addCartToCart=animateImage.animate(keyframe,duration);
        addCartToCart.addEventListener("finish",() => {
            animateImage.remove();
            opendrawer.classList.add("animate__tada");
            cartItemGroup.append(cartUi(currentProduct,1));
             UpdateCart();
             UpdateCount();
        });
        // const currentProduct=event.target.closest(".productCart");
        // const currentProductId=parseInt(currentProduct.getAttribute("product-id"));
        // const currentProductCa=products.find(el => {
        //     el.id === currentProductId
        // });
        //  inven.append(cartUi(currentProductCa,1));
    }
    }