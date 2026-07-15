let sortable = null;

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

const STORAGE_KEY =
  "crosstab_builder_session_v1";

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
const sharedDSSetupBox = document.getElementById("sharedDSSetupBox");

const useRankBox =
  document.getElementById("useRankBox");

const useRankCheckbox =
  document.getElementById("useRank");

  const rankRLBox =
  document.getElementById("rankRLBox");

const rankRLCodesInput =
  document.getElementById("rankRLCodes");

const sharedMeanSetupBox =
  document.getElementById("sharedMeanSetupBox");

const useMeanCheckbox =
  document.getElementById("useMean");

const meanSetupBox =
  document.getElementById("meanSetupBox");

const meanCodeRangeInput =
  document.getElementById("meanCodeRange");

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


    console.log("rankRLCodes =", rankRLCodes);
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
    cleanQuestionText
  );
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
  rankRLCodes = []
) {
  

  if (!answerOptionsText) {
    return [];
  }

  const lines = String(answerOptionsText || "")
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "");

    const rlCodes = new Set(
  parseRankRLCodes(
    rankRLCodes || ""
  ) || []
);

  return lines.map(line => {
    const parsed =
      parseAnswerOptionLine(line);

    if (!parsed) {
      return (
        " *** ERROR: INVALID ANSWER OPTION - " +
        line +
        " ***"
      );
    }

    const code = parsed.code;
    const label = parsed.label;

    const shouldIndent =
      isAnswerCodeInsideNetGroups(
        code,
        netGroups
      );

    /*
      Rule đúng:
      Chỉ indent answer rows nếu code của nó
      nằm trong Total / Net Group.
    */
    const indent = shouldIndent
      ? "   "
      : " ";

        const suffix =
  rlCodes.has(
    Number(code)
  )
    ? "RL"
    : "";

    console.log({
  code,
  suffix,
  hasRL: rlCodes.has(Number(code))
});

    return formatSyntaxRow(
  label,
  questionCode + " (" + code + ")",
  {
    indent,
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
  const rawQuestionCode = questionCodeInput.value.trim();
  const questionCodes = expandQuestionCodes(rawQuestionCode);
  const questionText =
  normalizeQuestionText(
    questionTextInput.value
  );

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
        useRank,
          rankRLCodes,
useMean,
meanCodeRange,
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
      useDS: useDSCheckbox.checked,
      
      useRank,
        rankRLCodes,
useMean,
meanCodeRange,

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
  baseType: baseTypeSelect.value,
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

  const subtitleLines = getSubtitleLines();

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

    useRank,
      rankRLCodes,
useMean,
meanCodeRange,

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
  saveSession();
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
  saveSession();
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
  saveSession();
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
  initSortable();
}

function generateOutput() {
  const blocks = [];

  tables.forEach((table, arrayIndex) => {
    const tableIndex = arrayIndex + 1;
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

    console.log("table.rankRLCodes =", table.rankRLCodes);
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

  safeSetChecked(
  useMeanCheckbox,
  false
);

safeSetChecked(
  useRankCheckbox,
  false
);

toggleQuestionTypeUI();

rankRLCodesInput.value = "";

rankRLBox.classList.add("hidden");

safeSetValue(
  meanCodeRangeInput,
  ""
);

safeAddHidden(
  meanSetupBox
);

toggleMeanSetupUI();

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
  saveSession();
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

  const subtitleLines = getSubtitleLines();

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

         const suffix =
  rlCodes.has(
    Number(code)
  )
    ? "RL"
    : "";

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
const summarySetupPanel = document.getElementById("summarySetupPanel");

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

subtitleOnlyInput.addEventListener(
  "blur",
  function () {
    this.value = getSubtitleLines().join("\n");
  }
);

useMeanCheckbox.addEventListener(
  "change",
  toggleMeanSetupUI
);

useRankCheckbox.addEventListener(
  "change",
  toggleRankRLBox
);

rankingSplitModal.addEventListener("click", function (event) {
  if (event.target === rankingSplitModal) {
    closeRankingSplitModal();
  }
});

useDSCheckbox.addEventListener(
  "change",
  function () {
    toggleUseDSBox();

    if (!useDSCheckbox.checked) {
      customDSBox.classList.add("hidden");
    }
  }
);

demographicAdditionalCodesInput.addEventListener(
  "input",
  function () {
    if (questionTypeSelect.value !== "demographic") {
      return;
    }

    customDSPositiveSelect.innerHTML = "";
    customDSNegativeSelect.innerHTML = "";
    customDSBox.classList.add("hidden");
  }
);

rowTypeSelect.addEventListener(
  "change",
  function () {
    toggleAnswerOptionsBox();

    customDSPositiveSelect.innerHTML = "";
    customDSNegativeSelect.innerHTML = "";
    customDSBox.classList.add("hidden");

    toggleUseDSBox();
  }
);

function setDefaultRowTypeByQuestionType() {
  const questionType =
    questionTypeSelect.value;

  /*
    Single Choice và Array mặc định dùng CUSTOM CODE.
  */
  if (
    questionType === "single_choice" ||
    questionType === "array"
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

questionTypeSelect.addEventListener(
  "change",
  function () {
    /*
      Ranking Table mặc định bật Rank.
      User vẫn có thể bỏ tick sau đó.
    */
    // if (
    //   questionTypeSelect.value ===
    //   "ranking_table"
    // ) {
    //   useRankCheckbox.checked = true;
    // }

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
  questionTypeSelect.value ===
    "array" ||
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
  questionTypeSelect.value === "single_choice" ||
  questionTypeSelect.value === "array"
) {
  rowTypeSelect.value = "custom_code";
}

toggleAnswerOptionsBox();
toggleUseDSBox();
toggleAskedBaseBox();
  }
);

useSTCheckbox.addEventListener("change", toggleSubtitleBox);

baseTypeSelect.addEventListener("change", function () {
  toggleAskedBaseBox();
});


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
toggleUseDSBox();
toggleQuestionTypeUI();

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

answerOptionsInput.addEventListener(
  "blur",
  function () {
    this.value = cleanAnswerOptionsText(
      this.value
    );
  }
);

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


/* ========================================
   HELP TOOLTIP
======================================== */

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

/*
  Cập nhật vị trí khi cuộn Input.
*/
const inputCard =
  document.querySelector(".input-card");

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

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Escape") {
      closeAllHelpTooltips();
    }
  }
);

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadSession();

  }
);

function saveSession() {
  try {
    const session = {
      version: 1,
      savedAt: new Date().toISOString(),
      tables,
      editingIndex
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );

  } catch (err) {
    console.error(err);
  }
}

function loadSession() {
  try {

    const raw =
      localStorage.getItem(STORAGE_KEY);

    if (!raw) return;

    const session =
      JSON.parse(raw);

    if (!session?.tables) return;

    tables =
      session.tables;

    editingIndex =
      session.editingIndex ?? null;

    renderInputList();

    /*
      Rebuild Output Syntax
      from Input List.
    */
    if (tables.length > 0) {
      generateOutput();
    }

  } catch (err) {
    console.error(err);
  }
}

generateBtn.addEventListener(
    "click",
    function () {

        generateOutput();

        saveSession();

    }
);

function initSortable() {

  const list =
    document.getElementById("inputList");

  if (!list) return;

  if (sortable) {
    sortable.destroy();
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

      saveSession();

    }

  });

}