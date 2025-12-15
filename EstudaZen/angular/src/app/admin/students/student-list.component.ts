import { Component } from '@angular/core';

@Component({
    selector: 'app-student-list',
    template: `
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-user-graduate"></i> Alunos</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">
          <i class="fas fa-info-circle"></i> 
          Módulo de gestão de alunos (CRUD administrativo).
        </p>
        <p>Funcionalidades planejadas:</p>
        <ul>
          <li>Listar alunos por escola/turma</li>
          <li>Cadastrar novos alunos</li>
          <li>Editar dados pessoais (nome, CPF, matrícula)</li>
          <li>Atribuir aluno a turma</li>
          <li>Gerenciar status (Ativo, Inativo, Transferido)</li>
          <li>Upload de foto do aluno</li>
        </ul>
        <div class="alert alert-info mt-3">
          <i class="fas fa-mobile-alt"></i> 
          <strong>Nota:</strong> A experiência do aluno (fazer provas, ver resultados, rankings) 
          será disponibilizada via <strong>aplicativo móvel</strong>.
        </div>
      </div>
    </div>
  `,
    styles: [`
    .card {
      margin: 20px;
    }
    .card-header h3 {
      margin: 0;
      color: #805ad5;
    }
    .text-muted {
      padding: 10px;
      background: #faf5ff;
      border-left: 4px solid #9f7aea;
      margin-bottom: 15px;
    }
    .alert-info {
      background: #e6fffa;
      border-left: 4px solid #319795;
      padding: 12px;
    }
  `]
})
export class StudentListComponent { }
