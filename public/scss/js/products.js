const productListDom = document.querySelector(".productList")
const categoryBtn = document.querySelector(".categoryBtn")
let productTagRod = document.querySelector(".productTagRod")
let productTagReel = document.querySelector(".productTagReel")
let productTagLure = document.querySelector(".productTagLure")
let productTitle = document.querySelector(".productTitle")

let addCartBreak = []
let productUrl = baseUrl + "/products"
let getCartList = []
let productList = []


//初始化
const init = () => {
    getIndexSearch()
    cartList()
    //token
    AUTH
}


//儲存localStorageId
function setLocalStorageId(id) {
    localStorage.setItem('productId', id);
}

let getLocalStorageUserId = localStorage.getItem("userId")

//首頁搜尋初始
const getIndexSearch = () => {
    let getLocalStorage = localStorage.getItem("category")
    axios.get(`${productUrl}`)
        .then((res => {
            let str = ''
            productList = res.data
            productList.forEach((item => {
                if (getLocalStorage == undefined) {
                    str += renderProductHTML(item)
                }
                else if (getLocalStorage == item.category) {
                    let searchTitle = getLocalStorage
                    productTitle.textContent = searchTitle
                    str += renderProductHTML(item)
                }
                return
            }))
            productListDom.innerHTML = str
            localStorage.removeItem("category")
        }))
}




//組產品字串
let renderProductHTML = (item) => {
    return ` <li class="col-xl-3 col-lg-4 col-md-6 mb-3">
                       <a href="productsDetail.html" class="js-productCard">
                         <div class="card productCard">
                         <div class="cardImg mb-2 rounded-top" style="background-image : url(${item.images})" data-productId="${item.id}">
                         </div>
                         <div class="px-2">
                            <h2 class="fw-bold mb-2 h5 text-dark">${item.title}</h2>
                            <div class="h6 mb-2">
                                <a href="#" class="bg-danger p-1 rounded">${item.category}</a>
                            </div>

                         <span>$${toThousands(item.price)}</span>
                      
                         </div>
                         <div class="ms-auto pe-lg-3 pe-2 pb-1 cartIcon d-flex  align-items-end h-100">
                            <a href="#">
                                <i class="fa-sharp fa-solid fa-cart-shopping text-third" data-addCartBtn="addBtn" data-productId="${item.id}"></i>
                            </a>
                         </div>
                           </div>
                     </a>
                    </li>`
}

//點擊category篩選
categoryBtn.addEventListener("click", e => {
    e.preventDefault();
    if (e.target.getAttribute("class") == "categoryBtn") {
        return
    }
    let str = ''
    productList.forEach((item => {
        let mainTitle = e.target.value
        productTitle.textContent = mainTitle
        if (e.target.value == item.category) {
            str += renderProductHTML(item)
        }
        productListDom.innerHTML = str
    }))
})

//加入購物車
productListDom.addEventListener("click",e=>{
    e.preventDefault()
        if (e.target.classList.contains("cardImg")) {
        let productId = e.target.getAttribute("data-productId")
        setLocalStorageId(productId)
        window.location.replace('productsDetail.html');
    }
    let target = e.target.dataset
    let productId = target.productid
    let addBtn = target.addcartbtn
    let num = 0;
    if (addBtn === "addBtn") {
        num +=1
        productPost(productId, num)
    }
})
const productPost = (productId, num)=>{
    let addCartUrl = `${baseUrl}/600/users/${getLocalStorageUserId}/carts`
    let data = {
        productId: productId,
        qty: num     
    }
    axios.post(addCartUrl,data)
    .then((res=>{
        console.log(res);
        Swal.fire('加入購物車', '成功加入購物車', 'success')
    })).catch((error=>{
        console.log(error);
    }))
}

//get購物車api
const cartList = () => {
    axios.get(`${baseUrl}/carts`)
        .then((res => {
            getCartList = res.data
        }))
}


init()
