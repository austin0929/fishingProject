const loginSend = document.querySelector(".loginSend")
let loginEmail = document.querySelector(".loginEmail")
let loginPassword = document.querySelector(".loginPassword")
let emailCheckbox = document.querySelector("#rememberEmail")
let loginrUrl = baseUrl + "/login"

function saveUserToLocal({ accessToken, user}) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    localStorage.setItem('state', user.state)
    localStorage.setItem('email', user.email)
}

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
const loginCleanInp=()=>{
     loginEmail = document.querySelector(".loginEmail").value=""
     loginPassword = document.querySelector(".loginPassword").value =""
}

const loginDelay = () => {
    return setTimeout(() => {
        window.location.replace('index.html');
    }, 3000);
}


const loginData = ()=>{
    let loginUserId = localStorage.getItem("userId")
    axios.get(`${baseUrl}/users/${loginUserId}`)
    .then((res=>{
        let loginCheckbox = res.data
        let str = ''
        console.log(loginCheckbox);  
        if (loginCheckbox.checkbox !== undefined) {
            emailCheckbox.checked = false
            str += ""
            loginEmail.value = str
        }
        else{
            emailCheckbox.checked = true
            str += res.data.email
            loginEmail.value = str
        }
    }))
}

const loginInit =()=>{
    loginSend.addEventListener("click", () => loginPage())
    loginData()
}
loginInit()