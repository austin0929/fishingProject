const loginSend = document.querySelector(".loginSend")
let loginEmail = document.querySelector(".loginEmail")
let loginPassword = document.querySelector(".loginPassword")
let baseUrl = "http://localhost:3000";
let loginrUrl = baseUrl + "/login"

function saveUserToLocal({ accessToken, user}) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
}

let loginPage =()=>{
    if (loginEmail.value =="" || loginPassword.value =="") {
        Swal.fire('錯誤', '請填入完整資料', 'error')
        return
    }
    const data = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    console.log(data);
    axios.post(loginrUrl,data)
    .then((res=>{
        console.log(res);
        if (res.status === 200) {
            saveUserToLocal(res.data);
            Swal.fire('登入成功', '你已成功登入', 'success')
            loginCleanInp()
            loginDelay()
            // window.location.replace('/index.html');
        }
    })).catch((error=>{
        Swal.fire('錯誤', '請重新輸入', 'error')
    }))
}
const loginCleanInp=()=>{
     loginEmail = document.querySelector(".loginEmail").value=""
     loginPassword = document.querySelector(".loginPassword").value =""
}

const loginDelay = () => {
    return setTimeout(() => {
        window.location.replace('index.html');
    }, 3000);
}

const loginInit =()=>{
    loginSend.addEventListener("click", () => loginPage())
}
loginInit()