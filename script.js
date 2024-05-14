const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const errorMessagesDiv = document.getElementById('errorMessages');
const entryBar = document.getElementById('entry-bar');
let errorMessageElement = null;

function addTask() {
    if (inputBox.value === '') {
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('p');
            errorMessageElement.textContent = `Please enter a task name`;
            errorMessagesDiv.appendChild(errorMessageElement);
            entryBar.style.border = '1px solid red';
        }
    } else {
        if (errorMessageElement) {
            errorMessagesDiv.removeChild(errorMessageElement); 
            errorMessageElement = null; 
            entryBar.style.border = 'none';
        }

        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = ""; 
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();