
function updateSearchContainer(number) {
    const searchContainer = document.getElementById('valueToSearch');

    searchContainer.textContent = number;
}

function updateResultContainer(value) {
    const resultContainer = document.getElementById('result');

    resultContainer.textContent = value;
}

function resetLowMidHighSection() {
    const low = document.getElementById('lowIndexValue');
    const mid = document.getElementById('midIndexValue');
    const high = document.getElementById('highIndexValue');

    low.textContent = ''
    mid.textContent = ''
    high.textContent = ''
}

function resetValue(showBinarySection) {
    updateSearchContainer('')
    updateResultContainer('')

    const lowMidHighSection = document.querySelector('.low-mid-high-section');

    if (showBinarySection) {
        resetLowMidHighSection();
        lowMidHighSection.classList.remove('hidden');
        return;
    }

    if (!lowMidHighSection.classList.contains('hidden')) {
        lowMidHighSection.classList.add('hidden');
    }
}
