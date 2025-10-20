class Step {
    constructor(number, iVal, jVal, auxVal, iPos, jPos, line, arrState) {
        this.number = number;
        this.iVal = iVal;
        this.jVal = jVal;
        this.auxVal = auxVal;
        this.iPos = iPos;
        this.jPos = jPos;
        this.line = line;
        this.arrState = arrState;
    }
}

function insertionSort(v) {
    const steps = [];

    const LAST = v.length - 1;

    steps.push(new Step(0, null, null, null, null, null, 1, [...v]));

    for (let i = 1; i <= LAST; i++) {
        steps.push(new Step(steps.length, v[i], steps[steps.length - 1].jVal, steps[steps.length - 1].auxVal, i, steps[steps.length - 1].jPos, 1, [...v]));
        const aux = v[i];
        steps.push(new Step(steps.length, v[i], steps[steps.length - 1].jVal, aux, i, steps[steps.length - 1].jPos, 2, [...v]));
        let j = i - 1;
        steps.push(new Step(steps.length, v[i], v[j], aux, i, j, 3, [...v]));

        while (j >= 0 && v[j] > aux) {
            steps.push(new Step(steps.length, v[i], v[j], aux, i, j, 4, [...v]));
            v[j + 1] = v[j];
            steps.push(new Step(steps.length, v[i], v[j], aux, i, j, 5, [...v]));
            j--;
            steps.push(new Step(steps.length, v[i], v[j], aux, i, j, 6, [...v]));
        }

        v[j + 1] = aux;
        steps.push(new Step(steps.length, v[i], v[j], aux, i, j, 7, [...v]));
    }

    return steps;
}
