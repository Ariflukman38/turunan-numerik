/* =====================================================
   EXPORT EXCEL (.XLSX)
===================================================== */

function exportExcel(){

    if(
        !lastTableData ||
        lastTableData.length===0
    ){

        alert(
            "Belum ada data yang dapat diexport"
        );

        return;

    }

    /* =========================================
       WORKBOOK
    ========================================= */

    const wb =
    XLSX.utils.book_new();

    /* =========================================
       DATA WORKSHEET
    ========================================= */

    const excelData = [];

    /* ---------- Judul ---------- */

    excelData.push([
        "KALKULATOR METODE NUMERIK"
    ]);

    excelData.push([]);

    /* ---------- Informasi ---------- */

    excelData.push(["INFORMASI PERHITUNGAN"]);

    excelData.push([
        "Parameter",
        "Nilai"
    ]);

    excelData.push([
        "Mode",
        "Input Tabel"
    ]);

    excelData.push([
        "Pendekatan",
        "Hampiran Selisih"
    ]);

    excelData.push([
        "Metode",
        selectedMethod.toUpperCase()
    ]);

    excelData.push([
        "Turunan",
        getTurunanLabel(
            selectedDerivative
        )
    ]);

    excelData.push([
        "Orde",
        "Orde " + selectedOrder
    ]);

    excelData.push([
        "Nilai x",
        document
        .getElementById("xResult")
        .innerText
    ]);

    excelData.push([
        "Nilai h",
        document
        .getElementById("hResult")
        .innerText
    ]);

    excelData.push([]);

    /* ---------- Header ---------- */

    excelData.push([
        "HASIL PERHITUNGAN"
    ]);

    excelData.push([]);

    excelData.push([

        "x",

        "f(x)",

        "f'(x)",

        "f''(x)",

        "f'''(x)",

        "Galat"

    ]);

    /* ---------- Isi tabel ---------- */

    lastTableData.forEach(row=>{

        excelData.push([

            row.x,

            row.fx,

            row.fp ?? "-",

            row.fpp ?? "-",

            row.fppp ?? "-",

            row.galat ?? "-"

        ]);

    });

    /* =========================================
       BUAT SHEET
    ========================================= */

    const ws =
    XLSX.utils.aoa_to_sheet(
        excelData
    );

    /* =========================================
       MERGE JUDUL
    ========================================= */

    ws["!merges"] = [

        {
            s:{r:0,c:0},
            e:{r:0,c:5}
        },

        {
            s:{r:13,c:0},
            e:{r:13,c:5}
        }

    ];

    /* =========================================
       LEBAR KOLOM
    ========================================= */

    ws["!cols"] = [

        {wch:14},

        {wch:18},

        {wch:18},

        {wch:18},

        {wch:18},

        {wch:18}

    ];

    /* =========================================
       FILTER
    ========================================= */

    ws["!autofilter"] = {

        ref:"A15:F15"

    };

    /* =========================================
       TAMBAH SHEET
    ========================================= */

    XLSX.utils.book_append_sheet(

        wb,

        ws,

        "Perhitungan"

    );

    /* =========================================
       EXPORT
    ========================================= */

    XLSX.writeFile(

        wb,

        "Hasil_Metode_Numerik.xlsx"

    );

}