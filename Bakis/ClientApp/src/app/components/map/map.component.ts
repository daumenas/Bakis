import { Component, AfterViewInit, Inject  } from '@angular/core';
import * as L from 'leaflet';
import { TableRowSight } from '../../models/table-row-sight';
import { TableRowEvent } from '../../models/table-row-event';
import { CityEventService } from '../../services/city-event.service';
import "leaflet/dist/images/marker-shadow.png";
import { LocationService } from '../../services/location.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LatLngService } from '../../services/lat-lng.service';

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
    private sightService: LocationService,
    private latlngService: LatLngService) { }

  ngAfterViewInit(): void {
    var maxBounds = [
      [53.739685, 27.380221],
      [56.636485, 20.439204]
    ];
    var iconSettings = L.Icon.extend({
      options: {
        iconAnchor: [20, 20],
        popupAnchor: [0, -25]
      }
    });
    var eventIcon = new iconSettings({ iconUrl: '../../../assets/event.png' }),
      sightIcon = new iconSettings({ iconUrl: '../../../assets/telescope.png' });
    let map = L.map('map', {
      center: [54.896870, 23.886105],
      zoom: 15,
      maxBounds: maxBounds,
      minZoom: 8
    });

    this.initMap(map);

    map.on('click', e => {
      this.latlngService.latLngSender(e.latlng);
    });
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.filter(event => {
        return event.approval === true
      });
      this.listOfEventData = [...this.events];
      this.setEventMarkers(map, eventIcon);
    });
    this.sightService.getAllSights().subscribe(sights => {
      this.sights = sights;
      this.listOfSightData = [...this.sights];
      this.setSightMarkers(map, sightIcon);
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

  setEventMarkers(map, eventIcon) {
  for (var i = 0; i < this.listOfEventData.length; i++) {
    L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude], { icon: eventIcon}).addTo(
      map).bindPopup('<p>' + this.listOfEventData[i].name + '<br />' + this.listOfEventData[i].description + '</p>'
      );
  }
}

  setSightMarkers(map, sightIcon) {
  for (var i = 0; i < this.listOfSightData.length; i++) {
    L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude], { icon: sightIcon }).addTo(
      map).bindPopup('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>'
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
