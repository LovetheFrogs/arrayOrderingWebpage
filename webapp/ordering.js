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

