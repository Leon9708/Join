function changeHTMLs(id) {
    if (id == "ss") {
        id = "summary";
    } else if (id === "bs") {
        id = "board";
    } else if (id === "ts") {
        id = "task";
    } else if (id === "cs") {
        id = "contacts";
    }
    if (lastId) {
        document.getElementById(lastId).classList.add('d-none')
    }
    lastId = id;
    document.getElementById(id).classList.remove('d-none')
}

function changeColors(id) {
    const elemnts = document.querySelectorAll('.footerDiv_mobile');
    elemnts.forEach(element => {
        element.style.backgroundColor = "#2A3647"
    });
    document.getElementById(id).style.backgroundColor = "#091931"
}