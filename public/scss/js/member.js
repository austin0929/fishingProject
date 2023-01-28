const fileUploader = document.querySelector('#file')
let getLocaluserId = localStorage.getItem("userId")
let preview = document.querySelector("#preview")
const memberMail = document.querySelector(".memberMail")
const memberPhone = document.querySelector(".memberPhone")
const memberAddress = document.querySelector(".memberAddress")
const memberName = document.querySelector(".memberName")


let userImgList = ''

const memberInit = () => {
    getMemberUserData()

}

//更換圖片
fileUploader.addEventListener('change', (e) => {
    console.log(e.target.files[0].name); // get file object
     let file = e.target.files[0]
console.log(file);
    const reader = new FileReader()
    // 轉換成 DataURL
    reader.readAsDataURL(file)
    reader.onload = function () {
        // preview.src = reader.result
        const data = {
            userImg: reader.result
        }
        axios.patch(`${baseUrl}/users/${getLocaluserId}`, data)
            .then((res => {
                console.log(res);
                userImgList = res.data
                if (getLocaluserId == userImgList.id) {
                    preview.src = reader.result
                }
                getMemberUserData()
            })).catch((error=>{
                if (error.response.data === "jwt expired") {
                    Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
                }
                if (error.response.data === "jwt malformed") {
                    Swal.fire('請登入後操作！')
                }
            }))
    }
       
});

//user圖初始化
let memberUserList = []
const getMemberUserData = () => {
    axios.get(`${baseUrl}/users/${getLocaluserId}`)
        .then((res => {
            console.log(res);
            let str = ''
            memberUserList = res.data

            if (getLocaluserId == memberUserList.id) {
                str += `${memberUserList.userImg}`
            }
               preview.src = str
            memberMail.textContent = memberUserList.email
            memberPhone.textContent = memberUserList.phone
            memberAddress.textContent = memberUserList.address
            memberName.textContent = `HI,${memberUserList.name} 喜歡我們的產品嗎?
                                現在你也可以成為路亞高手囉!`
        }))
}

memberInit()
