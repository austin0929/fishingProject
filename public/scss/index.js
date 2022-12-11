
const searchBtn = document.querySelector(".searchBtn")
const searchInp = document.querySelector(".searchInp")
const jsSearchItem = document.querySelector(".js-searchItem")
let baseUrl = "http://localhost:3000";
let indexUrl = baseUrl + "/products?category"

let searchData = []

function qqq({category,images,title,price}) {
    localStorage.setItem('category',category);
    // localStorage.setItem('images', images);
    // localStorage.setItem('title', title);
    // localStorage.setItem('price', price);
}

searchBtn.addEventListener("click",e=>{
    e.preventDefault()
    axios.get(`${indexUrl}=${searchInp.value}`)
        .then((res => {
            console.log(res);
            searchData = res.data
            searchData.forEach((item => {
                if (searchInp.value == item.category) {
                    qqq(item)
                }
                if (searchInp.value !== item.category) {
                    return
                }
                window.location.replace('products.html');
            }))
        }))
})


// const searchInit = ()=>{
//     axios.get(`http://localhost:3000/products`)
//     .then((res=>{
//         console.log(res);
//         qqq(res.data)
//         searchData = res.data
//         searchData.forEach((item=>{
//             if (searchInp.value == item.category) {
//                 qqq(item)
//             }
//         }))
//     }))
// }

const init = ()=>{
    
}
init()


// http://localhost:3000/products?category=路亞竿


