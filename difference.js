/* =====================================================
   NILAI TITIK
===================================================== */

function f0(fungsi, x) {

    return hitungFungsi(
        fungsi,
        x
    );

}

function fp1(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x + h
    );

}

function fp2(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x + 2 * h
    );

}

function fp3(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x + 3 * h
    );

}

function fp4(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x + 4 * h
    );

}


function fm1(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x - h
    );

}

function fm2(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x - 2 * h
    );

}

function fm3(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x - 3 * h
    );

}

function fm4(fungsi, x, h) {

    return hitungFungsi(
        fungsi,
        x - 4 * h
    );

}   

/* =====================================================
   FORWARD DIFFERENCE
===================================================== */

function forwardDifference(
    fungsi,
    x,
    h,
    derivative,
    order
){

    const d = Number(derivative);
    const o = Number(order);

    const f0v = f0(fungsi,x);

    const fm1v = fm1(fungsi,x,h);
    const fm2v = fm2(fungsi,x,h);

    const f1v = fp1(fungsi,x,h);
    const f2v = fp2(fungsi,x,h);
    const f3v = fp3(fungsi,x,h);
    const f4v = fp4(fungsi,x,h);

    let hasil = 0;
    let rumus = "";

    /* =====================================
       TURUNAN PERTAMA
    ===================================== */

    if(d === 1){

        if(o === 1){

            hasil =
            (f1v - f0v)
            / h;

            rumus =
            "f'(x)=(f1-f0)/h";

        }
        else{

            hasil =
            (-3*f0v + 4*f1v - f2v)
            /(2*h);

            rumus =
            "f'(x)=(-3f0+4f1-f2)/(2h)";

        }

    }

    /* =====================================
       TURUNAN KEDUA
    ===================================== */

    else if(d === 2){

        if(o === 1){

            hasil =
            (
                f2v
                - 2*f1v
                + f0v
            )
            /(h*h);

            rumus =
            "f''(x)=(f2-2f1+f0)/h²";

        }

        else if(o === 2){

            hasil =
            (
                2*f0v
                -5*f1v
                +4*f2v
                -f3v
            )
            /(h*h);

            rumus =
            "f''(x)=(2f0-5f1+4f2-f3)/h²";

        }

    }

    /* =====================================
       TURUNAN KETIGA
    ===================================== */

    else if(d === 3){

        hasil =
        (
            -5*f0v
            +18*f1v
            -24*f2v
            +14*f3v
            -3*f4v
        )
        /(2*Math.pow(h,3));

        rumus =
        "f'''(x)=(-5f0+18f1-24f2+14f3-3f4)/(2h³)";

    }

    /* =====================================
       TURUNAN KEEMPAT
    ===================================== */

    else if(d === 4){

        hasil =
        (
            3*f0v
            -14*f1v
            +26*f2v
            -24*f3v
            +11*f4v
        )
        /Math.pow(h,4);

        rumus =
        "f''''(x)=(3f0-14f1+26f2-24f3+11f4)/h⁴";

    }

    const fdd =
    (
        f1v
        -2*f0v
        +fm1v
    )
    /(h*h);

    const fddd =
    (
        f2v
        -2*f1v
        +2*fm1v
        -fm2v
    )
    /(2*Math.pow(h,3));

    return {

        hasil,
        rumus,

        derivative : d,
        order : o,

        fdd,
        fddd,

        fm2 : fm2v,
        fm1 : fm1v,

        f0 : f0v,
        f1 : f1v,
        f2 : f2v,
        f3 : f3v,
        f4 : f4v

    };

}
/* =====================================================
   BACKWARD DIFFERENCE
===================================================== */

function backwardDifference(
    fungsi,
    x,
    h,
    derivative,
    order
){

    const d = Number(derivative);
    const o = Number(order);

    const f0v = f0(fungsi,x);

    const fm1v = fm1(fungsi,x,h);
    const fm2v = fm2(fungsi,x,h);
    const fm3v = fm3(fungsi,x,h);
    const fm4v = fm4(fungsi,x,h);

    let hasil = 0;
    let rumus = "";

    /* =====================================
       TURUNAN PERTAMA
    ===================================== */

    if(d === 1){

        if(o === 1){

            hasil =
            (f0v - fm1v)
            / h;

            rumus =
            "f'(x)=(f0-f-1)/h";

        }

        else{

            hasil =
            (
                3*f0v
                -4*fm1v
                +fm2v
            )
            /(2*h);

            rumus =
            "f'(x)=(3f0-4f-1+f-2)/(2h)";

        }

    }

    /* =====================================
       TURUNAN KEDUA
    ===================================== */

    else if(d === 2){

        if(o === 1){

            hasil =
            (
                f0v
                -2*fm1v
                +fm2v
            )
            /(h*h);

            rumus =
            "f''(x)=(f0-2f-1+f-2)/h²";

        }

        else if(o === 2){

            hasil =
            (
                2*f0v
                -5*fm1v
                +4*fm2v
                -fm3v
            )
            /(h*h);

            rumus =
            "f''(x)=(2f0-5f-1+4f-2-f-3)/h²";

        }

    }

    /* =====================================
       TURUNAN KETIGA
    ===================================== */

    else if(d === 3){

        hasil =
        (
            5*f0v
            -18*fm1v
            +24*fm2v
            -14*fm3v
            +3*fm4v
        )
        /(2*Math.pow(h,3));

        rumus =
        "f'''(x)=(5f0-18f-1+24f-2-14f-3+3f-4)/(2h³)";

    }

    /* =====================================
       TURUNAN KEEMPAT
    ===================================== */

    else if(d === 4){

        hasil =
        (
            3*f0v
            -14*fm1v
            +26*fm2v
            -24*fm3v
            +11*fm4v
        )
        /Math.pow(h,4);

        rumus =
        "f''''(x)=(3f0-14f-1+26f-2-24f-3+11f-4)/h⁴";

    }

    /* =====================================
       DATA TABEL
    ===================================== */

    const fdd =
    (
        f0v
        -2*fm1v
        +fm2v
    )
    /(h*h);

    const fddd =
    (
        f0v
        -3*fm1v
        +3*fm2v
        -fm3v
    )
    /Math.pow(h,3);

    return {

        hasil,
        rumus,

        derivative : d,
        order : o,

        fdd,
        fddd,

        fm4 : fm4v,
        fm3 : fm3v,
        fm2 : fm2v,
        fm1 : fm1v,

        f0 : f0v

    };

}
/* =====================================================
   CENTRAL DIFFERENCE
===================================================== */

function centralDifference(
    fungsi,
    x,
    h,
    derivative,
    order
){

    const d = Number(derivative);
    const o = Number(order);

    const fm2v = fm2(fungsi,x,h);
    const fm1v = fm1(fungsi,x,h);

    const f0v = f0(fungsi,x);

    const f1v = fp1(fungsi,x,h);
    const f2v = fp2(fungsi,x,h);

    const f3v = fp3(fungsi,x,h);
    const f4v = fp4(fungsi,x,h);

    let hasil = 0;
    let rumus = "";

    /* =====================================
       TURUNAN PERTAMA
    ===================================== */

    if(d === 1){

        if(o === 2){

            hasil =
            (
                f1v - fm1v
            )
            /(2*h);

            rumus =
            "f'(x)=(f1-f-1)/(2h)";

        }

        else if(o === 4){

            hasil =
            (
                -f2v
                +8*f1v
                -8*fm1v
                +fm2v
            )
            /(12*h);

            rumus =
            "f'(x)=(-f2+8f1-8f-1+f-2)/(12h)";

        }

    }

    /* =====================================
       TURUNAN KEDUA
    ===================================== */

    else if(d === 2){

        if(o === 2){

            hasil =
            (
                f1v
                -2*f0v
                +fm1v
            )
            /(h*h);

            rumus =
            "f''(x)=(f1-2f0+f-1)/h²";

        }

        else if(o === 4){

            hasil =
            (
                -f2v
                +16*f1v
                -30*f0v
                +16*fm1v
                -fm2v
            )
            /(12*h*h);

            rumus =
            "f''(x)=(-f2+16f1-30f0+16f-1-f-2)/(12h²)";

        }

    }

    /* =====================================
       TURUNAN KETIGA
    ===================================== */

    else if(d === 3){

        hasil =
        (
            f2v
            -2*f1v
            +2*fm1v
            -fm2v
        )
        /(2*Math.pow(h,3));

        rumus =
        "f'''(x)=(f2-2f1+2f-1-f-2)/(2h³)";

    }

    /* =====================================
       TURUNAN KEEMPAT
    ===================================== */

    else if(d === 4){

        hasil =
        (
            f2v
            -4*f1v
            +6*f0v
            -4*fm1v
            +fm2v
        )
        /Math.pow(h,4);

        rumus =
        "f''''(x)=(f2-4f1+6f0-4f-1+f-2)/h⁴";

    }

    const fdd =
    (
        f1v
        -2*f0v
        +fm1v
    )
    /(h*h);

    const fddd =
    (
        f2v
        -2*f1v
        +2*fm1v
        -fm2v
    )
    /(2*Math.pow(h,3));

    return {

        hasil,
        rumus,

        derivative : d,
        order : o,

        fdd,
        fddd,

        fm2 : fm2v,
        fm1 : fm1v,

        f0 : f0v,

        f1 : f1v,
        f2 : f2v,
        f3 : f3v,
        f4 : f4v

    };

}   

/* =====================================================
   HIGH ACCURACY DIFFERENCE
===================================================== */

function highAccuracyDifference(
    fungsi,
    x,
    h,
    orde
){

    const fm2v = fm2(fungsi,x,h);
    const fm1v = fm1(fungsi,x,h);

    const f0v  = f0(fungsi,x);

    const f1v  = fp1(fungsi,x,h);
    const f2v  = fp2(fungsi,x,h);

    let hasil = 0;
    let rumus = "";

    switch(Number(orde))
    {

        case 1:

            hasil =
            (
                -f2v
                +
                8*f1v
                -
                8*fm1v
                +
                fm2v
            )
            /(12*h);

            rumus =
            "f'(x)=(-f2+8f1-8f-1+f-2)/(12h)";

        break;

        case 2:

            hasil =
            (
                -f2v
                +
                16*f1v
                -
                30*f0v
                +
                16*fm1v
                -
                fm2v
            )
            /(12*h*h);

            rumus =
            "f''(x)=(-f2+16f1-30f0+16f-1-f-2)/(12h²)";

        break;

        case 3:

            hasil =
            (
                -f2v
                +
                2*f1v
                -
                2*fm1v
                +
                fm2v
            )
            /
            (2*Math.pow(h,3));

            rumus =
            "f'''(x)=(-f2+2f1-2f-1+f-2)/(2h³)";

        break;

        case 4:

            hasil =
            (
                f2v
                -
                4*f1v
                +
                6*f0v
                -
                4*fm1v
                +
                fm2v
            )
            /
            Math.pow(h,4);

            rumus =
            "f''''(x)=(f2-4f1+6f0-4f-1+f-2)/h⁴";

        break;

    }

    return {

        hasil,
        rumus,

        fm2 : fm2v,
        fm1 : fm1v,

        f0 : f0v,

        f1 : f1v,
        f2 : f2v

    };

}

/* =====================================================
   RICHARDSON DIFFERENCE
===================================================== */

function richardsonDifference(
    fungsi,
    x,
    h,
    orde
){

    const D1 =
    highAccuracyDifference(
        fungsi,
        x,
        h,
        orde
    );

    const D2 =
    highAccuracyDifference(
        fungsi,
        x,
        h/2,
        orde
    );

    const p = 4;

    const hasil =

    D2.hasil +

    (
        D2.hasil -
        D1.hasil
    )

    /
    (
        Math.pow(2,p)-1
    );

    return {

        ...D2,

        hasil,

        rumus :

        D2.rumus +

        "\n\nRichardson Extrapolation"

    };

}
/* =====================================================
   PILIH METODE
===================================================== */

function hitungDifferenceMethod(
    fungsi,
    x,
    h,
    derivative,
    order
){

    const d =
    Number(derivative);

    const o =
    Number(order);

    if(
        isNaN(d) ||
        d < 1 ||
        d > 4
    ){

        alert(
            "Turunan harus antara 1 sampai 4"
        );

        return null;

    }

    if(
        isNaN(o) ||
        o < 1 ||
        o > 4
    ){

        alert(
            "Orde hampiran harus antara 1 sampai 4"
        );

        return null;

    }

    /* Richardson */

    if(CONFIG.enableRichardson){

        return richardsonDifference(
            fungsi,
            x,
            h,
            d,
            o
        );

    }

    /* High Accuracy */

    if(CONFIG.highAccuracy){

        return highAccuracyDifference(
            fungsi,
            x,
            h,
            d,
            o
        );

    }

    switch(selectedMethod){

        case "forward":

            return forwardDifference(
                fungsi,
                x,
                h,
                d,
                o
            );

        case "backward":

            return backwardDifference(
                fungsi,
                x,
                h,
                d,
                o
            );

        case "central":

            return centralDifference(
                fungsi,
                x,
                h,
                d,
                o
            );

        default:

            return centralDifference(
                fungsi,
                x,
                h,
                d,
                o
            );

    }

}
