/* =====================================================
   CARI INDEX
===================================================== */

function cariIndexX(
    dataX,
    targetX
){

    return dataX.findIndex(
        x =>
        Math.abs(x-targetX)
        < 1e-12
    );

}

/* =====================================================
   TABLE BASIC
===================================================== */

function tableBasicDifference(
    xData,
    fxData,
    idx,
    h,
    metode,
    derivative,
    order
){

    const d =
    Number(derivative);

    /* =====================
       TURUNAN PERTAMA
    ===================== */

    if(d===1){

        switch(metode){

            case "forward":

                return (
                    fxData[idx+1]
                    -
                    fxData[idx]
                )/h;

            case "backward":

                return (
                    fxData[idx]
                    -
                    fxData[idx-1]
                )/h;

            default:

                return (
                    fxData[idx+1]
                    -
                    fxData[idx-1]
                )/(2*h);

        }

    }

    /* =====================
       TURUNAN KEDUA
    ===================== */

    if(d===2){

        switch(metode){

            case "forward":

                return (
                    fxData[idx]
                    -
                    2*fxData[idx+1]
                    +
                    fxData[idx+2]
                )
                /(h*h);

            case "backward":

                return (
                    fxData[idx]
                    -
                    2*fxData[idx-1]
                    +
                    fxData[idx-2]
                )
                /(h*h);

            default:

                return (
                    fxData[idx+1]
                    -
                    2*fxData[idx]
                    +
                    fxData[idx-1]
                )
                /(h*h);

        }

    }

    /* =====================
       TURUNAN KETIGA
    ===================== */

    if(d===3){

        switch(metode){

            case "forward":

                return (
                    -fxData[idx]
                    +
                    3*fxData[idx+1]
                    -
                    3*fxData[idx+2]
                    +
                    fxData[idx+3]
                )
                /Math.pow(h,3);

            case "backward":

                return (
                    fxData[idx]
                    -
                    3*fxData[idx-1]
                    +
                    3*fxData[idx-2]
                    -
                    fxData[idx-3]
                )
                /Math.pow(h,3);

            default:

                return (
                    fxData[idx+2]
                    -
                    2*fxData[idx+1]
                    +
                    2*fxData[idx-1]
                    -
                    fxData[idx-2]
                )
                /(2*Math.pow(h,3));

        }

    }

    return NaN;

}

/* =====================================================
   HITUNG TURUNAN PER BARIS TABEL
===================================================== */

function hitungTurunanBaris(
    dataX,
    dataFX,
    idx,
    h,
    turunan
){

    const n =
    dataFX.length;

    /* =========================================
       VALIDASI BATAS DATA
    ========================================= */

    switch(selectedMethod){

        /* ---------- FORWARD ---------- */

        case "forward":

            if(
                (turunan===1 && idx>n-2) ||
                (turunan===2 && idx>n-3) ||
                (turunan===3 && idx>n-4) ||
                (turunan===4 && idx>n-5)
            ){

                return null;

            }

        break;

        /* ---------- BACKWARD ---------- */

        case "backward":

            if(
                (turunan===1 && idx<1) ||
                (turunan===2 && idx<2) ||
                (turunan===3 && idx<3) ||
                (turunan===4 && idx<4)
            ){

                return null;

            }

        break;

        /* ---------- CENTRAL ---------- */

        default:

            if(
                (turunan===1 && (idx<1 || idx>n-2)) ||
                (turunan===2 && (idx<1 || idx>n-2)) ||
                (turunan===3 && (idx<2 || idx>n-3)) ||
                (turunan===4 && (idx<2 || idx>n-3))
            ){

                return null;

            }

    }

    /* =========================================
       HITUNG TURUNAN
    ========================================= */

    try{

        const hasil =
        tableBasicDifference(

            dataX,
            dataFX,

            idx,

            h,

            selectedMethod,

            turunan,

            selectedOrder

        );

        /* hasil tidak valid */

        if(

            hasil===null ||

            hasil===undefined ||

            isNaN(hasil) ||

            !isFinite(hasil)

        ){

            return null;

        }

        return hasil;

    }

    catch(error){

        console.error(
            "hitungTurunanBaris:",
            error
        );

        return null;

    }

}

/* =====================================================
   HIGH ACCURACY DIFFERENCE (O(h⁴))
===================================================== */

function tableHighDifference(
    fx,
    idx,
    h,
    derivative
){

    const d =
    Number(derivative);

    /* =========================================
       CENTRAL DIFFERENCE
    ========================================= */

    if(selectedMethod === "central"){

        switch(d){

            /* ---------- f'(x) ---------- */

            case 1:

                return (

                    -fx[idx+2]
                    +8*fx[idx+1]
                    -8*fx[idx-1]
                    +fx[idx-2]

                )/(12*h);

            /* ---------- f''(x) ---------- */

            case 2:

                return (

                    -fx[idx+2]
                    +16*fx[idx+1]
                    -30*fx[idx]
                    +16*fx[idx-1]
                    -fx[idx-2]

                )/(12*h*h);

            /* ---------- f'''(x) ---------- */

            case 3:

                return (

                    -fx[idx+2]
                    +2*fx[idx+1]
                    -2*fx[idx-1]
                    +fx[idx-2]

                )/(2*Math.pow(h,3));

            /* ---------- f''''(x) ---------- */

            case 4:

                return (

                    fx[idx+2]
                    -4*fx[idx+1]
                    +6*fx[idx]
                    -4*fx[idx-1]
                    +fx[idx-2]

                )/Math.pow(h,4);

        }

    }

    /* =========================================
       FORWARD DIFFERENCE
    ========================================= */

    if(selectedMethod === "forward"){

        switch(d){

            case 1:

                return (

                    -25*fx[idx]
                    +48*fx[idx+1]
                    -36*fx[idx+2]
                    +16*fx[idx+3]
                    -3*fx[idx+4]

                )/(12*h);

            case 2:

                return (

                    35*fx[idx]
                    -104*fx[idx+1]
                    +114*fx[idx+2]
                    -56*fx[idx+3]
                    +11*fx[idx+4]

                )/(12*h*h);

            default:

                return NaN;

        }

    }

    /* =========================================
       BACKWARD DIFFERENCE
    ========================================= */

    if(selectedMethod === "backward"){

        switch(d){

            case 1:

                return (

                    25*fx[idx]
                    -48*fx[idx-1]
                    +36*fx[idx-2]
                    -16*fx[idx-3]
                    +3*fx[idx-4]

                )/(12*h);

            case 2:

                return (

                    35*fx[idx]
                    -104*fx[idx-1]
                    +114*fx[idx-2]
                    -56*fx[idx-3]
                    +11*fx[idx-4]

                )/(12*h*h);

            default:

                return NaN;

        }

    }

    return NaN;

}

/* =====================================================
   INTERPOLASI LINEAR
===================================================== */

function interpolasiLinear(
    x1,
    y1,
    x2,
    y2,
    x
){

    return y1 +

    (
        (y2-y1)
        /
        (x2-x1)
    )

    *

    (x-x1);

}

function getTableWarning(
    idx,
    totalData
){

    if(selectedMethod === "forward"){

        if(
            selectedDerivative == 3 &&
            idx > totalData - 4
        ){

            return `
            !!! Turunan ketiga Forward Difference
            membutuhkan tiga titik setelah titik target.
            Data tidak mencukupi.
            `;
        }

    }

    if(selectedMethod === "backward"){

        if(
            selectedDerivative == 3 &&
            idx < 3
        ){

            return `
            !!! Turunan ketiga Backward Difference
            membutuhkan tiga titik sebelum titik target.
            Data tidak mencukupi.
            `;
        }

    }

    if(selectedMethod === "central"){

        if(
            idx < 2 ||
            idx > totalData - 3
        ){

            return `
            !!! Central Difference membutuhkan
            dua titik di kiri dan dua titik di kanan
            titik target.
            `;
        }

    }

    return "";
}
