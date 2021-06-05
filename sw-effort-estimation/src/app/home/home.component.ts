import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PythonService } from '../python.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  storyPointForm:FormGroup = new FormGroup({
    storyPoint:new FormControl(null,Validators.required)
  })

  costDriversForm:FormGroup = new FormGroup({
    teamSalary:new FormControl(560679,Validators.required),

    typeRadio:new FormControl,

    nonTechSalary:new FormControl(183451),
    Equipment:new FormControl(34821),
    depreciation:new FormControl(8736),
    rent:new FormControl(14634),
    travelling:new FormControl(38279),
    furniture:new FormControl(2356),
    utilityBills:new FormControl(27541),
    coppyright:new FormControl(15239),
    softwarePurchase:new FormControl(12781),
    repairAndMaintenance:new FormControl(8393),
    Sanitary:new FormControl(5782),
    Marketing:new FormControl(4782),
    Other:new FormControl(24790)
  })


  constructor(private _pythonService:PythonService,
    @Inject(DOCUMENT) private _document: Document) { }

  estimatedTime:any;
  showEstimatedTime:boolean;
  estimatedCostFactor:any;
  showEstimatedCostFactor: boolean;
  estimatedCost:any;
  showGetPrediction:boolean;
  setCustomValues:any;
  chooseCostDriverType:any


  ngOnInit(): void {
    this.showEstimatedTime = false;
    this.showEstimatedCostFactor = false;
    this.showGetPrediction = false;
    this.setCustomValues = false;
    this.chooseCostDriverType = true;
  }

  changeCostType(e){
    if(this.costDriversForm.value.typeRadio=="custom"){
      this.setCustomValues = true;
    } else {
      this.setCustomValues = false;
    }

    this.chooseCostDriverType = false;
  }

  onStoryPointClick(){
    if(this.storyPointForm.value.storyPoint == null){
      return;
    }else {
      console.log(this.storyPointForm.value)
      this._pythonService.getTimeEstimation(JSON.stringify(this.storyPointForm.value))
      .subscribe(
        res=>{
          this.showEstimatedTime = true;
          this.estimatedTime = res;
          console.log(res)
        },
        error=>{console.log(error)}
      )
    }
  }

  onCostClick(){
    console.log(this.costDriversForm.value)
    this._pythonService.getCostEstimation(JSON.stringify(this.costDriversForm.value))
    .subscribe(
      res=>{
        this.showEstimatedCostFactor = true;
        this.estimatedCostFactor = res;
        console.log(res)
      },
      error=>{console.log(error)}
    )
  }
  
  onPredictionClick(){
    this._pythonService.getPrediction(this.estimatedTime,this.estimatedCostFactor,this.costDriversForm.value.teamSalary)
    .subscribe(
      res=>{
        this.showGetPrediction = true;
        this.estimatedCost = res;
        console.log(res)
      },
      error=>{console.log(error)}
    )
  }

  resetClick(){
    this._document.defaultView.location.reload();
  }
}
