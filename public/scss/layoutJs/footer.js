const footerList = document.querySelector(".footer")

//footer初始化
const footerInit = ()=>{
    let str = ''
    str += `<ul class="d-flex justify-content-md-between flex-wrap px-0">
        <li >
          <div class="d-flex   flex-column ">
            <img src="https://i.imgur.com/m4DS6F1.jpg" width="220px" alt="" class="mb-2">
            <img src="https://i.imgur.com/xZYFU2T.jpg" width="220px" alt="" class="mb-2">
            <img src="https://i.imgur.com/S8vXbhR.jpg" alt="" width="220px" class="mb-5">
            <p class="h6 d-none d-md-block mb-5">
              SHARK 路亞釣魚平台，是台灣第一個整合所有釣魚資訊的網路平<br>台
              ，除了販售相關釣魚產品外，亦可與釣友一起分享釣魚心得
              ，更<br>可以搜尋地點、觀看風浪、潮汐及天氣圖表等詳細的專業資訊。
            </p>
            <p class="h6 mb-6 d-block d-md-none">
              SHARK 路亞釣魚平台，是台灣第一個整合所有釣魚資訊的網路平台
              ，除了販售相關釣魚產品外，亦可與釣友一起分享釣魚心得
              ，更可以搜尋地點、觀看風浪、潮汐及天氣圖表等詳細的專業資訊。
            </p>
          </div>
        </li>
        <li>
          <div>
            <h2 class="h3 fw-bold mb-md-5 mb-4">聯絡我們</h2>
            <ul class="d-flex flex-md-row px-0 flex-column  ">
              <li class="me-5 mb-2">
                <h3 class="h6 fw-bold  mb-1">地址</h3>
                <p class="h6 text-secondary">新北市新莊區</p>
              </li>
              <li class="me-5 mb-2">
                <h3 class="h6 fw-bold  mb-1">電話</h3>
                <p class="h6 text-secondary">0954166177</p>
              </li>
              <li class="mb-2">
                <h3 class="h6 fw-bold  mb-1">電子信箱</h3>
                <p class="h6 text-secondary">1234567@gmail.com</p>
              </li>
            </ul>
            <a href="admin.html" class="h6">後台管理</a>
          </div>
        </li>
      </ul>
      <span class="d-block mt-4 mt-md-0 text-center text-secondary h6">©2022 SHARK CO. ALL RIGHTS RESERVED</span>`
    footerList.innerHTML = str
}
footerInit()
