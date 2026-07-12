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

/* =====================================================
   TAMPILKAN SELISIH PUSAT
===================================================== */
function tampilkanCentralTable(table) {
  let html = `
    <div class="table-title">

        Tabel Interpolasi Central

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
