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

  constructor(private _pythonService:PythonService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._pythonService.getEstimation(JSON.stringify(this.storyPointForm.value))
    .subscribe(
      data=>console.log(data),
      error=>{console.log(error)}
    )
  }
}
