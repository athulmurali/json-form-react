import React, { useState } from "react";
import { FormStore } from "./FormStore";
import { IFieldState, IFormState } from "./IStates";

interface Props {
  forms?: FormStore;
  path: string[];
  formName?: string;
  form: IFormState |IFieldState;
}

export function FormComponent(props: Props) {
  const [form, setForm] = useState(props.forms.getForm(props.formName));

  const handleFieldChange = (fieldName: string, value: any, fieldPath: string) => {
    const formCopy = { ...form };
    formCopy[fieldName].touched = true;
    formCopy[fieldName].value = value;
    props.forms.updateForm(props.formName, formCopy);
    setForm(formCopy);
    // Do something with the fieldPath
    console.log("Field Path:", fieldPath);
  };

  const renderField = (fieldKey: string, field: IFieldState | IFormState, fieldPath: string) => {
    const currentFieldPath = fieldPath ? `${fieldPath}.${fieldKey}` : fieldKey;

    let fieldValue;
    if ('value' in field) {
      fieldValue = field.value;
    return (
      <div key={fieldKey}>
        <label>{fieldKey}</label>
        <input
          type="text"
          value={fieldValue}
          onChange={(e) => handleFieldChange(fieldKey, e.target.value, currentFieldPath)}
        />
      </div>
    );
  }
  else{
    Array.from(Object.keys(field || {})).map(k=> console.log(k , field[k]))
    return <fieldset>
        <legend>{fieldKey}</legend>
      {Object.keys(field || {}).map( k=> renderField(k , field[k], fieldPath)
      )}
    </fieldset>

  }
}
  const renderForm = (formKey: string, form: IFormState, fieldPath?: string) => {
    const fieldKeys = Object.keys(form);
    const fieldsJSX = fieldKeys.map((k) => renderField(k, form[k], fieldPath));
    return (
      <div>
        <h2>{formKey}</h2>
        {fieldsJSX}
      </div>
    );
  };

  if (!form) {
    return null;
  }

  return renderForm(props.formName || "", form);
}

const formStore = new FormStore();
const rootForm = formStore.getForm("personalDetails");
export const RootFormComponent = () => {
  const [form, setForm] = useState(formStore.getForm("personalDetails"));

 return  <FormComponent forms={formStore} form={rootForm} path={["forms"]} formName="personalDetails" />
};
