console.log('loader js 로드')

async function injectNavbar() {
    // navbar.html 가져오기
    fetch("./navbar.html").then(Response => {
        return Response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
    
    let navbarHtml = await fetch("./navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;


    const payload = localStorage.getItem("payload");
    if (payload) {
        const payload_parse = JSON.parse(payload)
        console.log(payload_parse.email)

        const intro = document.getElementById("intro")
        intro.innerText = `${payload_parse.email}님 안녕하세요`

        // 리뷰작성 버튼 로그인시 보이게 하기
        let navbarLeft = document.getElementById("navbar-left")
        let articleCreateLi = document.createElement('li')
        articleCreateLi.setAttribute("class", "nav-item")

        let articleCreateLink = document.createElement("a")
        articleCreateLink.setAttribute("href", "/article_create.html")
        articleCreateLink.setAttribute("class", "nav-link")
        articleCreateLink.innerText = '리뷰작성'

        articleCreateLi.appendChild(articleCreateLink)
        navbarLeft.appendChild(articleCreateLi)


        // 로그인 시 로그아웃 버튼 보이게 하기
        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement('li')
        newLi.setAttribute("class", "nav-item")
        
        // 새로로그아웃생성
        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class", "nav-link btn")
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onClick", "handleLogout()")

        newLi.appendChild(logoutBtn)
        navbarRight.appendChild(newLi)

        // 로그인 시 로그인 버튼 안보이게 하기
        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none"
    }
}

injectNavbar();
