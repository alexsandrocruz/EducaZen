import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pricing-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pricing-section.component.html',
    styleUrls: ['./pricing-section.component.scss']
})
export class PricingSectionComponent {
    billingCycle: 'monthly' | 'annual' = 'monthly';

    setBilling(cycle: 'monthly' | 'annual') {
        this.billingCycle = cycle;
    }
}
