import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  constructor(private _snackBar: MatSnackBar) { }

  flashError(code: string){
    this._snackBar.open("Ops! Algo deu errado. (" + code + ")", '', {duration: 5000})
  }

  flashSuccess(msg: string){
    this._snackBar.open(msg, '', {duration: 2000})
  }
}
