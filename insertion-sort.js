function swapForInsertionSort(element1, element2){
    return new Promise((resolve) => {
        const container = document.getElementById('blockContainer');
        const element1Transform = element1.style.transform;
        const element2Transform = element2.style.transform;

        element1.style.transform = element2Transform;
        element2.style.transform = element1Transform;

        setTimeout(() => {
            container.insertBefore(element2, element1);
            resolve()
        }, 1000);
    })
}

function insertionSort(){
    const promise = new Promise(async (resolve, reject) => {
        let blockElements = document.getElementsByClassName('block-element-container');
        
        if(!blockElements || !blockElements.length){
            reject('NOT_ENOUGH_ELEMENT');
            return;
        }

        const noOfBlockElements = blockElements.length;

        for (let index = 0; index < noOfBlockElements - 1; index++) {
             let j = index + 1

             while (j > 0) {
                const currentBlockElementContainer = blockElements[j]
                const previousBlockElementContainer = blockElements[j - 1]
                const currentNumber = Number(currentBlockElementContainer.getAttribute('data-number'))
                const previousNumber = Number(previousBlockElementContainer.getAttribute('data-number'))

                currentBlockElementContainer.classList.add('highlight');
                previousBlockElementContainer.classList.add('highlight');

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 700)
                });

                if(currentNumber >= previousNumber){
                    currentBlockElementContainer.classList.remove('highlight');
                    previousBlockElementContainer.classList.remove('highlight');
                    break;
                }

                await swapForInsertionSort(previousBlockElementContainer, currentBlockElementContainer);
                currentBlockElementContainer.classList.remove('highlight');
                previousBlockElementContainer.classList.remove('highlight');
                blockElements = document.getElementsByClassName('block-element-container');
                j--;
             }           
        }
        resolve()
    })

    return promise
}