let currentEditNote = null; // Menyimpan catatan yang sedang diedit

document.getElementById('notes-form').addEventListener('submit', function(event) {
event.preventDefault(); 

const title = document.getElementById('title').value;
const description = document.getElementById('description').value;
const date = document.getElementById('date').value;

let noteItem; 

if (currentEditNote) {
    currentEditNote.querySelector('h3').textContent = title;
    currentEditNote.querySelector('p').textContent = description;
    currentEditNote.querySelector('small').textContent = `Tanggal: ${date}`;

    document.getElementById('submit-button').textContent = 'Add Notes';
    currentEditNote = null; 
} else {
    noteItem = document.createElement('li');
    noteItem.classList.add('fade-in');

    const noteTitle = document.createElement('h3');
    noteTitle.textContent = title;
        
    const noteDescription = document.createElement('p');
    noteDescription.textContent = description;
        
    const noteDate = document.createElement('small');
    noteDate.textContent = `Tanggal: ${date}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.onclick = function() {
        document.getElementById('title').value = title;
        document.getElementById('description').value = description;
        document.getElementById('date').value = date;

        document.getElementById('submit-button').textContent = 'Change Notes';

        currentEditNote = noteItem;
    };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            noteItem.classList.add('slide-out');
    
            noteItem.addEventListener('transitionend', function() {
                noteItem.remove();
                checkNotesVisibility(); 
            });
        };

        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteDescription);
        noteItem.appendChild(noteDate);
        noteItem.appendChild(editButton);
        noteItem.appendChild(deleteButton);
        document.getElementById('notes-container').appendChild(noteItem);

        setTimeout(() => {
        noteItem.classList.add('show');
        }, 10); 
    }

    document.getElementById('notes-form').reset();

    checkNotesVisibility();

    if (!currentEditNote) {
        noteItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

function checkNotesVisibility() {
    const notesContainer = document.getElementById('notes-container');
    const notesListSection = document.querySelector('.notes-list'); 

    if (notesContainer.children.length === 0) {
        notesListSection.style.display = 'none'; 
    } else {
        notesListSection.style.display = 'block'; 
    }
}

checkNotesVisibility();
