import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-9-i18n';
  langs = ['en', 'lt'];

  constructor(private translateService: TranslateService) { }

  public ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translateService.setDefaultLang(browserlang);
    } else {
      this.translateService.setDefaultLang('en');
    }
  }


  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}
