import AbstractField from './AField';

/**
 * Class representing a field set.
 */
abstract class FieldSet {
  private fields: { [key: string]: AbstractField };

  constructor() {
    this.fields = {};
  }

  /**
   * Adds a field to the field set.
   * @param key - The key for the field.
   * @param field - The field object.
   */
  addField(key: string, field: AbstractField): void {
    this.fields[key] = field;
  }

  /**
   * Validates the field set by iterating over all fields with hidden set to false.
   * @returns True if all visible fields in the field set are valid, false otherwise.
   */
  validate(): boolean {
    const fieldKeys = Object.keys(this.fields);
    for (const key of fieldKeys) {
      const field = this.fields[key];
      if (!field.isHidden()) {
        // Validate only visible fields (hidden = false)
        if (!field.validate()) {
          return false;
        }
      }
    }
    return true;
  }
}

export default FieldSet;
