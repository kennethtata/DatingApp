import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { Layout } from '../_models/layout';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;




  ngOnInit(): void {

  }

  registrToggle(){
    this.registerMode = !this.registerMode
  }


  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
