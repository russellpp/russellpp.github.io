let textScreen = document.querySelector('#output')
let keys = document.querySelectorAll('#keyboard > dl > dd')
let keyboard = document.querySelector('#keyboard')

let a = document.querySelector('#one')
let backspace = document.querySelector('#backspace')


/* a.addEventListener ('click', function () {
    console.log("kjsdfk");
    let charOne = a.innerText;
    console.log(charOne);
    textScreen.innerHTML = charOne;
}) */





keys.forEach(key => {
    key.addEventListener ('click', function () {
        
        console.log(this.innerText);

        if (this.innerText == "Backspace") 
            
        {   console.log('delete')
            let outputDisplay = textScreen.innerHTML;
            textScreen.innerHTML = outputDisplay.substring(0,(outputDisplay.length-1));
            
        }

        else {
            
            console.log('type')
            textScreen.innerText += this.innerHTML;
            
        }

})

})

/* backspace.addEventListener ('click', function () {
    console.log("backspacesucceess");
    let outputDisplay = textScreen.innerHTML;
    textScreen.innerHTML = outputDisplay.substring(0,(outputDisplay.length-10))

}) */








/* keys.forEach(key => {
    key.addEventListener ('click', function () {
               
        if (history.innerText = "Backspace") {
            let outputDisplay = textScreen.innerHTML;
            textScreen.innerHTML = outputDisplay.substring(0,(outputDisplay.length-1))
            console.log('delete')
        }
        else {
            let char = key.innerText;
            console.log('YAY')
            te
            xtScreen.innerHTML += char;
        }}
)

}) */



