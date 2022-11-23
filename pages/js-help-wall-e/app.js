const robot = document.querySelector('.robot');


//Challenge: Make Eve move when you click its body.
let i = 0

function moveRobot() {
   i++
   let x = 150 + (i*50)
   robot.setAttribute("style", `margin-left: ${x}px`)
}



robot.addEventListener('click', moveRobot)   