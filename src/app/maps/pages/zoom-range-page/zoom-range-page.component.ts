import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-58.5, -34.4833);

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'Map not found';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      console.log(ev);
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', () => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)
  }
}
