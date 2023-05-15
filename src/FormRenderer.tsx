import React, { useState } from "react";
import { FormStore } from "./FormStore";
import { IFieldState, IFormState } from "./IStates";

interface Props {
  forms?: FormStore;
  path: string[];
  formName?: string;
  form: IFormState | IFieldState;
}

export function FormComponent(props: Props) {
  const [form, setForm] = useState(props.forms.getForm(props.formName));
  const handleFieldChange = (fieldName: string, value: any, fieldPath: string[]) => {
    const formCopy = { ...form };
    let currentField: { [x: string]: IFormState | IFieldState } = formCopy;
  
    for (const path of fieldPath) {
      currentField = currentField[path] as { [x: string]: IFormState | IFieldState };
    }
    currentField.value = value;
  
    // setForm(formCopy);
  };
  const renderField = (fieldKey: string, field: IFieldState | IFormState, fieldPath: string[]) => {
    const currentFieldPath = [...fieldPath, fieldKey];
    console.log("currentFieldPath ", currentFieldPath.join("."));

    let fieldValue;
    if ('value' in field) {
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
export const RootFormComponent = () => {
  const [form, setForm] = useState(formStore.getForm("personalDetails"));

  return <FormComponent forms={formStore} form={rootForm} path={["forms"]} formName="personalDetails" />
};
