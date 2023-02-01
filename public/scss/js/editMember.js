let editMemberBtn = document.querySelector(".editMemberBtn")
let editRegisterMail = document.querySelector(".editRegisterMail")
let editRegisterPassword = document.querySelector(".editRegisterPassword")
let editRegisterMakeSurePassword = document.querySelector(".editRegisterMakeSurePassword")
let editRegisterName = document.querySelector(".editRegisterName")
let editTregisterPhone = document.querySelector(".editTregisterPhone")
let editRegisterAddress = document.querySelector(".editRegisterAddress")
let memberUserId =  localStorage.getItem('userId');

//初始化
let editMemberInit = ()=>{
    getMemberData()
}

//取得輸入的值 並直接渲染在畫面上
const getMemberData = ()=>{
    axios.get(`${baseUrl}/users/${memberUserId}`)
    .then((res=>{
        console.log(res);
        editRegisterMail.value = res.data.email
        editRegisterName.value = res.data.name
        editTregisterPhone.value = res.data.phone
        editRegisterAddress.value = res.data.address
    }))
}

//更改使用者資料
editMemberBtn.addEventListener("click",e=>{
    e.preventDefault()
    if (editRegisterPassword.value == "" && editRegisterMakeSurePassword.value == "") {
        Swal.fire('密碼不能空白', '請輸入修改密碼', 'error')
        return
    }
    const data = {
        email: editRegisterMail.value,
        name: editRegisterName.value,
        phone: editTregisterPhone.value,
        address: editRegisterAddress.value,
        password: editRegisterPassword.value,
        makeSurePassword: editRegisterMakeSurePassword.value
    }
    if (editRegisterPassword.value !== editRegisterMakeSurePassword.value) {
        Swal.fire('密碼不一致', '請重新檢查你的密碼', 'error')
        return
    }
    axios.patch(`${baseUrl}/users/${memberUserId}`,data)
    .then((res=>{
        console.log(res);
        Swal.fire('修改成功', '你的資料已修改', 'success')
        localStorage.setItem("userName", res.data.name)
        editMemberDeley()
    })).catch((error=>{
        console.log(error);
    }))
})

//三秒後跳轉
const editMemberDeley =()=>{
    setTimeout(() => {
        window.location.replace("index.html")
    }, 3000);
}
editMemberInit()
