import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDateTime } from "../utils/dateFormatter";

interface NoteProps {
    note: NoteModel,
    className?: string
}

const Note = ({ note, className }: NoteProps ) => {
    const {
        title,
        text,
        createdAt,
        updatedAt    
    } = note;

    let timeString: string = (updatedAt > createdAt ? "Updated: " + formatDateTime(updatedAt) : "Created: " + formatDateTime(createdAt));

    return (
        <Card className={`${styles.noteCard} ${className}`}>
            <Card.Body className={`${styles.cardBody}`}>
                <Card.Title className={`${styles.cardTitle}`}>{title}</Card.Title>
                <Card.Text className={styles.cardText}>{text}</Card.Text>
                <Card.Footer className="text-muted">{timeString}</Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Note;