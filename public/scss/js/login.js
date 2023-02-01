const loginSend = document.querySelector(".loginSend")
let loginEmail = document.querySelector(".loginEmail")
let loginPassword = document.querySelector(".loginPassword")
let emailCheckbox = document.querySelector("#rememberEmail")
let loginrUrl = baseUrl + "/login"

//post成功後把資料存入localStorage
function saveUserToLocal({ accessToken, user}) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('state', user.state)
    localStorage.setItem('email', user.email)
}

//登入功能
let loginPage =()=>{
    if (loginEmail.value =="" || loginPassword.value =="") {
        Swal.fire('錯誤', '請填入完整資料', 'error')
        return
    }
    const data = {
        email: loginEmail.value,
        password: loginPassword.value,
    }
    console.log(data);
    axios.post(loginrUrl,data)
    .then((res=>{
        console.log(res);
        if (res.status === 200) {
            saveUserToLocal(res.data);
            Swal.fire('登入成功', '三秒後跳轉首頁', 'success')
            loginCleanInp()
            loginDelay()
        }
    })).catch((error=>{
        Swal.fire('錯誤', '請重新輸入', 'error')
    }))
}

//送出後把值清空
const loginCleanInp=()=>{
     loginEmail = document.querySelector(".loginEmail").value=""
     loginPassword = document.querySelector(".loginPassword").value =""
}

//三秒後跳轉
const loginDelay = () => {
    return setTimeout(() => {
        window.location.replace('index.html');
    }, 3000);
}

//初始化
const loginInit =()=>{
    loginSend.addEventListener("click", () => loginPage())
}
loginInit()
