// Data dummy untuk catatan
const notesData = [
    {
        id: 'notes-jT-jjsyz61J8XKiI',
        title: 'Welcome to Notes, Dimas!',
        body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
        createdAt: '2022-07-28T10:03:12.594Z',
        archived: false,
      },
      {
        id: 'notes-aB-cdefg12345',
        title: 'Meeting Agenda',
        body: 'Discuss project updates and assign tasks for the upcoming week.',
        createdAt: '2022-08-05T15:30:00.000Z',
        archived: false,
      },
      {
        id: 'notes-XyZ-789012345',
        title: 'Shopping List',
        body: 'Milk, eggs, bread, fruits, and vegetables.',
        createdAt: '2022-08-10T08:45:23.120Z',
        archived: false,
      },
      {
        id: 'notes-1a-2b3c4d5e6f',
        title: 'Personal Goals',
        body: 'Read two books per month, exercise three times a week, learn a new language.',
        createdAt: '2022-08-15T18:12:55.789Z',
        archived: false,
      },
      {
        id: 'notes-LMN-456789',
        title: 'Recipe: Spaghetti Bolognese',
        body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
        createdAt: '2022-08-20T12:30:40.200Z',
        archived: false,
      },
      {
        id: 'notes-QwErTyUiOp',
        title: 'Workout Routine',
        body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
        createdAt: '2022-08-25T09:15:17.890Z',
        archived: false,
      },
      {
        id: 'notes-abcdef-987654',
        title: 'Book Recommendations',
        body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
        createdAt: '2022-09-01T14:20:05.321Z',
        archived: false,
      },
      {
        id: 'notes-zyxwv-54321',
        title: 'Daily Reflections',
        body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
        createdAt: '2022-09-07T20:40:30.150Z',
        archived: false,
      },
      {
        id: 'notes-poiuyt-987654',
        title: 'Travel Bucket List',
        body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
        createdAt: '2022-09-15T11:55:44.678Z',
        archived: false,
      },
      {
        id: 'notes-asdfgh-123456',
        title: 'Coding Projects',
        body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
        createdAt: '2022-09-20T17:10:12.987Z',
        archived: false,
      },
      {
        id: 'notes-5678-abcd-efgh',
        title: 'Project Deadline',
        body: 'Complete project tasks by the deadline on October 1st.',
        createdAt: '2022-09-28T14:00:00.000Z',
        archived: false,
      },
      {
        id: 'notes-9876-wxyz-1234',
        title: 'Health Checkup',
        body: 'Schedule a routine health checkup with the doctor.',
        createdAt: '2022-10-05T09:30:45.600Z',
        archived: false,
      },
      {
        id: 'notes-qwerty-8765-4321',
        title: 'Financial Goals',
        body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
        createdAt: '2022-10-12T12:15:30.890Z',
        archived: false,
      },
      {
        id: 'notes-98765-54321-12345',
        title: 'Holiday Plans',
        body: 'Research and plan for the upcoming holiday destination.',
        createdAt: '2022-10-20T16:45:00.000Z',
        archived: false,
      },
      {
        id: 'notes-1234-abcd-5678',
        title: 'Language Learning',
        body: 'Practice Spanish vocabulary for 30 minutes every day.',
        createdAt: '2022-10-28T08:00:20.120Z',
        archived: false,
      },
];

// Variable untuk menyimpan indeks catatan yang sedang diedit
let editingNoteIndex = -1;

// Custom Element untuk App Bar
class AppBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .app-bar {
                    background-color: #6200ea;
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    font-size: 1.5rem;
                }
            </style>
            <div class="app-bar">Notes App</div>
        `;
    }
}

// Custom Element untuk Note Form
class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        // Akses elemen form dari shadow DOM
        const form = this.shadowRoot.getElementById('noteForm');
        const noteTitleInput = this.shadowRoot.getElementById('noteTitle');
        const noteBodyInput = this.shadowRoot.getElementById('noteBody');

        // Tangani submit form
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const noteTitle = noteTitleInput.value;
            const noteBody = noteBodyInput.value;

            // Validasi sederhana
            if (noteTitle.length >= 3 && noteBody.length >= 5) {
                if (editingNoteIndex > -1) {
                    // Update catatan yang ada
                    notesData[editingNoteIndex] = {
                        ...notesData[editingNoteIndex],
                        title: noteTitle,
                        body: noteBody,
                        createdAt: new Date().toISOString()
                    };
                    editingNoteIndex = -1;
                } else {
                    // Tambahkan catatan baru
                    notesData.push({
                        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
                        title: noteTitle,
                        body: noteBody,
                        createdAt: new Date().toISOString(),
                        archived: false
                    });
                }

                // Tampilkan ulang daftar catatan
                displayNotes();

                // Reset form setelah menambah atau mengedit catatan
                form.reset();

                // Reset warna border
                noteTitleInput.style.borderColor = '';
                noteBodyInput.style.borderColor = '';
            } else {
                alert('Please ensure the title is at least 3 characters and body is at least 5 characters.');
            }
        });

        // Realtime validation untuk input form
        noteTitleInput.addEventListener('input', () => {
            if (noteTitleInput.value.length < 3) {
                noteTitleInput.style.borderColor = 'red';
            } else {
                noteTitleInput.style.borderColor = 'green';
            }
        });

        noteBodyInput.addEventListener('input', () => {
            if (noteBodyInput.value.length < 5) {
                noteBodyInput.style.borderColor = 'red';
            } else {
                noteBodyInput.style.borderColor = 'green';
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .form {
                    margin-bottom: 1.5rem;
                }
                input, textarea {
                    display: block;
                    width: 100%;
                    padding: 0.5rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    padding: 0.5rem 1rem;
                    background-color: #6200ea;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            </style>
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Title" required />
                <textarea id="noteBody" placeholder="Body" required></textarea>
                <button type="submit">Add Note</button>
            </form>
        `;
    }
}

// Custom Element untuk Note Item
class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const body = this.getAttribute('body');
        const createdAt = this.getAttribute('createdAt');
        this.render(title, body, createdAt);
    }

    render(title, body, createdAt) {
        this.shadowRoot.innerHTML = `
            <style>
                .note {
                    border: 1px solid #ddd;
                    padding: 1rem;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    margin-bottom: 1rem;
                }
                h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.2rem;
                    color: #333;
                }
                p {
                    margin: 0;
                    color: #555;
                }
                .date {
                    font-size: 0.9rem;
                    color: #888;
                }
                .actions {
                    margin-top: 1rem;
                }
                .edit-btn {
                    background-color: #03a9f4;
                    border: none;
                    color: white;
                    padding: 0.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                }
            </style>
            <div class="note">
                <h3>${title}</h3>
                <p>${body}</p>
                <div class="date">${new Date(createdAt).toLocaleString()}</div>
                <div class="actions">
                    <button class="edit-btn">Edit</button>
                </div>
            </div>
        `;

        // Tambahkan event listener untuk tombol edit
        const editButton = this.shadowRoot.querySelector('.edit-btn');
        editButton.addEventListener('click', () => {
            // Update form untuk mode edit
            const noteForm = document.querySelector('note-form');
            const noteTitleInput = noteForm.shadowRoot.getElementById('noteTitle');
            const noteBodyInput = noteForm.shadowRoot.getElementById('noteBody');

            noteTitleInput.value = title;
            noteBodyInput.value = body;

            // Simpan indeks catatan yang sedang diedit
            editingNoteIndex = Array.from(document.querySelectorAll('note-item')).indexOf(this);
        });
    }
}

// Mendefinisikan custom element
customElements.define('app-bar', AppBar);
customElements.define('note-form', NoteForm);
customElements.define('note-item', NoteItem);

// Fungsi untuk menampilkan catatan
function displayNotes() {
    const notesGrid = document.getElementById('notesGrid');
    notesGrid.innerHTML = ''; // Kosongkan grid sebelum menampilkan catatan baru

    notesData.forEach(note => {
        const noteItem = document.createElement('note-item');
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('createdAt', note.createdAt);
        notesGrid.appendChild(noteItem);
    });
}

// Menampilkan catatan awal
displayNotes();
