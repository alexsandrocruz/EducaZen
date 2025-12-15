import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-class-form',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="admin-container">
      <h1>Formulário de Turma</h1>
      <p>Em desenvolvimento...</p>
      <button (click)="goBack()" class="zen-btn zen-btn--secondary">Voltar</button>
    </div>
  `
})
export class ClassFormComponent {
    private router = inject(Router);

    goBack() {
        this.router.navigate(['/admin/classes']);
    }
}
