// Global variables
let opt = -1; // To know which algorithm is active

const setArrayData = [5, -1, 8, 3, 7, 0, 4];
let steps = [];
let currStep = 0;
let lineIdx = null;
let isPlaying = false;
let playInterval = null;

const playSVG = "M8 4 L8 28 C8 28 8.5 28.5 9 28.5 L25 16 C25 16 25 15.5 25 15 L9 3.5 C8.5 4 8 4 8 4 Z";
const pauseSVG = "M8 4 H14 C14.828 4 15.5 4.672 15.5 5.5 V26.5 C15.5 27.328 14.828 28 14 28 H8 C7.172 28 6.5 27.328 6.5 26.5 V5.5 C6.5 4.672 7.172 4 8 4 Z M18 4 H24 C24.828 4 25.5 4.672 25.5 5.5 V26.5 C25.5 27.328 24.828 28 24 28 H18 C17.172 28 16.5 27.328 16.5 26.5 V5.5 C16.5 4.672 17.172 4 18 4 Z";

// DOM elements
const explainAlgo = document.getElementById('explainAlgo');
const addValues = document.getElementById('addValues');

const inserDirBtn = document.getElementById('insDir');
const intrDirBtn = document.getElementById('intDir');
const selDirBtn = document.getElementById('selDir');
const mainArea = document.getElementById('mainArea');

const algoItems = document.querySelectorAll('.submenu p');

const langTabs = document.getElementById('langTabs');
const langButtons = document.querySelectorAll('.langBtn');
const pascalBtn = document.getElementById('pascalBtn');
const pythonBtn = document.getElementById('pythonBtn');
const cBtn = document.getElementById('cBtn');

const content = document.getElementById('content');
const code = document.getElementById('codeContainer');
const explanation = document.getElementById('explanation');
const explanationBlock = document.getElementById('explanationBlock');

const initialArrayData = document.getElementById('initialArrayData');
const operationsArrayData = document.getElementById('opArrayData');
const finalArrayData = document.getElementById('finalArrayData');

const prevBtn = document.getElementById('prevBtn');
const playBtn = document.getElementById('playBtn');
const playerShape = document.getElementById('playerShape');
const nextBtn = document.getElementById('nextBtn');

const backBtn = document.getElementById('backBtn');

const addValuesModal = document.getElementById('addValuesModal');
const arrayInput = document.getElementById('arrayInput');
const previewArray = document.getElementById('previewArray');
const inputError = document.getElementById('inputError');
const confirmValuesBtn = document.getElementById('confirmValuesBtn');
const cancelValuesBtn = document.getElementById('cancelValuesBtn');

// Add values button
addValues.addEventListener('click', () => {
    arrayInput.value = setArrayData.join(', ');
    updatePreview();
    addValuesModal.classList.remove('hidden');
    arrayInput.focus();
});

// Cancel button
cancelValuesBtn.addEventListener('click', () => {
    addValuesModal.classList.add('hidden');
    clearError();
});

// Close prompt when clicking outside
addValuesModal.addEventListener('click', (e) => {
    if (e.target === addValuesModal) {
        addValuesModal.classList.add('hidden');
        clearError();
    }
});

// Update preview as user types
arrayInput.addEventListener('input', updatePreview);

// Confirm button
confirmValuesBtn.addEventListener('click', () => {
    const newArray = validateAndParseArray(arrayInput.value);
    
    if (newArray) {
        setArrayData.splice(0, setArrayData.length, ...newArray);
        addValuesModal.classList.add('hidden');
        clearError();
        
        if (opt !== -1) {
            showContent(opt);
        }
    }
});

// Validate values format
function validateAndParseArray(input) {
    clearError();
    
    const values = input.trim().split(',').map(v => v.trim()).filter(v => v !== '');
    
    if (values.length === 0) {
        showError('Por favor, ingresa al menos un valor.');
        return null;
    }
    
    if (values.length < 3) {
        showError('El array debe tener al menos 3 elementos.');
        return null;
    }
    
    if (values.length > 10) {
        showError('El array no puede tener más de 1 elementos.');
        return null;
    }
    
    const parsedArray = [];
    for (let i = 0; i < values.length; i++) {
        const num = Number(values[i]);
        
        if (isNaN(num)) {
            showError(`"${values[i]}" no es un número válido.`);
            return null;
        }
        
        if (!Number.isInteger(num)) {
            showError('Solo se permiten números enteros.');
            return null;
        }
        
        parsedArray.push(num);
    }
    
    return parsedArray;
}

// Update preview function
function updatePreview() {
    const input = arrayInput.value.trim();
    
    if (input === '') {
        previewArray.innerHTML = '<span class="preview-placeholder">Los valores aparecerán aquí</span>';
        return;
    }
    
    const testArray = validateAndParseArray(input);
    
    if (testArray) {
        previewArray.innerHTML = testArray.join(' | ');
        previewArray.style.color = '#f2f1ef';
    } else {
        previewArray.innerHTML = '<span style="color: #ff6b6b;">Entrada inválida</span>';
    }
}

// Show error message
function showError(message) {
    inputError.textContent = message;
    inputError.classList.remove('hidden');
    arrayInput.style.borderColor = '#ff6b6b';
}

// Clear error message
function clearError() {
    inputError.classList.add('hidden');
    inputError.textContent = '';
    arrayInput.style.borderColor = '#363636';
}

// Show main content
function showContent(index) {        
    clearMainArea();

    steps = [];
    currStep = 0
    algoItems.forEach(item => item.classList.remove('active'));
    explainAlgo.classList.remove('hidden');
    addValues.classList.remove('hidden');

    langTabs.classList.remove('hidden');
    pascalBtn.classList.add('active-btn');

    content.classList.remove('hidden');

    opt = index;
    if (opt === 0) {
        steps = insertionSort([...setArrayData]);
        inserDirBtn.classList.add('active');
        code.innerHTML = `
            <pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 1 TO ULTIMO DO </span>
<span id="line0"> BEGIN </span>
<span id="line2">     aux := v[i]; </span>
<span id="line3">     j := pred(i); </span>
<span id="line4">     WHILE (j >= 0) AND (v[j] > aux) DO </span>
<span id="line0">     BEGIN </span>
<span id="line5">         v[j+1] := v[j]; </span>
<span id="line6">         j := pred(j); </span>
<span id="line0">     END; {WHILE} </span>
<span id="line7">     v[j+1] := aux; </span>
<span id="line0"> END // FOR </span>
        </code></pre>`;
    } else if (opt === 1) {
        steps = bubbleSort([...setArrayData]);
        intrDirBtn.classList.add('active');
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 0 TO pred(ULTIMO) DO </span>
<span id="line2">     FOR j := 0 TO ULTIMO - 1 - i DO </span>
<span id="line3">         IF v[j] > v[j+1] THEN </span>
<span id="line0">         BEGIN </span>
<span id="line4">           aux := v[j]; </span>
<span id="line5">           v[j] := v[j+1]; </span>
<span id="line6">           v[j+1] := aux; </span>
<span id="line0">        END; {IF} </span>
<span id="line0">    END; {FOR} </span>
<span id="line0"> END // FOR </span>
        </code></pre>`;
    } else if (opt === 2) {
        steps = selectionSort([...setArrayData]);
        selDirBtn.classList.add('active');
        code.innerHTML = `
        <pre><code id="codeContentSelDir" class="code-block justify-content-center">
<span id="line1"> FOR i := PRIMERO TO pred(ULTIMO) DO </span>
<span id="line0"> BEGIN </span>
<span id="line2">     valMenor := v[i]; </span>
<span id="line3">     posMenor := i; </span>
<span id="line4">     FOR j := succ(i) TO ULTIMO DO </span>
<span id="line5">         IF v[j] < valMenor THEN </span>
<span id="line0">         BEGIN </span>
<span id="line6">             valMenor := v[j]; </span>
<span id="line7">             posMenor := j; </span>
<span id="line0">         END; {IF} </span>
<span id="line8">     IF posMenor <> i THEN </span>
<span id="line0">     BEGIN </span>
<span id="line9">         v[posMenor] := v[i]; </span>
<span id="line10">         v[i] := valMenor; </span>
<span id="line0">     END; {IF} </span>
<span id="line0"> END; {FOR i} </span>
        </code></pre>`;

        document.getElementById("auxLabel").textContent = "valMenor";
        document.getElementById("auxLabel").setAttribute("font-size", "24");
    }

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1

    initialArrayData.innerHTML = printArray(setArrayData);
    operationsArrayData.innerHTML = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    document.getElementById("bottomBar").classList.remove("hidden");
    document.getElementById("stepCounter").innerText = `Paso 0/${steps.length - 1}`;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').innerText = '0%';
}

// Algorithm selection functionality
inserDirBtn.addEventListener('click', showContent.bind(null, 0));
intrDirBtn.addEventListener('click', showContent.bind(null, 1));
selDirBtn.addEventListener('click', showContent.bind(null, 2));

// Show explanation content
function showExplanation() {
    clearMainArea();
    explanation.classList.remove('hidden');
    explanation.classList.add('positioning');
    document.getElementById("bottomBar").classList.add("hidden");

    if (opt === 0)  { // Insertion sort
        explanationBlock.innerHTML = `
            <h2 class="algorithmTitle">Algoritmo: Inserción Directa</h2>
            <p class="algorithmDescription">
            El <strong>algoritmo de Inserción Directa</strong> (o <em>Insertion Sort</em>) ordena una lista
            construyendo una sublista ordenada elemento a elemento. En cada iteración, el algoritmo toma un elemento
            del arreglo desordenado y lo inserta en la posición correcta dentro de la parte ya ordenada.
            </p>
            <ol class="algorithmSteps">
            <li>Comienza desde el segundo elemento del arreglo.</li>
            <li>Toma el valor actual como <strong>aux</strong>.</li>
            <li>Desplaza los elementos mayores que <strong>aux</strong> una posición a la derecha.</li>
            <li>Inserta <strong>aux</strong> en su posición correcta.</li>
            <li>Repite el proceso hasta ordenar toda la lista.</li>
            </ol>
            <p class="algorithmExtra">
            <strong>Ventajas:</strong> sencillo, eficaz en listas pequeñas.<br>
            <strong>Desventajas:</strong> complejidad temporal O(n²) en el peor caso.
            </p>
        `;
    } else if (opt === 1) { // Bubble sort
        explanationBlock.innerHTML = `
            <h2 class="algorithmTitle">Algoritmo: Intercambio Directo</h2>
            <p class="algorithmDescription">
            El <strong>algoritmo de Intercambio Directo</strong> (o <em>Bubble Sort</em>) ordena una lista comparando elementos adyacentes
            y permutándolos si están en el orden incorrecto. Este proceso se repite hasta que toda la lista queda ordenada.
            </p>
            <ol class="algorithmSteps">
                <li>Comienza desde el primer elemento del arreglo.</li>
                <li>Compara cada par de elementos adyacentes.</li>
                <li>Si el elemento de la izquierda es mayor que el de la derecha, intercámbialos.</li>
                <li>Continúa comparando y moviendo los elementos hasta llegar al final del arreglo.</li>
                <li>Repite todo el proceso tantas veces como sea necesario hasta que no se realicen más intercambios.</li>
            </ol>
            <p class="algorithmExtra">
            <strong>Ventajas:</strong> sencillo, fácil de implementar, útil para listas pequeñas o casi ordenadas.<br>
            <strong>Desventajas:</strong> ineficiente para listas grandes, complejidad temporal O(n²) en el peor caso.
            </p>
        `;
    } else if (opt === 2) { // Selection sort
        explanationBlock.innerHTML = `
            <h2 class="algorithmTitle">Algoritmo: Selección Directa</h2>
            <p class="algorithmDescription">
            El <strong>algoritmo de Selección Directa</strong> (o <em>Selection Sort</em>) ordena una lista encontrando
            el elemento mínimo en la parte no ordenada del arreglo y colocándolo en la posición correcta. Este proceso
            se repite hasta que toda la lista queda ordenada.
            </p>
            <ol class="algorithmSteps">
                <li>Comienza desde el primer elemento del arreglo.</li>
                <li>Busca el elemento más pequeño en la porción restante del arreglo.</li>
                <li>Intercambia el elemento mínimo encontrado con el primer elemento de la porción no ordenada.</li>
                <li>Avanza un índice y repite el proceso hasta recorrer todo el arreglo.</li>
            </ol>
            <p class="algorithmExtra">
            <strong>Ventajas:</strong> sencillo y fácil de implementar; realiza a lo sumo n-1 intercambios.<br>
            <strong>Desventajas:</strong> ineficiente para listas grandes, complejidad temporal O(n²) en el peor caso.
            </p>
        `;
    }
}

// Explanation selection functionality
explainAlgo.addEventListener('click', showExplanation);

// Back button functionality
backBtn.addEventListener('click', () => {
    explanation.classList.remove('positioning');
    showContent(opt);
});

// Language buttons functionality
pascalBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    pascalBtn.classList.add('active-btn');

    currStep = 0;
    document.getElementById("stepCounter").innerText = `Paso 0/${steps.length - 1}`;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').innerText = '0%';

    document.getElementById("iValueText").textContent = steps[currStep].iVal !== null ? steps[currStep].iVal : "\u200B";
    document.getElementById("jValueText").textContent = steps[currStep].jVal !== null ? steps[currStep].jVal : "\u200B";
    document.getElementById("auxValueText").textContent = steps[currStep].auxVal !== null ? steps[currStep].auxVal : "\u200B";

    if (opt === 0) {
        code.innerHTML = `
            <pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 1 TO ULTIMO DO </span>
<span id="line0"> BEGIN </span>
<span id="line2">     aux := v[i]; </span>
<span id="line3">     j := pred(i); </span>
<span id="line4">     WHILE (j >= 0) AND (v[j] > aux) DO </span>
<span id="line0">     BEGIN </span>
<span id="line5">         v[j+1] := v[j]; </span>
<span id="line6">         j := pred(j); </span>
<span id="line0">     END; {WHILE} </span>
<span id="line7">     v[j+1] := aux; </span>
<span id="line0"> END // FOR </span>
        </code></pre>`;
    } else if (opt === 1) {
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 0 TO pred(ULTIMO) DO </span>
<span id="line2">     FOR j := 0 TO ULTIMO - 1 - i DO </span>
<span id="line3">         IF v[j] > v[j+1] THEN </span>
<span id="line0">         BEGIN </span>
<span id="line4">           aux := v[j]; </span>
<span id="line5">           v[j] := v[j+1]; </span>
<span id="line6">           v[j+1] := aux; </span>
<span id="line0">        END; {IF} </span>
<span id="line0">    END; {FOR} </span>
<span id="line0"> END // FOR </span>
        </code></pre>`;
    } else if (opt === 2) {
        code.innerHTML = `
        <pre><code id="codeContentSelDir" class="code-block justify-content-center">
<span id="line1"> FOR i := PRIMERO TO pred(ULTIMO) DO </span>
<span id="line0"> BEGIN </span>
<span id="line2">     valMenor := v[i]; </span>
<span id="line3">     posMenor := i; </span>
<span id="line4">     FOR j := succ(i) TO ULTIMO DO </span>
<span id="line5">         IF v[j] < valMenor THEN </span>
<span id="line0">         BEGIN </span>
<span id="line6">             valMenor := v[j]; </span>
<span id="line7">             posMenor := j; </span>
<span id="line0">         END; {IF} </span>
<span id="line8">     IF posMenor <> i THEN </span>
<span id="line0">     BEGIN </span>
<span id="line9">         v[posMenor] := v[i]; </span>
<span id="line10">         v[i] := valMenor; </span>
<span id="line0">     END; {IF} </span>
<span id="line0"> END; {FOR i} </span>
        </code></pre>`;
    }

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

pythonBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    pythonBtn.classList.add('active-btn');

    currStep = 0;
    document.getElementById("stepCounter").innerText = `Paso 0/${steps.length - 1}`;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').innerText = '0%';

    document.getElementById("iValueText").textContent = steps[currStep].iVal !== null ? steps[currStep].iVal : "\u200B";
    document.getElementById("jValueText").textContent = steps[currStep].jVal !== null ? steps[currStep].jVal : "\u200B";
    document.getElementById("auxValueText").textContent = steps[currStep].auxVal !== null ? steps[currStep].auxVal : "\u200B";

    if (opt === 0) {
        code.innerHTML = `<pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1">for i in range(1, ULTIMO + 1):</span>
<span id="line2">    aux = v[i]</span>
<span id="line3">    j = i - 1</span>
<span id="line4">    while j >= 0 and v[j] > aux:</span>
<span id="line5">        v[j + 1] = v[j]</span>
<span id="line6">        j -= 1</span>
<span id="line7">    v[j + 1] = aux</span>
        </code></pre>`;
    } else if (opt === 1) {
        code.innerHTML = `<pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> for i in range(0, len(v) - 1): </span>
<span id="line2">     for j in range(0, len(v) - 1 - i): </span>
<span id="line3">         if v[j] &gt; v[j + 1]: </span>
<span id="line4">             aux = v[j] </span>
<span id="line5">             v[j] = v[j + 1] </span>
<span id="line6">             v[j + 1] = aux </span>
        </code></pre>`;
    } else if (opt === 2) {
        code.innerHTML = `
        <pre><code id="codeContentSelDir" class="code-block justify-content-center">
<span id="line1">for i in range(primero, ultimo): </span>
<span id="line2">    val_menor = v[i] </span>
<span id="line3">    pos_menor = i </span>
<span id="line4">    for j in range(i+1, ultimo+1): </span>
<span id="line5">        if v[j] &lt; val_menor: </span>
<span id="line6">            val_menor = v[j] </span>
<span id="line7">            pos_menor = j </span>
<span id="line8">    if pos_menor != i: </span>
<span id="line9">        v[pos_menor] = v[i] </span>
<span id="line10">        v[i] = val_menor </span>
        </code></pre>`;
    }

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

cBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    cBtn.classList.add('active-btn');

    currStep = 0;
    document.getElementById("stepCounter").innerText = `Paso 0/${steps.length - 1}`;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').innerText = '0%';

    document.getElementById("iValueText").textContent = steps[currStep].iVal !== null ? steps[currStep].iVal : "\u200B";
    document.getElementById("jValueText").textContent = steps[currStep].jVal !== null ? steps[currStep].jVal : "\u200B";
    document.getElementById("auxValueText").textContent = steps[currStep].auxVal !== null ? steps[currStep].auxVal : "\u200B";

    if (opt === 0) {
        code.innerHTML = `
        <pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1">for (int i = 1; i <= ULTIMO; i++) {</span>
<span id="line2">    int aux = v[i];</span>
<span id="line3">    int j = i - 1;</span>
<span id="line0"></span>
<span id="line4">    while (j >= 0 && v[j] > aux) {</span>
<span id="line5">        v[j + 1] = v[j];</span>
<span id="line6">        j--;</span>
<span id="line0">    }</span>
<span id="line7">    v[j + 1] = aux;</span>
<span id="line0">}</span>
        </code></pre>`;
    } else if (opt === 1) {
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> for (int i = 0; i &lt; ULTIMO; i++) { </span>
<span id="line2">     for (int j = 0; j &lt; ULTIMO - 1 - i; j++) { </span>
<span id="line3">         if (v[j] &gt; v[j + 1]) { </span>
<span id="line4">             int aux = v[j]; </span>
<span id="line5">             v[j] = v[j + 1]; </span>
<span id="line6">             v[j + 1] = aux; </span>
<span id="line0">         } </span>
<span id="line0">     } </span>
<span id="line0"> } </span>
        </code></pre>`;
    } else if (opt === 2) {
        code.innerHTML = `
        <pre><code id="codeContentSelDir" class="code-block justify-content-center">
<span id="line1">for (int i = primero; i < ultimo; i++) { </span>
<span id="line2">    int valMenor = v[i]; </span>
<span id="line3">    int posMenor = i; </span>
<span id="line4">    for (int j = i+1; j <= ultimo; j++) { </span>
<span id="line5">        if (v[j] < valMenor) { </span>
<span id="line6">            valMenor = v[j]; </span>
<span id="line7">            posMenor = j; </span>
<span id="line0">        } </span>
<span id="line0">    } </span>
<span id="line8">    if (posMenor != i) { </span>
<span id="line9">        v[posMenor] = v[i]; </span>
<span id="line10">        v[i] = valMenor; </span>
<span id="line0">    } </span>
<span id="line0">} </span>
        </code></pre>`;
    }
        
    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

function animateStep(stepIndex) {
    const step = steps[stepIndex];

    animateValueChange("iValueText", step.iVal);
    animateValueChange("jValueText", step.jVal);
    animateValueChange("auxValueText", step.auxVal);

    document.getElementById(`line${lineIdx}`).classList.remove('highlight');
    document.getElementById(`line${step.line}`).classList.add('highlight');
    lineIdx = step.line;

    const progress = (stepIndex / (steps.length - 1)) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressPercent').innerText = `${Math.round(progress)}%`;
    document.getElementById("stepCounter").innerText = `Paso ${stepIndex}/${steps.length - 1}`;

    operationsArrayData.innerHTML = printArray(step.arrState, step.iVal, step.jVal);
    updateArrayDisplay(step.arrState, step.iVal, step.jVal);

    if (stepIndex === steps.length - 1) {
        finalArrayData.innerHTML = printArray(steps[steps.length - 1].arrState);

        finalArrayData.classList.remove("smallZoomAnim");
        void finalArrayData.offsetWidth;
        finalArrayData.classList.add("smallZoomAnim");
    } else {
        finalArrayData.textContent = "\u200B";
    }
}

// "Enable" or "disable" SVG buttons
function setSVGButtonsEnabled(enabled) {
  const value = enabled ? 'auto' : 'none';
  prevBtn.style.pointerEvents = value;
  nextBtn.style.pointerEvents = value;

  prevBtn.style.opacity = enabled ? '1' : '0.5';
  nextBtn.style.opacity = enabled ? '1' : '0.5';
}

// Next button
nextBtn.addEventListener('click', () => {
    if (currStep >= steps.length - 1) return;
    currStep++;
    animateStep(currStep);
});

// Previous button
prevBtn.addEventListener('click', () => {
    if (currStep === 0) return;
    currStep--;
    animateStep(currStep);
});

// Play/Pause button
function togglePlay() {
    if (!isPlaying) {
        currStep = 0;
        animateStep(currStep);
        isPlaying = true;
        setSVGButtonsEnabled(false);
        playerShape.setAttribute("d", pauseSVG);
        playInterval = setInterval(() => {
        if (currStep < steps.length - 1) {
            currStep++;
            animateStep(currStep);
        } else {
            stopPlayback();
        }
        }, 1500);
    } else {
        stopPlayback();
    }
}

function stopPlayback() {
    clearInterval(playInterval);
    playInterval = null;
    isPlaying = false;
    playerShape.setAttribute("d", playSVG);
    setSVGButtonsEnabled(true);
}

playBtn.addEventListener('click', togglePlay);

// Function to animate value changes
function animateValueChange(elementId, newValue) {
    const el = document.getElementById(elementId);

    el.textContent = newValue !== null ? newValue : "\u200B";

    const newEl = el.cloneNode(true);
    el.parentNode.replaceChild(newEl, el);
    newEl.classList.add('valuePulse');
}

// Function to print array as string with " | " separator and color highlighting.
function printArray(array, highlightIndex = -1, highlightJIndex = -1) {
    let res = "";
    let indicesRes = "";
    
    for (let i = 0; i < array.length; i++) {
        if (i === highlightIndex) {
            res += `<span class="highlightArray" style="color: #98fb98; font-weight: bold;">${array[i]}</span>`;
        } else if (i === highlightJIndex) {
            res += `<span class="highlightArray" style="color: #00ced1; font-weight: bold;">${array[i]}</span>`;
        } else {
            res += array[i];
        }

        if (i === highlightIndex) {
            indicesRes += `<span class="highlightIndex i-index">${i}</span>`;
        } else if (i === highlightJIndex) {
            indicesRes += `<span class="highlightIndex j-index">${i}</span>`;
        } else {
            indicesRes += `<span>${i}</span>`;
        }

        if (i !== array.length - 1) {
            res += " | ";
            indicesRes += " | ";
        }
    }
    
    const indicesElement = document.getElementById("opArrayIndices");
    if (indicesElement) {
        indicesElement.innerHTML = indicesRes;
    }
    
    return res;
}

// Function to update array display with animation reset
function updateArrayDisplay(array, highlightIndex, highlightJIndex) {
    const operationsArrayData = document.getElementById("opArrayData");
    const operationsArrayIndices = document.getElementById("opArrayIndices");
    
    operationsArrayData.innerHTML = printArray(array, highlightIndex, highlightJIndex);

    requestAnimationFrame(() => {
        const highlights = operationsArrayData.querySelectorAll(".highlightArray");
        const indexHighlights = operationsArrayIndices.querySelectorAll(".highlightIndex");
        
        highlights.forEach(el => {
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = null;
        });
        
        indexHighlights.forEach(el => {
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = null;
        });
    });
}

// Resets main area contents
function clearMainArea() {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    langTabs.classList.add('hidden');
    content.classList.add('hidden');

    if (explanation.classList.contains('hidden') === false) {
        explanationBlock.innerHTML = "";
    }

    if (opt === 2) {
        document.getElementById("auxLabel").textContent = "aux";
        document.getElementById("auxLabel").setAttribute("font-size", "30");
    }

    if (isPlaying) {
        stopPlayback();
    }

    explanation.classList.add('hidden');
}
