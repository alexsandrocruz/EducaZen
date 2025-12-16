import { Component } from '@angular/core';

@Component({
    selector: 'app-exam-list',
    template: `
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-file-alt"></i> Exames e Simulados</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">
          <i class="fas fa-info-circle"></i> 
          Módulo de gestão de exames e simulados em desenvolvimento.
        </p>
        <p>Funcionalidades planejadas:</p>
        <ul>
          <li>Criar simulados (ENEM, Vestibular, Treino)</li>
          <li>Montar provas com banco de questões</li>
          <li>Configurar duração e disponibilidade</li>
          <li>Publicar para alunos/turmas</li>
          <li>Embaralhar questões e alternativas</li>
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
      color: #d69e2e;
    }
    .text-muted {
      padding: 10px;
      background: #fffaf0;
      border-left: 4px solid #ed8936;
      margin-bottom: 15px;
    }
  `]
})
export class ExamListComponent { }
