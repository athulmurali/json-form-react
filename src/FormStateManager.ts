import {
  IUserStore,
  IFormState,
  IFieldState,
  IInputDataState,
  IValidationState,
  IAsyncState,
  IErrorState,
} from "./IStates";

class StoreManager {
  private store: IUserStore;

  constructor(store: IUserStore) {
    this.store = store;
  }

  public updateFormValue(
    formName: string,
    fieldName: string,
    newValue: string
  ): void {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    fieldState.value = newValue;
    fieldState.pristine = false;
    fieldState.dirty = true;
    fieldState.touched = true;
  }

  public updateFormValidation(
    formName: string,
    fieldName: string,
    validationUpdates: Partial<IValidationState>
  ): void {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    Object.assign(fieldState, validationUpdates);
  }

  public updateFormAsyncState(
    formName: string,
    fieldName: string,
    asyncUpdates: Partial<IAsyncState>
  ): void {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    Object.assign(fieldState, asyncUpdates);
  }

  public updateFormErrorState(
    formName: string,
    fieldName: string,
    errorUpdates: Partial<IErrorState>
  ): void {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    if (!fieldState.error) {
      fieldState.error = {} as IErrorState;
    }

    Object.assign(fieldState.error, errorUpdates);
  }

  public getFormValue(
    formName: string,
    fieldName: string
  ): IInputDataState["value"] | undefined {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    return fieldState.value;
  }

  public getFormValidation(
    formName: string,
    fieldName: string
  ): IValidationState | undefined {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    return {
      touched: fieldState.touched,
      pristine: fieldState.pristine,
      dirty: fieldState.dirty,
      valid: fieldState.valid,
    };
  }

  public getFormAsyncState(
    formName: string,
    fieldName: string
  ): IAsyncState | undefined {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    return {
      loading: fieldState.loading,
      error: fieldState.error,
    };
  }

  public getFormErrorState(
    formName: string,
    fieldName: string
  ): IErrorState | undefined {
    const formState = this.getFormState(formName);
    const fieldState = this.getFieldState(formState, fieldName);

    return fieldState.error;
  }

  private getFormState(formName: string): IFormState {
    return this.store.forms[formName];
  }

  private getFieldState(formState: IFormState, fieldName: string): IFieldState {
    return formState[fieldName];
  }
}

export default StoreManager;
