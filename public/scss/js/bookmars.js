
const searchBtn = document.querySelector(".searchBtn")
const searchInp = document.querySelector(".searchInp")
const jsSearchItem = document.querySelector(".js-searchItem")
const subscribesBtn = document.querySelector(".subscribesBtn")
const subscribesBtnInp = document.querySelector(".subscribesBtnInp")
let indexUrl = baseUrl + "/products?category"



function localStorageCategory({category}) {
    localStorage.setItem('category',category);
}

//關鍵字搜尋
searchBtn.addEventListener("click",e=>{
    e.preventDefault()
    let searchData = []
    if (searchInp.value !== "路亞竿" && searchInp.value !== "路亞餌" && searchInp.value !== "捲線器") {
        Swal.fire('請輸入正確關鍵字', '路亞竿..路亞餌等等', 'error')
        return
    }
    axios.get(`${indexUrl}=${searchInp.value}`)
        .then((res => {
            console.log(res);
            searchData = res.data
            searchData.forEach((item => {
                    localStorageCategory(item)             
                window.location.replace('products.html');
            }))
        }))
})

//訂閱功能
subscribesBtn.addEventListener("click",e=>{
    if (validateEmail(subscribesBtnInp.value) == false) {
        Swal.fire('格式有誤', '請檢察信箱格式', 'error')
        return
    }
    const data = {
        email: subscribesBtnInp.value
    }
    axios.post(`${baseUrl}/subscribes`,data)
    .then((res=>{
        console.log(res);
        Swal.fire('訂閱成功', '恭喜你訂閱成功', 'success')
        subscribesBtnInp.value =""
    })).catch((error=>{
        console.log(error);
    }))
})







