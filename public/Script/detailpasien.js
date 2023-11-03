import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    set,
    child,
    update,
    remove,
  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";


  const firebaseConfig = {
    apiKey: "AIzaSyCq-AizKMRZ18jJqgd8kMRC6PpkJecthZU",
    authDomain: "tugas-akhir-kp.firebaseapp.com",
    projectId: "tugas-akhir-kp",
    storageBucket: "tugas-akhir-kp.appspot.com",
    messagingSenderId: "380404305137",
    appId: "1:380404305137:web:6cb3e3a1e28b159480ed50",
    measurementId: "G-FLTB4S7NLL",
    databaseURL: "https://tugas-akhir-kp-default-rtdb.firebaseio.com"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

    let inputNama = document.getElementById("inNamaPasein");
    let inputNik = document.getElementById("inNIK");
    let inputNoRm = document.getElementById("inNoRM");
    let inputTanggalLahir = document.getElementById("inTangalLahir");
    let inputJenisKelamin = document.getElementById("inJenisKelamin");
    let inputAlamat = document.getElementById("inAlamat");
    let inputPekerjaan = document.getElementById("inPekerjaan");
    let inputNoHp = document.getElementById("inNoHP");
    let inputAsuransi = document.getElementById("inAsuransi");
    let inputNoAsuransi = document.getElementById("inNoAsuransi");
    let inputTanggalBerkunjung = document.getElementById("inTanggalBerkunjung");
    let inpuSuhuTubuh = document.getElementById("inSuhuTubuh");
    let inputTekananDarah = document.getElementById("inTekananDarah");
    let inputBeratBadan = document.getElementById("inBeratBadan");
    let inputKeluhan = document.getElementById("inKeluhan");
    let inputNamaDokter = document.getElementById("inNamaDokter");
    let inputDiagnosa = document.getElementById("inDiagnosa");
    let inputResep = document.getElementById("inResep");
    let ButtonUpdate = document.getElementById("btn-update");
    let ButtonDelete = document.getElementById("btn-delete");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dataString = urlParams.get('data');
    const nama = JSON.parse(decodeURIComponent(dataString));


    getDataByNama(nama);

    ButtonUpdate.addEventListener("click", function() {
        updateDataPasien(inputNama.value);
    });
    
    ButtonDelete.addEventListener("click", function() {
        deleteDataPasien(inputNama.value);
    });
    
    function updateDataPasien(key) {
        const dbRef = ref(database);
    
        get(child(dbRef, 'pasien/' + key))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    data.nama = inputNama.value;
                    data.nik = inputNik.value;
                    data.norm = inputNoRm.value;
                    data.tanggallahir = inputTanggalLahir.value;
                    data.jeniskelamin = inputJenisKelamin.value;
                    data.alamat = inputAlamat.value;
                    data.pekerjaan = inputPekerjaan.value;
                    data.nohp = inputNoHp.value;
                    data.asuransi = inputAsuransi.value;
                    data.noasuransi = inputNoAsuransi.value;
                    data.tanggalberkunjung = inputTanggalBerkunjung.value;
                    data.suhutubuh = inpuSuhuTubuh.value;
                    data.tekanandarah = inputTekananDarah.value;
                    data.beratbadan = inputBeratBadan.value;
                    data.keluhan = inputKeluhan.value;
                    data.namadokter = inputNamaDokter.value;
                    data.diagnosa = inputDiagnosa.value;
                    data.resep = inputResep.value;
    
                    // Update data pada Firebase
                    update(child(dbRef, 'pasien/' + key), data)
                        .then(() => {
                            alert('Data Berhasil Diupdate');
                        })
                        .catch((error) => {
                            alert('Data Gagal Diupdate');
                            console.log(error);
                        });
                } else {
                    console.log('Data tidak ditemukan');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    function deleteDataPasien(key){
        const dbRef = ref(database);

        remove(child(dbRef, "pasien/" + key))
        .then(() => {
            alert("Data Berhasil Di Hapus");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Data Gagal Di Hapus");
            console.log(error);
        });
    }


    // Fungsi untuk mengambil data berdasarkan "nama" sebagai unik ID
    function getDataByNama(nama) {
        const dbRef = ref(database);

        get(child(dbRef, 'pasien/' + nama)).then((snapshot) => {
            if (snapshot.exists()) {
            const data = snapshot.val();
            inputNama.value = data.nama;
            inputNik.value = data.nik;
            inputNoRm.value = data.norm;
            inputTanggalLahir.value = data.tanggallahir;
            inputJenisKelamin.value = data.jeniskelamin;
            inputAlamat.value = data.alamat;
            inputPekerjaan.value = data.pekerjaan;
            inputNoHp.value = data.nohp;
            inputAsuransi.value = data.asuransi;
            inputNoAsuransi.value = data.noasuransi;
            inputTanggalBerkunjung.value = data.tanggalberkunjung;
            inpuSuhuTubuh.value = data.suhutubuh;
            inputTekananDarah.value = data.tekanandarah;
            inputBeratBadan.value = data.beratbadan;
            inputKeluhan.value = data.keluhan;
            inputNamaDokter.value = data.namadokter;
            inputDiagnosa.value = data.diagnosa;
            inputResep.value = data.resep;

            } else {
                console.log('Data tidak ditemukan');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

