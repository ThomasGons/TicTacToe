const popup = document.getElementById('result');
const test = document.querySelector('.test');

popup.addEventListener("keydown", (event) => {
    const enter = event.key;
    if (enter === "Enter")
        closePopup();
})

async function openPopup(outcome){
    popup.style.display = "flex";
    await sleep(25);
    popup.style.transform = "scale(1)";
    popup.firstElementChild.textContent = outcome;
    document.getElementById("inGame").style.filter = "blur(5px)";
    document.addEventListener("keydown", (event) => {
        const enter = event.key;
        if (enter === "Enter")
            closePopup();
    })
}

async function closePopup() {
    popup.style.transform = "scale(0.3)";
    await sleep(700);
    popup.style.display = "none";
    document.getElementById("inGame").style.filter = "blur(0)";
    await sleep(750);
    clean();
}