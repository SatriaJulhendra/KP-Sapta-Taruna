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

const inputDepartemen = document.getElementById("inDepartemen");
const inputNama = document.getElementById("InNamaKaryawan");
const inputJenisKelamin = document.getElementById("inJenisKelamin");
const inputNik = document.getElementById("inNIK");
const inputNip = document.getElementById("inNIP");
const inputJabatan = document.getElementById("injabatan");
const ButtonTambah = document.getElementById("btn-Tambah");

ButtonTambah.addEventListener("click", function () {
    tambahDataPasien();
});

function tambahDataPasien() {
    set(ref(database, "karyawan/" + inputNip.value), {
        nama: inputNama.value,
        nik: inputNik.value,
        nip: inputNip.value,
        departemen: inputDepartemen.value,
        jeniskelamin: inputJenisKelamin.value,
        jabatan: inputJabatan.value,
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
    inputNip.value = "";
    inputDepartemen.value = "";
    inputJenisKelamin.value = "";
    inputJabatan.value = "";
}