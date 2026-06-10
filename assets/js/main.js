const projectSettings = {
  N2: {
    name: "N2",
    tableOptionsByType: {
      single_choice: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      summary_table: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      array: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP,ST",
      ranking_table: "OR,OV,OB,OD,O%,F%,R%,RA,BH,RV,S2,P0,V2,SA,SP",
      demographic: "OR,OV,OI2,O%,F%,BH,RV,S2,P0,V2,SA,SP",
      listout_table: "OR,OV,O%,F%,BH,RV,S2,P0,V2,SA,SP",
    },
    baseTnByType: {
      single_choice: "1",
      array: "1",
      summary_table: "0",
        ranking_table: "0",
        demographic: "1",
        multiple_choice: "1",
        listout_table: "1",
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

const demographicTemplates = {
  age: [
    " 18-34^       {VAR} (1-2)  ^",
    " 35-44^       {VAR} (3)    ^",
    " 45-54^       {VAR} (4)    ^",
    " 55-64^       {VAR} (5)    ^",
    " 65+^         {VAR} (6)    ^",
    " REFUSED^     {VAR} (7)    ^",
    " ^                       ^",
    " 18-54^       {VAR} (1-4)  ^",
    " 55+^         {VAR} (5-6)  ^"
  ],

  gender: [
    " **D/S (MALE - FEMALE)^  CALC F2-F3,V2-V3               ^SX",
    " MALE^                          {VAR} (1) ^",
    " FEMALE^                        {VAR} (2) ^",
    " NON-BINARY OR SOMETHING ELSE^  {VAR} (3) ^",
    " REFUSED^                       {VAR} (4) ^",
    " ^ ^",
    " MEN 18-54^     D1B (1-4) & {VAR} (1)",
    " MEN 55+^       D1B (5-6) & {VAR} (1)",
    " WOMEN 18-54^   D1B (1-4) & {VAR} (2)",
    " WOMEN 55+^     D1B (5-6) & {VAR} (2)"
  ],

  length_residence: [
    " LESS THAN 1 YEARS^          {VAR} (1)^",
    " 1 - 5 YEARS^                {VAR} (2)^",
    " 6 - 10 YEARS^               {VAR} (3)^",
    " 11 - 19 YEARS^              {VAR} (4)^",
    " 20 - 29 YEARS^              {VAR} (5)^",
    " 30 - 39 YEARS^              {VAR} (6)^",
    " 40 OR MORE YEARS/NATIVE^    {VAR} (7)^",
    " UNSURE/REFUSED^             {VAR} (8)^",
    " ^                       ^",
    " TOTAL 0-5 YEARS^            {VAR} (1-2)^",
    " TOTAL 0-10 YEARS^           {VAR} (1-3)^",
    " TOTAL 0-19 YEARS^           {VAR} (1-4)^",
    " TOTAL 20+ YEARS/NATIVE^     {VAR} (5-7)^"
  ],

  education: [
    " **D/S (TOT <COLL - TOT COLL+)^  CALC F10-F11,V10-V11              ^SX",
    " ATTENDED/GRADUATED HIGH SCHOOL^        {VAR} (1)^",
    " TECHNICAL OR VOCATIONAL SCHOOL DEGREE^ {VAR} (2)^",
    " SOME COLLEGE/ASSOCIATES DEGREE^        {VAR} (3)^",
    " GRADUATED COLLEGE^                     {VAR} (4)^",
    " GRADUATE/PROFESSIONAL SCHOOL DEGREE^   {VAR} (5)^",
    " UNSURE/REFUSED^                        {VAR} (6)^",
    " ^                       ^",
    " TOTAL SOME COLL^             {VAR} (2-3)^",
    " TOTAL LESS THAN COLL^        {VAR} (1-3) ^",
    " TOTAL COLL GRAD+^            {VAR} (4-5)^"
  ],

  party: [
    " **D/S (GOP - DEM)^  CALC F2-F3,V2-V3               ^SX",
    " REPUBLICAN^                    {VAR} (1)^",
    " DEMOCRAT^                      {VAR} (2)^",
    " SOMETHING ELSE/INDEPENDENT^    {VAR} (3)^",
    " REFUSED^                       {VAR} (4)^",
    " ^ ^",
    " GOP MEN^       {VAR}(1) & D2(1)",
    " GOP WOMEN^     {VAR}(1) & D2(2)",
    " IND MEN^       {VAR}(3) & D2(1)",
    " IND WOMEN^     {VAR}(3) & D2(2)",
    " DEM MEN^       {VAR}(2) & D2(1)",
    " DEM WOMEN^     {VAR}(2) & D2(2)",
    " ^ ^",
    " GOP 18-54^     {VAR}(1) & D1B(1-4)",
    " GOP 55+^       {VAR}(1) & D1B(5-6)",
    " IND 18-54^     {VAR}(3) & D1B(1-4)",
    " IND 55+^       {VAR}(3) & D1B(5-6)",
    " DEM 18-54^     {VAR}(2) & D1B(1-4)",
    " DEM 55+^       {VAR}(2) & D1B(5-6)"
  ],

  ethnicity: [
    " **D/S (TOT WHITE - TOT VOC)^        CALC F2-F3,V2-V3       ^SX",
    " WHITE^                              {VAR}              (1)    ^",
    " TOTAL VOTERS OF COLOR^              {VAR}              (2-7)  ^L-,SX",
    "  HISPANIC OR LATINO^                {VAR}              (2)    ^",
    "  AFRICAN AMERICAN OR BLACK^         {VAR}              (3)    ^",
    "  ASIAN AMERICAN^                    {VAR}              (4)    ^",
    "  MIDDLE EASTERN^                    {VAR}              (5)    ^",
    "  NATIVE AMERICAN^                   {VAR}              (6)    ^",
    "  OTHER OR A COMBINATION (SPECIFY)^  {VAR}              (7)    ^"
  ],

  homeowner: [
    " **D/S (OWN - RENT)^  CALC F2-F3,V2-V3               ^SX",
    " OWN^                       {VAR} (1)^",
    " RENT^                      {VAR} (2)^",
    " SOMETHING ELSE^            {VAR} (3)^",
    " REFUSED^                   {VAR} (4)^"
  ],

  children: [
    " **D/S (YES - NO)^  CALC F2-F3,V2-V3               ^SX",
    " PARENT^    {{VAR}_1 (1) or {VAR}_2 (1) or {VAR}_3 (1)}^L-,SX",
    " BALANCE^   {{VAR}_4(1) OR {VAR}_5(1) OR {VAR}_6(1) and {not {{VAR}_1 (1) or {VAR}_2 (1) or {VAR}_3 (1)}}}^L-,SX",
    "   NOT YET IN KINDERGARTEN^          {VAR}_1 (1)",
    "   KINDERGARTEN THROUGH SIXTH GRADE^ {VAR}_2 (1)",
    "   MIDDLE OR HIGH SCHOOL^            {VAR}_3 (1)",
    " GRADUATED^                          {VAR}_4 (1)",
    " NONE OF THESE^                      {VAR}_5 (1)",
    " DON T HAVE CHILDREN^                {VAR}_6 (1)",
    " REFUSED^                            {VAR}_7 (1)"
  ],

  financial_situation: [
    " **D/S (TOT COMFORTABLY - TOT STRUGGLING)^  CALC F2-F3,V2-V3               ^SX",
    " TOTAL COMFORTABLY^                                 {VAR} (1-2)^L-,SX",
    " TOTAL GETTING/STRUGGLING^                          {VAR} (3-4)^L-,SX",
    "   LIVING COMFORTABLY WITH INCREASING SAVINGS^      {VAR} (1)",
    "   LIVING COMFORTABLY BUT NOT INCREASING SAVINGS^   {VAR} (2)",
    "   JUST GETTING BY FINANCIALLY^                     {VAR} (3)",
    "   REALLY STRUGGLING FINANCIALLY^                   {VAR} (4)",
    " PREFER NOT TO ANSWER^                              {VAR} (5)"
  ]
};

let tables = [];
let editingIndex = null;
let editingArrayGroupId = null;
let editingArrayGroupStartIndex = null;

const projectTypeSelect = document.getElementById("projectType");
const questionCodeInput = document.getElementById("questionCode");
const questionTypeSelect = document.getElementById("questionType");
const rowTypeSelect = document.getElementById("rowType");
const rowTypeBox = document.getElementById("rowTypeBox");
const questionTextInput = document.getElementById("questionText");

const answerOptionsInput = document.getElementById("answerOptions");
const answerOptionsBox = document.getElementById("answerOptionsBox");

const useCustomNetGroupsCheckbox = document.getElementById("useCustomNetGroups");
const customNetGroupBox = document.getElementById("customNetGroupBox");
const customNetGroupsInput = document.getElementById("customNetGroups");
const buildCustomDSBtn = document.getElementById("buildCustomDSBtn");
const customDSBox = document.getElementById("customDSBox");
const customDSPositiveSelect = document.getElementById("customDSPositive");
const customDSNegativeSelect = document.getElementById("customDSNegative");

const demographicSetupPanel = document.getElementById("demographicSetupPanel");
const demographicAdditionalCodesInput = document.getElementById("demographicAdditionalCodes");

const normalOptionsBox = document.getElementById("normalOptionsBox");
const useSTCheckbox = document.getElementById("useST");
const useDSCheckbox = document.getElementById("useDS");
const useDSBox = document.getElementById("useDSBox");
const subtitleBox = document.getElementById("subtitleBox");
const subtitleOnlyInput = document.getElementById("subtitleOnly");
const manualUseIndexInput = document.getElementById("manualUseIndex");

const baseTypeSelect = document.getElementById("baseType");
const askedBaseBox = document.getElementById("askedBaseBox");
const askedBaseTextBox = document.getElementById("askedBaseTextBox");
const askedBaseTextInput = document.getElementById("askedBaseText");

const arraySampleSetupBox = document.getElementById("arraySampleSetupBox");
const useArraySampleSetupCheckbox = document.getElementById("useArraySampleSetup");
const arraySampleExtraRowsInput = document.getElementById("arraySampleExtraRows");
const buildArraySampleBtn = document.getElementById("buildArraySampleBtn");

const arraySampleModal = document.getElementById("arraySampleModal");
const closeArraySampleModalBtn = document.getElementById("closeArraySampleModalBtn");
const saveArraySampleModalBtn = document.getElementById("saveArraySampleModalBtn");
const arraySampleTableContainer = document.getElementById("arraySampleTableContainer");

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
const splitRowsContainer = document.getElementById("splitRowsContainer");
const addSplitRowBtn = document.getElementById("addSplitRowBtn");

const listoutSetupPanel = document.getElementById("listoutSetupPanel");
const listoutManualSectionsInput = document.getElementById("listoutManualSections");

const includeVersionSectionCheckbox = document.getElementById("includeVersionSection");
const versionExtraRowsInput = document.getElementById("versionExtraRows");

const includeModeSectionCheckbox = document.getElementById("includeModeSection");
const modeExtraRowsInput = document.getElementById("modeExtraRows");

const includeDateSectionCheckbox = document.getElementById("includeDateSection");
const dateVariableInput = document.getElementById("dateVariable");
const startDateInput = document.getElementById("startDateInput");
const endDateInput = document.getElementById("endDateInput");

const toggleVersionExtraBtn = document.getElementById("toggleVersionExtraBtn");
const versionExtraBox = document.getElementById("versionExtraBox");

const toggleModeExtraBtn = document.getElementById("toggleModeExtraBtn");
const modeExtraBox = document.getElementById("modeExtraBox");

const toggleDateSetupBtn = document.getElementById("toggleDateSetupBtn");
const dateSetupBox = document.getElementById("dateSetupBox");

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

function getArrayItemLabels(questionCodes) {
  const subtitleLines = subtitleOnlyInput.value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return questionCodes.map((code, index) => {
    return subtitleLines[index] || code;
  });
}

function createSplitRow(label = "", variable = "", code = "") {
  if (!splitRowsContainer) {
    return;
  }

  const row = document.createElement("div");
  row.className = "split-row";

  row.innerHTML = `
    <input class="split-row-label" type="text" value="${label}" placeholder="Label" />
    <input class="split-row-variable" type="text" value="${variable}" placeholder="Logic" />
    <input class="split-row-code" type="text" value="${code}" placeholder="Code" />
    <button type="button" class="remove-split-row-btn secondary">×</button>
  `;

  splitRowsContainer.appendChild(row);
}

function buildListoutSyntax(regionLogic, excelData) {
    const listoutLines = [];

    listoutLines.push("TLISTOUT_" + regionLogic + "^1");
    listoutLines.push("OR,OV,0%,F%,BH,RV,S2,P0,V2,SA,SP");
    listoutLines.push("LISTOUT " + regionLogic + ".");
    listoutLines.push("BASE=TOTAL SAMPLE^TN^1");
    listoutLines.push("SECTION^     ^L-");

    const regionGroups = {};

    // ExcelData = [{CODE, LABEL, REGION}]
    excelData.forEach(row => {
        if (!regionGroups[row.REGION]) regionGroups[row.REGION] = [];
        regionGroups[row.REGION].push({code: row.CODE, label: row.LABEL});
    });

    let regionIndex = 1;
    for (const regionName in regionGroups) {
        const childRows = regionGroups[regionName];

        // Group row, indent 3 spaces
        listoutLines.push(`   ${regionName.toUpperCase()}^     ${regionLogic} (${regionIndex})         ^`);

        childRows.forEach((child, i) => {
            // Child row, indent 6 spaces
            listoutLines.push(`      ${child.CODE}^      ^ PRECINCT (${i+1 + ((regionIndex-1)*childRows.length)})         ^`);
        });

        regionIndex++;
    }

    return listoutLines.join("\n");
}

function resetSplitRows() {
  if (!splitRowsContainer) {
    return;
  }

  splitRowsContainer.innerHTML = "";
  createSplitRow("A", "SplitAB", "1");
  createSplitRow("B", "SplitAB", "2");
}

function getSplitRowsFromInput() {
  const rows = [...splitRowsContainer.querySelectorAll(".split-row")];

  return rows.map(row => {
    const label = row.querySelector(".split-row-label").value.trim();
    const variable = row.querySelector(".split-row-variable").value.trim();
    const code = row.querySelector(".split-row-code").value.trim();

    return {
      label,
      variable,
      code,
      options: "HR,SX"
    };
  }).filter(row => row.label && row.variable && row.code);
}

function loadSplitRowsToInput(splitRows) {
  splitRowsContainer.innerHTML = "";

  if (!splitRows || splitRows.length === 0) {
    resetSplitRows();
    return;
  }

  splitRows.forEach(row => {
    createSplitRow(row.label || "", row.variable || "", row.code || "");
  });
}

function parseRankingMetrics(text) {
  const lines = String(text || "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return lines.map(line => {
    /*
      Supported:
      % EXT IMPT (:1)
      % EXT/VERY IMPT (:1-2)
      % TOT IMPT (:1-3)

      Also supports:
      % EXT IMPT | 1
      % EXT/VERY IMPT | 1-2
    */

    if (line.includes("|")) {
      const parts = line.split("|").map(part => part.trim());

      if (parts.length < 2) {
        return null;
      }

      return {
        label: normalizeRankingMetricLabel(parts[0]),
        code: normalizeRankingMetricCode(parts[1])
      };
    }

    const match = line.match(/^(.*?)\s*\(\s*:?\s*([0-9,\-]+)\s*\)\s*$/);

    if (!match) {
      return null;
    }

    return {
      label: normalizeRankingMetricLabel(match[1]),
      code: normalizeRankingMetricCode(match[2])
    };
  }).filter(item => {
    return item !== null && item.label !== "" && item.code !== "";
  });
}

function normalizeRankingMetricLabel(label) {
  return String(label || "")
    .replace(/^RANKED\s+BY\s+/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function normalizeRankingMetricCode(code) {
  return String(code || "")
    .replace(/^:/, "")
    .trim();
}

const normalRowTypeOptions = [
  { value: "", text: "Please select a type...", disabled: true },
  { value: "custom_code", text: "CUSTOM CODE" },
  { value: "important", text: "TOT IMPORTANT / TOT NOT IMPORTANT" },
  { value: "good_bad", text: "TOT GOOD / TOT BAD" },
  { value: "agree_disagree", text: "TOT AGREE / TOT DISAGREE" },
  { value: "accept_unaccept", text: "TOT ACCEPT / TOT UNACCEPT" },
  { value: "confident_not_confident", text: "TOT CONFIDENT / TOT NOT CONFIDENT" },
  { value: "yes_no", text: "TOT YES / TOT NO" },
  { value: "more_less_likely", text: "TOT MORE LIKELY / TOT LESS LIKELY" },
  { value: "convincing_not_convincing", text: "TOT CONVINCING / TOT NOT CONVINCING" },
  { value: "adequate_inadequate", text: "TOT ADEQUATE / TOT INADEQUATE" }
];

const demographicRowTypeOptions = [
  { value: "", text: "Please select a demographic type...", disabled: true },
  { value: "age", text: "AGE" },
  { value: "gender", text: "GENDER" },
  { value: "length_residence", text: "LENGTH OF RESIDENCE" },
  { value: "education", text: "EDUCATION" },
  { value: "party", text: "PARTY" },
  { value: "ethnicity", text: "ETHNICITY" },
  { value: "homeowner", text: "HOMEOWNER" },
  { value: "children", text: "CHILDREN" },
  { value: "financial_situation", text: "FINANCIAL SITUATION" },
  { value: "custom_code", text: "CUSTOM CODE" }
];

function populateRowTypeOptions(options, selectedValue = "") {
  rowTypeSelect.innerHTML = "";

  options.forEach(optionData => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;

    if (optionData.disabled) {
      option.disabled = true;
    }

    if (optionData.value === selectedValue) {
      option.selected = true;
    }

    rowTypeSelect.appendChild(option);
  });

  if (!selectedValue) {
    rowTypeSelect.value = "";
  }
}

function togglePlusSection(button, box, openText, closeText) {
  const isHidden = box.classList.contains("hidden");

  if (isHidden) {
    box.classList.remove("hidden");
    button.textContent = closeText;
  } else {
    box.classList.add("hidden");
    button.textContent = openText;
  }
}

function openPlusSection(button, box, closeText) {
  box.classList.remove("hidden");
  button.textContent = closeText;
}

function closePlusSection(button, box, openText) {
  box.classList.add("hidden");
  button.textContent = openText;
}

function toggleUseDSBox() {
  const isCustomCode = normalizeRowType(rowTypeSelect.value) === "custom_code";
  const isMultipleChoice = questionTypeSelect.value === "multiple_choice";

  const isSummaryOrRanking =
    questionTypeSelect.value === "summary_table" ||
    questionTypeSelect.value === "ranking_table" ||
    questionTypeSelect.value === "listout_table";

  if (isCustomCode || isMultipleChoice || isSummaryOrRanking) {
    useDSBox.classList.add("hidden");
  } else {
    useDSBox.classList.remove("hidden");
  }
}

function toggleCustomNetGroupBox() {
  if (useCustomNetGroupsCheckbox.checked) {
    customNetGroupBox.classList.remove("hidden");
  } else {
    customNetGroupBox.classList.add("hidden");
    customDSBox.classList.add("hidden");
  }
}

function toggleAnswerOptionsBox() {
  const isCustomCode = normalizeRowType(rowTypeSelect.value) === "custom_code";
  const isMultipleChoice = questionTypeSelect.value === "multiple_choice";
  const isArray = questionTypeSelect.value === "array";

  const isSummaryOrRanking =
    questionTypeSelect.value === "summary_table" ||
    questionTypeSelect.value === "ranking_table" ||
    questionTypeSelect.value === "listout_table";

  if ((isCustomCode || isMultipleChoice || isArray) && !isSummaryOrRanking) {
    answerOptionsBox.classList.remove("hidden");
  } else {
    answerOptionsBox.classList.add("hidden");
  }
}

function convertClientLogicToWincross(logicText) {
  return String(logicText || "")
    .replace(/\bAND\b/gi, "&")
    .replace(/\bOR\b/gi, "or")
    .replace(/\b([A-Z]+\d+(?:_\d+)?)\s*:\s*([0-9,\-]+)\b/gi, function (_, variable, codes) {
      return variable.toUpperCase() + "(" + codes + ")";
    })
    .replace(/\s+/g, " ")
    .trim();
}

function parseAdditionalCodes(text) {
  if (!text.trim()) {
    return [];
  }

  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => {
      const parts = line.split(/\t+/);

      let label = "";
      let logic = "";

      if (parts.length >= 2) {
        label = parts[0].trim();
        logic = parts.slice(1).join(" ").trim();
      } else {
        const firstLogicIndex = line.search(/\b[A-Z]+\d+(?:_\d+)?\s*:/i);

        if (firstLogicIndex === -1) {
          return null;
        }

        label = line.slice(0, firstLogicIndex).trim();
        logic = line.slice(firstLogicIndex).trim();
      }

      if (!label || !logic) {
        return null;
      }

      return {
        label,
        logic: convertClientLogicToWincross(logic)
      };
    })
    .filter(item => item !== null);
}

function buildAdditionalCodeLines(additionalCodesText) {
  const items = parseAdditionalCodes(additionalCodesText);

  if (items.length === 0) {
    return [];
  }

  const lines = [" ^ ^"];

  items.forEach(item => {
    lines.push(
      " " +
      item.label.padEnd(28) +
      "^ " +
      item.logic
    );
  });

  return lines;
}

function buildDemographicTemplateLines(table) {
  const rowType = normalizeRowType(table.rowType);

  if (rowType === "custom_code") {
    const lines = [];

    const dsLine = buildCustomDSLine(table);

    if (dsLine) {
      lines.push(dsLine);
    }

    buildCustomNetGroupLines(table).forEach(line => lines.push(line));

    buildRowsFromAnswerOptions(
      table.answerOptions,
      table.questionCode,
      table.customNetGroups || []
    ).forEach(line => lines.push(line));

    buildAdditionalCodeLines(table.demographicAdditionalCodes || "").forEach(line => {
      lines.push(line);
    });

    return lines;
  }

  const template = demographicTemplates[rowType];

  if (!template) {
    return ["*** ERROR: DEMOGRAPHIC TEMPLATE NOT FOUND - " + table.rowType + " ***"];
  }

  const lines = template.map(line => {
    return line.replaceAll("{VAR}", table.questionCode);
  });

  buildAdditionalCodeLines(table.demographicAdditionalCodes || "").forEach(line => {
    lines.push(line);
  });

  return lines;
}

function parseRankingItems(text) {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  return lines.map(line => {
    // Format có dấu |:
    // 7 | INCREASING SAFETY FOR DRIVERS | 1
    // 24. | If we don't take care... | 2
    if (line.includes("|")) {
      const parts = line.split("|").map(part => part.trim());

      const questionNumber = parts[0]
        .replace(/^Q/i, "")
        .replace(/[.)]$/, "")
        .trim();

      return {
        questionCode: "Q" + questionNumber,
        label: parts[1] || "",
        splitSuffix: parts[2] || ""
      };
    }

    // Format thường:
    // 24 If we don't take care...
    // 24. If we don't take care...
    // 24) If we don't take care...
    // Q24 If we don't take care...
    // Q24. If we don't take care...
    const match = line.match(/^Q?(\d+)[.)]?\s+(.+)$/i);

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

  const splitRows = useSplitABCheckbox.checked
    ? getSplitRowsFromInput()
    : [];

  if (useSplitABCheckbox.checked && splitRows.length === 0) {
    alert("Please add at least one Split Row first.");
    return;
  }

  const rows = items.map((item, index) => {
    const splitOptions = splitRows.map((splitRow, splitIndex) => {
      const suffixValue = String(splitIndex + 1);
      const labelText =
        splitRow.label +
        " - " +
        splitRow.variable +
        " (" +
        splitRow.code +
        ")";

      return `
        <option value="${suffixValue}" ${item.splitSuffix === suffixValue ? "selected" : ""}>
          ${labelText}
        </option>
      `;
    }).join("");

    return `
      <tr>
        <td>${item.questionCode}</td>
        <td>${item.label}</td>
        <td>
          <select class="ranking-split-select" data-index="${index}">
            <option value="">Blank</option>
            ${splitOptions}
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
          <th>Split Row</th>
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

  const splitRows = table.splitRows && table.splitRows.length
    ? table.splitRows
    : [
        { label: "A", variable: "SplitAB", code: "1", options: "HR,SX" },
        { label: "B", variable: "SplitAB", code: "2", options: "HR,SX" }
      ];

  return splitRows.map(row => {
    return (
      " " +
      row.label +
      "^ " +
      row.variable +
      " (" +
      row.code +
      ") ^HR,SX"
    );
  });
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
  if (table.questionType === "listout_table") {
    return " " + formatListoutTitle(table.questionText);
  }

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
  const askedBaseText = String(table.askedBaseText || "").trim();

  if (table.baseType === "asked_base") {
    if (!askedBaseText) {
      return " BASE=TOTAL SAMPLE^TN^" + tnValue;
    }

    return " BASE=" + askedBaseText + "^TN^" + tnValue;
  }

  return " BASE=TOTAL SAMPLE^TN^" + tnValue;
}

function formatYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return "" + year + month + day;
}

function normalizeListoutSectionTitle(title) {
  return String(title || "").trim().toUpperCase();
}

function defaultVariableForListoutSection(title) {
  const cleanTitle = normalizeListoutSectionTitle(title);

  const map = {
    REGION: "REGION_CODED",
    VERSION: "SplitAB",
    SAMPLE: "SplitAB",
    MODE: "modetype",
    DATE: "submitdate"
  };

  return map[cleanTitle] || cleanTitle.replace(/\s+/g, "_");
}

function isNumericLabel(label) {
  return /^[0-9]+$/.test(String(label || "").trim());
}

function parseListoutManualSections(text) {
  const rawLines = String(text || "").split("\n");
  const sections = [];
  let currentSection = null;

  rawLines.forEach(rawLine => {
    const trimmedLine = rawLine.replace(/\r/g, "").trim();

    if (!trimmedLine) {
      return;
    }

    const parts = trimmedLine.split("|").map(part => part.trim());

    /*
      Supported header formats:
      Region
      Region | REGION_CODED
    */
    if (parts.length === 1) {
      currentSection = {
        title: normalizeListoutSectionTitle(parts[0]),
        defaultVariable: defaultVariableForListoutSection(parts[0]),
        rows: []
      };

      sections.push(currentSection);
      return;
    }

    if (parts.length === 2 && !/^[0-9,\-:]+$/.test(parts[1])) {
      currentSection = {
        title: normalizeListoutSectionTitle(parts[0]),
        defaultVariable: parts[1],
        rows: []
      };

      sections.push(currentSection);
      return;
    }

    /*
      Supported row formats:
      ARCHULETA | 1-8              => use current section variable
      3065904001 | 1               => use current section variable
      ARCHULETA | REGION_CODED | 1-8
      3065904001 | REGION_CODED | 1
    */
    if (!currentSection) {
      currentSection = {
        title: "SECTION",
        defaultVariable: "VARIABLE",
        rows: []
      };

      sections.push(currentSection);
    }

    if (parts.length === 2) {
      currentSection.rows.push({
        label: parts[0],
        variable: currentSection.defaultVariable,
        code: parts[1].replace(":", "-"),
        isGroup: false
      });

      return;
    }

    if (parts.length >= 3) {
      currentSection.rows.push({
        label: parts[0],
        variable: parts[1],
        code: parts[2].replace(":", "-"),
        isGroup: false
      });
    }
  });

  // Detect group rows after parsing
  sections.forEach(section => {
    section.rows.forEach((row, index) => {
      const nextRow = section.rows[index + 1];

      const hasRange = row.code.includes("-") || row.code.includes(",");
      const nextHasSameCode =
        nextRow &&
        nextRow.code === row.code &&
        isNumericLabel(nextRow.label);

      row.isGroup = hasRange || nextHasSameCode;
    });
  });

  return sections;
}

function buildListoutManualSectionLines(text) {
  const sections = parseListoutManualSections(text);
  const lines = [];

  sections.forEach(section => {
    lines.push(" " + section.title + "^    ^L-");

    section.rows.forEach(row => {
      const indent = row.isGroup ? "   " : "    ";
      const spaceBeforeParen = row.isGroup ? "" : " ";

      lines.push(
        indent +
        row.label.padEnd(18) +
        "^     " +
        row.variable +
        spaceBeforeParen +
        "(" +
        row.code +
        ")"
      );
    });
  });

  return lines;
}

function parsePipeRows(text) {
  return String(text || "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => {
      const parts = line.split("|").map(part => part.trim());

      return {
        label: parts[0] || "",
        variable: parts[1] || "",
        code: parts[2] || ""
      };
    })
    .filter(row => row.label && row.variable && row.code);
}

function buildListoutVersionLines(extraRowsText) {
  const lines = [
    " VERSION^     ^L-",
    "   SAMPLE A^           SplitAB (1)",
    "   SAMPLE B^           SplitAB (2)"
  ];

  const extraRows = parsePipeRows(extraRowsText);

  extraRows.forEach(row => {
    lines.push(
      "   " +
      row.label.padEnd(18) +
      "^     " +
      row.variable +
      " (" +
      row.code +
      ")"
    );
  });

  return lines;
}


function buildListoutModeLines(extraRowsText) {
  const lines = [
    " MODE^        ^L-",
    "   LANDLINE^          modetype (1)",
    "   CELL^              modetype (2)",
    "   TEXT^              modetype (3)",
    "   EMAIL^             modetype (4)"
  ];

  const extraRows = parsePipeRows(extraRowsText);

  extraRows.forEach(row => {
    lines.push(
      "   " +
      row.label.padEnd(18) +
      "^     " +
      row.variable +
      " (" +
      row.code +
      ")"
    );
  });

  return lines;
}

function parseYYYYMMDD(value) {
  const clean = String(value || "").trim();

  if (!/^\d{8}$/.test(clean)) {
    return null;
  }

  const year = Number(clean.slice(0, 4));
  const month = Number(clean.slice(4, 6)) - 1;
  const day = Number(clean.slice(6, 8));

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return "" + year + month + day;
}

function formatListoutDateLabel(date) {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ];

  return weekdays[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();
}

function buildListoutDateLines(dateVariable, startDateText, endDateText) {
  const startDate = parseYYYYMMDD(startDateText);
  const endDate = parseYYYYMMDD(endDateText);

  if (!startDate || !endDate) {
    return [];
  }

  if (endDate < startDate) {
    return [
      " DATE^        ^L-",
      " *** ERROR: END DATE MUST BE AFTER START DATE ***"
    ];
  }

  const variable = dateVariable || "submitdate";
  const lines = [" DATE^        ^L-"];

  const current = new Date(startDate);

  while (current <= endDate) {
    const code = formatYYYYMMDD(current);
    const label = formatListoutDateLabel(current);

    lines.push(
      "   " +
      label.padEnd(20) +
      "^     " +
      variable +
      " (" +
      code +
      ")"
    );

    current.setDate(current.getDate() + 1);
  }

  return lines;
}

function buildListoutTableLines(table) {
  const lines = [];

  buildListoutManualSectionLines(table.listoutManualSections || "").forEach(line => {
    lines.push(line);
  });

  if (table.includeVersionSection) {
    buildListoutVersionLines(table.versionExtraRows || "").forEach(line => {
      lines.push(line);
    });
  }

  if (table.includeModeSection) {
    buildListoutModeLines(table.modeExtraRows || "").forEach(line => {
      lines.push(line);
    });
  }

  if (table.includeDateSection) {
    buildListoutDateLines(
      table.dateVariable || "submitdate",
      table.startDate || "",
      table.endDate || ""
    ).forEach(line => {
      lines.push(line);
    });
  }

  return lines;
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
  return String(label || "")
    .replace(/\s*\(DO NOT READ\)/gi, "")
    .replace(/\s*\(DNR\)/gi, "")
    .trim()
    .toUpperCase();
}

function buildRowsFromAnswerOptions(answerOptionsText, questionCode, netGroups = []) {
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

    const shouldIndent = isAnswerCodeInsideNetGroups(code, netGroups);

    const indent = shouldIndent ? "   " : " ";

    return (
      indent +
      label.padEnd(30) +
      "^ " +
      questionCode +
      " (" +
      code +
      ") ^"
    );
  });
}

function parseAnswerOptions(answerOptionsText) {
  if (!answerOptionsText) {
    return [];
  }

  return answerOptionsText
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => {
      const match = line.match(/^(\d+)\s+(.+)$/);

      if (!match) {
        return null;
      }

      return {
        code: match[1],
        label: cleanAnswerLabel(match[2])
      };
    })
    .filter(item => item !== null);
}

function normalizeCustomCodeRange(value) {
  return String(value || "")
    .trim()
    .replace(/:/g, "-");
}

function parseCustomNetGroups(text) {
  if (!text.trim()) {
    return [];
  }

  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .map(line => {
      /*
        New format giống Answer Options:
        1-2 TOTAL YES
        3-4 TOTAL NO
        1:2 TOTAL YES
        3:4 TOTAL NO

        Still support old format:
        TOTAL YES | 1-2
        TOTAL NO | 3-4
      */

      if (line.includes("|")) {
        const parts = line.split("|").map(part => part.trim());

        if (parts.length < 2) {
          return null;
        }

        return {
        label: String(parts[0] || "").trim().toUpperCase(),
        range: normalizeCustomCodeRange(parts[1]),
        options: "L-,SX"
      };
      }

      const match = line.match(/^([0-9]+(?:[-:,][0-9]+)*)\s+(.+)$/);

      if (!match) {
        return null;
      }

      return {
        range: normalizeCustomCodeRange(match[1]),
        label: match[2].trim().toUpperCase(),
        options: "L-,SX"
      };
    })
    .filter(item => item !== null && item.label !== "" && item.range !== "");
}

function expandCodeRange(rangeText) {
  const cleanRange = String(rangeText || "")
    .trim()
    .replace(":", "-");

  if (!cleanRange) {
    return [];
  }

  if (!cleanRange.includes("-")) {
    return [cleanRange];
  }

  const parts = cleanRange.split("-");
  const start = parseInt(parts[0], 10);
  const end = parseInt(parts[1], 10);

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return [];
  }

  const codes = [];

  for (let i = start; i <= end; i++) {
    codes.push(String(i));
  }

  return codes;
}

function isAnswerCodeInsideNetGroups(answerCode, netGroups) {
  return netGroups.some(group => {
    const codes = expandCodeRange(group.range);
    return codes.includes(String(answerCode));
  });
}

function buildCustomDSSetup() {
  const netGroups = useCustomNetGroupsCheckbox.checked
    ? parseCustomNetGroups(customNetGroupsInput.value)
    : [];

  const answerOptions = parseAnswerOptions(answerOptionsInput.value);

  const dsChoices = [
    ...netGroups.map((group, index) => {
      return {
        type: "net",
        label: group.label,
        rowNumber: index + 2
      };
    }),

    ...answerOptions.map((option, index) => {
      return {
        type: "answer",
        label: option.label,
        rowNumber: netGroups.length + index + 2
      };
    })
  ];

  if (dsChoices.length === 0) {
    alert("Please enter Total / Net Groups or Answer Options first.");
    return;
  }

  customDSPositiveSelect.innerHTML = "";
  customDSNegativeSelect.innerHTML = "";

  dsChoices.forEach(choice => {
    const value = choice.type + "|" + choice.label + "|" + choice.rowNumber;

    const positiveOption = document.createElement("option");
    positiveOption.value = value;
    positiveOption.textContent = choice.label;

    const negativeOption = document.createElement("option");
    negativeOption.value = value;
    negativeOption.textContent = choice.label;

    customDSPositiveSelect.appendChild(positiveOption);
    customDSNegativeSelect.appendChild(negativeOption);
  });

  if (dsChoices.length >= 2) {
    customDSPositiveSelect.value =
      dsChoices[0].type + "|" + dsChoices[0].label + "|" + dsChoices[0].rowNumber;

    customDSNegativeSelect.value =
      dsChoices[dsChoices.length - 1].type +
      "|" +
      dsChoices[dsChoices.length - 1].label +
      "|" +
      dsChoices[dsChoices.length - 1].rowNumber;
  }

  customDSBox.classList.remove("hidden");
}

function buildCustomNetGroupLines(table) {
  const netGroups = table.customNetGroups || [];

  return netGroups.map(group => {
    return (
      " " +
      group.label.padEnd(30) +
      "^ " +
      table.questionCode +
      " (" +
      group.range +
      ") ^" +
      group.options
    );
  });
}

function parseCustomDSValue(value) {
  const parts = String(value || "").split("|");

  return {
    type: parts[0] || "",
    label: parts[1] || "",
    rowNumber: Number(parts[2] || 0)
  };
}

function buildCustomDSLine(table) {
  if (!table.customDSPositive || !table.customDSNegative) {
    return "";
  }

  const positive = parseCustomDSValue(table.customDSPositive);
  const negative = parseCustomDSValue(table.customDSNegative);

  if (!positive.rowNumber || !negative.rowNumber) {
    return "";
  }

  return (
    " **D/S (" +
    positive.label +
    " - " +
    negative.label +
    ")^ CALC F" +
    positive.rowNumber +
    "-F" +
    negative.rowNumber +
    ",V" +
    positive.rowNumber +
    "-V" +
    negative.rowNumber +
    "^SX"
  );
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
    const block = parseSummaryBlockHeader(line);

    if (block) {
      currentBlock = block;
      blocks.push(currentBlock);
      return;
    }

    if (!currentBlock) {
      currentBlock = {
        sourceCode: "",
        title: "SUMMARY BLOCK",
        dsPositiveCode: "",
        dsNegativeCode: "",
        rows: [],
        warnings: []
      };

      blocks.push(currentBlock);
    }

    const row = parseSummaryRowLine(line, currentBlock.sourceCode);

    if (row) {
      currentBlock.rows.push(row);
    } else {
      currentBlock.warnings.push(line);
    }
  });

  return blocks;
}

function parseSummaryBlockHeader(line) {
  /*
    Đọc được:
    Q1/2. COMB INITIAL BALLOT D/S (:1-2 MINUS 6-7)
    Q34/35. FINAL BALLOT D/S (:1-2 MINUS 6-7)
    Q1/2 COMB INITIAL BALLOT D/S
  */
  const match = line.match(/^(Q?\d+(?:\/\d+)*)\.?\s+(.+)$/i);

  if (!match) {
    return null;
  }

  const rawSource = match[1].replace(/^Q/i, "").trim();
  let rawTitle = match[2].trim();

  // Nếu phần sau có dạng Q...: thì đây có thể là row logic, không phải block title
  if (/\bQ?\d+(?:\/\d+)*\s*:/i.test(rawTitle)) {
    return null;
  }

  const dsInfo = extractSummaryDSInfo(rawTitle);

  rawTitle = rawTitle
    .replace(/\s*\(:.*?\)\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    sourceCode: "Q" + rawSource,
    title: normalizeSummaryTitle(rawTitle),
    dsPositiveCode: dsInfo.positiveCode,
    dsNegativeCode: dsInfo.negativeCode,
    rows: [],
    warnings: []
  };
}

function extractSummaryDSInfo(title) {
  const match = String(title || "").match(/\(:\s*([0-9,\-]+)\s*(?:MINUS|-)\s*:?\s*([0-9,\-]+)\s*\)/i);

  if (!match) {
    return {
      positiveCode: "",
      negativeCode: ""
    };
  }

  return {
    positiveCode: match[1].trim(),
    negativeCode: match[2].trim()
  };
}

function parseSummaryBlockHeader(line) {
  /*
    Supported:
    Q1/2. COMB INITIAL BALLOT D/S (:1-2 MINUS 6-7)
    Q1/2 COMB INITIAL BALLOT D/S
    Q34/35. FINAL BALLOT D/S (:1-2 MINUS 6-7)
    Q2/3 INIT BALLOT – COMB D/S
  */

  const match = line.match(/^(Q?\d+(?:\/\d+)*)\.?\s+(.+)$/i);

  if (!match) {
    return null;
  }

  const rawSource = match[1].replace(/^Q/i, "").trim();
  let rawTitle = match[2].trim();

  // Tránh nhận nhầm row cũ kiểu TOTAL YES Q1/2:1-2 làm block title.
  if (/\bQ?\d+(?:\/\d+)*\s*:/i.test(rawTitle)) {
    return null;
  }

  const dsInfo = extractSummaryDSInfo(rawTitle);

  rawTitle = rawTitle
    .replace(/\s*\(:.*?\)\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return {
    sourceCode: "Q" + rawSource,
    title: normalizeSummaryTitle(rawTitle),
    dsPositiveCode: dsInfo.positiveCode,
    dsNegativeCode: dsInfo.negativeCode,
    rows: [],
    warnings: []
  };
}

function extractSummaryDSInfo(title) {
  /*
    Supported:
    (:1-2 MINUS 6-7)
    (:1-2 minus :6-7)
    (:1-2 - 6-7)
  */

  const cleanTitle = String(title || "").trim();

  const minusMatch = cleanTitle.match(/\(:\s*([0-9,\-]+)\s*(?:MINUS|-)\s*:?\s*([0-9,\-]+)\s*\)/i);

  if (!minusMatch) {
    return {
      positiveCode: "",
      negativeCode: ""
    };
  }

  return {
    positiveCode: minusMatch[1].trim(),
    negativeCode: minusMatch[2].trim()
  };
}

function parseSummaryRowLine(line, sourceCode) {
  /*
    Format A:
    TOTAL YES (:1-2)
    TOTAL NO (:6-7)
    LEAN/UND (:3-5)
  */
  const inheritMatch = line.match(/^(.+?)\s+\(:\s*([0-9,\-]+)\s*\)\s*$/i);

  if (inheritMatch) {
    return {
      label: normalizeSummaryLabel(inheritMatch[1]),
      logic: sourceCode + ":" + inheritMatch[2].trim()
    };
  }

  /*
    Format B:
    TOTAL YES Q1/2:1-2
    TOTAL NO Q34/35:6-7
  */
  const oldLogicIndex = line.search(/\bQ?\d+(?:\/\d+)*\s*:/i);

  if (oldLogicIndex !== -1) {
    return {
      label: normalizeSummaryLabel(line.slice(0, oldLogicIndex)),
      logic: normalizeSummaryLogicText(line.slice(oldLogicIndex).trim())
    };
  }

  /*
    Format C:
    TOTAL YES Q1 (1-2) OR Q2 (1-2)
    TOTAL NO Q1 (6-7) OR Q2 (6-7)
  */
  const parenLogicIndex = line.search(/\bQ\d+\s*\(/i);

  if (parenLogicIndex !== -1) {
    return {
      label: normalizeSummaryLabel(line.slice(0, parenLogicIndex)),
      logic: normalizeSummaryLogicText(line.slice(parenLogicIndex).trim())
    };
  }

  /*
    Format D:
    MOVE TO YES ((Q1:3-7 OR Q2:3-7) AND (Q34:1-2 OR Q35:1-2))
  */
  const doubleParenExpression = line.match(/^(.+?)\s+\(\((.+)\)\)\s*$/i);

  if (doubleParenExpression) {
    return {
      label: normalizeSummaryLabel(doubleParenExpression[1]),
      logic: normalizeSummaryLogicText(doubleParenExpression[2].trim())
    };
  }

  /*
    Format E:
    MOVE TO YES (Q1:3-7 OR Q2:3-7)
  */
  const singleExpression = line.match(/^(.+?)\s+\((Q\d+:.+)\)\s*$/i);

  if (singleExpression) {
    return {
      label: normalizeSummaryLabel(singleExpression[1]),
      logic: normalizeSummaryLogicText(singleExpression[2].trim())
    };
  }

  return null;
}

function normalizeSummaryLogicText(logic) {
  return String(logic || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\bAND\b/gi, "AND")
    .replace(/\bOR\b/gi, "OR")
    .replace(/\s+/g, " ")
    .trim();
}

function formatSimpleQGroup(token) {
  const clean = token.trim();
  const match = clean.match(/^Q?([\d\/]+)\s*:\s*([0-9,\-]+)$/i);

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
  const match = clean.match(/^Q?([\d\/]+)\s*:\s*([0-9,\-]+)$/i);

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
  const cleanLogic = String(logic || "").trim();

  if (!cleanLogic) {
    return "";
  }

  /*
    Simple:
    Q1/2:1-2
    Q34/35:6-7
  */
  if (/^Q?\d+(?:\/\d+)*\s*:\s*[0-9,\-]+$/i.test(cleanLogic)) {
    return formatSimpleQGroup(cleanLogic);
  }

  /*
    Already near-WinCross:
    Q1 (1-2) OR Q2 (1-2)
  */
  if (/\bQ\d+\s*\([^)]+\)/i.test(cleanLogic) && !cleanLogic.includes(":")) {
    return formatAlreadyParenthesizedSummaryLogic(cleanLogic);
  }

  /*
    Complex:
    Q1:3-7 OR Q2:3-7 AND Q34:1-2 OR Q35:1-2
    (Q1:3-7 OR Q2:3-7) AND (Q34:1-2 OR Q35:1-2)
  */
  return formatComplexSummaryExpression(cleanLogic);
}

function formatAlreadyParenthesizedSummaryLogic(logic) {
  return String(logic || "")
    .replace(/\bAND\b/gi, "&")
    .replace(/\bOR\b/gi, "or")
    .replace(/\s+/g, " ")
    .trim();
}

function formatComplexSummaryExpression(expression) {
  let text = String(expression || "").trim();

  text = text
    .replace(/\bAND\b/gi, "&")
    .replace(/\bOR\b/gi, "or");

  /*
    Convert parenthesized groups:
    (Q1:3-7 or Q2:3-7)
    → {Q1(3-7) or Q2(3-7)}
  */
  text = text.replace(/\(([^()]*Q\d+:[^()]*)\)/gi, function (_, groupContent) {
    return "{" + convertSummaryExpressionTokens(groupContent) + "}";
  });

  /*
    Convert remaining Q tokens:
    Q1:3-7 → Q1(3-7)
  */
  text = convertSummaryExpressionTokens(text);

  return text
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+or\s+/gi, " or ")
    .replace(/\s+/g, " ")
    .trim();
}

function convertSummaryExpressionTokens(text) {
  return String(text || "").replace(/\bQ(\d+)\s*:\s*([0-9,\-]+)\b/gi, function (_, qnum, codes) {
    return "Q" + qnum + "(" + codes + ")";
  });
}

function buildSummarySetup() {
  const parsedBlocks = parseSummaryRawText(summaryRawInput.value);

  const typedCount = parseInt(summaryBlockCountInput.value, 10);
  const requestedCount = Number.isNaN(typedCount)
    ? parsedBlocks.length || 1
    : typedCount;

  summaryBlockSetupContainer.innerHTML = "";

  for (let i = 0; i < requestedCount; i++) {
    const block = parsedBlocks[i] || {
      sourceCode: "",
      title: "",
      dsPositiveCode: "",
      dsNegativeCode: "",
      rows: [],
      warnings: []
    };

    const card = document.createElement("div");
    card.className = "summary-block-card";
    card.dataset.index = i;

    const rowOptions = block.rows.map(row => {
      return `<option value="${row.label}">${row.label}</option>`;
    }).join("");

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
      const positiveDefault =
        block.rows.find(row => {
          return block.dsPositiveCode && row.logic.includes(":" + block.dsPositiveCode);
        }) ||
        block.rows.find(row => /TOT\s+YES|TOTAL\s+YES|YES/i.test(row.label));

      if (positiveDefault) {
        positiveSelect.value = positiveDefault.label;
      }
    }

    if (negativeSelect) {
      const negativeDefault =
        block.rows.find(row => {
          return block.dsNegativeCode && row.logic.includes(":" + block.dsNegativeCode);
        }) ||
        block.rows.find(row => /TOT\s+NO|TOTAL\s+NO|NO/i.test(row.label));

      if (negativeDefault) {
        negativeSelect.value = negativeDefault.label;
      }
    }
  }

  openSummaryModalBtn.classList.remove("hidden");
  openSummaryModal();

  console.log("Parsed summary blocks:", parsedBlocks);
  console.log("Requested summary blocks:", requestedCount);
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

  const isArrayAskedBase =
  questionTypeSelect.value === "array" &&
  baseTypeSelect.value === "asked_base";

if (
  baseTypeSelect.value === "asked_base" &&
  !isArrayAskedBase &&
  !askedBaseTextInput.value.trim()
) {
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
        rankingItems,

        useSplitAB: useSplitABCheckbox.checked,
        splitRows: getSplitRowsFromInput(),

        summaryRaw: "",
        summaryBlocks: [],
        arrayGroupId: "",
        arrayPosition: 0
      };
    });
  }

  if (questionTypeSelect.value === "multiple_choice") {
    const answerOptions = parseAnswerOptions(answerOptionsInput.value);

    if (answerOptions.length === 0) {
      alert("Please enter Answer Options for Multiple Choice.");
      return null;
    }

    const useNetGroups = useCustomNetGroupsCheckbox.checked;
    const customNetGroups = useNetGroups
      ? parseCustomNetGroups(customNetGroupsInput.value)
      : [];

    return [{
      projectType: projectTypeSelect.value || "N2",
      questionCode: questionCodes[0],
      questionType: "multiple_choice",
      rowType: "multiple_choice",
      questionText,
      useST: false,
      useDS: false,
      subtitleOnly: "",
      baseType: baseTypeSelect.value,
      askedBaseText: askedBaseTextInput.value.trim(),
      manualUseIndex: "",
      answerOptions: answerOptionsInput.value.trim(),

      useCustomNetGroups: useNetGroups,
      customNetGroups,
      customNetGroupsRaw: useNetGroups ? customNetGroupsInput.value.trim() : "",
      customDSPositive: useNetGroups ? customDSPositiveSelect.value || "" : "",
      customDSNegative: useNetGroups ? customDSNegativeSelect.value || "" : "",

      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    }];
  }

  if (questionTypeSelect.value === "demographic") {
    if (!rowTypeSelect.value) {
      alert("Please select Demographic Row Type.");
      return null;
    }

    return [{
      projectType: projectTypeSelect.value || "N2",
      questionCode: questionCodes[0],
      questionType: "demographic",
      rowType: rowTypeSelect.value,
      questionText,
      useST: false,
      useDS: false,
      subtitleOnly: "",
      baseType: baseTypeSelect.value,
      askedBaseText: askedBaseTextInput.value.trim(),
      manualUseIndex: "",
      answerOptions: answerOptionsInput.value.trim(),

      customNetGroups: parseCustomNetGroups(customNetGroupsInput.value),
      customNetGroupsRaw: customNetGroupsInput.value.trim(),
      customDSPositive: customDSPositiveSelect.value || "",
      customDSNegative: customDSNegativeSelect.value || "",

      demographicAdditionalCodes: demographicAdditionalCodesInput.value.trim(),

      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    }];
  }

  if (questionTypeSelect.value === "listout_table") {
  return [{
    projectType: projectTypeSelect.value || "N2",
    questionCode: normalizeQuestionCode(questionCodes[0] || "LISTOUT"),
    questionType: "listout_table",
    rowType: "listout_table",
    questionText,
    useST: false,
    useDS: false,
    subtitleOnly: "",
    baseType: "total_sample",
    askedBaseText: "",
    manualUseIndex: "",
    answerOptions: "",

    listoutManualSections: listoutManualSectionsInput.value.trim(),

    includeVersionSection: includeVersionSectionCheckbox.checked,
    versionExtraRows: versionExtraRowsInput.value.trim(),

    includeModeSection: includeModeSectionCheckbox.checked,
    modeExtraRows: modeExtraRowsInput.value.trim(),

    includeDateSection: includeDateSectionCheckbox.checked,
    dateVariable: dateVariableInput.value.trim() || "submitdate",
    startDate: startDateInput.value.trim(),
    endDate: endDateInput.value.trim(),

    summaryRaw: "",
    summaryBlocks: [],
    rankingMetricDefinitions: "",
    rankingItemsRaw: "",
    rankingItems: [],
    arrayGroupId: "",
    arrayPosition: 0
  }];
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
      questionType: "summary_table",
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

if (
  baseTypeSelect.value === "asked_base" &&
  !isArrayAskedBase &&
  questionCodes.length > 1
) {

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

const arraySampleSelections =
  questionTypeSelect.value === "array" &&
  baseTypeSelect.value === "asked_base" &&
  useArraySampleSetupCheckbox.checked
    ? getArraySampleSelections()
    : [];

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

    askedBaseText:
      arraySampleSelections[index]?.sampleName ||
      askedBaseItems[index] ||
      askedBaseItems[0] ||
      "",

    useArraySampleSetup:
      questionTypeSelect.value === "array" &&
      baseTypeSelect.value === "asked_base" &&
      useArraySampleSetupCheckbox.checked,

    arraySampleExtraRowsRaw: arraySampleExtraRowsInput.value.trim(),

    arraySampleSelections: arraySampleSelections.map(item => item.sampleName || ""),

    manualUseIndex: manualUseIndexInput.value.trim(),
    answerOptions: answerOptionsInput.value.trim(),

    customNetGroups: parseCustomNetGroups(customNetGroupsInput.value),
    customNetGroupsRaw: customNetGroupsInput.value.trim(),
    customDSPositive: customDSPositiveSelect.value || "",
    customDSNegative: customDSNegativeSelect.value || "",

    summaryRaw: "",
    summaryBlocks: [],
    arrayGroupId,
    arrayPosition: isArrayRange ? index : 0
  };
});
}

function buildRankingTitle(baseTitle, metricLabel) {
  let cleanBaseTitle = String(baseTitle || "")
    .replace(/\s+/g, " ")
    .trim();

  const cleanMetricLabel = normalizeRankingMetricLabel(metricLabel);

  /*
    Nếu user lỡ nhập sẵn metric trong Question Text,
    app sẽ cố gắng cắt bớt để tránh duplicate.
    Ví dụ:
    SUMMARY OF FUNDING ITEMS: RANKED BY % EXT/VERY IMPT
    → SUMMARY OF FUNDING ITEMS: RANKED BY
  */
  cleanBaseTitle = cleanBaseTitle
    .replace(/\s*%+\s*EXT\/VERY\s+IMPT.*$/i, "")
    .replace(/\s*%+\s*EXT\s+IMPT.*$/i, "")
    .replace(/\s*%+\s*TOT\s+IMPT.*$/i, "")
    .trim();

  if (!cleanBaseTitle) {
    return cleanMetricLabel;
  }

  /*
    Nếu title đã kết thúc bằng "RANKED BY",
    nối trực tiếp metric vào sau.
  */
  if (/RANKED\s+BY$/i.test(cleanBaseTitle)) {
    return cleanBaseTitle + " " + cleanMetricLabel;
  }

  /*
    Nếu title kết thúc bằng dấu ":" thì nối space + metric.
  */
  if (cleanBaseTitle.endsWith(":")) {
    return cleanBaseTitle + " " + cleanMetricLabel;
  }

  return cleanBaseTitle + ": " + cleanMetricLabel;
}

function formatListoutTitle(title) {
  const cleanTitle = String(title || "").trim();

  if (!cleanTitle) {
    return "Region./Sample./Mode./Date.";
  }

  // Nếu user đã nhập đúng dạng Region./Sample./Mode. thì giữ nguyên
  if (cleanTitle.includes("./")) {
    return cleanTitle;
  }

  // Convert comma-separated title
  return cleanTitle
    .split(",")
    .map(part => part.trim())
    .filter(part => part !== "")
    .map(part => part.replace(/\.$/, "") + ".")
    .join("/");
}

function addTable() {
  const oldEditingTable =
    editingIndex !== null ? tables[editingIndex] : null;

  const newTables = collectTablesFromInput();

  if (!newTables) return;

  if (editingArrayGroupId !== null) {
    const groupId = editingArrayGroupId;

    const groupIndexes = tables
      .map((table, index) => {
        return { table, index };
      })
      .filter(item => {
        return item.table.questionType === "array" && item.table.arrayGroupId === groupId;
      })
      .map(item => item.index);

    const startIndex =
      groupIndexes.length > 0
        ? Math.min(...groupIndexes)
        : editingArrayGroupStartIndex || 0;

    const updatedTables = newTables.map((table, index) => {
      return {
        ...table,
        arrayGroupId: groupId,
        arrayPosition: index
      };
    });

    tables = tables.filter(table => {
      return !(table.questionType === "array" && table.arrayGroupId === groupId);
    });

    tables.splice(startIndex, 0, ...updatedTables);

    exitEditMode();
  } else if (editingIndex !== null) {
    const updatedTable = newTables[0];

    if (
      oldEditingTable &&
      oldEditingTable.questionType === "array" &&
      oldEditingTable.arrayGroupId &&
      updatedTable.questionType === "array"
    ) {
      updatedTable.arrayGroupId = oldEditingTable.arrayGroupId;
      updatedTable.arrayPosition = oldEditingTable.arrayPosition;
    }

    tables[editingIndex] = updatedTable;
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

function getArrayGroupTables(groupId) {
  return tables
    .map((table, index) => {
      return { table, index };
    })
    .filter(item => {
      return item.table.questionType === "array" && item.table.arrayGroupId === groupId;
    })
    .sort((a, b) => {
      return (a.table.arrayPosition || 0) - (b.table.arrayPosition || 0);
    });
}

function compressQuestionCodesToRange(questionCodes) {
  if (!questionCodes || questionCodes.length === 0) {
    return "";
  }

  if (questionCodes.length === 1) {
    return questionCodes[0];
  }

  const first = questionCodes[0];
  const last = questionCodes[questionCodes.length - 1];

  const firstMatch = first.match(/^([A-Z]+)(\d+)$/i);
  const lastMatch = last.match(/^([A-Z]+)(\d+)$/i);

  if (!firstMatch || !lastMatch) {
    return questionCodes.join(",");
  }

  const firstPrefix = firstMatch[1].toUpperCase();
  const lastPrefix = lastMatch[1].toUpperCase();

  if (firstPrefix !== lastPrefix) {
    return questionCodes.join(",");
  }

  return first + ":" + lastMatch[2];
}

function editArrayGroup(index) {
  const clickedTable = tables[index];

  if (!clickedTable || !clickedTable.arrayGroupId) {
    return;
  }

  const groupItems = getArrayGroupTables(clickedTable.arrayGroupId);

  if (groupItems.length === 0) {
    return;
  }

  const groupTables = groupItems.map(item => item.table);
  const firstTable = groupTables[0];

  editingIndex = groupItems[0].index;
  editingArrayGroupId = clickedTable.arrayGroupId;
  editingArrayGroupStartIndex = groupItems[0].index;

  const questionCodes = groupTables.map(table => table.questionCode);

  projectTypeSelect.value = firstTable.projectType || "N2";
  questionCodeInput.value = compressQuestionCodesToRange(questionCodes);
  questionTypeSelect.value = "array";
  questionTextInput.value = firstTable.questionText || "";

  populateRowTypeOptions(normalRowTypeOptions, firstTable.rowType || "");
  rowTypeSelect.value = firstTable.rowType || "";

  baseTypeSelect.value = firstTable.baseType || "total_sample";
  askedBaseTextInput.value = groupTables
    .map(table => table.askedBaseText || "")
    .filter(value => value !== "")
    .join(",");

  useSTCheckbox.checked = !!firstTable.useST;
  useDSCheckbox.checked = firstTable.useDS !== false;

  subtitleOnlyInput.value = groupTables
    .map(table => table.subtitleOnly || "")
    .join("\n");

  manualUseIndexInput.value = firstTable.manualUseIndex || "";
  answerOptionsInput.value = firstTable.answerOptions || "";

  customNetGroupsInput.value = firstTable.customNetGroupsRaw || "";
  useCustomNetGroupsCheckbox.checked = !!firstTable.customNetGroupsRaw;
  toggleCustomNetGroupBox();

  if (firstTable.customNetGroupsRaw || firstTable.answerOptions) {
    buildCustomDSSetup();

    if (firstTable.customDSPositive) {
      customDSPositiveSelect.value = firstTable.customDSPositive;
    }

    if (firstTable.customDSNegative) {
      customDSNegativeSelect.value = firstTable.customDSNegative;
    }
  } else {
    customDSBox.classList.add("hidden");
  }

  if (firstTable.baseType === "asked_base") {
    arraySampleExtraRowsInput.value = firstTable.arraySampleExtraRowsRaw || "";
    useArraySampleSetupCheckbox.checked = firstTable.useArraySampleSetup !== false;

    toggleAskedBaseBox();

    buildArraySampleSetup();

    const selects = [...arraySampleTableContainer.querySelectorAll(".array-sample-select")];

    const selections = groupTables.map(table => {
      return table.askedBaseText || "";
    });

    selects.forEach((select, i) => {
      select.value = selections[i] || "";
    });

    closeArraySampleModal();
  }

  toggleQuestionTypeUI();
  toggleAskedBaseBox();
  toggleAnswerOptionsBox();
  toggleSubtitleBox();
  toggleUseDSBox();

  addBtn.textContent = "Update Array Group";
  cancelEditBtn.classList.remove("hidden");

  renderInputList();
}

function editTable(index) {
  const table = tables[index];

  if (
    table &&
    table.questionType === "array" &&
    table.arrayGroupId
  ) {
    editArrayGroup(index);
    return;
  }

  editingIndex = index;

  projectTypeSelect.value = table.projectType || "N2";
  questionCodeInput.value = table.questionCode;
  questionTypeSelect.value = table.questionType;
  rowTypeSelect.value = table.rowType || "";
  questionTextInput.value = table.questionText || "";

  baseTypeSelect.value = table.baseType || "total_sample";
  askedBaseTextInput.value = table.askedBaseText || "";

  useSTCheckbox.checked = !!table.useST;
  useDSCheckbox.checked = table.useDS !== false;
  subtitleOnlyInput.value = table.subtitleOnly || "";
  manualUseIndexInput.value = table.manualUseIndex || "";
  answerOptionsInput.value = table.answerOptions || "";

  toggleQuestionTypeUI();
  toggleAskedBaseBox();
  toggleAnswerOptionsBox();
  toggleSubtitleBox();
  toggleUseDSBox();

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

} else if (table.questionType === "array") {
  rowTypeSelect.value = table.rowType || "";
  answerOptionsInput.value = table.answerOptions || "";

  customNetGroupsInput.value = table.customNetGroupsRaw || "";
  useCustomNetGroupsCheckbox.checked = !!table.customNetGroupsRaw;
  toggleCustomNetGroupBox();

  if (table.customNetGroupsRaw) {
    buildCustomDSSetup();

    if (table.customDSPositive) {
      customDSPositiveSelect.value = table.customDSPositive;
    }

    if (table.customDSNegative) {
      customDSNegativeSelect.value = table.customDSNegative;
    }
  } else {
    customDSBox.classList.add("hidden");
  }

  if (table.baseType === "asked_base") {
    arraySampleExtraRowsInput.value = table.arraySampleExtraRowsRaw || "";
    useArraySampleSetupCheckbox.checked = table.useArraySampleSetup !== false;

    toggleAskedBaseBox();

    // Rebuild popup table so old selection can be restored
    if (table.useArraySampleSetup) {
      buildArraySampleSetup();

      const selects = [...arraySampleTableContainer.querySelectorAll(".array-sample-select")];
      const selections = table.arraySampleSelections || [];

      selects.forEach((select, i) => {
        if (selections[i]) {
          select.value = selections[i];
        }
      });

      // Đừng tự mở popup khi edit nếu không muốn
      closeArraySampleModal();
    }
  }

  toggleAnswerOptionsBox();
  toggleAskedBaseBox();

  } else if (table.questionType === "demographic") {
  populateRowTypeOptions(demographicRowTypeOptions, table.rowType);
  rowTypeSelect.value = table.rowType;

  demographicAdditionalCodesInput.value = table.demographicAdditionalCodes || "";

  answerOptionsInput.value = table.answerOptions || "";

  customNetGroupsInput.value = table.customNetGroupsRaw || "";
  buildCustomDSSetup();

  if (table.customDSPositive) {
    customDSPositiveSelect.value = table.customDSPositive;
  }

  if (table.customDSNegative) {
    customDSNegativeSelect.value = table.customDSNegative;
  }

  if (!table.customNetGroupsRaw && !table.answerOptions) {
    customDSBox.classList.add("hidden");
  }

} else if (table.questionType === "multiple_choice") {
  answerOptionsInput.value = table.answerOptions || "";

  useCustomNetGroupsCheckbox.checked = table.useCustomNetGroups || false;
  toggleCustomNetGroupBox();

  customNetGroupsInput.value = table.customNetGroupsRaw || "";
  buildCustomDSSetup();

  if (table.customDSPositive) {
    customDSPositiveSelect.value = table.customDSPositive;
  }

  if (table.customDSNegative) {
    customDSNegativeSelect.value = table.customDSNegative;
  }

  if (!table.useCustomNetGroups) {
    customDSBox.classList.add("hidden");
  }

  } else if (table.questionType === "listout_table") {
  listoutManualSectionsInput.value = table.listoutManualSections || "";

  includeVersionSectionCheckbox.checked = table.includeVersionSection !== false;
  versionExtraRowsInput.value = table.versionExtraRows || "";

  includeModeSectionCheckbox.checked = table.includeModeSection !== false;
  modeExtraRowsInput.value = table.modeExtraRows || "";

  includeDateSectionCheckbox.checked = table.includeDateSection !== false;
  dateVariableInput.value = table.dateVariable || "submitdate";
  startDateInput.value = table.startDate || "";
  endDateInput.value = table.endDate || "";

  if (table.versionExtraRows) {
    openPlusSection(toggleVersionExtraBtn, versionExtraBox, "− Hide VERSION Extra Rows");
  } else {
    closePlusSection(toggleVersionExtraBtn, versionExtraBox, "+ Add VERSION Extra Rows");
  }

  if (table.modeExtraRows) {
    openPlusSection(toggleModeExtraBtn, modeExtraBox, "− Hide MODE Extra Rows");
  } else {
    closePlusSection(toggleModeExtraBtn, modeExtraBox, "+ Add MODE Extra Rows");
  }

  if (table.startDate || table.endDate) {
    openPlusSection(toggleDateSetupBtn, dateSetupBox, "− Hide DATE Range");
  } else {
    closePlusSection(toggleDateSetupBtn, dateSetupBox, "+ Add DATE Range");
  }

} else if (table.questionType === "ranking_table") {
  rankingMetricDefinitionsInput.value = table.rankingMetricDefinitions || "";
  rankingItemsInput.value = table.rankingItemsRaw || "";
  useSplitABCheckbox.checked = !!table.useSplitAB;

  loadSplitRowsToInput(table.splitRows || []);


  toggleSplitABBox();

  rankingSplitTableContainer.innerHTML = "";

  if (table.rankingItems && table.rankingItems.length > 0) {
  const splitRows = table.splitRows && table.splitRows.length
    ? table.splitRows
    : getSplitRowsFromInput();

  const rows = table.rankingItems.map((item, index) => {
    const splitOptions = splitRows.map((splitRow, splitIndex) => {
      const suffixValue = String(splitIndex + 1);
      const labelText =
        splitRow.label +
        " - " +
        splitRow.variable +
        " (" +
        splitRow.code +
        ")";

      return `
        <option value="${suffixValue}" ${item.splitSuffix === suffixValue ? "selected" : ""}>
          ${labelText}
        </option>
      `;
    }).join("");

    return `
      <tr>
        <td>${item.questionCode}</td>
        <td>${item.label}</td>
        <td>
          <select class="ranking-split-select" data-index="${index}">
            <option value="">Blank</option>
            ${splitOptions}
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
          <th>Split Row</th>
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
  
  customNetGroupsInput.value = table.customNetGroupsRaw || "";
  buildCustomDSSetup();

  if (table.customDSPositive) {
    customDSPositiveSelect.value = table.customDSPositive;
  }

  if (table.customDSNegative) {
    customDSNegativeSelect.value = table.customDSNegative;
  }

  if (!table.customNetGroupsRaw) {
    customDSBox.classList.add("hidden");
  }

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
  editingArrayGroupId = null;
  editingArrayGroupStartIndex = null;

  addBtn.textContent = "Add Table";
  cancelEditBtn.classList.add("hidden");
}

function getArrayGroupDisplayInfo(groupItems) {
  const groupTables = groupItems.map(item => item.table);
  const firstTable = groupTables[0];

  const questionCodes = groupTables.map(table => table.questionCode);
  const questionCodeRange = compressQuestionCodesToRange(questionCodes);

  const bases = groupTables
    .map(table => table.askedBaseText || "TOTAL SAMPLE")
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(", ");

  return {
    firstTable,
    questionCodeRange,
    count: groupTables.length,
    bases
  };
}

function deleteArrayGroup(groupId) {
  tables = tables.filter(table => {
    return !(table.questionType === "array" && table.arrayGroupId === groupId);
  });

  if (editingArrayGroupId === groupId) {
    exitEditMode();
    clearInputFields();
  }

  renderInputList();
  generateOutput();
}

function renderInputList() {
  inputList.innerHTML = "";

  if (tables.length === 0) {
    inputList.innerHTML = `<div class="empty">No input yet.</div>`;
    return;
  }

  const renderedArrayGroups = new Set();

  tables.forEach((table, arrayIndex) => {
    /*
      Nếu là array group thì chỉ render 1 khung đại diện.
      Các table con cùng arrayGroupId sẽ bị skip.
    */
    if (table.questionType === "array" && table.arrayGroupId) {
      if (renderedArrayGroups.has(table.arrayGroupId)) {
        return;
      }

      renderedArrayGroups.add(table.arrayGroupId);

      const groupItems = getArrayGroupTables(table.arrayGroupId);

      if (groupItems.length === 0) {
        return;
      }

      const info = getArrayGroupDisplayInfo(groupItems);
      const firstIndex = groupItems[0].index;
      const lastIndex = groupItems[groupItems.length - 1].index;

      const item = document.createElement("div");
      item.className = "input-item";

      if (editingArrayGroupId === table.arrayGroupId) {
        item.classList.add("editing-note");
      }

      item.innerHTML = `
        <div>
          <div class="input-title">
            <span class="badge">${firstIndex + 1}-${lastIndex + 1}</span>
            ARRAY GROUP: ${info.questionCodeRange}
          </div>

          <div class="input-meta">
            Project Setting: ${info.firstTable.projectType || "N2"}<br>
            Question Code Range: ${info.questionCodeRange}<br>
            Question Type: array<br>
            Row Type: ${info.firstTable.rowType || "No row type"}<br>
            Tables in Group: ${info.count}<br>
            Base: ${info.bases || "TOTAL SAMPLE"}
          </div>
        </div>

        <div class="item-actions">
          <button class="secondary" onclick="editArrayGroup(${firstIndex})">Edit Group</button>
          <button class="danger" onclick="deleteArrayGroup('${table.arrayGroupId}')">Delete Group</button>
        </div>
      `;

      inputList.appendChild(item);
      return;
    }

    /*
      Non-array tables vẫn render bình thường.
    */
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

    if (table.questionType === "listout_table") {
  const listoutLines = buildListoutTableLines(table);
  listoutLines.forEach(line => block.push(line));
  blocks.push(block.join("\n"));
  return;
}

    if (table.questionType === "multiple_choice") {
  const dsLine = buildCustomDSLine(table);

  if (dsLine) {
    block.push(dsLine);
  }

  if (table.useCustomNetGroups) {
    const netGroupLines = buildMultipleChoiceNetGroupLines(table);
    netGroupLines.forEach(line => block.push(line));
  }

  const answerRows = buildMultipleChoiceAnswerRows(
    table.answerOptions,
    table.questionCode,
    table.useCustomNetGroups ? table.customNetGroups || [] : []
  );

  answerRows.forEach(line => block.push(line));

  blocks.push(block.join("\n"));
  return;
}

        if (table.questionType === "demographic") {
    const demographicLines = buildDemographicTemplateLines(table);
    demographicLines.forEach(line => block.push(line));
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

  blocks.push(block.join("\n"));
  return;

} else if (normalizeRowType(table.rowType) === "custom_code") {
      const dsLine = buildCustomDSLine(table);

      if (dsLine) {
        block.push(dsLine);
      }

      const netGroupLines = buildCustomNetGroupLines(table);
      netGroupLines.forEach(line => block.push(line));

      const answerRows = buildRowsFromAnswerOptions(
      table.answerOptions,
      table.questionCode,
      table.customNetGroups || []
    );

      answerRows.forEach(line => block.push(line));

    } else {
      const rowLines = buildRowTemplateLines(table);
      rowLines.forEach(line => block.push(line));
    }

    blocks.push(block.join("\n"));
  });

  output.textContent = blocks.join("\n");
}

function safeSetValue(element, value) {
  if (element) {
    element.value = value;
  }
}

function safeSetChecked(element, value) {
  if (element) {
    element.checked = value;
  }
}

function safeAddHidden(element) {
  if (element) {
    element.classList.add("hidden");
  }
}

function safeClearHTML(element) {
  if (element) {
    element.innerHTML = "";
  }
}

function clearInputFields() {
  projectTypeSelect.value = "N2";

  safeSetValue(questionCodeInput, "");
  safeSetValue(questionTypeSelect, "");
  safeSetValue(rowTypeSelect, "");
  safeSetValue(questionTextInput, "");

  populateRowTypeOptions(normalRowTypeOptions, "");

  safeSetValue(answerOptionsInput, "");
  safeSetChecked(useCustomNetGroupsCheckbox, false);
  safeSetValue(customNetGroupsInput, "");
  safeClearHTML(customDSPositiveSelect);
  safeClearHTML(customDSNegativeSelect);
  safeAddHidden(customDSBox);
  toggleCustomNetGroupBox();

  safeSetChecked(useSTCheckbox, false);
  safeSetChecked(useDSCheckbox, true);
  safeSetValue(subtitleOnlyInput, "");
  safeSetValue(manualUseIndexInput, "");

  safeSetValue(baseTypeSelect, "total_sample");
  safeSetValue(askedBaseTextInput, "");
  safeSetValue(arraySampleExtraRowsInput, "");
  safeClearHTML(arraySampleTableContainer);
  safeAddHidden(arraySampleModal);

  safeSetValue(demographicAdditionalCodesInput, "");

  safeSetValue(listoutManualSectionsInput, "");

  safeSetChecked(includeVersionSectionCheckbox, true);
  safeSetValue(versionExtraRowsInput, "");

  safeSetChecked(includeModeSectionCheckbox, true);
  safeSetValue(modeExtraRowsInput, "");

  safeSetChecked(includeDateSectionCheckbox, true);
  safeSetValue(dateVariableInput, "submitdate");
  safeSetValue(startDateInput, "");
  safeSetValue(endDateInput, "");

  if (toggleVersionExtraBtn && versionExtraBox) {
    closePlusSection(toggleVersionExtraBtn, versionExtraBox, "+ Add VERSION Extra Rows");
  }

  if (toggleModeExtraBtn && modeExtraBox) {
    closePlusSection(toggleModeExtraBtn, modeExtraBox, "+ Add MODE Extra Rows");
  }

  if (toggleDateSetupBtn && dateSetupBox) {
    closePlusSection(toggleDateSetupBtn, dateSetupBox, "+ Add DATE Range");
  }

  safeSetValue(rankingMetricDefinitionsInput, "");
  safeSetValue(rankingItemsInput, "");
  safeSetChecked(useSplitABCheckbox, false);

  if (splitRowsContainer) {
    resetSplitRows();
  }

  safeClearHTML(rankingSplitTableContainer);

  if (rankingSplitModal) {
    closeRankingSplitModal();
  }

  toggleSplitABBox();

  safeSetValue(summaryRawInput, "");
  safeSetValue(summaryBlockCountInput, "");
  safeClearHTML(summaryBlockSetupContainer);

  if (openSummaryModalBtn) {
    openSummaryModalBtn.classList.add("hidden");
  }

  if (summaryModal) {
    closeSummaryModal();
  }

  toggleQuestionTypeUI();
  toggleAnswerOptionsBox();
  toggleUseDSBox();
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
  const isAskedBase = baseTypeSelect.value === "asked_base";
  const isArray = questionTypeSelect.value === "array";

  if (!isAskedBase) {
    askedBaseBox.classList.add("hidden");
    askedBaseTextBox.classList.remove("hidden");
    arraySampleSetupBox.classList.add("hidden");
    return;
  }

  askedBaseBox.classList.remove("hidden");

  if (isArray) {
    askedBaseTextBox.classList.add("hidden");
    arraySampleSetupBox.classList.remove("hidden");

    if (useArraySampleSetupCheckbox) {
      useArraySampleSetupCheckbox.checked = true;
    }
  } else {
    askedBaseTextBox.classList.remove("hidden");
    arraySampleSetupBox.classList.add("hidden");
  }
}

function parseArraySampleLabels(text) {
  return String(text || "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");
}

function getArraySampleDefinitions() {
  const samples = [
    { name: "SAMPLE A" },
    { name: "SAMPLE B" }
  ];

  const extraLabels = parseArraySampleLabels(arraySampleExtraRowsInput.value);

  extraLabels.forEach(label => {
    samples.push({
      name: label.toUpperCase()
    });
  });

  return samples;
}

function buildArraySampleSetup() {
  const questionCodes = expandQuestionCodes(questionCodeInput.value.trim());

  if (questionCodes.length === 0) {
    alert("Please enter Question Code range first. Example: Q1:5");
    return;
  }

  if (questionTypeSelect.value !== "array") {
    alert("Array Sample Setup chỉ dùng cho Question Type = Array.");
    return;
  }

  if (baseTypeSelect.value !== "asked_base") {
    alert("Please choose Base Type = Asked Base first.");
    return;
  }

  const sampleDefs = getArraySampleDefinitions();

  const subtitleLines = subtitleOnlyInput.value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

  const rows = questionCodes.map((code, index) => {
    const options = sampleDefs.map(sample => {
      return `<option value="${sample.name}">${sample.name}</option>`;
    }).join("");

    return `
      <tr>
        <td>${code}</td>
        <td>${subtitleLines[index] || code}</td>
        <td>
          <select class="array-sample-select" data-index="${index}">
            <option value="">Blank</option>
            ${options}
          </select>
        </td>
      </tr>
    `;
  }).join("");

  arraySampleTableContainer.innerHTML = `
    <table class="array-sample-table">
      <thead>
        <tr>
          <th>Question Code</th>
          <th>Code Label / Subtitle</th>
          <th>Sample Name</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  arraySampleModal.classList.remove("hidden");
}

function getArraySampleSelections() {
  const selects = [...arraySampleTableContainer.querySelectorAll(".array-sample-select")];

  return selects.map(select => {
    return {
      sampleName: select.value || ""
    };
  });
}

function closeArraySampleModal() {
  arraySampleModal.classList.add("hidden");
}

function toggleArraySampleSetupBox() {
  toggleAskedBaseBox();
}

function toggleSplitABBox() {
  if (!useSplitABCheckbox || !splitABBox || !buildRankingSplitBtn) {
    return;
  }

  if (useSplitABCheckbox.checked) {
    splitABBox.classList.remove("hidden");
    buildRankingSplitBtn.classList.remove("hidden");
  } else {
    splitABBox.classList.add("hidden");
    buildRankingSplitBtn.classList.add("hidden");
  }
}

function buildMultipleChoiceVariable(baseQuestionCode, answerCode) {
  return baseQuestionCode + "_" + answerCode;
}

function buildMultipleChoiceAnswerRows(answerOptionsText, questionCode, netGroups = []) {
  const options = parseAnswerOptions(answerOptionsText);

  return options.map(option => {
    const variableName = buildMultipleChoiceVariable(questionCode, option.code);

    const shouldIndent = isAnswerCodeInsideNetGroups(option.code, netGroups);
    const indent = shouldIndent ? "   " : " ";

    return (
      indent +
      option.label.padEnd(30) +
      "^ " +
      variableName +
      " (1)^"
    );
  });
}

function buildMultipleChoiceNetGroupLines(table) {
  const netGroups = table.customNetGroups || [];

  return netGroups.map(group => {
    const codes = expandCodeRange(group.range);

    const logic = codes.map(code => {
      const variableName = buildMultipleChoiceVariable(table.questionCode, code);
      return variableName + " (1)";
    }).join(" or ");

    return (
      " " +
      group.label.padEnd(30) +
      "^ {" +
      logic +
      "}^" +
      group.options
    );
  });
}

const summarySetupPanel = document.getElementById("summarySetupPanel");

function toggleQuestionTypeUI() {
  const questionType = questionTypeSelect.value;

  summarySetupPanel.classList.add("hidden");
  rankingSetupPanel.classList.add("hidden");
  demographicSetupPanel.classList.add("hidden");
  listoutSetupPanel.classList.add("hidden");

  rowTypeBox.classList.remove("hidden");
  normalOptionsBox.classList.remove("hidden");

  if (questionType === "summary_table") {
    summarySetupPanel.classList.remove("hidden");
    rowTypeBox.classList.add("hidden");
    normalOptionsBox.classList.add("hidden");
    answerOptionsBox.classList.add("hidden");
      toggleUseDSBox();
      toggleAskedBaseBox();
    return;
  }

  if (questionType === "ranking_table") {
    rankingSetupPanel.classList.remove("hidden");
    rowTypeBox.classList.add("hidden");
    normalOptionsBox.classList.add("hidden");
    answerOptionsBox.classList.add("hidden");
      toggleUseDSBox();
      toggleAskedBaseBox();
    return;
  }

  if (questionType === "multiple_choice") {
    rowTypeBox.classList.add("hidden");
    normalOptionsBox.classList.add("hidden");
    answerOptionsBox.classList.remove("hidden");
    toggleCustomNetGroupBox();
      toggleUseDSBox();
      toggleAskedBaseBox();
    return;
  }

  if (questionType === "demographic") {
    demographicSetupPanel.classList.remove("hidden");
    normalOptionsBox.classList.add("hidden");
    populateRowTypeOptions(demographicRowTypeOptions, rowTypeSelect.value);
    toggleAnswerOptionsBox();
    toggleUseDSBox();
    toggleAskedBaseBox();
    return;
    
  }

  if (questionType === "listout_table") {
  listoutSetupPanel.classList.remove("hidden");

  rowTypeBox.classList.add("hidden");
  normalOptionsBox.classList.add("hidden");
  answerOptionsBox.classList.add("hidden");
  demographicSetupPanel.classList.add("hidden");
  summarySetupPanel.classList.add("hidden");
  rankingSetupPanel.classList.add("hidden");

  return;
}

  populateRowTypeOptions(normalRowTypeOptions, rowTypeSelect.value);
  toggleAnswerOptionsBox();
  toggleUseDSBox();
  toggleAskedBaseBox();
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

questionTypeSelect.addEventListener("change", function () {
  if (questionTypeSelect.value === "demographic") {
    populateRowTypeOptions(demographicRowTypeOptions, "");
  }

  if (
    questionTypeSelect.value === "single_choice" ||
    questionTypeSelect.value === "array" ||
    questionTypeSelect.value === ""
  ) {
    populateRowTypeOptions(normalRowTypeOptions, "");
  }

  toggleQuestionTypeUI();
  toggleAskedBaseBox();
});

rowTypeSelect.addEventListener("change", function () {
  toggleAnswerOptionsBox();
  toggleUseDSBox();
});
useSTCheckbox.addEventListener("change", toggleSubtitleBox);

baseTypeSelect.addEventListener("change", function () {
  toggleAskedBaseBox();
});

useCustomNetGroupsCheckbox.addEventListener("change", toggleCustomNetGroupBox);
buildSummarySetupBtn.addEventListener("click", buildSummarySetup);
openSummaryModalBtn.addEventListener("click", openSummaryModal);
closeSummaryModalBtn.addEventListener("click", closeSummaryModal);
saveSummaryModalBtn.addEventListener("click", closeSummaryModal);
buildCustomDSBtn.addEventListener("click", buildCustomDSSetup);

summaryModal.addEventListener("click", function (event) {
  if (event.target === summaryModal) {
    closeSummaryModal();
  }
});

populateRowTypeOptions(normalRowTypeOptions, "");
renderInputList();
generateOutput();
toggleQuestionTypeUI();
toggleAskedBaseBox();
toggleSubtitleBox();
toggleAskedBaseBox();
toggleAnswerOptionsBox();
toggleCustomNetGroupBox();

if (splitRowsContainer && splitRowsContainer.children.length === 0) {
  resetSplitRows();
}

toggleVersionExtraBtn.addEventListener("click", function () {
  togglePlusSection(
    toggleVersionExtraBtn,
    versionExtraBox,
    "+ Add VERSION Extra Rows",
    "− Hide VERSION Extra Rows"
  );
});

toggleModeExtraBtn.addEventListener("click", function () {
  togglePlusSection(
    toggleModeExtraBtn,
    modeExtraBox,
    "+ Add MODE Extra Rows",
    "− Hide MODE Extra Rows"
  );
});

toggleDateSetupBtn.addEventListener("click", function () {
  togglePlusSection(
    toggleDateSetupBtn,
    dateSetupBox,
    "+ Add DATE Range",
    "− Hide DATE Range"
  );
});

buildArraySampleBtn.addEventListener("click", buildArraySampleSetup);

closeArraySampleModalBtn.addEventListener("click", function () {
  arraySampleModal.classList.add("hidden");
});

saveArraySampleModalBtn.addEventListener("click", function () {
  arraySampleModal.classList.add("hidden");
});

arraySampleModal.addEventListener("click", function (event) {
  if (event.target === arraySampleModal) {
    arraySampleModal.classList.add("hidden");
  }
});

answerOptionsInput.addEventListener("blur", function () {
  answerOptionsInput.value = answerOptionsInput.value.toUpperCase();
});

customNetGroupsInput.addEventListener("blur", function () {
  customNetGroupsInput.value = customNetGroupsInput.value.toUpperCase();
});

if (addSplitRowBtn) {
  addSplitRowBtn.addEventListener("click", function () {
    createSplitRow("", "", "");
  });
}

if (splitRowsContainer) {
  splitRowsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-split-row-btn")) {
      const row = event.target.closest(".split-row");

      if (row) {
        row.remove();
      }
    }
  });
}

// -------------------- Region Mapping Listout Integration --------------------

const regionFileInput = document.getElementById("regionFileInput"); // <input type="file">
const regionLogicInput = document.getElementById("regionLogicVar");   // tên biến logic Region (VD: REGION2)
const applyRegionMappingBtn = document.getElementById("applyRegionMapping");

let regionData = [];  // Dữ liệu Excel

regionFileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Excel giả sử có cột CODE, LABEL, REGION
  regionData = XLSX.utils.sheet_to_json(sheet, { header: ["CODE","LABEL","REGION"], range: 1 });
});

applyRegionMappingBtn.addEventListener("click", () => {
  if (!regionLogicInput.value.trim()) {
    alert("Enter logic variable name for Region.");
    return;
  }
  if (!regionData.length) {
    alert("Upload Excel first.");
    return;
  }

  const regionLogicVar = regionLogicInput.value.trim().toUpperCase();

  // Nhóm các precinct theo Region
  const sections = {};
  regionData.forEach(r => {
    if (!sections[r.REGION]) sections[r.REGION] = [];
    sections[r.REGION].push({ label: r.LABEL, code: r.CODE });
  });

  // Build ListoutManualSections với indent chuẩn
  let manualSectionsText = "";
  let regionCounter = 1;

  Object.keys(sections).forEach(regionName => {
    // Region line, giảm indent 1 tab để thẳng hàng với North example
    manualSectionsText += `${regionName.toUpperCase()}^     ${regionLogicVar}    (${regionCounter})         ^\n`;

    sections[regionName].forEach(p => {
      // Precinct line, indent chuẩn (4 spaces)  
      manualSectionsText += `    ${p.label}^      PRECINCT   (${p.code})         ^\n`;
    });

    regionCounter++;
  });

  // Gán vào input Listout Manual Sections hiện tại
  const listoutManualSectionsInput = document.getElementById("listoutManualSections");
  listoutManualSectionsInput.value = manualSectionsText;

  // Gọi hàm generateOutput() của hệ thống
  if (typeof generateOutput === "function") {
    generateOutput();
  }

  alert("Region mapping applied successfully!");
});