window.onload = function(){
    const generateBlockBtn = document.getElementById('generateBlockBtn');
    const bubbleSortBtn = document.getElementById('bubbleSortBtn');
    const selectionSortBtn = document.getElementById('selectionSortBtn');
    let isSearchInProcess = false;

    function initializeBlocks(){
        if(isSearchInProcess){
            return;
        }

        let randomNumbers = generateRandomNumbers();
        const maxNumberEl = document.getElementById('maxValue');
        const maxValue = isValidNumber(maxNumberEl.value) ? Math.floor(maxNumberEl.value) : DEFAULT_MAX_NUMBER;

        generateBlockForSort(randomNumbers, 'blockContainer', maxValue);
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

     function handleBubbleSortBtnClick(){
        if(isSearchInProcess){
            return;
        }

        setSearchInProgressDisableHeader(true);
        const promise = bubbleSort();

        promise.then(() => {
            setSearchInProgressDisableHeader(false);
        })
        .catch((error) => {
            console.log(error);
            setSearchInProgressDisableHeader(false);
        })
    }

    function handleSelectionSortBtnClick(){
        if(isSearchInProcess){
            return false;
        }

        setSearchInProgressDisableHeader(true);
        const promise = selectionSort();

        promise.then(() => {
            setSearchInProgressDisableHeader(false);
        })
        .catch((error) => {
            console.log(error);
            setSearchInProgressDisableHeader(false);
        })
    }

    initializeBlocks()
    generateBlockBtn.addEventListener('click', initializeBlocks);
    bubbleSortBtn.addEventListener('click', handleBubbleSortBtnClick);
    selectionSortBtn.addEventListener('click', handleSelectionSortBtnClick);
}