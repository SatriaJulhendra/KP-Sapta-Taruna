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

    const inputDepartemen = document.getElementById("inDepartemen");
    const inputNama = document.getElementById("InNamaKaryawan");
    const inputJenisKelamin = document.getElementById("inJenisKelamin");
    const inputNik = document.getElementById("inNIK");
    const inputNip = document.getElementById("inNIP");
    const inputJabatan = document.getElementById("injabatan");
    const ButtonUpdate = document.getElementById("btn-update");
    const ButtonDelete = document.getElementById("btn-hapus");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const dataString = urlParams.get('data');
    const nama = JSON.parse(decodeURIComponent(dataString));

    getDataByNama(nama);

    ButtonUpdate.addEventListener("click", function() {
        updateDataKaryawan(inputNip.value);
    });
    
    ButtonDelete.addEventListener("click", function() {
        deleteDataKaryawan(inputNip.value);
    });
    
    function updateDataKaryawan(key) {
        const dbRef = ref(database);
    
        get(child(dbRef, 'karyawan/' + key))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    data.departemen = inputDepartemen.value;
                    data.nama = inputNama.value;
                    data.jeniskelamin = inputJenisKelamin.value;
                    data.nik = inputNik.value;
                    data.nip = inputNip.value;
                    data.jabatan = inputJabatan.value;

                    // Update data pada Firebase
                    update(child(dbRef, 'karyawan/' + key), data)
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


    function deleteDataKaryawan(key){
        const dbRef = ref(database);

        remove(child(dbRef, "karyawan/" + key))
        .then(() => {
            alert("Data Berhasil Di Hapus");
            window.location.href = "datakaryawan.html";
        })
        .catch((error) => {
            alert("Data Gagal Di Hapus");
            console.log(error);
        });
    }


    // Fungsi untuk mengambil data berdasarkan "nama" sebagai unik ID
    function getDataByNama(nip) {
        const dbRef = ref(database);

        get(child(dbRef, 'karyawan/' + nip)).then((snapshot) => {
            if (snapshot.exists()) {
            const data = snapshot.val();
            inputDepartemen.value = data.departemen;
            inputNama.value = data.nama;
            inputJenisKelamin.value = data.jeniskelamin;
            inputNik.value = data.nik;
            inputNip.value = data.nip;
            inputJabatan.value = data.jabatan;


            } else {
                console.log('Data tidak ditemukan');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

