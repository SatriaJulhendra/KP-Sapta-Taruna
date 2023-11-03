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
const datacontainer = document.querySelector("tbody");
const ButtonSearch = document.getElementById("Search-by-name");
const inputSearcName = document.getElementById("carinama");


ButtonSearch.addEventListener("click", function() {
    filterDataByName(inputSearcName.value);
});


retData();

function retData() {
    const dbRef = ref(database);

    get(child(dbRef, "karyawan"))
    .then((snapshot) => {
        if (snapshot.exists()) {
        var data = snapshot.val();
        var htmldata = "";
        let count = 1;
        for (var key in data) {
            const value = data[key];
            if(count % 2 == 0){
            htmldata +=
                '<tr class="tabel-genap"> <td>' +
                value.departemen +
                '</td> <td >' +
                value.nama +
                '</td> <td >' +
                value.jeniskelamin +
                '</td> <td class="text-center">' +
                value.nik +
                '</td> <td class="text-center">' +
                value.nip +
                '</td> <td> ' +
                value.jabatan +
                '</td> </tr>';
            count++;
            }else{
            htmldata +=
                '<tr class="tabel-ganjil"> <td>' +
                value.departemen +
                '</td> <td >' +
                value.nama +
                '</td> <td >' +
                value.jeniskelamin +
                '</td> <td class="text-center">' +
                value.nik +
                '</td> <td class="text-center">' +
                value.nip +
                '</td> <td>' +
                value.jabatan +
                '</td> </tr>';
            count++;
            }
        }

        datacontainer.innerHTML = htmldata;

        console.log("Data ditampilkan di tabel");
        } else {
        console.log("No data available");
        }
    })
    .catch((error) => {
        console.error(error);
    });
}


// Membuat variabel untuk menampung informasi yang akan ditampilkan di halaman baru
let selectedData = {};

// Event listener untuk menangani klik pada setiap baris tabel
datacontainer.addEventListener("click", (event) => {

    // Menampilkan informasi baris tabel di halaman baru
    const clickedRow = event.target.closest("tr"); // Mendapatkan baris yang diklik
    const cells = clickedRow.querySelectorAll("td"); // Mendapatkan sel dalam baris
    selectedData = cells[4].innerText; 

    // Membuka halaman baru untuk menampilkan informasi
    openNewPageWithInfo();
    
});

// Fungsi untuk membuka halaman baru dengan informasi yang dipilih
function openNewPageWithInfo() {
    const dataToPass = encodeURIComponent(JSON.stringify(selectedData));
    // Ganti 'nama_halaman_baru.html' dengan nama file halaman baru
    window.open("detaildatakaryawan.html?data=" + dataToPass, "_blank");
}


// Fungsi untuk melakukan filter data berdasarkan nama
function filterDataByName(searchString) {
const dbRef = ref(database);
const filteredData = [];

get(child(dbRef, "karyawan"))
    .then((snapshot) => {
    if (snapshot.exists()) {
        var data = snapshot.val();

        for (var key in data) {
        const value = data[key];
            if (value.nama.toLowerCase().includes(searchString.toLowerCase())) {
                filteredData.push(value);
            }
        }

        // Menampilkan data yang telah difilter
        displayFilteredData(filteredData);
    } else {
        console.log("No data available");
    }
    })
    .catch((error) => {
    console.error(error);
    });
}


function displayFilteredData(filteredData) {
    let htmldata = "";
    let count = 1;

    filteredData.forEach((value) => {
    if (count % 2 === 0) {
        htmldata +=
        '<tr class="tabel-genap"> <td>' +
        value.departemen +
        '</td> <td >' +
        value.nama +
        '</td> <td >' +
        value.jeniskelamin +
        '</td> <td class="text-center">' +
        value.nik +
        '</td> <td class="text-center">' +
        value.nip +
        '</td> <td> ' +
        value.jabatan +
        '</td> </tr>';
        count++;
    } else {
        htmldata +=
        '<tr class="tabel-ganjil"> <td>' +
        value.departemen +
        '</td> <td >' +
        value.nama +
        '</td> <td >' +
        value.jeniskelamin +
        '</td> <td class="text-center">' +
        value.nik +
        '</td> <td class="text-center">' +
        value.nip +
        '</td> <td> ' +
        value.jabatan +
        '</td> </tr>';
        count++;
    }
    });

    datacontainer.innerHTML = htmldata;

    console.log("Data ditampilkan di tabel setelah difilter");
}