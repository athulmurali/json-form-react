export interface IFormState {
  [key: string]: IFieldState | IFormState;
}

export type IFieldState = IInputDataState &
  IValidationState &
  IErrorState &
  IAsyncState 
  // IMetaData

export interface IValidationState {
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
  valid: boolean;
}

export interface IInputDataState {
  value: string ;
}

export interface IUserStore {
  forms: {
    [key: string]: IFormState;
  };
}

export interface IErrorState {
  error: string | null; // Will be replaced with the Error type used in maui 
}

/**
 * Any other sync state can be added here 
 */
export interface IAsyncState {
  loading: boolean;
}

/** 
 * The following will be used while validating recursively 
 * the validator function like getError, getTouched can make use of this 
 * Sometimes, an error in an inactive field or ford should never be accounted
 * Two main purposes :   
 * 1. Info for view layer on run time changes 
 * 2. Used by validation 
 */
export interface IMetaData{
  hidden: boolean;
  active : boolean;
}
