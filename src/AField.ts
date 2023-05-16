/**
 * Interface representing a field error.
 */
interface FieldError {
  message: string;
}

/**
 * Abstract class for a field.
 */
export abstract class Field {
  protected value: any;
  protected hidden: boolean;
  protected error: FieldError | null;

  constructor(value: any, hidden: boolean) {
    this.value = value;
    this.hidden = hidden;
    this.error = null;
  }

  /**
   * Validates the field.
   * @returns True if the field is valid, false otherwise.
   */
  abstract validate(): boolean;

  /**
   * Gets the value of the field.
   * @returns The value of the field.
   */
  getValue(): any {
    return this.value;
  }

  /**
   * Sets the value of the field.
   * @param value - The value to be set.
   */
  setValue(value: any): void {
    this.value = value;
  }

  /**
   * Gets the hidden status of the field.
   * @returns True if the field is hidden, false otherwise.
   */
  isHidden(): boolean {
    return this.hidden;
  }

  /**
   * Sets the hidden status of the field.
   * @param hidden - The hidden status to be set.
   */
  setHidden(hidden: boolean): void {
    this.hidden = hidden;
  }

  /**
   * Sets an error for the field.
   * @param message - The error message. 
   */
  setError(message: string): void {
    this.error = { message };
  }

  /**
   * Clears the error for the field.
   */
  clearError(): void {
    this.error = null;
  }

  /**
   * Gets the error for the field.
   * @returns The error object or null if no error exists.
   */
  getError(): FieldError | null {
    return this.error;
  }
}
