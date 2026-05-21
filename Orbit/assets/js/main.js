const projectSettings = {
  N2: {
    name: "N2",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST"
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0"
    }
  },

  P2: {
    name: "P2",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST"
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0"
    }
  },

  F4: {
    name: "F4",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST"
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0"
    }
  }
};

const tableOptionsByType = {
  single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",

  summary_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP",

  array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST"
};

const rowTemplates = {
  important: [
    " **D/S (TOT IMPT - TOT NOT IMPT)^   CALC F3-F7,V3-V7^SX",
    " TOTAL EXTREMELY/VERY IMPORTANT^     {VAR} (1-2)^L-,SX",
    " TOTAL IMPORTANT^                    {VAR} (1-3)^L-,SX",
    "   EXTREMELY IMPORTANT^              {VAR} (1)^",
    "   VERY IMPORTANT^                   {VAR} (2)^",
    "   SOMEWHAT IMPORTANT^               {VAR} (3)^",
    " NOT REALLY IMPORTANT^               {VAR} (4)^",
    " DON'T KNOW^                         {VAR} (5)^",
    " REFUSED^                            {VAR} (6)^"
  ],

  good_bad: [
    " **D/S (TOT GOOD - TOT BAD)^   CALC F2-F3,V2-V3 ^SX",
    " TOTAL GOOD^                   {VAR} (1-2)^L-,SX",
    " TOTAL BAD^                    {VAR} (3-4)^L-,SX",
    "   VERY GOOD^                  {VAR} (1)^",
    "   SOMEWHAT GOOD^              {VAR} (2)^",
    "   SOMEWHAT BAD^               {VAR} (3)^",
    "   VERY BAD^                   {VAR} (4)^",
    " DON'T KNOW^                   {VAR} (5)^",
    " REFUSED^                      {VAR} (6)^"
  ],

  agree_disagree: [
    " **D/S (TOT AGREE - TOT DISAGREE)^  CALC F2-F3,V2-V3^SX",
    " TOTAL AGREE^                       {VAR} (1-2)  ^L-,SX",
    " TOTAL DISAGREE^                    {VAR} (3-4)  ^L-,SX",
    "   STRONGLY AGREE^                  {VAR} (1)    ^",
    "   SOMEWHAT AGREE^                  {VAR} (2)    ^",
    "   SOMEWHAT DISAGREE^               {VAR} (3)    ^",
    "   STRONGLY DISAGREE^               {VAR} (4)    ^",
    " DON'T KNOW^                        {VAR} (5)    ^",
    " REFUSED^                           {VAR} (6)    ^"
  ],

  accept_unaccept: [
    " **D/S (TOT ACPT - TOT UNACPT)^   CALC F2-F3,V2-V3^SX",
    " TOTAL ACCEPTABLE^                 {VAR} (1-2)^L-,SX",
    " TOTAL UNACCEPTABLE^               {VAR} (3-4)^L-,SX",
    "   COMPLETELY ACCEPTABLE^          {VAR} (1)^",
    "   SOMEWHAT ACCEPTABLE^            {VAR} (2)^",
    "   SOMEWHAT UNACCEPTABLE^          {VAR} (3)^",
    "   COMPLETELY UNACCEPTABLE^        {VAR} (4)^",
    " DON'T KNOW^                       {VAR} (5)^",
    " REFUSED^                          {VAR} (6)^"
  ],

  confident_not_confident: [
    " **D/S (TOT CONF - TOT NOT CONF)^  CALC F2-F3,V2-V3       ^SX",
    " TOTAL CONFIDENT^                  {VAR} (1-2) ^L-,SX",
    " TOTAL NOT CONFIDENT^              {VAR} (3-4) ^L-,SX",
    "   VERY CONFIDENT^                 {VAR} (1) ^",
    "   SOMEWHAT CONFIDENT^             {VAR} (2) ^",
    "   NOT VERY CONFIDENT^             {VAR} (3)^",
    "   NOT AT ALL CONFIDENT^           {VAR} (4) ^",
    " DON'T KNOW^                       {VAR} (5) ^",
    " REFUSED^                          {VAR} (6) ^"
  ],

  yes_no: [
    " **D/S (TOT YES - TOT NO)^  CALC F2-F4,V2-V4^SX",
    " TOTAL YES^                      {VAR} (1-2) ^L-,SX",
    " TOTAL LEAN/UNDECIDED^           {VAR} (3-5) ^L-,SX",
    " TOTAL NO^                       {VAR} (6-7) ^L-,SX",
    "   DEFINITELY YES^               {VAR} (1) ^",
    "   PROBABLY YES^                 {VAR} (2) ^",
    "   UNDECIDED, LEAN YES^          {VAR} (3) ^",
    "   HARD UNDECIDED/DON'T KNOW ^   {VAR} (4) ^",
    "   UNDECIDED, LEAN NO^           {VAR} (5) ^",
    "   PROBABLY NO^                  {VAR} (6) ^",
    "   DEFINITELY NO^                {VAR} (7) ^",
    " REFUSED^                        {VAR} (8) ^"
  ],

  more_less_likely: [
    " **D/S (TOT MORE - TOT LESS)^  CALC F2-F3,V2-V3       ^SX",
    " TOTAL MORE LIKELY^         {VAR} (1-2) ^L-,SX",
    " TOTAL LESS LIKELY^         {VAR} (3-4) ^L-,SX",
    "   MUCH MORE LIKELY^        {VAR} (1) ^",
    "   SOMEWHAT MORE LIKELY^    {VAR} (2) ^",
    "   SOMEWHAT LESS LIKELY^    {VAR} (3) ^",
    "   MUCH LESS LIKELY^        {VAR} (4) ^",
    " ANY DIFFERENCE ^           {VAR} (5) ^",
    " DON’T KNOW/REFUSED^        {VAR} (6) ^"
  ],

  convincing_not_convincing: [
    " **D/S (TOT CONV - TOT NOT CONV)^  CALC F2-F3,V2-V3^SX",
    " TOTAL CONVINCING^                {VAR} (1-2) ^L-,SX",
    " TOTAL NOT CONVINCING^            {VAR} (3-4) ^L-,SX",
    "   VERY CONVINCING^               {VAR} (1) ^",
    "   SOMEWHAT CONVINCING^           {VAR} (2) ^",
    "   NOT TOO CONVINCING^            {VAR} (3)^",
    "   NOT AT ALL CONVINCING^         {VAR} (4) ^",
    " DON'T KNOW^                      {VAR} (5) ^",
    " REFUSED^                         {VAR} (6) ^"
  ],

  adequate_inadequate: [
    " **D/S (TOT ADEQUATE - TOT INADEQUATE)^  CALC F2-F3,V2-V3^SX",
    " TOTAL ADEQUATE^                              {VAR} (1-2) ^L-,SX",
    " TOTAL INADEQUATE^                            {VAR} (3-4) ^L-,SX",
    "   STRONGLY DOES/ADEQUATE^                    {VAR} (1) ^",
    "   NOT-SO-STRONGLY DOES/ADEQUATE^             {VAR} (2) ^",
    "   NOT-SO-STRONGLY DOES NOT/INADEQUATE^       {VAR} (3)^",
    "   STRONGLY DOES NOT/INADEQUATE^              {VAR} (4) ^",
    " DEPENDS ON DROUGHT^                          {VAR} (5) ^",
    " DEPENDS ON GROWTH^                           {VAR} (6) ^",
    " DON’T KNOW/UNSURE ^                          {VAR} (7) ^",
    " REFUSED ^                                    {VAR} (8) ^"
  ]
};

let tables = [];
let editingIndex = null;

const projectTypeSelect = document.getElementById("projectType");
const questionCodeInput = document.getElementById("questionCode");
const questionTypeSelect = document.getElementById("questionType");
const rowTypeSelect = document.getElementById("rowType");
const questionTextInput = document.getElementById("questionText");
const answerOptionsInput = document.getElementById("answerOptions");
const answerOptionsBox = document.getElementById("answerOptionsBox");

const useSTCheckbox = document.getElementById("useST");
const useDSCheckbox = document.getElementById("useDS");
const subtitleBox = document.getElementById("subtitleBox");
const subtitleOnlyInput = document.getElementById("subtitleOnly");
const manualUseIndexInput = document.getElementById("manualUseIndex");

const baseTypeSelect = document.getElementById("baseType");
const askedBaseBox = document.getElementById("askedBaseBox");
const askedBaseTextInput = document.getElementById("askedBaseText");

const inputList = document.getElementById("inputList");
const output = document.getElementById("output");

const addBtn = document.getElementById("addBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const clearInputBtn = document.getElementById("clearInputBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

function normalizeQuestionCode(value) {
  return value.trim().toUpperCase();
}

function expandQuestionCodes(input) {
  const raw = input.trim().toUpperCase();

  if (!raw.includes(":")) {
    return [raw];
  }

  const parts = raw.split(":");
  const startRaw = parts[0].trim();
  const endRaw = parts[1].trim();

  const prefixMatch = startRaw.match(/^[A-Z]+/);
  const startNumberMatch = startRaw.match(/\d+$/);
  const endNumberMatch = endRaw.match(/\d+$/);

  if (!prefixMatch || !startNumberMatch || !endNumberMatch) {
    alert("Invalid question range. Use format like Q1:5 or Q1:Q5.");
    return [];
  }

  const prefix = prefixMatch[0];
  const startNumber = parseInt(startNumberMatch[0], 10);
  const endNumber = parseInt(endNumberMatch[0], 10);

  if (endNumber < startNumber) {
    alert("Invalid question range. End number must be greater than start number.");
    return [];
  }

  const codes = [];

  for (let i = startNumber; i <= endNumber; i++) {
    codes.push(prefix + i);
  }

  return codes;
}

function getCurrentProjectSetting() {
  const selectedProject = projectTypeSelect.value || "N2";

  return projectSettings[selectedProject] || projectSettings.N2;
}

function getQuestionNumber(questionCode) {
  const cleanCode = normalizeQuestionCode(questionCode);

  if (cleanCode.startsWith("Q")) {
    return cleanCode.substring(1);
  }

  return cleanCode;
}

function buildQuestionCodeLine(questionCode, index) {
  const cleanCode = normalizeQuestionCode(questionCode);

  return "T" + cleanCode + "^" + index;
}

function buildTableOptions(questionType, useST, projectType) {
  const setting = projectSettings[projectType] || projectSettings.N2;

  let options = setting.tableOptionsByType[questionType];

  if (!options) {
    options = setting.tableOptionsByType.single_choice;
  }

  let optionArray = options.split(",");

  if (useST && !optionArray.includes("ST")) {
    optionArray.push("ST");
  }

  if (!useST && questionType !== "array") {
    optionArray = optionArray.filter(option => option !== "ST");
  }

  return optionArray.join(",");
}

function buildQuestionTextLine(questionCode, questionText) {
  const questionNumber = getQuestionNumber(questionCode);

  return " QUESTION " + questionNumber + ":|" + questionText.trim();
}

function getTnValue(questionType, projectType) {
  const setting = projectSettings[projectType] || projectSettings.N2;

  return setting.baseTnByType[questionType] || "1";
}

function buildBaseLine(table) {
  const tnValue = getTnValue(table.questionType, table.projectType);

  if (table.baseType === "asked_base") {
    return " BASE=" + table.askedBaseText.trim() + "^TN^" + tnValue;
  }

  return " BASE=TOTAL SAMPLE^TN^" + tnValue;
}

function buildRowTemplateLines(table) {
  if (!table.rowType || table.rowType === "custom_code") {
    return [];
  }

  const template = rowTemplates[table.rowType];

  if (!template) {
    return ["*** ERROR: ROW TYPE NOT FOUND - " + table.rowType + " ***"];
  }

  let lines = [...template];

  if (!table.useDS) {
    lines = lines.filter(line => {
      return !line.trim().startsWith("**D/S");
    });
  }

  return lines.map(line => {
    return line.replaceAll("{VAR}", table.questionCode);
  });
}

function cleanAnswerLabel(label) {
  return label
    .replace(/\s*\(DO NOT READ\)/gi, "")
    .replace(/\s*\(DNR\)/gi, "")
    .trim();
}

function buildRowsFromAnswerOptions(answerOptionsText, questionCode) {
  if (!answerOptionsText) {
    return [];
  }

  const lines = answerOptionsText
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return lines.map(line => {
    const match = line.match(/^(\d+)\s+(.+)$/);

    if (!match) {
      return " *** ERROR: INVALID ANSWER OPTION - " + line + " ***";
    }

    const code = match[1];
    const label = cleanAnswerLabel(match[2]);

    return " " + label + "^                        " + questionCode + " (" + code + ") ^";
  });
}

function collectTablesFromInput() {
  const rawQuestionCode = questionCodeInput.value.trim();
  const questionCodes = expandQuestionCodes(rawQuestionCode);
  const questionText = questionTextInput.value.trim();

  if (questionCodes.length === 0) {
    return null;
  }

  if (!questionText) {
    alert("Please enter Question Text.");
    return null;
  }

   if (!questionTypeSelect.value) {
    alert("Please select Question Type.");
    return null;
  }

  if (!rowTypeSelect.value) {
    alert("Please select Row Type.");
    return null;
  }

  if (baseTypeSelect.value === "asked_base" && !askedBaseTextInput.value.trim()) {
    alert("Please enter Asked Base Text.");
    return null;
  }

  const askedBaseLines = askedBaseTextInput.value
  .split(",")
  .map(item => item.trim())
  .filter(item => item !== "");

if (baseTypeSelect.value === "asked_base" && questionCodes.length > 1) {
  if (askedBaseLines.length > 1 && askedBaseLines.length !== questionCodes.length) {
    alert(
      "Number of Asked Base items must match number of question codes.\n\n" +
      "Question codes: " + questionCodes.length + "\n" +
      "Asked Base items: " + askedBaseLines.length
    );
    return null;
  }
}

  const subtitleLines = subtitleOnlyInput.value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  if (useSTCheckbox.checked && questionCodes.length > 1 && subtitleLines.length > 0) {
  if (subtitleLines.length !== questionCodes.length) {
    alert(
      "Number of subtitle lines must match number of question codes.\n\n" +
      "Question codes: " + questionCodes.length + "\n" +
      "Subtitle lines: " + subtitleLines.length
    );
    return null;
  }
}

const isArrayRange = questionTypeSelect.value === "array" && questionCodes.length > 1;
const arrayGroupId = isArrayRange ? "array_" + Date.now() : "";

return questionCodes.map((code, index) => {
  return {
    questionCode: code,
    questionType: questionTypeSelect.value,
    rowType: rowTypeSelect.value,
    questionText: questionText,
    useST: useSTCheckbox.checked,
    useDS: useDSCheckbox.checked,
    subtitleOnly: subtitleLines[index] || subtitleLines[0] || "",
    baseType: baseTypeSelect.value,
    askedBaseText: askedBaseLines[index] || askedBaseLines[0] || "",
    manualUseIndex: manualUseIndexInput.value.trim(),
    answerOptions: answerOptionsInput.value.trim(),

    arrayGroupId: arrayGroupId,
    arrayPosition: isArrayRange ? index : 0
  };
});
}

function addTable() {
  const newTables = collectTablesFromInput();

  if (!newTables) {
    return;
  }

  if (editingIndex !== null) {
    tables[editingIndex] = newTables[0];
    exitEditMode();
  } else {
    newTables.forEach(table => {
      tables.push(table);
    });
  }

  renderInputList();
  generateOutput();
  clearInputFields();
}

function getFirstArrayTableIndex(table) {
  if (!table.arrayGroupId) {
    return null;
  }

  const firstIndex = tables.findIndex(item => {
    return item.arrayGroupId === table.arrayGroupId && item.arrayPosition === 0;
  });

  if (firstIndex === -1) {
    return null;
  }

  return firstIndex + 1;
}

function editTable(index) {
  const table = tables[index];

  editingIndex = index;

  projectTypeSelect.value = table.projectType || "N2";
  questionCodeInput.value = table.questionCode;
  questionTypeSelect.value = table.questionType;
  rowTypeSelect.value = table.rowType;
  toggleAnswerOptionsBox();
  questionTextInput.value = table.questionText;

  useSTCheckbox.checked = table.useST;
  useDSCheckbox.checked = table.useDS !== false;
  subtitleOnlyInput.value = table.subtitleOnly;

  manualUseIndexInput.value = table.manualUseIndex || "";
  answerOptionsInput.value = table.answerOptions || "";

  baseTypeSelect.value = table.baseType;
  askedBaseTextInput.value = table.askedBaseText;

  toggleSubtitleBox();
  toggleAskedBaseBox();

  addBtn.textContent = "Update Table";
  cancelEditBtn.classList.remove("hidden");

  renderInputList();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function deleteTable(index) {
  tables.splice(index, 1);

  if (editingIndex === index) {
    exitEditMode();
    clearInputFields();
  }

  if (editingIndex !== null && editingIndex > index) {
    editingIndex = editingIndex - 1;
  }

  renderInputList();
  generateOutput();
}

function cancelEdit() {
  exitEditMode();
  clearInputFields();
  renderInputList();
}

function exitEditMode() {
  editingIndex = null;
  addBtn.textContent = "Add Table";
  cancelEditBtn.classList.add("hidden");
}

function renderInputList() {
  inputList.innerHTML = "";

  if (tables.length === 0) {
    inputList.innerHTML = `<div class="empty">No input yet.</div>`;
    return;
  }

  tables.forEach((table, arrayIndex) => {
    const tableIndex = arrayIndex + 1;
    const questionCodeLine = buildQuestionCodeLine(table.questionCode, tableIndex);
    const tableOptions = buildTableOptions(table.questionType, table.useST, table.projectType);
    const baseLine = buildBaseLine(table);

    const item = document.createElement("div");
    item.className = "input-item";

    if (editingIndex === arrayIndex) {
      item.classList.add("editing-note");
    }

    item.innerHTML = `
      <div>
        <div class="input-title">
          <span class="badge">${tableIndex}</span>
          ${questionCodeLine}
        </div>

        <div class="input-meta">
          Project Setting: ${table.projectType || "N2"}<br>
          Question Code: ${table.questionCode}<br>
          Question Type: ${table.questionType}<br>
          Row Type: ${table.rowType || "No row type"}<br>
          D/S Row: ${table.useDS !== false ? "Active" : "Inactive"}<br>
          USE: ${table.manualUseIndex ? "USE=" + table.manualUseIndex + ", " + table.questionCode : "Inactive"}<br>
          Table Options: ${tableOptions}<br>
          ${baseLine}
        </div>
      </div>

      <div class="item-actions">
        <button class="secondary" onclick="editTable(${arrayIndex})">Edit</button>
        <button class="danger" onclick="deleteTable(${arrayIndex})">Delete</button>
      </div>
    `;

    inputList.appendChild(item);
  });
}

function generateOutput() {
  const blocks = [];

  tables.forEach((table, arrayIndex) => {
    const tableIndex = arrayIndex + 1;

    const line1 = buildQuestionCodeLine(table.questionCode, tableIndex);
    const line2 = " " + buildTableOptions(table.questionType, table.useST, table.projectType);
    const line3 = buildQuestionTextLine(table.questionCode, table.questionText);
    const line4 = buildBaseLine(table);

    const block = [];

    block.push(line1);
    block.push(line2);
    block.push(line3);

    if (table.useST) {
      if (table.questionType === "array") {
      block.push("S|" + table.subtitleOnly);
      } else if (table.subtitleOnly) {
      block.push("S|" + table.subtitleOnly);
    }
  }

    block.push(line4);

      if (table.manualUseIndex) {
        block.push("USE=" + table.manualUseIndex + ", " + table.questionCode);
      } else if (
        table.questionType === "array" &&
        table.arrayGroupId &&
        table.arrayPosition > 0
      ) {
        const firstArrayIndex = getFirstArrayTableIndex(table);

        if (firstArrayIndex) {
          block.push("USE=" + firstArrayIndex + ", " + table.questionCode);
        } else {
          block.push("*** ERROR: ARRAY FIRST TABLE NOT FOUND ***");
        }

        } else if (table.rowType === "custom_code") {
        const answerRows = buildRowsFromAnswerOptions(table.answerOptions, table.questionCode);

          answerRows.forEach(line => {
            block.push(line);
          });
        } else {
          const rowLines = buildRowTemplateLines(table);

          rowLines.forEach(line => {
            block.push(line);
          });
}

    blocks.push(block.join("\n"));
  });

  output.textContent = blocks.join("\n");
}

function clearInputFields() {
  projectTypeSelect.value = "N2";
  questionCodeInput.value = "";
  questionTypeSelect.value = "";
  rowTypeSelect.value = "";
  toggleAnswerOptionsBox();
  questionTextInput.value = "";

  useSTCheckbox.checked = false;
  useDSCheckbox.checked = true;
  subtitleOnlyInput.value = "";
  subtitleBox.classList.add("hidden");

  manualUseIndexInput.value = "";
  answerOptionsInput.value = "";

  baseTypeSelect.value = "total_sample";
  askedBaseTextInput.value = "";
  askedBaseBox.classList.add("hidden");
}

function clearInput() {
  clearInputFields();
}

function clearAll() {
  tables = [];
  exitEditMode();
  clearInputFields();

  renderInputList();
  generateOutput();
}

function toggleSubtitleBox() {
  if (useSTCheckbox.checked) {
    subtitleBox.classList.remove("hidden");
  } else {
    subtitleBox.classList.add("hidden");
  }
}

function toggleAskedBaseBox() {
  if (baseTypeSelect.value === "asked_base") {
    askedBaseBox.classList.remove("hidden");
  } else {
    askedBaseBox.classList.add("hidden");
  }
}

function toggleAnswerOptionsBox() {
  if (!answerOptionsBox || !rowTypeSelect) {
    return;
  }

  if (rowTypeSelect.value === "custom_code") {
    answerOptionsBox.classList.remove("hidden");
  } else {
    answerOptionsBox.classList.add("hidden");
  }
}

async function copyOutput() {
  const text = output.textContent;

  if (!text.trim()) {
    alert("No output to copy.");
    return;
  }

  await navigator.clipboard.writeText(text);

  alert("Copied.");
}

function expandQuestionCodes(input) {
  const raw = input.trim().toUpperCase();

  if (!raw.includes(":")) {
    return [raw];
  }

  const parts = raw.split(":");
  const startRaw = parts[0].trim();
  const endRaw = parts[1].trim();

  const prefixMatch = startRaw.match(/^[A-Z]+/);
  const startNumberMatch = startRaw.match(/\d+$/);
  const endNumberMatch = endRaw.match(/\d+$/);

  if (!prefixMatch || !startNumberMatch || !endNumberMatch) {
    alert("Invalid question range. Use format like Q1:5 or Q1:Q5.");
    return [];
  }

  const prefix = prefixMatch[0];
  const startNumber = parseInt(startNumberMatch[0], 10);
  const endNumber = parseInt(endNumberMatch[0], 10);

  if (endNumber < startNumber) {
    alert("Invalid question range. End number must be greater than start number.");
    return [];
  }

  const codes = [];

  for (let i = startNumber; i <= endNumber; i++) {
    codes.push(prefix + i);
  }

  return codes;
}

addBtn.addEventListener("click", addTable);
cancelEditBtn.addEventListener("click", cancelEdit);
clearInputBtn.addEventListener("click", clearInput);
clearAllBtn.addEventListener("click", clearAll);
generateBtn.addEventListener("click", generateOutput);
copyBtn.addEventListener("click", copyOutput);
useSTCheckbox.addEventListener("change", toggleSubtitleBox);
baseTypeSelect.addEventListener("change", toggleAskedBaseBox);
rowTypeSelect.addEventListener("change", toggleAnswerOptionsBox);

renderInputList();
generateOutput();
toggleSubtitleBox();
toggleAskedBaseBox();
toggleAnswerOptionsBox();