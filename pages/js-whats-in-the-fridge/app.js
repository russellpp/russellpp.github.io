const downButton = document.querySelector('#down')
const upButton = document.querySelector('#up')
const buyListDisplay = document.querySelector('#first-list')
const fridgeListDisplay = document.querySelector('#second-list')

const buyList = ['chicharon', 'buko pie', 'mango', 'bacon' ]
const fridge = ['tomato', 'peppers', 'beer', 'wine']

//Challenge: Please fill the fridge array with 5 items of your choice. 


//Challenge 2: You have bought some chicharon.
//Please remove it from the buyList and add it to the items in fridge.


//Challenge 3: Write a function that will remove an item from the fridge,
//and put it in the buyList, on the press of the moveUp button.
function showList() {
    buyListDisplay.innerHTML = buyList;
    fridgeListDisplay.innerHTML = fridge;
}

showList()

function moveUp(){
    //your code
    
    var removeFridge = fridge.shift();
    buyList.unshift(removeFridge);
    showList()
}

upButton.addEventListener('click', moveUp)

//Challenge 4: Write a function that will remove the last item in the buyList, 
//and put it in the fridge.

function moveDown(){
    //your code
    var removeList = buyList.shift();
    fridge.unshift(removeList);
    showList()
}

downButton.addEventListener('click', moveDown)







/* const downButton = document.querySelector('#down')
const upButton = document.querySelector('#up')
const buyListDisplay = document.querySelector('#first-list')
const fridgeListDisplay = document.querySelector('#second-list')

const buyList = ['chicharon', 'buko pie', 'mango', 'bacon' ]
const fridge = ['tomato', 'peppers', 'beer', 'wine']

//Challenge: Please fill the fridge array with 5 items of your choice. 


//Challenge 2: You have bought some chicharon.
//Please remove it from the buyList and add it to the items in fridge.


//Challenge 3: Write a function that will remove an item from the fridge,
//and put it in the buyList, on the press of the moveUp button.

function moveUp(){
    var removeFridge = fridge.pop();
    buyList.unshift(removeFridge);
    
}

upButton.addEventListener('click', moveUp);

//Challenge 4: Write a function that will remove the last item in the buyList, 
//and put it in the fridge.

function moveDown(){
    removeList = buyList.pop();
    fridge.unshift(removeList);
}

downButton.addEventListener('click', moveDown);

buyListDisplay.innerHTML = buyList;
fridgeListDisplay.innerHTML = fridge; */