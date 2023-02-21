const delivery = document.querySelector(".delivery")
const send = document.querySelector(".send")
send.addEventListener("click", e => bulidOrderData())
//token 
AUTH

const bulidOrderData = () => {
    axios.get(`${baseUrl}/600/carts?_expand=product`)
        .then((res => {
            //產品訂單資料
            if (res.status === 200) {
                const carts = res.data
                localStorage.setItem('carts', JSON.stringify(res.data));
                const orderItems = carts.map((item) => {
                    return {
                        productId: item.productId,
                        qty: item.qty,
                        title: item.product.title,
                        price: item.product.price,
                    };
                });

                //計算訂單總金額
                let totalPrice = 0;
                carts.forEach((item) => {
                    const cartQty = item.qty;
                    const cartPrice = item.product.price;
                    const total = cartQty * cartPrice;
                    totalPrice += total;
                });

                let transportSurname = document.querySelector("#transportSurname").value
                let transportName = document.querySelector("#transportName").value
                let transportPhone = document.querySelector("#transportPhone").value
                let transportAddress = document.querySelector("#transportAddress").value
                let transportEmail = document.querySelector("#transportEmail").value

                if (carts.length === 0) {
                    Swal.fire('購物車為空', '請先挑選您的商品', 'error')
                    return;
                }

                if (transportSurname == "" ||
                    transportName == "" || transportPhone == "" || transportAddress == "" || transportEmail == "") {
                    Swal.fire('錯誤', '請填入完整資料', 'error')
                    return
                }
                if (validateEmail(transportEmail) == false) {
                    Swal.fire('信箱格式有誤', '請檢察信箱格式', 'error')
                    return
                }

                //訂購人資料包含總金額與產品訂單
                const newOrder = {
                    createAt: Date.now(),
                    userId: localStorage.getItem("userId"),
                    paid : false,
                    info: {
                        surName: transportSurname,
                        userName: transportName,
                        tel: transportPhone,
                        address: transportAddress,
                        email: transportEmail
                    },
                    products: orderItems,
                    payment: totalPrice,
                };
                sendOrder(newOrder)
            }
            transportSurname.value = ""
            transportName.value = ""
            transportPhone.value = ""
            transportAddress.value =""
            transportEmail.value =""
            Swal.fire('訂購成功', '三秒後跳轉首頁', 'success')
            cartDeliveryDelay()
        })).catch((error => {
            console.log(error);
        }))
}

//建立資料庫 並post到orders
const axiosDeleteCart = (cartId = 0) => {
    const url = `${baseUrl}/600/carts/${cartId}`
    return axios.delete(url);
}

//把整理過的資料參數帶入
const sendOrder = (orderData) => {
    const data = orderData;
    axios.post(`${baseUrl}/orders`, data)
        .then((res => {
           
            if (res.status === 201) {
                const localCarts = localStorage.getItem('carts');
                const carts = JSON.parse(localCarts);
   
                //aryDelete陣列存放每一筆的購物車刪除請求
                let aryDelete = [];
                carts.forEach((item => {
                    const request = axiosDeleteCart(item.id);
                    aryDelete.push(request);
                }))
                
                //發出所有請求 當全部完成時會把return axios.delete(url);的結果回傳到.then
                Promise.all(aryDelete)
                    .then((res => {
            
                        if (res.length === aryDelete.length) {
                            console.log(`已全部刪除！`);
                        }
                    })
                        .catch((error => {
                            console.log(error);
                        }))
                    )
            }
        })).catch((error => {
            console.log(error);
        }))
}

//三秒後跳轉頁面
const cartDeliveryDelay=()=>{
    setTimeout(() => {
        window.location.replace('index.html');
    }, 3000);
}
