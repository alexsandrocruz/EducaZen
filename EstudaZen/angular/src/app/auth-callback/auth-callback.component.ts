import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';

@Component({
    selector: 'app-auth-callback',
    standalone: true,
    template: `
    <div class="flex items-center justify-center min-h-screen bg-[#191022]">
      <div class="text-white text-lg">Redirecionando...</div>
    </div>
  `
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        private config: ConfigStateService,
        private router: Router
    ) { }

    ngOnInit() {
        // Wait for config to be loaded
        setTimeout(() => {
            const tenantId = this.config.getDeep('currentUser.tenantId');

            if (tenantId) {
                // User is from a tenant - redirect to tenant dashboard
                this.router.navigate(['/dashboard']);
            } else {
                // User is host - redirect to host dashboard
                this.router.navigate(['/dashboard']);
            }
        }, 500);
    }
}
