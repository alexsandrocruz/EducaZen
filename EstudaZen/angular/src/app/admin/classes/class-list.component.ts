import { Component } from '@angular/core';

@Component({
    selector: 'app-class-list',
    template: `
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-users"></i> Classes (Turmas)</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">
          <i class="fas fa-info-circle"></i> 
          Módulo de gestão de turmas em desenvolvimento.
        </p>
        <p>Funcionalidades planejadas:</p>
        <ul>
          <li>Criar e gerenciar turmas por escola</li>
          <li>Definir série (GradeLevel) e turno (Shift)</li>
          <li>Gerenciar ano letivo</li>
          <li>Atribuir alunos às turmas</li>
        </ul>
      </div>
    </div>
  `,
    styles: [`
    .card {
      margin: 20px;
    }
    .card-header h3 {
      margin: 0;
      color: #5a67d8;
    }
    .text-muted {
      padding: 10px;
      background: #f7fafc;
      border-left: 4px solid #4299e1;
      margin-bottom: 15px;
    }
  `]
})
export class ClassListComponent { }
