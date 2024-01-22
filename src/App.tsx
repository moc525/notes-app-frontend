import styles from "./styles/NotesPage.module.css";
import utilStyles from "./styles/utils.module.css";
import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";

import * as NotesAPI from "./network/notes_api";
import AddEditNoteDialogue from "./components/AddEditNoteDialogue";

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([]);
	const [notesLoading, setNotesLoading] = useState(true);
	const [showNotesLoadingErr, setShowNotesLoadingErr] = useState(false);

	const [showAddNoteDialogue, setShowAddNoteDialogue] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

	useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingErr(false);
				setNotesLoading(true);

				const notes = await NotesAPI.fetchNotes();
				setNotes(notes);

			} catch (error) {
				alert(error);

				setShowNotesLoadingErr(true);
			} finally {
				setNotesLoading(false);
			}
		}

		loadNotes();

	}, []);

	async function deleteNote(note: NoteModel) {
		try {
			await NotesAPI.deleteNote(note._id);
			setNotes(notes.filter(existingNote => existingNote._id !== note._id));

		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	const notesGrid =
		<Row xs={1} md={2} xl={3} className={`${styles.notesGrid} g-4`}>
			{notes.map(note => (
				<Col key={note._id} >
					<Note
						note={note}
						className={styles.note}
						onNoteDelete={deleteNote}
						onNoteClicked={setNoteToEdit}
					/>
				</Col>
			))}
		</Row>

	return (
		<Container className={`${styles.notesPage}`}>

			<Button
				id="AddEditButton"
				className={`mb-4 ${utilStyles.blockCenter} ${utilStyles.flexCenter}`}
				onClick={() => setShowAddNoteDialogue(true)}
				disabled={notesLoading || showNotesLoadingErr}>
				<FaPlus />
				Add a new note
			</Button>

			{notesLoading &&
				<Spinner
					animation="border"
					variant="primary" />
				
			}

			{showNotesLoadingErr &&
				<p>Something went wrong. Please refresh the page.</p>
			}

			{!notesLoading && !showNotesLoadingErr &&
				<>
					{
						notes.length > 0 ? notesGrid : <p>You don't have any notes yet...</p>
					}
				</>
			}

			{showAddNoteDialogue &&
				<AddEditNoteDialogue
					onDismiss={() => setShowAddNoteDialogue(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setShowAddNoteDialogue(false);
					}} />
			}

			{noteToEdit &&
				<AddEditNoteDialogue
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
						setNoteToEdit(null);
					}} />
			}
		</Container>
	);
}

export default App;
