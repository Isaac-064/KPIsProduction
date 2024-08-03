/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent  implements OnInit {

  @Input() control!: FormControl;
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
    {
      id: 4,
      name: 'Diario',
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

  constructor() { }

  ngOnInit() {}

  
  handleChange(e: { detail: { value: string; }; }) {
    this.selecion = Object.values(e.detail.value)
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
    localStorage.setItem('time', this.time.toString())
  }

}
