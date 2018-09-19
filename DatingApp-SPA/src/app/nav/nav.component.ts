import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    model: any = {};

    constructor(
        public authService: AuthService,
        private alertify: AlertifyService,
        private router: Router
    ) {}

    ngOnInit() {}

    login() {
        this.authService.login(this.model).subscribe(
            next => {
                this.alertify.success('Logged in successfully');
                this.router.navigate(['/members']);
            },
            error => {
                this.alertify.error(error);
            }
        );
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    logout() {
        localStorage.removeItem('token');
        this.alertify.message('Logged Out');
        this.router.navigate(['/home']);
    }
}
