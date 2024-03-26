// Function to convert an array of objects to a CSV string
export function convertToCSV(objArray: any[]): string {
    // Extract the keys (headers) from the first object in the array
    const header = Object.keys(objArray[0]).join(',');
    // Extract the values from each object and join them with commas
    const rows = objArray.map(obj => Object.values(obj).join(','));
    // Combine the header and rows with newline characters
    return header + '\n' + rows.join('\n');
}