// Global variables
let opt = -1; // To know which algorithm is active

const setArrayData = [5, -1, 8, 3, 7, 0, 4];
let steps = [];
let currStep = 0;
let lineIdx = null;

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
const nextBtn = document.getElementById('nextBtn');

const backBtn = document.getElementById('backBtn');

// Adding values functionality
addValues.addEventListener('click', () => {
    alert("Funcionalidad no implementada aún.");
});

// Show main content
function showContent(index) {        
    clearMainArea();

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
    document.getElementById("stepCounter").innerText = `Paso 0/${steps.length}`;
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

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

pythonBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    pythonBtn.classList.add('active-btn');

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

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

cBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    cBtn.classList.add('active-btn');

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
        
    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
    lineIdx = 1
});

// Step navigation functionality
nextBtn.addEventListener('click', () => {
    if (currStep >= steps.length - 1) {
        finalArrayData.innerText = printArray(steps[steps.length - 1].arrState);
    }
    document.getElementById("iValueText").textContent = steps[currStep].iVal !== null ? steps[currStep].iVal : "\u200B";
    document.getElementById("jValueText").textContent = steps[currStep].jVal !== null ? steps[currStep].jVal : "\u200B";
    document.getElementById("auxValueText").textContent = steps[currStep].auxVal !== null ? steps[currStep].auxVal : "\u200B";    document.getElementById(`line${lineIdx}`).classList.remove('highlight');
    
    document.getElementById(`line${steps[currStep].line}`).classList.add('highlight');
    lineIdx = steps[currStep].line;

    document.getElementById('progressFill').style.width = `${((currStep + 1) / steps.length) * 100}%`;
    document.getElementById('progressPercent').innerText = `${Math.round(((currStep + 1) / steps.length) * 100)}%`;
    document.getElementById("stepCounter").innerText = `Paso ${currStep + 1}/${steps.length}`;

    operationsArrayData.innerHTML = printArray(steps[currStep].arrState, steps[currStep].iPos, steps[currStep].jPos);

    currStep++;
});

// Function to print array as string with " | " separator and color highlighting.
function printArray(array, highlightIndex = -1, highlightJIndex = -1) {
    let res = "";
    for (let i = 0; i < array.length; i++) {
        if (i === highlightIndex) {
            res += `<span style="color: #1E4D2A; font-weight: bold;">${array[i]}</span>`;
        } else if (i === highlightJIndex) {
            res += `<span style="color: #221E4D; font-weight: bold;">${array[i]}</span>`;
        } else {
            res += array[i];
        }

        if (i !== array.length - 1) {
            res += " | ";
        }
    }
    return res;
}

// Resets main area contents
function clearMainArea() {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    langTabs.classList.add('hidden');
    content.classList.add('hidden');

    if (explanation.classList.contains('hidden') === false) {
        explanationBlock.innerHTML = "";
    }

    explanation.classList.add('hidden');
}
