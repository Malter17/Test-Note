import { API_URL } from '../utils/constants';
import { displayNotes } from '../utils/displayNotes';
import gsap from 'gsap';

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
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
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
          font-size: 0.8rem;
          color: #aaa;
        }
        .delete-button, .archive-button {
          margin-top: 0.5rem;
          cursor: pointer;
          padding: 0.5rem;
          background-color: #6200ea;
          color: white;
          border: none;
          border-radius: 3px;
        }
        .delete-button {
          background-color: #e53935; /* Red color for delete */
        }
        .archive-button {
          background-color: #4caf50; /* Green color for archive */
        }
      </style>
      <div class="note">
        <h3>${title}</h3>
        <p>${body}</p>
        <p class="date">${new Date(createdAt).toLocaleString()}</p>
        <button class="delete-button">Delete</button>
        <button class="archive-button">Archive</button>
      </div>
    `;

    // GSAP Animation
    gsap.to(this.shadowRoot.querySelector('.note'), { opacity: 1, y: 0 });

    // Event Listener for Delete Button
    this.shadowRoot.querySelector('.delete-button').addEventListener('click', async () => {
      await this.deleteNote();
    });

    // Event Listener for Archive Button
    this.shadowRoot.querySelector('.archive-button').addEventListener('click', async () => {
      await this.archiveNote();
    });
  }

  async deleteNote() {
    const noteId = this.getAttribute('id');
    document.getElementById('loading').style.display = 'block';

    try {
      await fetch(`${API_URL}/${noteId}`, {
        method: 'DELETE',
      });
      displayNotes(); // Refresh the note list after deletion
    } catch (error) {
      alert('Failed to delete note. Please try again.');
      console.error('Error deleting note:', error);
    } finally {
      document.getElementById('loading').style.display = 'none';
    }
  }

  async archiveNote() {
    const noteId = this.getAttribute('id');
    document.getElementById('loading').style.display = 'block';

    try {
      await fetch(`${API_URL}/${noteId}/archive`, {
        method: 'POST',
      });
      displayNotes(); // Refresh the note list after archiving
    } catch (error) {
      alert('Failed to archive note. Please try again.');
      console.error('Error archiving note:', error);
    } finally {
      document.getElementById('loading').style.display = 'none';
    }
  }
}

customElements.define('note-item', NoteItem);
