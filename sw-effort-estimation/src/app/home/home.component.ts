import { Component, OnInit } from '@angular/core';
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
    teamSalary:new FormControl(null,Validators.required),
    nonTechSalary:new FormControl(null),
    Equipment:new FormControl(null),
    depreciation:new FormControl(null),
    rent:new FormControl(null),
    travelling:new FormControl(null),
    utilityBills:new FormControl(null),
    coppyright:new FormControl(null),
    softwarePurchase:new FormControl(null),
    repairAndMaintenance:new FormControl(null),
    Sanitary:new FormControl(null),
    Marketing:new FormControl(null),
    Other:new FormControl(null)
  })


  constructor(private _pythonService:PythonService) { }

  ngOnInit(): void {
  }

  onStoryPointClick(){
    this._pythonService.getTimeEstimation(JSON.stringify(this.storyPointForm.value))
    .subscribe(
      data=>console.log(data),
      error=>{console.log(error)}
    )
  }

  onCostClick(){
    this._pythonService.getCostEstimation(JSON.stringify(this.costDriversForm.value))
    .subscribe(
      data=>console.log(data),
      error=>{console.log(error)}
    )
  }
}
