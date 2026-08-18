/**
 * Dynamic Academic Session Calculator based on April 1st rule:
 * - April 1st to December 31st: Session is YYYY-(YYYY+1) (e.g. 2026-27)
 * - January 1st to March 31st: Session is (YYYY-1)-YYYY (e.g. 2026-27)
 */
export function getCurrentAcademicSession(date: Date = new Date(), format: 'short' | 'full' = 'short'): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed: 0 = Jan, 3 = April, 11 = Dec

  let startYear: number;
  let endYear: number;

  if (month >= 3) {
    // April 1 to Dec 31
    startYear = year;
    endYear = year + 1;
  } else {
    // Jan 1 to March 31
    startYear = year - 1;
    endYear = year;
  }

  if (format === 'short') {
    const shortEndYear = String(endYear).slice(-2);
    return `${startYear}-${shortEndYear}`; // e.g. "2026-27"
  }

  return `${startYear}-${endYear}`; // e.g. "2026-2027"
}
