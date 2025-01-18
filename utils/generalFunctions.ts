export const getTimeAgo = (time: number) => {
    const now = new Date();
    const givenTime = new Date(time);
    const differenceInMs = now.getTime() - givenTime.getTime(); // Difference in milliseconds
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    if (differenceInSeconds < 60) return 'Just now';

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) {
        return differenceInMinutes === 1
            ? '1 minute ago'
            : `${differenceInMinutes} minutes ago`;
    }

    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) {
        return differenceInHours === 1
            ? '1 hour ago'
            : `${differenceInHours} hours ago`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInDays < 7) {
        return differenceInDays === 1
            ? '1 day ago'
            : `${differenceInDays} days ago`;
    }

    const differenceInWeeks = Math.floor(differenceInDays / 7);
    if (differenceInWeeks < 4) {
        return differenceInWeeks === 1
            ? '1 week ago'
            : `${differenceInWeeks} weeks ago`;
    }

    const differenceInMonths = Math.floor(differenceInDays / 30);
    if (differenceInMonths < 12) {
        return differenceInMonths === 1
            ? '1 month ago'
            : `${differenceInMonths} months ago`;
    }

    const differenceInYears = Math.floor(differenceInDays / 365);
    return differenceInYears === 1
        ? '1 year ago'
        : `${differenceInYears} years ago`;
};

export const truncateAddress = (address: string) => {
    if (!address || address.length < 10) {
        return address;
    }
    const prefix = address.slice(0, 4);
    const suffix = address.slice(-4);

    return `${prefix}•••${suffix}`;
}