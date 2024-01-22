import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);


    if (!response.ok) {
        const errorBody = await response.json();
        const errorMsg = errorBody.error;

        throw Error(errorMsg);
    }

    return response;
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes/all", { method: "GET" });
    return await response.json();

}

export interface NoteInput {
    title: string,
    text?: String
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });

    return await response.json();

}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        });

    return await response.json();

}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE" });
}