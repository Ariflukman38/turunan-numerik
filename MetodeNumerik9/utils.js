/* =====================================================
   LABEL TURUNAN
===================================================== */

function getTurunanLabel(orde){

    switch(Number(orde)){

        case 1:
            return "f'(x)";

        case 2:
            return "f''(x)";

        case 3:
            return "f'''(x)";

        case 4:
            return "f''''(x)";

        default:
            return "-";

    }

}

/* =====================================================
   PRESISI ANGKA
===================================================== */

function getPrecision(){

    const el =
    document.getElementById(
        "precisionDigit"
    );

    if(!el){

        return CONFIG.defaultPrecision;

    }

    let digit =
    parseInt(el.value);

    if(isNaN(digit)){

        digit =
        CONFIG.defaultPrecision;

    }

    digit =
    Math.max(
        CONFIG.minPrecision,
        digit
    );

    digit =
    Math.min(
        CONFIG.maxPrecision,
        digit
    );

    return digit;

}

/* =====================================================
   FORMAT ANGKA
===================================================== */

function formatNumber(value){

    if(

        value === undefined ||

        value === null ||

        isNaN(value)

    ){

        return "-";

    }

    return Number(value)
    .toFixed(
        getPrecision()
    );

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function simpanPengaturan(){

    const precision =

    document
    .getElementById(
        "precisionDigit"
    )?.value

    ||

    CONFIG.defaultPrecision;

    localStorage.setItem(

        "precisionDigit",

        precision

    );

}

function loadPengaturan(){

    const precision =

    localStorage.getItem(
        "precisionDigit"
    );

    if(

        precision &&

        document.getElementById(
            "precisionDigit"
        )

    ){

        document.getElementById(
            "precisionDigit"
        ).value = precision;

    }

}