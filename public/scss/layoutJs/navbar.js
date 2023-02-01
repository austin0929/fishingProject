let loginSubmit = document.querySelector(".js-loginBtn")
let localStorageUserId = localStorage.getItem('userId');
let loginUser = document.querySelector(".loginUser")
let navbarMemberBtn = document.querySelector(".navbarMemberBtn")

//初始化整合
const navInit =()=>{
    getLoginData()
}

let getLocalUserName = localStorage.getItem('userName')

//判斷登入狀態
let getLoginData = ()=>{
    if (localStorageUserId == null) {
        loginSubmit.textContent = "登入"
        loginSubmit.value = "登入"
    }
    else{
        loginSubmit.textContent = "登出"
        loginSubmit.value = "登出"
        loginUser.textContent = "HI " + getLocalUserName
    }
}

//判斷會員是否登入
navbarMemberBtn.addEventListener("click",e=>{
    e.preventDefault()
    if (getLocalUserName == null) {
        Swal.fire('請先登入', '登入後操作', 'error')
        return
    }
    window.location.replace('member.html');
})

//點擊登入事件
loginSubmit.addEventListener("click",e=>{
    if (e.target.value == "登入") {
        window.location.replace('login.html')
    }
    else if (e.target.value == "登出" ) {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('state')
        localStorage.removeItem('cartId')
        localStorage.removeItem('carts')
        localStorage.removeItem('productId')
        localStorage.removeItem('email')
        Swal.fire('登出成功', '三秒後跳轉首頁', 'success')
    }
    navDelay()
})

//三秒後跳轉
const navDelay = ()=>{
    setTimeout(() => {
        window.location.replace('index.html') 
    }, 3000);
}
navInit()
