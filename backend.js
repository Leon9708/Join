let response = {};
let URL = '127.0.0.1:8000';
let List = 'http://127.0.0.1:8000/todos/';
/* 
CATEGORIES
('M', 'Media'),
('D', 'Design'),
('MA', 'Marketing'),
('B', 'Backoffice'),
('S', 'Sales'),
('-', 'None')
 
*/



async function getTodos() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/todos/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        const tasks = await responseServer.json();
        console.log(tasks);
    }
    catch (error) {
        console.error(error)
    }
}

async function postTodo(a,b,c,d,e,f,s1,s2,s3) {

    var data = JSON.stringify(
        {
        "title": a, "description": b, "category": c, "priority": d, "user": e, "due_date": f, "subtasks": [
            {
                "title": s1
            },
            {
                "title": s2
            },
            {
                "title": s3
            },
        ]
    });
    console.log(data)
    fetch('https://jonas34.pythonanywhere.com/todos/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}