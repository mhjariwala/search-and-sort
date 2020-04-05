const DEFAULT_MAX_NUMBER = 100;
const SIZE = 10;

function sortRandomNumbers(randomNumbers){
    if(!randomNumbers) {
        return; 
    }
    
    const sortedNumbers = JSON.parse(JSON.stringify(randomNumbers))
    
    sortedNumbers.sort((a, b) => {
        if(a < b){
            return -1
        }
        if(a > b){
            return 1
        }
        return 0
    })

    return sortedNumbers
}

function isValidNumber(number){
    if(!number || !number.trim()){
        return false
    }

    number = Number(number)
    return !isNaN(number)
}

function generateRandomNumbers() {
    const sizeEl = document.getElementById('dataSetSize');
    const maxNumberEl = document.getElementById('maxValue');
    let size = SIZE;
    let maxValue = DEFAULT_MAX_NUMBER;
    let start = 1;

    const randomNumbers = []

    if(sizeEl && sizeEl.value){
        size = Math.floor(sizeEl.value);
    }

    if(maxNumberEl && maxNumberEl.value){
        maxValue = Math.floor(maxNumberEl.value);
    }

    while (start <= size) {
        const number = Math.floor(Math.random() * (maxValue - 10));
        randomNumbers.push(number);
        start++;
    }
    
    return randomNumbers;
}

function generateBlocks(randomNumbers, containerId){
    const containerEl = document.getElementById(containerId)

    if(!containerEl){
        return;
    }

    containerEl.innerHTML = ''

    randomNumbers.forEach((number, index) => {
        const blockElementContainer = document.createElement('div');
        const blockElement = document.createElement('div');
        const indexContainer = document.createElement('div');
        const textNode = document.createTextNode(index);
        
        indexContainer.className = 'index-container';
        indexContainer.setAttribute('data-index', index);
        indexContainer.appendChild(textNode);

        blockElement.className = 'block';
        blockElement.textContent = number;
        blockElement.setAttribute('data-number', number);
        
        blockElementContainer.className = 'block-container';
        blockElementContainer.appendChild(blockElement);
        blockElementContainer.appendChild(indexContainer);

        containerEl.appendChild(blockElementContainer)
    })
}

function getBlockElementHeight(number, maxNumber){
  let height = (number * 100) / maxNumber;
  height += 5;
  return Math.floor(height);
}

function generateBlockForSort(randomNumbers, containerId, maxNumber){
    const containerEl = document.getElementById(containerId)

    if(!containerEl){
        return;
    }

    containerEl.innerHTML = ''

    randomNumbers.forEach((number, index) => {
        const blockElementContainer = document.createElement('div');
        const blockElement = document.createElement('div');
        const textNode = document.createTextNode(number);
        const blockHeight = getBlockElementHeight(number, maxNumber)
        const shiftBlockContainer = `translateX(${index * 30}px)`;
        
        blockElement.className = 'block';
        blockElement.style.height = blockHeight + '%';
        blockElementContainer.className = 'block-element-container';
        
        blockElementContainer.style.transform = shiftBlockContainer;
        blockElementContainer.setAttribute('data-number', number);
        blockElementContainer.appendChild(blockElement);
        blockElementContainer.appendChild(textNode);

        containerEl.appendChild(blockElementContainer)
    })
}
