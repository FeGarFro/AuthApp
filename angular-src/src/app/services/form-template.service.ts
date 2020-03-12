import { Injectable } from '@angular/core';
import { ValidateService} from '../services/validate.service'
import { FormBuilder, Validators, ValidationErrors, ValidatorFn, AbstractControl, PatternValidator }from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class FormTemplateService {

  form = this.fb.group({
    name: ['', []],
    username: ['', [Validators.minLength(4)]],
    email: ['', [Validators.email]],
    password: ['', [
      this.validateService.patternValidator(/\d/, { hasNumber: true }),
      this.validateService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      this.validateService.patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8)
      ]
    ],
    cpf: [''],
    phone: ['']
  })

  constructor(private fb: FormBuilder, private validateService: ValidateService) { }
}
