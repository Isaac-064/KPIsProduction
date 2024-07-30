/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent  implements OnInit {

  @Input() icon!: string;
  @Input() label!: string;
  @Input() type!: string;

  selecion: any[] = [];
  time: number = 0;


  turnos = [
    {
      id: 1,
      name: '1er Turno',
    },
    {
      id: 2,
      name: '2do Turno',
    },
    {
      id: 3,
      name: '3er Turno',
    },
  ];

  plantas = [
    {
      id: 1,
      name: 'Planta 1',
    },
    // {
    //   id: 2,
    //   name: 'planta 2',
    // },
  ];

  lineas = [
    {
      id: 1,
      name: 'Linea 1',
    },
    {
      id: 2,
      name: 'Linea 2',
    },
    {
      id: 3,
      name: 'Linea 3',
    },
  ];

  constructor() { }

  ngOnInit() {}

  
  handleChange(e: { detail: { value: string; }; }) {
    this.selecion = Object.values(e.detail.value)
    console.log(this.selecion[1]);
    switch (this.selecion[1]) {
      case "1er Turno":
        this.time = 8.67
        break;
      case "2do Turno":
        this.time = 8.17
        break;
      case "3er Turno":
        this.time = 5.17
        break;
    }
    console.log(this.time);
    localStorage.setItem('time', this.time.toString())
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

}
