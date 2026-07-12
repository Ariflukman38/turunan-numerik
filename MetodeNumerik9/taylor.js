/* =====================================================
   TAYLOR SERIES ORDE 1-4
===================================================== */

function hitungTaylor(fungsi, x, h, orde = 4) {
  const f0 = hitungFungsi(fungsi, x);

  const f1 = hitungNilaiSejati(fungsi, x, 1);

  const f2 = hitungNilaiSejati(fungsi, x, 2);

  const f3 = hitungNilaiSejati(fungsi, x, 3);

  const f4 = hitungNilaiSejati(fungsi, x, 4);

  let hasil = f0;

  if (orde >= 1) {
    hasil += h * f1;
  }

  if (orde >= 2) {
    hasil += (Math.pow(h, 2) / 2) * f2;
  }

  if (orde >= 3) {
    hasil += (Math.pow(h, 3) / 6) * f3;
  }

  if (orde >= 4) {
    hasil += (Math.pow(h, 4) / 24) * f4;
  }

  return {
    hasil,

    f0,
    f1,
    f2,
    f3,
    f4,

    orde,
  };
}

/* =====================================================
   LANGKAH TAYLOR
===================================================== */

function generateTaylorStep(data, h) {
  return `

━━━━━━━━━━━━━━━━━━
DERET TAYLOR
━━━━━━━━━━━━━━━━━━

f(x+h) = f(x) + hf'(x) + (h²/2!)f''(x) + (h³/3!)f'''(x) + (h⁴/4!)f''''(x)

━━━━━━━━━━━━━━━━━━

f(x) = ${formatNumber(data.f0)}

f'(x) = ${formatNumber(data.f1)}

f''(x) = ${formatNumber(data.f2)}

f'''(x) = ${formatNumber(data.f3)}

f''''(x) = ${formatNumber(data.f4)}

━━━━━━━━━━━━━━━━━━

h = ${formatNumber(h)}

━━━━━━━━━━━━━━━━━━

Substitusi
=
${formatNumber(data.f0)}
+
(${formatNumber(h)} × ${formatNumber(data.f1)})
+
((${formatNumber(h)}²/2!) × ${formatNumber(data.f2)})
+
((${formatNumber(h)}³/3!) × ${formatNumber(data.f3)})
+
((${formatNumber(h)}⁴/4!) × ${formatNumber(data.f4)})

━━━━━━━━━━━━━━━━━━

Hasil Taylor = ${formatNumber(data.hasil)}

`;
}
