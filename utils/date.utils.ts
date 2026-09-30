/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export function getFutureExpirationDate(yearsToAdd: number = 3): string {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + yearsToAdd);
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = futureDate.getFullYear(); // Повний рік (YYYY)
  
    return `${month}/${year}`;
  }