import React, { useState } from "react";
import { FormStore } from "./FormStore";
import { FormComponentProps, IFieldState, IFormState } from "./IStates";



/**
 * FormComponent is a recursive component that renders a form or field based on the provided state.
 * It allows updating the form or field value using the handleFieldChange function.
 */
export function FormComponent(props: FormComponentProps) {
  const [form, setForm] = useState(props.forms.getForm(props.formName));

  /**
   * Handles the change of a form field value.
   * Updates the form state with the new value at the specified field path.
   *
   * @param fieldName - Name of the field being changed
   * @param value - New value of the field
   * @param fieldPath - Path to the field in the form
   */
  const handleFieldChange = (fieldName: string, value: any, fieldPath: string[]) => {
    const formCopy = { ...form };
    let currentField: { [x: string]: IFormState | IFieldState } = formCopy;

    // Traverse the field path to reach the target field
    for (const path of fieldPath) {
      currentField = currentField[path] as { [x: string]: IFormState | IFieldState };
    }

    // Update the field value
    currentField.value = value;

    // Update the form state
    setForm(formCopy);
  };

  /**
   * Renders a field or nested form based on its type.
   * Recursively calls itself for nested forms.
   *
   * @param fieldKey - Key of the current field or form
   * @param field - Current field or form state
   * @param fieldPath - Path to the current field or form
   * @returns JSX element representing the field or form
   */
  const renderField = (fieldKey: string, field: IFieldState | IFormState, fieldPath: string[]) => {
    const currentFieldPath = [...fieldPath, fieldKey];
    console.log("currentFieldPath ", currentFieldPath.join("."));

    let fieldValue;
    if ( field ?. value) {
      fieldValue = field.value;
      return (
        <div key={1000000 * Math.random()}>
          <label key={1000000 * Math.random()}>{fieldKey}</label>
          <input
            key={1000000 * Math.random()}
            type="text"
            // value={fieldValue}
            onChange={(e) => handleFieldChange(fieldKey, e.target.value, currentFieldPath)}
          />
        </div>
      );
    } else {
      Array.from(Object.keys(field || {})).map(k => console.log(k, field[k]));
      return (
        <fieldset key={1000000 * Math.random()}>
          <legend>{fieldKey}</legend>
          {Object.keys(field || {}).map(k => renderField(k, field[k], currentFieldPath))}
        </fieldset>
      );
    }
  };

  /**
   * Renders the form and its fields recursively.
   *
   * @param formKey - Key of the current form
   * @param form - Current form state
   * @param fieldPath - Path to the current field or form
   * @returns JSX element representing the form
   */

  const renderForm = (formKey: string, form: IFormState, fieldPath: string[]) => {
    const fieldKeys = Object.keys(form);
    const fieldsJSX = fieldKeys.map((k) => renderField(k, form[k], fieldPath));
    return (
      <form>
        <h1 key={1000000 * Math.random()} style={{ textAlign: "center" }}>Test form</h1>
        <fieldset key={1000000 * Math.random()}>
          <legend key={1000000 * Math.random()}>{formKey}</legend>
          {fieldsJSX}
        </fieldset>
      </form>
    );
  };

  if (!form) {
    return null;
  }

  return renderForm(props.formName || "", form, []);
}

const formStore = new FormStore();
const rootForm = formStore.getForm("personalDetails");

/**
 * RootFormComponent is the top-level component that renders the root form.
 * It uses the FormComponent to render the form based on the provided form state.
 */
export const RootFormComponent = () => {
  const [form, setForm] = useState(formStore.getForm("personalDetails"));

  return <FormComponent forms={formStore} form={rootForm} path={["forms"]} formName="personalDetails" />
};

  
