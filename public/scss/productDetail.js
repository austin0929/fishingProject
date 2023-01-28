const productsDetail = document.querySelector(".productsDetail")
let baseUrl = "http://localhost:3000";
let productDetailUrl = baseUrl + "/products"

let productDetailItem = []
let cartList =[]

const init = () => {
    getProductDetailData()
    getCartList()
}

//renderHTML
const renderHTMLProductDetail = (item)=>{
    return `<li class="col-xl-8 col-lg-10 col-md-12 mb-8">
                    <h2 class="fw-bold h1 mb-3">${item.title}</h2>
                    <hr>
                    <img class="img-fluid rounded mb-3"
                        src="${item.images}"
                        alt="">
                    <P class="fw-normal mb-5">
                        ${item.content}
                    </P>
                    <div class="d-flex">
                        <a href="#" class="btn btn-success js-cartId text-light productsDetailBtn d-block me-3"data-addCartId="${item.id}">加入購物車</a>
                        <a href="#" class="btn btn-success text-light productsDetailBtn d-block">加入收藏</a>
                    </div>
                </li>`
}

const getProductDetailData = ()=>{
    axios.get(`${productDetailUrl}`)
        .then((res => {
            productDetailItem = res.data
            let str = ''
            productDetailItem.forEach((item=>{
                let productId = localStorage.getItem('productId');
                
                // console.log(item.id);
                if (productId == item.id) {
                    str += renderHTMLProductDetail(item)
                }
            }))
            productsDetail.innerHTML = str
        }))
}


//get購物車
const getCartList = () => {
    axios.get(`${baseUrl}/carts`)
        .then((res => {
            cartList = res.data
            cartList.forEach((item => {
                // console.log(item);
            }))
        }))
}

// let qqq =[]

//購物車數量patch
productsDetail.addEventListener("click",e=>{
    e.preventDefault()
    if (e.target.classList.contains("js-cartId")) {
        let cartNum = 1;
        let getLocalCartId = localStorage.getItem('cartId')
        console.log(getLocalCartId);
       let getId = e.target.getAttribute("data-addCartId")
        cartList.forEach((item => {
            console.log(item.productId);
            console.log(getId);
           if (getId == item.productId) {
               cartNum = item.qty += 1
           }
        }))

        const data = {
            cartId: getLocalCartId,
            qty: cartNum
        }
        // console.log(productNum, productId);
        console.log(data);

        axios.patch(`${baseUrl}/carts/${getLocalCartId}`, data)
            .then((res => {
                console.log(res);
                getCartList()
            }))
    }
})

// const productDetailDelay = ()=>{
//     setTimeout(() => {
//         window.location.replace('products.html');
//     }, 2000);
// }

init()

