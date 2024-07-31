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
    switch (this.type) {
      case 'password':
        this.isPassword = true; 
        this.isLogin = true;
        break;

      case 'Login':
        this.isLogin = true;
        break;

      case 'Date':
        this.isDate = true;
        break;

      case 'Text':
        this.isText = true;
        break;
  
      default:
        this.isPassword = false;
        this.isLogin = false;
        this.isDate = false;
        this.isText = false;
        break;
    }
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
