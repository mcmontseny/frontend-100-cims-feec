export const formatDistance = (distanceInMeters: number): string => {
    const distanceInKm = distanceInMeters / 1000;

    const thirdDecimal = Math.floor((distanceInKm * 1000) % 10);

    const roundedKm = thirdDecimal > 7
        ? Math.ceil(distanceInKm * 100) / 100
        : Math.floor(distanceInKm * 100) / 100;

    return `${new Intl.NumberFormat('ca-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(roundedKm)} km`;
}

export const formatTime = (totalSeconds: number): string => {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let result = "";

    if (days > 0) {
        result += `${days}d `;
    }
    if (hours > 0 || days > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        result += `${minutes}min `;
    }
    result += `${seconds}s`;

    return result.trim();
}

export const convertSpeedToKmh = (speedInMetersPerSecond: number): string => {
    return new Intl.NumberFormat('ca-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(+((speedInMetersPerSecond * 3.6).toFixed(1)));

}

export const formatDateLongWithTime = (dateString: string): string => {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat('ca-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedDate = formatter.format(date);

    return formattedDate.replace(',', '');
}