// Set step to 0 if language is changed (i.e. restart).

// Global variables
let opt = -1; // To know which algorithm is active

const setArrayData = [5, -1, 8, 3, 7, 0, 4];

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

const backBtn = document.getElementById('backBtn');

// Adding values functionality
addValues.addEventListener('click', () => {
    alert("Funcionalidad no implementada aún.");
});

// Show main content
function showContent(index) {
    clearMainArea();

    algoItems.forEach(item => item.classList.remove('active'));
    explainAlgo.classList.remove('hidden');
    addValues.classList.remove('hidden');

    langTabs.classList.remove('hidden');
    pascalBtn.classList.add('active-btn');

    content.classList.remove('hidden');

    opt = index;
    if (opt === 0) {
        inserDirBtn.classList.add('active');
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 0 TO pred(ULTIMO) DO </span>
<span id="line2">     FOR j := 0 TO ULTIMO - 1 - i DO </span>
<span id="line3">         IF v[j] > v[j+1] THEN </span>
<span id="line4">         BEGIN </span>
<span id="line5">           aux := v[j]; </span>
<span id="line6">           v[j] := v[j+1]; </span>
<span id="line7">           v[j+1] := aux; </span>
<span id="line8">        END; {IF} </span>
<span id="line9">    END; {FOR} </span>
<span id="line10"> END // FOR </span>
        </code></pre>`;
    }
    else if (opt === 1) {
        intrDirBtn.classList.add('active');
        code.innerHTML = `
            <pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 1 TO ULTIMO DO </span>
<span id="line2"> BEGIN </span>
<span id="line3">     aux := v[i]; </span>
<span id="line4">     j := pred(i); </span>
<span id="line5">     WHILE (j >= 0) AND (v[j] > aux) DO </span>
<span id="line6">     BEGIN </span>
<span id="line7">         v[j+1] := v[j]; </span>
<span id="line8">         j := pred(j); </span>
<span id="line9">     END; {WHILE} </span>
<span id="line10">     v[j+1] := aux; </span>
<span id="line11"> END // FOR </span>
        </code></pre>`;
    }
    else if (opt === 2) {
        selDirBtn.classList.add('active');
        alert("Funcionalidad no implementada aún.");
    }

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    document.getElementById("bottomBar").classList.remove("hidden");
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
    };
}

// Explanation selection functionality
explainAlgo.addEventListener('click', showExplanation);

// Back button functionality
backBtn.addEventListener('click', () => {
    explanation.classList.add('hidden');
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
<span id="line2"> BEGIN </span>
<span id="line3">     aux := v[i]; </span>
<span id="line4">     j := pred(i); </span>
<span id="line5">     WHILE (j >= 0) AND (v[j] > aux) DO </span>
<span id="line6">     BEGIN </span>
<span id="line7">         v[j+1] := v[j]; </span>
<span id="line8">         j := pred(j); </span>
<span id="line9">     END; {WHILE} </span>
<span id="line10">     v[j+1] := aux; </span>
<span id="line11"> END // FOR </span>
        </code></pre>`;
    }

    else if (opt === 1) {
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> FOR i := 0 TO pred(ULTIMO) DO </span>
<span id="line2">     FOR j := 0 TO ULTIMO - 1 - i DO </span>
<span id="line3">         IF v[j] > v[j+1] THEN </span>
<span id="line4">         BEGIN </span>
<span id="line5">           aux := v[j]; </span>
<span id="line6">           v[j] := v[j+1]; </span>
<span id="line7">           v[j+1] := aux; </span>
<span id="line8">        END; {IF} </span>
<span id="line9">    END; {FOR} </span>
<span id="line10"> END // FOR </span>
        </code></pre>`;
    }

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
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
    }

    else if (opt === 1) {
        code.innerHTML = `<pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> for i in range(0, len(v) - 1): </span>
<span id="line2">     for j in range(0, len(v) - 1 - i): </span>
<span id="line3">         if v[j] &gt; v[j + 1]: </span>
<span id="line4">             aux = v[j] </span>
<span id="line5">             v[j] = v[j + 1] </span>
<span id="line6">             v[j + 1] = aux </span>
        </code></pre>`;
    }

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
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
<span id="line4"></span>
<span id="line5">    while (j >= 0 && v[j] > aux) {</span>
<span id="line6">        v[j + 1] = v[j];</span>
<span id="line7">        j--;</span>
<span id="line8">    }</span>
<span id="line9">    v[j + 1] = aux;</span>
<span id="line10">}</span>
        </code></pre>`;
    }

    else if (opt === 1) {
        code.innerHTML = `
        <pre><code id="codeContentIntDir" class="code-block justify-content-center">
<span id="line1"> for (int i = 0; i &lt; ULTIMO; i++) { </span>
<span id="line2">     for (int j = 0; j &lt; ULTIMO - 1 - i; j++) { </span>
<span id="line3">         if (v[j] &gt; v[j + 1]) { </span>
<span id="line4">             int aux = v[j]; </span>
<span id="line5">             v[j] = v[j + 1]; </span>
<span id="line6">             v[j + 1] = aux; </span>
<span id="line7">         } </span>
<span id="line8">     } </span>
<span id="line9"> } </span>
        </code></pre>`;
    }
        

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
});

// Function to print array as string with " | " separator
function printArray(array) {
    let res = "";
    for (let i = 0; i < array.length; i++) {
        res += String(array[i]);
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


    document.getElementById('explanation').classList.add('hidden');
}
