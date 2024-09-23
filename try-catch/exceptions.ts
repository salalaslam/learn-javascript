export class ProcessDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProcessDataException';
  }
}

export class GetDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GetDataException';
  }
}
