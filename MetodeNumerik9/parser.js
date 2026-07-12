/* =====================================================
   PARSER FUNGSI
===================================================== */

function ubahFungsi(expr){

    let f = String(expr);

    /* Hapus spasi */

    f = f.replace(
        /\s+/g,
        ""
    );

    /* Pangkat */

    f = f.replace(
        /\^/g,
        "**"
    );

    /* Invers Trigonometri */

    f = f.replace(
        /asin/g,
        "Math.asin"
    );

    f = f.replace(
        /acos/g,
        "Math.acos"
    );

    f = f.replace(
        /atan/g,
        "Math.atan"
    );

    /* Trigonometri */

    f = f.replace(
        /sin/g,
        "Math.sin"
    );

    f = f.replace(
        /cos/g,
        "Math.cos"
    );

    f = f.replace(
        /tan/g,
        "Math.tan"
    );

    /* Logaritma */

    f = f.replace(
        /ln/g,
        "Math.log"
    );

    f = f.replace(
        /log/g,
        "Math.log10"
    );

    /* Akar */

    f = f.replace(
        /sqrt/g,
        "Math.sqrt"
    );

    /* Konstanta */

    f = f.replace(
        /\bpi\b/g,
        "Math.PI"
    );

    f = f.replace(
        /\be\b/g,
        "Math.E"
    );

    /* e^(...) */

    f = f.replace(
        /e\^\((.*?)\)/g,
        "Math.exp($1)"
    );

    f = f.replace(
        /e\^([a-zA-Z0-9\.]+)/g,
        "Math.exp($1)"
    );

    /* Perkalian implisit */

    f = f.replace(
        /(\d)(x)/g,
        "$1*$2"
    );

    f = f.replace(
        /(\))(x)/g,
        "$1*$2"
    );

    f = f.replace(
        /(x)(\()/g,
        "$1*$2"
    );

    f = f.replace(
        /(\d)(\()/g,
        "$1*$2"
    );

    f = f.replace(
        /(\))(\d)/g,
        "$1*$2"
    );

    return f;

}

/* =====================================================
   EVALUASI FUNGSI
===================================================== */

function hitungFungsi(
    fungsi,
    x
){

    try{

        let expr =
        ubahFungsi(
            fungsi
        );

        expr =
        expr.replace(
            /\bx\b/g,
            "(" + x + ")"
        );

        return eval(expr);

    }

    catch(error){

        console.error(
            error
        );

        return NaN;

    }

}

/* =====================================================
   PARSE ARRAY
===================================================== */

function parseArray(text){

    return text

    .split(",")

    .map(item =>

        parseFloat(
            item.trim()
        )

    )

    .filter(item =>

        !isNaN(item)

    );

}