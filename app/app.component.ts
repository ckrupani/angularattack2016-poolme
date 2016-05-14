import { Component } from 'angular2/core';
import { PmHeaderComponent } from './components/header/header.component';
import { PmContentComponent } from './components/content/content.component';
import { PmFooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'pool-me-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [PmHeaderComponent, PmContentComponent, PmFooterComponent]
})

export class AppComponent {}