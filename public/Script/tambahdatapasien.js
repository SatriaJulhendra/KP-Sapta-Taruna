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
        databaseURL: "https://tugas-akhir-kp-default-rtdb.firebaseio.com",
        measurementId: "G-FLTB4S7NLL"
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
    let ButtonTambah = document.getElementById("btn-tambah");


        ButtonTambah.addEventListener("click", tambahDataPasien ); 


    function tambahDataPasien() {
        set(ref(database, "pasien/" + inputNama.value), {
            nama: inputNama.value,
            nik: inputNik.value,
            norm: inputNoRm.value,
            tanggallahir: inputTanggalLahir.value,
            jeniskelamin : inputJenisKelamin.value,
            alamat: inputAlamat.value,
            pekerjaan: inputPekerjaan.value,
            nohp: inputNoHp.value,
            asuransi: inputAsuransi.value,
            noasuransi: inputNoAsuransi.value,
            tanggalberkunjung: inputTanggalBerkunjung.value,
            suhutubuh: inpuSuhuTubuh.value,
            tekanandarah: inputTekananDarah.value,
            beratbadan: inputBeratBadan.value,
            keluhan: inputKeluhan.value,
            namadokter: inputNamaDokter.value,
            diagnosa: inputDiagnosa.value,
            resep: inputResep.value,
        })
            .then(() => {
            alert("Data Berhasil Di Tambahkan");
            clear();

            })
            .catch((error) => {
            alert("Data Gagal Di Tambahkan");
            console.log(error);
            });
    }

    function clear() {
        inputNama.value = "";
        inputNik.value = "";
        inputNoRm.value = "";
        inputTanggalLahir.value = "";
        inputJenisKelamin.value = "";
        inputAlamat.value = "";
        inputPekerjaan.value = "";
        inputNoHp.value = "";
        inputAsuransi.value = "";
        inputNoAsuransi.value = "";
        inputTanggalBerkunjung.value = "";
        inpuSuhuTubuh.value = "";
        inputTekananDarah.value = "";
        inputBeratBadan.value = "";
        inputKeluhan.value = "";
        inputNamaDokter.value = "";
        inputDiagnosa.value = "";
        inputResep.value = "";
    }
