
/* =====================================================
   GLOBAL CONFIG
===================================================== */

const CONFIG = {

    /* =========================================
       PRESISI OUTPUT
    ========================================= */

    minPrecision : 5,
    maxPrecision : 15,

    defaultPrecision : 10,


    /* =========================================
       TOLERANSI GALAT
    ========================================= */

    minToleranceDigit : 5,
    maxToleranceDigit : 15,

    defaultTolerance : 10,


    /* =========================================
       TURUNAN
    ========================================= */

    maxDerivativeOrder : 4,

    trueValueStep : 0.00001,


    /* =========================================
       DIFFERENCE METHOD
    ========================================= */

    highAccuracy : false,

    enableRichardson : false,

    richardsonLevel : 4,


    /* =========================================
       TAYLOR SERIES
    ========================================= */

    taylorOrder : 4,

    taylorStep : 0.00001,


    /* =========================================
       INTERPOLASI
    ========================================= */

    interpolationOrder : 4,


    /* =========================================
       TABEL HASIL
    ========================================= */

    showExcelTable : true,

    showComparisonTable : true,

    showFinalReport : true,

    showValueTable : true,


    /* =========================================
       FORMAT OUTPUT
    ========================================= */

    showAbsoluteError : true,

    showRelativeError : true,

    showPercentError : true,

    showToleranceStatus : true,


    /* =========================================
       UI
    ========================================= */

    autoSaveSetting : true,

    autoGenerateReport : true,

    autoGenerateComparison : true


};

function formatTolerance(){

    return getToleranceValue()
    .toFixed(
        getToleranceDigit()
    );

}
