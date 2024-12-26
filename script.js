let currentEditNote = null; // Menyimpan catatan yang sedang diedit

document.getElementById('notes-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Mengambil nilai input dari form notes
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    let noteItem; 

    if (currentEditNote) {
        // Jika sedang mengedit, perbarui catatan yang ada
        currentEditNote.querySelector('h3').textContent = title;
        currentEditNote.querySelector('p').textContent = description;
        currentEditNote.querySelector('small').textContent = `Tanggal: ${date}`;

        // Reset tombol dan variabel edit
        document.getElementById('submit-button').textContent = 'Add Notes';
        currentEditNote = null; // Reset untuk edit berikutnya
    } else {
        // Membuat elemen baru untuk catatan
        noteItem = document.createElement('li');
        noteItem.classList.add('fade-in');

        // Membuat elemen untuk judul
        const noteTitle = document.createElement('h3');
        noteTitle.textContent = title;

        // Membuat elemen untuk deskripsi
        const noteDescription = document.createElement('p');
        noteDescription.textContent = description;

        // Membuat elemen untuk tanggal
        const noteDate = document.createElement('small');
        noteDate.textContent = `Tanggal: ${date}`;

        // Membuat tombol edit
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = function() {
            // Mengisi form dengan nilai catatan yang ada
            document.getElementById('title').value = title;
            document.getElementById('description').value = description;
            document.getElementById('date').value = date;

            // Mengubah teks tombol menjadi "Change Notes"
            document.getElementById('submit-button').textContent = 'Change Notes';

            // Menyimpan catatan yang sedang diedit
            currentEditNote = noteItem; // Simpan referensi catatan yang sedang diedit
        };

        // Membuat tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            noteItem.classList.add('slide-out'); // Tambahkan kelas slide-out
    
            // Tunggu animasi selesai sebelum menghapus elemen
            noteItem.addEventListener('transitionend', function() {
                noteItem.remove();
                checkNotesVisibility(); // Periksa kembali visibilitas daftar catatan
            });
        };

        // Menambahkan semua elemen ke dalam noteItem
        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteDescription);
        noteItem.appendChild(noteDate);
        noteItem.appendChild(editButton);
        noteItem.appendChild(deleteButton);

        // Menambahkan catatan ke dalam container
        document.getElementById('notes-container').appendChild(noteItem);

        // Menggunakan setTimeout untuk menambahkan kelas show setelah catatan ditambahkan
        setTimeout(() => {
        noteItem.classList.add('show');
        }, 10); // Delay kecil untuk memastikan animasi berfungsi
    }

    // Mengosongkan isi formnya setelah catatannya berhasil ditambahkan
    document.getElementById('notes-form').reset();

    // Periksa visibilitas daftar catatan
    checkNotesVisibility();

    // Menambahkan sedikit animasi scroll ke catatan yang baru ditambah
    if (!currentEditNote) {
        noteItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Fungsi untuk memeriksa visibilitas daftar catatan
function checkNotesVisibility() {
    const notesContainer = document.getElementById('notes-container');
    const notesListSection = document.querySelector('.notes-list'); // Ambil section notes-list

    if (notesContainer.children.length === 0) {
        notesListSection.style.display = 'none'; // Sembunyikan jika tidak ada catatan
    } else {
        notesListSection.style.display = 'block'; // Tampilkan jika ada catatan
    }
}

// Panggil fungsi saat halaman dimuat untuk menyembunyikan daftar catatan awal
checkNotesVisibility();