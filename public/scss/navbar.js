const navList = document.querySelector(".navList")

const NavbarInit =()=>{
    let str = ''
    str += ` <div class="container-fluid">
        <a class="navbar-brand" href="index.html">
          <div class="d-flex  flex-column ">
            <img src="img/SHARK.svg" width="88" alt="" class="mb-1">
            <img src="img/Line 2 (Stroke).svg" alt="" class="mb-1">
            <img src="img/路亞釣魚平台.svg" alt="">
          </div>
        </a>
        <button class="hanburgerBtm d-lg-none d-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa-sharp fa-solid fa-bars fa-lg"></i>
        </button>
        <div class="collapse navbar-collapse navbar-Custom" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="navbar-brand d-sm-none" href="#">
            </a>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <p class="nav-link active text-secondary me-lg-3 h6 mb mb-lg-0">hi David</p>
            </li>
            <li class="nav-item">
              <div class="dropdown nav-link">
                <button class="btn pt-0 px-0 mt-4 mt-lg-0 text-secondary navbarBtn h6  mb-4 mb-lg-0 dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  產品介紹
                </button>
                <ul class="dropdown-menu dropdown-menu dropdownBtn py-2" aria-labelledby="dropdownMenuButton2">
                  <li><a class="dropdown-item mb-lg-2 mb-4" href="products.html">釣竿</a></li>
                  <li><a class="dropdown-item mb-lg-2 mb-4" href="products.html">捲線器</a></li>
                  <li><a class="dropdown-item" href="products.html">路亞餌</a></li>
                  </ul>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link active text-secondary ms-lg-2 h6 mb-4 mb-lg-0" aria-current="page" href="member.html">會員專區</a>
            </li>
              <li class="nav-item">
                <a class="nav-link active text-secondary ms-lg-2 h6 mb-4 mb-lg-0" aria-current="page" href="carts.html">購物車</a>
              </li>
            <li class="nav-item">
              <a class="nav-link active text-light py-1 px-1 btn btn-success ms-lg-2 px-3 py-1 h6 mb-4 mb-lg-0 loginBtn" aria-current="page"
                href="login.html">登入</a>
            </li>
          </ul>
        </div>
      </div>`
    navList.innerHTML = str
}



NavbarInit()