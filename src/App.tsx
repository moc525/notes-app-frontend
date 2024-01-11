import styles from "./styles/NotesPage.module.css";
import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';

import * as NotesAPI from "./network/notes_api";
import AddNoteDialogue from "./components/AddNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesAPI.fetchNotes();
        setNotes(notes);

      } catch (error) {
        alert(error);
      }
    }

    loadNotes();

  }, []);

  return (
    <Container>

      <Button className={styles.addButton} onClick={() => setShowAddNoteDialogue(true)}>
        Add a new note
      </Button>

      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map(note => (
          <Col key={note._id} >
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialogue &&
        <AddNoteDialogue
          onDismiss={() => setShowAddNoteDialogue(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialogue(false);
          }} />
      }
    </Container>
  );
}

export default App;
