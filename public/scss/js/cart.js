const cartsListDom = document.querySelector(".cartList")
const deleteAllCartBtn = document.querySelector(".deleteAllCartBtn")
const totalPrice = document.querySelector(".totalPrice")
const orderBtn = document.querySelector(".orderBtn")

let cartListData = []

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
                                <td>NT$${item.product.price}</td>
                                <td>
                                    <div class="cartNum d-flex">
                                        <a href="#" >
                                            <i class="fa-solid fa-minus fa-xl text-black" data-reduceNum="${item.productId}" data-cartId="${item.id}"></i>
                                        </a>
                                        <span class="d-inline-block mx-1">${item.qty}</span>
                                        <a href="#">
                                            <i class="fa-sharp fa-solid fa-plus fa-xl text-black" data-addNum="${item.productId}" data-cartId="${item.id}"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>NT$${item.product.price * item.qty}</td>
                                <td class="deleteCartItemBtn">
                                    <a href="#" class="cartDeleteIcon">
                                    <i class="fa-solid fa-trash-can cartDelete text-center ms-3 text-third pe-2" data-deleteCartId="${item.id}"></i>
                                    </a>
                                </td>
                            </tr> 
                            
                            `
}





// 產品列表購物車初始化
let getCartList = ()=>{
    let localCartId = localStorage.getItem("cartId")
    let localUserId = localStorage.getItem("userId")
    let totalMoney =0
    axios.get(`${baseUrl}/users/${localUserId}/carts?_expand=product`)
    .then((res=>{
        cartListData = res.data
        let str =''
        cartListData.forEach((item=>{
            totalMoney += item.qty * item.product.price
            let getTotalPrice = "NT$" + totalMoney
            totalPrice.textContent = getTotalPrice
            str += renderCartHTML(item)
        }))
        cartsListDom.innerHTML = str
    }))
}

//購物車單筆刪除
cartsListDom.addEventListener("click",e=>{
    e.preventDefault()
    let localUserId = localStorage.getItem("userId")
    let localCartId = localStorage.getItem("cartId")
    let id = e.target.getAttribute("data-deleteCartId")
    
    if (e.target.classList.contains("cartDelete")) {
        console.log(id);
        axios.delete(`${baseUrl}/carts/${id}`)
        .then((res=>{
            console.log(res);
            getCartList()
        }))
    }
})

//監聽點擊位置
cartsListDom.addEventListener("click",e=>{
    e.preventDefault()
    let reduceNum = e.target.getAttribute("data-reduceNum")
    let addNum = e.target.getAttribute("data-addNum")
    let cartId = e.target.getAttribute("data-cartId")
    if (e.target.classList.contains("fa-minus")) {
        reduceNumData(reduceNum,cartId)
        return
    }
    if (e.target.classList.contains("fa-plus")) {
        addNumData(addNum, cartId)
        return
    }
})

//減少數量
const reduceNumData = (reduceNum,cartId)=>{
    let reductNumCheck = 0
    cartListData.forEach((item=>{
        if (reduceNum == item.productId) {
        reductNumCheck =  item.qty -=1
        }
        if (reductNumCheck < 1) {
            return
        }
        const data = {
            cartId: item.id,
            qty: reductNumCheck
        }
        
         axios.patch(`${baseUrl}/carts/${cartId}`, data)
            .then((res => {
                console.log(item);
  
                getCartList()
            }))
    }))
}

//添加數量
const addNumData = (addNum, cartId) => {
    let addNumCheck = 0
    cartListData.forEach((item => {
        if (addNum == item.productId) {
            addNumCheck = item.qty += 1
        }
        if (addNumCheck < 1 ) {
            return
        }
        const data = {
            cartId : item.id,
            qty: addNumCheck
        }
        axios.patch(`${baseUrl}/carts/${cartId}`, data)
            .then((res => {
                console.log(item);
               
                getCartList()
            }))
    }))
}

//前往訂單運送 訂單資料從運送頁面post送出到orders
orderBtn.addEventListener("click",e=>{
    e.preventDefault()
//     if (e.target.classList.contains("orderBtn")) {
//         cartListData.forEach((item=>{
//             const data = {
//                 id: item.product.id,
//                title: item.product.title,
//                createdAt: item.product.date,
//                price: item.product.price,
//                category: item.product.category,
//                qty: item.qty,
//                userId: item.userId
//             }
//             axios.post(`${baseUrl}/600/orders`, data)
//             .then((res=>{
//                 console.log(res);
//   window.location.replace('cartDelivery.html');
//             })).catch((error=>{
//                 if (error.response.data === "jwt expired") {
//                     Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
//                 }
//                 if (error.response.data === "jwt malformed") {
//                     Swal.fire('請登入後操作！')
//                 }
//             }))
//         }))
//     }
    window.location.replace('cartDelivery.html');

})



cartInit()
