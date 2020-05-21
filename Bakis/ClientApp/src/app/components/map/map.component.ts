import { Component, AfterViewInit, Inject, ElementRef  } from '@angular/core';
import * as L from 'leaflet';
import { TableRowSight } from '../../models/table-row-sight';
import { TableRowEvent } from '../../models/table-row-event';
import { CityEventService } from '../../services/city-event.service';
import "leaflet/dist/images/marker-shadow.png";
import { LocationService } from '../../services/location.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SendReceiveService } from '../../services/send-receive.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PictureGameComponent } from '../picture-game/picture-game.component';
import { QuizGameComponent } from '../quiz-game/quiz-game.component';
import { UserSight } from '../../models/user-sight';
import { UserEvent } from '../../models/user-event';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css',
    "../../../../node_modules/leaflet/dist/leaflet.css"]
})
export class MapComponent implements AfterViewInit  {
  listOfEventData: UserEvent[] = [];
  events: UserEvent[];
  listOfSightData: UserSight[] = [];
  sights: UserSight[];
  private location;
  private sightsMarkers = [];
  private eventMarkers = [];
  sightSelectionIcon: any;
  sightIcon: any;
  sightCheckIcon: any;
  sightPlayedIcon: any;
  eventSelectionIcon: any;
  eventIcon: any;
  eventCheckIcon: any;
  markerIcon: any;

  constructor(
    private eventService: CityEventService,
    private consumerService: UserService,
    private sightService: LocationService,
    private sendReceiveService: SendReceiveService,
    private elementRef: ElementRef,
    public dialog: MatDialog,
    private auth: AuthenticationService) { }

  ngAfterViewInit(): void {
    var maxBounds = [
      [53.739685, 27.380221],
      [56.636485, 20.439204]
    ];
    let map = L.map('map', {
      center: [54.896870, 23.886105],
      zoom: 15,
      maxBounds: maxBounds,
      minZoom: 8
    });
    this.loadIcons();
    this.initMap(map);

    map.on('click', e => {
      this.sendReceiveService.latLngSender(e.latlng);
    });
    if (this.isAuthenticated()) {
      this.eventService.getAllEventsByUserId().subscribe(events => {
        this.events = events.filter(event => {
          return event.approval === true
        });
        this.listOfEventData = [...this.events];
        this.setEventMarkers(map);
        this.sendReceiveService.eventSender(this.eventMarkers);
      });
    } else {
      this.eventService.getAllEventsForMap().subscribe(events => {
        this.events = events.filter(event => {
          return event.approval === true
        });
        this.listOfEventData = [...this.events];
        this.setEventMarkers(map);
        this.sendReceiveService.eventSender(this.eventMarkers);
      });
    }
    if (this.isAuthenticated()) {
      this.sightService.getAllSightsByUserId().subscribe(sights => {
        this.sights = sights;
        this.listOfSightData = [...this.sights];
        this.setSightMarkers(map);
        this.sendReceiveService.sightSender(this.sightsMarkers);
      });
    } else {
      this.sightService.getAllSightsForMap().subscribe(sights => {
        this.sights = sights;
        this.listOfSightData = [...this.sights];
        this.setSightMarkers(map);
        this.sendReceiveService.sightSender(this.sightsMarkers);
      });
    }
  }

  loadIcons() {
    var iconSettings = L.Icon.extend({
      options: {
        iconAnchor: [20, 50],
        popupAnchor: [0, -25]
      }
    });
    this.markerIcon = new iconSettings({ iconUrl: '../../../assets/marker-icon.png' })
    this.eventIcon = new iconSettings({ iconUrl: '../../../assets/event.png' })
    this.eventCheckIcon = new iconSettings({ iconUrl: '../../../assets/eventCheck.png' })
    this.sightIcon = new iconSettings({ iconUrl: '../../../assets/telescope.png' });
    this.sightCheckIcon = new iconSettings({ iconUrl: '../../../assets/telescopeCheck.png' });
    this.sightPlayedIcon = new iconSettings({ iconUrl: '../../../assets/telescopeDone.png' });
  }

  private initMap(map): void {
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
        userLocation = new L.marker(e.latlng, { title: 'position', icon: this.markerIcon }).addTo(map);
        if (firstLocation) {
          map.setView(e.latlng);
        }
        firstLocation = false;
        this.location = e.latlng;
        userLocation.on('move', e => {
          if (this.isAuthenticated()) {
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

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  setEventMarkers(map) {
  let tempEvents = [];
    for (var i = 0; i < this.listOfEventData.length; i++) {
      this.setEventMarkerIcon(this.listOfEventData[i]);
      tempEvents[i] = L.marker([this.listOfEventData[i].latitude, this.listOfEventData[i].longitude],
        { title: this.listOfEventData[i].id, icon: this.eventSelectionIcon, id: i }).addTo(
        map)
        .bindPopup('<div style="text-align: center"><h3>' + this.listOfEventData[i].name + '</h3><p>' + this.listOfEventData[i].description +
          '</p>' + this.listOfEventData[i].address + 
        '<br />' + 'Amount of people checked in here: ' + this.listOfEventData[i].checkedIn + '<br />' +
        'Estimated maximum amount of people: ' + this.listOfEventData[i].amount + '<br />' +
        "Starts: " + this.listOfEventData[i].dateFrom.toString().split("T").shift() +
        " at: " + this.listOfEventData[i].time.toString().split("T").pop() + '<br />' + "Ends: " +
        this.listOfEventData[i].dateTo.toString().split("T").shift() +
        " at: " + this.listOfEventData[i].endTime.toString().split("T").pop() + '<br />' +
        '<button class="checkIn" style="display: none">Check in</button>' + '</div>')
      .on("popupopen", (a) => {
        var popUp = a.target.getPopup()
        popUp.getElement()
          .querySelector(".checkIn")
          .addEventListener("click", e => {
            this.getPointsForEvent(popUp);
          });
      }) 
    }
    this.eventMarkers = tempEvents;
}

  setSightMarkers(map) {
    let tempMarkers = [];
    for (var i = 0; i < this.listOfSightData.length; i++) {
      this.setSightMarkerIcon(this.listOfSightData[i]);
      tempMarkers[i] = L.marker([this.listOfSightData[i].latitude, this.listOfSightData[i].longitude],
        { title: this.listOfSightData[i].id, icon: this.sightSelectionIcon, id: i })
        .addTo(map)
        .bindPopup(
          '<div style="text-align: center"><h3>' + this.listOfSightData[i].name + '</h3><p>' + this.listOfSightData[i].description +
          '</p>' + this.listOfSightData[i].address +
          '<br />' + 'Amount of people checked in here: ' + this.listOfSightData[i].checkedIn + '<br />' +
        '<button class="checkIn" style="display: none">Check in</button>' + '<button class="playGame" style="display: none">Play Game</button>' + '</div>')
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
              this.playGame(popUp);
            });
        }) 
    }
    this.sightsMarkers = tempMarkers;
  }

  setSightMarkerIcon(sight: UserSight) {
    if (sight.isGamePlayed) {
      this.sightSelectionIcon = this.sightPlayedIcon;
    } else if (sight.isCheckedIn) {
      this.sightSelectionIcon = this.sightCheckIcon;
    } else {
      this.sightSelectionIcon = this.sightIcon;
    }
  }

  setEventMarkerIcon(event: UserEvent) {
    if (event.isCheckedIn) {
      this.eventSelectionIcon = this.eventCheckIcon;
    } else {
      this.eventSelectionIcon = this.eventIcon;
    }
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
        markers[i]._popup.setContent(
          '<div style="text-align: center"><h3>' + listOfData[i].name + '</h3><p>' + listOfData[i].description +
          '</p>' + listOfData[i].address + '<br />' +
          '</p>' + 'Amount of people checked in here: ' + listOfData[i].checkedIn + ((isSight) ? '' : '<br />' +
            'Estimated maximum amount of people: ' + this.listOfEventData[i].amount + '<br />' +
            "Starts: " + this.listOfEventData[i].dateFrom.toString().split("T").shift() +
            " at: " + this.listOfEventData[i].time.toString().split("T").pop() + '<br />' + "Ends: " + this.listOfEventData[i].dateTo.toString().split("T").shift() +
            " at: " + this.listOfEventData[i].endTime.toString().split("T").pop() + '<br />') + 'Distance to: ' + meters.toFixed(2) + 'm  <br />' + '<br />'
          + ((listOfData[i].isCheckedIn == true) ? '<button class="checkIn" style="display: none">Check in</button>' :
            '<button class="checkIn">Check in ' + listOfData[i].points + 'p </button>') +
          ((isSight) ? (this.listOfSightData[i].isGamePlayed == true) ?
            '<button class="playGame button" style="display: none">Play game</button>' : '<button class="playGame">Play game</button>' : '') + '</div>'
          );
        markers[i].update();
      }
      else {
        markers[i]._popup.setContent(
          '<div style="text-align: center"><h3>' + listOfData[i].name + '</h3><p>' +
          listOfData[i].description + '</p>' + listOfData[i].address + '<br />' +
          '</p>' + 'Amount of people checked in here: ' + listOfData[i].checkedIn +
          ((isSight) ? '' : '<br />' + 'Estimated maximum amount of people: ' + this.listOfEventData[i].amount + '<br />' +
            "Starts: " + this.listOfEventData[i].dateFrom.toString().split("T").shift() +
            " at: " + this.listOfEventData[i].time.toString().split("T").pop() + '<br />' + "Ends: " + this.listOfEventData[i].dateTo.toString().split("T").shift() +
            " at: " + this.listOfEventData[i].endTime.toString().split("T").pop() + '<br />') + 'Distance to: ' + meters.toFixed(2) + 'm <br />' + '<br />' +
          ((listOfData[i].isCheckedIn == true) ? '<button class="checkIn" style="display: none">Check in</button>' :
            '<button class="checkIn" disabled>Check in ' + listOfData[i].points + 'p </button>') +
          ((isSight) ? (this.listOfSightData[i].isGamePlayed == true) ?
            '<button class="playGame" style="display: none">Play game</button>' : '<button class="playGame" disabled>Play game</button>' : '') + '</div>'
        );
        markers[i].update();
      }
    }
  }

  getPointsForEvent(event: any) {
    var eventId = this.listOfEventData[event._source.options.id].id;
    this.consumerService.eventCheckIn(eventId).subscribe(data => {
      this.sendReceiveService.pointSender(true);
      this.listOfEventData[event._source.options.id].checkedIn = this.listOfEventData[event._source.options.id].checkedIn + 1;
      this.eventService.editEvent(this.listOfEventData[event._source.options.id], this.listOfEventData[event._source.options.id].id).subscribe(() => {
        this.eventMarkers[event._source.options.id]._popup.setContent(
          '<div style="text-align: center"><h3>' + this.listOfEventData[event._source.options.id].name +
          '</h3><p>' + this.listOfEventData[event._source.options.id].description +
          '</p>' + this.listOfEventData[event._source.options.id].address + '<br />' +
          'Amount of people checked in here: ' + this.listOfEventData[event._source.options.id].checkedIn +
          '<br />' + 'Estimated maximum amount of people: ' + this.listOfEventData[event._source.options.id].amount + '<br />' +
          "Starts: " + this.listOfEventData[event._source.options.id].dateFrom.toString().split("T").shift() +
          " at: " + this.listOfEventData[event._source.options.id].time.toString().split("T").pop() + '<br />' + "Ends: " +
          this.listOfEventData[event._source.options.id].dateTo.toString().split("T").shift() +
          " at: " + this.listOfEventData[event._source.options.id].endTime.toString().split("T").pop() + '<br />' + 
          '<button class="checkIn" style="display: none">Check in</button>' + '</div>');
        this.listOfEventData[event._source.options.id].isCheckedIn = true;
        this.setEventMarkerIcon(this.listOfEventData[event._source.options.id]);
        this.eventMarkers[event._source.options.id].setIcon(this.eventSelectionIcon);
        this.eventMarkers[event._source.options.id].update();
      });
    });
  }

  getPointsForSight(sight: any) {
    if (this.isAuthenticated()) {
      if (this.listOfSightData[sight._source.options.id].isCheckedIn == false) {
      var sightId = sight._source.options.title;
      this.consumerService.sightCheckIn(sightId, false, 0).subscribe(() => {
        this.sendReceiveService.pointSender(true);
        this.listOfSightData[sight._source.options.id].checkedIn = this.listOfSightData[sight._source.options.id].checkedIn + 1;
        this.sightService.editSight(this.listOfSightData[sight._source.options.id], this.listOfSightData[sight._source.options.id].id).subscribe(() => {
        });
      });
        this.sightsMarkers[sight._source.options.id]._popup.setContent(
          '<div style="text-align: center"><h3>' + this.listOfSightData[sight._source.options.id].name +
          '</h3><p>' + this.listOfSightData[sight._source.options.id].description +
          '</p>' + this.listOfSightData[sight._source.options.id].address + '<br />' +
          'Amount of people checked in here: ' + this.listOfSightData[sight._source.options.id].checkedIn + '<br />' + '<br />' +
        '<button class="checkIn" style="display: none">Check in</button>' + ((this.listOfSightData[sight._source.options.id].isGamePlayed) ?
            '<button class="playGame" style="display: none">Play Game</button>' : '<button class="playGame">Play Game</button>') + '</div>')
        this.listOfSightData[sight._source.options.id].isCheckedIn = true;
        this.setSightMarkerIcon(this.listOfSightData[sight._source.options.id]);
        this.sightsMarkers[sight._source.options.id].setIcon(this.sightSelectionIcon);
        this.sightsMarkers[sight._source.options.id].update();
      }
    }
  }

  playGame(sight: any) {
    var sightId = sight._source.options.title;
    if (this.isAuthenticated()) {
      if (this.listOfSightData[sight._source.options.id].isGamePlayed == false) {

      if (this.listOfSightData[sight._source.options.id].quizTemplate != null) {
        const dialogRef = this.dialog.open(QuizGameComponent, {
          width: '550px',
          data: {
            quizId: this.listOfSightData[sight._source.options.id].quizTemplate.id,
            quizName: this.listOfSightData[sight._source.options.id].quizTemplate.title,
            sightID: sightId
          }
        });
        dialogRef.afterClosed().subscribe(points => {
          if (points != undefined) {
            this.consumerService.sightCheckIn(sightId, true, points).subscribe(() => {
              if (this.listOfSightData[sight._source.options.id].isCheckedIn == false) {
                this.listOfSightData[sight._source.options.id].isCheckedIn = true;
              }
              this.setAfterGameMarker(sight);
              this.sendReceiveService.pointSender(true);
            });
          } else {
            this.consumerService.sightCheckIn(sightId, true, 0).subscribe(() => {
              if (this.listOfSightData[sight._source.options.id].isCheckedIn == false) {
                this.listOfSightData[sight._source.options.id].isCheckedIn = true;
              }
              this.setAfterGameMarker(sight);
            });
          }
        });
      }
      else {
        const dialogRef = this.dialog.open(PictureGameComponent, {
          width: '550px',
          data: {
          }
        });
        dialogRef.afterClosed().subscribe(points => {
          if (points != undefined) {
            if (points) {
              this.consumerService.sightCheckIn(sightId, true, 10).subscribe(() => {
                if (this.listOfSightData[sight._source.options.id].isCheckedIn == false) {
                  this.listOfSightData[sight._source.options.id].isCheckedIn = true;
                }
                this.setAfterGameMarker(sight);
                this.sendReceiveService.pointSender(true);
              });
            }
          }
        });
        }
      }
    }
  }

  setAfterGameMarker(sight: any) {
    this.listOfSightData[sight._source.options.id].isGamePlayed = true;
    this.sightsMarkers[sight._source.options.id]._popup.setContent(
      '<div style="text-align: center"><h3>' + this.listOfSightData[sight._source.options.id].name +
      '</h3><p>' + this.listOfSightData[sight._source.options.id].description +
      '</p>' + this.listOfSightData[sight._source.options.id].address + '<br />' + 'Amount of people checked in here: ' +
      this.listOfSightData[sight._source.options.id].checkedIn + '<br />' + '<br />' +
      ((this.listOfSightData[sight._source.options.id].isCheckedIn) ? '<button class="checkIn" style="display: none">Check in</button>' :
        '<button class="checkIn">Check in ' + this.listOfSightData[sight._source.options.id].points + 'p </button>') +
      '<button style="display: none" class="playGame">Play Game</button>' + '</div>')
    this.setSightMarkerIcon(this.listOfSightData[sight._source.options.id]);
    this.sightsMarkers[sight._source.options.id].setIcon(this.sightSelectionIcon);
    this.sightsMarkers[sight._source.options.id].update();
  }
}
