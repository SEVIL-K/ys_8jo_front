console.log('디테일 js 로드')

async function loadComments(articleId) {
    const response = await getComments(articleId)
    console.log(response)

    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ''

    response.forEach(comment => {
        
        commentList.innerHTML += `
        <li class="media d-flex mb-3">
        <img class="mr-3" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="프로필 이미지" width="50" height="50">
        <div class="media-body">
        <h5 class="mt-0 mb-1">${comment.user}}</h5>
        ${comment.content}
        </div>
    </li>
        `
    });
}

async function submitComment() {
    const commentElemnet = document.getElementById("new-comment")
    const newComment = commentElemnet.value
    console.log(newComment)
    console.log(articleId)

    // 댓글 등록
    const response = await postComment(articleId, newComment)

    // 댓글 등록 후 칸 비워주기
    commentElemnet.value = ''

    // 댓글 등록 후 새로고침
    loadComments(articleId)
}

async function loadArticles(articleId){
    const response = await getArticle(articleId)
    console.log(response)

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")

    articleTitle.innerText = response.title
    articleContent.innerText = response.content

    const newImage = document.createElement("img")
    
     // 이미지 없는 게시물에 기본형 보여주기
        if (response.image) {
            newImage.setAttribute("src", `${backend_base_url}${response.image}`)  // 경로 설정시 유의 ( / 갯수 console로 확인 )
        } else {
            newImage.setAttribute("src", "https://post-phinf.pstatic.net/MjAyMDEyMTdfMTQz/MDAxNjA4MTk2MTAwODY3.QjNHvtYqACnS7--uS1q2EzVjaKZ-8UbvmG3rDdfug0kg.7iWwVgUyT-LMWdg7YSU-NtuMbd0kbD0S1eMoxjT2pQkg.PNG/21.png?type=w800_q75")  // 웹 이미지 삽입
    }
    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)
}


window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams)
    articleId = urlParams.get('article_id')
    console.log(articleId)

    loadArticles(articleId)
    loadComments(articleId)
}