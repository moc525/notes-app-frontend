export function formatDateTime(dateTimeString: string): string {
    return new Date(dateTimeString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
}