import { FormStore } from "./FormTest";
import * as React from "react";
import { IFormState } from "./IStates";
class FormComponent {
  private formKey: string;
  private formStore: FormStore;

  constructor(formKey: string, formStore: FormStore) {
    this.formKey = formKey;
    this.formStore = formStore;
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  private handleFieldChange(fieldKey: string, value: any) {
    const form = this.formStore.getForm(this.formKey);
    if (form) {
      form.fields[fieldKey].touched = true;
      form.fields[fieldKey].value = value;
      this.formStore.updateForm(this.formKey, form);
    }
  }

  private handleFormChange(formKey: string, form: IFormState) {
    const mainForm = this.formStore.getForm(this.formKey);
    if (mainForm) {
      mainForm.forms[formKey] = form;
      this.formStore.updateForm(this.formKey, mainForm);
    }
  }

  private renderField(fieldKey: string, field: Field) {
    return `
      <div>
        <label>${fieldKey}</label>
        <input 
          type="text" 
          value="${field.value}" 
          onchange="handleFieldChange('${fieldKey}', this.value)"
        />
      </div>
    `;
  }

  private renderForm(formKey: string, form: Form) {
    let fieldsHtml = "";
    for (const fieldKey in form.fields) {
      fieldsHtml += this.renderField(fieldKey, form.fields[fieldKey]);
    }

    let formsHtml = "";
    for (const nestedFormKey in form.forms) {
      const nestedForm = form.forms[nestedFormKey];
      const nestedFormComponent = new FormComponent(
        nestedFormKey,
        this.formStore
      );
      formsHtml += nestedFormComponent.render();
    }

    return `
      <div>
        <h2>${formKey}</h2>
        ${fieldsHtml}
        ${formsHtml}
      </div>
    `;
  }

  public render() {
    const form = this.formStore.getForm(this.formKey);
    if (!form) {
      return "";
    }

    const html = this.renderForm(this.formKey, form);
    return html;
  }
}

const formStore = new FormStore();
const rootFormComponent = new FormComponent("root", formStore);
document.body.innerHTML = rootFormComponent.render();
