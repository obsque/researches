//////////////////////////////////////////////////
// TITLE
document.addEventListener("DOMContentLoaded", function() {
    function updateTitle() {
        const title = document.querySelector("#title h1");
        const text = "7.2 전투직 제작재료 계산";
        // const text = "★천하제일뿌직(부직)추첨대회★";
        title.innerHTML = "";
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            title.appendChild(span);
        });
    }
    updateTitle();
    setInterval(updateTitle, 1000);
});