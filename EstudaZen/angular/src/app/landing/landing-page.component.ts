import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero/hero-section.component';
import { FeaturesSectionComponent } from './features/features-section.component';
import { PricingSectionComponent } from './pricing/pricing-section.component';
import { TestimonialsSectionComponent } from './testimonials/testimonials-section.component';
import { FaqSectionComponent } from './faq/faq-section.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        CommonModule,
        HeroSectionComponent,
        FeaturesSectionComponent,
        PricingSectionComponent,
        TestimonialsSectionComponent,
        FaqSectionComponent
    ],
    template: `
    <div class="landing-page">
        <app-hero-section></app-hero-section>
        <app-features-section></app-features-section>
        <app-pricing-section></app-pricing-section>
        <app-testimonials-section></app-testimonials-section>
        <app-faq-section></app-faq-section>
        
        <!-- Simple Footer -->
        <footer class="py-8 bg-[#130b1b] border-t border-white/5 text-center text-slate-500 text-sm">
            <p>&copy; 2025 EstudaZen. Todos os direitos reservados.</p>
        </footer>
    </div>
  `,
    styles: [`
    :host {
        display: block;
        width: 100%;
        overflow-x: hidden;
    }
  `]
})
export class LandingPageComponent {
}
