export const formatDate = (date) => {
    const adjustedDate = calcTimezoneOffset(date); 
    return `${adjustedDate.getMonth() + 1}-${adjustedDate.getDate()}`; // add one to month because 0 index 
}

export const calcTimezoneOffset = (date) => {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset); 
}