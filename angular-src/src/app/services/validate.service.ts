import { Injectable } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl, PatternValidator }from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {


  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
  
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
  
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  constructor() { }

}
