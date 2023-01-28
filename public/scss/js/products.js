const productListDom = document.querySelector(".productList")
const categoryBtn = document.querySelector(".categoryBtn")
let productTagRod = document.querySelector(".productTagRod")
let productTagReel = document.querySelector(".productTagReel")
let productTagLure = document.querySelector(".productTagLure")
let productTitle = document.querySelector(".productTitle")

//購物車超過第二筆中斷
let addCartBreak = []

let productUrl = baseUrl + "/products"


let getCartList = []
let productList = []


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




//組字串
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
                            <a href="#" data-productId="${item.id}">
                                <i class="fa-sharp fa-solid fa-cart-shopping text-third js-addCartBtn" data-productId="${item.id}"></i>
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

//監聽產品事件
productListDom.addEventListener("click", e => {
    e.preventDefault()

    //取使用者ID
    let getLocalStorageUserId = localStorage.getItem("userId")

    let addCartUrl = `${baseUrl}/600/users/${getLocalStorageUserId}/carts`;

    //判斷後進去產品介紹
    if (e.target.classList.contains("cardImg")) {
        let productId = e.target.getAttribute("data-productId")
        setLocalStorageId(productId)
        window.location.replace('productsDetail.html');
    }


    //判斷後加入購物車
    if (e.target.classList.contains("js-addCartBtn")) {
        let productId = e.target.getAttribute("data-productId")
        let productNum = 1;

        getCartList.forEach((item => {
            if (item.productId === productId) {
                productNum = item.qty++
            }
        }))

        if (getLocalStorageUserId == undefined) {
            Swal.fire('請先登入', '請先完成登入後操作', 'error')
            return
        }

        //判斷是否超過兩筆
        getCartList.filter(function (value) {
            if (value.productId == e.target.getAttribute("data-productId")) {
                addCartBreak.push(value.productId)
            }
        })
        if (addCartBreak.length > 0) {
            addCartBreak.splice(0, 50)
            Swal.fire('重複加入', '請去購物車操作', 'error')
            cartDelay()
            return
        }
        console.log(addCartBreak);

        const data = {
            productId: productId,
            qty: productNum
        }
        console.log(productNum, productId);
        axios.post(addCartUrl, data)
            .then((res => {
                console.log(res);
                Swal.fire('加入購物車', '你已成功加入購物車', 'success')
                init()
            })).catch((error=>{
                console.log(error);
                if (error.response.data === "jwt expired") {
                    Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
                }
                if (error.response.data === "jwt malformed") {
                    Swal.fire('請登入後操作！')
                }
            }))
    }
})

//get購物車api
const cartList = () => {
    axios.get(`${baseUrl}/carts`)
        .then((res => {
            getCartList = res.data
        }))
}

const cartDelay = () => {
    setTimeout(() => {
        window.location.replace('carts.html');
    }, 2000);
}



init()