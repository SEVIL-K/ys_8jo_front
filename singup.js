console.log('signup js 로드')

async function handleSigninButton() {
    const response = await handleSignin()
        if (response.status == 201) {
        alert("회원가입 완료, 축하합니다")
        window.location.replace(`${frontend_base_url}/login.html`)
    }
}


checkLogin();