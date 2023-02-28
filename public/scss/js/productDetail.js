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

// const switchImg1 = document.querySelector(".switch-img1")
// switchImg1.addEventListener("click", e => {
//     document.querySelector('.switch-img1-big').style.backgroundImage =
//         "url(\"https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-3.jpeg\")";
//     document.querySelector('.switch-img2-big').style.backgroundImage = '';
//     document.querySelector('.switch-img3-big').style.backgroundImage = '';
//     document.querySelector('.switch-img4-big').style.backgroundImage = '';
// })


// const switchImg2 = document.querySelector(".switch-img2")
// switchImg1.addEventListener("click", e => {
//     document.querySelector('.switch-img2-big').style.backgroundImage = 
//         "url(\"https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-5.jpeg\")";;
//     document.querySelector('.switch-img1-big').style.backgroundImage = '';
//     document.querySelector('.switch-img3-big').style.backgroundImage = '';
//     document.querySelector('.switch-img4-big').style.backgroundImage = '';
// })

console.log(document.querySelector('.switch-img1-big').style.display);

//renderHTML
// const renderHTMLProductDetail = (item) => {
//     return `<li class="col-xl-8 col-lg-10 col-md-12 mb-6 mb-lg-3">
//                     <h2 class="fw-bold h1 mb-3">${item.title}</h2>
//                     <hr>
//                     <img class="img-fluid rounded mb-3"
//                         src="${item.images}"
//                         alt="">
//                     <P class="fw-normal mb-5">
//                         ${item.content}
//                     </P>
//                     <div class="d-flex">
//                         <a href="#" class="btn btn-success js-cartId text-light productsDetailBtn d-block me-3"data-addCartId="${item.id}">加入購物車</a>
//                         <a href="#" class="btn btn-success text-light js-bookmark productsDetailBtn d-block" data-addBookmarkId="${item.id}">加入收藏</a>
//                     </div>
//                 </li>`
// }

// const renderHTMLProductDetail = (item) => {
//     return `  <li class="col-md-6 pt-5 order-1 order-md-2">
//                                 <div class="mb-md-6 mb-3">
//                                     <h3 class="h5 mb-3 fw-bold">NB 復古鞋_中性_米灰色_ML574EVW-D楦 574</h3>
//                                     <h2 class="h6 mb-md-6 mb-3">給予顧客最優質的產品是我們的職責！</h2>
//                                     <p class="bg-fourth p-1 rounded">NT$3999</p>
//                                 </div>
//                                 <div class="mb-md-6 mb-3">
//                                     <h3 class="h6"><span class="text-third me-2">付款方式</span>信用卡、無卡分期、行動支付，與其他多種方式</p>
//                                         <h3 class="h6"><span class="text-third me-2">出貨</span>本地 倉庫出貨，24小時到貨</p>
//                                 </div>
//                                 <div class="d-flex">
//                                     <a href="#"
//                                         class="btn btn-success js-cartId text-light productsDetailBtn d-block me-3"
//                                         data-addCartId="${item.id}">加入購物車</a>
//                                     <a href="#" class="btn btn-success text-light js-bookmark productsDetailBtn d-block"
//                                         data-addBookmarkId="${item.id}">加入收藏</a>
//                                 </div>
//                             </li>
//                             <li class="col-md-6">
//                                 <ul class="px-0 mb-3">
//                                     <li class="bg-cover switch-img1-big rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-3.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img2-big rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-2.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img3-big rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-4.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img4-big rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-5.jpeg);">
//                                     </li>
//                                 </ul>
//                                 <ul class="d-flex px-0">
//                                     <li class="bg-cover switch-img1 me-2 rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-3.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img2 me-2 rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-2.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img3 me-2 rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-4.jpeg);">
//                                     </li>
//                                     <li class="bg-cover switch-img4 rounded"
//                                         style="background-image: url(https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/master/petpet-week8/homestay-5.jpeg);">
//                                     </li>
//                                 </ul>
//                             </li>`
// }



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

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.switch-img1').addEventListener('click', function () {
        document.querySelector('.switch-img1-big').style.display = 'block';
        document.querySelector('.switch-img2-big').style.display = 'none';
        document.querySelector('.switch-img3-big').style.display = 'none';
        document.querySelector('.switch-img4-big').style.display = 'none';
    });

    document.querySelector('.switch-img2').addEventListener('click', function () {
        document.querySelector('.switch-img2-big').style.display = 'block';
        document.querySelector('.switch-img1-big').style.display = 'none';
        document.querySelector('.switch-img3-big').style.display = 'none';
        document.querySelector('.switch-img4-big').style.display = 'none';
    });

    document.querySelector('.switch-img3').addEventListener('click', function () {
        document.querySelector('.switch-img3-big').style.display = 'block';
        document.querySelector('.switch-img2-big').style.display = 'none';
        document.querySelector('.switch-img1-big').style.display = 'none';
        document.querySelector('.switch-img4-big').style.display = 'none';
    });

    document.querySelector('.switch-img4').addEventListener('click', function () {
        document.querySelector('.switch-img4-big').style.display = 'block';
        document.querySelector('.switch-img2-big').style.display = 'none';
        document.querySelector('.switch-img1-big').style.display = 'none';
        document.querySelector('.switch-img3-big').style.display = 'none';
    });
});

// const getImg =(e)=>{
//     console.log(e);
//     let img = e.target.getAttribute("data-switchImg1")
//     console.log(img);
// }

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
                if (error.response.data === "jwt expired") {
                    Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
                }
                if (error.response.data === "jwt malformed") {
                    Swal.fire('請登入後操作', '請重新登入', 'error')
                }
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

