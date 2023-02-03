const bookmarkListDom = document.querySelector(".bookmarkList")
const categoryBtn = document.querySelector(".categoryBtn")

let bookmarkUrl = baseUrl + "/bookmarks"
let productUrl = baseUrl + "/products"

let bookmarkList = []
let productList =[]

//初始化
const init = ()=>{
    getBookmarkList()
}

//取使用者ID
let getLocalUserId = () => {
    return localStorage.getItem("userId") || 0;
}

//render書籤頁面
const renderBookmarkHTML = (item)=>{
    return ` <li class="col-xl-3 col-lg-4 col-md-6 mb-3">
                       <a href="#">
                     <div class="card productCard">
                        <div class="cardImg mb-2 rounded-top" style="background-image : url(${item.images})">
                      </div>
                        <div class="px-2">
                            <h2 class="fw-bold mb-2 h5 text-dark">${item.title}</h2>
                            <div class="h6 mb-2">
                                <a href="#" class="bg-danger p-1 rounded">${item.category}</a>
                            </div>
                        <span>$${toThousands(item.price)}</span>
                        </div>
                        <div class="ms-auto pe-lg-2 pb-2 cartIcon d-flex  align-items-end h-100">
                            <a href="#" class="btn btn-success text-light js-bookmarkBtn" data-deleteBookmarkId="${item.id}">取消收藏
                            </a>
                        </div>
                     </div>
                     </a>
                    </li> `
}

//書籤初始化
const getBookmarkList =()=>{
    axios.get(`${bookmarkUrl}`)
    .then((res=>{
        console.log(res);
        let str =''
        bookmarkList = res.data
        bookmarkList.forEach((item=>{
            if (item.userId == getLocalUserId()) {
                str += renderBookmarkHTML(item)   
            }
        }))
        bookmarkListDom.innerHTML = str
    })).catch((error=>{
        console.log(error);
    }))
}

//刪除書籤
bookmarkListDom.addEventListener("click",e=>{
    e.preventDefault()
    let bookmarkId = e.target.getAttribute("data-deleteBookmarkId")
    if (e.target.classList.contains("js-bookmarkBtn")) {
        bookmarkList.forEach((item=>{
            if (item.id == bookmarkId) {
                axios.delete(`${bookmarkUrl}/${bookmarkId}`)
                .then((res=>{
                    console.log(res);
                    getBookmarkList()
                })).catch((error=>{
                    if (error.response.data === "jwt expired") {
                        Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
                    }
                    if (error.response.data === "jwt malformed") {
                        Swal.fire('請登入後操作')
                    }
                }))
            }
        }))
    }
})

//篩選書籤category
categoryBtn.addEventListener("click",e=>{
    e.preventDefault()
    let str =''
    bookmarkList.forEach((item=>{
        if (e.target.value == item.category) {
            str += renderBookmarkHTML(item)
        }
        bookmarkListDom.innerHTML = str
    }))
})

init()


 