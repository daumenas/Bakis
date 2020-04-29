import { Component, AfterViewInit, Inject, ElementRef  } from '@angular/core';
import * as L from 'leaflet';
import { TableRowSight } from '../../models/table-row-sight';
import { TableRowEvent } from '../../models/table-row-event';
import { CityEventService } from '../../services/city-event.service';
import "leaflet/dist/images/marker-shadow.png";
import { LocationService } from '../../services/location.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendReceiveService } from '../../services/send-receive.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';

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
    private consumerService: UserService,
    private sightService: LocationService,
    private sendReceiveService: SendReceiveService,
    private elementRef: ElementRef,
    private auth: AuthenticationService) { }

  ngAfterViewInit(): void {
    var maxBounds = [
      [53.739685, 27.380221],
      [56.636485, 20.439204]
    ];
    var iconSettings = L.Icon.extend({
      options: {
        iconAnchor: [20, 50],
        popupAnchor: [0, -25]
      }
    });
    var markerIcon = new iconSettings({ iconUrl: '../../../assets/marker-icon.png' }),
      eventIcon = new iconSettings({ iconUrl: '../../../assets/event.png' }),
      sightIcon = new iconSettings({ iconUrl: '../../../assets/telescope.png' });
    let map = L.map('map', {
      center: [54.896870, 23.886105],
      zoom: 15,
      maxBounds: maxBounds,
      minZoom: 8
    });

    this.initMap(map, markerIcon);

    map.on('click', e => {
      this.sendReceiveService.latLngSender(e.latlng);
    });
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events.filter(event => {
        return event.approval === true
      });
      this.listOfEventData = [...this.events];
      this.setEventMarkers(map, eventIcon);
      this.sendReceiveService.eventSender(this.eventMarkers);
    });
    this.sightService.getAllSights().subscribe(sights => {
      this.sights = sights;
      this.listOfSightData = [...this.sights];
      this.setSightMarkers(map, sightIcon);
      this.sendReceiveService.sightSender(this.sightsMarkers);
    });
  }

  private initMap(map, markerIcon): void {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(map);

    map.invalidateSize();

    L.control.scale().addTo(map);
    var userLocation;
    let firstLocation = true;
    map.locate({
      maxZoom: 19,
      watch: true
    }).on("locationfound", e => {
      if (!userLocation) {
        userLocation = new L.marker(e.latlng, { title: 'position', icon: markerIcon }).addTo(map);
        if (firstLocation) {
          map.setView(e.latlng);
        }
        firstLocation = false;
        this.location = e.latlng;
        userLocation.on('move', e => {
          if (this.checkLogged()) {
            this.getDistance(true);
            this.getDistance(false);
          }
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

  checkLogged() {
    return this.auth.isAuthenticated();
  }

  setEventMarkers(map, eventIcon) {
  let tempEvents = [];
  for (var i = 0; i < this.listOfEventData.length; i++) {
    tempEvents[i] = L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude], { icon: eventIcon}).addTo(
      map)
      .bindPopup('<p>' + this.listOfEventData[i].name + '<br />' + this.listOfEventData[i].description + '</p>' +
        '<button class="checkIn" style="display: none">Check in</button>')
      .on("popupopen", (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
          .querySelector(".checkIn")
          .addEventListener("click", e => {
            this.getPointsForSight(popUp);
          });
      }) 
    }
    this.eventMarkers = tempEvents;
}

  setSightMarkers(map, sightIcon) {
    let tempMarkers = [];
    for (var i = 0; i < this.listOfSightData.length; i++) {
      tempMarkers[i] = L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude],
        { title: this.listOfSightData[i].id, icon: sightIcon })
        .addTo(map)
        .bindPopup('<p>' + this.listOfSightData[i].name + '<br />' + this.listOfSightData[i].description + '</p>' +
          '<button class="checkIn" style="display: none">Check in</button>' + '<button class="playGame" style="display: none">Play Game</button>')
        .on("popupopen", (a) => {
          var popUp = a.target.getPopup()
          popUp.getElement()
            .querySelector(".checkIn")
            .addEventListener("click", e => {
              this.getPointsForSight(popUp);
            });
        })
        .on("popupopen", (a) => {
          var popUp = a.target.getPopup()
          popUp.getElement()
            .querySelector(".playGame")
            .addEventListener("click", e => {
              this.playGame();
            });
        }) 
    }
    this.sightsMarkers = tempMarkers;
  }

  getDistance(isSight) {
    if (isSight) {
      if (this.sightsMarkers.length == 0) {
        this.sendReceiveService.sightReceive$.subscribe((data) => {
          this.setPopUp(data, isSight);
        });
      }
      else {
        this.setPopUp(this.sightsMarkers, isSight);
      }
    }
    else {
      if (this.eventMarkers.length == 0) {
        this.sendReceiveService.eventReceive$.subscribe((data) => {
          this.setPopUp(data, isSight);
        });
      }
      else {
        this.setPopUp(this.eventMarkers, isSight);
      }
    }
  }

  setPopUp(markers, isSight) {
    let listOfData = (isSight) ? this.listOfSightData : this.listOfEventData;
    for (var i = 0; i < markers.length; i++) {
      var meters = this.location.distanceTo(markers[i]._latlng);
      if (meters <= 30) {
        markers[i]._popup.setContent('<p>' + listOfData[i].name + '<br />' + listOfData[i].description + '</p>'
          + '<button class="checkIn">Check in</button>' +
          ((isSight) ? '<button class="playGame">Play game</button>' : '')
          );
        markers[i].update();
      }
      else {
        markers[i]._popup.setContent('<p>' + listOfData[i].name + '<br />' + listOfData[i].description + '</p>'
          + '<button class="checkIn" disabled>Check in</button>' +
          ((isSight) ? '<button class="playGame" disabled>Play game</button>' : ''));
        markers[i].update();
      }
    }
  }

  getPointsForSight(sight: any) {
    if (this.checkLogged()) {
      
      var sightId = sight._source.options.title;
      this.consumerService.sightCheckIn(sightId).subscribe(data => {
        console.log(data);
        this.sendReceiveService.pointSender(true);
      });
    }
  }

  playGame() {
    if (this.checkLogged()) {
      this.sendReceiveService.pointSender(true);
      alert("PLAY GAME");
    }
  }

}
