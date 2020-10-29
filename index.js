function waktuSolat(latitude, longitude) {
  fetch(
    `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=4`
  )
    .then((res) => res.json())
    .then((res) => {
      let tanggal = new Date();
      let hariIni = tanggal.getDate() - 1;
      let dataHariMasehi = res.data[hariIni].date.gregorian.date;
      let dataHariHijriyah = res.data[hariIni].date.hijri.date;
      let dataWaktuSolat = res.data[hariIni].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");
      let tableTbody = document.createElement("tbody");
      let h4 = document.createElement("h4");

      h4.textContent = dataHariMasehi;
      app.appendChild(h4);

      for (i in dataWaktuSolat) {
        let row = tableTbody.insertRow();
        let nama = row.insertCell(0);
        let waktu = row.insertCell(1);
        nama.innerHTML = i;
        waktu.innerHTML = dataWaktuSolat[i];
        tableTbody.appendChild(row);
      }
      table.appendChild(tableTbody);
      app.appendChild(table);
    });
}

function berhasil(lokasi) {
  waktuSolat(lokasi.coords.latitude, lokasi.coords.longitude);
}
function gagal() {
  // Default latitude dan longitude menggunakan waktu jakarta
  waktuSolat("-6.200000", "106.816666");
}
function lokasiPengguna() {
  if (!navigator.geolocation) {
    alert(
      "Geolocation Tidak Mendukung di Browser Kamu, Silakan Gunakan Browser Lain"
    );
  } else {
    // Jika didukung
    navigator.geolocation.getCurrentPosition(berhasil, gagal);
  }
}

function index() {
  const app = document.getElementById("app");
  const h3 = document.createElement("h3");
  h3.innerHTML = "Prayers Time";
  app.appendChild(h3);
  lokasiPengguna();
}

index();
