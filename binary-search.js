function highlightLowMidAndHigh(lowContainer, midContainer, highContainer){
    const lowIndexContainer = lowContainer.querySelector('.index-container');
    const midIndexContainer = midContainer.querySelector('.index-container');
    const highIndexContainer = highContainer.querySelector('.index-container');
    
    const lowSection = document.getElementById('lowIndexValue');
    const midSection = document.getElementById('midIndexValue');
    const highSection = document.getElementById('highIndexValue');
    
    const lowIndex = lowIndexContainer.getAttribute('data-index');
    const midIndex = midIndexContainer.getAttribute('data-index');
    const highIndex = highIndexContainer.getAttribute('data-index');
    
    const midBlock = midContainer.querySelector('.block');

    lowSection.textContent = lowIndex;
    highSection.textContent = highIndex;
    
    return new Promise((resolve) => {
        lowIndexContainer.classList.add('low-highlight');
        highIndexContainer.classList.add('high-highlight');
        
        setTimeout(() => {
            midSection.textContent = midIndex;
            midIndexContainer.classList.add('mid-highlight');
            midBlock.classList.add('highlight');
            
            setTimeout(() => {
                lowIndexContainer.classList.remove('low-highlight');
                highIndexContainer.classList.remove('high-highlight');
                midIndexContainer.classList.remove('mid-highlight');
                midBlock.classList.remove('highlight');
                resolve();
            }, 700)
        }, 100)

    })
}

// get mid element index getting an average of low and high
function getMidIndex(low, high){
    let mid = (low + high) / 2

    return Math.floor(mid)
}

async function binarySearch(searchValue){
    const binarySearchPromise = new Promise(async (resolve, reject) => {
        const blockContainers = document.getElementsByClassName('block-container');
    
        if(!blockContainers){
            reject('NOT_FOUND');
            return;
        }

        let low = 0;
        let high = blockContainers.length - 1;
        let mid;

        while(low <= high){
            mid = getMidIndex(low, high);
            const lowBlockContainer = blockContainers[low];
            const midBlockContainer = blockContainers[mid];
            const highBlockContainer = blockContainers[high];
            const midBlock = midBlockContainer.querySelector('.block');
            const midNumber = Number(midBlock.getAttribute('data-number'));

            await highlightLowMidAndHigh(lowBlockContainer, midBlockContainer, highBlockContainer);
            
            if(midNumber === searchValue){
                resolve(mid);
                return;
            }

            if(midNumber < searchValue){
                low = mid + 1  
            } else {
                high = mid - 1
            }
        }

        reject('NOT_FOUND')
    });

    return binarySearchPromise;
}