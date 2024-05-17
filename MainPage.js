let results = {
    "semi": [],
    "brilliant": []
};

document.getElementById('cmdCalculate').addEventListener('click', calculate);

function calculate() {
    // Clear previous results
    const outputSpace = document.getElementById('outputSpace');
    outputSpace.innerHTML = '';

    // Get user input
    const userInput = document.getElementById('txtInput').value.trim();

    // check if user input is correct
    const num = parseInt(userInput);
    if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        showError('wrong number.');
        return;
    }

   // intilaize semi prime and brilliant arrays
const isSemiPrimes = [];
const brilliants = [];

for (let i = 1; i <= num; i++) {
    if (isSemiPrime(i)) {
        isSemiPrimes[isSemiPrimes.length] = i;
    }
    if (isBrilliant(i)) {
        brilliants[brilliants.length] = i;
    }
}

    // Save results and do json func
    results.semi = isSemiPrimes.map(s => ({ "s": s }));
    results.brilliant = brilliants.map(b => ({ "b": b }));
    function getResults() {
        return JSON.stringify(results);
    }
    // show results in the output space
    outputSpace.appendChild(createTable(num, isSemiPrimes, brilliants));
}
function showError(message) {
    // Create a popup div
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.classList.add('popup');

    // Create an OK button
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(okButton);
    document.body.appendChild(popup);
}
//check if the number is prime
function isPrime(n) {
    if (n <= 1) {
        return false;
    } else if (n <= 3) {
        return true;
    } else if (n % 2 === 0 || n % 3 === 0) {
        return false;
    }
    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
        i += 6;
    }
    return true;
}
//check if its semi prime
function isSemiPrime(n) {
    if (n < 4) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0 && isPrime(i) && isPrime(n / i)) {
            return true;
        }
    }
    return false;
}


function isBrilliant(n) {
    if (!isSemiPrime(n)) {
        return false;
    }// if its not semi prime its not brilliant 
    const dividers = [];
    //add the dividers to array
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            dividers[dividers.length] = i;
            dividers[dividers.length] = n / i;
        }
    }
    //check if the dividers have the same number 
    if (!haveSameNumberOfDigits(dividers)) {
        return false;
    }
    return true;
}

function haveSameNumberOfDigits(arr) {
    // Check if the array is empty
    if (arr.length === 0) {
        console.log("Array is empty.");
        return false;
    }

    // Get the number of digits of the first number in the array
    const firstNumDigits = String(arr[0]).length;

    // Loop through the rest of the array
    for (let i = 1; i < arr.length; i++) {
        // Convert the current number to string and get its length
        const currentNumDigits = String(arr[i]).length;
        
        // If the number of digits doesn't match the first number, return false
        if (currentNumDigits !== firstNumDigits) {
            return false;
        }
    }

    // if All numbers have the same number of digits
    return true;
}

function createTable(num, almostPrimes, brilliants) {
    const almostPrimesSet = new Set(almostPrimes);
    const brilliantsSet = new Set(brilliants);

    const table = document.createElement('table');
    let currentNumber = 1;

    for (let i = 0; i < Math.ceil(num / 10); i++) {
        const row = document.createElement('tr');
        for (let j = 1; j <= 10; j++) {
            if (currentNumber <= num) {
                const cell = document.createElement('td');
                cell.textContent = currentNumber;

                if (almostPrimesSet.has(currentNumber) && !brilliantsSet.has(currentNumber)) {
                    cell.style.backgroundColor = 'blue';
                }
                if (brilliantsSet.has(currentNumber)) {
                    cell.style.backgroundColor = 'yellow';
                }

                row.appendChild(cell);
                currentNumber++;
            } else {
                break;
            }
        }
        table.appendChild(row);
    }
    return table;
}




