// Set step to 0 if language is changed (i.e. restart).


// Global variables
const setArrayData = [5, -1, 8, 3, 7, 0, 4];

const explainAlgo = document.getElementById('explainAlgo');
const addValues = document.getElementById('addValues');

const inserDirBtn = document.getElementById('insDir');

const mainArea = document.getElementById('mainArea');

const algoItems = document.querySelectorAll('.submenu p');

const langTabs = document.getElementById('langTabs');
const langButtons = document.querySelectorAll('.langBtn');
const pascalBtn = document.getElementById('pascalBtn');
const pythonBtn = document.getElementById('pythonBtn');
const cBtn = document.getElementById('cBtn');

const insDirContent = document.getElementById('insDirContent');
const codeContentInsDir = document.getElementById('codeContentInsDir');

const initialArrayData = document.getElementById('initialArrayData');
const operationsArrayData = document.getElementById('opArrayData');
const finalArrayData = document.getElementById('finalArrayData');


// Adding values functionality
addValues.addEventListener('click', () => {
    alert("Funcionalidad no implementada aún.");
});

// Insertion sort main area
inserDirBtn.addEventListener('click', () => {
    algoItems.forEach(item => item.classList.remove('active'));
    document.getElementById('insDirExplainedContent').classList.add('hidden');
    inserDirBtn.classList.add('active');

    explainAlgo.classList.remove('hidden');
    addValues.classList.remove('hidden');

    langTabs.classList.remove('hidden');
    pascalBtn.classList.add('active-btn');

    insDirContent.classList.remove('hidden');

    if (pascalBtn.classList.contains('active-btn')) {
        codeContentInsDir.innerHTML = `
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

        currLine = document.getElementById('line1');
        currLine.classList.add('highlight');
    }

    initialArrayData.innerText = printArray(setArrayData);
    operationsArrayData.innerText = printArray(setArrayData);
    finalArrayData.innerText = "\u200B";

    document.getElementById("bottomBar").classList.remove("hidden");
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressPercent').innerText = '0%';
});

// Explain algorithm functionality (checks what algorithm is active)
explainAlgo.addEventListener('click', () => {
    let opt = -1;
    if (inserDirBtn.classList.contains('active')) {
        opt = 0;
        insDirContent.classList.add('hidden');
        langTabs.classList.add('hidden');
        document.getElementById('insDirExplainedContent').classList.remove('hidden'); 
    };

});

// Language buttons functionality
pascalBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    pascalBtn.classList.add('active-btn');

    codeContentInsDir.innerHTML = `
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

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
});

pythonBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    pythonBtn.classList.add('active-btn');

    codeContentInsDir.innerHTML = `<pre><code id="codeContentInsDir" class="code-block justify-content-center">
<span id="line1">for i in range(1, ULTIMO + 1):</span>
<span id="line2">    aux = v[i]</span>
<span id="line3">    j = i - 1</span>
<span id="line4">    while j >= 0 and v[j] > aux:</span>
<span id="line5">        v[j + 1] = v[j]</span>
<span id="line6">        j -= 1</span>
<span id="line7">    v[j + 1] = aux</span>
    </code></pre>`;

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
});

cBtn.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active-btn'));
    cBtn.classList.add('active-btn');

    codeContentInsDir.innerHTML = `
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

    currLine = document.getElementById('line1');
    currLine.classList.add('highlight');
});

//
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
