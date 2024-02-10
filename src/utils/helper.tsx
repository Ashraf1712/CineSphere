const formattedDate = (dateString: string): string => {
    const months: string[] = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const date: Date = new Date(dateString);
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day}, ${year}`;
};

export default formattedDate;
