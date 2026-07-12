/* =====================================================
   FORWARD DIFFERENCE TABLE
===================================================== */

function buildForwardTable(y) {
  const n = y.length;

  let table = [];

  for (let i = 0; i < n; i++) {
    table[i] = [];
    table[i][0] = y[i];
  }

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      table[i][j] = table[i + 1][j - 1] - table[i][j - 1];
    }
  }

  return table;
}

/* =====================================================
   BACKWARD DIFFERENCE TABLE
===================================================== */

function buildBackwardTable(y) {
  const n = y.length;

  let table = [];

  for (let i = 0; i < n; i++) {
    table[i] = [];
    table[i][0] = y[i];
  }

  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      table[i][j] = table[i][j - 1] - table[i - 1][j - 1];
    }
  }

  return table;
}

/* =====================================================
   NEWTON FORWARD
===================================================== */

function newtonForwardInterpolation(xData, yData, targetX) {
  const h = xData[1] - xData[0];

  const p = (targetX - xData[0]) / h;

  const table = buildForwardTable(yData);

  let hasil = table[0][0];

  let factorial = 1;
  let pTerm = 1;

  for (let i = 1; i < xData.length; i++) {
    factorial *= i;

    pTerm *= p - (i - 1);

    hasil += (pTerm * table[0][i]) / factorial;
  }

  return {
    hasil,
    table,
    p,
    h,
  };
}

/* =====================================================
   NEWTON BACKWARD
===================================================== */

function newtonBackwardInterpolation(xData, yData, targetX) {
  const n = xData.length;

  const h = xData[1] - xData[0];

  const p = (targetX - xData[n - 1]) / h;

  const table = buildBackwardTable(yData);

  let hasil = table[n - 1][0];

  let factorial = 1;
  let pTerm = 1;

  for (let i = 1; i < n; i++) {
    factorial *= i;

    pTerm *= p + (i - 1);

    hasil += (pTerm * table[n - 1][i]) / factorial;
  }

  return {
    hasil,
    table,
    p,
    h,
  };
}

/* =====================================================
   CENTRAL INTERPOLATION
===================================================== */

function centralInterpolation(xData, yData, targetX) {
  return newtonForwardInterpolation(xData, yData, targetX);
}

/* =====================================================
   LANGKAH INTERPOLASI
===================================================== */

function generateInterpolationStep(data) {
  return `

━━━━━━━━━━━━━━━━━━
INTERPOLASI NEWTON
━━━━━━━━━━━━━━━━━━

Rumus :

P(x) = f₀ + pΔf₀ + p(p−1)/2! Δ²f₀ + p(p−1)(p−2)/3! Δ³f₀ + ...

━━━━━━━━━━━━━━━━━━

p = (x-x₀)/h

= ${formatNumber(data.p)}

━━━━━━━━━━━━━━━━━━

h = ${formatNumber(data.h)}

━━━━━━━━━━━━━━━━━━

Hasil Interpolasi

= ${formatNumber(data.hasil)}

`;
}

/* =====================================================
   TABEL SELISIH MAJU
===================================================== */

function tampilkanForwardTable(table) {
  let html = `
    <div class="table-title">

        Tabel Interpolasi Newton Forward

    </div>

    <div class="table-wrapper">

    <table class="hasil-table">

        <thead>

            <tr>

                <th>f(x)</th>

                <th>Δf</th>

                <th>Δ²f</th>

                <th>Δ³f</th>

                <th>Δ⁴f</th>

            </tr>

        </thead>

        <tbody>
    `;

  for (let i = 0; i < table.length; i++) {
    html += "<tr>";

    for (let j = 0; j < table.length - i; j++) {
      html += `<td>

            ${formatNumber(table[i][j])}

            </td>`;
    }

    html += "</tr>";
  }

  html += `
        </tbody>

    </table>

    </div>
    `;

  return html;
}

/* =====================================================
  TAMPILKAN SELISIH MUNDUR
===================================================== */
function tampilkanBackwardTable(table) {
  let html = `
    <div class="table-title">

        Tabel Interpolasi Newton Backward

    </div>

    <div class="table-wrapper">

    <table class="hasil-table">

        <thead>

            <tr>

                <th>f(x)</th>
                <th>▽f</th>
                <th>▽²f</th>
                <th>▽³f</th>
                <th>▽⁴f</th>

            </tr>

        </thead>

        <tbody>
    `;

  for (let i = 0; i < table.length; i++) {
    html += "<tr>";

    for (let j = 0; j < table.length - i; j++) {
      html += `<td>

            ${table[i][j] !== undefined ? formatNumber(table[i][j]) : "-"}

            </td>`;
    }

    html += "</tr>";
  }

  html += `
        </tbody>

    </table>

    </div>
    `;

  return html;
}
