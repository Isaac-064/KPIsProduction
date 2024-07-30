/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  submit(){
    if (this.form.valid) {

      //this.utilSvc.presentLoading({message: 'Autenticando...'})
      if(this.form.value.username == "admin" && this.form.value.password == "1234") {

        this.utilSvc.routerLink('/tabs/home');

        //this.utilSvc.dismissLoading();

        this.utilSvc.presentToast({
          message: `Bienvenido: ADMIN`,
          duration: 1500,
          color: 'success',
          icon:'person-outline'
        })

        this.form.reset();
      }else {

        //this.utilSvc.dismissLoading();
        this.utilSvc.presentToast({
          message: 'Usuario y/o contraseña incorrectas',
          duration: 5000,
          color: 'warning',
          icon:'alert-circle-outline'
        })
      }

    }
  }

}
