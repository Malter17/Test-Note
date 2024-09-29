import { API_URL } from '../utils/constants';
import { displayNotes } from '../utils/displayNotes';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    const form = this.shadowRoot.getElementById("noteForm");
    const noteTitleInput = this.shadowRoot.getElementById("noteTitle");
    const noteBodyInput = this.shadowRoot.getElementById("noteBody");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const noteTitle = noteTitleInput.value;
      const noteBody = noteBodyInput.value;

      if (noteTitle.length >= 3 && noteBody.length >= 5) {
        await this.addNote({
          title: noteTitle,
          body: noteBody,
        });

        form.reset();
        displayNotes();
      } else {
        alert("Please ensure the title is at least 3 characters and body is at least 5 characters.");
      }
    });
  }

  async addNote(note) {
    document.getElementById("loading").style.display = "block";

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
    } catch (error) {
      alert("Failed to add note. Please try again.");
      console.error("Error adding note:", error);
    } finally {
      document.getElementById("loading").style.display = "none";
    }
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

customElements.define("note-form", NoteForm);
