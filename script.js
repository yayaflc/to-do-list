const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Digite algo antes de adicionar");
    } else {
        let li = document.createElement("li");
        let textSpan = document.createElement("span")
        textSpan.textContent = inputBox.value
        textSpan.className = "to-do-text"
        li.appendChild(textSpan)
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.id = "deleteBtn";
        span.className = "material-symbols-outlined delete-icon";
        span.textContent = "delete";
        li.appendChild(span);
    }

    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (e.target === e.target.parentNode.querySelector("span")) {
            return;
        }
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.id === "deleteBtn") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data-to-do", listContainer.innerHTML);
}

function getData() {
    listContainer.innerHTML = localStorage.getItem("data-to-do")
}

getData();

// filter buttons

function showCheckedTasks() {
    const listItems = listContainer.querySelectorAll("li");

    listItems.forEach((item) => {
        if (item.classList.contains("checked")) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

function showAllTasks() {
    const listItems = listContainer.querySelectorAll("li");

    listItems.forEach((item) => {
        item.style.display = "flex";
    });
}

function showUncheckedTasks() {
    const listItems = listContainer.querySelectorAll("li");

    listItems.forEach((item) => {
        if (!item.classList.contains("checked")) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

// enter keypress

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        const button = document.querySelector("#send");
        button.click();
    }
})

// dark and light mode

var icon = document.querySelector("[data-theme-toggle]");
loadTheme();

function toggleTheme() {
    let currentThemeSetting = document.querySelector("html").getAttribute("data-theme");
    var icon = document.querySelector("[data-theme-toggle]");

    if (currentThemeSetting === "dark") {
        document.querySelector("html").setAttribute("data-theme", "light");
        currentThemeSetting = "light";
        icon.innerText = "light_mode";

        const logo = document.querySelector(".logo");
        logo.src = "assets/images/logo_dark.png";

        localStorage.setItem("theme", "light");
    } else {
        document.querySelector("html").setAttribute("data-theme", "dark");
        icon.innerText = "dark_mode";

        const logo = document.querySelector(".logo");
        logo.src = "assets/images/logo_light.png";

        localStorage.setItem("theme", "dark");
    }
}

function loadTheme() {
    let SystemThemeSetting = window.matchMedia("(prefers-color-scheme: dark)").matches;

    let currentThemeSetting = localStorage.getItem("theme");

    if (currentThemeSetting === "dark" || (SystemThemeSetting === true && currentThemeSetting === null)) {
        newTheme = "dark";
        changeIcon = "dark_mode";
    } else {
        newTheme = "light";
        changeIcon = "light_mode";
    }

    icon.innerText = changeIcon;
    document.querySelector("html").setAttribute("data-theme", newTheme);
}

