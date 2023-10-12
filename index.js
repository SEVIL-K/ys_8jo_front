console.log("index.js 로드")

function articleDetail(article_id) {
    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`
}



window.onload = async function loadArticles() {
    // 게시물 불러오기
    articles = await getArticles()
    // 체크
    console.log(articles)

    // 게시물 div 선택
    const article_list = document.getElementById("article-list")

    // 불러온 게시물 div에 담기
    articles.forEach(article => {
        // 게시물이 담길 div를 만들어준다
        const newCol = document.createElement("div")
        newCol.setAttribute("class", "col")
        newCol.setAttribute("onclick",`articleDetail(${article.pk})`)


        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", "article.pk")

        newCol.appendChild(newCard)

        // 이미지 넣기
        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")

        // 이미지 없는 게시물에 기본형 보여주기
        if (article.image) {
            articleImage.setAttribute("src", `${backend_base_url}${article.image}`)  // 경로 설정시 유의 ( / 갯수 console로 확인 )
        } else {
            articleImage.setAttribute("src", "https://post-phinf.pstatic.net/MjAyMDEyMTdfMTQz/MDAxNjA4MTk2MTAwODY3.QjNHvtYqACnS7--uS1q2EzVjaKZ-8UbvmG3rDdfug0kg.7iWwVgUyT-LMWdg7YSU-NtuMbd0kbD0S1eMoxjT2pQkg.PNG/21.png?type=w800_q75")  // 웹 이미지 삽입
        }
        
        
        newCard.appendChild(articleImage)

        // 카드 body 만들기
        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)

        // 카드 제목 넣기
        const newCardTitle = document.createElement("h5")
        newCardTitle.setAttribute("class", "card-title")
        newCardTitle.innerText = article.title
        newCardBody.appendChild(newCardTitle)


        // 카드 내용 넣기
        const newCardText = document.createElement("p")
        newCardText.setAttribute("class", "card-text")
        newCardText.innerText = article.content
        newCardBody.appendChild(newCardText)

        // 추가된 내용 최종적으로 만들어주기
        article_list.appendChild(newCol)
    })
}

