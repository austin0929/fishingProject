const cartsListDom = document.querySelector(".cartList")
const deleteAllCartBtn = document.querySelector(".deleteAllCartBtn")
const totalPrice = document.querySelector(".totalPrice")
let baseUrl = "http://localhost:3000";

let cartListData = []

const cartInit = () => {
    getCartList()
    // const AUTH = `Bearer ${localStorage.getItem('token')}`;
    // axios.defaults.headers.common.Authorization = AUTH;
    // console.log(AUTH);
}

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
                                            <i class="fa-solid fa-minus fa-xl text-black" data-reduceNum="${item.id}"></i>
                                        </a>
                                        <span class="d-inline-block mx-1">${item.qty}</span>
                                        <a href="#">
                                            <i class="fa-sharp fa-solid fa-plus fa-xl text-black" data-addNum="${item.id}"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>NT$${item.product.price * item.qty}</td>
                                <td class="deleteCartItemBtn">
                                    <a href="#" class="cartDeleteIcon">
                                    <i class="fa-solid fa-trash-can cartDelete text-center ms-3 text-third pe-2" data-deleteCartId="${item.id}"></i>
                                    </a>
                                </td>
                            </tr> `
}


// 產品列表購物車初始化
let getCartList = ()=>{
    let localCartId = localStorage.getItem("cartId")
    let localUserId = localStorage.getItem("userId")
    let totalMoney = 0;
    axios.get(`${baseUrl}/users/${localUserId}/carts?_expand=product`)
    .then((res=>{
        cartListData = res.data
        let str =''
        cartListData.forEach((item=>{
            totalMoney += item.product.price
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

//patch購物車數量
cartsListDom.addEventListener("click",e=>{
    e.preventDefault()
    let reduceNum = e.target.getAttribute("data-reduceNum")
    let addNum = e.target.getAttribute("data-addNum")
    if (e.target.classList.contains("fa-minus")) {
        console.log(123);
        reduceNumData(reduceNum)
        return
    }
    if (e.target.classList.contains("fa-plus")) {
        console.log(456);
        addNumData(addNum)
        return
    }
})

const reduceNumData = (reduceNum)=>{
    let reductNumCheck = ''
    let getLocalCartId = localStorage.getItem('cartId')

    cartListData.forEach((item=>{
        if (reduceNum == item.id) {
            console.log(reduceNum , item.id);
        reductNumCheck =  item.qty -=1
        }
        // else{
        //     reductNumCheck += item.qty
        // }
        //PS : 減少數量會導致負數
        const data = {
            cartId: getLocalCartId,
            qty: reductNumCheck
        }

        if (item.qty < 1) {
            return
        }
         axios.patch(`${baseUrl}/carts/${getLocalCartId}`, data)
            .then((res => {
                console.log(res);
                getCartList()
            }))
    }))
}

const addNumData = (addNum) => {
    let addNumCheck = ''
    let getLocalCartId = localStorage.getItem('cartId')

    cartListData.forEach((item => {
        if (addNum == item.id) {
            console.log(addNum, item.id);
            addNumCheck = item.qty += 1
        }
        else {
            addNumCheck += item.qty
        }
        const data = {
            cartId: getLocalCartId,
            qty: addNumCheck
        }
        axios.patch(`${baseUrl}/carts/${getLocalCartId}`, data)
            .then((res => {
                console.log(res);
                getCartList()
            }))
    }))

}
cartInit()

// getCartList()