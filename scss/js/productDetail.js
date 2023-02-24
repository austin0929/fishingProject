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

//renderHTML
const renderHTMLProductDetail = (item) => {
    return `<li class="col-xl-8 col-lg-10 col-md-12 mb-6 mb-lg-3">
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
                        <a href="#" class="btn btn-success text-light js-bookmark productsDetailBtn d-block" data-addBookmarkId="${item.id}">加入收藏</a>
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
const postCart = (getId)=>{
    let cartNum = 0;
    let getUserId = localStorage.getItem("userId")
    if (cartNum === 0) {
        let data = {
            productId: getId,
            qty: cartNum +=1
        }
        axios.post(`${baseUrl}/600/users/${getUserId}/carts`,data)
        .then((res=>{
            console.log(res);
            Swal.fire('加入購物車', '成功加入購物車', 'success')

        })).catch((error=>{
            console.log(error);
        }))
    }
}





//加入書籤
let addNewBookAry = []
productsDetail.addEventListener("click", e => {
    e.preventDefault()
      if (getLocalUserId() == null) {
        Swal.fire('請先登入', '登入後操作', 'error')
        return
    }
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

            })).catch((error=>{
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

