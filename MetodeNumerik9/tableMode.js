/* =====================================================
   TABEL MODE TABEL
===================================================== */

function tampilkanTabelMode(
    dataX,
    dataFX,
    idx,
    fp,
    fpp,
    fppp,
    dasar,
    tinggi,
    sejati
){

    const errorBox =
    document.getElementById(
        "errorStatus"
    );

    if(errorBox){

        errorBox.innerHTML = "";

    }

    const turunanLabel =
    getTurunanLabel(
        selectedDerivative
    );

    const ordeLabel =
    "Orde " +
    selectedOrder;

    const galatDasar =
    isNaN(sejati)
    ?
    galatTruncation(
        dasar,
        tinggi
    )
    :
    galatAbsolut(
        sejati,
        dasar
    );

    const galatTinggi =
    isNaN(sejati)
    ?
    0
    :
    galatAbsolut(
        sejati,
        tinggi
    );

    const h =
    Math.abs(
        dataX[1] -
        dataX[0]
    );

    /* =========================
       HASIL UTAMA
    ========================= */

    document
    .getElementById("hasil")
    .innerText =
    formatNumber(tinggi);

    /* =========================
       INFORMASI HASIL
    ========================= */

    document
    .getElementById("modeResult")
    .innerHTML =
    "Input Tabel";

    document
    .getElementById("pendekatanResult")
    .innerHTML =
    "Hampiran Selisih";

    document
    .getElementById("metodeResult")
    .innerHTML =
    selectedMethod.toUpperCase();

    document
    .getElementById("turunanResult")
    .innerHTML =
    turunanLabel;

    document
    .getElementById("xResult")
    .innerHTML =
    formatNumber(
        dataX[idx]
    );

    document
    .getElementById("hResult")
    .innerHTML =
    formatNumber(h);

    const warning = getTableWarning(
    idx,
    dataX.length
    );

    const warningBox =
    document.getElementById("errorStatus");

    if(warningBox){

        warningBox.innerHTML = warning
        ?
        `
        <div class="warning-note">

            ⚠ ${warning}

        </div>
        `
        :
        "";

    }

    /* =========================
       TABEL HASIL
    ========================= */

    let rows = "";
    lastTableData = [];

    for(
    let i = 0;
    i < dataX.length;
    i++
    ){

    const isTarget = i === idx;
    const fpRow = hitungTurunanBaris(
    dataX,
    dataFX,
    i,
    h,
    1
    );

    const fppRow =
    hitungTurunanBaris(
    dataX,
    dataFX,
    i,
    h,
    2
    );

    const fpppRow =
    hitungTurunanBaris(
    dataX,
    dataFX,
    i,
    h,
    3
    );

    lastTableData.push({

    x    : dataX[i],

    fx   : dataFX[i],

    fp   : fpRow,

    fpp  : fppRow,

    fppp : fpppRow,

    galat :
    i === idx
    ?
    galatTinggi
    :
    null

    });

   rows += `

<tr class="${isTarget ? "target-row" : ""}">

    <td>
        ${
        isTarget
        ?
        `<strong>${formatNumber(dataX[i])}</strong>`
        :
        formatNumber(dataX[i])
        }
    </td>

    <td>
        ${
        isTarget
        ?
        `<strong>${formatNumber(dataFX[i])}</strong>`
        :
        formatNumber(dataFX[i])
        }
    </td>

    <td>
        ${
        fpRow===null
        ?
        "-"
        :
        (
            isTarget
            ?
            `<strong>${formatNumber(fpRow)}</strong>`
            :
            formatNumber(fpRow)
        )
        }
    </td>

    <td>
        ${
        fppRow===null
        ?
        "-"
        :
        (
            isTarget
            ?
            `<strong>${formatNumber(fppRow)}</strong>`
            :
            formatNumber(fppRow)
        )
        }
    </td>

    <td>
        ${
        fpppRow===null
        ?
        "-"
        :
        (
            isTarget
            ?
            `<strong>${formatNumber(fpppRow)}</strong>`
            :
            formatNumber(fpppRow)
        )
        }
    </td>

    <td>
        ${
        isTarget && !isNaN(sejati)
        ?
        `<strong>${formatNumber(galatTinggi)}</strong>`
        :
        "-"
        }
    </td>

    <td>
        ${
        isTarget
        ?
        statusGalat(galatTinggi)
        :
        "-"
        }
    </td>

</tr>

`;
    }

    document
.getElementById("finalReport")
.innerHTML =

`
<div class="summary-box">

    <h3>
    Ringkasan Hasil
    </h3>

    <table class="summary-table">

        <tr>
            <td>x Target</td>
            <td>${formatNumber(dataX[idx])}</td>
        </tr>

        <tr>
            <td>f(x)</td>
            <td>${formatNumber(dataFX[idx])}</td>
        </tr>

        <tr>
            <td>Turunan</td>
            <td>${turunanLabel}</td>
        </tr>

        <tr>
            <td>Metode</td>
            <td>${selectedMethod.toUpperCase()}</td>
        </tr>

        <tr>
            <td>Orde</td>
            <td>${ordeLabel}</td>
        </tr>

        <tr>
            <td>Hasil</td>
            <td>${formatNumber(tinggi)}</td>
        </tr>

        <tr>
            <td>Galat</td>
            <td>${formatNumber(galatTinggi)}</td>
        </tr>

        <tr>
            <td>Status</td>
            <td>${statusGalat(galatTinggi)}</td>
        </tr>

    </table>

</div>
`;


    document
    .getElementById("tabelNilai")
    .innerHTML =

    `
    <div class="table-wrapper">

    <table class="hasil-table">

    <thead>

        <tr>

            <th>x</th>
            <th>f(x)</th>

            <th>f'(x)</th>
            <th>f''(x)</th>
            <th>f'''(x)</th>

            <th>Galat</th>
            <th>Status</th>

        </tr>

    </thead>

    <tbody>

        ${rows}

    </tbody>

    </table>

    </div>
    `;
    /* =========================
       LANGKAH RINGKAS
    ========================= */
    console.log("MASUK TAMPILKAN TABEL");
    console.log(
    generateTableStep(
        dataX,
        dataFX,
        idx,
        h,
        tinggi
    ));

        document
        .getElementById("langkah")
        .innerText =

        generateTableStep(
            dataX,
            dataFX,
            idx,
            h,
            tinggi
        )

        +

        generateDifferenceTableStep(
        dataFX
        )

        +

        `

        ━━━━━━━━━━━━━━━━━━

        INFORMASI HASIL

        Metode = ${selectedMethod.toUpperCase()}

        Turunan = ${turunanLabel}

        ${ordeLabel}

        ━━━━━━━━━━━━━━━━━━

        Hasil Dasar = ${formatNumber(dasar)}

        Hasil Tinggi = ${formatNumber(tinggi)}

        ━━━━━━━━━━━━━━━━━━

        Galat Dasar = ${formatNumber(galatDasar)}

        Galat Tinggi = ${formatNumber(galatTinggi)}

        Toleransi = ${formatTolerance()}

        Status = ${statusGalat(galatTinggi)}

        `;
    /* =========================
       TABEL PERBANDINGAN
    ========================= */

    document
    .getElementById(
        "tabelPerbandingan"
    )
    .innerHTML =

    `
    <div class="table-title">

        Perbandingan Hasil

        <br>

        <small>

            ${turunanLabel}
            |
            ${selectedMethod.toUpperCase()}
            |
            ${ordeLabel}

        </small>

    </div>

    <div class="table-wrapper">

        <table class="compare-table">

            <thead>

                <tr>

                    <th>Parameter</th>
                    <th>Nilai</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>Hasil Dasar</td>

                    <td>
                        ${formatNumber(dasar)}
                    </td>

                </tr>

                <tr>

                    <td>Hasil Tinggi</td>

                    <td>
                        ${formatNumber(tinggi)}
                    </td>

                </tr>

                <tr>

                    <td>Galat</td>

                    <td>
                        ${formatNumber(galatTinggi)}
                    </td>

                </tr>

                ${
                !isNaN(sejati)
                ?
                `
                <tr>

                    <td>Nilai Sejati</td>

                    <td>
                        ${formatNumber(sejati)}
                    </td>

                </tr>
                `
                :
                ""
                }

            </tbody>

        </table>

    </div>
    `;

    /* =========================
    TABEL SELISIH
    ========================= */

    document
    .getElementById("excelTable")
    .innerHTML =

    generateDifferenceTable(
        dataX,
        dataFX
    );

}