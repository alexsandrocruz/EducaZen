import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero-section.component.html',
    styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
    isAuthenticated$: Observable<boolean>;
    userName$: Observable<string>;

    constructor(
        private config: ConfigStateService,
        private oauthService: OAuthService,
        private router: Router
    ) {
        this.isAuthenticated$ = this.config.getOne$('currentUser').pipe(
            map(user => user?.isAuthenticated || false)
        );

        this.userName$ = this.config.getOne$('currentUser').pipe(
            map(user => user?.userName || '')
        );
    }

    logout() {
        this.oauthService.revokeTokenAndLogout();
        this.router.navigate(['/']);
    }
}
