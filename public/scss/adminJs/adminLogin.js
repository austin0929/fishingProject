const adminLoginBtn = document.querySelector(".adminLoginBtn")
let adminEmail = document.querySelector(".adminEmail")
let adminPassword = document.querySelector(".adminPassword")

//點擊登入事件
    adminLoginBtn.addEventListener("click", e => getAdminData())

//post成功後取得資料並存放local
const getadminLocal = ({ accessToken,user})=>{
    localStorage.setItem('adminToken', accessToken)
    localStorage.setItem('adminEmail', user.email)
    localStorage.setItem('adminPassword', user.makeSurePassword)
}

//adminEmail初始化
const adminInit = ()=>{
    let adminObj ={}
    axios.get(`${baseUrl}/users`)
    .then((res=>{
        let adminUser = res.data
        adminUser.forEach((item=>{
            if (item.role == "admin") {
                adminObj.email = localStorage.getItem("adminEmail")
                adminObj.password = localStorage.getItem("adminPassword")
            }
            adminEmail.value = adminObj.email
            adminPassword.value = adminObj.password
        }))
    }))
}
adminInit()

//post登入管理面板
const getAdminData = ()=>{
        if (adminEmail.value == "" || adminPassword.value == "") {
            console.log(123);
            Swal.fire('錯誤', '請輸入帳號密碼', 'error')
            return
        }
        const data = {
            email: adminEmail.value,
            password: adminPassword.value,
        }
        axios.post(`${baseUrl}/login`,data)
        .then((res=>{
            console.log(res);
            if (res.data.user.role === undefined) {
                Swal.fire('你不是管理者喔', '請輸入管理者帳號密碼', 'error')
                return
            }
            if (res.status === 200) {
                Swal.fire('登入成功', '三秒後跳轉管理頁面', 'success')

                //post成功後 資料傳入該函式
                getadminLocal(res.data)
                adminLoginDelay()
            }
        })).catch((error=>{
            console.log(error);
        }))  
}

//資料正確三秒後跳轉
const adminLoginDelay = ()=>{
    setTimeout(() => {
        window.location.replace('adminChart.html');
    }, 3000);
}

