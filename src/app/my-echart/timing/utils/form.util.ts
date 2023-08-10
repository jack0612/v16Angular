import { ElementRef } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export class FormUtil {

  /**
   * Allows to update the form state from pristine to dirty when programtically assigning values
   * @param formGroup
   */
  public static setFormAsDirty(formGroup: FormGroup) {
    formGroup.markAsDirty();
  }

  // public static setInvalidControlForOutOfRange(formControl: FormControl, minValue: Number, maxValue: Number) {
  //   if ((minValue && maxValue) && (Number(formControl.value) < minValue || Number(formControl.value) > maxValue)) {
  //     formControl.setErrors({ invalidValue: true });
  //     formControl.markAsDirty();
  //     formControl.markAsTouched();
  //   }
  // }

  public static isControlPristine(formGroup: FormGroup, formControl: string) {
    return formGroup.get(formControl).pristine;
  }

  public static isControlValidWhenNotPristine(formGroup: FormGroup, formControl: string) {
    if (!FormUtil.isControlPristine(formGroup, formControl)) {
      return false;
    }

    return FormUtil.isFieldValid(formGroup, formControl)
  }

  public static isFieldValid(formGroup: FormGroup, formControl: string) {
    return formGroup.get(formControl).valid;
  }

  public static processForm(payload: any) {
    return this.trim(payload);
  }

  public static trim(payload: any) {
    if (!payload) {
      return null;
    }


    for (let key in payload) {
      const value = payload[key];
      if (this.isObject(value)) {
        this.trim(value);
      } else if (value) {
        if (typeof value !== 'boolean' && typeof value !== 'number') {
          payload[key] = value ? value.trim() : null;
        }
      }
    }

    return payload;
  }

  public static isObject(payload: any) {
    if (!payload) {
      return false;
    }

    return payload === Object(payload);
  }

  static sumNumberOfErrors(formGroup: FormGroup): number {
    let numberOfErrors = 0;
    Object.keys(formGroup.controls).forEach(formControlName => {
      const control = formGroup.get(formControlName);
      if (control instanceof FormControl) {
        if (control.errors) {
          console.info(`%c ${formControlName} has error ${JSON.stringify(control.errors)}`, `color: red; font-weight: bold`);
          numberOfErrors++;
        }
      } else if (control instanceof FormGroup) {
        numberOfErrors += this.sumNumberOfErrors(control);
      }
    });
    return numberOfErrors;
  }

  static markAsUntouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(formControlName => {
      const control = formGroup.get(formControlName);
      if (control instanceof FormControl) {
        control.markAsUntouched({ onlySelf: true });
        control.markAsPristine({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsUntouched(control);
      }
    });
  }

  static markAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(formControlName => {
      const control = formGroup.get(formControlName);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control);
      }
    });
  }

  static getErrorMessage(numberOfErrors, translate: TranslateService): string {
    let msg = null;
    if (numberOfErrors == 1) {
      msg = translate.instant('EASYFLOW.COMMON.ERROR_NOTIFICATION', { numOfErrors: numberOfErrors });
    } else if (numberOfErrors >= 2) {
      msg = translate.instant('EASYFLOW.COMMON.ERROR_NOTIFICATIONS', { numOfErrors: numberOfErrors })
    }
    return msg;
  }

  static focusInvalidElement(tagNames: (string | Function)[], elementRef: ElementRef): void {
    for (let tagName of tagNames) {
      if (typeof tagName == 'string') {
        const invalidControl: HTMLElement = elementRef.nativeElement.querySelector(tagName);
        if (invalidControl) {
          invalidControl.focus();
          break;
        }
      } else if (typeof tagName == 'function') {
        tagName();
        break;
      }
    }
  }

  static updateErrorMessage(formGroup: FormGroup, translate: TranslateService): string {
    const numberOfErrors = FormUtil.sumNumberOfErrors(formGroup);
    let msgContent: string = null;
    if (numberOfErrors > 0) {
      FormUtil.markAsTouched(formGroup);
      msgContent = FormUtil.getErrorMessage(numberOfErrors, translate);
    }
    return msgContent;
  }

  static isControlValid(formGroup: FormGroup, formHasErrors: boolean, controlName: string, errorType?: string): boolean {
    const control: AbstractControl = formGroup.get(controlName);
    if ((formHasErrors && control.invalid) || (control.touched || control.dirty && control.invalid)) {
      if (errorType !== undefined) {
        return !(control.errors && !!control.errors[errorType]);
      }
      return !control.errors;
    }
    return true;
  }



}
