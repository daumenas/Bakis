import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  title = 'angular-9-i18n';
  langs = ['en', 'lt'];
  selected = 'en';


  constructor(private auth: AuthenticationService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translateService.setDefaultLang(browserlang);
    } else {
      this.translateService.setDefaultLang('en');
    }
    if (localStorage.getItem('lang') != null) {
      this.selected = localStorage.getItem('lang');
      this.translateService.setDefaultLang(localStorage.getItem('lang'));
    }
  }


  public useLanguage(lang: string): void {
    localStorage.setItem("lang", lang);
    this.translateService.setDefaultLang(lang);
    if (this.router.url == "/" || this.router.url == "/eventpage") {
      location.reload();
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  check() {
    return this.auth.isAuthenticated();
  }

  checkIfAdmin() {
    if (this.check()) {
      const user = this.auth.decode();
      if (user.role === "Admin") {
        return true;
      }
      return false;
    }
    return false;
  }

  checkIfEvent() {
    if (this.check()) {
      const user = this.auth.decode();
      if (user.role === "Event Organizer") {
        return true;
      }
      return false;
    }
    return false;
  }

  checkIfUser() {
    if (this.check()) {
      const user = this.auth.decode();
      if (user.role === "User" || user.role === "Event Organizer") {
        return true;
      }
      return false;
    }
    return false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
    location.reload();
  }
}
