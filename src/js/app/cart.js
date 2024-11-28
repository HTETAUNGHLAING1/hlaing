

import { cartCount1, cartCount2, cartTemplate, productUi, totalCount } from "../core/selector.js"

export const cartUi=(product,quality) => {
    const template=cartTemplate.content.cloneNode(true);
    template.querySelector(".cart-item ").setAttribute("cart-item-id",product.id);
    template.querySelector(".product-image").src=product.image;
    template.querySelector(".product-title").innerText=product.title;
    template.querySelector(".product-price").innerText=product.price;
    template.querySelector(".product-cost").innerText=product.price;
    template.querySelector(".row-q").innerText=quality;
    return template;
};
export const cartUpdate=() => {
    const count=document.querySelectorAll(".cart-item");
    // console.log(count.length);
    return count.length;
};
export const UpdateCart=() => {
    const update=cartUpdate();
    cartCount1.innerText=update;
    cartCount2.innerText=update;
};
export const CountUpdate=() => {
    const Count=[...document.querySelectorAll(".product-price")].reduce((pv,cv) => {pv+parseFloat(cv.innerText),0});
    return Count;
};
export const UpdateCount=() => {
    const count=CountUpdate();
    totalCount.innerText=count;
};
export const butCart=(event) => {
    if(event.target.classList.contains("buttonCart")){
        const curr=event.target.closest(".cart-item");
        const current=curr.getAttribute("cart-item-id");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              })
            const currentBtn=productUi.querySelector(`[product-id='${current}']`);
             if(currentBtn){
                const ch=currentBtn.querySelector(".pro");
                ch.removeAttribute("disabled");
                ch.innerText="Add To Cart";
                
             }
             curr.remove();
             UpdateCart();
           UpdateCount();
            }
          });
    }
    else if(event.target.classList.contains("row-htet")){
        const curr=event.target.closest(".cart-item");
        const currentPrice=curr.querySelector(".product-price");
        const currentCost=curr.querySelector(".product-cost");
        const currentQ=curr.querySelector(".row-q");
        currentQ.innerText=parseInt(currentQ.innerText)+1;
        currentCost.innerText=(currentPrice.innerText*currentQ.innerText).toFixed(2);
        UpdateCount();
    }
    else if(event.target.classList.contains("row-hlaing")){
        const curr=event.target.closest(".cart-item");
        const currentPrice=curr.querySelector(".product-price");
        const currentCost=curr.querySelector(".product-cost");
        const currentQ=curr.querySelector(".row-q");
       if(currentQ.innerText>1){
        currentQ.innerText=parseInt(currentQ.innerText)-1;
        currentCost.innerText=(currentPrice.innerText*currentQ.innerText).toFixed(2);
       }else{
        curr.remove();
        UpdateCart();
        UpdateCount();    
       }
    }
};

