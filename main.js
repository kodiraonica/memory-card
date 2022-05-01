const cards = [
    "🥰", "🙃", "🤩", "🤪"
]
const timer = document.getElementsByClassName("timer")[0];
const numberOfGridRows = 2;
let tries = 1;
let clicked = [];
let numberOfMatches = 0;
let interval = startTimer();
showMessage("Game has started! Timer is ticking!")

function createTryElement(tries) {
   if (document.getElementsByClassName("tries").length > 0) {
        document.getElementsByClassName("tries")[0].innerHTML = `You missed ${tries} time${tries > 1 ? `s`: ``}`;
   } else {
        const h2 = document.createElement("h2");
        h2.classList.add("tries");
        h2.innerHTML = `You missed ${tries} time${tries > 1 ? `s`: ``}`;
        document.body.append(h2);
   }
}

for (let i = 0; i < numberOfGridRows; i++) {
    const numbers = Array(cards.length).fill().map((_, index) => index + 0);
    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach((number) => {
        const div = document.createElement("div");
        div.innerHTML = cards[number];
        div.setAttribute("data-id", cards[number]);
        div.setAttribute("class", "card");
        document.body.append(div)    
    })
}

const divs = document.getElementsByClassName("card");
Array.from(divs).forEach((card) => {
    card.addEventListener("click", (e) => {
        card.classList.add("open");
       
        if (clicked.length < 2) {
            if (clicked[0] == e.target || clicked[1] == e.target) {
                showMessage("Your are barking at the wrong tree :(")
                return;
            } 

            clicked.push(card);

            if (clicked.length == 2) {
                if (clicked[0].getAttribute("data-id") === clicked[1].getAttribute("data-id") && isGameWon()) {
                    showMessage("Game Won!")
                    return;
                } else if (clicked[0].getAttribute("data-id") === clicked[1].getAttribute("data-id")) {
                    showMessage("It's a match");
                    clicked = [];
                    numberOfMatches++
                } else {
                    if (tries > 2) {
                        createTryElement(tries++);
                        return;
                    }
                    showMessage("Try again")
                    createTryElement(tries++);
                    
                    setTimeout(() => {
                        clicked[0].classList.remove("open");
                        clicked[1].classList.remove("open");
                        clicked = [];
                    }, 1500)
                }
            }
        }  
    })
});

function gameOver(){
    showMessage("Game over!");
    resetGame();
}

function isGameWon(){
    if (numberOfMatches === cards.length - 1) {
        return true;
    }
}

function showMessage(message) {
    const div = document.createElement("div");
    div.setAttribute("class", "message");
    div.innerHTML = `${message}`
    document.body.append(div);

    setTimeout(() => {
        div.remove();
    }, 3000)
}

function startTimer() {
    const timer = document.getElementsByClassName("timer")[0];
    let i = timer.offsetWidth;
    const myInterval = setInterval(myTimer, 1);
    
    function myTimer() {
        i = i - 0.05;
        timer.style.width = `${i}px`;
        if (i == 0) {
            gameOver();
        }
    }
    
    return myInterval;
}

function resetGame(){
    setTimeout(() => {
        createTryElement(0);
    }, 1000)

    setTimeout(() => {
        clearInterval(interval);
        timer.style.width = "100%";
        interval = startTimer();
        clicked = [];
        tries = 0;
        numberOfMatches = 0;
        showMessage("Go, go, go!")
    }, 2000)
    showMessage("Resetting the game...")
    Array.from(divs).forEach((div) => div.classList.remove("open"));
}