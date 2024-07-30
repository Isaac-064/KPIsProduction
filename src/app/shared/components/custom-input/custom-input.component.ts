import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
  @Input() value!: string;


  isPassword: boolean = false;
  isLogin: boolean = false;
  isText: boolean = false;
  isDate: boolean = false;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if( this.type == 'password') {
      this.isPassword = true; 
      this.isLogin = true;
    }
    if( this.type == 'Login') this.isLogin = true;
    if( this.type == 'Date') this.isDate = true;
    if( this.type == 'Text') this.isText = true;
  }

  showOrHidePassword() {
    this.hide = !this.hide;

    if(this.hide){
      this.type = 'password'
    }else{
      this.type = 'text'
    }
  }

}
