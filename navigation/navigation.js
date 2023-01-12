function changeHTML(id) {
    if (id == "s") {
        location.href = "../summary/summary.html"
    } else if (id === "b") {
        location.href = "../board/board.html"
    } else if (id === "t") {
        location.href = "../add_task/add_task.html"
    } else if (id === "c") {
        location.href = "../contacts/contacts.html"
    }
    
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