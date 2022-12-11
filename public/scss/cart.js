const cartsListDom = document.querySelector(".cartList")
let baseUrl = "http://localhost:3000";

let cartListData = []

const cartInit = () => {
    getCartList()
}

const AUTH = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common.Authorization = AUTH;
console.log(AUTH);

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
                                        <a href="#">
                                            <i class="fa-solid fa-minus fa-xl text-black"></i>
                                        </a>
                                        <span class="d-inline-block mx-1">${item.qty}</span>
                                        <a href="#">
                                            <i class="fa-sharp fa-solid fa-plus fa-xl text-black"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>NT$${item.product.price * item.qty}</td>
                                <td class="deleteCartItemBtn">
                                    <a href="#" class="cartDeleteIcon ">
                                    <i class="fa-solid fa-trash-can cartDelete text-center ms-3 text-third pe-2"></i>
                                    </a>
                                </td>
                            </tr> `
}


//購物車初始化
let getCartList = () => {
    let localCartId = localStorage.getItem("cartId")
    let localUserId = localStorage.getItem("userId")
    // let localProductId = localStorage.getItem("productId")
    let getCartUrl = `${baseUrl}/users/${localUserId}/carts?_expand=product`;
    console.log(getCartUrl);
    axios.get(`${getCartUrl}`)
        .then((res => {
            let str = ''
            cartListData = res.data
            console.log(res.data);
            cartListData.forEach((item => {
         console.log(item.product.id);
                    str += renderCartHTML(item)
            }))
            cartsListDom.innerHTML = str
        }))
}

cartInit()