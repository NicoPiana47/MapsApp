import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {Map} from 'mapbox-gl'


@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Map not found';

    const map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
  }

}
