//element

let logoText = document.querySelector("#one > #homeWrapper > #textHomeWrapper")

//multiple elements

let themeText = document.querySelectorAll("#two > div.wrapperPage > div.wrapperCheck > div.wrapperText > p")

//modify element text
const addText = " from Sri Lanka"
logoText.append(addText)

//modify element style

logoText.style.fontSize = "50px";

themeText.style.backgroundColor = "red" 

//
let divTheme = document.querySelector("#two > div.wrapperPage > div.wrapperCheck > #wrapperTextTop")

const button = document.createElement('button')
button.innerHTML = "Click me yo!"
button.id = "clickMe"



button.addEventListener('click', function clickIt() {
    alert("Wasssuuppp")
})

/* button.addEventListener('click', () => {
    alert("Wasssuuppp")
}); */

divTheme.appendChild(button)

