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

// const highlightElements = (i, j, additionalClass) => {
//     const array = document.getElementById('array').children;
//     array[i].classList.add(additionalClass);
//     array[j].classList.add(additionalClass);
// };

const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    if (i >= 0 && i < array.length && j >= 0 && j < array.length) {
        array[i].classList.add(additionalClass);
        array[j].classList.add(additionalClass);
    } else {
        console.error('Índice fuera de rango');
    }
};

const removeHighlight = () => {
    const arrayElements = document.querySelectorAll('.array-element');
    arrayElements.forEach(elem => elem.classList.remove('compared', 'swapped'));
};

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status;
};

const insertionSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            insertArrayToHtml(array);
            highlightElements(j + 1, j, 'compared');
            setStatus('Comparing...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            j--;
        }

        array[j + 1] = current;

        insertArrayToHtml(array);
        // highlightElements(i, j, 'compared');
        // setStatus('Sorting...');
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // removeHighlight();
        removeHighlight();
        setStatus('Swapping...');
        await new Promise(resolve => setTimeout(resolve, 1000));
  
    }

    insertArrayToHtml(array);
    removeHighlight();
    setStatus('Sorted Using InsertionSort');
};

document.getElementById('submit-array').addEventListener('click', insertionSort);

