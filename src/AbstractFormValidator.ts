import IFormValidator from './IFormValidatorFlags';

/**
 * Abstract class for managing form state and tracking changes.
 */
abstract class AbstractFormValidator implements IFormValidator {
  value?: any;
  touched?: boolean;
  dirty?: boolean;
  error?: any;
  disabled?: boolean;
  required?: boolean;
  valid?: boolean;
  visited?: boolean;
  pristine?: boolean;
  submitted?: boolean;

  /**
   * Sets the value of the form field.
   * @param value - The value to be set.
   */
  setValue(value?: any): void {
    this.value = value;
  }

  /**
   * Sets the touched flag to true.
   */
  setTouched(): void {
    this.touched = true;
  }

  /**
   * Sets the dirty flag to true.
   */
  setDirty(): void {
    this.dirty = true;
  }

  /**
   * Sets the validation error for the form field.
   * @param error - The validation error to be set.
   */
  setError(error?: any): void {
    this.error = error;
  }

  /**
   * Sets the disabled flag.
   * @param disabled - The value to set for the disabled flag.
   */
  setDisabled(disabled?: boolean): void {
    this.disabled = disabled;
  }
}

export default AbstractFormValidator;
