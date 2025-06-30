/**
 * Utility functions for the application
 */

/**
 * Handles downloading CSV data as a file
 * @param csvContent - The CSV content as a string
 * @param filename - Optional filename, defaults to a date-based name
 */
export function downloadCsv(csvContent: string, filename?: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `canvassing-data-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats a date string to a localized format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString();
}
