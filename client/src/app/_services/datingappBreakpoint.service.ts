import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { Layout} from '../_models/layout'


@Injectable({
  providedIn: 'root'
})

export class DatingappBreakpointService {

  constructor() { }


getHandsetLayout(): Layout {
  return {
    name: 'Handset',
    gridColumns: 1,
    layoutItem: [
      { title: 'Card 1', cols: 1, rows: 1 },
      { title: 'Card 2', cols: 1, rows: 1 },
      { title: 'Card 3', cols: 1, rows: 1 },
      { title: 'Card 4', cols: 1, rows: 1 },
      { title: 'Card 5', cols: 1, rows: 1 },
      { title: 'Card 6', cols: 1, rows: 1 },
      { title: 'Card 7', cols: 1, rows: 1 }
    ]
  };
}

getTabletLayout(): Layout {
  return {
    name: 'Tablet',
    gridColumns: 4,
    layoutItem: [
      { title: 'Card 1', cols: 2, rows: 1 },
      { title: 'Card 2', cols: 2, rows: 1 },
      { title: 'Card 3', cols: 2, rows: 1 },
      { title: 'Card 4', cols: 2, rows: 1 },
      { title: 'Card 5', cols: 1, rows: 1 },
      { title: 'Card 6', cols: 1, rows: 1 },
      { title: 'Card 7', cols: 1, rows: 1 }
    ]
  };
}

getWebLayout(): Layout {
  return {
    name: 'Web',
    gridColumns: 6,
    layoutItem: [
      { title: 'Card 1', cols: 2, rows: 1 },
      { title: 'Card 2', cols: 2, rows: 1 },
      { title: 'Card 3', cols: 2, rows: 1 },
      { title: 'Card 4', cols: 2, rows: 1 },
      { title: 'Card 5', cols: 2, rows: 1 },
      { title: 'Card 6', cols: 2, rows: 1 },
      { title: 'Card 7', cols: 1, rows: 1 }
    ]
  };
}

getDefaultLayout() {
  return {
    name: 'default',
    gridColumns: 1,
    layoutItem: [
      { title: 'Card 1', cols: 1, rows: 1 },
      { title: 'Card 2', cols: 1, rows: 1 },
      { title: 'Card 3', cols: 1, rows: 1 },
      { title: 'Card 4', cols: 1, rows: 1 },
      { title: 'Card 5', cols: 1, rows: 1 },
      { title: 'Card 6', cols: 1, rows: 1 },
      { title: 'Card 7', cols: 1, rows: 1 }
    ]
  };
}

}
