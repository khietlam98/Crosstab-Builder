const projectSettings = {
  N2: {
    name: "N2",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST",
      ranking_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP"
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0",
        ranking_table: "0"
    }
  },

  P2: {
    name: "P2",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST",
      ranking_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP"
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
      summary_table: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST",
      ranking_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP"
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0"
    }
  }
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
const rowTypeBox = document.getElementById("rowTypeBox");
const questionTextInput = document.getElementById("questionText");

const answerOptionsInput = document.getElementById("answerOptions");
const answerOptionsBox = document.getElementById("answerOptionsBox");

const normalOptionsBox = document.getElementById("normalOptionsBox");
const useSTCheckbox = document.getElementById("useST");
const useDSCheckbox = document.getElementById("useDS");
const subtitleBox = document.getElementById("subtitleBox");
const subtitleOnlyInput = document.getElementById("subtitleOnly");
const manualUseIndexInput = document.getElementById("manualUseIndex");

const baseTypeSelect = document.getElementById("baseType");
const askedBaseBox = document.getElementById("askedBaseBox");
const askedBaseTextInput = document.getElementById("askedBaseText");

const summarySetupBox = document.getElementById("summarySetupBox");
const summaryRawInput = document.getElementById("summaryRawInput");
const summaryBlockCountInput = document.getElementById("summaryBlockCount");
const buildSummarySetupBtn = document.getElementById("buildSummarySetupBtn");
const summaryBlockSetupContainer = document.getElementById("summaryBlockSetupContainer");

const summaryModal = document.getElementById("summaryModal");
const openSummaryModalBtn = document.getElementById("openSummaryModalBtn");
const closeSummaryModalBtn = document.getElementById("closeSummaryModalBtn");
const saveSummaryModalBtn = document.getElementById("saveSummaryModalBtn");

const rankingSetupPanel = document.getElementById("rankingSetupPanel");
const rankingMetricDefinitionsInput = document.getElementById("rankingMetricDefinitions");
const rankingItemsInput = document.getElementById("rankingItemsInput");

const useSplitABCheckbox = document.getElementById("useSplitAB");
const splitABBox = document.getElementById("splitABBox");
const splitVariableInput = document.getElementById("splitVariable");
const splitACodeInput = document.getElementById("splitACode");
const splitBCodeInput = document.getElementById("splitBCode");
const splitOptionsInput = document.getElementById("splitOptions");

const buildRankingSplitBtn = document.getElementById("buildRankingSplitBtn");
const rankingSplitModal = document.getElementById("rankingSplitModal");
const closeRankingSplitModalBtn = document.getElementById("closeRankingSplitModalBtn");
const saveRankingSplitModalBtn = document.getElementById("saveRankingSplitModalBtn");
const rankingSplitTableContainer = document.getElementById("rankingSplitTableContainer");

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

function parseRankingMetrics(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return lines.map(line => {
    const match = line.match(/^(.*?)\s*\(:\s*([^)]+)\s*\)\s*$/);

    if (!match) {
      return null;
    }

    return {
      label: match[1].trim(),
      code: match[2].trim()
    };
  }).filter(item => item !== null);
}

function parseRankingItems(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return lines.map(line => {
    if (line.includes("|")) {
      const parts = line.split("|").map(part => part.trim());

      return {
        questionCode: "Q" + parts[0].replace(/^Q/i, ""),
        label: parts[1] || "",
        splitSuffix: parts[2] || ""
      };
    }

    const match = line.match(/^Q?(\d+)\s+(.+)$/i);

    if (!match) {
      return null;
    }

    return {
      questionCode: "Q" + match[1],
      label: match[2].trim(),
      splitSuffix: ""
    };
  }).filter(item => item !== null && item.label !== "");
}

function buildRankingSplitSetup() {
  const items = parseRankingItems(rankingItemsInput.value);

  if (items.length === 0) {
    alert("Please paste Ranking Items first.");
    return;
  }

  const rows = items.map((item, index) => {
    return `
      <tr>
        <td>${item.questionCode}</td>
        <td>${item.label}</td>
        <td>
          <select class="ranking-split-select" data-index="${index}">
            <option value="">Blank</option>
            <option value="1" ${item.splitSuffix === "1" ? "selected" : ""}>1</option>
            <option value="2" ${item.splitSuffix === "2" ? "selected" : ""}>2</option>
          </select>
        </td>
      </tr>
    `;
  }).join("");

  rankingSplitTableContainer.innerHTML = `
    <table class="ranking-split-table">
      <thead>
        <tr>
          <th>Question Code</th>
          <th>Code Label</th>
          <th>Split Code</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  rankingSplitModal.classList.remove("hidden");
}

function closeRankingSplitModal() {
  rankingSplitModal.classList.add("hidden");
}

function getRankingItemsWithSplitSuffix() {
  const items = parseRankingItems(rankingItemsInput.value);
  const selects = [...rankingSplitTableContainer.querySelectorAll(".ranking-split-select")];

  selects.forEach(select => {
    const index = Number(select.dataset.index);
    if (items[index]) {
      items[index].splitSuffix = select.value;
    }
  });

  return items;
}

function buildSplitABLines(table) {
  if (!table.useSplitAB) {
    return [];
  }

  const splitVar = table.splitVariable || "SplitAB";
  const splitA = table.splitACode || "1";
  const splitB = table.splitBCode || "2";
  const splitOptions = table.splitOptions || "HR,SX";

  return [
    " A^ " + splitVar + " (" + splitA + ") ^" + splitOptions,
    " B^ " + splitVar + " (" + splitB + ") ^" + splitOptions
  ];
}

function buildRankingTableLines(table) {
  const lines = [];

  buildSplitABLines(table).forEach(line => {
    lines.push(line);
  });

  table.rankingItems.forEach(item => {
    const suffix = item.splitSuffix ? item.splitSuffix : "";

    lines.push(
      " " +
      item.label.padEnd(72) +
      "^ " +
      item.questionCode +
      "(" +
      table.metricCode +
      ")^" +
      suffix
    );
  });

  return lines;
}

function normalizeRowType(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "_");
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

function buildQuestionCodeLine(questionCode, index) {
  const cleanCode = normalizeQuestionCode(questionCode);

  if (cleanCode.startsWith("T")) {
    return cleanCode + "^" + index;
  }

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

function openSummaryModal() {
  summaryModal.classList.remove("hidden");
}

function closeSummaryModal() {
  summaryModal.classList.add("hidden");
}

function getQuestionNumber(questionCode) {
  const cleanCode = normalizeQuestionCode(questionCode);

  if (cleanCode.startsWith("Q")) {
    return cleanCode.substring(1);
  }

  return cleanCode;
}

function buildQuestionTextLine(table) {
  if (
    table.questionType === "summary_table" ||
    table.questionType === "ranking_table"
  ) {
    return " " + table.questionText.trim();
  }

  const questionNumber = getQuestionNumber(table.questionCode);

  return " QUESTION " + questionNumber + ":|" + table.questionText.trim();
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
  const rowType = normalizeRowType(table.rowType);

  if (!rowType || rowType === "custom_code") {
    return [];
  }

  const template = rowTemplates[rowType];

  if (!template) {
    return ["*** ERROR: ROW TYPE NOT FOUND - " + table.rowType + " ***"];
  }

  let lines = [...template];

  if (!table.useDS) {
    lines = lines.filter(line => !line.trim().startsWith("**D/S"));
  }

  return lines.map(line => line.replaceAll("{VAR}", table.questionCode));
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

    return " " + label.padEnd(28) + "^ " + questionCode.padEnd(18) + "(" + code + ") ^";
  });
}

function normalizeSummaryTitle(title) {
  return title
    .replace(/[–—]/g, "-")
    .replace(/\s+-\s+/g, " ")
    .replace(/\bD\/S\b/g, "(D/S)")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSummaryLabel(label) {
  return label
    .replace(/^TOTAL\s+/i, "TOT ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSummaryRawText(rawText) {
  const lines = rawText
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  const blocks = [];
  let currentBlock = null;

  lines.forEach(line => {
    const blockMatch = line.match(/^(Q\d+(?:\/\d+)*)\s+(.+)$/i);

    if (blockMatch && !line.includes(":")) {
      currentBlock = {
        sourceCode: blockMatch[1].trim().toUpperCase(),
        title: normalizeSummaryTitle(blockMatch[2]),
        rows: []
      };

      blocks.push(currentBlock);
      return;
    }

    const logicIndex = line.search(/Q\d+/i);

    if (logicIndex === -1) {
      return;
    }

    if (!currentBlock) {
      currentBlock = {
        sourceCode: "",
        title: "SUMMARY BLOCK",
        rows: []
      };

      blocks.push(currentBlock);
    }

    const label = normalizeSummaryLabel(line.slice(0, logicIndex));
    const logic = line.slice(logicIndex).trim();

    currentBlock.rows.push({
      label,
      logic
    });
  });

  return blocks;
}

function formatSimpleQGroup(token) {
  const clean = token.trim();
  const match = clean.match(/^Q([\d\/]+):(.+)$/i);

  if (!match) {
    return clean;
  }

  const nums = match[1].split("/");
  const code = match[2].trim();

  return nums.map((num, index) => {
    if (index === 0) {
      return "Q" + num + " (" + code + ")";
    }

    return "or Q" + num + " (" + code + ")";
  }).join(" ");
}

function formatCompactQGroup(token) {
  const clean = token.trim();
  const match = clean.match(/^Q([\d\/]+):(.+)$/i);

  if (!match) {
    return clean;
  }

  const nums = match[1].split("/");
  const code = match[2].trim();

  return nums.map(num => {
    return "Q" + num + "(" + code + ")";
  }).join(" or ");
}

function formatSummaryLogic(logic) {
  if (logic.includes("&")) {
    return logic
      .split("&")
      .map(part => {
        const inner = part.trim();
        return "{" + formatCompactQGroup(inner) + "}";
      })
      .join(" & ");
  }

  return formatSimpleQGroup(logic);
}

function buildSummarySetup() {
  const parsedBlocks = parseSummaryRawText(summaryRawInput.value);
  const requestedCount = parseInt(summaryBlockCountInput.value, 10) || parsedBlocks.length || 1;

  summaryBlockSetupContainer.innerHTML = "";

  for (let i = 0; i < requestedCount; i++) {
    const block = parsedBlocks[i] || {
      title: "",
      rows: []
    };

    const card = document.createElement("div");
    card.className = "summary-block-card";
    card.dataset.index = i;

    const rowOptions = block.rows.map(row => {
      return `<option value="${row.label}">${row.label}</option>`;
    }).join("");

    openSummaryModalBtn.classList.remove("hidden");
    openSummaryModal();

    card.innerHTML = `
      <h4>Summary Block ${i + 1}</h4>

      <div class="summary-block-grid">
        <div class="form-group wide">
          <label>Summary Title</label>
          <input class="summary-title-input" type="text" value="${block.title || ""}" placeholder="Example: INIT BALLOT COMB (D/S)" />
        </div>

        <div class="form-group">
          <label>D/S Positive Row</label>
          <select class="summary-positive-select">
            ${rowOptions}
          </select>
        </div>

        <div class="form-group">
          <label>D/S Negative Row</label>
          <select class="summary-negative-select">
            ${rowOptions}
          </select>
        </div>

        <div class="form-group wide">
          <label>Suffix</label>
          <input class="summary-suffix-input" type="text" value="SX,L-" />
        </div>
      </div>
    `;

    summaryBlockSetupContainer.appendChild(card);

    const positiveSelect = card.querySelector(".summary-positive-select");
    const negativeSelect = card.querySelector(".summary-negative-select");

    if (positiveSelect) {
      const positiveDefault = block.rows.find(row => /TOT\s+YES|TOTAL\s+YES/i.test(row.label));
      if (positiveDefault) positiveSelect.value = positiveDefault.label;
    }

    if (negativeSelect) {
      const negativeDefault = block.rows.find(row => /TOT\s+NO|TOTAL\s+NO/i.test(row.label));
      if (negativeDefault) negativeSelect.value = negativeDefault.label;
    }
  }
}

function getSummaryBlocksFromSetup() {
  const parsedBlocks = parseSummaryRawText(summaryRawInput.value);
  const cards = [...summaryBlockSetupContainer.querySelectorAll(".summary-block-card")];

  if (cards.length === 0) {
    buildSummarySetup();
  }

  const updatedCards = [...summaryBlockSetupContainer.querySelectorAll(".summary-block-card")];

  return updatedCards.map((card, index) => {
    const parsedBlock = parsedBlocks[index] || {
      title: "",
      rows: []
    };

    return {
      title: card.querySelector(".summary-title-input").value.trim() || parsedBlock.title,
      positiveLabel: card.querySelector(".summary-positive-select")?.value || "",
      negativeLabel: card.querySelector(".summary-negative-select")?.value || "",
      suffix: card.querySelector(".summary-suffix-input").value.trim() || "SX,L-",
      rows: parsedBlock.rows
    };
  });
}

function buildSummaryTableLines(summaryBlocks) {
  const lines = [];
  let currentRowNumber = 1;

  summaryBlocks.forEach(block => {
    const positiveIndex = block.rows.findIndex(row => row.label === block.positiveLabel);
    const negativeIndex = block.rows.findIndex(row => row.label === block.negativeLabel);

    const positiveRowNumber = positiveIndex >= 0 ? currentRowNumber + positiveIndex + 1 : currentRowNumber + 1;
    const negativeRowNumber = negativeIndex >= 0 ? currentRowNumber + negativeIndex + 1 : currentRowNumber + 1;

    const calcText = "CALC F" + positiveRowNumber + "-F" + negativeRowNumber + ",V" + positiveRowNumber + "-V" + negativeRowNumber;
    const suffixText = "^" + block.suffix;

    lines.push(
      " " +
      block.title.padEnd(24) +
      "^        " +
      calcText.padEnd(24) +
      suffixText
    );

    block.rows.forEach(row => {
      const logic = formatSummaryLogic(row.logic);

      lines.push(
        "   " +
        row.label.padEnd(22) +
        "^ " +
        logic.padEnd(28) +
        "^"
      );
    });

    currentRowNumber += 1 + block.rows.length;
  });

  return lines;
}

function collectTablesFromInput() {
  const rawQuestionCode = questionCodeInput.value.trim();
  const questionCodes = expandQuestionCodes(rawQuestionCode);
  const questionText = questionTextInput.value.trim();

  if (questionCodes.length === 0 || !rawQuestionCode) {
    alert("Please enter Question Code / Table Code.");
    return null;
  }

  if (!questionTypeSelect.value) {
    alert("Please select Question Type.");
    return null;
  }

  if (!questionText) {
    alert("Please enter Question Text / Summary Title.");
    return null;
  }

  if (baseTypeSelect.value === "asked_base" && !askedBaseTextInput.value.trim()) {
    alert("Please enter Asked Base Text.");
    return null;
  }

  if (questionTypeSelect.value === "ranking_table") {
  const metrics = parseRankingMetrics(rankingMetricDefinitionsInput.value);

  if (metrics.length === 0) {
    alert("Please enter valid Metric Definitions.");
    return null;
  }

  const rankingItems = getRankingItemsWithSplitSuffix();

  if (rankingItems.length === 0) {
    alert("Please paste Ranking Items.");
    return null;
  }

  return metrics.map(metric => {
  return {
    projectType: projectTypeSelect.value || "N2",
    questionCode: questionCodes[0],
    questionType: "ranking_table",
    rowType: "ranking_table",
    questionText: buildRankingTitle(questionText, metric.label),
    useST: false,
    useDS: false,
    subtitleOnly: "",
    baseType: baseTypeSelect.value,
    askedBaseText: askedBaseTextInput.value.trim(),
    manualUseIndex: "",
    answerOptions: "",

    metricLabel: metric.label,
    metricCode: metric.code,

    rankingMetricDefinitions: rankingMetricDefinitionsInput.value.trim(),
    rankingItemsRaw: rankingItemsInput.value.trim(),
    rankingItems: rankingItems,

    useSplitAB: useSplitABCheckbox.checked,
    splitVariable: splitVariableInput.value.trim() || "SplitAB",
    splitACode: splitACodeInput.value.trim() || "1",
    splitBCode: splitBCodeInput.value.trim() || "2",
    splitOptions: splitOptionsInput.value.trim() || "HR,SX",

    summaryRaw: "",
    summaryBlocks: [],
    arrayGroupId: "",
    arrayPosition: 0
  };
});
}

  if (questionTypeSelect.value === "summary_table") {
    const summaryBlocks = getSummaryBlocksFromSetup();

    if (!summaryBlocks.length || summaryBlocks.every(block => block.rows.length === 0)) {
      alert("Please paste Summary CUSTOM CODE and build Summary Setup.");
      return null;
    }

    return [{
      projectType: projectTypeSelect.value || "N2",
      questionCode: questionCodes[0],
      questionType: questionTypeSelect.value,
      rowType: "summary_custom",
      questionText,
      useST: false,
      useDS: false,
      subtitleOnly: "",
      baseType: baseTypeSelect.value,
      askedBaseText: askedBaseTextInput.value.trim(),
      manualUseIndex: "",
      answerOptions: "",
      summaryRaw: summaryRawInput.value,
      summaryBlocks,
      arrayGroupId: "",
      arrayPosition: 0
    }];
  }

  if (!rowTypeSelect.value) {
    alert("Please select Row Type.");
    return null;
  }

  const askedBaseItems = askedBaseTextInput.value
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");

  if (baseTypeSelect.value === "asked_base" && questionCodes.length > 1) {
    if (askedBaseItems.length > 1 && askedBaseItems.length !== questionCodes.length) {
      alert(
        "Number of Asked Base items must match number of question codes.\n\n" +
        "Question codes: " + questionCodes.length + "\n" +
        "Asked Base items: " + askedBaseItems.length
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
      projectType: projectTypeSelect.value || "N2",
      questionCode: code,
      questionType: questionTypeSelect.value,
      rowType: rowTypeSelect.value,
      questionText,
      useST: useSTCheckbox.checked,
      useDS: useDSCheckbox.checked,
      subtitleOnly: subtitleLines[index] || subtitleLines[0] || "",
      baseType: baseTypeSelect.value,
      askedBaseText: askedBaseItems[index] || askedBaseItems[0] || "",
      manualUseIndex: manualUseIndexInput.value.trim(),
      answerOptions: answerOptionsInput.value.trim(),
      summaryRaw: "",
      summaryBlocks: [],
      arrayGroupId,
      arrayPosition: isArrayRange ? index : 0
    };
  });
}

function buildRankingTitle(baseTitle, metricLabel) {
  const cleanBaseTitle = baseTitle.trim();
  const cleanMetricLabel = metricLabel.trim().toUpperCase();

  if (cleanBaseTitle.endsWith(":")) {
    return cleanBaseTitle + " " + cleanMetricLabel;
  }

  return cleanBaseTitle + ": " + cleanMetricLabel;
}

function addTable() {
  const newTables = collectTablesFromInput();

  if (!newTables) return;

  if (editingIndex !== null) {
    tables[editingIndex] = newTables[0];
    exitEditMode();
  } else {
    newTables.forEach(table => tables.push(table));
  }

  renderInputList();
  generateOutput();
  clearInputFields();
}

function getFirstArrayTableIndex(table) {
  if (!table.arrayGroupId) return null;

  const firstIndex = tables.findIndex(item => {
    return item.arrayGroupId === table.arrayGroupId && item.arrayPosition === 0;
  });

  if (firstIndex === -1) return null;

  return firstIndex + 1;
}

function editTable(index) {
  const table = tables[index];

  editingIndex = index;

  projectTypeSelect.value = table.projectType || "N2";
  questionCodeInput.value = table.questionCode;
  questionTypeSelect.value = table.questionType;
  questionTextInput.value = table.questionText;

  toggleQuestionTypeUI();

if (table.questionType === "summary_table") {
  summaryRawInput.value = table.summaryRaw || "";
  summaryBlockCountInput.value = table.summaryBlocks?.length || "";
  buildSummarySetup();

  const cards = [...summaryBlockSetupContainer.querySelectorAll(".summary-block-card")];

  cards.forEach((card, i) => {
    const block = table.summaryBlocks[i];
    if (!block) return;

    card.querySelector(".summary-title-input").value = block.title || "";
    card.querySelector(".summary-positive-select").value = block.positiveLabel || "";
    card.querySelector(".summary-negative-select").value = block.negativeLabel || "";
    card.querySelector(".summary-suffix-input").value = block.suffix || "SX,L-";
  });

} else if (table.questionType === "ranking_table") {
  rankingMetricDefinitionsInput.value = table.rankingMetricDefinitions || "";
  rankingItemsInput.value = table.rankingItemsRaw || "";

  useSplitABCheckbox.checked = table.useSplitAB || false;
  splitVariableInput.value = table.splitVariable || "SplitAB";
  splitACodeInput.value = table.splitACode || "1";
  splitBCodeInput.value = table.splitBCode || "2";
  splitOptionsInput.value = table.splitOptions || "HR,SX";

  toggleSplitABBox();

  rankingSplitTableContainer.innerHTML = "";

  if (table.rankingItems && table.rankingItems.length > 0) {
    const rows = table.rankingItems.map((item, index) => {
      return `
        <tr>
          <td>${item.questionCode}</td>
          <td>${item.label}</td>
          <td>
            <select class="ranking-split-select" data-index="${index}">
              <option value="">Blank</option>
              <option value="1" ${item.splitSuffix === "1" ? "selected" : ""}>1</option>
              <option value="2" ${item.splitSuffix === "2" ? "selected" : ""}>2</option>
            </select>
          </td>
        </tr>
      `;
    }).join("");

    rankingSplitTableContainer.innerHTML = `
      <table class="ranking-split-table">
        <thead>
          <tr>
            <th>Question Code</th>
            <th>Code Label</th>
            <th>Split Code</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

} else {
  rowTypeSelect.value = table.rowType;
  answerOptionsInput.value = table.answerOptions || "";
  useSTCheckbox.checked = table.useST;
  useDSCheckbox.checked = table.useDS !== false;
  subtitleOnlyInput.value = table.subtitleOnly || "";
  manualUseIndexInput.value = table.manualUseIndex || "";
}
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
    const line3 = buildQuestionTextLine(table);
    const line4 = buildBaseLine(table);

    const block = [];

    block.push(line1);
    block.push(line2);
    block.push(line3);
    block.push(line4);

    if (table.questionType === "ranking_table") {
    const rankingLines = buildRankingTableLines(table);
    rankingLines.forEach(line => block.push(line));
    blocks.push(block.join("\n"));
    return;
}

    if (table.questionType === "summary_table") {
      const summaryLines = buildSummaryTableLines(table.summaryBlocks || []);
      summaryLines.forEach(line => block.push(line));
      blocks.push(block.join("\n"));
      return;
    }

    if (table.useST) {
      if (table.questionType === "array") {
        block.splice(3, 0, "S|" + table.subtitleOnly);
      } else if (table.subtitleOnly) {
        block.splice(3, 0, "S|" + table.subtitleOnly);
      }
    }

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
    } else if (normalizeRowType(table.rowType) === "custom_code") {
      const answerRows = buildRowsFromAnswerOptions(table.answerOptions, table.questionCode);
      answerRows.forEach(line => block.push(line));
    } else {
      const rowLines = buildRowTemplateLines(table);
      rowLines.forEach(line => block.push(line));
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
  questionTextInput.value = "";

  answerOptionsInput.value = "";
  useSTCheckbox.checked = false;
  useDSCheckbox.checked = true;
  subtitleOnlyInput.value = "";
  manualUseIndexInput.value = "";

  baseTypeSelect.value = "total_sample";
  askedBaseTextInput.value = "";

  rankingMetricDefinitionsInput.value = "";
  rankingItemsInput.value = "";
  useSplitABCheckbox.checked = false;
  splitVariableInput.value = "SplitAB";
  splitACodeInput.value = "1";
  splitBCodeInput.value = "2";
  splitOptionsInput.value = "HR,SX";
  rankingSplitTableContainer.innerHTML = "";
  closeRankingSplitModal();
  toggleSplitABBox();

  summaryRawInput.value = "";
  summaryBlockCountInput.value = "";
  summaryBlockSetupContainer.innerHTML = "";

  openSummaryModalBtn.classList.add("hidden");
  closeSummaryModal();

  toggleQuestionTypeUI();
  toggleAnswerOptionsBox();
  toggleSubtitleBox();
  toggleAskedBaseBox();
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
  if (normalizeRowType(rowTypeSelect.value) === "custom_code" && questionTypeSelect.value !== "summary_table") {
    answerOptionsBox.classList.remove("hidden");
  } else {
    answerOptionsBox.classList.add("hidden");
  }
}

function toggleSplitABBox() {
  if (useSplitABCheckbox.checked) {
    splitABBox.classList.remove("hidden");
    buildRankingSplitBtn.classList.remove("hidden");
  } else {
    splitABBox.classList.add("hidden");
    buildRankingSplitBtn.classList.add("hidden");
  }
}

const summarySetupPanel = document.getElementById("summarySetupPanel");

function toggleQuestionTypeUI() {
  if (questionTypeSelect.value === "summary_table") {
    summarySetupPanel.classList.remove("hidden");
    rankingSetupPanel.classList.add("hidden");

    normalOptionsBox.classList.add("hidden");
    rowTypeBox.classList.add("hidden");
    answerOptionsBox.classList.add("hidden");
  } else if (questionTypeSelect.value === "ranking_table") {
    rankingSetupPanel.classList.remove("hidden");
    summarySetupPanel.classList.add("hidden");

    normalOptionsBox.classList.add("hidden");
    rowTypeBox.classList.add("hidden");
    answerOptionsBox.classList.add("hidden");
  } else {
    summarySetupPanel.classList.add("hidden");
    rankingSetupPanel.classList.add("hidden");

    normalOptionsBox.classList.remove("hidden");
    rowTypeBox.classList.remove("hidden");
    toggleAnswerOptionsBox();
  }
}

async function copyOutput() {
  const text = output.textContent;

  if (!text.trim()) {
    alert("No output to copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    alert("Copied.");
  } catch (err) {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    alert("Copied.");
  }
}

addBtn.addEventListener("click", addTable);
cancelEditBtn.addEventListener("click", cancelEdit);
clearInputBtn.addEventListener("click", clearInput);
clearAllBtn.addEventListener("click", clearAll);
generateBtn.addEventListener("click", generateOutput);
copyBtn.addEventListener("click", copyOutput);

useSplitABCheckbox.addEventListener("change", toggleSplitABBox);
buildRankingSplitBtn.addEventListener("click", buildRankingSplitSetup);
closeRankingSplitModalBtn.addEventListener("click", closeRankingSplitModal);
saveRankingSplitModalBtn.addEventListener("click", closeRankingSplitModal);

rankingSplitModal.addEventListener("click", function (event) {
  if (event.target === rankingSplitModal) {
    closeRankingSplitModal();
  }
});

questionTypeSelect.addEventListener("change", toggleQuestionTypeUI);
rowTypeSelect.addEventListener("change", toggleAnswerOptionsBox);
useSTCheckbox.addEventListener("change", toggleSubtitleBox);
baseTypeSelect.addEventListener("change", toggleAskedBaseBox);
buildSummarySetupBtn.addEventListener("click", buildSummarySetup);
openSummaryModalBtn.addEventListener("click", openSummaryModal);
closeSummaryModalBtn.addEventListener("click", closeSummaryModal);
saveSummaryModalBtn.addEventListener("click", closeSummaryModal);

summaryModal.addEventListener("click", function (event) {
  if (event.target === summaryModal) {
    closeSummaryModal();
  }
});

renderInputList();
generateOutput();
toggleQuestionTypeUI();
toggleSubtitleBox();
toggleAskedBaseBox();
toggleAnswerOptionsBox();
toggleSplitABBox();