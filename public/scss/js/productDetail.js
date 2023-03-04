const productsDetail = document.querySelector(".productsDetail")
let productDetailUrl = baseUrl + "/products"

let commentData = []
let productDetailItem = []
let cartList = []
let bookmarkList = []

//初始化
const init = () => {
    getProductDetailData()
    getCartList()
    getBookmarks()
    getUserComment()
}

//token
AUTH

let getLocalUserId = () => {
    return localStorage.getItem("userId") || 0;
}

const renderHTMLProductDetail = (item) => {
    return `      <li class="col-md-6 pt-2 order-1 order-md-2">
                                <div class="mb-md-6 mb-3">
                                    <h3 class="h5 mb-3 fw-bold">${item.title}</h3>
                                    <h2 class="h6 mb-md-6 mb-3">給予顧客最優質的產品是我們的職責！</h2>
                                    <p class="bg-fourth p-1 rounded">NT$${toThousands(item.price)}</p>
                                </div>
                                <div class="mb-md-6 mb-3">
                                    <h3 class="h6"><span class="text-third me-2">付款方式</span>信用卡、無卡分期、行動支付，與其他多種方式</p>
                                        <h3 class="h6"><span class="text-third me-2">出貨</span>本地 倉庫出貨，24小時到貨</p>
                                </div>
                                <div class="d-flex">
                                    <a href="#"
                                        class="btn btn-success js-cartId text-light productsDetailBtn d-block me-3"
                                        data-addCartId="${item.id}">加入購物車</a>
                                    <a href="#" class="btn btn-success text-light js-bookmark productsDetailBtn d-block"
                                        data-addBookmarkId="${item.id}">加入收藏</a>
                                </div>
                            </li>
                            <li class="col-md-6">
                                <ul class="px-0 mb-3">
                                    <li class="bg-cover productDetailImage1 rounded"
                                        style="background-image: url(${item.images});">
                                    </li>
                                </ul>
                            </li>
                            <li class="col-12 order-3 mt-md-9 mt-6">
                                    <div class="ms-md-2 ms-0 mb-6">
                                        <h3 class="fw-bold">產品介紹</h3>
                                        <div class="productDetailImage2 bg-cover rounded" style="background-image: url(${item.images2});"></div>
                                        <p class="h5 productDetailLineHeight">
                                           ${item.content}
                                        </p>
                                    </div>
                            </li>`
}



//產品介紹初始化
const getProductDetailData = () => {
    axios.get(`${productDetailUrl}`)
        .then((res => {
            productDetailItem = res.data

            let str = ''

            productDetailItem.forEach((item => {
                let productId = localStorage.getItem('productId');
                // console.log(item.id);
                if (productId == item.id) {

                    str = renderHTMLProductDetail(item)
                }
            }))
            productsDetail.innerHTML = str
        }))
}


//取使用者評論 //判斷星星後組user字串
const getUserComment = () => {
    axios.get(`${baseUrl}/600/comments`)
        .then((res => {
            let productId = localStorage.getItem('productId');
            let str = ''
            commentData = res.data
            commentData.forEach((item => {
                let timeStamp = new Date(item.date)
                let commentTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth() + 1}/${timeStamp.getDate()}`
                if (item.star == 1 && item.productId == productId) {
                    str += `<li class="col-md-6 mb-4">
                    <div class="border pt-2 ps-2 d-flex ">
                        <img class="me-3  productsDetailImg"
                            src="${item.userImg}"
                            alt="">
                        <div>
                            <h3 class="d-inline-block h5 me-3">${item.name}</h3>
                            <span class="h6 text-third">${commentTime}</span>
                            <div>
                                            <i class="fa-star fa text-yellow "></i>
                                           <i class="fa-star-o fa text-yellow"></i>
                                          <i class="fa-star-o fa text-yellow"></i> 
                                           <i class="fa-star-o fa text-yellow"></i>      
                                             <i class="fa-star-o fa text-yellow"></i> 
                            </div>
                            <p class="CommentsTxt fw-normal">${item.msg}</p>
                        </div>
                    </div>
                </li> `
                }
                else if (item.star == 2 && item.productId == productId) {
                    str += `<li class="col-md-6 mb-4">
                    <div class="border pt-2 ps-2 d-flex ">
                        <img class="me-3  productsDetailImg"
                            src="${item.userImg}"
                            alt="">
                        <div>
                            <h3 class="d-inline-block h5 me-3">${item.name}</h3>
                            <span class="h6 text-third">${commentTime}</span>
                            <div>
                            <i class="fa-star fa text-yellow"></i>
                                           <i class="fa-star fa text-yellow"></i>
                                          <i class="fa-star-o fa text-yellow"></i> 
                                           <i class="fa-star-o fa text-yellow"></i>      
                                             <i class="fa-star-o fa text-yellow"></i>           
                            </div>
                            <p class="CommentsTxt fw-normal">${item.msg}</p>
                        </div>
                    </div>
                </li> `
                }
                else if (item.star == 3 && item.productId == productId) {
                    str += `<li class="col-md-6 mb-4">
                    <div class="border pt-2 ps-2 d-flex ">
                        <img class="me-3  productsDetailImg"
                            src="${item.userImg}"
                            alt="">
                        <div>
                            <h3 class="d-inline-block h5 me-3">${item.name}</h3>
                            <span class="h6 text-third">${commentTime}</span>
                            <div>
                             <i class="fa-star fa text-yellow"></i>
                                           <i class="fa-star fa text-yellow"></i>
                                          <i class="fa-star fa text-yellow"></i> 
                                           <i class="fa-star-o fa text-yellow"></i>      
                                             <i class="fa-star-o fa text-yellow"></i>    
                            </div>
                            <p class="CommentsTxt fw-normal">${item.msg}</p>
                        </div>
                    </div>
                </li> `
                }
                else if (item.star == 4 && item.productId == productId) {
                    str += `<li class="col-md-6 mb-4">
                    <div class="border pt-2 ps-2 d-flex ">
                        <img class="me-3  productsDetailImg"
                            src="${item.userImg}"
                            alt="">
                        <div>
                            <h3 class="d-inline-block h5 me-3">${item.name}</h3>
                            <span class="h6 text-third">${commentTime}</span>
                            <div>
                        <i class="fa-star fa text-yellow"></i>
                                           <i class="fa-star fa text-yellow"></i>
                                          <i class="fa-star fa text-yellow"></i> 
                                           <i class="fa-star fa text-yellow"></i>      
                                             <i class="fa-star-o fa text-yellow"></i>           
                            </div>
                            <p class="CommentsTxt fw-normal">${item.msg}</p>
                        </div>
                    </div>
                </li> `
                }
                else if (item.star == 5 && item.productId == productId) {
                    str += `<li class="col-md-6 mb-4">
                    <div class="border pt-2 ps-2 d-flex ">
                        <img class="me-3  productsDetailImg"
                            src="${item.userImg}"
                            alt="">
                        <div>
                            <h3 class="d-inline-block h5 me-3">${item.name}</h3>
                            <span class="h6 text-third">${commentTime}</span>
                            <div>
                             <i class="fa-star fa text-yellow"></i>
                                           <i class="fa-star fa text-yellow"></i>
                                          <i class="fa-star fa text-yellow"></i> 
                                           <i class="fa-star fa text-yellow"></i>      
                                             <i class="fa-star fa text-yellow"></i>       
                            </div>
                            <p class="CommentsTxt fw-normal">${item.msg}</p>
                        </div>
                    </div>
                </li> `
                }
            }))
            commentList.innerHTML = str
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


//購物車post到cart
productsDetail.addEventListener("click", e => {
    e.preventDefault()
    let getId = e.target.getAttribute("data-addCartId")
    if (e.target.classList.contains("js-cartId")) {
        postCart(getId)
    }
})
const postCart = (getId) => {
    let cartNum = 0;
    let getUserId = localStorage.getItem("userId")
    if (cartNum === 0) {
        let data = {
            productId: getId,
            qty: cartNum += 1
        }
        axios.post(`${baseUrl}/600/users/${getUserId}/carts`, data)
            .then((res => {
                console.log(res);
                Swal.fire('加入購物車', '成功加入購物車', 'success')

            })).catch((error => {
                console.log(error);
            }))
    }
}





//加入書籤
let addNewBookAry = []
productsDetail.addEventListener("click", e => {
    e.preventDefault()
    let bookmarkId = e.target.getAttribute("data-addBookmarkId")
    if (e.target.classList.contains("js-bookmark")) {

        bookmarkList.forEach((item => {
            if (item.productId == bookmarkId) {
                addNewBookAry.push({ productId: item.productId })
            }
        }))
        if (addNewBookAry.length > 0) {
            Swal.fire('已收藏', '這個產品收藏過囉', 'error')
            return
        }
        let data = {}
        productDetailItem.forEach((item => {
            if (item.id == bookmarkId) {
                data = {
                    userId: getLocalUserId(),
                    category: item.category,
                    images: item.images,
                    price: item.price,
                    title: item.title
                };
            }
        }))

        axios.post(`${baseUrl}/664/products/${bookmarkId}/bookmarks`, data)
            .then((res => {
                Swal.fire('收藏成功', '此產品已收藏至書籤', 'success')
                init()

            })).catch((error => {
              console.log(error);
            }))
    }
})



//get書籤內資料
const getBookmarks = () => {
    axios.get(`${baseUrl}/664/bookmarks`)
        .then((res => {
            bookmarkList = res.data
        }))
}


init()

