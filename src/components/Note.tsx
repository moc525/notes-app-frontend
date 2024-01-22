import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDateTime } from "../utils/dateFormatter";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onNoteDelete: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void,
    className?: string
}

const Note = ({ note, onNoteDelete, onNoteClicked, className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    let timeString: string = (updatedAt > createdAt ? "Updated: " + formatDateTime(updatedAt) : "Created: " + formatDateTime(createdAt));

    return (
        <Card
            className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}>

            <Card.Body className={`${styles.cardBody}`}>
                <Card.Title className={`${styles.cardTitle} ${styleUtils.flexCenter}`}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onNoteDelete(note);
                            e.stopPropagation();
                        }}>

                    </MdDelete>
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {timeString}
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Note;