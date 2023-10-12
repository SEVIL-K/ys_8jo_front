const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


window.onload = () => {
    console.log("api js 로드")
}

// 회원가입 함수
async function handleSignin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    // 체크
    console.log(email, password)
    
    const response = await fetch(`${backend_base_url}/signup`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password":password
        })
    })

    return response
}

// 로그인 함수
async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    // 체크
    console.log(email, password)

    const response = await fetch(`${backend_base_url}/accounts/api/token`, {
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password":password
        })
    })

    if (response.status == 200) {
        const response_json = await response.json()
        console.log(response)
        console.log(response_json)

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("환영합니다.")
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert("회원정보가 일치하지 않습니다")
    }
}

async function handleMock() {
    const response = await fetch(`${backend_base_url}/accounts/mock/`, {
        headers: {
            "Authorization" : "bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    console.log(response)
}

// 로그아웃 함수
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}

// 로그인 확인 함수
function checkLogin() {
    const payload = localStorage.getItem("payload")
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

// 게시물 리스트를 보여주기 위한 게시물 불러오기 함수
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/`, { method: 'GET' })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert("게시물을 불러오는데 실패하였습니다")
    }
    
}

// 게시물 작성 함수
async function postArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]

    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('image', image)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/articles/`, {
        method: 'POST',
        headers: {
            "Authorization" : `Bearer ${token}`
        },
        body:formdata
    })

    if (response.status == 200) {
         alert("글작성 완료")
        window.location.replace(`${backend_base_url}/`)
    } else {
        alert(response.status)
    }
}


// 게시물 상세 페이지를 보여주기 위한 함수
async function getArticle(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}`,
    )

    if (response.status == 200) {
        response_json = await response_json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 댓글들을 보여주기 위한 함수
async function getComments(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`,
    )

    if (response.status == 200) {
        response_json = await response_json()
        return response_json
    } else {
        alert(response.status)
    }
}

// 댓글 등록을 위한 함수
async function postComment(articleId, newComment) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body:JSON.stringify({
            "content": newComment,
        })
    })

    if (response.status == 200) {
        response_json = await response_json()
        return response_json
    } else {
        alert(response.status)
    }
}