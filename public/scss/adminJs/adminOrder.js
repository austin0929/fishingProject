const orderListDom = document.querySelector(".orderList")
const allOrderItemDeleteBtn = document.querySelector(".allOrderItemDeleteBtn")
let adminSignOut = document.querySelector(".adminSignOut")
let orderList = []

//訂單初始化
const orderInit = () => {
    getOrderList()
}

//取得訂單列表
const getOrderList = () => {
    axios.get(`${baseUrl}/orders`)
        .then((res => {
            orderList = res.data
            let str = ''
            orderList.forEach((item => {

                //訂單狀態
                let orderStatusStr=''
                if (item.paid == false) {
                    orderStatusStr = "未處理"
                }
                else{
                    orderStatusStr = "已處理"
                }

                //訂單時間字串
                const timeStamp = new Date(item.createAt)
                let orderTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth()+1}/${timeStamp.getDate()}`

                //訂單品項字串
                let productItemStr = ''
                item.products.forEach((productItem=>{
                    productItemStr += `${productItem.title}x${productItem.qty}`
                }))

                //全部字串
                str += `<tr>
                        <td>${item.id}</td>
                        <td>
                            ${item.info.surName} ${item.info.userName}
                        </td>
                        <td>${item.info.address}</td>
                        <td>${item.info.email}</td>
                        <td>
                           ${productItemStr}
                        </td>
                        <td>${orderTime}</td>
                        <td class="orderStatus">
                            <a href="#" class="orderStatus" data-orderPaid="${item.paid}" data-orderId="${item.id}">${orderStatusStr}</a>
                        </td>
                        <td>
                            <input type="button" class="orderItemDeleteBtn js-orderDelete" value="刪除" data-orderId="${item.id}">
                        </td>
                    </tr>`
            }))
            orderListDom.innerHTML=  str
        }))
}

//監聽點擊位置
orderListDom.addEventListener("click",e=>{
    e.preventDefault()
    let orderPaid = e.target.getAttribute("data-orderPaid")
    let orderId = e.target.getAttribute("data-orderId")

        //點擊狀態更新訂單狀態
    if (e.target.classList.contains("orderStatus")) {
        orderStatusUpdate(orderPaid, orderId)
        return
    }

       //點擊刪除後刪除單筆訂單
    if (e.target.classList.contains("js-orderDelete")) {
        orderItemDelete(orderId)
        return
    }
})

//更新訂單狀態
const orderStatusUpdate = (orderPaid,orderId)=>{
    console.log(orderPaid, orderId);
    let orderStatus = ''
    if (orderPaid == "false") {
        orderStatus = true
    }
    else{
        orderStatus = false
    }
    const data = {
        paid: orderStatus,
        id: orderId
    }
    axios.patch(`${baseUrl}/orders/${orderId}`,data)
    .then((res=>{
        console.log(res);
        getOrderList()
    })).catch((error=>{
        console.log(error);
    }))
}

//刪除單筆訂單
const orderItemDelete = (orderId)=>{
    axios.delete(`${baseUrl}/orders/${orderId}`)
        .then((res => getOrderList()))
}

allOrderItemDeleteBtn.addEventListener("click",e=>{
    if(orderList.length === 0){
        Swal.fire('訂單無商品', '請先把產品加入購物車', 'error')
        return
    }
    orderList.forEach((item=>{
        axios.delete(`${baseUrl}/orders/${item.id}`)
        .then((res=>{
            Swal.fire('訂單已清空', '訂單已全部刪除', 'success')
            getOrderList()
        })).catch((error=>{
            console.log(error);
        }))
    }))
})

//管理者登出並刪除localStorage屬性
adminSignOut.addEventListener("click",e=>{
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminPassword")
    Swal.fire('登出成功', '三秒後跳轉頁面', 'success')
    adminSignOutDelay()
})

const adminSignOutDelay = ()=>{
    setTimeout(() => {
        window.location.replace("admin.html")
    }, 3000);
}

orderInit()