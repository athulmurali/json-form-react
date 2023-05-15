import { createStore } from "redux";
import { IFieldState, IFormState } from "./IStates";

interface AppState {
  forms: { [formKey: string]: IFormState | IFieldState };
}

interface Action {
  type: string;
  payload: any;
}
const initialFormState: IFormState = {
  firstName: {
    value: '',
    touched: false,
    pristine: true,
    dirty: false,
    valid: false,
    loading: false,
    error : null
  },
  lastName: {
    value: '',
    touched: false,
    pristine: true,
    dirty: false,
    valid: false,
    loading: false,
    error : null
  },
  form :{
    lastName: {
      value: '',
      touched: false,
      pristine: true,
      dirty: false,
      valid: false,
      loading: false,
      error : null
    },
  }
};

function rootReducer(
  state: AppState = { forms: {personalDetails : initialFormState} },
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
