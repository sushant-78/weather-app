/*
fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});
*/
/*
fetch("http://localhost:3000/weather/?!").then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    });
});
*/
const form = document.querySelector("form");
const formInput = document.querySelector("input");
const formBtn = document.querySelector("button");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = formInput.value;
    message1.textContent = "Loading..";
    message2.textContent = "";
    fetch(
        "http://localhost:3000/weather/?address=" + encodeURIComponent(location)
    ).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });
    });
});
