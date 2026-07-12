/* =====================================================
   GENERATE DIFFERENCE TABLE
===================================================== */

function generateDifferenceTable(
    dataX,
    dataFX
){

    switch(selectedMethod){

        case "forward":

            return generateForwardDifferenceTable(
                dataX,
                dataFX
            );

        case "backward":

            return generateBackwardDifferenceTable(
                dataX,
                dataFX
            );

        case "central":

            return generateCentralDifferenceTable(
                dataX,
                dataFX
            );

        default:

            return "";

    }

}

/* =====================================================
   TABEL SELISIH MAJU
===================================================== */

function generateForwardDifferenceTable(
    dataX,
    dataFX
){

    const n = dataFX.length;

    const d1 = [];
    const d2 = [];
    const d3 = [];
    const d4 = [];

    /* Δf */

    for(let i=0;i<n-1;i++){

        d1.push(
            dataFX[i+1]-dataFX[i]
        );

    }

    /* Δ²f */

    for(let i=0;i<d1.length-1;i++){

        d2.push(
            d1[i+1]-d1[i]
        );

    }

    /* Δ³f */

    for(let i=0;i<d2.length-1;i++){

        d3.push(
            d2[i+1]-d2[i]
        );

    }

    /* Δ⁴f */

    for(let i=0;i<d3.length-1;i++){

        d4.push(
            d3[i+1]-d3[i]
        );

    }

    let rows="";

    for(let i=0;i<n;i++){

        rows += `

        <tr>

            <td>${formatNumber(dataX[i])}</td>

            <td>${formatNumber(dataFX[i])}</td>

            <td>${d1[i]!==undefined?formatNumber(d1[i]):"-"}</td>

            <td>${d2[i]!==undefined?formatNumber(d2[i]):"-"}</td>

            <td>${d3[i]!==undefined?formatNumber(d3[i]):"-"}</td>

            <td>${d4[i]!==undefined?formatNumber(d4[i]):"-"}</td>

        </tr>

        `;

    }

    return `

    <div class="table-title">

        Tabel Selisih Maju (Forward Difference)

    </div>

    <div class="table-wrapper">

        <table class="compare-table">

            <thead>

                <tr>

                    <th>x</th>
                    <th>f(x)</th>

                    <th>Δf</th>
                    <th>Δ²f</th>
                    <th>Δ³f</th>
                    <th>Δ⁴f</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `;

}

/* =====================================================
   TABEL SELISIH MUNDUR
===================================================== */

function generateBackwardDifferenceTable(
    dataX,
    dataFX
){

    const n =
    dataFX.length;

    const d1 = [];
    const d2 = [];
    const d3 = [];
    const d4 = [];

    /* ▽f */

    for(
        let i=1;
        i<n;
        i++
    ){

        d1[i] =
        dataFX[i]
        -
        dataFX[i-1];

    }

    /* ▽²f */

    for(
        let i=2;
        i<n;
        i++
    ){

        d2[i] =
        d1[i]
        -
        d1[i-1];

    }

    /* ▽³f */

    for(
        let i=3;
        i<n;
        i++
    ){

        d3[i] =
        d2[i]
        -
        d2[i-1];

    }

    /* ▽⁴f */

    for(
        let i=4;
        i<n;
        i++
    ){

        d4[i] =
        d3[i]
        -
        d3[i-1];

    }

    let rows = "";

    for(
        let i=0;
        i<n;
        i++
    ){

        rows += `

        <tr>

            <td>${formatNumber(dataX[i])}</td>

            <td>${formatNumber(dataFX[i])}</td>

            <td>${
            d1[i]!==undefined
            ?
            formatNumber(d1[i])
            :
            "-"
            }</td>

            <td>${
            d2[i]!==undefined
            ?
            formatNumber(d2[i])
            :
            "-"
            }</td>

            <td>${
            d3[i]!==undefined
            ?
            formatNumber(d3[i])
            :
            "-"
            }</td>

            <td>${
            d4[i]!==undefined
            ?
            formatNumber(d4[i])
            :
            "-"
            }</td>

        </tr>

        `;

    }

    return `

    <div class="table-title">

        Tabel Selisih Mundur (Backward Difference)

    </div>

    <div class="table-wrapper">

        <table class="compare-table">

            <thead>

                <tr>

                    <th>x</th>
                    <th>f(x)</th>

                    <th>▽f</th>
                    <th>▽²f</th>
                    <th>▽³f</th>
                    <th>▽⁴f</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `;

}

/* =====================================================
   TABEL STENCIL CENTRAL DIFFERENCE
===================================================== */

function generateCentralDifferenceTable(
    dataX,
    dataFX
){

    const idx =
    cariIndexX(
        dataX,
        parseFloat(
            document
            .getElementById("targetX")
            .value
        )
    );

    if(
        idx < 2 ||
        idx > dataX.length-3
    ){

        return `

        <div class="table-note">

        Minimal diperlukan
        dua titik di kiri
        dan dua titik di kanan
        agar Central Difference
        dapat digunakan.

        </div>

        `;

    }

    return `

    <div class="table-title">

        Titik Central Difference

    </div>

    <div class="table-wrapper">

    <table class="compare-table">

        <thead>

            <tr>

                <th>Titik</th>
                <th>x</th>
                <th>f(x)</th>

            </tr>

        </thead>

        <tbody>

            <tr>

                <td>x(i-2)</td>

                <td>${formatNumber(dataX[idx-2])}</td>

                <td>${formatNumber(dataFX[idx-2])}</td>

            </tr>

            <tr>

                <td>x(i-1)</td>

                <td>${formatNumber(dataX[idx-1])}</td>

                <td>${formatNumber(dataFX[idx-1])}</td>

            </tr>

            <tr class="target-row">

                <td>x(i)</td>

                <td>${formatNumber(dataX[idx])}</td>

                <td>${formatNumber(dataFX[idx])}</td>

            </tr>

            <tr>

                <td>x(i+1)</td>

                <td>${formatNumber(dataX[idx+1])}</td>

                <td>${formatNumber(dataFX[idx+1])}</td>

            </tr>

            <tr>

                <td>x(i+2)</td>

                <td>${formatNumber(dataX[idx+2])}</td>

                <td>${formatNumber(dataFX[idx+2])}</td>

            </tr>

        </tbody>

    </table>

    </div>

    `;

}

function generateDifferenceTableStep(
    dataFX
){

    if(
        !dataFX ||
        dataFX.length < 2
    ){

        return "";

    }

    let langkah = `

    TABEL SELISIH

    ━━━━━━━━━━━━━━━━━━

    `;

    /* =========================
       Δf
    ========================= */

    const d1 = [];

    for(
        let i=0;
        i<dataFX.length-1;
        i++
    ){

        d1[i] =
        dataFX[i+1]
        -
        dataFX[i];

        langkah +=

        `Δf${i}

        = f${i+1} - f${i}

        = ${formatNumber(dataFX[i+1])}
        - ${formatNumber(dataFX[i])}

        = ${formatNumber(d1[i])}

        ━━━━━━━━━━━━━━━━━━

        `;

    }

    /* =========================
       Δ²f
    ========================= */

    if(d1.length >= 2){

        const d2 = [];

        for(
            let i=0;
            i<d1.length-1;
            i++
        ){

            d2[i] =
            d1[i+1]
            -
            d1[i];

            langkah +=

        `Δ²f${i}

        = Δf${i+1} - Δf${i}

        = ${formatNumber(d1[i+1])}
        - ${formatNumber(d1[i])}

        = ${formatNumber(d2[i])}

        ━━━━━━━━━━━━━━━━━━

        `;

        }

        /* =========================
           Δ³f
        ========================= */

        if(d2.length >= 2){

            const d3 = [];

            for(
                let i=0;
                i<d2.length-1;
                i++
            ){

                d3[i] =
                d2[i+1]
                -
                d2[i];

                langkah +=

        `Δ³f${i}

        = Δ²f${i+1} - Δ²f${i}

        = ${formatNumber(d2[i+1])}
        - ${formatNumber(d2[i])}

        = ${formatNumber(d3[i])}

        ━━━━━━━━━━━━━━━━━━

        `;

        }

            /* =========================
               Δ⁴f
            ========================= */

            if(d3.length >= 2){

                for(
                    let i=0;
                    i<d3.length-1;
                    i++
                ){

                    const d4 =
                    d3[i+1]
                    -
                    d3[i];

                    langkah +=

        `Δ⁴f${i}

        = Δ³f${i+1} - Δ³f${i}

        = ${formatNumber(d3[i+1])}
        - ${formatNumber(d3[i])}

        = ${formatNumber(d4)}

        ━━━━━━━━━━━━━━━━━━

        `;

                }

            }

        }

    }

    return langkah;

}
