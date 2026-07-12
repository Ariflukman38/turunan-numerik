/* =====================================================
   TAMPILKAN HASIL
===================================================== */

function tampilkanHasil(fungsi, x, h, data, nilaiSejati) {
  const summary = generateSummary(data.hasil, nilaiSejati);

  const galat = isNaN(nilaiSejati) ? 0 : galatAbsolut(nilaiSejati, data.hasil);

  const status = statusGalat(galat);

  /* =========================================
       HELPER
    ========================================= */

  const setHTML = (id, value) => {
    const el = document.getElementById(id);

    if (el) {
      el.innerHTML = value;
    }
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);

    if (el) {
      el.innerText = value;
    }
  };

  /* =========================================
       HASIL UTAMA
    ========================================= */

  setHTML("hasil", summary.hasil);

  /* =========================================
       INFORMASI
    ========================================= */

  setHTML(
    "modeResult",

    selectedMode === "fungsi" ? "Input Fungsi" : "Input Tabel",
  );

  setHTML(
    "pendekatanResult",

    selectedApproach === "difference"
      ? "Hampiran Selisih"
      : selectedApproach === "taylor"
        ? "Deret Taylor"
        : "Interpolasi",
  );

  setHTML(
    "metodeResult",

    CONFIG.enableRichardson
      ? "Richardson Extrapolation"
      : CONFIG.highAccuracy
        ? selectedMethod.toUpperCase() + " + High Accuracy"
        : selectedMethod.toUpperCase(),
  );

  setHTML(
    "turunanResult",

    getTurunanLabel(selectedDerivative),
  );

  setHTML(
    "xResult",

    formatNumber(x),
  );

  setHTML(
    "hResult",

    formatNumber(h),
  );

  /* =========================================
       STATUS GALAT
    ========================================= */

  if (selectedMode === "fungsi") {
    setHTML(
      "errorStatus",

      `
        <div class="status-box">

            <strong>Galat :</strong>
            ${formatNumber(galat)}

            <br>

            <strong>Status :</strong>
            ${status}

        </div>
        `,
    );

    if (selectedMode === "fungsi") {

  document.getElementById("finalReport").innerHTML = "";
  document.getElementById("tabelNilai").innerHTML = "";
  document.getElementById("excelTable").innerHTML = "";

  }
  
  } else {
    setHTML("errorStatus", "");
  }

  /* =========================================
       TABEL HASIL
    ========================================= */

  setHTML(
    "tabelNilai",

    generateExcelTable(
      data,

      data.hasil,

      galat,
    ),
  );

  /* =========================================
       PERBANDINGAN
    ========================================= */

  setHTML(
    "tabelPerbandingan",

    generateComparisonTable(
      data.hasil,

      nilaiSejati,
    ),
  );

  //document
  //.getElementById("finalReport")
  //.innerHTML = "";

  /* =========================================
       LANGKAH
    ========================================= */

  setText(
    "langkah",

    generateFinalReport(
      fungsi,

      data,

      data.hasil,

      nilaiSejati,
    ),
  );
}

/* =====================================================
   FINAL COMPARISON TABLE
===================================================== */

function generateComparisonTable(hasil, sejati) {
  if (isNaN(sejati)) return "";

  const galatAbs = galatAbsolut(sejati, hasil);

  const galatRel = galatRelatif(sejati, hasil);

  const galatPct = galatPersen(sejati, hasil);

  return `

    <div class="compare-box">

    <h3 class="compare-title">
    Perbandingan Hasil
    </h3>

    <table class="compare-table">

    <thead>

    <tr>
        <th>Parameter</th>
        <th>Nilai</th>
    </tr>

    </thead>

    <tbody>

    <tr>
        <td>Nilai Hampiran</td>
        <td>${formatNumber(hasil)}</td>
    </tr>

    <tr>
        <td>Nilai Sejati</td>
        <td>${formatNumber(sejati)}</td>
    </tr>

    <tr>
        <td>Galat Absolut</td>
        <td>${formatNumber(galatAbs)}</td>
    </tr>

    <tr>
        <td>Galat Relatif</td>
        <td>${formatNumber(galatRel)}</td>
    </tr>

    <tr>
        <td>Galat Persen</td>
        <td>${formatNumber(galatPct)} %</td>
    </tr>

    <tr>
        <td>Toleransi</td>
        <td>${formatTolerance()}</td>
    </tr>

    <tr>
        <td>Status</td>
        <td>${statusGalat(galatAbs)}</td>
    </tr>

    </tbody>

    </table>

    </div>

    `;
}

/* =====================================================
   EXCEL STYLE TABLE
===================================================== */

function generateExcelTable(data, hasil, galat) {
  return `

    <div class="table-wrapper">

    <table class="hasil-table">

        <thead>

        <tr>

            <th>f-2</th>
            <th>f-1</th>
            <th>f0</th>
            <th>f1</th>
            <th>f2</th>

            <th>f(xi)</th>

            <th>Hasil</th>

            <th>Galat</th>
            

        </tr>

        </thead>

        <tbody>

        <tr>

            <td>
            ${data.fm2 !== undefined ? formatNumber(data.fm2) : "-"}
            </td>

            <td>
            ${data.fm1 !== undefined ? formatNumber(data.fm1) : "-"}
            </td>

            <td>
            ${data.f0 !== undefined ? formatNumber(data.f0) : "-"}
            </td>

            <td>
            ${data.f1 !== undefined ? formatNumber(data.f1) : "-"}
            </td>

            <td>
            ${data.f2 !== undefined ? formatNumber(data.f2) : "-"}
            </td>

            <td>
            ${data.f0 !== undefined ? formatNumber(data.f0) : "-"}
            </td>

            <td>
            ${formatNumber(hasil)}
            </td>

            <td>
            ${formatNumber(galat)}
            </td>

        </tr>

        </tbody>

    </table>

    </div>

    `;
}
