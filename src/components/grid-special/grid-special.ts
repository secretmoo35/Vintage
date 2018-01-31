import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the GridSpecialComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'grid-special',
  templateUrl: 'grid-special.html'
})
export class GridSpecialComponent implements OnInit {

  @Input('items') items: Array<any>;
  useItems: Array<any> = [];

  constructor() {
    console.log('Hello GridSpecialComponent Component');
  }

  ngOnInit() {
    this.procress();
  }

  procress() {

    let maxLengthOne = 3;
    let subOne = [];
    if (maxLengthOne > 0) {
      let pages = this.items.length / maxLengthOne;
      let paper = 0;
      for (let i = 0; i < pages; i++) {
        subOne.push(this.items.slice(paper, paper + maxLengthOne));
        paper += maxLengthOne;
      }
    } else {
      subOne = this.items;
    };


    let maxLengthTwo = 6;
    let subTwo = [];
    if (maxLengthTwo > 0) {
      let pages = subOne.length / maxLengthTwo;
      let paper = 0;
      for (let i = 0; i < pages; i++) {
        subTwo.push(subOne.slice(paper, paper + maxLengthTwo));
        paper += maxLengthTwo;
      }
    } else {
      subTwo = subOne;
    };

    this.useItems = subTwo;
    console.log(this.useItems);

  }

}
