window.onload = function(){
    const generateBlockBtn = document.getElementById('generateBlockBtn');
    
    const searchNumberInput = document.getElementById('searchNumberInput');
    const linearSearchBtn = document.getElementById('linearSearchBtn');
    const binarySearchBtn = document.getElementById('binarySearchBtn');
    
    const bubbleSortBtn = document.getElementById('bubbleSortBtn');
    const selectionSortBtn = document.getElementById('selectionSortBtn');
    const insertionSortBtn = document.getElementById('insertionSortBtn');
    
    let isSearchInProcess = false;
    let randomNumbers = []
    
    generateBlockBtn.addEventListener('click', initializeBlocks);
    
    linearSearchBtn.addEventListener('click', handleLinearSearchBtnClick);
    binarySearchBtn.addEventListener('click', handleBinarySearchBtnClick);
    
    bubbleSortBtn.addEventListener('click', handleBubbleSortBtnClick);
    selectionSortBtn.addEventListener('click', handleSelectionSortBtnClick);
    insertionSortBtn.addEventListener('click', handleInsertionSortBtnClick);
    
    function initializeBlocks(){
        if(isSearchInProcess){
            return;
        }

        randomNumbers = generateRandomNumbers();
        initializeBlockForSearch(false);
        generateBlockForSort(randomNumbers);
    }
    
    function initializeBlockForSearch(sorted){
        let updatedRandomNumbers = JSON.parse(JSON.stringify(randomNumbers));
        
        if(sorted){
            updatedRandomNumbers = sortRandomNumbers(randomNumbers);
        }

        generateBlocks(updatedRandomNumbers); 
    }


    initializeBlocks()
    
    function shouldProcessSort(){
        if(!randomNumbers || !randomNumbers.length){
            return false
        }

        return isSearchInProcess
    }

    function setSearchInProgressDisableHeader(searchValue) {
        const header = document.querySelector('header');
    
        if (isSearchInProcess) {
            header.classList.add('disabled');
            return;
        }
    
        header.classList.remove('disabled');
    }

    function setSearchInProcess(searchInProcess) {
        isSearchInProcess = searchInProcess
        setSearchInProgressDisableHeader(searchInProcess);
    }

    function shouldProcessSearch(){
        if(!randomNumbers  || !randomNumbers.length || isSearchInProcess || !searchNumberInput){
            return false;
        }

        let number = searchNumberInput.value;
    
        if(!isValidNumber(number)){
            return false;
        }

        return true;
    }

    function handlePromiseForSearch(promise){
        if(!promise){
            return;
        }

        promise.then((index) => {
            updateResultContainer(index);
            setSearchInProcess(false);
        })
        .catch((error) => {
            updateResultContainer('Not Found');
            setSearchInProcess(false);
        })
    }

    function handleLinearSearchBtnClick(){
        if(!shouldProcessSearch()){
            return;
        }

        resetValue();
        setSearchInProcess(true)
        
        let number = searchNumberInput.value;
        number = Number(number);
        updateSearchContainer(number);

        const promise = linearSearch(number)
        handlePromiseForSearch(promise)
    }

    async function handleBinarySearchBtnClick(){
        if(!shouldProcessSearch()){
            return;
        }

        resetValue(true);
        setSearchInProcess(true);
        initializeBlockForSearch(true);

        await new Promise((resolve) => {
            setTimeout(()=>{
                resolve();
            }, 200)
        })

        let number = searchNumberInput.value;
        number = Number(number);
        updateSearchContainer(number);

        const promise = binarySearch(number)

        handlePromiseForSearch(promise)
    }

    function handlePromiseForSort(promise){
        if(!promise){
            return
        }

        promise.then(() => {
            setSearchInProcess(false)
        })
        .catch((error) => {
            console.log(error);
            setSearchInProcess(false)
        })
    }

    function handleBubbleSortBtnClick(){
        if(shouldProcessSort()){
            return;
        }
        
        const promise = bubbleSort();

        setSearchInProcess(true)
        handlePromiseForSort(promise)
    }

    function handleSelectionSortBtnClick(){
        if(shouldProcessSort()){
            return;
        }
        
        const promise = selectionSort();

        setSearchInProcess(true)
        handlePromiseForSort(promise)
    }

    function handleInsertionSortBtnClick(){
        if(shouldProcessSort()){
            return;
        }
        
        const promise = insertionSort();

        setSearchInProcess(true)
        handlePromiseForSort(promise)
    }
}