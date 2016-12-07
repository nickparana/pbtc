import { Component } from '@angular/core';
import '../../public/css/styles.css';
import 'font-awesome/css/font-awesome.css';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'BuscaTuCarga.com';   
}