function swap(el1, el2) {
    return new Promise(resolve => {
      const container = document.getElementById('sortVisualizerContainer');
      const transform1 = el1.style.transform;
      const transform2 = el2.style.transform;
  
      el1.style.transform = transform2;
      el2.style.transform = transform1;
  
      // Wait for the transition to end!
      window.requestAnimationFrame(function() {
        setTimeout(() => {
          container.insertBefore(el2, el1);
          resolve();
        }, 500);
      });
    });
}

function bubbleSort(){
    const promise = new Promise(async (resolve, reject) => {
        let blockElements = document.getElementsByClassName('block-element-container');
      
        if(!blockElements || !blockElements.length){
          reject('NOT_ENOUGH_ELEMENT');
          return;
        }

        const noOfBlocks =  blockElements.length;

        for (let i = 0; i < noOfBlocks; i++) {
            for (let j = 0; j < (noOfBlocks - i - 1); j++) {
              const currentBlockContainer = blockElements[j];
              const nextBlockContainer = blockElements[j + 1];
              
              currentBlockContainer.classList.add('highlight');
              nextBlockContainer.classList.add('highlight');

              await new Promise(resolve =>
                  setTimeout(() => {
                  resolve();
                  }, 400)
              );

              const value1 = Number(currentBlockContainer.getAttribute('data-number'));
              const value2 = Number(nextBlockContainer.getAttribute('data-number'));

              if (value1 > value2) {
                  await swap(currentBlockContainer, nextBlockContainer);
                  blockElements = document.getElementsByClassName('block-element-container');
              }

              currentBlockContainer.classList.remove('highlight');
              nextBlockContainer.classList.remove('highlight');
            }
        }

        resolve()
    });

    return promise;
}