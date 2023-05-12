export interface IFormState {
  [key: string]: IFieldState;
}

export type IFieldState = IInputDataState &
  IValidationState &
  IErrorState &
  IAsyncState;

export interface IValidationState {
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
  valid: boolean;
}

export interface IInputDataState {
  value: string | boolean | null;
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
