const commentList = document.querySelector(".commentList")
const commentTxt = document.querySelector(".commentTxt")
let usersList  =[]

//token
AUTH

//star
const stars = document.querySelector(".rating").children;
let ratingValue
let index //目前選到的星星

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("mouseover", function () {
    
        for (let j = 0; j < stars.length; j++) {
            stars[j].classList.remove("fa-star")
            stars[j].classList.add("fa-star-o")
        }
        for (let j = 0; j <= i; j++) {
            stars[j].classList.remove("fa-star-o") 
            stars[j].classList.add("fa-star") 
        }
    })
    stars[i].addEventListener("click", function () {
        ratingValue = i + 1
        index = i
     
    })
    stars[i].addEventListener("mouseout", function () {
        for (let j = 0; j < stars.length; j++) {
            stars[j].classList.remove("fa-star")
            stars[j].classList.add("fa-star-o")
        }
        for (let j = 0; j <= index; j++) {
            stars[j].classList.remove("fa-star-o")
            stars[j].classList.add("fa-star")
        }
    })
}


const getUserData  = ()=>{
    axios.get(`${baseUrl}/users`)
    .then((res=>{
       usersList = res.data
     
    }))
}

const saveCommentsBtn = document.querySelector(".saveCommentsBtn")
saveCommentsBtn.addEventListener("click", e => {
    const localStorageUserId = localStorage.getItem("userId")
    let productId = localStorage.getItem('productId');
    let localTime = new Date()

    if (AUTH == 'Bearer null') {
        Swal.fire('請先登入', '登入後操作', 'error')
        return
    }
    usersList.forEach((item => {
        if (item.id == localStorageUserId) {
            const data = {
                userId: item.id,
                date: localTime,
                star: ratingValue,
                name: item.name,
                productId: productId,
                msg: commentTxt.value,
                userImg : item.userImg
            }
            console.log(data);
            axios.post(`${baseUrl}/600/comments`, data)
                .then((res => {
                    console.log(res);
                    Swal.fire('留言成功', '去看看大家的留言吧', 'success')
                    getUserComment()
                })).catch((error=>{
                    if (error.response.data === "jwt expired") {
                        Swal.fire('登入逾時', '時間到！請登出後重新登入！', 'error')
                    }
                    if (error.response.data === "jwt malformed") {
                        Swal.fire('請登入後操作！')
                    }
                }))
        }
    }))

})


getUserData()
