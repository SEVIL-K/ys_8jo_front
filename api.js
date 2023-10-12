const frontend_base_url = "http://127.0.0.1:5501"
const backend_base_url = "http://127.0.0.1:8000"


window.onload = () => {
    console.log("api js 로드")
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
    formdata.append('picture', image)

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
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert(response.status)
    }
}


// 게시물 상세 페이지를 보여주기 위한 함수
async function getArticle(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}`,
    )
    if (response.status == 200) {
        response_json = await response.json()
        console.log(response_json)
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
        response_json = await response.json()
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
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}