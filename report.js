/* =====================================================
   LAPORAN FINAL
===================================================== */

function generateFinalReport(
    fungsi,
    data,
    hasil,
    sejati
){

    let laporan = "";

    laporan +=
    generateNilaiSejatiTemplate(
        fungsi,
        selectedDerivative,
        sejati
    );

    laporan +=
    generateDifferenceStep(
        data,
        hasil
    );

    if(!isNaN(sejati)){

        laporan +=
        langkahGalat(
            hasil,
            sejati
        );

    }

    return laporan;

}

/* =====================================================
   TEMPLATE NILAI SEJATI
===================================================== */

function generateNilaiSejatiTemplate(
    fungsi,
    orde,
    nilaiSejati
){

    return `

NILAI SEJATI

f(x) = ${fungsi}

Turunan = ${getTurunanLabel(orde)}

Nilai Sejati = ${
    isNaN(nilaiSejati)
    ?
    "Tidak tersedia"
    :
    formatNumber(nilaiSejati)
}

`;

}

/* =====================================================
   LANGKAH SELISIH
===================================================== */

function generateDifferenceStep(
    data,
    hasil
){

    const metodeInfo =
    CONFIG.enableRichardson
    ?
    "Richardson Extrapolation"
    :
    CONFIG.highAccuracy
    ?
    "High Accuracy O(h⁴)"
    :
    selectedMethod.toUpperCase();

    const turunanInfo =
    getTurunanLabel(
        selectedDerivative
    );

    return `

Metode  = ${metodeInfo}
Turunan = ${turunanInfo}

Nilai Titik :
f-2 = ${data.fm2 !== undefined ? formatNumber(data.fm2) : "-"} 
f-1 = ${data.fm1 !== undefined ? formatNumber(data.fm1) : "-"}
f0  = ${formatNumber(data.f0)} 
f1  = ${data.f1 !== undefined ? formatNumber(data.f1) : "-"}
f2  = ${data.f2 !== undefined ? formatNumber(data.f2) : "-"}

Rumus : ${data.rumus}

Hasil Hampiran = ${formatNumber(hasil)}

`;

}

/* =====================================================
   RINGKASAN HASIL
===================================================== */

function generateSummary(
    hasil,
    sejati
){

    if(isNaN(sejati)){

        return {

            hasil :
            formatNumber(hasil),

            sejati :
            "-",

            galatAbs :
            "-",

            galatRel :
            "-",

            galatPct :
            "-"

        };

    }

    return {

        hasil :
        formatNumber(
            hasil
        ),

        sejati :
        formatNumber(
            sejati
        ),

        galatAbs :
        formatNumber(
            galatAbsolut(
                sejati,
                hasil
            )
        ),

        galatRel :
        formatNumber(
            galatRelatif(
                sejati,
                hasil
            )
        ),

        galatPct :
        formatNumber(
            galatPersen(
                sejati,
                hasil
            )
        )

    };

}
