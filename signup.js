
window.onload = () => {
    console.log("signup js 로드");
    loginCheck();
};
async function handleSignupButton() {
    const response = await handleSignup()
        alert("회원가입 완료, 축하합니다");
        window.location.replace(`${frontend_base_url}/login.html`);

}

