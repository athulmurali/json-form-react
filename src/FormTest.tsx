import { createStore } from "redux";
import { IFormState } from "./IStates";

interface AppState {
  forms: { [formKey: string]: IFormState };
}

interface Action {
  type: string;
  payload: any;
}

function rootReducer(
  state: AppState = { forms: {} },
  action: Action
): AppState {
  switch (action.type) {
    case "UPDATE_FORM":
      const { formKey, form } = action.payload;
      return { ...state, forms: { ...state.forms, [formKey]: form } };
    default:
      return state;
  }
}

export class FormStore {
  private store: any;

  constructor() {
    this.store = createStore(rootReducer);
  }

  public getForm(formKey: string): IFormState | undefined {
    return this.store.getState().forms[formKey];
  }

  public updateForm(formKey: string, form: IFormState) {
    this.store.dispatch({ type: "UPDATE_FORM", payload: { formKey, form } });
  }
}
