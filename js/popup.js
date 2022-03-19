const popup = document.getElementById('result');
const test = document.querySelector('.test');

popup.addEventListener("keydown", (event) => {
    const enter = event.key;
    if (enter === "Enter")
        closePopup();
})

function openPopup(outcome) {
    popup.style.top = "0px";
    popup.firstElementChild.textContent = outcome;
    document.getElementById("inGame").style.filter = "blur(5px)";
    document.addEventListener("keydown", (event) => {
        const enter = event.key;
        if (enter === "Enter")
            closePopup();
    })
}

function closePopup() {
    document.getElementById("inGame").style.filter = "blur(0)";
    popup.style.top = "-300px";
    clean();
}