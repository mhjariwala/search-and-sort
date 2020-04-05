function findMinNumberLocation(blockElements, min, n){
    return new Promise(async (resolve) => {
        let minNumberIndex = min;
        let blockElementAtMinIndex = blockElements[minNumberIndex];
        blockElementAtMinIndex.classList.add('highlight');
    
        for (let index = minNumberIndex + 1; index < n; index++) {
            const element2 = blockElements[index];
            const value1 = Number(blockElementAtMinIndex.getAttribute('data-number'));
            const value2 = Number(element2.getAttribute('data-number'));
    
            element2.classList.add('highlight');
    
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 500)
            })
            
            element2.classList.remove('highlight');
            
            if(value1 > value2){
                blockElementAtMinIndex.classList.remove('highlight')
                minNumberIndex = index
                blockElementAtMinIndex = blockElements[minNumberIndex];
                blockElementAtMinIndex.classList.add('highlight');
            }
        }
    
        if(min === minNumberIndex){
            blockElementAtMinIndex.classList.remove('highlight');
        }
    
        resolve(minNumberIndex)
    })
}

function swapForSelectionSort(config){
    return new Promise((resolve) => {
        const { container, blockElements, minIndex, minNumberPosition } = config || {}
        const element1 = blockElements[minIndex];
        const element2 = blockElements[minNumberPosition];
        const element1TransForm = element1.style.transform;
        const element2TransForm = element2.style.transform;
    
        element1.style.transform = element2TransForm;
        element2.style.transform = element1TransForm;

        // Wait for the transition to end!
        window.requestAnimationFrame(function() {
            setTimeout(() => {
            container.removeChild(element1);
            container.removeChild(element2);
            container.insertBefore(element2, blockElements[minIndex]);
            container.insertBefore(element1, blockElements[minNumberPosition]);
            element1.classList.remove('highlight');
            element2.classList.remove('highlight');
            resolve();
            }, 1000);
        });
    })
}

function selectionSort(){
    const promise = new Promise(async (resolve, reject) => {
        let blockElements = document.getElementsByClassName('block-element-container');

        if(!blockElements || !blockElements.length){
            reject('NOT_ENOUGH_ELEMENT');
            return;
        }
        const container = document.getElementById('blockContainer');
        const noOfBlockElements = blockElements.length;

        for (let index = 0; index < (noOfBlockElements - 1); index++) {
            const minIndex = index;
            let minNumberPosition =  await findMinNumberLocation(blockElements, minIndex, noOfBlockElements)
            
            if(minIndex !== minNumberPosition){
                await swapForSelectionSort({container, blockElements, minIndex, minNumberPosition})
                blockElements = document.getElementsByClassName('block-element-container');
            }
        }

        resolve();
    })

    return promise;
}