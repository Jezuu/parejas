let configFires = {
    'bits': 300,
    'intensity': 13,
    'speed': 10,
    'zindex': 9999
};

let images = ['bender.png', 'fry.png', 'zoidberg.png', 'leela.png'];
let selectOne = null;
let selectTwo = null;
let healts = 3;
let uniqueRandoms = [];
let numRandoms = images.length;

function makeUniqueRandom() {

    if (!uniqueRandoms.length) {

        for (let i = 0; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }

    let index = Math.floor(Math.random() * uniqueRandoms.length);
    let val = uniqueRandoms[index];

    uniqueRandoms.splice(index, 1);

    return val;
}

function setImages(table) {

    table.innerHTML = '';

    let tr1 = document.createElement("tr");
    tr1.classList.add("fila1");
    uniqueRandoms = [];

    for(let i = 0; i < images.length; i++) {

        let pos = makeUniqueRandom();

        let td1 = tr1.appendChild(document.createElement("td"));

        let button1 = td1.appendChild(document.createElement("button"));
        button1.classList.add("card" + (pos + 1));
        button1.style.display = "flex";

        let imgFront1 = button1.appendChild(document.createElement("img"));
        imgFront1.src = "images/" + images[pos];

        let imgBack1 = button1.appendChild(document.createElement("img"));
        imgBack1.classList.add("back");
        imgBack1.src = "images/futurama.jpg";
    }
    table.appendChild(tr1);

    let tr2 = document.createElement("tr");
    tr2.classList.add("fila2");
    uniqueRandoms = [];

    for(let i = 0; i < images.length; i++) {

        let pos = makeUniqueRandom();

        let td2 = tr2.appendChild(document.createElement("td"));

        let button2 = td2.appendChild(document.createElement("button"));
        button2.classList.add("card" + (pos + 1));
        button2.style.display = "flex";

        let imgFront2 = button2.appendChild(document.createElement("img"));
        imgFront2.src = "images/" + images[pos];

        let imgBack2 = button2.appendChild(document.createElement("img"));
        imgBack2.classList.add("back");
        imgBack2.src = "images/futurama.jpg";
    }
    table.appendChild(tr2);
}

function hideImages() {

    document.getElementsByTagName('table')[0].querySelectorAll("td").forEach((el) => {

        el.getElementsByTagName('button')[0].children[0].style.display = 'none';
        el.getElementsByTagName('button')[0].children[1].style.display = 'flex';
    });
}

function showImages() {

    document.getElementsByTagName('table')[0].querySelectorAll("td").forEach((el) => {

        el.getElementsByTagName('button')[0].children[0].style.display = 'flex';
        el.getElementsByTagName('button')[0].children[1].style.display = 'none';
    });
}

function isWin() {

    let countWins = 0;

    document.getElementsByTagName('table')[0].querySelectorAll("td").forEach((el) => {

        if (el.getElementsByTagName('button')[0].children[0].style.display != 'none')
            countWins++;
    });

    return countWins;
}

function openPopUp() {
    let popup = document.getElementsByClassName("overlay")[0];

    popup.style.display = 'block';
    popup.style.opacity = '1';
}

function closePopUp() {
    let popup = document.getElementsByClassName("overlay")[0];

    popup.style.display = 'none';
    popup.style.opacity = '0';
}

function restartGame() {

    healts = 3;

    let retryButton = document.getElementsByClassName("retry")[0];

    retryButton.addEventListener('click', (event) => {
        closePopUp();
        setImages(document.getElementsByTagName('table')[0]);
        setTimeout('hideImages()', 1000);
    });

    setTimeout(() => {

        let elementHealts = document.getElementsByClassName("healt")[0].children[1];
        for(let i = 0; i < healts; i++) {
            let healtImg = document.createElement("img");
            healtImg.src = "images/healt-bender.png";
            healtImg.alt = "Healt";
            elementHealts.appendChild(healtImg);
        }
    }, 1000);
}

document.addEventListener('click', (event) => {

    const isButton = event.target.nodeName === 'BUTTON';
    const isImage = event.target.nodeName === 'IMG';

    if (!isButton && !isImage)
        return;

    const fila = event.target.parentElement.parentElement.parentElement.className;

    if (fila === 'fila1') {

        if (selectOne === null) {
            selectOne = event.target;
            selectOne.parentElement.children[0].style.display = 'flex';
            selectOne.parentElement.children[1].style.display = 'none';
        }
    }

    if (fila === 'fila2') {
        
        if (selectTwo === null) {
            selectTwo = event.target;
            selectTwo.parentElement.children[0].style.display = 'flex';
            selectTwo.parentElement.children[1].style.display = 'none';
        }
    }

    if (selectOne !== null && selectTwo !== null) {

        if(selectOne.parentElement.className === selectTwo.parentElement.className) {

            console.log("GOOD!");

            selectOne = null;
            selectTwo = null;

            if (healts > 0 && isWin() == (numRandoms * 2))
                fireStart(configFires);

        } else {

            console.log("FAIL!");

            healts--;

            let span = document.getElementsByClassName("healt")[0].children[1];
            span.removeChild(span.lastElementChild);

            setTimeout(() => {

                selectOne.parentElement.children[0].style.display = 'none';
                selectOne.parentElement.children[1].style.display = 'flex';
                selectTwo.parentElement.children[0].style.display = 'none';
                selectTwo.parentElement.children[1].style.display = 'flex';

                selectOne = null;
                selectTwo = null;

                if (healts === 0) {
                    restartGame();
                    console.log("GAME OVER");
                    showImages();
                    setTimeout(() => {
                        openPopUp();
                    }, 1000)
                }

            }, 1000);
        }
    }
});

window.addEventListener('load', () => {
    setImages(document.getElementsByTagName('table')[0]);
    setTimeout('hideImages()', 1000);
});