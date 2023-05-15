import { useState } from "react";
import { FormStore } from "./FormStore";
import { IFieldState, IFormState } from "./IStates";

interface Props {
  forms: FormStore;
  path: string[];
  formName?: string;
}

const switchComponents = (type: string) => {
  switch (type) {
    case "text":
      return <input type="text" />;
    default:
      return <select />;
  }
};

export function FormComponent(props: Props) {
  const [form, setForm] = useState(props.forms.getForm(props.formName));

  const handleFieldChange = (fieldName: string, value: any) => {
    const formCopy = { ...form };
    formCopy[fieldName].touched = true;
    formCopy[fieldName].value = value;
    props.forms.updateForm(props.formName, formCopy);
    setForm(formCopy);
  };

  const renderField = (fieldKey: string, field: IFieldState) => {
    return (
      <div key={fieldKey}>
        <label>{fieldKey}</label>
        <input
          type="text"
          value={field.value}
          onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
        />
      </div>
    );
  };

  const renderForm = (formKey: string, form: IFormState) => {
    const fieldKeys = Object.keys(form);
    const fieldsJSX = fieldKeys.map((k) => renderField(k, form[k]));

    const nestedFormComponents = Object.entries(form.forms || {}).map(
      ([nestedFormKey, nestedForm]) => (
        <FormComponent
          key={nestedFormKey}
          forms={props.forms}
          path={props.path.concat(nestedFormKey)}
          formName={nestedFormKey}
        />
      )
    );

    return (
      <div>
        <h2>{formKey}</h2>
        {fieldsJSX}
        {nestedFormComponents}
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
export const RootFormComponent = () => (
  <FormComponent forms={formStore} path={["forms"]} formName="personalDetails" />
);
