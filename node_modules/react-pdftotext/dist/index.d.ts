/**
 * Extracts text content from a PDF file.
 * @param {File | Blob | MediaSource} file - The PDF file to extract text from.
 * @returns {Promise<string>} A promise that resolves with the extracted text content.
 */
declare const pdfToText: (file: File | Blob | MediaSource) => Promise<string>;
export default pdfToText;
