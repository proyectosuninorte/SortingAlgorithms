const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const parseArrayInput = (inputStr) => {
    const tokens = inputStr.trim().split(/\s+/);
    const array = tokens.map(elem => parseFloat(elem));
    if (array.length !== tokens.length || array.some(elem => isNaN(elem))) {
        return null;
    }
    return array;
};

const insertArrayToHtml = (array) => {
    const html = '<div class="array-element">' + 
        array.join('</div><div class="array-element">') + 
        '</div>';
    document.getElementById('array').innerHTML = html;
};

const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
};

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
};

const partition = async (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        insertArrayToHtml(array);
        highlightElements(j, high, 'compared');
        setStatus('comparing');
        await sleep(1000);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            insertArrayToHtml(array);
            highlightElements(i, j, 'swapped');
            setStatus('swapping');
            await sleep(1000);
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    insertArrayToHtml(array);
    highlightElements(i + 1, high, 'swapped');
    setStatus('swapping');
    await sleep(1000);

    return i + 1;
};

const quickSort = async (array, low, high) => {
    if (low < high) {
        const partitionIndex = await partition(array, low, high);

        await quickSort(array, low, partitionIndex - 1);
        await quickSort(array, partitionIndex + 1, high);
    }
};

const initiateQuickSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';

    const n = array.length;
    await quickSort(array, 0, n - 1);

    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = 'Sorted Using QuickSort';
};

document.getElementById('submit-array').addEventListener('click', initiateQuickSort);
