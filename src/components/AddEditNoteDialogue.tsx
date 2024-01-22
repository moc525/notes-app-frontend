import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import { useForm } from "react-hook-form";
import * as NotesAPI from "../network/notes_api";

interface AddEditNoteDialogueProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const AddEditNoteDialogue = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogueProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;

            if (noteToEdit) {
                noteResponse = await NotesAPI.updateNote(noteToEdit._id, input);
            }
            else {
                noteResponse = await NotesAPI.createNote(input);
            }
            onNoteSaved(noteResponse);

        } catch (error) {
            alert(error);
        }
    }

    return (
        <Modal show onHide={() => onDismiss()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="AddEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" placeholder="Text" rows={5} {...register("text")} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="AddEditNoteForm"
                    disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialogue;