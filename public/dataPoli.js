function initializePoli(config) {
    const app = firebase.initializeApp(config);
const db = app.firestore();

const container = document.getElementById('tabel-container');

// Tambahkan variabel global untuk mengingat mode edit
let isEditMode = false;
let currentDocId = null; // ID dokumen yang sedang diedit

// Fungsi untuk masuk ke mode edit
function enterEditMode(docId) {
    isEditMode = true;
    currentDocId = docId;
    // Nonaktifkan input yang tidak perlu diedit
    document.getElementById('namaPasien').disabled = true;
    document.getElementById('tempatLahir').disabled = true;
    document.getElementById('jenisKelamin').disabled = true;
    document.getElementById('riwayatPenyakit').disabled = true;
    document.getElementById('keluhan').disabled = true;
    // Tampilkan textarea untuk diagnosa, resep, dan saran
    document.getElementById('textareaDiagnosa').style.display = 'block';
    document.getElementById('textareaResep').style.display = 'block';
    document.getElementById('textareaSaran').style.display = 'block';
    document.getElementById('rujukanRadio').style.display = 'block';
    document.getElementById('rujukanLokasi').style.display = 'block';
    document.getElementById('rujukanAlasan').style.display = 'block';
    // Tampilkan tombol "Kirim"
    document.getElementById('kirimButton').style.display = 'block';
}

// Fungsi untuk keluar dari mode edit
function exitEditMode() {
    isEditMode = false;
    currentDocId = null;
    // Aktifkan kembali input yang dinonaktifkan
    document.getElementById('namaPasien').disabled = false;
    document.getElementById('tempatLahir').disabled = false;
    document.getElementById('jenisKelamin').disabled = false;
    document.getElementById('riwayatPenyakit').disabled = true;
    document.getElementById('keluhan').disabled = true;
    // Sembunyikan textarea diagnosa, resep, dan saran
    document.getElementById('textareaDiagnosa').style.display = 'none';
    document.getElementById('textareaResep').style.display = 'none';
    document.getElementById('textareaSaran').style.display = 'none';
    document.getElementById('rujukan').style.display = 'none';
    document.getElementById('rujukanLokasi').style.display = 'none';
    document.getElementById('rujukanAlasan').style.display = 'none';
    // Sembunyikan tombol "Kirim"
    document.getElementById('kirimButton').style.display = 'none';
}

// Fungsi untuk menyimpan perubahan ke Firebase Firestore
async function saveChanges() {
    const diagnosa = document.getElementById('textareaDiagnosa').value;
    const resep = document.getElementById('textareaResep').value;
    const saran = document.getElementById('textareaSaran').value;

    console.log('currentDocId:', currentDocId);
    console.log('diagnosa:', diagnosa);
    console.log('resep:', resep);
    
    if (currentDocId && diagnosa && resep && saran) {
        // Simpan diagnosa dan resep ke dokumen Firebase
        await db.collection('Pasien Gizi').doc(currentDocId).update({
            Diagnosa: diagnosa,
            Resep: resep,
            Saran: saran,
        });

        // Hapus elemen HTML terkait
        const table = document.querySelector(`[data-doc-id="${currentDocId}"]`);
        if (table) {
            table.remove();
        }

        // Hapus dokumen dari Firebase Firestore
        await db.collection('Pasien Gizi').doc(currentDocId).delete();

        alert('Perubahan berhasil disimpan dan dikirim ke Apotek!');
        // Keluar dari mode edit
        exitEditMode();
    } else {
        alert('Mohon melengkapi semua data pemeriksaan sebelum mengirim ke Apotek..');
    }
}

// Fungsi untuk menangani peristiwa tombol di dalam textarea
function handleKeyDown(event) {
    // Jika tombol Enter ditekan
    if (event.key === 'Enter') {
        event.preventDefault();
        insertBulletPoint();
    }
}

// Fungsi untuk menambahkan tanda strip pada posisi kursor
function insertBulletPoint() {
    const textarea = document.activeElement;
    const cursorPosition = textarea.selectionStart;

    // Mendapatkan teks sebelum dan sesudah posisi kursor
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const textAfterCursor = textarea.value.substring(cursorPosition);

    // Menambahkan tanda strip pada posisi kursor dan mengganti nilai textarea
    textarea.value = textBeforeCursor + '\n- ' + textAfterCursor;

    // Mengatur posisi kursor setelah tanda strip yang baru ditambahkan
    textarea.setSelectionRange(cursorPosition + 3, cursorPosition + 3);
}

db.collection(config.collectionName).onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
        const data = doc.data();

        // Create a new table for each data
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Nama Pasien</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><span id="namaPasien">${data["Nama Pasien"]}</span></td>
            </tr>
            <tr>
                <th>Tempat, Tanggal Lahir</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><span id="tempatLahir">${data["Tempat, Tanggal Lahir"]}</span></td>
            </tr>
            <tr>
                <th>Jenis Kelamin</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><span id="jenisKelamin">${data["Jenis Kelamin"]}</span></td>
            </tr>
            <tr>
                <th>Riwayat Penyakit</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><span id="riwayatPenyakit">${data["Riwayat Penyakit"]}</span></td>
            </tr>
            <tr>
                <th>Keluhan Saat Ini</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><span id="keluhan">${data["Keluhan saat ini"]}</span></td>
            </tr>
            <tr>
                <th>Diagnosa</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><textarea id="textareaDiagnosa" ${isEditMode ? "style='display: block;'" : "style='display: none;'"} onkeydown="handleKeyDown(event)">- ${data["Diagnosa"] ? data["Diagnosa"] : ''}</textarea></td>
            </tr>
            <tr>
                <th>Resep</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><textarea id="textareaResep" ${isEditMode ? "style='display: block;'" : "style='display: none;'"} onkeydown="handleKeyDown(event)">- ${data["Resep"] ? data["Resep"] : ''}</textarea></td>
            </tr>
            <tr>
                <th>Apakah perlu dirujuk?</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field" id="rujukanRadio" ${isEditMode ? "style='display: block;'" : "style='display: none;'"}>
                    <label>
                        <input type="radio" name="rujukan" id="radioDirujuk" value="Ya"> Ya
                    </label>
                    <label>
                        <input type="radio" name="rujukan" id="radioTidakDirujuk" value="Tidak"> Tidak
                    </label>
                </td>
            </tr>
            <tr>
                <th></th>
                <td></td>
                <td class="detail-field" id="rujukanLokasi" ${isEditMode ? "style='display: block;'" : "style='display: none;'"}>
                    <label class="labelRujukan">Jika Ya, masukkan lokasi dan alasan/tujuan rujukan dilakukan</label>
                    <input type="text" id="lokasiRujukan" placeholder="Kemana pasien dirujuk?">
                </td>
            </tr>
            <tr>
                <th></th>
                <td></td>
                <td class="detail-field" id="rujukanAlasan" ${isEditMode ? "style='display: block;'" : "style='display: none;'"}>
                    <input type="text" id="alasanRujukan" placeholder="Mengapa pasien perlu dirujuk?">
                </td>
            </tr>
            <tr>
                <th>Saran Dokter</th>
                <td class="col-titik-dua">:</td>
                <td class="detail-field"><textarea id="textareaSaran" ${isEditMode ? "style='display: block;'" : "style='display: none;'"} onkeydown="handleKeyDown(event)">- ${data["Saran"] ? data["Saran"] : ''}</textarea></td>
            </tr>
            <tr>
                <th></th>
                <td></td>
                <td class="detail-field">
                    <button id="kirimButton" style="${isEditMode ? 'display: block;' : 'display: none;'}" onclick="saveChanges()">Kirim</button>
                </td>
            </tr>
        `;

        // Append the new table to the container
        container.appendChild(table);

        // Menambahkan event listener untuk mengaktifkan mode edit
        table.addEventListener('click', () => {
            if (!isEditMode) {
                enterEditMode(doc.id);
            }
        });
    });
  });
}