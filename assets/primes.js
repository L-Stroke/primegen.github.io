//SELECTORS
// document selectors for slider range input
const slider = document.getElementById('slider');

// selector for number input
const primeInputVal = document.getElementById('prime-index');

// selectors for increment buttons
const nextPrime = document.querySelector('.btn-next-prime');
const prevPrime = document.querySelector('.btn-prev-prime');

// selectors to change screen
const screenSize = document.querySelector('.btn-fullscreen');
const primeSelWin = document.querySelector('.prime-select-window');
const expandIcon = document.getElementById('expand-icon');

// selectors to change composite display
const compSwitcher = document.querySelector('.btn-composite-toggle');
const switchIcon = document.getElementById('switch-icon');

// the prime and composite elements
const prevComp = document.getElementById('compBefore');
const nextComp = document.getElementById('compAfter');
const prime = document.getElementById('prime'); 

// GLOBALS
const primeList = SoE(1000000);

const floor = 0;
const ceiling = 78497;

let showFactoredComps = false;

// INITIAL SETTINGS
primeInputVal.value = 1;
slider.value = 0;
displayPrimeAndComposites(0, showFactoredComps);

// LISTENERS

// When User interacts with slider
slider.oninput = function() {
    primeInputVal.value = sliderToInput(this.value);
    displayPrimeAndComposites((sliderToInput(this.value) - 1), showFactoredComps);
}

// When user interacts with input value
primeInputVal.oninput = function() {
    if((this.value >= (floor + 1)) && this.value <= (ceiling + 1)) {
        slider.value = inputToSlider(this.value);
        displayPrimeAndComposites((this.value - 1), showFactoredComps);
    }
}

// when user interacts with the next and prev buttons
prevPrime.addEventListener('click', () => {
    let val = +primeInputVal.value;
    if(val > floor + 1) {
        val--;
        primeInputVal.value = val;
        slider.value = inputToSlider(val);
        displayPrimeAndComposites((val - 1), showFactoredComps);
    }
});

nextPrime.addEventListener('click', () => {
    let val = +primeInputVal.value;
    if(val < ceiling + 1) {
        val++;
        primeInputVal.value = val;
        slider.value = inputToSlider(val);
        displayPrimeAndComposites((val - 1), showFactoredComps);
    }
});

// when the user interacts with the full screen button
screenSize.addEventListener('click', () => {
    primeSelWin.classList.toggle('hidden');
    toggleFullScreenIcon();
});

// for when user interacts with switch button
compSwitcher.addEventListener('click', () => {
    if(showFactoredComps) {
        showFactoredComps = false;
    }
    else {
        showFactoredComps = true;
    }
    displayPrimeAndComposites((primeInputVal.value -1), showFactoredComps);
    toggleSwitchIcon();
});

// FUNCTIONS

// toggle expand-icon on button when user interacts with fullscreen button
function toggleFullScreenIcon() {
    if(expandIcon.classList.contains('fa-expand-alt')) {
        expandIcon.classList.remove('fa-expand-alt');
        expandIcon.classList.add('fa-compress-alt');
    } else {
        expandIcon.classList.remove('fa-compress-alt');
        expandIcon.classList.add('fa-expand-alt');
    }
}

// toggle switch-icon on button when user clicks it

function toggleSwitchIcon() {
    if(switchIcon.classList.contains('fa-toggle-off')) {
        switchIcon.classList.remove('fa-toggle-off');
        switchIcon.classList.add('fa-toggle-on');
    } else {
        switchIcon.classList.remove('fa-toggle-on');
        switchIcon.classList.add('fa-toggle-off');
    }
}

// Translates value from slider to a value for input. Round to integer.
function sliderToInput(sliderVal) {
    let solution = Math.round(sliderVal * 784.98);
    return solution < ceiling ? solution + 1 : solution;
}

// Translate value from Input to a value for slider. Round to 2 decimal places.
function inputToSlider(inputVal) {
    return +((inputVal / 78498) * 100).toFixed(2);
}

// breaks composite numbers down into the primes that
// make them.  returns an object
function compositeBreaker(num) {
    let index = 0;
    let broken = {};
    
    while(num >= primeList[index]) {
        while(num % primeList[index] === 0) {
            broken[primeList[index]] ? broken[primeList[index]] += 1 : broken[primeList[index]] = 1;
            num = num / primeList[index];
        }

        index++;
    }
    
    return broken;
}

// modifies the compositeBreaker object into a readable string
function prettify(obj) {
    let pretty = "";
    for(let o in obj) {
        pretty += `(${o})<sup>${obj[o]}</sup>`;
    }
    
    return pretty;
}

// Accepts 2 inputs.  Displays prime and neighboring composites. if factorComp true, show factored composites.  
function displayPrimeAndComposites(inputVal, factorComp) {
    let primeVal = primeList[inputVal];
    prime.innerHTML = primeVal;

    if (factorComp) {
        prevComp.innerHTML = (primeVal - 1) === 1 ? "(1)<sup>1</sup>" : prettify(compositeBreaker(primeVal - 1));
        nextComp.innerHTML = prettify(compositeBreaker(primeVal + 1));
    }
    else {
        prevComp.innerHTML = primeVal - 1;
        nextComp.innerHTML = primeVal + 1;
    }
}
