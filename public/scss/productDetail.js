const productsDetail = document.querySelector(".productsDetail")
let baseUrl = "http://localhost:3000";
let productDetailUrl = baseUrl + "/products"

let productDetailItem = []

const init = () => {
    getProductDetailData()
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
                        <a href="#" class="btn btn-success text-light productsDetailBtn d-block me-3">加入購物車</a>
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
                if (productId == item.id) {
                    str += renderHTMLProductDetail(item)
                }
            }))
            productsDetail.innerHTML = str
        }))
}

init()

