const explainAlgo = document.getElementById('explainAlgo');
const addValues = document.getElementById('addValues');

const inserDirBtn = document.getElementById('insDir');

const mainArea = document.getElementById('mainArea');

const algoItems = document.querySelectorAll('.submenu p');

const langTabs = document.getElementById('langTabs');
const pascalBtn = document.getElementById('pascalBtn');
const pythonBtn = document.getElementById('pythonBtn');
const cBtn = document.getElementById('cBtn');

const insDirContent = document.getElementById('insDirContent');
const codeContentInsDir = document.getElementById('codeContentInsDir');

inserDirBtn.addEventListener('click', () => {
    algoItems.forEach(item => item.classList.remove('active'));
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



    
});