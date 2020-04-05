window.onload = function(){
    const generateBlockBtn = document.getElementById('generateBlockBtn');
    const searchNumberInput = document.getElementById('searchNumberInput');
    const linearSearchBtn = document.getElementById('linearSearchBtn');
    const binarySearchBtn = document.getElementById('binarySearchBtn');
    let isSearchInProcess = false;

    function initializeBlocks(){
        if(isSearchInProcess){
            return;
        }

        let randomNumbers = generateRandomNumbers();
        randomNumbers = sortRandomNumbers(randomNumbers);
        generateBlocks(randomNumbers, 'blockContainer');
    }

    function updateSearchContainer(number){
        const searchContainer = document.getElementById('valueToSearch');

        searchContainer.textContent = number; 
    }

    function updateResultContainer(value){
        const resultContainer = document.getElementById('result');

        resultContainer.textContent = value; 
    }

    function resetLowMidHighSection(){
        const low = document.getElementById('lowIndexValue');
        const mid = document.getElementById('midIndexValue');
        const high = document.getElementById('highIndexValue');

        low.textContent = ''
        mid.textContent = ''
        high.textContent = ''
    }

    function resetValue(showBinarySection){
        updateSearchContainer('')
        updateResultContainer('')

        const lowMidHighSection = document.querySelector('.low-mid-high-section');
        
        if(showBinarySection){    
            resetLowMidHighSection();
            lowMidHighSection.classList.remove('hidden');
            return;
        }

        if(!lowMidHighSection.classList.contains('hidden')){
            lowMidHighSection.classList.add('hidden');
        }
    }

    function setSearchInProgressDisableHeader(searchValue){
        const header = document.querySelector('header');

        isSearchInProcess = searchValue

        if(isSearchInProcess){
            header.classList.add('disabled');
            return;
        }

        header.classList.remove('disabled');
    }

     function handleLinearSearchBtnClick(){
        resetValue();

        if(isSearchInProcess || !searchNumberInput){
            return;
        }

        let number = searchNumberInput.value;

        if(!isValidNumber(number)){
            return;
        }

        setSearchInProgressDisableHeader(true);
        number = Number(number);
        updateSearchContainer(number);

        const promise = linearSearch(number)

        promise.then((index) => {
            updateResultContainer(index);
            setSearchInProgressDisableHeader(false);
        })
        .catch((error) => {
            updateResultContainer('Not Found');
            setSearchInProgressDisableHeader(false);
        })
    }

    function handleBinarySearchBtnClick(){
        resetValue(true);

        if(isSearchInProcess || !searchNumberInput){
            return false;
        }

        let number = searchNumberInput.value;

        if(!isValidNumber(number)){
            return;
        }

        setSearchInProgressDisableHeader(true);
        number = Number(number);
        updateSearchContainer(number);

        const promise = binarySearch(number)

        promise.then((index) => {
            updateResultContainer(index);
            setSearchInProgressDisableHeader(false);
        })
        .catch(() => {
            updateResultContainer('Not Found');
            setSearchInProgressDisableHeader(false);
        })

    }

    initializeBlocks()
    generateBlockBtn.addEventListener('click', initializeBlocks);
    linearSearchBtn.addEventListener('click', handleLinearSearchBtnClick);
    binarySearchBtn.addEventListener('click', handleBinarySearchBtnClick);
}