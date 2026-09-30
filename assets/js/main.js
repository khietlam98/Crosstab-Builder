  /* ============================================================
    CROSSTAB BUILDER - main.js
    ------------------------------------------------------------
    Architecture refactor notes:
    - Syntax-generation logic (projectSettings, rowTemplates,
      demographicTemplates, D/S, NET, MEAN, RL, Array, Summary,
      Ranking, Listout builders) is UNCHANGED.
    - Single initialization entry point: init() on DOMContentLoaded.
    - All optional features (Region Mapping, Summary/Ranking/Array
      modals, Split Rows, Listout extras) are isolated behind their
      own init function and a null-check, so a missing/renamed DOM
      element can never break the core Crosstab Builder.
    - generateOutput() only reads tables and writes output.value.
      It no longer touches outputEdited or saves the session.
    ============================================================ */

  let sortable = null;
  let outputEdited = false;
  let outputSyncDebounceTimer = null;

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
    ],

    support_oppose: [
      " **D/S (TOT SUPPORT - TOT OPPOSE)^  CALC F2-F3,V2-V3^SX",
      " TOTAL SUPPORT^              {VAR} (1-2) ^L-,SX",
      " TOTAL OPPOSE^               {VAR} (3-4) ^L-,SX",
      "   STRONGLY SUPPORT^         {VAR} (1) ^",
      "   SOMEWHAT SUPPORT^         {VAR} (2) ^",
      "   SOMEWHAT OPPOSE^          {VAR} (3) ^",
      "   STRONGLY OPPOSE^          {VAR} (4) ^",
      " DON’T KNOW ^                {VAR} (5) ^",
      " REFUSED^                    {VAR} (6) ^"
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

  const STORAGE_KEY = "crosstab_builder_session_v1";
  const LAST_QUESTION_TYPE_KEY = "crosstab_last_question_type";

  /* ---------------- Application state ---------------- */
  let tables = [];
  let editingIndex = null;
  let editingArrayGroupId = null;
  let editingArrayGroupStartIndex = null;
  let pendingArraySampleSelections = [];
  let autoSTFromArray = false;
  let regionData = [];

  /* F4 Crosstab List state: raw/editable rows are intentionally kept separate from parsed data. */
  let f4Rows = [];
  let f4ModalDraftRows = [];
  let f4SpssMetadata = { variables: new Map(), fileName: "" };
  let f4ExcelFileName = "";

  /* ---------------- DOM element references ----------------
    These are assigned inside cacheDomElements(), which runs
    from init() after DOMContentLoaded. Declaring them here
    (rather than with document.getElementById at parse time)
    means every function below can close over the same
    variables regardless of when the script tag executes.
  ------------------------------------------------------------ */
  let projectTypeSelect, questionCodeInput, questionTypeSelect, rowTypeSelect, rowTypeBox, questionTextInput;
  let answerOptionsInput, answerOptionsBox;
  let useCustomNetGroupsCheckbox, customNetGroupBox, customNetGroupsInput, buildCustomDSBtn, customDSBox, customDSPositiveSelect, customDSNegativeSelect;
  let demographicSetupPanel, demographicAdditionalCodesInput;
  let normalOptionsBox, useSTCheckbox, useDSCheckbox, useDSBox, sharedDSSetupBox;
  let useRankBox, useRankCheckbox, rankRLBox, rankRLCodesInput;
  let sharedMeanSetupBox, useMeanCheckbox, meanSetupBox, meanCodeRangeInput;
  let subtitleBox, subtitleOnlyInput, manualUseIndexInput;
  let askedBaseBox, askedBaseTextBox, askedBaseTextInput;
  let arraySampleSetupBox, buildArraySampleBtn;
  let arraySampleModal, closeArraySampleModalBtn, saveArraySampleModalBtn, arraySampleTableContainer;
  let summarySetupBox, summaryRawInput, summaryBlockCountInput, buildSummarySetupBtn, summaryBlockSetupContainer;
  let summaryModal, openSummaryModalBtn, closeSummaryModalBtn, saveSummaryModalBtn;
  let summarySetupPanel;
  let rankingSetupPanel, rankingMetricDefinitionsInput, rankingItemsInput;
  let useSplitABCheckbox, splitABBox, splitRowsContainer, addSplitRowBtn;
  let listoutSetupPanel, listoutManualSectionsInput;
  let includeVersionSectionCheckbox, versionExtraRowsInput;
  let includeModeSectionCheckbox, modeExtraRowsInput;
  let includeDateSectionCheckbox, dateVariableInput, startDateInput, endDateInput;
  let toggleVersionExtraBtn, versionExtraBox;
  let toggleModeExtraBtn, modeExtraBox;
  let toggleDateSetupBtn, dateSetupBox;
  let buildRankingSplitBtn, rankingSplitModal, closeRankingSplitModalBtn, saveRankingSplitModalBtn, rankingSplitTableContainer;
  let inputList, output;
  let addBtn, cancelEditBtn, clearInputBtn, clearAllBtn, generateBtn, copyBtn;
  let regionFileInput, regionLogicInput, applyRegionMappingBtn;
  let inputCard;
  let normalInputFields, f4InputPanel, f4ExcelInput, f4SpssInput, f4FileStatus, f4GeneratorBtn;
  let f4GeneratorModal, f4GeneratorBody, closeF4GeneratorBtn, f4CancelGeneratorBtn, f4SaveGeneratorBtn, f4AddRowBtn;
  let f4ValidationPanel, f4ValidationSummary, f4ValidationBody;


  /* ================= F4 CROSSTAB LIST ================= */
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));
  }

  function parseF4Question(rawQuestion) {
    const raw = String(rawQuestion || "").trim();
    let match = raw.match(/^Q\s*(\d+)\s*\.?\s*(.*)$/i);
    if (!match) match = raw.match(/^(\d+)\s*\.\s*(.*)$/);
    if (!match) match = raw.match(/^(\d+)\s+(.+)$/);
    // Bare numeric Question values such as "7" are valid in F4 Crosstab Lists.
    if (!match) match = raw.match(/^(\d+)$/);
    if (!match) return { rawQuestion: raw, questionNumber: null, questionId: "", questionLabel: raw, warning: raw ? "Question number could not be parsed." : "Question is missing." };
    const number = Number(match[1]);
    return { rawQuestion: raw, questionNumber: number, questionId: "Q" + number, questionLabel: String(match[2] || "").trim(), warning: "" };
  }

  function parseF4Group(rawGroup) {
    const raw = String(rawGroup || "").trim();
    if (!raw) return { raw, values: [], label: "", type: "invalid", instruction: "", warning: "Group is missing." };
    const instruction = raw.match(/^\(\s*([^()]+?)\s*\)$/);
    if (instruction && /include\s+net/i.test(instruction[1])) {
      return { raw, values: [], label: "", type: "instruction", instruction: instruction[1].trim(), warning: "" };
    }
    const inline = raw.match(/^Q\s*\d+\s*\(([^)]*)\)\s*(.*)$/i);
    const source = inline ? inline[1].trim() + (inline[2] ? " " + inline[2].trim() : "") : raw;
    if (/\+\s*\+|,\s*,/.test(source)) return { raw, values: [], label: "", type: "invalid", instruction: "", warning: "Group format could not be parsed." };
    const match = source.match(/^([0-9]+(?:\s*[+,]\s*[0-9]+)*)(?:\s+(.+))?$/);
    if (!match) return { raw, values: [], label: "", type: "invalid", instruction: "", warning: "Group format could not be parsed." };
    const values = match[1].split(/[+,]/).map(v => Number(v.trim())).filter(Number.isFinite);
    return { raw, values, label: String(match[2] || "").trim(), type: values.length > 1 ? "group" : "single", instruction: "", warning: "" };
  }

  function normalizeF4Row(row, index) {
    const raw = {
      question: String(row?.question ?? row?.Question ?? "").trim(),
      label: String(row?.label ?? row?.Label ?? "").trim(),
      logicCode: String(row?.logicCode ?? row?.logic ?? row?.Logic ?? "").trim(),
      group: String(row?.group ?? row?.Group ?? "").trim()
    };
    const question = parseF4Question(raw.question);
    if (raw.label && !question.questionLabel) question.questionLabel = raw.label;
    const group = parseF4Group(raw.group);
    const warnings = [];
    if (question.warning) warnings.push(question.warning);
    if (!raw.logicCode) warnings.push("Logic Code is missing.");
    if (group.warning) warnings.push(group.warning);
    return { index, raw, question, logicCode: raw.logicCode.toUpperCase(), group, warnings };
  }

  function getF4NormalizedRows(rows = f4Rows) { return rows.map((row, i) => normalizeF4Row(row, i)); }

  function groupF4Rows(rows = f4Rows) {
    const groups = new Map();
    getF4NormalizedRows(rows).forEach(item => {
      const fallback = "ROW_" + item.index;
      const key = (item.question.questionId || fallback) + "||" + (item.logicCode || fallback);
      if (!groups.has(key)) groups.set(key, { question: item.question, logicCode: item.logicCode, rows: [], firstIndex: item.index });
      groups.get(key).rows.push(item);
    });
    return [...groups.values()].sort((a,b) => a.firstIndex - b.firstIndex);
  }

  function f4HeaderKey(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, ""); }
  function mapF4ExcelRows(matrix) {
    if (!matrix.length) return [];
    const headers = matrix[0].map(f4HeaderKey);
    const find = aliases => headers.findIndex(h => aliases.includes(h));
    const qi=find(["question","questions","questiontext","questionnumber","q"]), li=find(["label","questionlabel","tablelabel"]), loi=find(["logic","logiccode","variable","var","spssvariable"]), gi=find(["group","groups","codegroup","answergroup"]);
    const hasHeader = [qi,li,loi,gi].some(i => i >= 0);
    const start = hasHeader ? 1 : 0;
    return matrix.slice(start).map(cols => ({ question:String(cols[qi>=0?qi:0]??"").trim(), label:String(cols[li>=0?li:1]??"").trim(), logicCode:String(cols[loi>=0?loi:2]??"").trim(), group:String(cols[gi>=0?gi:3]??"").trim() })).filter(r => r.question || r.label || r.logicCode || r.group);
  }

  async function handleF4ExcelUpload(event) {
    const file = event.target.files?.[0]; if (!file) return;
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type:"array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const matrix = XLSX.utils.sheet_to_json(sheet, { header:1, defval:"", raw:false });
      f4Rows = mapF4ExcelRows(matrix); f4ExcelFileName = file.name;
      renderF4FileStatus(); renderF4Validation();
    } catch (err) { console.error(err); alert("Could not read the F4 Excel file."); }
  }

  function readAscii(view, offset, length) {
    let s=""; for(let i=0;i<length && offset+i<view.byteLength;i++) s += String.fromCharCode(view.getUint8(offset+i)); return s.replace(/\0/g,"").trim();
  }

  /*
    SPSS metadata is read with datareader-spss instead of the old hand-written
    binary dictionary walker.  The old walker stopped as soon as it met a
    dictionary record it did not understand, which could make a real SAV with
    hundreds of variables appear as "1 variables read" and create false
    F4 warnings.

    The selected File is read locally by the browser.  Dynamic import only
    downloads the parser code; the SAV bytes are never sent to that CDN.
  */
  async function parseSpssSavMetadata(buffer) {
    const { readSav } = await import(
      "https://cdn.jsdelivr.net/npm/datareader-spss@0.2.1/+esm"
    );

    const parsed = await readSav(buffer);
    const sheet = parsed?.sheets?.[0];

    if (!sheet || !Array.isArray(sheet.variables)) {
      throw new Error("SPSS parser returned no variable dictionary.");
    }

    const variables = new Map();

    sheet.variables.forEach((variable, index) => {
      const rawName = String(variable?.name || "").trim();
      if (!rawName) return;

      const valueLabels = new Map();
      (variable.valueLabels || []).forEach(item => {
        const rawValue = item?.value;
        if (rawValue === null || rawValue === undefined) return;
        valueLabels.set(String(rawValue), String(item?.label || ""));
      });

      const entry = {
        name: rawName,
        label: String(variable?.label || ""),
        valueLabels,
        recordIndex: index + 1,
        varType: variable?.type || "",
        source: "datareader-spss"
      };

      // SPSS variable names are matched case-insensitively for F4 validation.
      variables.set(rawName.toUpperCase(), entry);
    });

    return {
      variables,
      fileName: "",
      parser: "datareader-spss",
      encoding: parsed?.encoding || ""
    };
  }

  async function handleF4SpssUpload(event) {
    const file=event.target.files?.[0]; if(!file) return;

    if (f4FileStatus) {
      f4FileStatus.textContent = "Reading SPSS dictionary locally: " + file.name + " ...";
    }

    try {
      const meta = await parseSpssSavMetadata(await file.arrayBuffer());
      meta.fileName = file.name;
      f4SpssMetadata = meta;
      renderF4FileStatus();
      renderF4Validation();

      if (meta.variables.size === 0) {
        throw new Error("No SPSS variables were found.");
      }
    } catch(err) {
      console.error(err);
      f4SpssMetadata={variables:new Map(),fileName:file.name,parseError:String(err?.message || err)};
      renderF4FileStatus();
      renderF4Validation();
      alert(
        "SPSS metadata could not be read. No false variable-mismatch result will be treated as a valid SPSS check.\n\n" +
        "The SAV stays on your computer. If your network blocks the browser SPSS parser, use the SPSS Dictionary fallback."
      );
    }
  }

  function validateF4Item(item) {
    // SPSS Validation is intentionally limited to Logic Code and Group values.
    // Question is used for table identification/order only and must never create
    // an SPSS validation warning.
    const warnings = [];
    const variable = item.logicCode
      ? f4SpssMetadata.variables.get(item.logicCode.toUpperCase())
      : null;

    if (!item.logicCode) {
      warnings.push("Logic Code is missing.");
    } else if (f4SpssMetadata.fileName && !variable) {
      warnings.push("Logic Code " + item.logicCode + " was not found in SPSS.");
    }

    // Group-format/value validation belongs to SPSS Validation; Question parsing does not.
    if (item.group.warning) {
      warnings.push(item.group.warning);
    } else if (variable && item.group.values.length && variable.valueLabels.size) {
      item.group.values.forEach(v => {
        if (!variable.valueLabels.has(String(v))) {
          warnings.push("Group value " + v + " was not found in " + item.logicCode + ".");
        }
      });
    }

    return { variable, warnings };
  }

  function renderF4FileStatus() {
    if(!f4FileStatus) return;
    const excel=f4ExcelFileName ? "Excel: " + f4ExcelFileName + " (" + f4Rows.length + " rows)" : "Excel: not uploaded";
    const sav=f4SpssMetadata.fileName ? "SPSS: " + f4SpssMetadata.fileName + " (" + f4SpssMetadata.variables.size + " variables read)" : "SPSS: not uploaded";
    f4FileStatus.textContent=excel + " | " + sav;
  }

function renderF4GeneratorRows() {
  if (!f4GeneratorBody) return;

  f4GeneratorBody.innerHTML = f4ModalDraftRows.map((row, i) => {
    const parsed = normalizeF4Row(row, i);

    return `
      <tr data-f4-row="${i}" class="f4-generator-row">
        <td class="f4-col-index" title="Drag to reorder">
          <span class="f4-drag-handle">⋮⋮</span>
          ${i + 1}
        </td>

        <td>
          <input
            data-field="question"
            value="${escapeHtml(row.question)}"
          >
        </td>

        <td>
          <input
            data-field="label"
            value="${escapeHtml(row.label)}"
          >
        </td>

        <td>
          <input
            data-field="logicCode"
            value="${escapeHtml(row.logicCode)}"
          >
        </td>

        <td>
          <input
            data-field="group"
            value="${escapeHtml(row.group)}"
          >
        </td>

        <td class="f4-row-warning">
          ${parsed.warnings.map(escapeHtml).join("<br>") || ""}
        </td>

        <td class="f4-col-actions">
          <button
            type="button"
            class="danger"
            data-act="delete"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  }).join("");

  initF4GeneratorSortable();
}

let f4GeneratorSortable = null;

function initF4GeneratorSortable() {
  if (!f4GeneratorBody || typeof Sortable === "undefined") {
    return;
  }

  // Tránh tạo nhiều Sortable instance mỗi lần render lại.
  if (f4GeneratorSortable) {
    f4GeneratorSortable.destroy();
    f4GeneratorSortable = null;
  }

  f4GeneratorSortable = new Sortable(f4GeneratorBody, {
    animation: 150,

    // Chỉ kéo bằng vùng số thứ tự / drag handle.
    // Như vậy vẫn click/edit input bình thường.
    handle: ".f4-col-index",

    draggable: "tr[data-f4-row]",

    ghostClass: "f4-sortable-ghost",
    chosenClass: "f4-sortable-chosen",

    onStart: function () {
      // Lưu mọi thay đổi user vừa nhập trước khi reorder.
      syncF4DraftFromModal();
    },

    onEnd: function (evt) {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;

      if (
        oldIndex == null ||
        newIndex == null ||
        oldIndex === newIndex
      ) {
        return;
      }

      const [movedRow] = f4ModalDraftRows.splice(oldIndex, 1);

      f4ModalDraftRows.splice(newIndex, 0, movedRow);

      // Render lại để cập nhật # và data-f4-row.
      renderF4GeneratorRows();
    }
  });
}

  function syncF4DraftFromModal() {
    [...f4GeneratorBody.querySelectorAll("tr[data-f4-row]")].forEach((tr,i)=>{ const row=f4ModalDraftRows[i]; tr.querySelectorAll("input[data-field]").forEach(inp=>row[inp.dataset.field]=inp.value); });
  }
  function openF4Generator() { f4ModalDraftRows=f4Rows.map(r=>({...r})); if(!f4ModalDraftRows.length) f4ModalDraftRows.push({question:"",label:"",logicCode:"",group:""}); renderF4GeneratorRows(); f4GeneratorModal.classList.remove("hidden"); }
  function closeF4Generator(){ f4GeneratorModal.classList.add("hidden"); }

  function renderF4Validation() {
    if(!f4ValidationPanel || !f4ValidationBody) return;
    if(!f4Rows.length){ f4ValidationPanel.classList.add("hidden"); return; }
    f4ValidationPanel.classList.remove("hidden"); let warningCount=0;
    f4ValidationBody.innerHTML=getF4NormalizedRows().map((item,i)=>{ const result=validateF4Item(item); warningCount+=result.warnings.length; const status=result.warnings.length?"Warning":"Match"; const detail=result.warnings.length?result.warnings.map(escapeHtml).join("<br>"):(result.variable?"Variable and referenced values found in SPSS.":"Parsed successfully. Upload SPSS for metadata validation."); return `<tr><td>${i+1}</td><td>${escapeHtml(item.raw.question)}</td><td>${escapeHtml(item.logicCode)}</td><td class="${result.warnings.length?'f4-status-warning':'f4-status-ok'}">${status}</td><td class="f4-validation-detail">${detail}</td></tr>`; }).join("");
    if(f4ValidationSummary) f4ValidationSummary.innerHTML=warningCount?`<span class="f4-warning-line">${warningCount} warning(s). Warnings do not block Add Table or syntax generation.</span>`:`<span class="f4-warnings-ok">No validation warnings.</span>`;
  }

  function formatF4ValueExpression(values) {
    const nums = (values || []).map(Number).filter(Number.isFinite);
    if (!nums.length) return "";
    const sorted = [...nums].sort((a, b) => a - b);
    const contiguous = sorted.every((v, i) => i === 0 || v === sorted[i - 1] + 1);
    return contiguous && sorted.length > 1
      ? sorted[0] + "-" + sorted[sorted.length - 1]
      : sorted.join(",");
  }

  function getF4DisplayNumber(table) {
    const id = String(table.f4Data?.questionId || "");
    const m = id.match(/^Q(\d+)$/i);
    return m ? m[1] : String(table.f4Data?.rawQuestion || "").trim();
  }

  function getF4Variable(table) {
    return f4SpssMetadata.variables.get(String(table.f4Data?.logicCode || table.questionCode || "").toUpperCase()) || null;
  }

  function getSortedF4ValueLabels(variable) {
    if (!variable?.valueLabels) return [];
    return [...variable.valueLabels.entries()].sort((a, b) => {
      const an = Number(a[0]), bn = Number(b[0]);
      if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
      return String(a[0]).localeCompare(String(b[0]));
    });
  }

  function buildF4OriginalSyntaxRows(table) {
    const variable = getF4Variable(table);
    const logicCode = table.f4Data.logicCode || table.questionCode;
    const entries = getSortedF4ValueLabels(variable);

    if (!entries.length) {
      return [" *** WARNING: No SPSS Value Labels found for " + logicCode + " ***"];
    }

    return entries.map(([value, label], index) => {
      const suffix = entries.length > 1 && index === entries.length - 2 ? " ^RL" : "";
      return formatSyntaxRow(String(label || ""), logicCode + " (" + value + ")", {
        indent: " ", logicColumn: 28, suffix, addTrailingCaret: false
      });
    });
  }

  function expandF4GroupItems(rows) {
    const expanded = [];
    (rows || []).forEach(item => {
      const raw = String(item?.raw?.group || item?.group?.raw || "").trim();
      if (!raw) return;

      // Crosstab List may store several groups in ONE Excel cell, separated by "/".
      // Example: "1+2 Favorable / 3+4 Unfavorable / 5+6 DK (Include Net Fav)".
      // Each segment must become its own answer row; Include Net is an instruction only.
      raw.split(/\s*\/\s*/).forEach(segment => {
        let part = String(segment || "").trim();
        if (!part) return;
        part = part.replace(/\s*\(\s*Include\s+Net(?:\s+Fav(?:orable)?)?\s*\)\s*/ig, " ").trim();
        if (!part) return;
        const parsed = parseF4Group(part);
        if ((parsed.type === "group" || parsed.type === "single") && parsed.values.length) {
          expanded.push({ ...item, group: parsed });
        }
      });
    });
    return expanded;
  }

  function buildF4GroupSyntaxRows(table) {
    const logicCode = table.f4Data.logicCode || table.questionCode;
    const groupRows = expandF4GroupItems(table.f4Data.rows || []);
    const lines = [];

    groupRows.forEach((item, index) => {
      const label = item.group.label || "CODE " + item.group.values.join(",");
      const expr = formatF4ValueExpression(item.group.values);
      const suffix = index === groupRows.length - 1 ? " ^RL" : "";
      lines.push(formatSyntaxRow(label, logicCode + " (" + expr + ")", {
        indent: " ", logicColumn: 20, suffix, addTrailingCaret: false
      }));
    });

    if (groupRows.length) {
      const firstLabel = String(groupRows[0].group.label || "Favorable").trim();
      const netLabel = /^net\s+/i.test(firstLabel) ? firstLabel : "Net " + firstLabel;
      lines.push(formatSyntaxRow(netLabel, "CALC F1-F2,V1-V2", {
        indent: " ", logicColumn: 20, suffix: "     ^SX", addTrailingCaret: false
      }));
    }

    return lines;
  }

function collectF4Tables() {
  const result = [];

  groupF4Rows().forEach(group => {
    const label =
      group.rows.find(x => x.raw.label)?.raw.label ||
      group.question.questionLabel ||
      group.question.rawQuestion ||
      "F4 TABLE";

    const common = {
      projectType: "F4",
      questionCode:
        group.logicCode ||
        group.question.questionId ||
        "F4",

      questionType: "single_choice",
      rowType: "custom_code",
      questionText: label,

      useST: false,
      useDS: false,
      useRank: false,
      useMean: false,

      subtitleOnly: "",
      baseType: "total_sample",
      askedBaseText: "",

      manualUseIndex: "",
      answerOptions: "",
      customNetGroups: [],
      customNetGroupsRaw: "",

      summaryRaw: "",
      summaryBlocks: [],

      arrayGroupId: "",
      arrayPosition: 0
    };

    const f4Base = {
      questionId: group.question.questionId,
      rawQuestion: group.question.rawQuestion,
      logicCode: group.logicCode,
      rows: group.rows,
      sourceRows: group.rows.map(x => x.raw)
    };


    // =====================================================
    // TABLE 1 — ORIGINAL SPSS TABLE
    // Luôn luôn tạo.
    // =====================================================

    result.push({
      ...common,
      f4Data: {
        ...f4Base,
        variant: "original"
      }
    });


    // =====================================================
    // CHECK GROUP
    //
    // Chỉ kiểm tra dữ liệu thật trong cột Group.
    //
    // Group blank:
    //     Original only
    //
    // Group có dữ liệu:
    //     Original + Group table
    // =====================================================

    const hasGroups = group.rows.some(item => {
      const rawGroup = String(
        item?.raw?.group ?? ""
      ).trim();

      return rawGroup !== "";
    });


    // =====================================================
    // TABLE 2 — GROUP TABLE
    // Chỉ tạo nếu Excel/Generator thực sự có Group.
    // =====================================================

    if (hasGroups) {
      result.push({
        ...common,
        f4Data: {
          ...f4Base,
          variant: "group"
        }
      });
    }
  });

  return result;
}

  function toggleProjectModeUI() {
    const isF4=projectTypeSelect?.value==="F4";
    normalInputFields?.classList.toggle("hidden",isF4); f4InputPanel?.classList.toggle("hidden",!isF4);
    if(addBtn) addBtn.textContent=isF4?"Add Table":(editingIndex!==null?"Update Table":"Add Table");
    if(clearInputBtn) clearInputBtn.textContent=isF4?"Clear F4 Input":"Clear Input";
    if(isF4){ renderF4FileStatus(); renderF4Validation(); }
  }

  function initF4Events() {
    projectTypeSelect?.addEventListener("change",toggleProjectModeUI);
    f4ExcelInput?.addEventListener("change",handleF4ExcelUpload); f4SpssInput?.addEventListener("change",handleF4SpssUpload);
    f4GeneratorBtn?.addEventListener("click",openF4Generator); closeF4GeneratorBtn?.addEventListener("click",closeF4Generator); f4CancelGeneratorBtn?.addEventListener("click",closeF4Generator);
    f4AddRowBtn?.addEventListener("click",()=>{ syncF4DraftFromModal(); f4ModalDraftRows.push({question:"",label:"",logicCode:"",group:""}); renderF4GeneratorRows(); });
    f4GeneratorBody?.addEventListener("input",()=>{ syncF4DraftFromModal(); });
    f4GeneratorBody?.addEventListener("change",()=>{ syncF4DraftFromModal(); renderF4GeneratorRows(); });
    f4GeneratorBody?.addEventListener("click", e => {
  const btn = e.target.closest('button[data-act="delete"]');

  if (!btn) return;

  syncF4DraftFromModal();

  const tr = btn.closest("tr[data-f4-row]");

  if (!tr) return;

  const index = Number(tr.dataset.f4Row);

  if (!Number.isInteger(index)) return;

  f4ModalDraftRows.splice(index, 1);

  renderF4GeneratorRows();
});
    f4SaveGeneratorBtn?.addEventListener("click",()=>{ syncF4DraftFromModal(); f4Rows=f4ModalDraftRows.filter(r=>r.question||r.label||r.logicCode||r.group); closeF4Generator(); renderF4FileStatus(); renderF4Validation(); saveSession(); });
    f4GeneratorModal?.addEventListener("click",e=>{ if(e.target===f4GeneratorModal) closeF4Generator(); });
  }

  /* ---------------- DOM helper ---------------- */
  function requireElement(id) {
    const element = document.getElementById(id);

    if (!element) {
      console.error(`Missing required element: #${id}`);
    }

    return element;
  }

  function normalizeQuestionCode(value) {
    return value.trim().toUpperCase();
  }

  function isDSLine(line) {
    return String(line || "")
      .trim()
      .startsWith("**D/S");
  }

  function toggleRankRLBox() {

    if (
      useRankCheckbox.checked
    ) {

      rankRLBox.classList.remove(
        "hidden"
      );

    } else {

      rankRLBox.classList.add(
        "hidden"
      );

      rankRLCodesInput.value = "";

    }

  }

  function removeLeadingQuestionNumber(value) {
    let text = String(value || "");

    /*
      Hỗ trợ:
      6. Question text
      6) Question text
      Q6. Question text
      V3. Question text
      M1. Question text
      D1B. Question text
      Q13/14. Question text
      M1-M7. Question text

      Bắt buộc phải có khoảng trắng sau dấu . hoặc )
      để không xóa nhầm số thập phân như 6.5 million.
    */
    const leadingCodePattern =
      /^\s*(?:(?:[A-Z]+\d+[A-Z]*|\d+)(?:\s*(?:\/|-)\s*(?:[A-Z]*\d+[A-Z]*|\d+))*)\s*[.)]\s+/i;

    /*
      Dùng vòng lặp để xử lý trường hợp:
      6. V3. Question text
    */
    let previousText;

    do {
      previousText = text;
      text = text.replace(leadingCodePattern, "");
    } while (text !== previousText);

    return text;
  }

  function normalizeQuestionSpacing(value) {
    return String(value || "")
      /*
        Chuẩn hóa line break từ Windows.
      */
      .replace(/\r\n?/g, "\n")

      /*
        Chỉ gộp space, tab và non-breaking space.
        Không dùng \s+ vì \s+ sẽ xóa luôn xuống dòng.
      */
      .split("\n")
      .map(line => {
        return line
          .replace(/[\t\u00A0 ]+/g, " ")
          .trim();
      })
      .join("\n")

      /*
        Tối đa giữ một dòng trống giữa các đoạn.
      */
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function normalizeQuestionText(value) {
    const withoutQuestionNumber =
      removeLeadingQuestionNumber(value);

    return normalizeQuestionSpacing(
      withoutQuestionNumber
    );
  }

  function cleanSubtitleLine(value) {
    return normalizeQuestionSpacing(
      removeLeadingQuestionNumber(value)
    );
  }

  function getSubtitleLines() {
    return String(subtitleOnlyInput.value || "")
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map(line => cleanSubtitleLine(line))
      .filter(line => line !== "");
  }

  function getDemographicBodyLines(
    rowType,
    questionCode,
    additionalCodesText = ""
  ) {
    const normalizedRowType = normalizeRowType(rowType);
    const template = demographicTemplates[normalizedRowType];

    if (!template) {
      return [];
    }

    const templateLines = template
      .filter(line => !isDSLine(line))
      .map(line => {
        return line.replaceAll("{VAR}", questionCode);
      });

    const additionalLines = buildAdditionalCodeLines(
      additionalCodesText
    );

    return [
      ...templateLines,
      ...additionalLines
    ];
  }

  function extractDemographicRowLabel(line) {
    return String(line || "")
      .split("^")[0]
      .trim();
  }

  function getDemographicDSChoices() {
    const rowType = rowTypeSelect.value;
    const questionCode = normalizeQuestionCode(
      questionCodeInput.value
    );

    if (!rowType) {
      alert("Please select Demographic Row Type first.");
      return [];
    }

    if (!questionCode) {
      alert("Please enter Question Code first.");
      return [];
    }

    const bodyLines = getDemographicBodyLines(
      rowType,
      questionCode,
      demographicAdditionalCodesInput.value
    );

    return bodyLines
      .map((line, bodyIndex) => {
        const label = extractDemographicRowLabel(line);

        /*
          Dòng trống vẫn được tính bodyIndex,
          nhưng không đưa vào dropdown.
        */
        if (!label) {
          return null;
        }

        return {
          type: "demographic",
          label,
          rowNumber: bodyIndex + 2
        };
      })
      .filter(choice => choice !== null);
  }

  function getArrayItemLabels(questionCodes) {
    const subtitleLines = getSubtitleLines();

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
    if (!splitRowsContainer) {
      return [];
    }

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
    if (!splitRowsContainer) {
      return;
    }

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
    { value: "adequate_inadequate", text: "TOT ADEQUATE / TOT INADEQUATE" },
    { value: "support_oppose", text: "TOT SUPPORT / TOT OPPOSE" }
  ];

  const ALL_QUESTION_TYPES = new Set([
    "single_choice",
    "array",
    "multiple_choice",
    "demographic",
    "summary_table",
    "ranking_table",
    "listout_table"
  ]);


  function getEffectiveQuestionType() {
    const questionCodes =
      expandQuestionCodes(
        questionCodeInput.value.trim()
      );

    /*
      Single Choice / Array được phân biệt
      bằng Question Code.

      Q1     => Single Choice
      Q1:5   => Array
    */
    if (
      questionTypeSelect.value ===
        "single_choice" &&
      questionCodes.length > 1
    ) {
      return "array";
    }

    return questionTypeSelect.value;
  }

  function isCurrentArray() {
    return (
      getEffectiveQuestionType() ===
      "array"
    );
  }

  function isKnownQuestionType(questionType) {
    return ALL_QUESTION_TYPES.has(
      String(questionType || "")
    );
  }

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
    const questionType = questionTypeSelect.value;

    const rowType = normalizeRowType(
      rowTypeSelect.value
    );

    const shouldHide =
      !questionType ||
      questionType === "summary_table" ||
      questionType === "ranking_table" ||
      questionType === "listout_table";

    if (shouldHide) {
      sharedDSSetupBox.classList.add("hidden");
      buildCustomDSBtn.classList.add("hidden");
      customDSBox.classList.add("hidden");
      return;
    }

    /*
      Hiện khu vực Active D/S cho:
      - Single Choice
      - Multiple Choice
      - Array
      - Demographic
    */
    sharedDSSetupBox.classList.remove("hidden");
    useDSBox.classList.remove("hidden");

    /*
      Những loại cần chọn Positive/Negative:
      - Multiple Choice
      - Custom Code
      - Demographic
    */
    const needsDSSetup =
      questionType === "multiple_choice" ||
      rowType === "custom_code" ||
      questionType === "demographic";

    if (
      useDSCheckbox.checked &&
      needsDSSetup
    ) {
      buildCustomDSBtn.classList.remove("hidden");
    } else {
      buildCustomDSBtn.classList.add("hidden");
      customDSBox.classList.add("hidden");
    }
  }

  function toggleRankBox() {
    const questionType =
      questionTypeSelect.value;

    const supportedQuestionTypes = [
      "single_choice",
      "multiple_choice",
      "summary_table",
      "ranking_table",
      "array",  
      "demographic",
      "listout_table"
    ];

    const isSupported =
      supportedQuestionTypes.includes(
        questionType
      );

    if (!isSupported) {
      useRankBox.classList.add("hidden");
      useRankCheckbox.checked = false;
      return;
    }

    useRankBox.classList.remove("hidden");
  }

  function toggleCustomNetGroupBox() {
    if (useCustomNetGroupsCheckbox.checked) {
      customNetGroupBox.classList.remove("hidden");
    } else {
      customNetGroupBox.classList.add("hidden");
    }

    /*
      Rebuild lại D/S vì row number thay đổi
      khi bật hoặc tắt Net Groups.
    */
    customDSPositiveSelect.innerHTML = "";
    customDSNegativeSelect.innerHTML = "";
    customDSBox.classList.add("hidden");

    toggleUseDSBox();
  }

  function toggleAnswerOptionsBox() {
    const questionType =
      questionTypeSelect.value;

    /*
      Question Types that never use
      Answer Options.
    */
    if (
      questionType === "summary_table" ||
      questionType === "ranking_table" ||
      questionType === "listout_table"
    ) {
      answerOptionsBox.classList.add("hidden");

      useCustomNetGroupsCheckbox.checked = false;
      customNetGroupBox.classList.add("hidden");
      customDSBox.classList.add("hidden");

      return;
    }

    const rowType =
      normalizeRowType(
        rowTypeSelect.value
      );

    const isCustomCode =
      rowType === "custom_code";

    const isMultipleChoice =
      questionType === "multiple_choice";

    const shouldShowAnswerOptions =
      isMultipleChoice || isCustomCode;

    if (shouldShowAnswerOptions) {
      answerOptionsBox.classList.remove("hidden");
    } else {
      answerOptionsBox.classList.add("hidden");

      useCustomNetGroupsCheckbox.checked = false;
      customNetGroupBox.classList.add("hidden");
      customDSBox.classList.add("hidden");
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

  function buildAdditionalCodeLines(
    additionalCodesText
  ) {
    const items = parseAdditionalCodes(
      additionalCodesText
    );

    if (items.length === 0) {
      return [];
    }

    const lines = [" ^ ^"];

    items.forEach(item => {
      lines.push(
        formatSyntaxRow(
          item.label,
          item.logic,
          {
            indent: " ",
            logicColumn: 34,
            addTrailingCaret: false
          }
        )
      );
    });

    return lines;
  }

  function buildDemographicTemplateLines(table) {
    const rowType = normalizeRowType(
      table.rowType
    );

    /*
      Custom Code vẫn dùng logic cũ.
    */
    if (rowType === "custom_code") {
      const lines = [];

      const dsLine = table.useDS
        ? buildCustomDSLine(table)
        : "";

      if (dsLine) {
        lines.push(dsLine);
      }

      buildCustomNetGroupLines(table)
        .forEach(line => {
          lines.push(line);
        });

      buildRowsFromAnswerOptions(
        table.answerOptions,
        table.questionCode,
        table.customNetGroups || [],
          table.rankRLCodes || ""
      ).forEach(line => {
        lines.push(line);
      });

      buildAdditionalCodeLines(
        table.demographicAdditionalCodes || ""
      ).forEach(line => {
        lines.push(line);
      });

      return lines;
    }

    const template =
      demographicTemplates[rowType];

    if (!template) {
      return [
        "*** ERROR: DEMOGRAPHIC TEMPLATE NOT FOUND - " +
        table.rowType +
        " ***"
      ];
    }

    /*
      Toàn bộ demographic body giữ nguyên.
      Chỉ không lấy dòng D/S cứng.
    */
    const bodyLines = getDemographicBodyLines(
      table.rowType,
      table.questionCode,
      table.demographicAdditionalCodes || ""
    );

    const lines = [];

    /*
      Dùng lại buildCustomDSLine hiện có.
    */
    if (table.useDS) {
      const dsLine = buildCustomDSLine(table);

      if (dsLine) {
        lines.push(dsLine);
      }
    }

    bodyLines.forEach(line => {
      lines.push(line);
    });

    return lines;
  }

  function normalizeRankingQuestionCode(value) {
    const clean = String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[.)]+$/, "");

    if (!clean) {
      return "";
    }

    /*
      Giữ tương thích format cũ:

      1  => Q1
      24 => Q24
    */
    if (/^\d+$/.test(clean)) {
      return "Q" + clean;
    }

    /*
      Giữ nguyên những code có prefix:

      Q1
      M1
      M7
      D1B
      BALLOT1
    */
    if (
      /^[A-Z][A-Z0-9_]*$/.test(clean) &&
      /\d/.test(clean)
    ) {
      return clean;
    }

    return "";
  }

  function parseRankingItems(text) {
    const lines = String(text || "")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "");

    return lines
      .map(line => {
        /*
          FORMAT A — có dấu |

          M1 | BIPARTISAN | 1
          M2 | ROAD ACT |
          Q7 | INCREASING SAFETY | 2
          7 | INCREASING SAFETY | 1

          Nếu code chỉ là số 7, app vẫn convert thành Q7.
        */
        if (line.includes("|")) {
          const parts = line
            .split("|")
            .map(part => part.trim());

          const questionCode =
            normalizeRankingQuestionCode(
              parts[0]
            );

          const label = parts[1] || "";
          const splitSuffix = parts[2] || "";

          if (!questionCode || !label) {
            return null;
          }

          return {
            questionCode,
            label,
            splitSuffix
          };
        }

        /*
          FORMAT B — không có dấu |

          M1 BIPARTISAN
          M1. BIPARTISAN
          M1) BIPARTISAN

          Q24 IF WE DON'T TAKE CARE...
          24 IF WE DON'T TAKE CARE...

          Code là token đầu tiên của dòng.
        */
        const match = line.match(
          /^([A-Z][A-Z0-9_]*|\d+)[.)]?\s+(.+)$/i
        );

        if (!match) {
          return null;
        }

        const questionCode =
          normalizeRankingQuestionCode(
            match[1]
          );

        const label = String(match[2] || "")
          .trim();

        if (!questionCode || !label) {
          return null;
        }

        return {
          questionCode,
          label,
          splitSuffix: ""
        };
      })
      .filter(item => item !== null);
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

    buildSplitABLines(table)
      .forEach(line => {
        lines.push(line);
      });

    table.rankingItems.forEach(item => {
      const suffix =
        item.splitSuffix || "";

      const logic =
        item.questionCode +
        "(" +
        table.metricCode +
        ")";

      lines.push(
        formatSyntaxRow(
          item.label,
          logic,
          {
            indent: " ",
            logicColumn: 74,
            suffix
          }
        )
      );
    });

    return lines;
  }

  function normalizeRowType(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, "_");
  }

  function expandQuestionCodes(input) {
    const raw = String(input || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");

    if (!raw) {
      return [];
    }

    /*
      Range được hỗ trợ:

      Q1:5       => Q1, Q2, Q3, Q4, Q5
      Q1-Q5      => Q1, Q2, Q3, Q4, Q5
      M1:M7      => M1 ... M7
      Q8_1:5     => Q8_1, Q8_2, Q8_3, Q8_4, Q8_5
      Q8_1-Q8_5  => Q8_1 ... Q8_5
      1-5        => 1, 2, 3, 4, 5
    */
    const rangeMatch = raw.match(
      /^([A-Z0-9_]*?)(\d+)(?::|-)([A-Z0-9_]*?)(\d+)$/
    );

    if (rangeMatch) {
      const startPrefix =
        rangeMatch[1] || "";

      const startNumberText =
        rangeMatch[2];

      const typedEndPrefix =
        rangeMatch[3] || "";

      const endNumberText =
        rangeMatch[4];

      const startNumber =
        Number(startNumberText);

      const endNumber =
        Number(endNumberText);

      const endPrefix =
        typedEndPrefix || startPrefix;

      if (
        startPrefix &&
        endPrefix &&
        startPrefix !== endPrefix
      ) {
        alert(
          "Start code and end code must use the same prefix.\n\n" +
          "Examples:\n" +
          "Q1:5\n" +
          "Q8_1:5\n" +
          "Q8_1-Q8_5"
        );

        return [];
      }

      if (endNumber < startNumber) {
        alert(
          "Invalid question range. End number must be greater than or equal to start number."
        );

        return [];
      }

      const prefix =
        startPrefix || endPrefix;

      const shouldKeepLeadingZero =
        startNumberText.length > 1 &&
        startNumberText.startsWith("0");

      const numberWidth =
        shouldKeepLeadingZero
          ? startNumberText.length
          : 0;

      const codes = [];

      for (
        let number = startNumber;
        number <= endNumber;
        number++
      ) {
        const numberText =
          numberWidth > 0
            ? String(number).padStart(
                numberWidth,
                "0"
              )
            : String(number);

        codes.push(
          prefix + numberText
        );
      }

      return codes;
    }

    /*
      Single code được hỗ trợ:

      Q1
      Q8_1
      D1B
      BALLOT_A
      REGION_CODED
      SAMPLE_A
      1

      Không cho khoảng trắng.
      Không dùng dấu - hoặc : trừ khi là range.
    */
    if (/^[A-Z0-9_]+$/.test(raw)) {
      return [raw];
    }

    alert(
      "Invalid question code.\n\n" +
      "Supported examples:\n" +
      "Q1\n" +
      "Q8_1\n" +
      "BALLOT_A\n" +
      "Q1:5\n" +
      "Q8_1:5\n" +
      "Q8_1-Q8_5"
    );

    return [];
  }

  function isQuestionCodeRange(value) {
    const raw =
      String(value || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");

    return (
      /^([A-Z0-9_]*?)(\d+)(?::|-)([A-Z0-9_]*?)(\d+)$/
        .test(raw)
    );
  }

  function buildQuestionCodeLine(questionCode, index) {
    const cleanCode = normalizeQuestionCode(questionCode);

    if (cleanCode.startsWith("T")) {
      return cleanCode + "^" + index;
    }

    return "T" + cleanCode + "^" + index;
  }

  function buildTableOptions(
    questionType,
    useST,
    useRank,
    projectType
  ) {
    const setting =
      projectSettings[projectType] ||
      projectSettings.N2;

    let options =
      setting.tableOptionsByType[questionType];

    if (!options) {
      options =
        setting.tableOptionsByType.single_choice;
    }

    let optionArray = String(options || "")
      .split(",")
      .map(option => option.trim())
      .filter(option => option !== "");

    /*
      Xóa OD khỏi vị trí cũ trước.
      Ranking Table hiện đã có OD trong projectSettings,
      nên cần xóa để thêm lại ở cuối.
    */
    optionArray = optionArray.filter(
      option => option !== "OD"
    );

    /*
      Xử lý ST trước.
    */
    if (
      useST === true &&
      !optionArray.includes("ST")
    ) {
      optionArray.push("ST");
    }

    if (
      useST !== true &&
      questionType !== "array"
    ) {
      optionArray = optionArray.filter(
        option => option !== "ST"
      );
    }

    /*
      Chỉ sau khi xử lý tất cả option xong
      mới thêm OD, để OD luôn ở cuối cùng.
    */
  const rankEnabled =
    useRank === true ||
    (
      useRank === undefined &&
      questionType === "ranking_table"
    );

  if (rankEnabled) {
    optionArray.push("OD");
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
    /*
      Chuẩn hóa lại khi generate output.
      Nhờ vậy các table cũ cũng được xóa V3., Q6., 6....
    */
    const cleanQuestionText =
      normalizeQuestionText(
        table.questionText
      );

    if (table.questionType === "listout_table") {
      return " " + formatListoutTitle(
        cleanQuestionText
      );
    }

    if (
    table.questionType === "summary_table"
  ) {
    return " " + cleanQuestionText.toUpperCase();
  }

  if (
    table.questionType === "ranking_table"
  ) {
    return " " + cleanQuestionText;
  }

    const questionNumber =
      getQuestionNumber(
        table.questionCode
      );

    return (
      " QUESTION " +
      questionNumber +
      ":|" +
      stripLeadingQuestionLabel(cleanQuestionText)
    );
  }

  /*
    Strips an already-present "QUESTION <identifier>:" prefix (with or
    without a space before the "|") from the front of a question text
    value. This is a self-healing safeguard: a table whose stored
    questionText got polluted with a full "QUESTION N: |text" line
    (e.g. from the extractPlainTitle bug that used to reject a space
    before "|") would otherwise get a second "QUESTION N:|" prefix
    wrapped around it here every time Output regenerates, doubling the
    title further on every subsequent edit instead of ever recovering.
  */
  function stripLeadingQuestionLabel(text) {
    const match = String(text || "").match(/^QUESTION\s+[^:]+:\s*\|\s*(.*)$/i);

    return match ? match[1] : text;
  }

  function getTnValue(questionType, projectType) {
    const setting = projectSettings[projectType] || projectSettings.N2;

    return setting.baseTnByType[questionType] || "1";
  }

  function getCurrentBaseType() {
    return askedBaseTextInput.value.trim()
      ? "asked_base"
      : "total_sample";
  }

  function buildBaseLine(table) {
    const tnValue =
      getTnValue(
        table.questionType,
        table.projectType
      );

    const askedBaseText =
      String(
        table.askedBaseText || ""
      ).trim();

    if (askedBaseText) {
      return (
        " BASE=" +
        askedBaseText +
        "^TN^" +
        tnValue
      );
    }

    return (
      " BASE=TOTAL SAMPLE^TN^" +
      tnValue
    );
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

      const logic =
    row.variable +
    spaceBeforeParen +
    "(" +
    row.code +
    ")";

  lines.push(
    formatSyntaxRow(
      row.label,
      logic,
      {
        indent,
        logicColumn: 28,
        addTrailingCaret: false
      }
    )
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
      formatSyntaxRow(
        row.label,
        row.variable +
          " (" +
          row.code +
          ")",
        {
          indent: "   ",
          logicColumn: 28,
          addTrailingCaret: false
        }
      )
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
      formatSyntaxRow(
        row.label,
        row.variable +
          " (" +
          row.code +
          ")",
        {
          indent: "   ",
          logicColumn: 28,
          addTrailingCaret: false
        }
      )
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
    /*
      BUG FIX: the previous implementation referenced an
      undefined `extraRows` variable inside this loop and threw
      a ReferenceError any time a Listout table used a DATE
      range, which stopped output generation entirely. This now
      follows the same formatSyntaxRow pattern used by the
      VERSION/MODE sections above (no new syntax rules).
    */
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
        formatSyntaxRow(
          label,
          variable + " (" + code + ")",
          {
            indent: "   ",
            logicColumn: 28,
            addTrailingCaret: false
          }
        )
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
      /*
        Xóa tất cả nội dung nằm trong dấu ngoặc tròn.

        Ví dụ:
        DON'T KNOW (DNR/NOT ONLINE)
        => DON'T KNOW

        OTHER (SPECIFY)
        => OTHER

        YES (IF YES, CONTINUE)
        => YES
      */
      .replace(/\s*\([^()]*\)/g, "")

      /*
        Gộp khoảng trắng thừa sau khi xóa.
      */
      .replace(/[\t\u00A0 ]+/g, " ")
      .trim()
      .toUpperCase();
  }

  function cleanNetGroupLabel(label) {
    return String(label || "")
      .replace(/[\t\u00A0 ]+/g, " ")
      .trim()
      .toUpperCase();
  }

  function parseAnswerOptionLine(rawLine) {
    const line = String(rawLine || "")
      .replace(/\r/g, "")
      .trim();

    if (!line) {
      return null;
    }

    /*
      FORMAT:
      1 | DEFINITELY YES
      DEFINITELY YES | 1
    */
    if (line.includes("|")) {
      const parts = line
        .split("|")
        .map(part => part.trim());

      if (parts.length === 2) {
        const left = parts[0];
        const right = parts[1].replace(/^:/, "");

        if (/^\d+$/.test(left)) {
          return {
            code: left,
            label: cleanAnswerLabel(parts[1])
          };
        }

        if (/^\d+$/.test(right)) {
          return {
            code: right,
            label: cleanAnswerLabel(parts[0])
          };
        }
      }
    }

    /*
      FORMAT:
      1 DEFINITELY YES
      1. DEFINITELY YES
      1) DEFINITELY YES
      1 - DEFINITELY YES
    */
    let match = line.match(
      /^(\d+)\s*[\.\)\-:]?\s+(.+)$/
    );

    if (match) {
      return {
        code: match[1],
        label: cleanAnswerLabel(match[2])
      };
    }

    /*
      FORMAT:
      DEFINITELY YES (:1)
      DEFINITELY YES (1)
      DEFINITELY YES [1]
    */
    match = line.match(
      /^(.+?)\s*[\(\[]\s*:?\s*(\d+)\s*[\)\]]\s*$/
    );

    if (match) {
      return {
        code: match[2],
        label: cleanAnswerLabel(match[1])
      };
    }

    /*
      FORMAT:
      DEFINITELY YES - 1
      DEFINITELY YES – 1
      DEFINITELY YES — 1
    */
    match = line.match(
      /^(.+?)\s*[-–—]\s*:?\s*(\d+)\s*$/
    );

    if (match) {
      return {
        code: match[2],
        label: cleanAnswerLabel(match[1])
      };
    }

    /*
      FORMAT:
      DEFINITELY YES 1
      PROBABLY YES 2
    */
    match = line.match(
      /^(.+?)\s+(\d+)\s*$/
    );

    if (match) {
      return {
        code: match[2],
        label: cleanAnswerLabel(match[1])
      };
    }

    return null;
  }

  function parseNetGroupLine(rawLine) {
    const line = String(rawLine || "")
      .replace(/\r/g, "")
      .trim();

    if (!line) {
      return null;
    }

    const rangePattern =
      "[0-9]+(?:[-:,][0-9]+)*";

    /*
      FORMAT:
      TOTAL YES | 1-3
      1-3 | TOTAL YES
    */
    if (line.includes("|")) {
      const parts = line
        .split("|")
        .map(part => part.trim());

      if (parts.length >= 2) {
        const left = parts[0];
        const right = parts
          .slice(1)
          .join(" | ")
          .trim();

        const cleanRight =
          right.replace(/^:/, "");

        if (
          new RegExp("^" + rangePattern + "$")
            .test(left)
        ) {
          return {
            type: "range",
            range: normalizeCustomCodeRange(left),
            label: cleanNetGroupLabel(right),
            logic: "",
            options: "L-,SX"
          };
        }

        if (
          new RegExp("^" + rangePattern + "$")
            .test(cleanRight)
        ) {
          return {
            type: "range",
            range: normalizeCustomCodeRange(cleanRight),
            label: cleanNetGroupLabel(left),
            logic: "",
            options: "L-,SX"
          };
        }

        /*
          FORMAT:
          TOTAL KIGGANS | Q13:1-3 OR Q14:1
        */
        if (
          /\b[A-Z][A-Z0-9_]*\s*:\s*[0-9]/i
            .test(right)
        ) {
          return {
            type: "logic",
            label: cleanNetGroupLabel(left),
            logic: normalizeCustomNetLogic(right),
            range: "",
            options: "L-,SX"
          };
        }
      }
    }

    /*
      FORMAT:
      TOTAL KIGGANS/LEAN KIGGANS    Q13:1-3 OR Q14:1
    */
    const explicitLogicIndex = line.search(
      /\b[A-Z][A-Z0-9_]*\s*:\s*[0-9]/i
    );

    if (explicitLogicIndex > 0) {
      const label = line
        .slice(0, explicitLogicIndex)
        .trim();

      const rawLogic = line
        .slice(explicitLogicIndex)
        .trim();

      return {
        type: "logic",
        label: cleanNetGroupLabel(label),
        logic: normalizeCustomNetLogic(rawLogic),
        range: "",
        options: "L-,SX"
      };
    }

    /*
      FORMAT:
      1-3 TOTAL YES
      1:3 TOTAL YES
      1,2,3 TOTAL YES
    */
    let match = line.match(
      new RegExp(
        "^(" + rangePattern + ")\\s+(.+)$"
      )
    );

    if (match) {
      return {
        type: "range",
        range: normalizeCustomCodeRange(match[1]),
        label: cleanNetGroupLabel(match[2]),
        logic: "",
        options: "L-,SX"
      };
    }

    /*
      FORMAT:
      TOTAL YES (:1-3)
      TOTAL YES (1-3)
    */
    match = line.match(
      new RegExp(
        "^(.+?)\\s*[\\(\\[]\\s*:?\\s*(" +
          rangePattern +
          ")\\s*[\\)\\]]\\s*$"
      )
    );

    if (match) {
      return {
        type: "range",
        range: normalizeCustomCodeRange(match[2]),
        label: cleanNetGroupLabel(match[1]),
        logic: "",
        options: "L-,SX"
      };
    }

    /*
      FORMAT:
      TOTAL YES - 1-3
    */
    match = line.match(
      new RegExp(
        "^(.+?)\\s*[-–—]\\s*:?\\s*(" +
          rangePattern +
          ")\\s*$"
      )
    );

    if (match) {
      return {
        type: "range",
        range: normalizeCustomCodeRange(match[2]),
        label: cleanNetGroupLabel(match[1]),
        logic: "",
        options: "L-,SX"
      };
    }

    /*
      FORMAT:
      TOTAL YES 1-3
    */
    match = line.match(
      new RegExp(
        "^(.+?)\\s+(" + rangePattern + ")\\s*$"
      )
    );

    if (match) {
      return {
        type: "range",
        range: normalizeCustomCodeRange(match[2]),
        label: cleanNetGroupLabel(match[1]),
        logic: "",
        options: "L-,SX"
      };
    }

    return null;
  }

  function cleanAnswerOptionsText(value) {
    return String(value || "")
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map(line => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          return "";
        }

        const parsed =
          parseAnswerOptionLine(trimmedLine);

        if (!parsed) {
          return cleanAnswerLabel(trimmedLine);
        }

        return (
          parsed.code +
          "\t" +
          parsed.label
        );
      })
      .join("\n")
      .trim();
  }

  function buildRowsFromAnswerOptions(
    answerOptionsText,
    questionCode,
    netGroups = [],
    rankRLCodes = ""
  ) {
    if (!answerOptionsText) {
      return [];
    }

    const rlCodes = new Set(
      parseRankRLCodes(
        rankRLCodes || ""
      ) || []
    );

    /*
      Parse tất cả Answer Options trước.
    */
    const parsedOptions =
      String(answerOptionsText || "")
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .map(line => {
          const parsed =
            parseAnswerOptionLine(line);

          if (!parsed) {
            return {
              isValid: false,
              rawLine: line,
              code: "",
              label: "",
              insideNet: false
            };
          }

          return {
            isValid: true,
            rawLine: line,
            code: parsed.code,
            label: parsed.label,

            /*
              Kiểm tra Answer Option có thuộc
              ít nhất một NET Group hay không.
            */
            insideNet:
    getAllNetAnswerCodes(netGroups)
      .has(Number(parsed.code))
          };
        });

    /*
      Stable partition:

      1. Answer Options thuộc NET ở trên.
      2. Answer Options không thuộc NET xuống dưới.
      3. Giữ nguyên thứ tự trong từng nhóm.
    */
    const optionsInsideNet =
      parsedOptions.filter(option => {
        return (
          option.isValid &&
          option.insideNet
        );
      });

    const optionsOutsideNet =
      parsedOptions.filter(option => {
        return (
          option.isValid &&
          !option.insideNet
        );
      });

    const invalidOptions =
      parsedOptions.filter(option => {
        return !option.isValid;
      });

    const sortedOptions = [
      ...optionsInsideNet,
      ...optionsOutsideNet,
      ...invalidOptions
    ];

    return sortedOptions.map(option => {
      if (!option.isValid) {
        return (
          " *** ERROR: INVALID ANSWER OPTION - " +
          option.rawLine +
          " ***"
        );
      }

      const suffix =
        rlCodes.has(Number(option.code))
          ? "RL"
          : "";

      return formatSyntaxRow(
        option.label,
        questionCode +
          " (" +
          option.code +
          ")",
        {
          /*
            Answer thuộc NET được indent.
            Answer ngoài NET không indent.
          */
          indent:
            option.insideNet
              ? "   "
              : " ",

          logicColumn: 34,
          suffix
        }
      );
    });
  }

  function parseAnswerOptions(answerOptionsText) {
    if (!answerOptionsText) {
      return [];
    }

    return String(answerOptionsText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "")
      .map(line => {
        return parseAnswerOptionLine(line);
      })
      .filter(item => item !== null);
  }

  function isMeanSupportedQuestionType(
    questionType
  ) {
    return isKnownQuestionType(
      questionType
    );
  }

  function parseMeanCodeInput(value) {
    const clean = String(value || "")
      .trim()
      .replace(/[–—:]/g, "-")
      .replace(/\s+/g, "");

    if (!clean) {
      return [];
    }

    const codes = [];

    const tokens = clean
      .split(",")
      .filter(token => token !== "");

    for (const token of tokens) {
      /*
        Single code:
        5
        99
      */
      if (/^\d+$/.test(token)) {
        codes.push(Number(token));
        continue;
      }

      /*
        Range:
        1-10
        10-1
      */
      const rangeMatch = token.match(
        /^(\d+)-(\d+)$/
      );

      if (!rangeMatch) {
        return null;
      }

      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);

      const low = Math.min(start, end);
      const high = Math.max(start, end);

      for (
        let code = low;
        code <= high;
        code++
      ) {
        codes.push(code);
      }
    }

    return [
      ...new Set(codes)
    ].sort((a, b) => a - b);
  }

  function parseRankRLCodes(value) {

    return parseMeanCodeInput(value);

  }

  function compressMeanCodes(codes) {
    const numbers = [
      ...new Set(
        codes
          .map(code => Number(code))
          .filter(code => Number.isFinite(code))
      )
    ].sort((a, b) => a - b);

    if (numbers.length === 0) {
      return "";
    }

    const ranges = [];

    let rangeStart = numbers[0];
    let previous = numbers[0];

    for (
      let index = 1;
      index < numbers.length;
      index++
    ) {
      const current = numbers[index];

      if (current === previous + 1) {
        previous = current;
        continue;
      }

      ranges.push(
        rangeStart === previous
          ? String(rangeStart)
          : rangeStart + "-" + previous
      );

      rangeStart = current;
      previous = current;
    }

    ranges.push(
      rangeStart === previous
        ? String(rangeStart)
        : rangeStart + "-" + previous
    );

    return ranges.join(",");
  }

  function normalizeMeanCodeRange(value) {
    const codes = parseMeanCodeInput(value);

    if (!codes || codes.length === 0) {
      return "";
    }

    return compressMeanCodes(codes);
  }

  function getMeanCodesFromTemplate(rowType) {
    const normalizedRowType =
      normalizeRowType(rowType);

    const template =
      rowTemplates[normalizedRowType] || [];

    return template
      .map(line => {
        if (isDSLine(line)) {
          return null;
        }

        const parts =
          String(line || "").split("^");

        const logic =
          String(parts[1] || "").trim();

        /*
          Chỉ lấy code đơn:
          {VAR} (10)

          Không lấy Total:
          {VAR} (8-10)
        */
        const match = logic.match(
          /^\{VAR\}\s*\(\s*(\d+)\s*\)$/i
        );

        return match ? match[1] : null;
      })
      .filter(code => code !== null);
  }

  function getMeanCodesFromDemographicTemplate(
    rowType
  ) {
    const normalizedRowType =
      normalizeRowType(rowType);

    const template =
      demographicTemplates[
        normalizedRowType
      ] || [];

    const codes = [];

    template.forEach(line => {
      if (isDSLine(line)) {
        return;
      }

      const parts =
        String(line || "").split("^");

      const logic =
        String(parts[1] || "");

      /*
        Chỉ lấy code đơn:
        {VAR} (1)
        {VAR} (2)

        Không lấy:
        {VAR} (1-3)
      */
      const matches = [
        ...logic.matchAll(
          /\{VAR\}\s*\(\s*(\d+)\s*\)/gi
        )
      ];

      matches.forEach(match => {
        codes.push(match[1]);
      });
    });

    return [...new Set(codes)];
  }

  function getMeanAvailableCodesFromCurrentInput() {
    const questionType =
      questionTypeSelect.value;

    const rowType =
      normalizeRowType(
        rowTypeSelect.value
      );

    /*
      Single Choice và Array.
    */
    if (
      questionType === "single_choice" ||
      questionType === "array"
    ) {
      if (rowType === "custom_code") {
        return parseAnswerOptions(
          answerOptionsInput.value
        ).map(option => option.code);
      }

      return getMeanCodesFromTemplate(
        rowTypeSelect.value
      );
    }

    /*
      Multiple Choice lấy code từ Answer Options.
    */
    if (
      questionType === "multiple_choice"
    ) {
      return parseAnswerOptions(
        answerOptionsInput.value
      ).map(option => option.code);
    }

    /*
      Demographic.
    */
    if (
      questionType === "demographic"
    ) {
      if (rowType === "custom_code") {
        return parseAnswerOptions(
          answerOptionsInput.value
        ).map(option => option.code);
      }

      return getMeanCodesFromDemographicTemplate(
        rowTypeSelect.value
      );
    }

    /*
      Summary, Ranking và Listout không có
      một Answer Options chung để kiểm tra.

      Trả null nghĩa là chỉ validate format range.
    */
    return null;
  }

  function toggleMeanSetupUI() {
    const questionType =
      questionTypeSelect.value;

    const supported =
      isMeanSupportedQuestionType(
        questionType
      );

    if (!supported) {
      sharedMeanSetupBox.classList.add(
        "hidden"
      );

      meanSetupBox.classList.add(
        "hidden"
      );

      useMeanCheckbox.checked = false;
      meanCodeRangeInput.value = "";

      return;
    }

    /*
      Hiện checkbox Active MEAN.
    */
    sharedMeanSetupBox.classList.remove(
      "hidden"
    );

    /*
      Chỉ hiện ô nhập range khi được tick.
    */
    if (useMeanCheckbox.checked) {
      meanSetupBox.classList.remove(
        "hidden"
      );
    } else {
      meanSetupBox.classList.add(
        "hidden"
      );
    }
  }

  function normalizeCustomCodeRange(value) {
    return String(value || "")
      .trim()
      .replace(/:/g, "-");
  }

  function normalizeCustomNetLogic(logicText) {
    return String(logicText || "")
      /*
        Đồng nhất các loại dấu gạch ngang.
      */
      .replace(/[–—]/g, "-")

      /*
        Convert:
        Q13:1-3 => Q13(1-3)
        Q14:1   => Q14(1)

        Đồng thời hỗ trợ:
        M1:1-2
        D1B:3
        BALLOT_A:1-2
      */
      .replace(
        /\b([A-Z][A-Z0-9_]*)\s*:\s*([0-9,\-]+)\b/gi,
        function (_, variable, codes) {
          return (
            variable.toUpperCase() +
            "(" +
            codes +
            ")"
          );
        }
      )

      /*
        Convert toán tử sang WinCross:
        OR  => or
        AND => &
      */
      .replace(/\bAND\b/gi, "&")
      .replace(/\bOR\b/gi, "or")

      /*
        Chuẩn hóa khoảng trắng.
      */
      .replace(/\s*&\s*/g, " & ")
      .replace(/\s+or\s+/gi, " or ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseCustomNetGroups(text) {
    if (!String(text || "").trim()) {
      return [];
    }

    return String(text || "")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "")
      .map(line => {
        return parseNetGroupLine(line);
      })
      .filter(item => {
        if (!item || !item.label) {
          return false;
        }

        if (item.type === "logic") {
          return Boolean(item.logic);
        }

        return Boolean(item.range);
      });
  }

  function countCustomNetLogicTerms(logicText) {
    const matches = String(logicText || "").match(
      /\b[A-Z][A-Z0-9_]*\s*\([^)]+\)/gi
    );

    return matches ? matches.length : 0;
  }

  function formatCustomNetGroupLogic(group, questionCode) {
    /*
      Explicit logic:
      Q13:1-3 OR Q14:1
    */
    if (group.logic) {
      let normalizedLogic =
        normalizeCustomNetLogic(group.logic);

      /*
        Bỏ dấu {} bên ngoài nếu dữ liệu cũ
        đã được lưu kèm dấu ngoặc nhọn.
      */
      normalizedLogic = normalizedLogic
        .replace(/^\{\s*/, "")
        .replace(/\s*\}$/, "")
        .trim();

      const termCount =
        countCustomNetLogicTerms(normalizedLogic);

      const hasBooleanOperator =
        /\s(?:or|&)\s/i.test(normalizedLogic);

      const hasComplexLogic =
        /\bnot\b/i.test(normalizedLogic) ||
        /[{}]/.test(normalizedLogic);

      /*
        Quy tắc mới:

        1–2 điều kiện:
        Q13(1-3) or Q14(1)

        Từ 3 điều kiện trở lên:
        {Q13(1-3) or Q14(1) or Q15(2)}
      */
      if (
        hasBooleanOperator &&
        (termCount > 2 || hasComplexLogic)
      ) {
        return "{" + normalizedLogic + "}";
      }

      return normalizedLogic;
    }

    /*
      Range cũ:
      1-3 TOTAL YES
      =>
      Q13 (1-3)
    */
    return (
      questionCode +
      " (" +
      group.range +
      ")"
    );
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

  function isAnswerCodeInsideNetGroups(
    answerCode,
    netGroups
  ) {
    return netGroups.some(group => {
      /*
        Explicit logic không có range trực tiếp
        của Answer Options hiện tại.
      */
      if (!group.range) {
        return false;
      }

      const codes = expandCodeRange(
        group.range
      );

      return codes.includes(
        String(answerCode)
      );
    });
  }

  function getAllNetAnswerCodes(netGroups = []) {

    const codes = new Set();

    netGroups.forEach(net => {

      // NET dạng range: 1-3
      if (net.range) {

        const parsed =
          parseMeanCodeInput(net.range);

        if (parsed) {
          parsed.forEach(code =>
            codes.add(Number(code))
          );
        }
      }


      // NET dạng logic:
      // Q13:1-3 OR Q14:1
      if (net.logic) {

        const matches =
          String(net.logic)
            .match(/\d+(?:-\d+)?/g);

        if (matches) {

          matches.forEach(item => {

            const parsed =
              parseMeanCodeInput(item);

            if (parsed) {
              parsed.forEach(code =>
                codes.add(Number(code))
              );
            }

          });

        }

      }

    });


    return codes;
  }

  function buildCustomDSSetup() {
    let dsChoices = [];

    const questionType = questionTypeSelect.value;
    const rowType = normalizeRowType(
      rowTypeSelect.value
    );

    /*
      Nhánh mới: predefined demographic.
    */
    if (
      questionType === "demographic" &&
      rowType !== "custom_code"
    ) {
      dsChoices = getDemographicDSChoices();
    } else {
      /*
        Logic cũ cho Custom Code,
        Multiple Choice và Array.
      */
      const netGroups = useCustomNetGroupsCheckbox.checked
        ? parseCustomNetGroups(customNetGroupsInput.value)
        : [];

      const answerOptions = parseAnswerOptions(
        answerOptionsInput.value
      );

      dsChoices = [
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
            rowNumber:
              netGroups.length + index + 2
          };
        })
      ];
    }

    if (dsChoices.length < 2) {
      alert(
        "Please enter or select at least two rows for D/S."
      );

      return;
    }

    customDSPositiveSelect.innerHTML = "";
    customDSNegativeSelect.innerHTML = "";

    dsChoices.forEach(choice => {
      const value =
        choice.type +
        "|" +
        choice.label +
        "|" +
        choice.rowNumber;

      const positiveOption =
        document.createElement("option");

      positiveOption.value = value;
      positiveOption.textContent = choice.label;

      const negativeOption =
        document.createElement("option");

      negativeOption.value = value;
      negativeOption.textContent = choice.label;

      customDSPositiveSelect.appendChild(
        positiveOption
      );

      customDSNegativeSelect.appendChild(
        negativeOption
      );
    });

    /*
      Tạm thời chọn row đầu và row cuối.
      Phần dưới sẽ xử lý default từ template.
    */
    customDSPositiveSelect.selectedIndex = 0;
    customDSNegativeSelect.selectedIndex =
      dsChoices.length - 1;

    setDemographicDefaultDSSelection(dsChoices);

    customDSBox.classList.remove("hidden");
  }

  function getTemplateDSRowNumbers(rowType) {
    const normalizedRowType =
      normalizeRowType(rowType);

    const template =
      demographicTemplates[normalizedRowType];

    if (!template) {
      return null;
    }

    const dsLine = template.find(line => {
      return isDSLine(line);
    });

    if (!dsLine) {
      return null;
    }

    const match = dsLine.match(
      /CALC\s+F(\d+)-F(\d+)/i
    );

    if (!match) {
      return null;
    }

    return {
      positiveRowNumber: Number(match[1]),
      negativeRowNumber: Number(match[2])
    };
  }

  function setDemographicDefaultDSSelection(
    dsChoices
  ) {
    if (
      questionTypeSelect.value !== "demographic"
    ) {
      return;
    }

    const defaultRows =
      getTemplateDSRowNumbers(
        rowTypeSelect.value
      );

    if (!defaultRows) {
      return;
    }

    const positiveChoice = dsChoices.find(
      choice => {
        return (
          choice.rowNumber ===
          defaultRows.positiveRowNumber
        );
      }
    );

    const negativeChoice = dsChoices.find(
      choice => {
        return (
          choice.rowNumber ===
          defaultRows.negativeRowNumber
        );
      }
    );

    if (positiveChoice) {
      customDSPositiveSelect.value =
        positiveChoice.type +
        "|" +
        positiveChoice.label +
        "|" +
        positiveChoice.rowNumber;
    }

    if (negativeChoice) {
      customDSNegativeSelect.value =
        negativeChoice.type +
        "|" +
        negativeChoice.label +
        "|" +
        negativeChoice.rowNumber;
    }
  }

  function buildCustomNetGroupLines(table) {
    const netGroups =
      table.customNetGroups || [];

    return netGroups.map(group => {
      const logic =
        formatCustomNetGroupLogic(
          group,
          table.questionCode
        );

      return formatSyntaxRow(
        group.label,
        logic,
        {
          indent: " ",
          logicColumn: 34,
          suffix:
            group.options || "L-,SX"
        }
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
    return String(title || "")
      .replace(/[–—]/g, "-")
      .replace(/\s+-\s+/g, " ")
      .replace(/\bD\/S\b/gi, "(D/S)")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeSummaryLabel(label) {
    return String(label || "")
      .replace(/^TOTAL\s+/i, "TOT ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /*
    Chuyển source code dạng:

    Q1       => ["Q1"]
    SEN      => ["SEN"]
    D1B      => ["D1B"]
    Q1/2     => ["Q1", "Q2"]
    Q34/35   => ["Q34", "Q35"]
    SEN/GOV  => ["SEN", "GOV"]
  */
  function expandSummarySourceCodes(sourceText) {
    const clean = String(sourceText || "")
      .trim()
      .replace(/\.$/, "")
      .toUpperCase();

    if (!clean) {
      return [];
    }

    const parts = clean
      .split("/")
      .map(part => part.trim())
      .filter(part => part !== "");

    if (parts.length === 1) {
      return parts;
    }

    /*
      Với Q1/2, phần đầu là Q1 và phần sau chỉ là 2.
      App tự kế thừa prefix Q.
    */
    const firstMatch = parts[0].match(/^([A-Z_]+)(\d+)$/);

    if (!firstMatch) {
      return parts;
    }

    const prefix = firstMatch[1];

    return parts.map(part => {
      if (/^\d+$/.test(part)) {
        return prefix + part;
      }

      return part;
    });
  }

  function extractSummaryDSInfo(title) {
    /*
      Nhận các dạng:

      (:1-2 MINUS :4-5)
      (:1-2 MINUS 4-5)
      (:1-2 - :4-5)
      (:1 MINUS :2)
    */
    const cleanTitle = String(title || "").trim();

    const minusMatch = cleanTitle.match(
      /\(:\s*([0-9,\-]+)\s*(?:MINUS|-)\s*:?\s*([0-9,\-]+)\s*\)/i
    );

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

  function parseSummaryBlockHeader(line) {
    /*
      Nhận các dạng:

      Q1. GENERIC BALLOT D/S (:1-2 MINUS :4-5)
      Q1/2. COMBINED BALLOT D/S (:1-2 MINUS :6-7)
      Q1/2 COMBINED BALLOT D/S
      SEN. REELECT SENATOR WARNER D/S (:1 MINUS :2)
      SEN REELECT SENATOR WARNER D/S (:1 MINUS :2)
      D1B. AGE GROUP
      BALLOT_A. FINAL BALLOT D/S (:1-2 MINUS :6-7)
    */
    const cleanLine = String(line || "").trim();

    const match = cleanLine.match(
      /^([A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*)(\.)?\s+(.+)$/i
    );

    if (!match) {
      return null;
    }

    const rawSource = match[1].trim();
    const hasPeriod = Boolean(match[2]);
    let rawTitle = match[3].trim();

    /*
      Không có dấu chấm vẫn cho phép:

      Q1 GENERIC BALLOT...
      Q1/2 COMBINED BALLOT...
      SEN REELECT ... D/S

      Nhưng tránh nhận nhầm row thông thường làm block title.
    */
    const looksLikeQCode = /^Q\d/i.test(rawSource);
    const titleHasDS = /\bD\/S\b/i.test(rawTitle);

    if (!hasPeriod && !looksLikeQCode && !titleHasDS) {
      return null;
    }

    const dsInfo = extractSummaryDSInfo(rawTitle);

    /*
      Xóa phần D/S code ở cuối title:

      REELECT SENATOR WARNER D/S (:1 MINUS :2)
      =>
      REELECT SENATOR WARNER D/S
    */
    rawTitle = rawTitle
      .replace(/\s*\(:.*?\)\s*$/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return {
      sourceCode: rawSource
        .replace(/\.$/, "")
        .toUpperCase(),

      title: normalizeSummaryTitle(rawTitle).toUpperCase(),

      dsPositiveCode: dsInfo.positiveCode,
      dsNegativeCode: dsInfo.negativeCode,

      rows: [],
      warnings: []
    };
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

  function parseSummaryRowLine(line, sourceCode) {
    /*
      FORMAT A — kế thừa source code của block:

      REELECT (:1)
      NEW PERSON (:2)
      NOT SURE (:3)

      Nếu block là SEN, logic nội bộ sẽ thành:

      SEN:1
      SEN:2
      SEN:3
    */
    const inheritMatch = line.match(
      /^(.+?)\s+\(:\s*([0-9,\-]+)\s*\)\s*$/i
    );

    if (inheritMatch) {
      return {
        label: normalizeSummaryLabel(
          inheritMatch[1]
        ),

        logic:
          sourceCode +
          ":" +
          inheritMatch[2].trim()
      };
    }

    /*
      FORMAT B — biểu thức được bọc bởi hai lớp ngoặc:

      MOVE TO YES
      ((Q1:3-7 OR Q2:3-7) AND (SEN:1 OR SEN:2))
    */
    const doubleParenExpression = line.match(
      /^(.+?)\s+\(\((.+)\)\)\s*$/i
    );

    if (doubleParenExpression) {
      return {
        label: normalizeSummaryLabel(
          doubleParenExpression[1]
        ),

        logic: normalizeSummaryLogicText(
          doubleParenExpression[2].trim()
        )
      };
    }

    /*
      FORMAT C — biểu thức được bọc bởi một lớp ngoặc:

      MOVE TO YES (Q1:3-7 OR Q2:3-7)
      REELECT SENATOR (SEN:1)
    */
    const singleExpression = line.match(
      /^(.+?)\s+\((.+)\)\s*$/i
    );

    if (
      singleExpression &&
      /\b[A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*\s*:/i
        .test(singleExpression[2])
    ) {
      return {
        label: normalizeSummaryLabel(
          singleExpression[1]
        ),

        logic: normalizeSummaryLogicText(
          singleExpression[2].trim()
        )
      };
    }

    /*
      FORMAT D — logic dùng dấu hai chấm:

      REELECT SEN:1
      TOTAL YES Q1/2:1-2
      MOVED TO YES Q1:3-7 OR Q2:3-7
    */
    const colonLogicPattern =
      /\b[A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*\s*:/i;

    const colonLogicMatch = line.match(
      colonLogicPattern
    );

    if (
      colonLogicMatch &&
      colonLogicMatch.index !== undefined
    ) {
      return {
        label: normalizeSummaryLabel(
          line.slice(0, colonLogicMatch.index)
        ),

        logic: normalizeSummaryLogicText(
          line
            .slice(colonLogicMatch.index)
            .trim()
        )
      };
    }

    /*
      FORMAT E — logic đã có ngoặc sẵn:

      REELECT SEN (1)
      TOTAL YES Q1 (1-2) OR Q2 (1-2)
    */
    const parenLogicPattern =
      /\b[A-Z][A-Z0-9_]*\s*\([^)]+\)/i;

    const parenLogicMatch = line.match(
      parenLogicPattern
    );

    if (
      parenLogicMatch &&
      parenLogicMatch.index !== undefined
    ) {
      return {
        label: normalizeSummaryLabel(
          line.slice(0, parenLogicMatch.index)
        ),

        logic: normalizeSummaryLogicText(
          line
            .slice(parenLogicMatch.index)
            .trim()
        )
      };
    }

    return null;
  }

  function parseSummaryRawText(rawText) {
    const lines = String(rawText || "")
      .split("\n")
      .map(line => line.trim())
      .filter(line => line !== "");

    const blocks = [];
    let currentBlock = null;

    lines.forEach(line => {
      const block = parseSummaryBlockHeader(line);

      /*
        Khi gặp Q1., SEN., D1B....
        bắt đầu một Summary Block mới.
      */
      if (block) {
        currentBlock = block;
        blocks.push(currentBlock);
        return;
      }

      /*
        Fallback khi input không có block header.
      */
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

      const row = parseSummaryRowLine(
        line,
        currentBlock.sourceCode
      );

      if (row) {
        currentBlock.rows.push(row);
      } else {
        currentBlock.warnings.push(line);
      }
    });

    return blocks;
  }

  function formatSimpleSummaryGroup(token) {
    /*
      Q1:1-2
      =>
      Q1 (1-2)

      Q1/2:1-2
      =>
      Q1 (1-2) or Q2 (1-2)

      SEN:1
      =>
      SEN (1)
    */
    const clean = String(token || "").trim();

    const match = clean.match(
      /^([A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*)\s*:\s*([0-9,\-]+)$/i
    );

    if (!match) {
      return clean;
    }

    const variables = expandSummarySourceCodes(
      match[1]
    );

    const code = match[2].trim();

    return variables
      .map((variable, index) => {
        if (index === 0) {
          return (
            variable +
            " (" +
            code +
            ")"
          );
        }

        return (
          "or " +
          variable +
          " (" +
          code +
          ")"
        );
      })
      .join(" ");
  }

  function formatAlreadyParenthesizedSummaryLogic(logic) {
    return String(logic || "")
      .replace(/\bAND\b/gi, "&")
      .replace(/\bOR\b/gi, "or")
      .replace(/\s+/g, " ")
      .trim();
  }

  function convertSummaryExpressionTokens(text) {
    /*
      Chuyển tất cả source:code thành source(code):

      Q1:1-2 => Q1(1-2)
      SEN:1   => SEN(1)

      Q1/2:1-2
      =>
      Q1(1-2) or Q2(1-2)
    */
    return String(text || "").replace(
      /\b([A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*)\s*:\s*([0-9,\-]+)\b/gi,

      function (_, source, codes) {
        return expandSummarySourceCodes(source)
          .map(variable => {
            return (
              variable +
              "(" +
              codes +
              ")"
            );
          })
          .join(" or ");
      }
    );
  }

  function formatComplexSummaryExpression(expression) {
    let text = String(expression || "")
      .trim()
      .replace(/\bAND\b/gi, "&")
      .replace(/\bOR\b/gi, "or");

    /*
      Chuyển group:

      (Q1:3-7 OR Q2:3-7)
      =>
      {Q1(3-7) or Q2(3-7)}

      (SEN:1 OR SEN:2)
      =>
      {SEN(1) or SEN(2)}
    */
    text = text.replace(
      /\(([^()]*(?:[A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*\s*:\s*[0-9,\-]+)[^()]*)\)/gi,

      function (_, groupContent) {
        return (
          "{" +
          convertSummaryExpressionTokens(
            groupContent
          ) +
          "}"
        );
      }
    );

    /*
      Convert các source:code còn lại
      không nằm trong group.
    */
    text = convertSummaryExpressionTokens(text);

    return text
      .replace(/\s*&\s*/g, " & ")
      .replace(/\s+or\s+/gi, " or ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatSummaryLogic(logic) {
    const cleanLogic = String(logic || "")
      .trim();

    if (!cleanLogic) {
      return "";
    }

    /*
      Logic đơn:

      SEN:1
      Q1:1-2
      Q1/2:1-2
    */
    if (
      /^[A-Z][A-Z0-9_]*(?:\/(?:[A-Z][A-Z0-9_]*|\d+))*\s*:\s*[0-9,\-]+$/i
        .test(cleanLogic)
    ) {
      return formatSimpleSummaryGroup(
        cleanLogic
      );
    }

    /*
      Logic đã có ngoặc:

      SEN (1)
      Q1 (1-2) OR Q2 (1-2)
    */
    if (
      /\b[A-Z][A-Z0-9_]*\s*\([^)]+\)/i
        .test(cleanLogic) &&
      !cleanLogic.includes(":")
    ) {
      return formatAlreadyParenthesizedSummaryLogic(
        cleanLogic
      );
    }

    /*
      Logic phức tạp:

      Q1:3-7 OR Q2:3-7
      (Q1:3-7 OR Q2:3-7) AND (SEN:1 OR SEN:2)
    */
    return formatComplexSummaryExpression(
      cleanLogic
    );
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
        title:
    normalizeSummaryTitle(
      card.querySelector(".summary-title-input").value
    ).toUpperCase() ||
    normalizeSummaryTitle(parsedBlock.title).toUpperCase(),
        positiveLabel: card.querySelector(".summary-positive-select")?.value || "",
        negativeLabel: card.querySelector(".summary-negative-select")?.value || "",
        suffix: card.querySelector(".summary-suffix-input").value.trim() || "SX,L-",
        rows: parsedBlock.rows
      };
    });
  }

  function buildSummaryTableLines(
    summaryBlocks
  ) {
    const lines = [];
    let currentRowNumber = 1;

    summaryBlocks.forEach(block => {
      const positiveIndex =
        block.rows.findIndex(
          row =>
            row.label ===
            block.positiveLabel
        );

      const negativeIndex =
        block.rows.findIndex(
          row =>
            row.label ===
            block.negativeLabel
        );

      const positiveRowNumber =
        positiveIndex >= 0
          ? currentRowNumber +
            positiveIndex +
            1
          : currentRowNumber + 1;

      const negativeRowNumber =
        negativeIndex >= 0
          ? currentRowNumber +
            negativeIndex +
            1
          : currentRowNumber + 1;

      const calcText =
        "CALC F" +
        positiveRowNumber +
        "-F" +
        negativeRowNumber +
        ",V" +
        positiveRowNumber +
        "-V" +
        negativeRowNumber;

      lines.push(
        formatSyntaxRow(
          normalizeSummaryTitle(block.title).toUpperCase(),
          calcText,
          {
            indent: " ",
            logicColumn: 34,
            suffix:
              block.suffix || "SX,L-"
          }
        )
      );

      block.rows.forEach(row => {
        const logic =
          formatSummaryLogic(row.logic);

        lines.push(
        formatSyntaxRow(
    normalizeSummaryTitle(row.label).toUpperCase(),
    logic,
    {
      indent: "   ",
      logicColumn: 34
    }
  )
        );
      });

      currentRowNumber +=
        1 + block.rows.length;
    });

    return lines;
  }

  function collectSharedFeatureState() {
    const useRank =
      useRankCheckbox.checked === true;

    let rankRLCodes = "";

    /*
      Parse + normalize RL Codes
    */
    if (
      useRank &&
      rankRLCodesInput.value.trim()
    ) {
      const rlCodes =
        parseRankRLCodes(
          rankRLCodesInput.value
        );

      if (rlCodes === null) {
        alert(
          "Please enter valid RL Codes.\n\n" +
          "Example:\n" +
          "9-12\n" +
          "9,10,11,12"
        );

        return null;
      }

      const availableCodes =
    getMeanAvailableCodesFromCurrentInput();

  /*
    Validate RL codes against
    available answer codes.
  */
  if (
    Array.isArray(availableCodes) &&
    availableCodes.length > 0
  ) {
    const availableCodeSet =
      new Set(
        availableCodes.map(String)
      );

    const missingCodes =
      rlCodes.filter(code => {
        return !availableCodeSet.has(
          String(code)
        );
      });

    if (missingCodes.length > 0) {
      alert(
        "These RL codes were not found in the answer rows:\n\n" +
        missingCodes.join(", ")
      );

      return null;
    }
  }

      rankRLCodes =
        compressMeanCodes(rlCodes);

      // Auto normalize textbox
      rankRLCodesInput.value =
        rankRLCodes;
    }

    const useMean =
      useMeanCheckbox.checked === true;

    /*
      Không bật MEAN.
    */
    if (!useMean) {
      return {
        useRank,
        rankRLCodes,
        useMean: false,
        meanCodeRange: ""
      };
    }

    const meanCodes =
      parseMeanCodeInput(
        meanCodeRangeInput.value
      );

    if (
      meanCodes === null ||
      meanCodes.length < 2
    ) {
      alert(
        "Please enter a valid MEAN Code Range.\n\n" +
        "Example: 1-10 or 1-5,7,9-10"
      );

      return null;
    }

    const availableCodes =
      getMeanAvailableCodesFromCurrentInput();

    /*
      Chỉ đối chiếu code nếu Question Type
      có danh sách answer code rõ ràng.
    */
    if (
      Array.isArray(availableCodes) &&
      availableCodes.length > 0
    ) {
      const availableCodeSet =
        new Set(
          availableCodes.map(String)
        );

      const missingCodes =
        meanCodes.filter(code => {
          return !availableCodeSet.has(
            String(code)
          );
        });

      if (missingCodes.length > 0) {
        alert(
          "These MEAN codes were not found in the answer rows:\n\n" +
          missingCodes.join(", ")
        );

        return null;
      }
    }

    const meanCodeRange =
      compressMeanCodes(meanCodes);

    meanCodeRangeInput.value =
      meanCodeRange;

    return {
      useRank,
      rankRLCodes,
      useMean: true,
      meanCodeRange
    };
  }

  function collectTablesFromInput() {
    if (projectTypeSelect.value === "F4") {
      if (!f4Rows.length) { alert("Upload or add at least one F4 Crosstab row first."); return null; }
      return collectF4Tables();
    }

    const rawQuestionCode = questionCodeInput.value.trim();
    const questionCodes = expandQuestionCodes(rawQuestionCode);

    const effectiveQuestionType =
    questionTypeSelect.value ===
      "single_choice" &&
    questionCodes.length > 1
      ? "array"
      : questionTypeSelect.value;

    const questionText =
    normalizeQuestionText(
      questionTextInput.value
    );

    const currentAskedBaseText =
    askedBaseTextInput.value.trim();

  const currentBaseType =
    currentAskedBaseText
      ? "asked_base"
      : "total_sample";

  questionTextInput.value = questionText;

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

    const sharedFeatureState =
    collectSharedFeatureState();

  if (!sharedFeatureState) {
    return null;
  }

  const {
    useRank,
      rankRLCodes,
    useMean,
    meanCodeRange
  } = sharedFeatureState;

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
          useRank,
            rankRLCodes,
  useMean,
  meanCodeRange,
          subtitleOnly: "",
          baseType: currentBaseType,
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
        useDS: useDSCheckbox.checked,
        
        useRank,
          rankRLCodes,
  useMean,
  meanCodeRange,

        subtitleOnly: "",
        baseType: currentBaseType,
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

    if (
    useDSCheckbox.checked &&
    normalizeRowType(rowTypeSelect.value) !==
      "custom_code"
  ) {
    if (
      !customDSPositiveSelect.value ||
      !customDSNegativeSelect.value
    ) {
      alert(
        "Please click Build D/S Setup and select D/S rows."
      );

      return null;
    }

    const positive = parseCustomDSValue(
      customDSPositiveSelect.value
    );

    const negative = parseCustomDSValue(
      customDSNegativeSelect.value
    );

    if (
      positive.rowNumber ===
      negative.rowNumber
    ) {
      alert(
        "D/S Positive Row and Negative Row cannot be the same."
      );

      return null;
    }
  }
  
    return [{
    projectType:
      projectTypeSelect.value || "N2",

    questionCode: questionCodes[0],
    questionType: "demographic",
    rowType: rowTypeSelect.value,
    questionText,

    useST: false,
    useDS: useDSCheckbox.checked,
    useRank,
      rankRLCodes,
  useMean,
  meanCodeRange,

    subtitleOnly: "",
    baseType: currentBaseType,
    askedBaseText:
      askedBaseTextInput.value.trim(),

    manualUseIndex: "",
    answerOptions:
      answerOptionsInput.value.trim(),

    customNetGroups:
      parseCustomNetGroups(
        customNetGroupsInput.value
      ),

    customNetGroupsRaw:
      customNetGroupsInput.value.trim(),

    customDSPositive:
      customDSPositiveSelect.value || "",

    customDSNegative:
      customDSNegativeSelect.value || "",

    demographicAdditionalCodes:
      demographicAdditionalCodesInput.value.trim(),

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

      useRank,
        rankRLCodes,
  useMean,
  meanCodeRange,
      
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
        useRank,
          rankRLCodes,
  useMean,
  meanCodeRange,
        subtitleOnly: "",
        baseType: currentBaseType,
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

    const subtitleLines = getSubtitleLines();

    if (
    effectiveQuestionType === "array" &&
    questionCodes.length > 1 &&
    subtitleLines.length > 0
  ) {
      if (subtitleLines.length !== questionCodes.length) {
        alert(
          "Number of subtitle lines must match number of question codes.\n\n" +
          "Question codes: " + questionCodes.length + "\n" +
          "Subtitle lines: " + subtitleLines.length
        );
        return null;
      }
    }

    const isArrayRange =
    effectiveQuestionType === "array" &&
    questionCodes.length > 1;
    
  const arrayGroupId = isArrayRange ? "array_" + Date.now() : "";

  const isUsingArraySampleSetup =
    effectiveQuestionType === "array";

  let arraySampleSelections = [];

  if (isUsingArraySampleSetup) {
    /*
      Ưu tiên dữ liệu đang có trong modal.
      Nếu modal không còn DOM thì dùng dữ liệu đã Save.
    */
    const currentSelections =
      getArraySampleSelections();

    arraySampleSelections =
      currentSelections.length > 0
        ? currentSelections
        : pendingArraySampleSelections;

    if (
      arraySampleSelections.length !==
      questionCodes.length
    ) {
      alert(
        "Please click Build Array Sample Setup, select a sample for every Array item, then click Save."
      );

      return null;
    }
    /*
      Đồng bộ state lần cuối trước khi tạo table.
    */
    pendingArraySampleSelections =
      arraySampleSelections;
  }

  return questionCodes.map((code, index) => {
    return {
      projectType: projectTypeSelect.value || "N2",
      questionCode: code,
      questionType: effectiveQuestionType,
      rowType: rowTypeSelect.value,
      questionText,
      useST:
    effectiveQuestionType === "array",
      useDS: useDSCheckbox.checked,

      useRank,
        rankRLCodes,
  useMean,
  meanCodeRange,

      subtitleOnly: subtitleLines[index] || subtitleLines[0] || "",
  baseType:
    arraySampleSelections[index]?.sampleName
      ? "asked_base"
      : currentBaseType,

  askedBaseText:
    arraySampleSelections[index]?.sampleName
      ? arraySampleSelections[index].sampleName
      : currentAskedBaseText,

      useArraySampleSetup:
    effectiveQuestionType === "array",


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

  function buildMeanLine(table) {
    if (!table.useMean) {
      return "";
    }

    const range =
      normalizeMeanCodeRange(
        table.meanCodeRange
      );

    if (!range) {
      return "";
    }

    return formatSyntaxRow(
      "MEAN",
      table.questionCode +
        " (" +
        range +
        ")",
      {
        indent: " ",
        logicColumn: 34,
        suffix: "SM,SX"
      }
    );
  }

  function appendMeanLine(
    lines,
    table
  ) {
    const updatedLines = [
      ...lines
    ];

    const meanLine =
      buildMeanLine(table);

    if (meanLine) {
      updatedLines.push(
        meanLine
      );
    }

    return updatedLines;
  }

  function getExactSyntaxRowCode(line) {
    const parts =
      String(line || "").split("^");

    if (parts.length < 2) {
      return "";
    }

    const logic =
      String(parts[1] || "").trim();

    /*
      Chỉ match row code đơn:

      Q8 (10)
      Q8 (1)

      Không match:
      Q8 (8-10)
    */
    const match = logic.match(
      /^[A-Z0-9_]+\s*\(\s*(\d+)\s*\)$/i
    );

    return match ? match[1] : "";
  }

  function insertMeanLineIntoRows(
    rowLines,
    table
  ) {
    if (!table.useMean) {
      return rowLines;
    }

    const meanCodes =
      parseMeanCodeInput(
        table.meanCodeRange
      );

    const meanLine =
      buildMeanLine(table);

    if (
      !meanCodes ||
      meanCodes.length === 0 ||
      !meanLine
    ) {
      return rowLines;
    }

    const meanCodeSet = new Set(
      meanCodes.map(String)
    );

    let insertIndex = -1;

    rowLines.forEach((line, index) => {
      const rowCode =
        getExactSyntaxRowCode(line);

      if (meanCodeSet.has(rowCode)) {
        /*
          Lưu vị trí cuối cùng thuộc range.

          Với scale hiển thị:
          10, 9, 8 ... 1, 99

          vị trí cuối là row code 1.
        */
        insertIndex = index;
      }
    });

    const updatedLines = [...rowLines];

    if (insertIndex === -1) {
      updatedLines.push(meanLine);
    } else {
      updatedLines.splice(
        insertIndex + 1,
        0,
        meanLine
      );
    }

    return updatedLines;
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

  /*
    ADD TABLE — single entry point, single event listener
    (registered once inside attachCoreEventListeners()).

    outputEdited never blocks Add Table. The flow always
    regenerates Output from the current tables so the two
    never drift apart; outputEdited is reset to false here
    because the freshly generated Output is not a "manual edit".
  */
  function addTable() {
    const oldEditingTable =
      editingIndex !== null ? tables[editingIndex] : null;

    const newTables = collectTablesFromInput();

    if (!newTables || newTables.length === 0) {
      return;
    }

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
    outputEdited = false;
    saveSession();

    if (projectTypeSelect.value === "F4") {
      f4Rows = [];
      f4ModalDraftRows = [];
      f4ExcelFileName = "";
      if (f4ExcelInput) f4ExcelInput.value = "";
      renderF4FileStatus();
      renderF4Validation();
      exitEditMode();
      projectTypeSelect.value = "F4";
      toggleProjectModeUI();
      saveSession();
    } else {
      clearInputFields();
    }
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

    useMeanCheckbox.checked =
    firstTable.useMean === true;

    useRankCheckbox.checked =
    firstTable.useRank === true;
    
    rankRLCodesInput.value =
    firstTable.rankRLCodes || "";

  toggleRankRLBox();

  meanCodeRangeInput.value =
    firstTable.meanCodeRange || "";

  toggleMeanSetupUI();

    editingIndex = groupItems[0].index;
    editingArrayGroupId = clickedTable.arrayGroupId;
    editingArrayGroupStartIndex = groupItems[0].index;

    const questionCodes = groupTables.map(table => table.questionCode);

    projectTypeSelect.value = firstTable.projectType || "N2";
    questionCodeInput.value = compressQuestionCodesToRange(questionCodes);
    questionTypeSelect.value =
    "single_choice";

  useSTCheckbox.checked = true;
    questionTextInput.value = firstTable.questionText || "";

    populateRowTypeOptions(normalRowTypeOptions, firstTable.rowType || "");
    rowTypeSelect.value = firstTable.rowType || "";

    askedBaseTextInput.value = groupTables
      .map(table => table.askedBaseText || "")
      .filter(value => value !== "")
      .join(",");

    useSTCheckbox.checked = true;
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

      toggleAskedBaseBox();

      buildArraySampleSetup();

      const selects = [...arraySampleTableContainer.querySelectorAll(".array-sample-select")];

  const selections =
    groupTables.map(table => {
      return {
        sampleName:
          table.askedBaseText || ""
      };
    });

  pendingArraySampleSelections =
    selections;

  selects.forEach((select, index) => {
    select.value =
      selections[index]?.sampleName || "";
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
    saveSession();
  }

  function editTable(index) {
    const table = tables[index];

    if (table?.projectType === "F4" && table.f4Data) {
      projectTypeSelect.value = "F4";
      f4Rows = (table.f4Data.sourceRows || table.f4Data.rows.map(x => x.raw)).map(r => ({...r}));
      editingIndex = index;
      toggleProjectModeUI();
      renderF4Validation();
      openF4Generator();
      addBtn.textContent = "Update Table";
      cancelEditBtn.classList.remove("hidden");
      return;
    }

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
    questionTypeSelect.value =
    table.questionType === "array"
      ? "single_choice"
      : table.questionType;
    rowTypeSelect.value = table.rowType || "";
    questionTextInput.value = table.questionText || "";

    askedBaseTextInput.value = table.askedBaseText || "";

    useSTCheckbox.checked =
    table.questionType === "array"
      ? true
      : !!table.useST;
    useDSCheckbox.checked = table.useDS !== false;

    useRankCheckbox.checked =
    table.useRank === true;
    
    rankRLCodesInput.value =
    table.rankRLCodes || "";

  toggleRankRLBox();

    useMeanCheckbox.checked =
    table.useMean === true;

  meanCodeRangeInput.value =
    table.meanCodeRange || "";

  toggleMeanSetupUI();
  toggleQuestionTypeUI();

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

      toggleAskedBaseBox();

      // Rebuild popup table so old selection can be restored
      if (table.questionType === "array") {
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

    } else if (
    table.questionType === "demographic"
  ) {
    populateRowTypeOptions(
      demographicRowTypeOptions,
      table.rowType
    );

    rowTypeSelect.value = table.rowType;

    demographicAdditionalCodesInput.value =
      table.demographicAdditionalCodes || "";

    answerOptionsInput.value =
      table.answerOptions || "";

    customNetGroupsInput.value =
      table.customNetGroupsRaw || "";

    useDSCheckbox.checked =
      table.useDS === true;

    toggleUseDSBox();

    if (table.useDS) {
      buildCustomDSSetup();

      if (table.customDSPositive) {
        customDSPositiveSelect.value =
          table.customDSPositive;
      }

      if (table.customDSNegative) {
        customDSNegativeSelect.value =
          table.customDSNegative;
      }
    } else {
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
    useCustomNetGroupsCheckbox.checked = !!table.customNetGroupsRaw;
    toggleCustomNetGroupBox();

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

  /*
    DELETE / CLEAR — all regenerate Output immediately since the
    underlying tables changed; a freshly regenerated Output is
    never treated as a manual edit, so outputEdited is reset.
  */
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
    outputEdited = false;
    saveSession();
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
    outputEdited = false;
    saveSession();
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
      const tableOptions =
    buildTableOptions(
      table.questionType,
      table.useST,
      table.useRank,
      table.projectType
    );
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
            ${table.projectType === "F4" && table.f4Data ? `Project Setting: F4<br>Question: ${escapeHtml(table.f4Data.questionId || "")} ${escapeHtml(table.questionText || "")}<br>Logic Code: ${escapeHtml(table.f4Data.logicCode || table.questionCode)}<br>F4 Rows: ${table.f4Data.rows.length}` : `Project Setting: ${table.projectType || "N2"}<br>Question Code: ${table.questionCode}<br>Question Type: ${table.questionType}<br>Row Type: ${table.rowType || "No row type"}<br>Table Options: ${tableOptions}<br>${baseLine}`}
          </div>
        </div>

        <div class="item-actions">
          <button class="secondary" onclick="editTable(${arrayIndex})">Edit</button>
          <button class="danger" onclick="deleteTable(${arrayIndex})">Delete</button>
        </div>
      `;

      inputList.appendChild(item);
    });
    initSortable();
  }

  /*
    GENERATE OUTPUT — pure function per architecture spec:
    reads `tables`, builds syntax, writes output.value.
    It must NOT clear inputs, modify tables/editingIndex,
    save the session, register listeners, or touch outputEdited.

    NOTE: previously this called BOTH updateOutputHighlight() and
    renderHighlightBackdrop() -- two competing highlighting systems.
    updateOutputHighlight() wrote into document.getElementById(
    "outputHighlight"), an element that is never created anywhere in
    this file, so that call was always a silent no-op at best. Removed
    entirely; renderHighlightBackdrop() is the one real highlighting
    system (see the FIND & REPLACE section below for why).
  */
  function generateOutput() {
    const blocks = [];

    tables.forEach((table, arrayIndex) => {
      const tableIndex = arrayIndex + 1;

      if (table.projectType === "F4" && table.f4Data) {
        const questionNumber = getF4DisplayNumber(table);
        const title = String(table.questionText || "").trim();
        const block = [
          buildQuestionCodeLine(table.questionCode, tableIndex),
          " OR,OV,OI,FU,OT,S0,P0,V0",
          " " + questionNumber + ". " + title,
          " Number^TN^1"
        ];

        const f4Lines = table.f4Data.variant === "group"
          ? buildF4GroupSyntaxRows(table)
          : buildF4OriginalSyntaxRows(table);
        f4Lines.forEach(line => block.push(line));
        block.push(" ^ ^");
        blocks.push(block.join("\n"));
        return;
      }

      const line1 = buildQuestionCodeLine(table.questionCode, tableIndex);
      const line2 =
    " " +
    buildTableOptions(
      table.questionType,
      table.useST,
      table.useRank,
      table.projectType
    );
      const line3 = buildQuestionTextLine(table);
      const line4 = buildBaseLine(table);

      const block = [];

      block.push(line1);
      block.push(line2);
      block.push(line3);
      block.push(line4);

      if (
    table.questionType ===
    "ranking_table"
  ) {
    let rankingLines =
      buildRankingTableLines(table);

    rankingLines =
      appendMeanLine(
        rankingLines,
        table
      );

    rankingLines.forEach(line => {
      block.push(line);
    });

    blocks.push(
      block.join("\n")
    );

    return;
  }

      if (
    table.questionType ===
    "summary_table"
  ) {
    let summaryLines =
      buildSummaryTableLines(
        table.summaryBlocks || []
      );

    summaryLines =
      appendMeanLine(
        summaryLines,
        table
      );

    summaryLines.forEach(line => {
      block.push(line);
    });

    blocks.push(
      block.join("\n")
    );

    return;
  }

      if (
    table.questionType ===
    "listout_table"
  ) {
    let listoutLines =
      buildListoutTableLines(table);

    listoutLines =
      appendMeanLine(
        listoutLines,
        table
      );

    listoutLines.forEach(line => {
      block.push(line);
    });

    blocks.push(
      block.join("\n")
    );

    return;
  }

    if (
    table.questionType ===
    "multiple_choice"
  ) {
    const dsLine =
      buildCustomDSLine(table);

    if (dsLine) {
      block.push(dsLine);
    }

    if (table.useCustomNetGroups) {
      const netGroupLines =
        buildMultipleChoiceNetGroupLines(
          table
        );

      netGroupLines.forEach(line => {
        block.push(line);
      });
    }

    const answerRows =
      buildMultipleChoiceAnswerRows(
        table.answerOptions,
        table.questionCode,
        table.useCustomNetGroups
          ? table.customNetGroups || []
          : []
      );

    answerRows.forEach(line => {
      block.push(line);
    });

    /*
      Multiple Choice hiện chèn MEAN ở cuối.
    */
    const meanLine =
      buildMeanLine(table);

    if (meanLine) {
      block.push(meanLine);
    }

    blocks.push(
      block.join("\n")
    );

    return;
  }

      if (table.useST) {
        if (table.questionType === "array") {
          block.splice(3, 0, "S|" + table.subtitleOnly);
        } else if (table.subtitleOnly) {
          block.splice(3, 0, "S|" + table.subtitleOnly);
        }
      }

    /*
    Manual USE luôn được ưu tiên.
  */
  if (table.manualUseIndex) {
    block.push(
      "USE=" +
      table.manualUseIndex +
      "," +
      table.questionCode
    );

    blocks.push(
      block.join("\n")
    );

    return;
  }

  /*
    Array item thứ hai trở đi:
    chỉ xuất header + subtitle + base + USE.
  */
  if (
    table.questionType === "array" &&
    table.arrayGroupId &&
    table.arrayPosition > 0
  ) {
    const firstArrayIndex =
      getFirstArrayTableIndex(table);

    if (firstArrayIndex) {
      block.push(
        "USE=" +
        firstArrayIndex +
        "," +
        table.questionCode
      );
    } else {
      block.push(
        "*** ERROR: ARRAY FIRST TABLE NOT FOUND ***"
      );
    }

    blocks.push(
      block.join("\n")
    );

    return;
  }

  /*
    Table đầu tiên của Array tiếp tục đi xuống
    để tạo đầy đủ D/S, NET và Answer Rows.
  */
  if (
    normalizeRowType(table.rowType) ===
    "custom_code"
  ) {
    const dsLine =
      buildCustomDSLine(table);

    if (dsLine) {
      block.push(dsLine);
    }

    const netGroupLines =
      buildCustomNetGroupLines(table);

    netGroupLines.forEach(line => {
      block.push(line);
    });

    let answerRows =
      buildRowsFromAnswerOptions(
        table.answerOptions,
        table.questionCode,
        table.customNetGroups || [],
        table.rankRLCodes || ""
      );

    answerRows =
      insertMeanLineIntoRows(
        answerRows,
        table
      );

    answerRows.forEach(line => {
      block.push(line);
    });
  } else {
    let rowLines =
      buildRowTemplateLines(table);

    rowLines =
      insertMeanLineIntoRows(
        rowLines,
        table
      );

    rowLines.forEach(line => {
      block.push(line);
    });
  }

      blocks.push(block.join("\n"));
    });

    output.value = blocks.join("\n");
    renderHighlightBackdrop();
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
    /*
      Giữ lại trạng thái cuối cùng trước khi xóa form.
    */
    const lastSTState =
      useSTCheckbox.checked;

    const lastQuestionType =
      getLastQuestionType();

    projectTypeSelect.value = "N2";

    /*
      Reset các trường nhập chính.
    */
    safeSetValue(
      questionCodeInput,
      ""
    );

    safeSetValue(
      questionTypeSelect,
      lastQuestionType
    );

    safeSetValue(
      questionTextInput,
      ""
    );

    /*
      Khôi phục Row Type phù hợp với
      Question Type cuối cùng.
    */
    if (
      lastQuestionType === "demographic"
    ) {
      populateRowTypeOptions(
        demographicRowTypeOptions,
        ""
      );
    } else if (
      lastQuestionType === "single_choice"
    ) {
      populateRowTypeOptions(
        normalRowTypeOptions,
        "custom_code"
      );

      rowTypeSelect.value =
        "custom_code";
    } else {
      populateRowTypeOptions(
        normalRowTypeOptions,
        ""
      );
    }

    /*
      Reset Answer Options và NET Groups.
    */
    safeSetValue(
      answerOptionsInput,
      ""
    );

    safeSetChecked(
      useCustomNetGroupsCheckbox,
      false
    );

    safeSetValue(
      customNetGroupsInput,
      ""
    );

    safeClearHTML(
      customDSPositiveSelect
    );

    safeClearHTML(
      customDSNegativeSelect
    );

    safeAddHidden(
      customDSBox
    );

    toggleCustomNetGroupBox();

    /*
      Giữ nguyên trạng thái ST cuối cùng.

      Nếu Single Choice / Array + ST bật:
      form tiếp tục ở chế độ Array.

      Nếu ST tắt:
      form tiếp tục ở chế độ Single Choice.
    */
    safeSetChecked(
      useSTCheckbox,
      lastSTState
    );

    safeSetChecked(
      useDSCheckbox,
      true
    );

    safeSetValue(
      subtitleOnlyInput,
      ""
    );

    safeSetValue(
      manualUseIndexInput,
      ""
    );

    /*
      Reset MEAN.
    */
    safeSetChecked(
      useMeanCheckbox,
      false
    );

    safeSetValue(
      meanCodeRangeInput,
      ""
    );

    safeAddHidden(
      meanSetupBox
    );

    /*
      Reset Rank.
    */
    safeSetChecked(
      useRankCheckbox,
      false
    );

    safeSetValue(
      rankRLCodesInput,
      ""
    );

    safeAddHidden(
      rankRLBox
    );

    /*
      Reset Base.
    */
    safeSetValue(
      askedBaseTextInput,
      ""
    );

    /*
      Reset Array Sample Setup.
    */
    pendingArraySampleSelections = [];

    safeClearHTML(
      arraySampleTableContainer
    );

    safeAddHidden(
      arraySampleModal
    );

    /*
      Reset Demographic.
    */
    safeSetValue(
      demographicAdditionalCodesInput,
      ""
    );

    /*
      Reset Listout.
    */
    safeSetValue(
      listoutManualSectionsInput,
      ""
    );

    safeSetChecked(
      includeVersionSectionCheckbox,
      true
    );

    safeSetValue(
      versionExtraRowsInput,
      ""
    );

    safeSetChecked(
      includeModeSectionCheckbox,
      true
    );

    safeSetValue(
      modeExtraRowsInput,
      ""
    );

    safeSetChecked(
      includeDateSectionCheckbox,
      true
    );

    safeSetValue(
      dateVariableInput,
      "submitdate"
    );

    safeSetValue(
      startDateInput,
      ""
    );

    safeSetValue(
      endDateInput,
      ""
    );

    if (
      toggleVersionExtraBtn &&
      versionExtraBox
    ) {
      closePlusSection(
        toggleVersionExtraBtn,
        versionExtraBox,
        "+ Add VERSION Extra Rows"
      );
    }

    if (
      toggleModeExtraBtn &&
      modeExtraBox
    ) {
      closePlusSection(
        toggleModeExtraBtn,
        modeExtraBox,
        "+ Add MODE Extra Rows"
      );
    }

    if (
      toggleDateSetupBtn &&
      dateSetupBox
    ) {
      closePlusSection(
        toggleDateSetupBtn,
        dateSetupBox,
        "+ Add DATE Range"
      );
    }

    /*
      Reset Ranking Table.
    */
    safeSetValue(
      rankingMetricDefinitionsInput,
      ""
    );

    safeSetValue(
      rankingItemsInput,
      ""
    );

    safeSetChecked(
      useSplitABCheckbox,
      false
    );

    if (splitRowsContainer) {
      resetSplitRows();
    }

    safeClearHTML(
      rankingSplitTableContainer
    );

    if (rankingSplitModal) {
      closeRankingSplitModal();
    }

    toggleSplitABBox();

    /*
      Reset Summary Table.
    */
    safeSetValue(
      summaryRawInput,
      ""
    );

    safeSetValue(
      summaryBlockCountInput,
      ""
    );

    safeClearHTML(
      summaryBlockSetupContainer
    );

    if (openSummaryModalBtn) {
      openSummaryModalBtn.classList.add(
        "hidden"
      );
    }

    if (summaryModal) {
      closeSummaryModal();
    }

    /*
      Cập nhật giao diện một lần sau khi
      toàn bộ dữ liệu đã được reset.
    */
    toggleQuestionTypeUI();
    toggleAnswerOptionsBox();
    toggleUseDSBox();
    toggleMeanSetupUI();
    toggleRankRLBox();
    toggleSubtitleBox();
    toggleAskedBaseBox();
  }

  function clearInput() {
    if (projectTypeSelect.value === "F4") {
      f4Rows = []; f4ModalDraftRows = []; f4ExcelFileName = "";
      if (f4ExcelInput) f4ExcelInput.value = "";
      renderF4FileStatus(); renderF4Validation(); saveSession(); return;
    }
    clearInputFields();
  }

  /*
    CLEAR ALL — per spec, does NOT call generateOutput() since
    there are no tables left; Output is simply blanked directly.
  */
  function clearAll() {
    tables = [];
    editingIndex = null;
    outputEdited = false;
    f4Rows = [];
    f4ModalDraftRows = [];
    f4ExcelFileName = "";
    f4SpssMetadata = { variables: new Map(), fileName: "" };

    clearInputFields();

    output.value = "";

    localStorage.removeItem(STORAGE_KEY);

    renderInputList();
    renderHighlightBackdrop();
  }

  function toggleSubtitleBox() {
    const isArray =
      isQuestionCodeRange(
        questionCodeInput.value
      ) &&
      questionTypeSelect.value ===
        "single_choice";

    /*
      Array luôn có ST.
    */
    if (isArray) {
      useSTCheckbox.checked = true;

      subtitleBox.classList.remove(
        "hidden"
      );

      return;
    }

    /*
      Single Choice vẫn có thể bật ST thủ công
      nếu cần subtitle.
    */
    if (useSTCheckbox.checked) {
      subtitleBox.classList.remove(
        "hidden"
      );
    } else {
      subtitleBox.classList.add(
        "hidden"
      );
    }
  }

  function toggleAskedBaseBox() {
    /*
      Asked Base Label luôn hiện.
    */
    askedBaseBox.classList.remove(
      "hidden"
    );

    if (askedBaseTextBox) {
      askedBaseTextBox.classList.remove(
        "hidden"
      );
    }

    /*
      Array được nhận biết bằng Question Code range.
    */
    const isArray =
      isQuestionCodeRange(
        questionCodeInput.value
      ) &&
      questionTypeSelect.value ===
        "single_choice";

    if (isArray) {
      arraySampleSetupBox.classList.remove(
        "hidden"
      );
    } else {
      arraySampleSetupBox.classList.add(
        "hidden"
      );
    }
  }

  function parseArraySampleLabels(text) {
    return String(text || "")
      .replace(/\r\n?/g, "\n")
      .split(/\n|,/)
      .map(line => line.trim())
      .filter(line => line !== "");
  }

  function getArraySampleDefinitions() {
    const sampleNames = [
      "SAMPLE A",
      "SAMPLE B"
    ];

    /*
      Asked Base giờ cũng là nơi nhập
      thêm Sample Labels cho Array.
    */
    const extraLabels =
      parseArraySampleLabels(
        askedBaseTextInput.value
      );

    extraLabels.forEach(label => {
      const normalized =
        label.toUpperCase();

      if (
        normalized &&
        !sampleNames.includes(normalized)
      ) {
        sampleNames.push(normalized);
      }
    });

    return sampleNames.map(name => {
      return {
        name
      };
    });
  }

  function buildArraySampleSetup() {
    const questionCodes = expandQuestionCodes(
      questionCodeInput.value.trim()
    );

    if (questionCodes.length === 0) {
      alert(
        "Please enter Question Code range first. Example: Q1:5"
      );
      return;
    }

    if (
      questionTypeSelect.value !== "single_choice" ||
      questionCodes.length <= 1
    ) {
      alert(
        "Array Sample Setup is only available for a Question Code range. Example: Q1:5"
      );
      return;
    }
    /*
      Giữ lại lựa chọn đang có trong modal
      trước khi build lại.
    */
    const currentSelections =
      getArraySampleSelections();

    if (currentSelections.length > 0) {
      pendingArraySampleSelections =
        currentSelections;
    }

    const sampleDefs =
      getArraySampleDefinitions();

    const subtitleLines =
      getSubtitleLines();

    const rows = questionCodes
      .map((code, index) => {
        const savedSampleName =
          pendingArraySampleSelections[index]
            ?.sampleName || "";

        const options = sampleDefs
          .map(sample => {
            const selected =
              sample.name === savedSampleName
                ? "selected"
                : "";

            return `
              <option
                value="${sample.name}"
                ${selected}
              >
                ${sample.name}
              </option>
            `;
          })
          .join("");

        return `
          <tr>
            <td>${code}</td>
            <td>${subtitleLines[index] || code}</td>
            <td>
              <select
                class="array-sample-select"
                data-index="${index}"
              >
                <option value="">Blank</option>
                ${options}
              </select>
            </td>
          </tr>
        `;
      })
      .join("");

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

    arraySampleModal.classList.remove(
      "hidden"
    );
  }

  function getArraySampleSelections() {
    if (!arraySampleTableContainer) {
      return [];
    }

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

  /*
    BUG FIX: the previous version computed a `suffix` value here
    using undefined variables (`rlCodes`, `code`) which threw a
    ReferenceError every time a Multiple Choice table was rendered
    -- and the value was never even passed into formatSyntaxRow.
    That dead/broken block has been removed; behavior (no RL
    suffix on Multiple Choice answer rows) is unchanged from what
    actually executed before (since the value was never used).
  */
  function buildMultipleChoiceAnswerRows(
    answerOptionsText,
    questionCode,
    netGroups = []
  ) {
    const options = parseAnswerOptions(
      answerOptionsText
    );

    return options.map(option => {
      const variableName =
        buildMultipleChoiceVariable(
          questionCode,
          option.code
        );

      const shouldIndent =
        isAnswerCodeInsideNetGroups(
          option.code,
          netGroups
        );

      const indent = shouldIndent
        ? "   "
        : " ";

      return formatSyntaxRow(
        option.label,
        variableName + " (1)",
        {
          indent,
          logicColumn: 34
        }
      );
    });
  }

  function buildMultipleChoiceNetGroupLines(
    table
  ) {
    const netGroups =
      table.customNetGroups || [];

    return netGroups.map(group => {
      /*
        Explicit logic:
        Q13:1-3 OR Q14:1
      */
      if (group.logic) {
        const logic =
          formatCustomNetGroupLogic(
            group,
            table.questionCode
          );

        return formatSyntaxRow(
          group.label,
          logic,
          {
            indent: " ",
            logicColumn: 34,
            suffix:
              group.options || "L-,SX"
          }
        );
      }

      /*
        Multiple Choice range cũ.
      */
      const codes = expandCodeRange(
        group.range
      );

      const netLogic = codes
        .map(code => {
          const variableName =
            buildMultipleChoiceVariable(
              table.questionCode,
              code
            );

          return variableName + " (1)";
        })
        .join(" or ");

      return formatSyntaxRow(
        group.label,
        "{" + netLogic + "}",
        {
          indent: " ",
          logicColumn: 34,
          suffix:
            group.options || "L-,SX"
        }
      );
    });
  }

  function formatSyntaxRow(
    label,
    logic,
    {
      indent = " ",
      logicColumn = 34,
      suffix = "",
      addTrailingCaret = true
    } = {}
  ) {
    const cleanLabel = String(label || "").trimEnd();
    const cleanLogic = String(logic || "").trim();

    /*
      Dấu ^ được nối vào label trước.
      Sau đó mới thêm khoảng trắng để căn logic.
    */
    const labelWithCaret =
      indent + cleanLabel + "^";

    /*
      Nếu label ngắn, pad để logic bắt đầu cùng một cột.
      Nếu label quá dài, vẫn để ít nhất một space sau ^.
    */
    const leftPart =
      labelWithCaret.length < logicColumn
        ? labelWithCaret.padEnd(logicColumn, " ")
        : labelWithCaret + " ";

    const trailingCaret =
      addTrailingCaret ? "^" : "";

    return (
      leftPart +
      cleanLogic +
      trailingCaret +
      suffix
    );
  }

  function getRankSuffix(
    answerCode,
    rankRLCodes
  ) {
    if (!rankRLCodes) {
      return "";
    }

    const rlCodes = new Set(
      parseRankRLCodes(rankRLCodes) || []
    );

    return rlCodes.has(
      Number(answerCode)
    )
      ? "RL"
      : "";
  }

  function toggleQuestionTypeUI() {
    const questionType = questionTypeSelect.value;
    toggleRankBox();
    toggleRankRLBox();
      toggleMeanSetupUI();

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

    toggleUseDSBox();
    toggleAskedBaseBox();
    return;
  }

    populateRowTypeOptions(normalRowTypeOptions, rowTypeSelect.value);
    toggleAnswerOptionsBox();
    toggleUseDSBox();
    toggleAskedBaseBox();
  }

  async function copyOutput() {
    const text = output.value;

    if (!text.trim()) {
      alert("No output to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied.");
    } catch (err) {
      const tempTextArea =
        document.createElement("textarea");

      tempTextArea.value = text;

      document.body.appendChild(tempTextArea);

      tempTextArea.select();

      document.execCommand("copy");

      document.body.removeChild(tempTextArea);

      alert("Copied.");
    }
  }

  /*
    REFRESH OUTPUT — the single generateBtn handler (registered
    once inside attachCoreEventListeners()). outputEdited is
    reset here (not inside generateOutput) per the separation of
    concerns described at the top of this file.
  */
  function handleGenerateOutput() {
    if (
      outputEdited &&
      output.value.trim()
    ) {
      const confirmRefresh = confirm(
        "Your Output has been edited manually.\n\n" +
        "Refreshing will replace your edited Output.\n\n" +
        "Continue?"
      );

      if (!confirmRefresh) {
        return;
      }
    }

    outputEdited = false;

    generateOutput();
    saveSession();
  }

  function getLastQuestionType() {
    const value =
      localStorage.getItem(
        LAST_QUESTION_TYPE_KEY
      );

    return ALL_QUESTION_TYPES.has(value)
      ? value
      : "";
  }

  /* ================= OUTPUT -> INPUT LIST REVERSE SYNC =================
    Best-effort: reads the Output textarea and rebuilds the `tables`
    array (and therefore the Input List boxes) from it. This is the
    inverse of generateOutput(), which is inherently lossy -- some
    form-only settings (which named Row Type template was chosen, the
    exact D/S Positive/Negative row selection, Project Setting) are not
    printed in the syntax text and cannot be recovered with certainty.
    Where a table's shape is ambiguous, this favors the simplest
    interpretation that would regenerate equivalent output, over a
    guess that might be wrong in a more surprising way.

    This module never writes to output.value. It only ever updates
    `tables` and re-renders the Input List.
  ========================================================================= */

  function syncTablesFromOutputSyntax() {
    /*
      Don't clobber the Input form while the user is actively editing
      a table through it -- re-syncing here could pull the rug out
      from under an in-progress edit.
    */
    if (editingIndex !== null || editingArrayGroupId !== null) {
      return;
    }

    const text = output.value;

    if (!text.trim()) {
      tables = [];
      renderInputList();
      saveSession();
      return;
    }

    const parsedTables = parseOutputIntoTables(text);

    /*
      If nothing recognizable was found but the box isn't empty, this
      is most likely a transient mid-edit state (e.g. the header line
      of a new block isn't finished yet) -- leave the existing Input
      List alone instead of wiping it out.
    */
    if (parsedTables.length === 0) {
      return;
    }

    tables = parsedTables;
    renderInputList();
    saveSession();
  }

  function parseOutputIntoTables(text) {
    const rawBlocks = splitOutputIntoRawBlocks(text);
    const result = [];

    rawBlocks.forEach(rawBlock => {
      const table = parseOutputBlock(rawBlock);

      if (table) {
        result.push(table);
      }
    });

    return result;
  }

  /*
    Every block generateOutput() produces starts with exactly one line
    that is nothing but "T<CODE>^<index>" (see buildQuestionCodeLine).
    That makes it the one reliable, unambiguous block boundary --
    everything else in a block can vary in position (see the S| subtitle
    note below), so block-splitting is anchored on this line alone.
  */
  function splitOutputIntoRawBlocks(text) {
    const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
    const blocks = [];
    let current = null;

    lines.forEach(line => {
      const headerMatch = line.trim().match(/^T([A-Z0-9_]+)\^(\d+)$/);

      if (headerMatch) {
        current = {
          questionCode: headerMatch[1],
          lines: [line]
        };

        blocks.push(current);
        return;
      }

      if (current) {
        current.lines.push(line);
      }

      // Stray text before the first recognizable header is ignored.
    });

    return blocks;
  }

  function extractAskedBaseText(baseLine) {

    const match = String(baseLine || "").match(
      /BASE=(.*?)\^TN\^/
    );

    if (!match) {
      return "";
    }

    const text = match[1].trim();

    return text === "TOTAL SAMPLE" ? "" : text;
  }

  function extractPlainTitle(titleLine, questionCode) {
    const trimmed = String(titleLine || "").trim();
    const match = trimmed.match(/^QUESTION\s+[^:]+:\s*\|\s*(.*)$/i);

    return match ? match[1] : trimmed;
  }

  /*
    Reverses normalizeCustomNetLogic()'s WinCross-facing conversion back
    into the colon notation the NET Groups / logic textareas accept
    (e.g. "Q13(1-3) or Q14(1)" -> "Q13:1-3 OR Q14:1"). Best-effort --
    braces are simply stripped rather than re-derived.
  */
  function reverseWincrossLogicToColon(logic) {
    return String(logic || "")
      .replace(/[{}]/g, "")
      .replace(/\s+or\s+/gi, " OR ")
      .replace(/\s*&\s*/g, " AND ")
      .replace(/([A-Z][A-Z0-9_]*)\s*\(([^)]+)\)/gi, function (_, variable, codes) {
        return variable.toUpperCase() + ":" + codes;
      })
      .trim();
  }

  function parseOutputBlock(rawBlock) {
    const lines = rawBlock.lines;

    if (lines.length < 3) {
      // Not enough of the block has been typed yet.
      return null;
    }

    const questionCode = rawBlock.questionCode;
    const titleLine = lines[2] || "";

    /*
      Lines 0-2 (code, table options, title) are always in fixed
      position. The base line's position shifts by one when a
      subtitle ("S|...") is present, so it's located by content
      rather than by index.
    */
    let cursor = 3;
    let subtitleOnly = "";

    const maybeSubtitle = lines[cursor] || "";

    if (maybeSubtitle.trim().startsWith("S|")) {
      subtitleOnly = maybeSubtitle.trim().slice(2);
      cursor += 1;
    }

    const baseLine = lines[cursor] || "";
    cursor += 1;

    const bodyLines = lines.slice(cursor).filter(line => line.trim() !== "");
    const askedBaseText = extractAskedBaseText(baseLine);

    /*
      A body that is nothing but a single "USE=N,CODE" line covers both
      a manual USE override AND an Array continuation table -- both
      produce identical text, so reconstructing it as manualUseIndex
      regenerates equivalent output either way without having to guess
      which one it originally was.
    */
    if (bodyLines.length === 1) {
      const useMatch = bodyLines[0].trim().match(/^USE=(\d+),([A-Z0-9_]+)$/i);

      if (useMatch) {
        return {
          projectType: "N2",
          questionCode,
          questionType: "single_choice",
          rowType: "custom_code",
          questionText: extractPlainTitle(titleLine, questionCode),
          useST: subtitleOnly !== "",
          useDS: false,
          useRank: false,
          rankRLCodes: "",
          useMean: false,
          meanCodeRange: "",
          subtitleOnly,
          baseType: askedBaseText ? "asked_base" : "total_sample",
          askedBaseText,
          manualUseIndex: useMatch[1],
          answerOptions: "",
          customNetGroups: [],
          customNetGroupsRaw: "",
          customDSPositive: "",
          customDSNegative: "",
          summaryRaw: "",
          summaryBlocks: [],
          rankingMetricDefinitions: "",
          rankingItemsRaw: "",
          rankingItems: [],
          arrayGroupId: "",
          arrayPosition: 0
        };
      }
    }

    /*
      Multiple Choice must be checked before Ranking: both share the
      "every row ends in the same trailing (code)" signature (MC rows
      all end in the shared "(1)"; Ranking rows all end in the shared
      metric code), but MC's variable-name pattern ("{code}_{n}") is
      strictly more specific, so it has to win the tie first.
    */
    if (looksLikeMultipleChoiceBlock(questionCode, bodyLines)) {
      return buildGuessedMultipleChoiceTable(questionCode, titleLine, askedBaseText, bodyLines);
    }

    if (looksLikeRankingBlock(bodyLines)) {
      return buildGuessedRankingTable(questionCode, titleLine, baseLine, bodyLines);
    }

    if (looksLikeSummaryBlock(bodyLines)) {
      return buildGuessedSummaryTable(questionCode, titleLine, baseLine, bodyLines);
    }

    if (looksLikeListoutBlock(titleLine)) {
      return buildGuessedListoutTable(questionCode, titleLine, bodyLines);
    }

    const hasDS = bodyLines.some(line => line.trim().startsWith("**D/S"));
    const matchedRowType = matchKnownRowTemplate(questionCode, hasDS, bodyLines);

    if (matchedRowType) {
      return buildGuessedNamedTemplateTable(
        questionCode,
        titleLine,
        askedBaseText,
        subtitleOnly,
        hasDS,
        matchedRowType
      );
    }

    return buildGuessedCustomCodeTable(questionCode, titleLine, askedBaseText, subtitleOnly, bodyLines);
  }

  /*
    A named Row Type (good_bad, agree_disagree, etc.) and a Custom Code
    table with the identical rows typed in by hand render to byte-
    identical Output text -- there's nothing in the syntax itself that
    says which one was originally used. buildRowTemplateLines() is the
    exact same function generateOutput() calls for a named template, so
    reusing it here and checking for an exact line-for-line match against
    what was actually typed is a reliable (not a guess) way to tell the
    two apart, since a hand-typed Custom Code table goes through a
    different formatter (buildRowsFromAnswerOptions/formatSyntaxRow) with
    different spacing and will only match by genuine coincidence.
  */
  function matchKnownRowTemplate(questionCode, hasDS, bodyLines) {
    const candidateLines = bodyLines.filter(line => !/^\s*MEAN\^/i.test(line));

    return Object.keys(rowTemplates).find(function (key) {
      const templateLines = buildRowTemplateLines({
        rowType: key,
        questionCode,
        useDS: hasDS
      });

      return (
        templateLines.length === candidateLines.length &&
        templateLines.every(function (line, index) {
          return line === candidateLines[index];
        })
      );
    }) || null;
  }

  function buildGuessedNamedTemplateTable(questionCode, titleLine, askedBaseText, subtitleOnly, hasDS, rowType) {
    return {
      projectType: "N2",
      questionCode,
      questionType: "single_choice",
      rowType,
      questionText: extractPlainTitle(titleLine, questionCode),
      useST: subtitleOnly !== "",
      useDS: hasDS,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly,
      baseType: askedBaseText ? "asked_base" : "total_sample",
      askedBaseText,
      manualUseIndex: "",
      answerOptions: "",
      customNetGroups: [],
      customNetGroupsRaw: "",
      customDSPositive: "",
      customDSNegative: "",
      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  /*
    Ranking rows all end in the same parenthesized metric code
    (e.g. every row is "...(:1-2)" for a given metric), which normal
    answer-option rows never do since each row has its own distinct
    code -- a reasonably unique signature.
  */
  function looksLikeRankingBlock(bodyLines) {
    if (bodyLines.length < 2) {
      return false;
    }

    const trailingCodes = [];

    for (const line of bodyLines) {
      const parts = line.split("^");

      if (parts.length < 2) {
        return false;
      }

      const logic = parts[1].trim();
      const match = logic.match(/\(([^)]+)\)\s*$/);

      if (!match) {
        return false;
      }

      trailingCodes.push(match[1]);
    }

    return new Set(trailingCodes).size === 1;
  }

  function looksLikeSummaryBlock(bodyLines) {
    return bodyLines.some(line => {
      const trimmed = line.trim();
      return !trimmed.startsWith("**D/S") && /CALC\s+F\d+-F\d+/.test(trimmed);
    });
  }

  function looksLikeListoutBlock(titleLine) {
    return String(titleLine || "").includes("./");
  }

  function looksLikeMultipleChoiceBlock(questionCode, bodyLines) {
    const dataRows = bodyLines.filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith("**D/S");
    });

    if (dataRows.length === 0) {
      return false;
    }

    const pattern = new RegExp("^" + questionCode + "_\\d+\\s*\\(1\\)$", "i");

    return dataRows.every(line => {
      const parts = line.split("^");
      return parts.length >= 2 && pattern.test(parts[1].trim());
    });
  }

  function buildGuessedRankingTable(questionCode, titleLine, baseLine, bodyLines) {
    const askedBaseText = extractAskedBaseText(baseLine);
    let metricCode = "";
    const items = [];

    bodyLines.forEach(line => {
      const parts = line.split("^");
      const label = (parts[0] || "").trim();
      const logic = (parts[1] || "").trim();
      const match = logic.match(/^([A-Z0-9_]+)\(([^)]+)\)$/i);

      if (match) {
        items.push({
          questionCode: match[1].toUpperCase(),
          label,
          splitSuffix: ""
        });

        metricCode = match[2];
      }
    });

    const rankingItemsRaw = items
      .map(item => item.questionCode + " | " + item.label)
      .join("\n");

    const rankingMetricDefinitions = metricCode
      ? "RANKED VALUE (:" + metricCode + ")"
      : "";

    return {
      projectType: "N2",
      questionCode,
      questionType: "ranking_table",
      rowType: "ranking_table",
      questionText: String(titleLine || "").trim(),
      useST: false,
      useDS: false,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly: "",
      baseType: askedBaseText ? "asked_base" : "total_sample",
      askedBaseText,
      manualUseIndex: "",
      answerOptions: "",
      metricLabel: "RANKED VALUE",
      metricCode,
      rankingMetricDefinitions,
      rankingItemsRaw,
      rankingItems: items,
      useSplitAB: false,
      splitRows: [],
      summaryRaw: "",
      summaryBlocks: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  function buildGuessedSummaryTable(questionCode, titleLine, baseLine, bodyLines) {
    const askedBaseText = extractAskedBaseText(baseLine);
    const summaryBlocks = [];
    let currentBlock = null;

    bodyLines.forEach(line => {
      const parts = line.split("^");
      const label = (parts[0] || "").trim();
      const logic = (parts[1] || "").trim();
      const isHeader = /CALC\s+F\d+-F\d+/.test(logic);

      if (isHeader) {
        currentBlock = {
          title: label,
          positiveLabel: "",
          negativeLabel: "",
          suffix: "SX,L-",
          rows: []
        };

        summaryBlocks.push(currentBlock);
        return;
      }

      if (!currentBlock) {
        currentBlock = {
          title: "SUMMARY BLOCK",
          positiveLabel: "",
          negativeLabel: "",
          suffix: "SX,L-",
          rows: []
        };

        summaryBlocks.push(currentBlock);
      }

      currentBlock.rows.push({
        label,
        logic: reverseWincrossLogicToColon(logic)
      });
    });

    const summaryRaw = summaryBlocks
      .map(block => {
        const rowLines = block.rows
          .map(row => row.label + " (" + row.logic + ")")
          .join("\n");

        return block.title + ".\n" + rowLines;
      })
      .join("\n\n");

    return {
      projectType: "N2",
      questionCode,
      questionType: "summary_table",
      rowType: "summary_custom",
      questionText: String(titleLine || "").trim(),
      useST: false,
      useDS: false,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly: "",
      baseType: askedBaseText ? "asked_base" : "total_sample",
      askedBaseText,
      manualUseIndex: "",
      answerOptions: "",
      summaryRaw,
      summaryBlocks,
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  function buildGuessedListoutTable(questionCode, titleLine, bodyLines) {
    const sectionLines = [];

    bodyLines.forEach(line => {
      const parts = line.split("^");
      const label = (parts[0] || "").trim();
      const logic = (parts[1] || "").trim();

      if (!logic) {
        sectionLines.push(label);
        return;
      }

      const match = logic.match(/^([A-Za-z0-9_]+)\s*\(([^)]+)\)$/);

      if (match) {
        sectionLines.push(label + " | " + match[1] + " | " + match[2]);
      }
    });

    return {
      projectType: "N2",
      questionCode: normalizeQuestionCode(questionCode || "LISTOUT"),
      questionType: "listout_table",
      rowType: "listout_table",
      questionText: String(titleLine || "").trim(),
      useST: false,
      useDS: false,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly: "",
      baseType: "total_sample",
      askedBaseText: "",
      manualUseIndex: "",
      answerOptions: "",
      listoutManualSections: sectionLines.join("\n"),
      /*
        Left off so previously-typed VERSION/MODE/DATE lines (already
        captured above as part of the manual sections) don't get
        duplicated by the auto-generated versions on the next
        regenerate.
      */
      includeVersionSection: false,
      versionExtraRows: "",
      includeModeSection: false,
      modeExtraRows: "",
      includeDateSection: false,
      dateVariable: "submitdate",
      startDate: "",
      endDate: "",
      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  function buildGuessedMultipleChoiceTable(questionCode, titleLine, askedBaseText, bodyLines) {
    const hasDS = bodyLines.some(line => line.trim().startsWith("**D/S"));
    const prefixPattern = new RegExp("^" + questionCode + "_(\\d+)\\s*\\(1\\)$", "i");
    const answerLines = [];

    bodyLines.forEach(line => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("**D/S")) {
        return;
      }

      const parts = line.split("^");
      const label = (parts[0] || "").trim();
      const logic = (parts[1] || "").trim();
      const match = logic.match(prefixPattern);

      if (match) {
        answerLines.push(match[1] + "\t" + label);
      }
    });

    return {
      projectType: "N2",
      questionCode,
      questionType: "multiple_choice",
      rowType: "multiple_choice",
      questionText: extractPlainTitle(titleLine, questionCode),
      useST: false,
      useDS: hasDS,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly: "",
      baseType: askedBaseText ? "asked_base" : "total_sample",
      askedBaseText,
      manualUseIndex: "",
      answerOptions: answerLines.join("\n"),
      useCustomNetGroups: false,
      customNetGroups: [],
      customNetGroupsRaw: "",
      customDSPositive: "",
      customDSNegative: "",
      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  /*
    Fallback covering Single Choice, Array items, and Demographic
    Custom Code -- anything whose rows are "LABEL^ VAR (code)" where
    VAR matches this block's own question code. This is the most
    common shape (see rowTemplates output) and the one this reverse
    sync reconstructs most faithfully.
  */
  function buildGuessedCustomCodeTable(questionCode, titleLine, askedBaseText, subtitleOnly, bodyLines) {
    const hasDS = bodyLines.some(line => line.trim().startsWith("**D/S"));
    const answerLines = [];
    const netGroupLines = [];

    bodyLines.forEach(line => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("**D/S")) {
        return;
      }

      const parts = line.split("^");
      const label = (parts[0] || "").trim();
      const logic = (parts[1] || "").trim();

      if (!logic || /^MEAN$/i.test(label)) {
        return;
      }

      /*
        A single plain digit code, e.g. "Q1 (1)" -- this is what
        parseAnswerOptionLine actually understands for the Answer
        Options textarea. Ranges/lists like "Q1 (1-2)" must NOT match
        here (that was the bug: they used to be accepted by this
        regex, which sent NET/Total rows into Answer Options where
        they can't be parsed back, producing "INVALID ANSWER OPTION"
        errors on the next regenerate).
      */
      const singleCodeMatch = logic.match(/^([A-Z0-9_]+)\s*\((\d+)\)$/i);

      if (
        singleCodeMatch &&
        singleCodeMatch[1].toUpperCase() === questionCode.toUpperCase()
      ) {
        answerLines.push(singleCodeMatch[2] + "\t" + label);
        return;
      }

      /*
        A range/list against this same question code, e.g.
        "Q1 (1-2)" or "Q1 (1,3-4)" -- this is a NET/Total group.
        Reconstructed using the plain "<range> <label>" shorthand the
        Total/Net Groups textarea itself accepts, so it round-trips
        to the exact original spacing on regenerate (formatCustomNetGroupLogic
        renders this range type as "QUESTIONCODE (<range>)").
      */
      const rangeMatch = logic.match(/^([A-Z0-9_]+)\s*\(([0-9,\-]+)\)$/i);

      if (
        rangeMatch &&
        rangeMatch[1].toUpperCase() === questionCode.toUpperCase()
      ) {
        netGroupLines.push(rangeMatch[2] + " " + label);
        return;
      }

      /*
        Anything else (cross-variable logic, braces, etc.) is
        best-effort converted back into the NET Groups textarea's
        explicit-logic format rather than being silently dropped.
      */
      netGroupLines.push(label + "  " + reverseWincrossLogicToColon(logic));
    });

    const customNetGroupsRaw = netGroupLines.join("\n");

    return {
      projectType: "N2",
      questionCode,
      questionType: "single_choice",
      rowType: "custom_code",
      questionText: extractPlainTitle(titleLine, questionCode),
      useST: subtitleOnly !== "",
      useDS: hasDS,
      useRank: false,
      rankRLCodes: "",
      useMean: false,
      meanCodeRange: "",
      subtitleOnly,
      baseType: askedBaseText ? "asked_base" : "total_sample",
      askedBaseText,
      manualUseIndex: "",
      answerOptions: answerLines.join("\n"),
      customNetGroups: customNetGroupsRaw ? parseCustomNetGroups(customNetGroupsRaw) : [],
      customNetGroupsRaw,
      customDSPositive: "",
      customDSNegative: "",
      summaryRaw: "",
      summaryBlocks: [],
      rankingMetricDefinitions: "",
      rankingItemsRaw: "",
      rankingItems: [],
      arrayGroupId: "",
      arrayPosition: 0
    };
  }

  /* ================= FIND & REPLACE (Ctrl+H) FOR OUTPUT SYNTAX =================
    Self-contained: builds its own floating popup card (no HTML changes
    needed) and anchors it to the top-right of the Output Syntax card,
    overlaying it rather than being inserted inline -- so opening it never
    pushes the textarea down or reflows the page. It is intentionally NOT
    a blocking modal (no dimmed backdrop): the user can still see and
    click into Output while it's open, which matters since "Only in
    selection" depends on a selection made in that same textarea.

    Ctrl+H is intercepted while the Output box has focus (Windows/Linux
    browsers allow this; macOS grabs Cmd+H at the OS level to hide the
    app before any webpage can see it, so a toolbar button is also added
    as a reliable entry point there).

    Replace / Replace All modify output.value directly and then dispatch
    a real "input" event, so they flow through the exact same
    outputEdited / saveSession() / live reverse-sync path as manual
    typing -- no bypass.

    ------------------------------------------------------------------
    THIS is also the ONE syntax-highlighting system for Output. It is
    built from ensureHighlightBackdrop() / renderHighlightBackdrop() /
    classifyOutputLine() / buildOutputLineTokens() / wrapWithSyntaxColor()
    below, and it is the
    system actually wired into editable Output (transparent-text-over-
    colored-backdrop, scroll sync, resize-with-card, composes with the
    "Only in selection" highlight). A second, dead duplicate system
    (escapeHtml/highlightSyntax/updateOutputHighlight, writing into a
    "#outputHighlight" element that was never created anywhere) has been
    removed -- see the regression notes at the bottom of this file.
  ================================================================================= */

  const findReplaceState = {
    bar: null,
    anchor: null,
    findInput: null,
    replaceInput: null,
    matchCaseCheckbox: null,
    inSelectionCheckbox: null,
    scopeRow: null,
    scopePreview: null,
    counterLabel: null,
    statusLabel: null,
    selectionRange: null,
    highlightWrapper: null,
    highlightBackdrop: null
  };

  function escapeRegExp(text) {
    return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function escapeForBackdrop(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /*
    Exact WinCross color spec (recolor only -- no tokenization/parsing
    logic changed below, aside from the minimal extra splitting needed
    to isolate each newly-named token). Only these 8 named tokens get
    color; every other token renders as plain black, per spec ("do not
    invent colors for tokens that are not listed").
  */
  const WINCROSS_COLOR_TQ_HEADER = "#4B80C7";
  const WINCROSS_COLOR_TABLE_OPTIONS = "#38278A";
  const WINCROSS_COLOR_QUESTION_PIPE = "#FF45BD";
  const WINCROSS_COLOR_TN = "#F53A05";
  const WINCROSS_COLOR_CALC = "#F53A05";
  const WINCROSS_COLOR_VARIABLE = "#489E5A";
  const WINCROSS_COLOR_ANSWER_CODE = "#FF45BD";
  const WINCROSS_COLOR_RL = "#063394";
  const WINCROSS_COLOR_BLACK = "#111111";
  const SCOPE_HIGHLIGHT_BACKGROUND = "#ffe58a";

  /*
    Centralized token->color mapping for the tokenizer/parser pipeline
    below (classifyOutputLine -> per-type parser -> tokens -> render).
    Every parser function reads colors from here, never a raw hex
    directly -- this is the one place that maps a token's *meaning*
    to a color. Everything not one of the 8 named WinCross tokens above
    is WINCROSS_COLOR_BLACK.
  */
  const TOKEN_COLOR = {
    label: WINCROSS_COLOR_BLACK,
    header: WINCROSS_COLOR_TQ_HEADER,
    tableOptions: WINCROSS_COLOR_TABLE_OPTIONS,
    questionPrefix: WINCROSS_COLOR_BLACK,
    questionText: WINCROSS_COLOR_BLACK,
    questionPipe: WINCROSS_COLOR_QUESTION_PIPE,
    tn: WINCROSS_COLOR_TN,
    calc: WINCROSS_COLOR_CALC,
    caret: WINCROSS_COLOR_ANSWER_CODE,
    variable: WINCROSS_COLOR_VARIABLE,
    answerCode: WINCROSS_COLOR_ANSWER_CODE,
    modifier: WINCROSS_COLOR_BLACK,
    rl: WINCROSS_COLOR_RL,
    sx: WINCROSS_COLOR_RL,
    operator: WINCROSS_COLOR_BLACK,
    brace: WINCROSS_COLOR_BLACK,
    errorText: WINCROSS_COLOR_BLACK,
    text: WINCROSS_COLOR_BLACK
  };


  function ensureHighlightBackdrop() {
    if (findReplaceState.highlightBackdrop) {
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";

    output.parentNode.insertBefore(wrapper, output);

    const backdrop = document.createElement("div");
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.style.position = "absolute";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.right = "0";
    backdrop.style.bottom = "0";
    backdrop.style.overflow = "hidden";
    backdrop.style.pointerEvents = "none";

    /*
      Preserve whatever background and default text color Output already
      has (the app's stylesheet tints both) by moving them onto the
      backdrop, then making the textarea itself fully transparent -- the
      visual result for any *uncolored* text is identical to before.
    */
    const originalComputed = getComputedStyle(output);
    const originalBackground = originalComputed.backgroundColor;
    const originalTextColor = originalComputed.color;

    backdrop.style.background = originalBackground;
    backdrop.style.color = originalTextColor;

    wrapper.appendChild(backdrop);
    wrapper.appendChild(output);

    output.style.position = "relative";
    output.style.background = "transparent";
    output.style.color = "transparent";
    output.style.caretColor = originalTextColor;
    output.style.zIndex = "1";
    output.style.width = "100%";
    output.style.height = "100%";
    output.style.boxSizing = "border-box";
    output.style.resize = "none";

    findReplaceState.highlightWrapper = wrapper;
    findReplaceState.highlightBackdrop = backdrop;

    resizeHighlightWrapperToFitOutputCard();
    syncBackdropStyles();
    renderHighlightBackdrop();

    output.addEventListener("scroll", function () {
      backdrop.scrollTop = output.scrollTop;
      backdrop.scrollLeft = output.scrollLeft;
    });

    window.addEventListener("resize", function () {
      resizeHighlightWrapperToFitOutputCard();
      syncBackdropStyles();
    });
  }

  /*
    Recomputed live -- the card's current total height minus its OTHER
    children's current height -- so it stays correct across the app's
    900px breakpoint (which changes .output-card's own height) without
    needing to replicate the flex math at all.
  */
  function resizeHighlightWrapperToFitOutputCard() {
    const wrapper = findReplaceState.highlightWrapper;
    const card = output.closest(".output-card") || (wrapper && wrapper.parentNode);

    if (!wrapper || !card) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    let siblingsHeight = 0;

    Array.prototype.forEach.call(card.children, function (child) {
      if (child !== wrapper) {
        siblingsHeight += child.getBoundingClientRect().height;
      }
    });

    const available = cardRect.height - siblingsHeight;

    if (available > 0) {
      wrapper.style.height = available + "px";
    }
  }

  function syncBackdropStyles() {
    if (!findReplaceState.highlightBackdrop) {
      return;
    }

    const computed = getComputedStyle(output);
    const propsToCopy = [
      "boxSizing", "width", "height",
      "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
      "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
      "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle",
      "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
      "fontFamily", "fontSize", "fontWeight", "fontStyle",
      "lineHeight", "letterSpacing", "wordSpacing", "textIndent",
      "whiteSpace", "wordBreak", "overflowWrap", "tabSize"
    ];

    propsToCopy.forEach(function (prop) {
      findReplaceState.highlightBackdrop.style[prop] = computed[prop];
    });
  }

  function wrapWithSyntaxColor(escapedText, color) {
    if (!color) {
      return escapedText;
    }

    const isHighlightColor = color !== WINCROSS_COLOR_BLACK;
    const fontWeight = isHighlightColor ? "font-weight:bold;" : "";

    return '<span style="color:' + color + ";" + fontWeight + '">' + escapedText + "</span>";
  }

  /* ================================================================
    OUTPUT SYNTAX TOKENIZER / PARSER
    ------------------------------------------------------------
    Pipeline:

      RAW OUTPUT LINE
          -> classifyOutputLine(line)      [content-only, no position]
          -> per-type parser (parseXxxLine)
          -> tokens: [{ type, text, color }, ...]
          -> renderHighlightBackdrop() renders tokens to HTML

    classifyOutputLine() never looks at "where in the block" a line
    is -- only at the line's own text -- so a line's meaning can't
    drift if a block's shape ever differs from what this app itself
    generates (extra/missing subtitle, hand-typed syntax, etc).

    Each line type gets its own small parser rather than one shared
    regex; the one exception is tokenizeLogicSegment(), which is
    itself a proper multi-token scanner (not a single "match the
    whole thing" regex) used by every line type that can contain
    variable/answerCode/operator/brace syntax, including normal rows
    AND cross-variable logic ("D1B (1-4) & Q1 (1)", "Q1 (1) OR Q2 (1)",
    "{Q1 (1) or Q2 (2)}"). It scans left-to-right and independently
    classifies each variable, each answer code, each operator, and
    each brace as its own token, so none of them can inherit another
    token's color.
  ================================================================== */

  /*
    Classifies a raw Output line by its own content. No positional
    state (no "this is line 3 of the block") is used anywhere here.
  */
  function classifyOutputLine(line) {
    const trimmed = line.trim();

    if (trimmed === "") {
      return "blank";
    }

    if (/^\*\*\*/.test(trimmed)) {
      return "error";
    }

    if (/^T[A-Z0-9_]+\^\d+$/i.test(trimmed)) {
      return "tqHeader";
    }

    if (/^S\|/.test(trimmed)) {
      return "subtitle";
    }

    if (/^\s*BASE=/i.test(line)) {
      return "base";
    }

    /*
      Covers both "**D/S (...)^ CALC F2-F3,V2-V3^SX" and a Summary
      block's own header row, "TITLE^ CALC F2-F3,V2-V3^SUFFIX" --
      both are calculation syntax, not a normal label/variable row.
    */
    if (
      /^\s*\*\*D\/S\b/i.test(line) ||
      /\^[^^]*\bCALC\s+F\d+-F\d+/i.test(line)
    ) {
      return "calcRow";
    }

    if (/^\s*QUESTION\s+[^:]*:/i.test(line)) {
      return "question";
    }

    if (/^\s*USE=/i.test(line)) {
      return "useLine";
    }

    /*
      Table-options line: no caret at all, just a comma-separated
      list of known option tokens (OR, OV, OI2, O%, F%, ...).
    */
    if (
      !line.includes("^") &&
      /^\s*(OR|OV|OI\d*|O%|F%|R%|RA|OB|OD|BH|RV|S\d+|P\d+|V\d+|SA|SP)(\s*,\s*[A-Za-z0-9%]+)*\s*$/i
        .test(line)
    ) {
      return "tableOptions";
    }

    if (/^\s*\^\s*\^?\s*$/.test(line)) {
      return "separator";
    }

    if (line.includes("^")) {
      return "normalRow";
    }

    // Summary/Ranking/Listout title lines and anything else unrecognized.
    return "plainText";
  }

  /*
    Independent multi-token scanner for a stretch of "logic" text --
    used for both a normal row's variable/code section AND freeform
    cross-variable logic that never gets a trailing modifier caret
    (e.g. "D1B (1-4) & Q1 (1)"). Each match is classified into exactly
    one of: a variable+code pair (split into two independent tokens),
    a brace, a boolean operator (word or symbol), or leftover plain
    text -- so an operator or a second variable can never inherit the
    color of an earlier token.
  */
  const LOGIC_TOKEN_PATTERN =
    /([A-Z][A-Z0-9_]*)(\s*)(\([0-9,\-]+\))|([{}])|(\b(?:OR|AND|NOT)\b)|(&)/gi;

  function tokenizeLogicSegment(text) {
    const tokens = [];
    let cursor = 0;
    let match;

    LOGIC_TOKEN_PATTERN.lastIndex = 0;

    while ((match = LOGIC_TOKEN_PATTERN.exec(text)) !== null) {
      if (match.index > cursor) {
        pushToken(tokens, text.slice(cursor, match.index), TOKEN_COLOR.text);
      }

      const [, variable, spacing, answerCode, brace, operatorWord, operatorSymbol] = match;

      if (variable) {
        pushToken(tokens, variable, TOKEN_COLOR.variable);
        pushToken(tokens, spacing, TOKEN_COLOR.text);
        pushToken(tokens, answerCode, TOKEN_COLOR.answerCode);
      } else if (brace) {
        pushToken(tokens, brace, TOKEN_COLOR.brace);
      } else if (operatorWord || operatorSymbol) {
        pushToken(tokens, match[0], TOKEN_COLOR.operator);
      }

      cursor = match.index + match[0].length;
    }

    if (cursor < text.length) {
      pushToken(tokens, text.slice(cursor), TOKEN_COLOR.text);
    }

    return tokens;
  }

  function pushToken(tokens, text, color) {
    if (!text) return;

    tokens.push({ type: "text", text, color });
  }

  /*
    Splits a stretch of plain (black) text on any "^" characters inside
    it, so every caret still gets the caret color even when it falls
    inside a segment that would otherwise be one uninterrupted run of
    default-colored text (e.g. the gap between "TN" and the rest of a
    BASE line, or between "CALC ..." and a trailing modifier suffix).
  */
  function splitOutCarets(text, textColor) {
    const tokens = [];
    let last = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === "^") {
        if (i > last) {
          tokens.push({ type: "text", text: text.slice(last, i), color: textColor });
        }

        tokens.push({ type: "caret", text: "^", color: TOKEN_COLOR.caret });
        last = i + 1;
      }
    }

    if (last < text.length) {
      tokens.push({ type: "text", text: text.slice(last), color: textColor });
    }

    return tokens;
  }

  /*
    Scans `text` for every occurrence of any word in `wordColorPairs`
    (whole-word, case-insensitive) and colors each occurrence with its
    own color; every other character defaults to `defaultColor`, EXCEPT
    any "^" caret, which always gets the caret color regardless of
    which line type it appears in. Used for the BASE line's "TN" token,
    and the D/S/Summary line's "CALC" + "SX" tokens, and a trailing
    modifier suffix's "RL" + "SX" tokens -- all "find these specific
    literal words, color only them (plus carets)" rules.
  */
  function tokenizeNamedWords(text, wordColorPairs, defaultColor) {
    const tokens = [];
    const pattern = new RegExp(
      "\\b(?:" + wordColorPairs.map(pair => pair.word).join("|") + ")\\b",
      "gi"
    );

    let cursor = 0;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > cursor) {
        splitOutCarets(text.slice(cursor, match.index), defaultColor).forEach(t => tokens.push(t));
      }

      const matchedPair = wordColorPairs.find(pair => new RegExp("^" + pair.word + "$", "i").test(match[0]));

      tokens.push({ type: "text", text: match[0], color: matchedPair ? matchedPair.color : defaultColor });
      cursor = match.index + match[0].length;
    }

    if (cursor < text.length) {
      splitOutCarets(text.slice(cursor), defaultColor).forEach(t => tokens.push(t));
    }

    return tokens;
  }

  /*
    A trailing modifier suffix (e.g. "L-,SX") is black as one run,
    except "RL" and "SX", which each get their own named color.
  */
  function tokenizeModifierSuffix(suffix) {
    return tokenizeNamedWords(
      suffix,
      [
        { word: "RL", color: TOKEN_COLOR.rl },
        { word: "SX", color: TOKEN_COLOR.sx }
      ],
      TOKEN_COLOR.modifier
    );
  }

  /* ---- Per-line-type parsers -------------------------------------- */

  function parseTqHeaderLine(line) {
    return [{ type: "header", text: line, color: TOKEN_COLOR.header }];
  }

  function parseTableOptionsLine(line) {
    return [{ type: "tableOptions", text: line, color: TOKEN_COLOR.tableOptions }];
  }

  function parseErrorLine(line) {
    return [{ type: "error", text: line, color: TOKEN_COLOR.errorText }];
  }

  /*
    "S|..." -- no color is named for the subtitle marker or its text
    in the current spec, so the whole line stays black.
  */
  function parseSubtitleLine(line) {
    return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
  }

  /*
    BASE=TOTAL SAMPLE^TN^1

    Only the literal "TN" token is named in the spec and gets color;
    "BASE=", the base value ("TOTAL SAMPLE"), and the TN value ("1")
    are all black -- every caret still gets the caret color.
  */
  function parseBaseLine(line) {
    const match = line.match(/^(\s*BASE=)(.*?)(\^)(.*)$/i);

    if (!match) {
      return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
    }

    const tokens = [
      { type: "text", text: match[1], color: TOKEN_COLOR.text },
      { type: "text", text: match[2], color: TOKEN_COLOR.text },
      { type: "caret", text: match[3], color: TOKEN_COLOR.caret }
    ];

    tokenizeNamedWords(match[4], [{ word: "TN", color: TOKEN_COLOR.tn }], TOKEN_COLOR.text)
      .forEach(t => tokens.push(t));

    return tokens;
  }

  /*
    **D/S (TOT GOOD - TOT BAD)^ CALC F2-F3,V2-V3^SX
    or a Summary block header: TITLE^ CALC F2-F3,V2-V3^SUFFIX

    Only the literal "CALC" and "SX" words are named in the spec and
    get color; the D/S text and the calc expression (F2-F3,V2-V3) are
    black -- every caret still gets the caret color.
  */
  function parseCalcRowLine(line) {
    return tokenizeNamedWords(
      line,
      [
        { word: "CALC", color: TOKEN_COLOR.calc },
        { word: "SX", color: TOKEN_COLOR.sx }
      ],
      TOKEN_COLOR.text
    );
  }

  /*
    "QUESTION 1:" and the question text itself both stay black; only
    the literal "|" marker gets its own color, per spec.
  */
  function parseQuestionLine(line) {
    const match = line.match(/^(\s*QUESTION\s+[^:]+:\s*)(.*)$/i);

    if (!match) {
      return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
    }

    const tokens = [
      { type: "questionPrefix", text: match[1], color: TOKEN_COLOR.questionPrefix }
    ];

    const rest = match[2];
    const pipeIndex = rest.indexOf("|");

    if (pipeIndex === -1) {
      tokens.push({ type: "questionText", text: rest, color: TOKEN_COLOR.questionText });
      return tokens;
    }

    const before = rest.slice(0, pipeIndex);
    const after = rest.slice(pipeIndex + 1);

    if (before) tokens.push({ type: "questionText", text: before, color: TOKEN_COLOR.questionText });
    tokens.push({ type: "questionPipe", text: "|", color: TOKEN_COLOR.questionPipe });
    if (after) tokens.push({ type: "questionText", text: after, color: TOKEN_COLOR.questionText });

    return tokens;
  }

  function parseUseLine(line) {
    return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
  }

  /*
    "^                       ^" -- a blank separator row. Every caret
    is kept visible as its own token; everything else stays BLACK.
  */
  function parseSeparatorLine(line) {
    const tokens = [];
    let last = 0;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === "^") {
        if (i > last) {
          tokens.push({ type: "text", text: line.slice(last, i), color: TOKEN_COLOR.text });
        }

        tokens.push({ type: "caret", text: "^", color: TOKEN_COLOR.caret });
        last = i + 1;
      }
    }

    if (last < line.length) {
      tokens.push({ type: "text", text: line.slice(last), color: TOKEN_COLOR.text });
    }

    return tokens;
  }

  /*
    The general row shape: LABEL ^ <logic> [^ <modifier>]

    LABEL is plain text up to the first caret. Everything between the
    first and second caret (or everything after the first caret, if
    there's no second) is handed to tokenizeLogicSegment(), which
    independently classifies every variable, every answer code, every
    operator, and every brace inside it -- this is what correctly
    handles cross-variable logic like "D1B (1-4) & Q1 (1)" without any
    of those tokens bleeding into each other's color. A second caret,
    if present, introduces a trailing modifier suffix.
  */
  function parseNormalRowLine(line) {
    const firstCaret = line.indexOf("^");

    if (firstCaret === -1) {
      return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
    }

    const tokens = [
      { type: "label", text: line.slice(0, firstCaret), color: TOKEN_COLOR.label },
      { type: "caret", text: "^", color: TOKEN_COLOR.caret }
    ];

    const afterFirst = line.slice(firstCaret + 1);
    const secondCaret = afterFirst.indexOf("^");

    if (secondCaret === -1) {
      tokenizeLogicSegment(afterFirst).forEach(t => tokens.push(t));
      return tokens;
    }

    const middle = afterFirst.slice(0, secondCaret);
    tokenizeLogicSegment(middle).forEach(t => tokens.push(t));

    tokens.push({ type: "caret", text: "^", color: TOKEN_COLOR.caret });

    const suffix = afterFirst.slice(secondCaret + 1);

    if (suffix) {
      tokenizeModifierSuffix(suffix).forEach(t => tokens.push(t));
    }

    return tokens;
  }

  /*
    Top-level dispatcher: classify, then hand off to the matching
    parser. This is the only function renderHighlightBackdrop() calls.
  */
  function buildOutputLineTokens(line) {
    switch (classifyOutputLine(line)) {
      case "blank": return [{ type: "text", text: line, color: TOKEN_COLOR.text }];
      case "error": return parseErrorLine(line);
      case "tqHeader": return parseTqHeaderLine(line);
      case "subtitle": return parseSubtitleLine(line);
      case "base": return parseBaseLine(line);
      case "calcRow": return parseCalcRowLine(line);
      case "question": return parseQuestionLine(line);
      case "useLine": return parseUseLine(line);
      case "tableOptions": return parseTableOptionsLine(line);
      case "separator": return parseSeparatorLine(line);
      case "normalRow": return parseNormalRowLine(line);
      default: return tokenizeLogicSegment(line);
    }
  }

  /*
    Renders one already-colored piece, additionally overlaying the
    "Only in selection" scope highlight (a <mark>) wherever this piece's
    absolute character range intersects the active scope -- a piece can
    be split into up to three parts (before/inside/after the scope) so
    the highlight boundary can fall in the middle of a colored run.
  */
  function renderPieceWithScope(text, color, absoluteStart, scope) {
    if (!text) {
      return "";
    }

    if (!scope) {
      return wrapWithSyntaxColor(escapeForBackdrop(text), color);
    }

    const absoluteEnd = absoluteStart + text.length;
    const overlapStart = Math.max(absoluteStart, scope.start);
    const overlapEnd = Math.min(absoluteEnd, scope.end);

    if (overlapStart >= overlapEnd) {
      return wrapWithSyntaxColor(escapeForBackdrop(text), color);
    }

    const before = text.slice(0, overlapStart - absoluteStart);
    const middle = text.slice(overlapStart - absoluteStart, overlapEnd - absoluteStart);
    const after = text.slice(overlapEnd - absoluteStart);

    let html = "";

    if (before) {
      html += wrapWithSyntaxColor(escapeForBackdrop(before), color);
    }

    if (middle) {
      html +=
        '<mark style="background:' + SCOPE_HIGHLIGHT_BACKGROUND + ';border-radius:2px;">' +
        wrapWithSyntaxColor(escapeForBackdrop(middle), color) +
        "</mark>";
    }

    if (after) {
      html += wrapWithSyntaxColor(escapeForBackdrop(after), color);
    }

    return html;
  }

  /*
    Repaints the backdrop: full WinCross-style syntax coloring across
    the whole Output text, plus the "Only in selection" scope highlight
    layered on top when active. Called after every real edit (the
    "input" listener), after every generateOutput() (since programmatic
    value assignment doesn't fire "input"), and after any scope/state
    change in the Find & Replace tool.

    NOTE: output.value remains the single source of truth throughout --
    this function only ever READS output.value and WRITES into the
    display-only backdrop's innerHTML. It never writes back into
    output.value, and Copy All / session save continue to read
    output.value directly (see copyOutput() and saveSession()).
  */
  function renderHighlightBackdrop() {
    if (!findReplaceState.highlightBackdrop) {
      return;
    }

    const text = output.value;
    const lines = text.split("\n");

    const scope =
      findReplaceState.inSelectionCheckbox &&
      findReplaceState.inSelectionCheckbox.checked &&
      findReplaceState.selectionRange
        ? findReplaceState.selectionRange
        : null;

    let offset = 0;
    const htmlParts = [];

    lines.forEach(function (line, lineIndex) {
      const pieces = buildOutputLineTokens(line);

      let pieceOffset = offset;

      pieces.forEach(function (piece) {
        htmlParts.push(renderPieceWithScope(piece.text, piece.color, pieceOffset, scope));
        pieceOffset += piece.text.length;
      });

      offset += line.length;

      if (lineIndex < lines.length - 1) {
        htmlParts.push("\n");
        offset += 1;
      }
    });

    findReplaceState.highlightBackdrop.innerHTML = htmlParts.join("") + "\n";
  }

  function setFindReplaceStatus(text) {
    if (findReplaceState.statusLabel) {
      findReplaceState.statusLabel.textContent = text;
    }
  }

  function getFindReplaceRange() {
    const restrictToSelection =
      findReplaceState.inSelectionCheckbox.checked &&
      findReplaceState.selectionRange !== null;

    if (restrictToSelection) {
      return {
        start: findReplaceState.selectionRange.start,
        end: findReplaceState.selectionRange.end
      };
    }

    return { start: 0, end: output.value.length };
  }

  function findAllMatchIndexesInRange(range) {
    const query = findReplaceState.findInput.value;

    if (!query) {
      return [];
    }

    const matchCase = findReplaceState.matchCaseCheckbox.checked;
    const haystack = matchCase ? output.value : output.value.toLowerCase();
    const needle = matchCase ? query : query.toLowerCase();

    const indexes = [];
    let index = haystack.indexOf(needle, range.start);

    while (index !== -1 && index + needle.length <= range.end) {
      indexes.push(index);
      index = haystack.indexOf(needle, index + 1);
    }

    return indexes;
  }

  function updateMatchCounter() {
    if (!findReplaceState.counterLabel) {
      return;
    }

    if (!findReplaceState.findInput.value) {
      findReplaceState.counterLabel.textContent = "";
      return;
    }

    const indexes = findAllMatchIndexesInRange(getFindReplaceRange());

    if (indexes.length === 0) {
      findReplaceState.counterLabel.textContent = "0 of 0";
      return;
    }

    const cursorPos = output.selectionStart || 0;
    let currentIndex = indexes.findIndex(index => index === cursorPos);

    if (currentIndex === -1) {
      currentIndex = indexes.findIndex(index => index >= cursorPos);
    }

    if (currentIndex === -1) {
      currentIndex = 0;
    }

    findReplaceState.counterLabel.textContent = (currentIndex + 1) + " of " + indexes.length;
  }

  function buildFindReplaceBar() {
    if (findReplaceState.bar) {
      return findReplaceState.bar;
    }

    const anchor = output.closest(".output-card") || output.parentNode;

    if (getComputedStyle(anchor).position === "static") {
      anchor.style.position = "relative";
    }

    findReplaceState.anchor = anchor;

    const bar = document.createElement("div");
    bar.className = "find-replace-popup hidden";
    bar.style.cssText =
      "position:absolute;right:16px;width:340px;max-width:calc(100% - 32px);" +
      "z-index:40;background:#fff;border:1px solid #ddd;border-radius:10px;" +
      "box-shadow:0 8px 24px rgba(0,0,0,0.18);padding:14px 16px;font-size:13px;";

    bar.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <strong style="font-size:14px;">Find &amp; Replace</strong>
        <button type="button" class="fr-close secondary" aria-label="Close Find and Replace" style="width:26px;height:26px;padding:0;line-height:1;">×</button>
      </div>

      <div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:8px;">
        <div style="display:flex;flex-direction:column;gap:3px;flex:1;">
          <label style="color:#777;">Find</label>
          <input type="text" class="fr-find" style="width:100%;padding:5px 6px;" />
        </div>
        <span class="fr-counter" style="color:#777;white-space:nowrap;padding-bottom:6px;min-width:44px;text-align:right;"></span>
        <button type="button" class="fr-find-prev secondary" aria-label="Previous match" style="width:32px;padding:4px 0;">↑</button>
        <button type="button" class="fr-find-next secondary" aria-label="Next match" style="width:32px;padding:4px 0;">↓</button>
      </div>

      <div style="display:flex;align-items:flex-end;gap:6px;margin-bottom:10px;">
        <div style="display:flex;flex-direction:column;gap:3px;flex:1;">
          <label style="color:#777;">Replace with</label>
          <input type="text" class="fr-replace" style="width:100%;padding:5px 6px;" />
        </div>
        <button type="button" class="fr-replace-one secondary" style="white-space:nowrap;">Replace</button>
        <button type="button" class="fr-replace-all" style="white-space:nowrap;background:#222;color:#fff;border:none;">Replace All</button>
      </div>

      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:8px;">
        <label style="display:flex;align-items:center;gap:5px;">
          <input type="checkbox" class="fr-match-case" /> Match case
        </label>
        <label style="display:flex;align-items:center;gap:5px;">
          <input type="checkbox" class="fr-in-selection" /> Only in selection
        </label>
      </div>

      <div class="fr-scope-row hidden" style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:#fff8e1;border-radius:6px;margin-bottom:8px;overflow:hidden;">
        <span class="fr-scope-preview" style="color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;"></span>
      </div>

      <div class="fr-status" style="color:#2a7a2a;min-height:16px;"></div>
    `;

    anchor.appendChild(bar);

    findReplaceState.bar = bar;
    findReplaceState.findInput = bar.querySelector(".fr-find");
    findReplaceState.replaceInput = bar.querySelector(".fr-replace");
    findReplaceState.matchCaseCheckbox = bar.querySelector(".fr-match-case");
    findReplaceState.inSelectionCheckbox = bar.querySelector(".fr-in-selection");
    findReplaceState.scopeRow = bar.querySelector(".fr-scope-row");
    findReplaceState.scopePreview = bar.querySelector(".fr-scope-preview");
    findReplaceState.counterLabel = bar.querySelector(".fr-counter");
    findReplaceState.statusLabel = bar.querySelector(".fr-status");

    bar.querySelector(".fr-find-next").addEventListener("click", findNextInOutput);
    bar.querySelector(".fr-find-prev").addEventListener("click", findPreviousInOutput);
    bar.querySelector(".fr-replace-one").addEventListener("click", replaceCurrentInOutput);
    bar.querySelector(".fr-replace-all").addEventListener("click", replaceAllInOutput);
    bar.querySelector(".fr-close").addEventListener("click", closeFindReplaceBar);

    findReplaceState.findInput.addEventListener("input", updateMatchCounter);
    findReplaceState.matchCaseCheckbox.addEventListener("change", updateMatchCounter);
    findReplaceState.inSelectionCheckbox.addEventListener("change", function () {
      updateMatchCounter();
      renderHighlightBackdrop();
    });

    findReplaceState.findInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (event.shiftKey) {
          findPreviousInOutput();
        } else {
          findNextInOutput();
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeFindReplaceBar();
      }
    });

    findReplaceState.replaceInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        replaceCurrentInOutput();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeFindReplaceBar();
      }
    });

    return bar;
  }

  function positionFindReplaceBar() {
    const anchor = findReplaceState.anchor;
    const bar = findReplaceState.bar;
    const buttonRow = anchor.querySelector(".button-row");

    if (buttonRow) {
      const anchorTop = anchor.getBoundingClientRect().top;
      const rowBottom = buttonRow.getBoundingClientRect().bottom;
      bar.style.top = Math.max(0, rowBottom - anchorTop + 8) + "px";
    } else {
      bar.style.top = "12px";
    }
  }

  function openFindReplaceBar() {
    const bar = buildFindReplaceBar();
    ensureHighlightBackdrop();
    positionFindReplaceBar();
    bar.classList.remove("hidden");

    const selectionStart = output.selectionStart || 0;
    const selectionEnd = output.selectionEnd || 0;

    if (selectionEnd > selectionStart) {
      const selectedText = output.value.slice(selectionStart, selectionEnd);

      findReplaceState.selectionRange = { start: selectionStart, end: selectionEnd };
      findReplaceState.inSelectionCheckbox.disabled = false;
      findReplaceState.inSelectionCheckbox.checked = true;
      findReplaceState.scopeRow.classList.remove("hidden");

      const preview = selectedText.replace(/\s+/g, " ").trim().slice(0, 60);
      findReplaceState.scopePreview.textContent =
        (preview || "(blank)") +
        (selectedText.length > 60 ? "… " : " ") +
        "(" + selectedText.length + " chars)";

      /*
        A short, single-line selection is most likely meant as the
        search term itself (the old behavior). A larger or multi-line
        selection -- like a whole highlighted block -- is meant as the
        *scope* to search within, not literal text to search for, so
        the Find field is left for the user to type their own term.
      */
      const looksLikeASearchTermRatherThanAScope =
        selectedText.length <= 60 && !selectedText.includes("\n");

      if (looksLikeASearchTermRatherThanAScope) {
        findReplaceState.findInput.value = selectedText;
      }
    } else {
      findReplaceState.selectionRange = null;
      findReplaceState.inSelectionCheckbox.checked = false;
      findReplaceState.inSelectionCheckbox.disabled = true;
      findReplaceState.scopeRow.classList.add("hidden");
    }

    setFindReplaceStatus("");
    findReplaceState.findInput.focus();
    findReplaceState.findInput.select();
    updateMatchCounter();
    renderHighlightBackdrop();
  }

  function closeFindReplaceBar() {
    if (!findReplaceState.bar) {
      return;
    }

    findReplaceState.bar.classList.add("hidden");
    findReplaceState.selectionRange = null;
    renderHighlightBackdrop();
    output.focus();
  }

  function findNextInOutput() {
    const query = findReplaceState.findInput.value;

    if (!query) {
      setFindReplaceStatus("");
      return false;
    }

    const matchCase = findReplaceState.matchCaseCheckbox.checked;
    const restrictToSelection =
      findReplaceState.inSelectionCheckbox.checked &&
      findReplaceState.selectionRange !== null;

    const fullValue = output.value;
    const rangeStart = restrictToSelection ? findReplaceState.selectionRange.start : 0;
    const rangeEnd = restrictToSelection ? findReplaceState.selectionRange.end : fullValue.length;

    const haystack = matchCase ? fullValue : fullValue.toLowerCase();
    const needle = matchCase ? query : query.toLowerCase();

    const isWithinRange = index => index !== -1 && index >= rangeStart && index + needle.length <= rangeEnd;

    const searchFrom = Math.max(output.selectionEnd || 0, rangeStart);
    let index = haystack.indexOf(needle, searchFrom);

    if (!isWithinRange(index)) {
      // Wrap around to the start of the active range (whole document,
      // or just the selection scope) once the end is reached.
      index = haystack.indexOf(needle, rangeStart);
    }

    if (!isWithinRange(index)) {
      setFindReplaceStatus(restrictToSelection ? "No matches in selection" : "No matches");
      updateMatchCounter();
      return false;
    }

    output.focus();
    output.setSelectionRange(index, index + needle.length);
    setFindReplaceStatus("Match found");
    updateMatchCounter();
    return true;
  }

  function findPreviousInOutput() {
    const query = findReplaceState.findInput.value;

    if (!query) {
      setFindReplaceStatus("");
      return false;
    }

    const matchCase = findReplaceState.matchCaseCheckbox.checked;
    const restrictToSelection =
      findReplaceState.inSelectionCheckbox.checked &&
      findReplaceState.selectionRange !== null;

    const fullValue = output.value;
    const rangeStart = restrictToSelection ? findReplaceState.selectionRange.start : 0;
    const rangeEnd = restrictToSelection ? findReplaceState.selectionRange.end : fullValue.length;

    const haystack = matchCase ? fullValue : fullValue.toLowerCase();
    const needle = matchCase ? query : query.toLowerCase();

    const isWithinRange = index => index !== -1 && index >= rangeStart && index + needle.length <= rangeEnd;

    const searchBefore = Math.min(output.selectionStart || 0, rangeEnd) - 1;
    let index = searchBefore >= 0 ? haystack.lastIndexOf(needle, searchBefore) : -1;

    if (!isWithinRange(index)) {
      // Wrap around to the last match within the active range.
      index = haystack.lastIndexOf(needle, rangeEnd - 1);
    }

    if (!isWithinRange(index)) {
      setFindReplaceStatus(restrictToSelection ? "No matches in selection" : "No matches");
      updateMatchCounter();
      return false;
    }

    output.focus();
    output.setSelectionRange(index, index + needle.length);
    setFindReplaceStatus("Match found");
    updateMatchCounter();
    return true;
  }

  function replaceCurrentInOutput() {
    const query = findReplaceState.findInput.value;

    if (!query) {
      return;
    }

    const matchCase = findReplaceState.matchCaseCheckbox.checked;
    const selectionStart = output.selectionStart;
    const selectionEnd = output.selectionEnd;
    const selectedText = output.value.slice(selectionStart, selectionEnd);

    const isCurrentSelectionAMatch =
      selectedText !== "" &&
      (matchCase
        ? selectedText === query
        : selectedText.toLowerCase() === query.toLowerCase());

    if (isCurrentSelectionAMatch) {
      const replaceText = findReplaceState.replaceInput.value;

      output.value =
        output.value.slice(0, selectionStart) +
        replaceText +
        output.value.slice(selectionEnd);

      output.dispatchEvent(new Event("input", { bubbles: true }));

      /*
        If we're scoped to a selection range and the replacement text
        is a different length than what it replaced, keep the scope's
        end boundary accurate so later Find Next / Replace calls don't
        drift past where the selection actually ends now.
      */
      if (findReplaceState.inSelectionCheckbox.checked && findReplaceState.selectionRange) {
        findReplaceState.selectionRange.end += replaceText.length - selectedText.length;
      }

      const newCursorPos = selectionStart + replaceText.length;
      output.setSelectionRange(newCursorPos, newCursorPos);
      setFindReplaceStatus("Replaced");
      renderHighlightBackdrop();
    }

    findNextInOutput();
  }

  function replaceAllInOutput() {
    const query = findReplaceState.findInput.value;

    if (!query) {
      setFindReplaceStatus("");
      return;
    }

    const replaceText = findReplaceState.replaceInput.value;
    const matchCase = findReplaceState.matchCaseCheckbox.checked;
    const pattern = new RegExp(escapeRegExp(query), matchCase ? "g" : "gi");

    const restrictToSelection =
      findReplaceState.inSelectionCheckbox.checked &&
      findReplaceState.selectionRange !== null;

    const fullValue = output.value;

    if (!restrictToSelection) {
      const matchCount = (fullValue.match(pattern) || []).length;

      if (matchCount === 0) {
        setFindReplaceStatus("No matches");
        return;
      }

      output.value = fullValue.replace(pattern, replaceText);
      output.dispatchEvent(new Event("input", { bubbles: true }));

      setFindReplaceStatus(
        matchCount + (matchCount === 1 ? " replacement" : " replacements")
      );
      updateMatchCounter();
      renderHighlightBackdrop();
      return;
    }

    /*
      Only in selection: everything outside [start, end) is left
      completely untouched -- we only ever run .replace() on the
      substring in between, then splice it back into place.
    */
    const { start, end } = findReplaceState.selectionRange;

    // Clamp in case the text length changed since the selection was captured.
    const clampedStart = Math.max(0, Math.min(start, fullValue.length));
    const clampedEnd = Math.max(clampedStart, Math.min(end, fullValue.length));

    const before = fullValue.slice(0, clampedStart);
    const middle = fullValue.slice(clampedStart, clampedEnd);
    const after = fullValue.slice(clampedEnd);

    const matchCount = (middle.match(pattern) || []).length;

    if (matchCount === 0) {
      setFindReplaceStatus("No matches in selection");
      return;
    }

    const replacedMiddle = middle.replace(pattern, replaceText);

    output.value = before + replacedMiddle + after;
    output.dispatchEvent(new Event("input", { bubbles: true }));

    // Keep the scope in sync with the (possibly different) new length,
    // and re-highlight it so it's clear exactly what was touched.
    const newEnd = clampedStart + replacedMiddle.length;
    findReplaceState.selectionRange = { start: clampedStart, end: newEnd };
    output.setSelectionRange(clampedStart, newEnd);

    setFindReplaceStatus(
      matchCount + (matchCount === 1 ? " replacement (selection only)" : " replacements (selection only)")
    );
    updateMatchCounter();
    renderHighlightBackdrop();
  }

  function initFindReplace() {
    if (!output) {
      return;
    }

    output.addEventListener("input", renderHighlightBackdrop);

    output.addEventListener("keydown", function (event) {
      const isReplaceShortcut =
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        !event.altKey &&
        (event.key === "h" || event.key === "H");

      if (isReplaceShortcut) {
        event.preventDefault();
        openFindReplaceBar();
      }
    });

    /*
      Reliable, keyboard-independent entry point -- important on macOS,
      where Cmd+H is intercepted by the OS to hide the app before the
      page ever sees the keydown.
    */
    const buttonRow = document.querySelector(".output-card .button-row");

    if (buttonRow) {
      const findReplaceBtn = document.createElement("button");
      findReplaceBtn.type = "button";
      findReplaceBtn.textContent = "Find & Replace";
      findReplaceBtn.className = "secondary";
      findReplaceBtn.addEventListener("click", openFindReplaceBar);
      buttonRow.appendChild(findReplaceBtn);
    }

    window.addEventListener("resize", function () {
      if (findReplaceState.bar && !findReplaceState.bar.classList.contains("hidden")) {
        positionFindReplaceBar();
      }
    });
  }

  /* ================= SESSION PERSISTENCE ================= */

  function saveSession() {
    try {

      const session = {
        version: 2,
        savedAt: new Date().toISOString(),

        tables,
        editingIndex,
        f4Rows,
        f4ExcelFileName,

        output: tables.length ? output.value : "",
        outputEdited: tables.length ? outputEdited : false
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(session)
      );

    } catch(err) {
      console.error(err);
    }
  }

  /*
    LOAD SESSION — never calls saveSession() itself (no
    load -> generate -> save -> load loops). Always renders the
    input list and always ends with Output in a defined state,
    even for a brand-new user with nothing in localStorage
    (previously, an empty localStorage caused an early return
    that skipped renderInputList()/generateOutput() entirely).
  */
  function loadSession() {
    let session = null;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        session = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Failed to parse saved session", err);
      session = null;
    }

    if (session && Array.isArray(session.tables)) {
      tables = session.tables;
      editingIndex = session.editingIndex ?? null;
      f4Rows = Array.isArray(session.f4Rows) ? session.f4Rows : [];
      f4ExcelFileName = session.f4ExcelFileName || "";
    } else {
      tables = [];
      editingIndex = null;
    }

    renderInputList();

    if (
      session &&
      session.outputEdited &&
      typeof session.output === "string"
    ) {
      output.value = session.output;
      outputEdited = true;
      renderHighlightBackdrop();
    } else {
      outputEdited = false;
      generateOutput();
    }
  }

  /* ================= SORTABLE ================= */

  function initSortable() {
    const list = inputList || document.getElementById("inputList");

    if (!list) return;

    if (sortable) {
      sortable.destroy();
      sortable = null;
    }

    sortable = new Sortable(list, {

      animation: 180,

      ghostClass: "dragging",

      onEnd(event) {

        if (
          event.oldIndex ===
          event.newIndex
        ) {
          return;
        }

        /*
          BUG FIX: confirmation must happen BEFORE the tables
          array is mutated, not after. The previous version
          spliced `tables` first and only asked for confirmation
          afterward, so canceling left the data model reordered
          even though the render/save/generate never happened.
          If the user cancels, renderInputList() re-renders the
          list from the untouched `tables` array, which also
          undoes the visual reorder Sortable already performed
          on the DOM.
        */
        if (
          outputEdited &&
          output.value.trim()
        ) {
          const confirmRefresh = confirm(
            "Your Output has been edited manually.\n\n" +
            "Reordering the Input List will regenerate the Output.\n\n" +
            "Continue?"
          );

          if (!confirmRefresh) {
            renderInputList();
            return;
          }
        }

        const movedTable =
          tables.splice(
            event.oldIndex,
            1
          )[0];

        tables.splice(
          event.newIndex,
          0,
          movedTable
        );

        renderInputList();
        generateOutput();
        outputEdited = false;
        saveSession();
      }

    });
  }

  /* ================= HELP TOOLTIP ================= */

  function closeAllHelpTooltips(exceptButton = null) {
    document
      .querySelectorAll(".help-tooltip.is-open")
      .forEach(button => {
        if (button !== exceptButton) {
          button.classList.remove("is-open");
        }
      });
  }

  function positionHelpTooltip(button) {
    const tooltipBox =
      button.querySelector(".help-tooltip-box");

    if (!tooltipBox) return;

    /*
      Trên mobile, để CSS media query
      tự đưa tooltip vào giữa màn hình.
    */
    if (window.innerWidth <= 600) {
      tooltipBox.style.removeProperty("top");
      tooltipBox.style.removeProperty("left");
      return;
    }

    const buttonRect =
      button.getBoundingClientRect();

    const gap = 26;
    const screenPadding = 12;

    const tooltipWidth =
      tooltipBox.offsetWidth || 350;

      
    const tooltipHeight =
      tooltipBox.offsetHeight || 200;

    /*
      Đặt tooltip bên phải nút dấu hỏi.
    */
    let left =
      buttonRect.right + gap;

    let top =
      buttonRect.top - 10;

    /*
      Không để tooltip tràn khỏi cạnh phải
      hoặc cạnh dưới màn hình.
    */
    left = Math.min(
      left,
      window.innerWidth -
        tooltipWidth -
        screenPadding
    );

    top = Math.max(
      screenPadding,
      Math.min(
        top,
        window.innerHeight -
          tooltipHeight -
          screenPadding
      )
    );

    tooltipBox.style.left =
      `${left}px`;

    tooltipBox.style.top =
      `${top}px`;
  }

  function initHelpTooltips() {
    /*
      Đặt vị trí trước khi tooltip hiện khi hover.
    */
    document.addEventListener(
      "pointerover",
      function (event) {
        const helpButton =
          event.target.closest(".help-tooltip");

        if (helpButton) {
          positionHelpTooltip(helpButton);
        }
      }
    );

    /*
      Hỗ trợ điều hướng bằng bàn phím.
    */
    document.addEventListener(
      "focusin",
      function (event) {
        const helpButton =
          event.target.closest(".help-tooltip");

        if (helpButton) {
          positionHelpTooltip(helpButton);
        }
      }
    );

    /*
      Click dấu hỏi để mở hoặc đóng.
    */
    document.addEventListener(
      "click",
      function (event) {
        if (
          event.target.closest(
            ".help-tooltip-box"
          )
        ) {
          event.stopPropagation();
          return;
        }

        const helpButton =
          event.target.closest(".help-tooltip");

        if (!helpButton) {
          closeAllHelpTooltips();
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const shouldOpen =
          !helpButton.classList.contains(
            "is-open"
          );

        closeAllHelpTooltips(helpButton);

        helpButton.classList.toggle(
          "is-open",
          shouldOpen
        );

        if (shouldOpen) {
          requestAnimationFrame(() => {
            positionHelpTooltip(helpButton);
          });
        }
      }
    );

    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key === "Escape") {
          closeAllHelpTooltips();
        }
      }
    );

    /*
      Cập nhật vị trí khi thay đổi kích thước cửa sổ.
    */
    window.addEventListener(
      "resize",
      function () {
        document
          .querySelectorAll(
            ".help-tooltip.is-open"
          )
          .forEach(positionHelpTooltip);
      }
    );

    /*
      Cập nhật vị trí khi cuộn Input.
    */
    if (inputCard) {
      inputCard.addEventListener(
        "scroll",
        function () {
          document
            .querySelectorAll(
              ".help-tooltip.is-open"
            )
            .forEach(positionHelpTooltip);
        },
        { passive: true }
      );
    }
  }

  /* ================= REGION MAPPING (OPTIONAL) =================
    Isolated: if any of the three elements it needs are missing
    from the page, this feature simply does not attach any
    listeners, and the core Crosstab Builder is unaffected.
  */
  function initRegionMapping() {
    if (
      !regionFileInput ||
      !regionLogicInput ||
      !applyRegionMappingBtn
    ) {
      return;
    }

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
      if (listoutManualSectionsInput) {
        listoutManualSectionsInput.value = manualSectionsText;
      }

      generateOutput();

      alert("Region mapping applied successfully!");
    });
  }

  /* ================= INITIALIZATION ================= */

  /*
    Step 1 of init(): cache DOM elements.
    Core elements go through requireElement() so a missing
    element logs a clear console error instead of failing
    silently later. Everything else is optional and is simply
    assigned (possibly null); each optional feature's own
    init function checks for null before attaching listeners.
  */
  function cacheDomElements() {
    projectTypeSelect = document.getElementById("projectType");
    questionCodeInput = requireElement("questionCode");
    questionTypeSelect = requireElement("questionType");
    rowTypeSelect = requireElement("rowType");
    rowTypeBox = document.getElementById("rowTypeBox");
    questionTextInput = requireElement("questionText");

    answerOptionsInput = document.getElementById("answerOptions");
    answerOptionsBox = document.getElementById("answerOptionsBox");

    useCustomNetGroupsCheckbox = document.getElementById("useCustomNetGroups");
    customNetGroupBox = document.getElementById("customNetGroupBox");
    customNetGroupsInput = document.getElementById("customNetGroups");
    buildCustomDSBtn = document.getElementById("buildCustomDSBtn");
    customDSBox = document.getElementById("customDSBox");
    customDSPositiveSelect = document.getElementById("customDSPositive");
    customDSNegativeSelect = document.getElementById("customDSNegative");

    demographicSetupPanel = document.getElementById("demographicSetupPanel");
    demographicAdditionalCodesInput = document.getElementById("demographicAdditionalCodes");

    normalOptionsBox = document.getElementById("normalOptionsBox");
    useSTCheckbox = document.getElementById("useST");
    useDSCheckbox = document.getElementById("useDS");
    useDSBox = document.getElementById("useDSBox");
    sharedDSSetupBox = document.getElementById("sharedDSSetupBox");

    useRankBox = document.getElementById("useRankBox");
    useRankCheckbox = document.getElementById("useRank");
    rankRLBox = document.getElementById("rankRLBox");
    rankRLCodesInput = document.getElementById("rankRLCodes");

    sharedMeanSetupBox = document.getElementById("sharedMeanSetupBox");
    useMeanCheckbox = document.getElementById("useMean");
    meanSetupBox = document.getElementById("meanSetupBox");
    meanCodeRangeInput = document.getElementById("meanCodeRange");

    subtitleBox = document.getElementById("subtitleBox");
    subtitleOnlyInput = document.getElementById("subtitleOnly");
    manualUseIndexInput = document.getElementById("manualUseIndex");

    askedBaseBox = document.getElementById("askedBaseBox");
    askedBaseTextBox = document.getElementById("askedBaseTextBox");
    askedBaseTextInput = document.getElementById("askedBaseText");

    arraySampleSetupBox = document.getElementById("arraySampleSetupBox");
    buildArraySampleBtn = document.getElementById("buildArraySampleBtn");

    arraySampleModal = document.getElementById("arraySampleModal");
    closeArraySampleModalBtn = document.getElementById("closeArraySampleModalBtn");
    saveArraySampleModalBtn = document.getElementById("saveArraySampleModalBtn");
    arraySampleTableContainer = document.getElementById("arraySampleTableContainer");

    summarySetupBox = document.getElementById("summarySetupBox");
    summaryRawInput = document.getElementById("summaryRawInput");
    summaryBlockCountInput = document.getElementById("summaryBlockCount");
    buildSummarySetupBtn = document.getElementById("buildSummarySetupBtn");
    summaryBlockSetupContainer = document.getElementById("summaryBlockSetupContainer");

    summaryModal = document.getElementById("summaryModal");
    openSummaryModalBtn = document.getElementById("openSummaryModalBtn");
    closeSummaryModalBtn = document.getElementById("closeSummaryModalBtn");
    saveSummaryModalBtn = document.getElementById("saveSummaryModalBtn");
    summarySetupPanel = document.getElementById("summarySetupPanel");

    rankingSetupPanel = document.getElementById("rankingSetupPanel");
    rankingMetricDefinitionsInput = document.getElementById("rankingMetricDefinitions");
    rankingItemsInput = document.getElementById("rankingItemsInput");

    useSplitABCheckbox = document.getElementById("useSplitAB");
    splitABBox = document.getElementById("splitABBox");
    splitRowsContainer = document.getElementById("splitRowsContainer");
    addSplitRowBtn = document.getElementById("addSplitRowBtn");

    listoutSetupPanel = document.getElementById("listoutSetupPanel");
    listoutManualSectionsInput = document.getElementById("listoutManualSections");

    includeVersionSectionCheckbox = document.getElementById("includeVersionSection");
    versionExtraRowsInput = document.getElementById("versionExtraRows");

    includeModeSectionCheckbox = document.getElementById("includeModeSection");
    modeExtraRowsInput = document.getElementById("modeExtraRows");

    includeDateSectionCheckbox = document.getElementById("includeDateSection");
    dateVariableInput = document.getElementById("dateVariable");
    startDateInput = document.getElementById("startDateInput");
    endDateInput = document.getElementById("endDateInput");

    toggleVersionExtraBtn = document.getElementById("toggleVersionExtraBtn");
    versionExtraBox = document.getElementById("versionExtraBox");

    toggleModeExtraBtn = document.getElementById("toggleModeExtraBtn");
    modeExtraBox = document.getElementById("modeExtraBox");

    toggleDateSetupBtn = document.getElementById("toggleDateSetupBtn");
    dateSetupBox = document.getElementById("dateSetupBox");

    buildRankingSplitBtn = document.getElementById("buildRankingSplitBtn");
    rankingSplitModal = document.getElementById("rankingSplitModal");
    closeRankingSplitModalBtn = document.getElementById("closeRankingSplitModalBtn");
    saveRankingSplitModalBtn = document.getElementById("saveRankingSplitModalBtn");
    rankingSplitTableContainer = document.getElementById("rankingSplitTableContainer");

    inputList = requireElement("inputList");
    output = requireElement("output");

    addBtn = requireElement("addBtn");
    cancelEditBtn = document.getElementById("cancelEditBtn");
    clearInputBtn = document.getElementById("clearInputBtn");
    clearAllBtn = document.getElementById("clearAllBtn");
    generateBtn = requireElement("generateBtn");
    copyBtn = document.getElementById("copyBtn");

    regionFileInput = document.getElementById("regionFileInput");
    regionLogicInput = document.getElementById("regionLogicVar");
    applyRegionMappingBtn = document.getElementById("applyRegionMapping");

    inputCard = document.querySelector(".input-card");

    normalInputFields = document.getElementById("normalInputFields");
    f4InputPanel = document.getElementById("f4InputPanel");
    f4ExcelInput = document.getElementById("f4ExcelInput");
    f4SpssInput = document.getElementById("f4SpssInput");
    f4FileStatus = document.getElementById("f4FileStatus");
    f4GeneratorBtn = document.getElementById("f4GeneratorBtn");
    f4GeneratorModal = document.getElementById("f4GeneratorModal");
    f4GeneratorBody = document.getElementById("f4GeneratorBody");
    closeF4GeneratorBtn = document.getElementById("closeF4GeneratorBtn");
    f4CancelGeneratorBtn = document.getElementById("f4CancelGeneratorBtn");
    f4SaveGeneratorBtn = document.getElementById("f4SaveGeneratorBtn");
    f4AddRowBtn = document.getElementById("f4AddRowBtn");
    f4ValidationPanel = document.getElementById("f4ValidationPanel");
    f4ValidationSummary = document.getElementById("f4ValidationSummary");
    f4ValidationBody = document.getElementById("f4ValidationBody");
  }

  /*
    Step 2: initial default UI state (row type dropdown,
    visibility toggles, default split rows).
  */
  function initDefaultUIState() {
    populateRowTypeOptions(normalRowTypeOptions, "");

    if (splitRowsContainer && splitRowsContainer.children.length === 0) {
      resetSplitRows();
    }

    toggleQuestionTypeUI();
    toggleAskedBaseBox();
    toggleSubtitleBox();
    toggleAnswerOptionsBox();
    toggleCustomNetGroupBox();
    toggleUseDSBox();
    toggleProjectModeUI();
  }

  /*
    Step 4: attach the CORE event listeners. Every one of these
    is registered exactly once, right here, and nowhere else in
    the file (search for "addEventListener" to verify there are
    no duplicates for addBtn/generateBtn/copyBtn/output/etc).
  */
  function attachCoreEventListeners() {
    if (addBtn) {
      addBtn.addEventListener("click", addTable);
    }

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", cancelEdit);
    }

    if (clearInputBtn) {
      clearInputBtn.addEventListener("click", clearInput);
    }

    if (clearAllBtn) {
      clearAllBtn.addEventListener("click", clearAll);
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", handleGenerateOutput);
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", copyOutput);
    }

    /*
      BUG FIX: this listener previously also called
      updateOutputHighlight() (writing into a "#outputHighlight"
      element that is never created anywhere in the file -- always
      a no-op) and registered a SECOND scroll listener that queried
      that same nonexistent element. Both removed: renderHighlightBackdrop()
      is already wired to this same "input" event inside
      initFindReplace() below, and the real scroll sync lives inside
      ensureHighlightBackdrop(). Having two systems both trying to
      render Output's highlighting is exactly what this pass was
      asked to eliminate.
    */
    if (output) {
      output.addEventListener("input", function () {
        outputEdited = true;
        saveSession();

        /*
          Live, debounced reverse-sync: after the user pauses
          typing in Output, re-parse the whole textarea and
          rebuild the Input List boxes from it. This never
          touches output.value itself -- it only updates the
          in-memory `tables` array (and re-renders the list),
          so the user's manual edit is never overwritten.
        */
        if (outputSyncDebounceTimer) {
          clearTimeout(outputSyncDebounceTimer);
        }

        outputSyncDebounceTimer = setTimeout(function () {
          syncTablesFromOutputSyntax();
        }, 600);
      });
    }

    if (questionCodeInput) {
      questionCodeInput.addEventListener(
        "input",
        function () {
          const isArray =
            questionTypeSelect.value ===
              "single_choice" &&
            isQuestionCodeRange(
              questionCodeInput.value
            );

          /*
            Range => Array.
            ST được bật tự động.
          */
          if (isArray) {
            useSTCheckbox.checked = true;
            autoSTFromArray = true;
          } else {
            /*
              Nếu ST trước đó được bật tự động
              vì Array, khi quay về Single Choice
              thì tự tắt nó.

              Không tắt ST nếu user đã tự bật bằng tay.
            */
            if (autoSTFromArray) {
              useSTCheckbox.checked = false;
              autoSTFromArray = false;
            }

            /*
              Xóa state Array cũ.
            */
            pendingArraySampleSelections = [];

            safeClearHTML(
              arraySampleTableContainer
            );

            safeAddHidden(
              arraySampleModal
            );
          }

          toggleSubtitleBox();
          toggleAskedBaseBox();
          toggleAnswerOptionsBox();
          toggleUseDSBox();
        }
      );
    }

    if (subtitleOnlyInput) {
      subtitleOnlyInput.addEventListener(
        "blur",
        function () {
          this.value = getSubtitleLines().join("\n");
        }
      );
    }

    if (useMeanCheckbox) {
      useMeanCheckbox.addEventListener(
        "change",
        toggleMeanSetupUI
      );
    }

    if (useRankCheckbox) {
      useRankCheckbox.addEventListener(
        "change",
        toggleRankRLBox
      );
    }

    if (useDSCheckbox) {
      useDSCheckbox.addEventListener(
        "change",
        function () {
          toggleUseDSBox();

          if (!useDSCheckbox.checked && customDSBox) {
            customDSBox.classList.add("hidden");
          }
        }
      );
    }

    if (demographicAdditionalCodesInput) {
      demographicAdditionalCodesInput.addEventListener(
        "input",
        function () {
          if (questionTypeSelect.value !== "demographic") {
            return;
          }

          if (customDSPositiveSelect) customDSPositiveSelect.innerHTML = "";
          if (customDSNegativeSelect) customDSNegativeSelect.innerHTML = "";
          if (customDSBox) customDSBox.classList.add("hidden");
        }
      );
    }

    if (rowTypeSelect) {
      rowTypeSelect.addEventListener(
        "change",
        function () {
          toggleAnswerOptionsBox();

          if (customDSPositiveSelect) customDSPositiveSelect.innerHTML = "";
          if (customDSNegativeSelect) customDSNegativeSelect.innerHTML = "";
          if (customDSBox) customDSBox.classList.add("hidden");

          toggleUseDSBox();
        }
      );
    }

    if (questionTypeSelect) {
      questionTypeSelect.addEventListener(
        "change",
        function () {

          localStorage.setItem(
            LAST_QUESTION_TYPE_KEY,
            questionTypeSelect.value
          );

          if (
            questionTypeSelect.value ===
            "demographic"
          ) {
            populateRowTypeOptions(
              demographicRowTypeOptions,
              ""
            );
          }

          if (
            questionTypeSelect.value ===
              "single_choice" ||
            questionTypeSelect.value === ""
          ) {
            setDefaultRowTypeByQuestionType();
          }

          if (
            questionTypeSelect.value !==
            "multiple_choice"
          ) {
            answerOptionsInput.value = "";
            useCustomNetGroupsCheckbox.checked = false;
            customNetGroupsInput.value = "";
            customNetGroupBox.classList.add("hidden");
            customDSBox.classList.add("hidden");
          }

          toggleQuestionTypeUI();

          if (
            questionTypeSelect.value ===
            "single_choice"
          ) {
            rowTypeSelect.value =
              "custom_code";
          }

          toggleQuestionTypeUI();
          toggleAnswerOptionsBox();
          toggleUseDSBox();
          toggleAskedBaseBox();
          toggleSubtitleBox();
        }
      );
    }

    if (useSTCheckbox) {
      useSTCheckbox.addEventListener(
        "change",
        function () {
          /*
            User tự click ST thì từ đây
            không còn coi nó là ST auto từ Array.
          */
          autoSTFromArray = false;

          toggleSubtitleBox();
          toggleAskedBaseBox();
          toggleAnswerOptionsBox();
          toggleUseDSBox();
        }
      );
    }

    if (questionTextInput) {
      questionTextInput.addEventListener(
        "paste",
        function (event) {
          const clipboardText =
            event.clipboardData?.getData("text/plain");

          if (clipboardText === undefined) {
            return;
          }

          event.preventDefault();

          const start =
            this.selectionStart ?? this.value.length;

          const end =
            this.selectionEnd ?? start;

          const before = this.value.slice(0, start);
          const after = this.value.slice(end);

          /*
            Chỉ xóa question number khi user đang paste
            vào một ô trống hoặc thay toàn bộ nội dung.

            Điều này tránh trường hợp paste "6. Something"
            vào giữa một đoạn văn mà app tự xóa số 6.
          */
          const isReplacingWholeText =
            before.trim() === "" &&
            after.trim() === "";

          let cleanedPaste =
            normalizeQuestionSpacing(clipboardText);

          if (isReplacingWholeText) {
            cleanedPaste =
              removeLeadingQuestionNumber(
                cleanedPaste
              );
          }

          this.value =
            before +
            cleanedPaste +
            after;

          const newCursorPosition =
            before.length + cleanedPaste.length;

          this.setSelectionRange(
            newCursorPosition,
            newCursorPosition
          );
        }
      );

      questionTextInput.addEventListener(
        "blur",
        function () {
          this.value = normalizeQuestionText(
            this.value
          );
        }
      );
    }

    if (useCustomNetGroupsCheckbox) {
      useCustomNetGroupsCheckbox.addEventListener("change", toggleCustomNetGroupBox);
    }

    if (buildCustomDSBtn) {
      buildCustomDSBtn.addEventListener("click", buildCustomDSSetup);
    }

    if (answerOptionsInput) {
      answerOptionsInput.addEventListener(
        "blur",
        function () {
          this.value = cleanAnswerOptionsText(
            this.value
          );
        }
      );
    }

    if (customNetGroupsInput) {
      customNetGroupsInput.addEventListener("blur", function () {
        customNetGroupsInput.value = customNetGroupsInput.value.toUpperCase();
      });
    }
  }

  function setDefaultRowTypeByQuestionType() {
    const questionType =
      questionTypeSelect.value;

    /*
      Single Choice và Array mặc định dùng CUSTOM CODE.
    */
    if (
      questionType === "single_choice"
    ) {
      populateRowTypeOptions(
        normalRowTypeOptions,
        "custom_code"
      );

      rowTypeSelect.value =
        "custom_code";

      return;
    }

    if (questionType === "") {
      populateRowTypeOptions(
        normalRowTypeOptions,
        ""
      );
    }
  }

  /* ---- Optional feature: Split Rows / Ranking Split ---- */
  function initSplitRowEvents() {
    if (useSplitABCheckbox) {
      useSplitABCheckbox.addEventListener("change", toggleSplitABBox);
    }

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
  }

  /* ---- Optional feature: Ranking Split modal ---- */
  function initRankingEvents() {
    if (buildRankingSplitBtn) {
      buildRankingSplitBtn.addEventListener("click", buildRankingSplitSetup);
    }

    if (closeRankingSplitModalBtn) {
      closeRankingSplitModalBtn.addEventListener("click", closeRankingSplitModal);
    }

    if (saveRankingSplitModalBtn) {
      saveRankingSplitModalBtn.addEventListener("click", closeRankingSplitModal);
    }

    if (rankingSplitModal) {
      rankingSplitModal.addEventListener("click", function (event) {
        if (event.target === rankingSplitModal) {
          closeRankingSplitModal();
        }
      });
    }
  }

  /* ---- Optional feature: Summary modal ---- */
  function initSummaryEvents() {
    if (buildSummarySetupBtn) {
      buildSummarySetupBtn.addEventListener("click", buildSummarySetup);
    }

    if (openSummaryModalBtn) {
      openSummaryModalBtn.addEventListener("click", openSummaryModal);
    }

    if (closeSummaryModalBtn) {
      closeSummaryModalBtn.addEventListener("click", closeSummaryModal);
    }

    if (saveSummaryModalBtn) {
      saveSummaryModalBtn.addEventListener("click", closeSummaryModal);
    }

    if (summaryModal) {
      summaryModal.addEventListener("click", function (event) {
        if (event.target === summaryModal) {
          closeSummaryModal();
        }
      });
    }
  }

  /* ---- Optional feature: Listout extras ---- */
  function initListoutEvents() {
    if (toggleVersionExtraBtn && versionExtraBox) {
      toggleVersionExtraBtn.addEventListener("click", function () {
        togglePlusSection(
          toggleVersionExtraBtn,
          versionExtraBox,
          "+ Add VERSION Extra Rows",
          "− Hide VERSION Extra Rows"
        );
      });
    }

    if (toggleModeExtraBtn && modeExtraBox) {
      toggleModeExtraBtn.addEventListener("click", function () {
        togglePlusSection(
          toggleModeExtraBtn,
          modeExtraBox,
          "+ Add MODE Extra Rows",
          "− Hide MODE Extra Rows"
        );
      });
    }

    if (toggleDateSetupBtn && dateSetupBox) {
      toggleDateSetupBtn.addEventListener("click", function () {
        togglePlusSection(
          toggleDateSetupBtn,
          dateSetupBox,
          "+ Add DATE Range",
          "− Hide DATE Range"
        );
      });
    }
  }

  /* ---- Optional feature: Array Sample Setup modal ---- */
  function initArraySampleEvents() {
    if (buildArraySampleBtn) {
      buildArraySampleBtn.addEventListener("click", buildArraySampleSetup);
    }

    if (closeArraySampleModalBtn && arraySampleModal) {
      closeArraySampleModalBtn.addEventListener("click", function () {
        arraySampleModal.classList.add("hidden");
      });
    }

    if (saveArraySampleModalBtn && arraySampleModal) {
      saveArraySampleModalBtn.addEventListener(
        "click",
        function () {
          const selections =
            getArraySampleSelections();

          const questionCodes =
            expandQuestionCodes(
              questionCodeInput.value.trim()
            );

          if (
            selections.length !==
            questionCodes.length
          ) {
            alert(
              "Array Sample Setup is incomplete. Please build the setup again."
            );
            return;
          }

          pendingArraySampleSelections =
            selections;

          arraySampleModal.classList.add(
            "hidden"
          );
        }
      );
    }

    if (arraySampleModal) {
      arraySampleModal.addEventListener("click", function (event) {
        if (event.target === arraySampleModal) {
          arraySampleModal.classList.add("hidden");
        }
      });
    }
  }

  /*
    Single initialization entry point.

    Order:
    1. cache DOM elements
    2. build the syntax-highlight backdrop (the one highlighting
      system) so it's ready before the first render
    3. initialize default UI state
    4. initialize Sortable
    5. attach event listeners (core + every optional feature,
      each independently guarded so one missing/renamed element
      can never break another feature or the core builder)
    6. load session (which also renders the input list and
      generates/restores Output)
  */
  function init() {
    cacheDomElements();
    ensureHighlightBackdrop();
    initDefaultUIState();
    initSortable();

    attachCoreEventListeners();
    initFindReplace();
    initSplitRowEvents();
    initRankingEvents();
    initSummaryEvents();
    initListoutEvents();
    initArraySampleEvents();
    initRegionMapping();
    initF4Events();
    initHelpTooltips();

    loadSession();
    renderF4FileStatus();
    renderF4Validation();
    toggleProjectModeUI();
  }

  document.addEventListener("DOMContentLoaded", init);