/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @Input() task: Task | undefined;

  scrap: number = 0;
  laborloss: number = 0;
  oee: number = 0;
  pvs: number = 0;

  form = new FormGroup({
    id: new FormControl(''),
    turno: new FormControl(''),
    planta: new FormControl(''),
    tiempo: new FormControl('', [Validators.required]),
    piezaBuena: new FormControl('', [Validators.required]),
    piezaPlan: new FormControl('', [Validators.required]),
    piezaScrap: new FormControl('', [Validators.required]),
    cabezas: new FormControl('', [Validators.required]),
    tiempoMuerto: new FormControl('', [Validators.required]),
    HCTeorico: new FormControl('', [Validators.required]),
    TCTeorico: new FormControl('', [Validators.required]),
  })

  constructor(
    private utilSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  submit(){

    if (this.form.valid) {
      this.calculoScrap();
      this.calculoOEE();
      this.calculoPVS();
      this.calculoLL();

      this.utilSvc.presentToast({
        message: `Calculo completo...`,
        duration: 1500,
        color: 'success',
        icon:'checkmark-outline'
      })
    }
    else{
      console.log('Paso algo');
    }
  }

  calculoScrap(){
    const pzBuenas = this.form.value.piezaBuena;
    const pzPlan = this.form.value.piezaPlan;
    const pzScrap = this.form.value.piezaScrap;
    if(pzBuenas && pzPlan && pzScrap){
      const FormulaScrap = parseInt(pzScrap)/(parseInt(pzBuenas)+parseInt(pzScrap))*100
      console.log("Scrap: ",FormulaScrap, "%");
      this.scrap = FormulaScrap;
    }
  }

  calculoLL(){
    const PDirecto = this.form.value.cabezas;
    const HProducidas = this.form.value.tiempo;
    const TCTeorico = this.form.value.TCTeorico; 
    const PDTeorico = this.form.value.HCTeorico;
    const CPiezas = this.form.value.piezaBuena;
    if(PDirecto && HProducidas && TCTeorico && PDTeorico && CPiezas){
      const HLaboradas = parseInt(PDirecto) * parseInt(HProducidas);
      const HBuenas =  (parseInt(TCTeorico) * parseInt(PDTeorico) * parseInt(CPiezas))/3600;
      const FormulaLaborLoss = ((HLaboradas - HBuenas)/HBuenas)*100;
      console.log("Labor Loss: ",FormulaLaborLoss, "%");
      this.laborloss = FormulaLaborLoss
    }

  }

  calculoOEE(){
    const pzBuenas = this.form.value.piezaBuena;
    const pzScrap = this.form.value.piezaScrap;
    const TCTeorico = this.form.value.TCTeorico; 
    const TTDisponible = this.form.value.tiempo;
    const TAfectacion = this.form.value.tiempoMuerto;
    if(pzBuenas && pzScrap && TCTeorico) {
      const PPTotales = parseInt(pzBuenas) + parseInt(pzScrap);
      const PTHora = 3600 / parseInt(TCTeorico);
      if(TTDisponible && TAfectacion){
        const Disponibilidad = (parseInt(TTDisponible) - (parseInt(TAfectacion)/60))/parseInt(TTDisponible);
        if(PPTotales){
          const Desempeño = PPTotales / ((parseInt(TTDisponible) - (parseInt(TAfectacion)/60)) * PTHora);
          const Calidad = 1 - (parseInt(pzScrap) / PPTotales);
          const FormulaOEE = (Disponibilidad * Desempeño * Calidad)*100;
          console.log("OEE: ",FormulaOEE, "%");
          this.oee = FormulaOEE;
        }
      }
    }
  }

  calculoPVS(){
    const PBuenas = this.form.value.piezaBuena;
    const PPlan = this.form.value.piezaPlan;
    if(PBuenas && PPlan){
      const FormulaPVS = parseInt(PBuenas)/parseInt(PPlan)*100
      console.log("PVS: ",FormulaPVS, "%");
      this.pvs = FormulaPVS;
    }
  }

  get outerStrokeColorScrap(): string {
    return this.scrap < 1 ? '#00FF00' : '#FF0000';
  }

  get outerStrokeColorLaborLoss(): string {
    return this.laborloss < 25 ? '#00FF00' : '#FF0000';
  }
  
  get outerStrokeColorOEE(): string {
    return this.oee > 85 ? '#00FF00' : '#FF0000';
  }
  
  get outerStrokeColorPVS(): string {
    return this.pvs > 90 ? '#00FF00' : '#FF0000';
  }

}
