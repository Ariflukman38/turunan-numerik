/* =====================================================
   TOLERANSI GALAT
===================================================== */

function getToleranceDigit(){

    const el =
    document.getElementById(
        "errorDigit"
    );

    if(!el){

        return CONFIG.defaultTolerance;

    }

    let digit =
    parseInt(el.value);

    if(isNaN(digit)){

        digit =
        CONFIG.defaultTolerance;

    }

    digit =
    Math.max(
        5,
        digit
    );

    digit =
    Math.min(
        50,
        digit
    );

    return digit;

}

function getToleranceValue(){

    const digit =
    getToleranceDigit();

    return Math.pow(
        10,
        -digit
    );

}

/* =====================================================
   GALAT
===================================================== */

function galatAbsolut(
    nilaiSejati,
    nilaiHampiran
){

    return Math.abs(
        nilaiSejati -
        nilaiHampiran
    );

}

function galatRelatif(
    nilaiSejati,
    nilaiHampiran
){

    if(
        nilaiSejati === 0
    ){

        return 0;

    }

    return Math.abs(

        (
            nilaiSejati -
            nilaiHampiran
        )

        /

        nilaiSejati

    );

}

function galatPersen(
    nilaiSejati,
    nilaiHampiran
){

    return (

        galatRelatif(
            nilaiSejati,
            nilaiHampiran
        )

        * 100

    );

}

/* =====================================================
   STATUS GALAT
===================================================== */

function statusGalat(galat){

    const toleransi =
    getToleranceValue();

    if(
        galat <= toleransi
    ){

        return "Memenuhi Toleransi";

    }

    return "Belum Memenuhi Toleransi";

}

/* =====================================================
   FORMAT TOLERANSI
===================================================== */

function formatTolerance(){

    return getToleranceValue()
    .toFixed(
        getToleranceDigit()
    );

}

/* =====================================================
   LANGKAH GALAT
===================================================== */

function langkahGalat(
    hasil,
    sejati
){

    if(
        isNaN(sejati)
    ){

        return `

PERHITUNGAN GALAT

Nilai sejati tidak tersedia.

`;

    }

    const abs =
    galatAbsolut(
        sejati,
        hasil
    );

    const rel =
    galatRelatif(
        sejati,
        hasil
    );

    const pct =
    galatPersen(
        sejati,
        hasil
    );

    return `

PERHITUNGAN GALAT

Galat Absolut

= |${formatNumber(sejati)} - ${formatNumber(hasil)}|

= ${formatNumber(abs)}

Galat Relatif

= ${formatNumber(rel)}

Galat Persen

= ${formatNumber(pct)} %

Toleransi

= ${formatTolerance()}

Status

= ${statusGalat(abs)}

`;

}