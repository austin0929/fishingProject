const send = document.querySelector(".registerBtn")
let registerMail = document.querySelector(".registerMail")
let registerPassword = document.querySelector(".registerPassword")
let registerMakeSurePassword = document.querySelector(".registerMakeSurePassword")
let registerName = document.querySelector(".registerName")
let registerPhone = document.querySelector(".registerPhone")
let registerAddress = document.querySelector(".registerAddress")
let registerUrl = baseUrl + "/register"
console.log(registerUrl);


//取得使用者輸入值後post到資料庫
let register =()=>{
    if (registerMail.value == "" || registerPassword.value == "" || registerMakeSurePassword.value == "" ||
        registerName.value == "" || registerPhone.value == "" || registerAddress.value == "") {
        Swal.fire('錯誤', '請填入完整資料', 'error')
        return
    }
    const data = {
        email: registerMail.value,
        password: registerPassword.value,
        makeSurePassword: registerMakeSurePassword.value,
        name: registerName.value,
        phone: registerPhone.value,
        address: registerAddress.value,
    };
    if (data.password !== data.makeSurePassword) {
        Swal.fire('錯誤', '密碼與確認密碼不符', 'error')
        return
    }
    axios.post(registerUrl,data)
    .then((res=>{
        console.log(res);

        if (res.status === 201) {
            // saveUserToLocal(res.data);
            Swal.fire('註冊成功', '你已成功註冊', 'success')
            cleanRegisterInp()
            registerDelay()
            // window.location.replace('/login.html');
        }
    })).catch((error=>{
        Swal.fire('錯誤', '請重新輸入', 'error')
    }))
}

//送出後清空字串
const cleanRegisterInp=()=>{
     registerMail = document.querySelector(".registerMail").value =""
    registerPassword = document.querySelector(".registerPassword").value =""
     registerMakeSurePassword = document.querySelector(".registerMakeSurePassword").value =""
    registerName = document.querySelector(".registerName").value = ""
    registerPhone = document.querySelector(".registerPhone").value = ""
    registerAddress = document.querySelector(".registerAddress").value = ""
}

//三秒後跳轉
const registerDelay =()=>{
    return setTimeout(() => {
            window.location.replace('login.html');
    }, 3000);
}

//初始化
const init= ()=>{
    send.addEventListener("click", () => register())
}
init()





