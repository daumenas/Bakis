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
  listOfEventData: TableRowEvent[] = [];
  events: TableRowEvent[];
  listOfSightData: TableRowSight[] = [];
  sights: TableRowSight[];

  constructor(
    private eventService: CityEventService,
    private sightService: LocationService) { }

  ngAfterViewInit(): void {
    let map = L.map('map', {
      center: [54.896870, 23.886105],
      zoom: 15
    });
    this.initMap(map);
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.listOfEventData = [...this.events];
      this.setEventMarkers(map);
    });
    this.sightService.getAllSights().subscribe(sights => {
      this.sights = sights;
      this.listOfSightData = [...this.sights];
      this.setSightMarkers(map);
    });
  }

  private initMap(map): void {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(map);

    map.invalidateSize();

    map.locate({ setView: true, maxZoom: 16, watch: true });

    L.control.scale().addTo(map);
    var userLocation;
    map.locate({
      setView: true,
      maxZoom: 120
    }).on("locationfound", e => {
      if (!userLocation) {
        userLocation = new L.marker(e.latlng).addTo(map);
      } else {
        userLocation.setLatLng(e.latlng);
      }
    }).on("locationerror", error => {
      if (userLocation) {
        map.removeLayer(userLocation);
        userLocation = undefined;
      }
    });
  }

  setEventMarkers(map) {
  for (var i = 0; i < this.listOfEventData.length; i++) {
    L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude]).addTo(
      map).bindPopup('<p>' + this.listOfEventData[i].name + '<br />' + this.listOfEventData[i].description + '</p>'
      );
  }
}

  setSightMarkers(map) {
  for (var i = 0; i < this.listOfSightData.length; i++) {
    L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude]).addTo(
      map).bindPopup('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
      );
  }
}

}
