export interface IFormState {
  [key: string]: IFieldState;
}

export type IFieldState = IInputDataState &
  IValidationState &
  IErrorState &
  IAsyncState;

export interface IValidationState {
  touched: boolean;
  untouched: boolean;
  pristine: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
}

export interface IInputDataState {
  value: string | number | boolean | null | Array<any>;
}

export interface IUserStore {
  forms: {
    [key: string]: IFormState;
  };
}

export interface IErrorState {
  value: string | null;
}

export interface IAsyncState {
  loading: boolean;
  error: IErrorState;
}
