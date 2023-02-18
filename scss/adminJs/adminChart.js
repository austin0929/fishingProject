let usersNum = document.querySelector(".usersNum")
let subscribesNum = document.querySelector(".subscribesNum")
let messageNum = document.querySelector(".messageNum")
let adminSignOut = document.querySelector(".adminSignOut")
let orderList = []


//後台圖表初始化
const chartInit = ()=>{
    chartList()
    countUsers()
    countSubscribes()
    countMessage()
    renderC3()
}

//取得訂單產品資料
const chartList = ()=>{
    axios.get(`${baseUrl}/orders`)
    .then((res=>{
        orderList = res.data
        renderC3()
    }))
}

//C3圖表
const renderC3 = ()=>{
    let totalObj = {}
    orderList.forEach((item=>{
        item.products.forEach((productItem=>{
            if (totalObj[productItem.title] == undefined) {
                totalObj[productItem.title] = productItem.price * productItem.qty
            }
            else {
                totalObj[productItem.title] += productItem.price * productItem.qty
            }
        }))
    }))
    let newChartData = []
    let newAry = Object.keys(totalObj)
    newAry.forEach((item=>{
        let ary = []
        ary.push(item)
        ary.push(totalObj[item])
        newChartData.push(ary)
    }))

    //chart排序
    newChartData.sort((a, b) => b[1] - a[1])
 
    //超過三筆產品改為其他
    if (newChartData.length > 3) {
        let otherTotal = 0
        newChartData.forEach((i, index) => {
            if (index > 2) {
                otherTotal = newChartData[index][1]
            }
        })
        newChartData.splice(3, newChartData.length - 1)
        newChartData.push(["其他", otherTotal])
    }
       let chart = c3.generate({
        bindto: '#chart', // HTML 元素綁定
        data: {
            type: "donut",
            columns: newChartData,
        },
        donut: {
        title: "產品銷售百分比"
    }
    });
}

//計算使用者總數
const countUsers = ()=>{
    axios.get(`${baseUrl}/users`)
    .then((res=>{
        let users = res.data
        console.log(users.length +1);
        usersNum.textContent = users.length 
    }))
}

//計算訂閱者總數
const countSubscribes = ()=>{
    axios.get(`${baseUrl}/subscribes`)
    .then((res=>{
        let subscribes = res.data
        subscribesNum.textContent = subscribes.length
    }))
}

//計算訊息總數
const countMessage = ()=>{
    axios.get(`${baseUrl}/comments`)
    .then((res=>{
        let allMsg = []
        let allcomment = res.data
        allcomment.forEach((item=>{
            allMsg.push({message : item.msg}) 
            messageNum.textContent = allMsg.length
        }))
    }))
}

//管理者登出並刪除localStorage屬性
adminSignOut.addEventListener("click", e => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminPassword")
    Swal.fire('登出成功', '三秒後跳轉頁面', 'success')
    adminSignOutDelay()
})

const adminSignOutDelay = () => {
    setTimeout(() => {
        window.location.replace("admin.html")
    }, 3000);
}

chartInit()

