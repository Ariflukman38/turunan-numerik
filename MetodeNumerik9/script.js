/* =====================================================
   GLOBAL CONFIG
===================================================== */

let selectedMode = "fungsi";
let selectedApproach = "difference";
let selectedMethod = "forward";
let selectedOrder = 1;
let selectedDerivative = 2;
let lastTableData = [];


/* =====================================================
   SIMPAN INPUT KALKULATOR
===================================================== */

function simpanInputKalkulator(){

    const ids = [

        "fungsi",
        "xValues",
        "hValues",

        "xTable",
        "fxTable",
        "targetX",
        "nilaiSejatiTable",

        "precisionDigit",
        "errorDigit",
        "derivativeOrder"

    ];

    ids.forEach(id => {

        const el =
        document.getElementById(id);

        if(el){

            localStorage.setItem(
                id,
                el.value
            );

        }

    });

}


/* =====================================================
   LOAD INPUT KALKULATOR
===================================================== */

function loadInputKalkulator(){

    const ids = [

        "fungsi",
        "xValues",
        "hValues",

        "xTable",
        "fxTable",
        "targetX",
        "nilaiSejatiTable",

        "precisionDigit",
        "errorDigit",
        "derivativeOrder"

    ];

    ids.forEach(id => {

        const el =
        document.getElementById(id);

        if(!el){

            return;

        }

        const value =
        localStorage.getItem(id);

        if(value !== null){

            el.value = value;

        }

    });

}

/* =====================================================
   GALAT TRUNCATION
===================================================== */

function galatTruncation(dasar, tinggi) {
  return Math.abs(tinggi - dasar);
}

/* =====================================================
   HITUNG TURUNAN
===================================================== */

function hitungTurunan() {
  /* =========================
       MODE TABEL
    ========================= */

  if (selectedMode === "table") {
    if (selectedApproach === "taylor") {
      alert("Deret Taylor hanya tersedia pada Mode Input Fungsi.");

      return;
    }

    hitungTabel();

    return;
  }

  if (selectedMode === "function") {
    document.getElementById("finalReport").innerHTML = "";
    document.getElementById("tabelNilai").innerHTML = "";
    document.getElementById("excelTable").innerHTML = "";
  }

  /* =========================
       INPUT FUNGSI
    ========================= */

  const fungsi = document.getElementById("fungsi").value.trim();

  const x = parseFloat(document.getElementById("xValues").value);

  const h = parseFloat(document.getElementById("hValues").value);

  if (!fungsi || isNaN(x) || isNaN(h)) {
    alert("Interpolasi hanya tersedia di mode Input Tabel!");

    return;
  }

  /* =========================
       DERET TAYLOR
    ========================= */

  if (selectedApproach === "taylor") {
    const dataTaylor = hitungTaylor(fungsi, x, h, Number(selectedOrder));

    const nilaiSejati = hitungFungsi(fungsi, x + h);

    const galat = galatAbsolut(nilaiSejati, dataTaylor.hasil);

    document.getElementById("hasil").innerText = formatNumber(dataTaylor.hasil);

    document.getElementById("modeResult").innerHTML = "Input Fungsi";

    document.getElementById("pendekatanResult").innerHTML = "Deret Taylor";

    document.getElementById("metodeResult").innerHTML =
      "Taylor Orde " + selectedOrder;

    document.getElementById("turunanResult").innerHTML =
      "Taylor Orde " + selectedOrder;

    document.getElementById("xResult").innerHTML = formatNumber(x);

    document.getElementById("hResult").innerHTML = formatNumber(h);

    document.getElementById("langkah").innerText = generateTaylorStep(
      dataTaylor,
      h,
    );

    document.getElementById("tabelPerbandingan").innerHTML = `
        <div class="nilai-sejati-box">

            <h4>Perbandingan Taylor</h4>

            <table class="compare-table">

                <tr>
                    <td>Nilai Taylor</td>
                    <td>${formatNumber(dataTaylor.hasil)}</td>
                </tr>

                <tr>
                    <td>Nilai Sejati</td>
                    <td>${formatNumber(nilaiSejati)}</td>
                </tr>

                <tr>
                    <td>Galat Absolut</td>
                    <td>${formatNumber(galat)}</td>
                </tr>

                <tr>
                    <td>Status</td>
                    <td>${statusGalat(galat)}</td>
                </tr>

            </table>

        </div>
        `;

    document.getElementById("tabelNilai").innerHTML = "";

    document.getElementById("excelTable").innerHTML = "";

    document.getElementById("finalReport").innerHTML = "";

    return;
  }

  /* =========================
       HAMPIRAN SELISIH
    ========================= */

  const data = hitungDifferenceMethod(
    fungsi,
    x,
    h,
    selectedDerivative,
    selectedOrder,
  );

  const nilaiSejati = hitungNilaiSejati(fungsi, x, selectedDerivative);

  tampilkanHasil(fungsi, x, h, data, nilaiSejati);
}

/* =====================================================
   MODE TABEL
===================================================== */

function hitungTabel() {
  const dataX = parseArray(document.getElementById("xTable").value);

  const dataFX = parseArray(document.getElementById("fxTable").value);

  /* =========================================
       VALIDASI DATA
    ========================================= */

  if (dataX.length < 5 || dataFX.length < 5) {
    alert("Minimal 5 data diperlukan");

    return;
  }

  if (dataX.length !== dataFX.length) {
    alert("Jumlah data x dan f(x) harus sama");

    return;
  }

  const targetX = parseFloat(document.getElementById("targetX").value);

  /* =========================================
   MODE INTERPOLASI
========================================= */

  if (selectedApproach === "interpolasi") {
    let dataInterpolasi;
    let namaMetode;
    let htmlTabel;

    if (selectedMethod === "forward") {
      dataInterpolasi = newtonForwardInterpolation(dataX, dataFX, targetX);

      namaMetode = "Newton Forward";

      htmlTabel = tampilkanForwardTable(dataInterpolasi.table);
    } else if (selectedMethod === "backward") {
      dataInterpolasi = newtonBackwardInterpolation(dataX, dataFX, targetX);

      namaMetode = "Newton Backward";

      htmlTabel = tampilkanBackwardTable(dataInterpolasi.table);
    } else {
      alert("Gunakan Newton Forward atau Newton Backward untuk Interpolasi.");

      return;
    }

    document.getElementById("hasil").innerText = formatNumber(
      dataInterpolasi.hasil,
    );

    document.getElementById("modeResult").innerHTML = "Input Tabel";

    document.getElementById("pendekatanResult").innerHTML = "Interpolasi";

    document.getElementById("metodeResult").innerHTML = namaMetode;

    document.getElementById("turunanResult").innerHTML = "Interpolasi f(x)";

    const derivativeSelect = document.getElementById("derivativeOrder");

    if (derivativeSelect) {
      derivativeSelect.disabled = true;
    }

    document.getElementById("xResult").innerHTML = formatNumber(targetX);

    document.getElementById("hResult").innerHTML = formatNumber(
      dataX[1] - dataX[0],
    );

    document.getElementById("langkah").innerText =
      generateInterpolationStep(dataInterpolasi);

    document.getElementById("tabelPerbandingan").innerHTML = htmlTabel;

    document.getElementById("tabelNilai").innerHTML = "";

    document.getElementById("excelTable").innerHTML = "";

    document.getElementById("finalReport").innerHTML = "";

    return;
  }
  if (isNaN(targetX)) {
    alert("Masukkan nilai x yang dicari");

    return;
  }

  const nilaiSejati = parseFloat(
    document.getElementById("nilaiSejatiTable").value,
  );

  /* =========================================
       CEK INTERVAL h
    ========================================= */

  const h = Math.abs(dataX[1] - dataX[0]);

  for (let i = 1; i < dataX.length - 1; i++) {
    const hi = Math.abs(dataX[i + 1] - dataX[i]);

    if (Math.abs(hi - h) > 1e-10) {
      alert("Interval x harus seragam");

      return;
    }
  }

  /* =========================================
       CARI INDEX X
    ========================================= */

  const idx = cariIndexX(dataX, targetX);

  if (idx === -1) {
    alert(
      "Nilai x tidak ditemukan pada tabel.\nGunakan pendekatan Interpolasi.",
    );

    return;
  }

  /* =========================================
    HITUNG TURUNAN
  ========================================= */

  let hasilDasar = tableBasicDifference(
    dataX,
    dataFX,
    idx,
    h,
    selectedMethod,
    selectedDerivative,
    selectedOrder,
  );

  let hasilTinggi = hasilDasar;

  /* =========================================
    HIGH ACCURACY JIKA DATA CUKUP
  ========================================= */

  if (selectedMethod === "central") {
    if (idx >= 2 && idx <= dataX.length - 3) {
      hasilTinggi = tableHighDifference(dataFX, idx, h, selectedDerivative);
    }
  } else if (selectedMethod === "forward") {
    if (idx <= dataX.length - 5) {
      hasilTinggi = tableHighDifference(dataFX, idx, h, selectedDerivative);
    }
  } else if (selectedMethod === "backward") {
    if (idx >= 4) {
      hasilTinggi = tableHighDifference(dataFX, idx, h, selectedDerivative);
    }
  }

  /* =========================================
       DATA UNTUK TABEL HASIL
    ========================================= */

  const fp = tableBasicDifference(
    dataX,
    dataFX,
    idx,
    h,
    selectedMethod,
    1,
    selectedOrder,
  );

  const fpp = tableBasicDifference(
    dataX,
    dataFX,
    idx,
    h,
    selectedMethod,
    2,
    selectedOrder,
  );

  const fppp =
    idx >= 2 && idx <= dataX.length - 3
      ? tableBasicDifference(
          dataX,
          dataFX,
          idx,
          h,
          selectedMethod,
          3,
          selectedOrder,
        )
      : null;

  console.log("idx =", idx);
  console.log("fp =", fp);
  console.log("fpp =", fpp);
  console.log("fppp =", fppp);
  console.log("nilaiSejati =", nilaiSejati);
  console.log("hasilDasar =", hasilDasar);
  console.log("hasilTinggi =", hasilTinggi);
  console.log("selectedDerivative =", selectedDerivative);

  /* =========================================
       TAMPILKAN
    ========================================= */

  tampilkanTabelMode(
    dataX,
    dataFX,
    idx,
    fp,
    fpp,
    fppp,
    hasilDasar,
    hasilTinggi,
    nilaiSejati,
  );
}

document.getElementById("errorStatus").innerHTML = "";

document.addEventListener("DOMContentLoaded", () => {

  loadPengaturan();
  loadInputKalkulator();

  [
    "fungsi",
    "xValues",
    "hValues",

    "xTable",
    "fxTable",
    "targetX",
    "nilaiSejatiTable",

    "precisionDigit",
    "errorDigit",
    "derivativeOrder"

  ].forEach(id => {

      const el =
      document.getElementById(id);

      if(el){

          el.addEventListener(
              "input",
              simpanInputKalkulator
          );

          el.addEventListener(
              "change",
              simpanInputKalkulator
          );

      }

  });

  /* =========================
       DROPDOWN TURUNAN
    ========================= */

  const derivativeSelect = document.getElementById("derivativeOrder");

  if (derivativeSelect) {
    selectedDerivative = derivativeSelect.value;

    derivativeSelect.addEventListener("change", function () {
      selectedDerivative = this.value;
    });
  }

  /* =========================
       MODE INPUT
    ========================= */

  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".mode-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      selectedMode = btn.dataset.mode;

      document.getElementById("fungsiMode").style.display =
        selectedMode === "fungsi" ? "block" : "none";

      document.getElementById("tableMode").style.display =
        selectedMode === "table" ? "block" : "none";
    };
  });

  // kode berikutnya tetap...

  document.querySelectorAll(".approach-btn").forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".approach-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      selectedApproach = btn.dataset.approach;

      /* =========================
           KOMPONEN
        ========================= */

      const methodContainer = document.querySelector(".method-container");

      const derivativeSelect = document.getElementById("derivativeOrder");

      /* =========================
           TAYLOR
        ========================= */

      if (selectedApproach === "taylor") {
        methodContainer.style.display = "none";
      } else {
        methodContainer.style.display = "flex";
      }

      /* =========================
           INTERPOLASI
        ========================= */

      if (selectedApproach === "interpolasi") {
        derivativeSelect.disabled = true;
      } else {
        derivativeSelect.disabled = false;
      }
    };
  });

  document.querySelectorAll(".method").forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".method")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      selectedMethod = btn.dataset.method;
    };
  });

  document.querySelectorAll(".turunan-btn").forEach((btn) => {
    btn.onclick = () => {
      document
        .querySelectorAll(".turunan-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      selectedOrder = Number(btn.dataset.turunan);
    };
  });
});

function resetInputKalkulator(){

    localStorage.clear();

    location.reload();

}
