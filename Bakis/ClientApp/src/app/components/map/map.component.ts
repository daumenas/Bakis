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
  private location;
  private sightsMarkers = [];
  private eventMarkers = [];

  constructor(
    private eventService: CityEventService,
    private sightService: LocationService,) { }

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
        userLocation = new L.marker(e.latlng, { title: 'position' }).addTo(map);
        this.location = e.latlng;
        userLocation.on('move', e => {
          this.getGameDistance(map);
        })
      } else {
        this.location = e.latlng;
        userLocation.setLatLng(e.latlng);
        
      }
    }).on("locationerror", error => {
      if (userLocation) {
        map.removeLayer(userLocation);
        userLocation = undefined;
      }
    })
  }

  setEventMarkers(map) {
    for (var i = 0; i < this.listOfEventData.length; i++) {
      this.eventMarkers[i] = L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude]).addTo(
        map).bindPopup('<p>' + this.listOfEventData[i].name + '<br />' + this.listOfEventData[i].description + '</p>'
      );
  }
}

  setSightMarkers(map) {
    for (var i = 0; i < this.listOfSightData.length; i++) {
      this.sightsMarkers[i] = L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude]).addTo(
        map).bindPopup('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
        + '<button disabled>Play game</button>'
      );
  }
  }

  async getGameDistance(map) {
    if (this.sightsMarkers.length == 0) {
      setTimeout(() => { this.getGameDistance(map) }, 3000);
    }
    for (var i = 0; i < this.sightsMarkers.length; i++) {
      var meters = this.location.distanceTo(this.sightsMarkers[i]._latlng);
      if (meters <= 30) {
        this.sightsMarkers[i]._popup.setContent('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
          + '<button>Play game</button>');
        this.sightsMarkers[i].update();
      }
      else {
        this.sightsMarkers[i]._popup.setContent('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
          + '<button disabled>Play game</button>');
        this.sightsMarkers[i].update();
      }
    }
  }

}
