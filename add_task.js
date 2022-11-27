const selectButtonTask = document.querySelector('#selectButtonTask');
const select = document.querySelector("#dropdown");
const options = document.querySelectorAll(".option");
const selectLabel = document.querySelector('#selectLabel');

const button2 = document.querySelector('#button2');
const select2 = document.querySelector("#dropdown2");
const options2 = document.querySelectorAll(".option2");
const selectLabel2 = document.querySelector('#select-label2');

selectButtonTask.addEventListener("click", function(e) {
    e.preventDefault();
    toggleHidden();
    document.getElementById('SelectGroup2').style.paddingTop = '7.5rem';
});

function toggleHidden() {
    if (hidden = false) {
        document.getElementById('SelectGroup2').style.paddingTop = '7.5rem';
    } else {
        document.getElementById('SelectGroup2').style.paddingTop = '0';
    }
    select.classList.toggle("hidden");

}

options.forEach(function(option) {
    option.addEventListener("click", function(e) {
        setSelectTitle(e);
    });
});

function setSelectTitle(e) {
    const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
    selectLabel.innerText = labelElement;
    toggleHidden();
};