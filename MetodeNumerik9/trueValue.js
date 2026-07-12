/* =====================================================
   NILAI SEJATI
===================================================== */

function hitungNilaiSejati(
    fungsi,
    x,
    orde
){

    const o =
    Number(orde);

    if(
        isNaN(o)
    ){
        return NaN;
    }

    if(
        o < 1
    ){
        return NaN;
    }

    if(

        CONFIG.maxDerivativeOrder &&

        o >
        CONFIG.maxDerivativeOrder

    ){
        return NaN;
    }

    /* =========================
       STEP ADAPTIF
    ========================= */

    let h =

    CONFIG.trueValueStep ||

    0.0001;

    if(
        o >= 3
    ){

        h = 0.001;

    }

    if(
        o >= 4
    ){

        h = 0.005;

    }

    const hasil =

    turunanNumerikBerulang(

        fungsi,

        x,

        o,

        h

    );

    if(

        !isFinite(
            hasil
        )

    ){

        return NaN;

    }

    return hasil;

}

/* =====================================================
   TURUNAN NUMERIK BERULANG
===================================================== */

function turunanNumerikBerulang(
    fungsi,
    x,
    orde,
    h = 0.00001
){

    if(
        orde === 1
    ){

        return (

            hitungFungsi(
                fungsi,
                x+h
            )

            -

            hitungFungsi(
                fungsi,
                x-h
            )

        )

        /

        (2*h);

    }

    return (

        turunanNumerikBerulang(
            fungsi,
            x+h,
            orde-1,
            h
        )

        -

        turunanNumerikBerulang(
            fungsi,
            x-h,
            orde-1,
            h
        )

    )

    /

    (2*h);

}

/* =====================================================
   NUMERICAL DERIVATIVE
   CENTRAL DIFFERENCE
===================================================== */

function numericalDerivative(
    fungsi,
    x,
    h = 1e-6
){

    return (

        hitungFungsi(
            fungsi,
            x+h
        )

        -

        hitungFungsi(
            fungsi,
            x-h
        )

    )

    /

    (2*h);

}