import { API_URL } from './constants';

export async function displayNotes() {
  const notesGrid = document.getElementById("notesGrid");
  notesGrid.innerHTML = ""; 

  document.getElementById("loading").style.display = "block";

  try {
    const response = await fetch(API_URL);
    const { data: notes } = await response.json();

    notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("id", note.id);
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("createdAt", note.createdAt);
      notesGrid.appendChild(noteItem);
    });
  } catch (error) {
    alert("Failed to fetch notes. Please try again.");
    console.error("Error fetching notes:", error);
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}
