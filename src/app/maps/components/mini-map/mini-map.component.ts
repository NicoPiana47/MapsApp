import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{
  @Input() lngLat!: [number, number]
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.lngLat) throw 'LngLat can´t be null'
    if(!this.divMap?.nativeElement) throw 'Map not found';

    const map = new Map({
      container: this.divMap?.nativeElement,
      interactive: false,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
    });

    const marker = new Marker({
        color: 'red',

      })
      .setLngLat(this.lngLat)
      .addTo(map)
  }
}
