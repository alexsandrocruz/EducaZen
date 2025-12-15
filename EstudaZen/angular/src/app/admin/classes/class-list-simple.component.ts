import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-class-list-simple',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div style="padding: 24px;">
      <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h1 style="color: #805ad5; margin: 0 0 16px 0;">
          <i class="fas fa-users"></i> Turmas (Classes)
        </h1>
        <p style="color: #718096; margin-bottom: 20px;">
          Módulo de gestão de turmas - Em desenvolvimento
        </p>
        
        <div style="background: #f7fafc; border-left: 4px solid #805ad5; padding: 16px; border-radius: 6px;">
          <p style="margin: 0; color: #4a5568;">
            <strong>Status:</strong> Aguardando geração de proxies TypeScript do backend.
          </p>
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #718096;">
            O backend está configurado, mas os proxies ainda não foram gerados pelo ABP CLI.
          </p>
        </div>

        <div style="margin-top: 24px;">
          <h3 style="color: #2d3748; font-size: 16px;">Funcionalidades Planejadas:</h3>
          <ul style="color: #4a5568;">
            <li>Listar turmas por escola e ano letivo</li>
            <li>Criar nova turma com série e turno</li>
            <li>Editar informações da turma</li>
            <li>Gerenciar status ativo/inativo</li>
            <li>Filtrar por ano letivo e status</li>
          </ul>
        </div>

        <button 
          (click)="goBack()"
          style="margin-top: 20px; padding: 10px 20px; background: #805ad5; color: white; border: none; border-radius: 8px; cursor: pointer;"
        >
          ← Voltar para Administração
        </button>
      </div>
    </div>
  `,
    styles: []
})
export class ClassListSimpleComponent {
    constructor(private router: Router) { }

    goBack() {
        this.router.navigate(['/admin']);
    }
}
