 function highlightBlockAndIndex(block, indexContainer){
    return new Promise((resolve) => {
        block.classList.add('highlight');
        indexContainer.classList.add('highlight');
        
        setTimeout(() => {
            block.classList.remove('highlight');
            indexContainer.classList.remove('highlight');
            resolve();
        }, 300)
    })
}

async function linearSearch(searchValue){
    const linearSearchPromise = new Promise(async (resolve, reject) => {
        const blockContainers = document.getElementsByClassName('block-container');
        let index = 0;

        if(!blockContainers || !blockContainers.length){
            reject('NOT_FOUND');
            return;
        }

        for (; index < blockContainers.length; index++) {
            const blockContainer = blockContainers[index];
            const block = blockContainer.querySelector('.block');
            const indexContainer = blockContainer.querySelector('.index-container');
            const number = Number(block.getAttribute('data-number'));
            
            // if(number <= searchValue){
                await highlightBlockAndIndex(block, indexContainer);
                
                if(number === searchValue){
                    resolve(index);
                    return;
                }

                continue;
            // }

            break;
        }

        reject('NOT_FOUND');
    })

    return linearSearchPromise
}