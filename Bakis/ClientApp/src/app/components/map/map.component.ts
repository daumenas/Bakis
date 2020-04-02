import { Component, AfterViewInit  } from '@angular/core';
import * as L from 'leaflet';
import { TableRowSight } from '../../models/table-row-sight';
import { TableRowEvent } from '../../models/table-row-event';
import { CityEventService } from '../../services/city-event.service';
import "leaflet/dist/images/marker-shadow.png";
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css',
    "../../../../node_modules/leaflet/dist/leaflet.css"]
})
export class MapComponent implements AfterViewInit  {
  private map;
  listOfEventData: TableRowEvent[] = [];
  events: TableRowEvent[];
  listOfSightData: TableRowSight[] = [];
  sights: TableRowSight[];

  constructor(
    private eventService: CityEventService,
    private sightService: LocationService) { }

  ngAfterViewInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.listOfEventData = [...this.events];
    });
    this.sightService.getAllSights().subscribe(sights => {
      this.sights = sights;
      this.listOfSightData = [...this.sights];
      this.initMap();
    });
  }

  private initMap(): void {
    let map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.setEventMarkers();
    this.setSightMarkers();

    map.invalidateSize();

    map.locate({ setView: true, maxZoom: 16, watch: true });

    L.control.scale().addTo(map);

    function onLocationFound(e) {
      var radius = e.accuracy / 4;
      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

  }

  setEventMarkers() {
    for (var i = 0; i < this.listOfEventData.length; i++) {
      L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude]).addTo(
        this.map).bindPopup('<p>' + this.listOfEventData[i].name + '<br />' + this.listOfEventData[i].description + '</p>'
        );
    }
  }

  setSightMarkers() {
    for (var i = 0; i < this.listOfSightData.length; i++) {
      L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude]).addTo(
        this.map).bindPopup('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
        );
    }
  }

}
