// Change so only one i is saved on Step class

class Step {
    constructor(number, iVal, jVal, auxVal, line, arrState) {
        this.number = number;
        this.iVal = iVal;
        this.jVal = jVal;
        this.auxVal = auxVal;
        this.line = line;
        this.arrState = arrState;
    }
}

function insertionSort(v) {
    const steps = [];

    const LAST = v.length - 1;

    steps.push(new Step(0, null, null, null, 1, [...v]));

    for (let i = 1; i <= LAST; i++) {
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, steps[steps.length - 1].auxVal, 1, [...v]));
        const aux = v[i];
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, aux, 2, [...v]));
        let j = i - 1;
        steps.push(new Step(steps.length, i, j, aux, 3, [...v]));

        while (j >= 0 && v[j] > aux) {
            steps.push(new Step(steps.length, i, j, aux, 4, [...v]));
            v[j + 1] = v[j];
            steps.push(new Step(steps.length, i, j, aux, 5, [...v]));
            j--;
            steps.push(new Step(steps.length, i, j, aux, 6, [...v]));
        }

        v[j + 1] = aux;
        steps.push(new Step(steps.length, i, j, aux, 7, [...v]));
    }

    return steps;
}


function bubbleSort(v) {
    const LAST = v.length;
    steps = [];

    steps.push(new Step(0, null, null, null, 1, [...v]));
    
    for (let i = 0; i <= LAST - 1; i++) {
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, steps[steps.length - 1].auxVal, 1, [...v]));
        for (let j = 0; j <= LAST - 1 - i; j++) {
            steps.push(new Step(steps.length, i, j, steps[steps.length - 1].auxVal, 2, [...v]));
            if (v[j] > v[j + 1]) {
                steps.push(new Step(steps.length, i, j, steps[steps.length - 1].auxVal, 3, [...v]));
                let aux = v[j];
                steps.push(new Step(steps.length, i, j, aux, 4, [...v]));
                v[j] = v[j + 1];
                steps.push(new Step(steps.length, i, j, aux, 5, [...v]));
                v[j + 1] = aux;
                steps.push(new Step(steps.length, i, j, aux, 6, [...v]));
            }
        }
    }

    return steps;
}


function selectionSort(v) {
    const FIRST = 0;
    const LAST = v.length - 1;
    const steps = [];

    steps.push(new Step(0, null, null, null, 1, [...v]));

    for (let i = FIRST; i <= LAST - 1; i++) {
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, steps[steps.length - 1].auxVal, 1, [...v]));
        let minVal = v[i];
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, minVal, 2, [...v]));
        let minPos = i;
        steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, minVal, 3, [...v]));

        for (let j = i + 1; j <= LAST; j++) {
            steps.push(new Step(steps.length, i, j, minVal, 4, [...v]));
            steps.push(new Step(steps.length, i, j, minVal, 5, [...v]));
            if (v[j] < minVal) {
                minVal = v[j];
                steps.push(new Step(steps.length, i, j, minVal, 6, [...v]));
                minPos = j;
                steps.push(new Step(steps.length, i, j, minVal, 7, [...v]));
            }
        }

        if (minPos !== i) {
            steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, minVal, 8, [...v]));
            v[minPos] = v[i];
            steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, minVal, 9, [...v]));
            v[i] = minVal;
            steps.push(new Step(steps.length, i, steps[steps.length - 1].jVal, minVal, 10, [...v]));
        }
    }

    return steps;
}
