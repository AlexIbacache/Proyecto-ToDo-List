export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Hace un momento";
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Hace ${minutes}m`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Hace ${hours}h`;
    }
    if (diffInSeconds < 86400 * 30) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Hace ${days}d`;
    }

    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recientemente";
  }
}
