const API_URL = "https://notes-api.dicoding.dev/v2/notes";

import './components/AppBar';
import './components/NoteForm';
import './components/NoteItem';
import { displayNotes } from './utils/displayNotes';

window.onload = displayNotes;
