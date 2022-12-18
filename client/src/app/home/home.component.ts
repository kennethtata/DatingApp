import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { Layout } from '../_models/layout';
import { DatingappBreakpointService } from 'src/app/_services/datingappBreakpoint.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
cardsLayout: Observable<Layout>;

  constructor(private breakpointObserver: BreakpointObserver,private datingappBreakpoint: DatingappBreakpointService) {

    this.cardsLayout = merge(
      this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small]).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽 handset layout activated',);
            return datingappBreakpoint.getHandsetLayout();
          }
          return datingappBreakpoint.getDefaultLayout();
        })),
      this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽  tablet layout activated', this.cardsLayout);
            return datingappBreakpoint.getTabletLayout();
          }
          return datingappBreakpoint.getDefaultLayout();
        })),
      this.breakpointObserver.observe(Breakpoints.Web).pipe(
        map(({ matches }) => {
          if (matches) {
            console.debug('👉🏽  web layout activated', this.cardsLayout);
            return datingappBreakpoint.getWebLayout();
          }
          return datingappBreakpoint.getDefaultLayout();
        }))
    );
  }

  ngOnInit(): void {

  }

  registrToggle(){
    this.registerMode = !this.registerMode
  }


  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
