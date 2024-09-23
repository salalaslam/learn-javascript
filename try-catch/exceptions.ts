/**
 * Custom exception for errors occurring during data processing.
 */
export class ProcessDataException extends Error {
  public code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ProcessDataException';
    this.code = code;
    Object.setPrototypeOf(this, ProcessDataException.prototype); // Ensure correct prototype chain
  }
}

/**
 * Custom exception for errors occurring during data fetching.
 */
export class GetDataException extends Error {
  public code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'GetDataException';
    this.code = code;
    Object.setPrototypeOf(this, GetDataException.prototype); // Ensure correct prototype chain
  }
}
