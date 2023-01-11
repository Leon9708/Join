function changeHTML(id) {
    if (id == "s") {
        id = "summary";
    } else if (id === "b") {
        id = "board";
    } else if (id === "t") {
        id = "task";
    } else if (id === "c") {
        id = "contacts";
    }
    if (lastId) {
        document.getElementById(lastId).classList.add('d-none')
    }
    lastId = id;
    document.getElementById(id).classList.remove('d-none')
}

function changeColor(id) {
    const elements = document.querySelectorAll('.box_links_aside');
    elements.forEach(element => {
        element.style.backgroundColor = "#2A3647"
    });
    document.getElementById(id).parentElement.style.backgroundColor = "#091931"
}

function changeColors(id) {
    const elements = document.querySelectorAll('.box_links_aside');
    elements.forEach(element => {
        element.style.backgroundColor = "#2A3647"
    });
    document.getElementById(id).parentElement.style.backgroundColor = "#091931"
}