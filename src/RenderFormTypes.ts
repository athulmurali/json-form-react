import { FormStore } from "./FormStore";
import { IFormState, IFieldState } from "./IStates";

/**
 * Props for the FormComponent
 */
export interface FormComponentProps {
  forms?: FormStore;
  path: string[]; // Path to the current form or field
  formName?: string; // Name of the current form
  form: IFormState | IFieldState; // Current form or field state
}