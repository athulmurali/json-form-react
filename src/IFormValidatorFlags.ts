/**
 * Form class for managing form state and tracking changes.
 */
export default interface IFormValidatorFlags {
  /**
   * Stores the current value of the form field.
   */
  value?: any;

  /**
   * Indicates whether the field has been interacted with or "touched" by the user.
   */
  touched?: boolean;

  /**
   * Signifies whether the field's value has changed since it was initially loaded or set.
   */
  dirty?: boolean;

  /**
   * Holds any validation errors associated with the form field.
   */
  error?: Error;

  /**
   * Determines whether the field is currently disabled or not.
   */
  disabled?: boolean;

  /**
   * Indicates whether the field is required for form submission.
   */
  required?: boolean;

  /**
   * Represents the overall validity of the field's value after validation checks.
   */
  valid?: boolean;

  /**
   * Tracks whether the field has been visited or focused by the user.
   */
  visited?: boolean;

  /**
   * Signifies whether the field is in its initial state or has been modified.
   */
  pristine?: boolean;

  /**
   * Indicates whether the form has been successfully submitted.
   */
  submitted?: boolean;

}