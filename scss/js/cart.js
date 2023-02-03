const cartsListDom = document.querySelector(".cartList")
const deleteAllCartBtn = document.querySelector(".deleteAllCartBtn")
const totalPrice = document.querySelector(".totalPrice")
const orderBtn = document.querySelector(".orderBtn")

let cartListData = []
let localUserId = localStorage.getItem("userId")
const cartInit = () => {
    getCartList()
}

//token 
AUTH


//購物車renderHTML
const renderCartHTML = (item) => {
    return `<tr>
                                <td>
                                    <div class="cartProduct d-flex align-items-center flex-wrap w-100">
                                            <img width="130px" class="me-lg-3 mt-4 mt-md-0"
                                                src="${item.product.images}"
                                                alt="">
                                    <p class="pt-lg-2">${item.product.title}</p>
                                    </div>
                                </td>
                                <td>NT$${toThousands(item.product.price)}</td>
                                <td>
                                    <div class="cartNum d-flex">
                                        <a href="#" >
                                            <i class="fa-solid fa-minus fa-xl text-black js-reduce" data-status="minus" data-reduceNum="${item.productId}" data-cartId="${item.id}"></i>
                                        </a>
                                        <span class="d-inline-block mx-1 number">${item.qty}</span>
                                        <a href="#">
                                            <i class="fa-sharp fa-solid fa-plus fa-xl text-black js-add" data-status="plus" data-addNum="${item.productId}" data-cartId="${item.id}"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>NT$${toThousands(item.product.price * item.qty)}</td>
                                <td class="deleteCartItemBtn">
                                    <a href="#" class="cartDeleteIcon">
                                    <i class="fa-solid fa-trash-can cartDelete text-center ms-3 text-third pe-2" data-btn="delete" data-deleteCartId="${item.id}"></i>
                                    </a>
                                </td>
                            </tr>`
}


// 產品列表購物車初始化
let getCartList = ()=>{
    let totalMoney =0
    axios.get(`${baseUrl}/users/${localUserId}/carts?_expand=product`)
    .then((res=>{
        cartListData = res.data
        let str =''
        cartListData.forEach((item=>{
            totalMoney += item.qty * item.product.price
            let getTotalPrice = "NT$" + totalMoney
            totalPrice.textContent = toThousands(getTotalPrice)
            str += renderCartHTML(item)
        }))
        cartsListDom.innerHTML = str
    })).catch((error => {
        console.log(error);
    }))
}

//增減商品數量
cartsListDom.addEventListener("click", function (e) {
    e.preventDefault();
    let target = e.target.dataset;
    let status = target.status;
    let cartId = target.cartid;
    console.log( target);
    axios.get(`${baseUrl}/carts/${cartId}`)
    .then((res=>{
        console.log(res);
        let reviseQuantity = res.data.qty;
        if (status === "plus") {
            reviseQuantity++;
            console.log(reviseQuantity);
        }
        else if (status === "minus"){
            if (reviseQuantity == 1) {
                Swal.fire('數量不可低於1','請檢察數量', 'error')
                return;
            }
            else{
                reviseQuantity --;
            }
        }
        patchProductNum(cartId, reviseQuantity);
    })).catch(function (error) {
        console.log(error);
    });
});
function patchProductNum(cartId, reviseQuantity) {
    console.log(cartId, reviseQuantity);
    const data = {
        qty: reviseQuantity
    }
    axios.patch(`${baseUrl}/carts/${cartId}`,data)
        .then(function (response) {
            console.log(response);
            getCartList()
        })
        .catch(function (error) {
            console.log(error);
        });
}

//刪除購物車商品
cartsListDom.addEventListener("click", function (e) {
    e.preventDefault();
    let target = e.target.dataset;
    let cartId = target.deletecartid;
    console.log(target)
    if (target.btn === "delete") {
        deleteCartItem(cartId);
    } else {
        return;
    }
});
function deleteCartItem(cartId) {
    axios
        .delete(`${baseUrl}/carts/${cartId}`)
        .then(function (response) {
            console.log(response);
            getCartList()
        })
        .catch(function (error) {
            console.log(error);
        });
}

//前往訂單運送 訂單資料從運送頁面post送出到orders
orderBtn.addEventListener("click",e=>{
    e.preventDefault()

    window.location.replace('cartDelivery.html');

})



cartInit()
