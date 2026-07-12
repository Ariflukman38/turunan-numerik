function generateTableStep(
    dataX,
    dataFX,
    idx,
    h,
    hasil
){

    let rumus = "";
    let substitusi = "";

    const turunan = Number(selectedDerivative);
    const orde = Number(selectedOrder);

    /* =========================
       TURUNAN PERTAMA
    ========================= */

    if(turunan === 1){

        if(selectedMethod==="forward"){

        if(orde===1){

            rumus =
            "f'(x)=(f(i+1)-f(i))/h";

            substitusi =
            `(${formatNumber(dataFX[idx+1])} - ${formatNumber(dataFX[idx])}) / ${formatNumber(h)}`;

        }

        else{

            rumus =
            "f'(x)=(-3f(i)+4f(i+1)-f(i+2))/(2h)";

            substitusi =
            `(-3(${formatNumber(dataFX[idx])})
            +4(${formatNumber(dataFX[idx+1])})
            -${formatNumber(dataFX[idx+2])})
            /(2×${formatNumber(h)})`;

        }

        }
        else if(selectedMethod==="backward"){

        if(orde===1){

            rumus =
            "f'(x)=(f(i)-f(i-1))/h";

            substitusi =
            `(${formatNumber(dataFX[idx])} - ${formatNumber(dataFX[idx-1])}) / ${formatNumber(h)}`;

        }

        else{

            rumus =
            "f'(x)=(3f(i)-4f(i-1)+f(i-2))/(2h)";

            substitusi =
            `(3(${formatNumber(dataFX[idx])})
            -4(${formatNumber(dataFX[idx-1])})
            +${formatNumber(dataFX[idx-2])})
            /(2×${formatNumber(h)})`;

        }

        }

        else{

            rumus = "f'(x)=(f(i+1)-f(i-1))/(2h)";

            substitusi = `(${formatNumber(dataFX[idx+1])} - ${formatNumber(dataFX[idx-1])}) / (2×${formatNumber(h)})`;

        }

    }

    /* =========================
       TURUNAN KEDUA
    ========================= */

    else if(turunan === 2){

    if(selectedMethod==="forward"){

        if(orde===1){

            rumus =
            "f''(x)=(f(i)-2f(i+1)+f(i+2))/h²";

            substitusi =
            `(${formatNumber(dataFX[idx])}
            -2(${formatNumber(dataFX[idx+1])})
            +${formatNumber(dataFX[idx+2])})
            / ${formatNumber(h)}²`;

        }
        else{

            rumus =
            "f''(x)=(2f(i)-5f(i+1)+4f(i+2)-f(i+3))/h²";

            substitusi =
            `(2(${formatNumber(dataFX[idx])})
            -5(${formatNumber(dataFX[idx+1])})
            +4(${formatNumber(dataFX[idx+2])})
            -${formatNumber(dataFX[idx+3])})
            / ${formatNumber(h)}²`;

        }

    }

    else if(selectedMethod==="backward"){

        if(orde===1){

            rumus =
            "f''(x)=(f(i)-2f(i-1)+f(i-2))/h²";

            substitusi =
            `(${formatNumber(dataFX[idx])}
            -2(${formatNumber(dataFX[idx-1])})
            +${formatNumber(dataFX[idx-2])})
            / ${formatNumber(h)}²`;

        }
        else{

            rumus =
            "f''(x)=(2f(i)-5f(i-1)+4f(i-2)-f(i-3))/h²";

            substitusi =
            `(2(${formatNumber(dataFX[idx])})
            -5(${formatNumber(dataFX[idx-1])})
            +4(${formatNumber(dataFX[idx-2])})
            -${formatNumber(dataFX[idx-3])})
            / ${formatNumber(h)}²`;

        }

    }

    else{

        rumus =
        "f''(x)=(f(i+1)-2f(i)+f(i-1))/h²";

        substitusi =
        `(${formatNumber(dataFX[idx+1])}
        -2(${formatNumber(dataFX[idx])})
        +${formatNumber(dataFX[idx-1])})
        / ${formatNumber(h)}²`;

    }

    }
    /* =========================
   TURUNAN KETIGA
========================= */

    else if(turunan === 3){

    if(selectedMethod==="forward"){

        if(idx <= dataFX.length-4){

            rumus =
            "f'''(x)=(-f(i)+3f(i+1)-3f(i+2)+f(i+3))/h³";

            substitusi =
            `(-${formatNumber(dataFX[idx])}
            +3(${formatNumber(dataFX[idx+1])})
            -3(${formatNumber(dataFX[idx+2])})
            +${formatNumber(dataFX[idx+3])})
            / ${formatNumber(h)}³`;

        }
        else{

            return "Data tidak cukup untuk f'''(x) Forward";

        }

    }

    else if(selectedMethod==="backward"){

        if(idx >= 3){

            rumus =
            "f'''(x)=(f(i)-3f(i-1)+3f(i-2)-f(i-3))/h³";

            substitusi =
            `(${formatNumber(dataFX[idx])}
            -3(${formatNumber(dataFX[idx-1])})
            +3(${formatNumber(dataFX[idx-2])})
            -${formatNumber(dataFX[idx-3])})
            / ${formatNumber(h)}³`;

        }
        else{

            return "Data tidak cukup untuk f'''(x) Backward";

        }

    }

    else{

        if(
            idx >= 2 &&
            idx <= dataFX.length-3
        ){

            rumus =
            "f'''(x)=(f(i+2)-2f(i+1)+2f(i-1)-f(i-2))/(2h³)";

            substitusi =
            `(${formatNumber(dataFX[idx+2])}
            -2(${formatNumber(dataFX[idx+1])})
            +2(${formatNumber(dataFX[idx-1])})
            -${formatNumber(dataFX[idx-2])})
            /(2×${formatNumber(h)}³)`;

        }
        else{

            return "Data tidak cukup untuk f'''(x) Central";

        }

    }

    }

    return `

    RUMUS TABEL

    ${rumus}
    ━━━━━━━━━━━━━━━━━━
    Substitusi = ${substitusi}
    ━━━━━━━━━━━━━━━━━━
    Hasil = ${formatNumber(hasil)}
    ━━━━━━━━━━━━━━━━━━
    Data yang digunakan

    x = ${formatNumber(dataX[idx])}
    f(x) = ${formatNumber(dataFX[idx])}

    `;

}

/* WARNING*/
function getTableWarning(
    idx,
    totalData
){

    const turunan =
    Number(selectedDerivative);

    /* =========================
       FORWARD
    ========================= */

    if(selectedMethod === "forward"){

        if(
            turunan === 1 &&
            idx >= totalData - 1
        ){

            return `
            ⚠ Turunan pertama Forward
            membutuhkan 1 titik setelah x target.
            `;
        }

        if(
            turunan === 2 &&
            idx >= totalData - 2
        ){

            return `
            ⚠ Turunan kedua Forward
            membutuhkan 2 titik setelah x target.
            `;
        }

        if(
            turunan === 3 &&
            idx >= totalData - 3
        ){

            return `
            ⚠ Turunan ketiga Forward
            membutuhkan 3 titik setelah x target.
            `;
        }

    }

    /* =========================
       BACKWARD
    ========================= */

    if(selectedMethod === "backward"){

        if(
            turunan === 1 &&
            idx < 1
        ){

            return `
            ⚠ Turunan pertama Backward
            membutuhkan 1 titik sebelum x target.
            `;
        }

        if(
            turunan === 2 &&
            idx < 2
        ){

            return `
            ⚠ Turunan kedua Backward
            membutuhkan 2 titik sebelum x target.
            `;
        }

        if(
            turunan === 3 &&
            idx < 3
        ){

            return `
            ⚠ Turunan ketiga Backward
            membutuhkan 3 titik sebelum x target.
            `;
        }

    }

    /* =========================
       CENTRAL
    ========================= */

    if(selectedMethod === "central"){

        if(
            idx < 1 ||
            idx > totalData - 2
        ){

            return `
            ⚠ Central Difference
            membutuhkan data di kiri dan kanan x target.
            `;
        }

    }

    return "";

}

/* =======━━━━━━━━━━━━━━━━━━==============================================
   TABLE POINT VIEW
===================================================== */
function generateTablePointView(
    xData,
    fxData,
    idx
){

    return `

    <div class="table-wrapper">

    <table class="hasil-table">

        <thead>

            <tr>

                <th>x(i-2)</th>
                <th>x(i-1)</th>
                <th>x(i)</th>
                <th>x(i+1)</th>
                <th>x(i+2)</th>

            </tr>

        </thead>

        <tbody>

            <tr>

                <td>${xData[idx-2] ?? "-"}</td>
                <td>${xData[idx-1] ?? "-"}</td>
                <td>${xData[idx]}</td>
                <td>${xData[idx+1] ?? "-"}</td>
                <td>${xData[idx+2] ?? "-"}</td>

            </tr>

        </tbody>

    </table>

    <table class="hasil-table">

        <thead>

            <tr>

                <th>f(i-2)</th>
                <th>f(i-1)</th>
                <th>f(i)</th>
                <th>f(i+1)</th>
                <th>f(i+2)</th>

            </tr>

        </thead>

        <tbody>

            <tr>

                <td>${fxData[idx-2] ?? "-"}</td>
                <td>${fxData[idx-1] ?? "-"}</td>
                <td>${fxData[idx]}</td>
                <td>${fxData[idx+1] ?? "-"}</td>
                <td>${fxData[idx+2] ?? "-"}</td>

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
