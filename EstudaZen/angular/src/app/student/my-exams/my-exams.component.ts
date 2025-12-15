import { Component } from '@angular/core';

@Component({
    selector: 'app-my-exams',
    template: `
    <div class="card">
      <div class="card-header">
        <h3><i class="fas fa-clipboard-list"></i> Minhas Provas</h3>
      </div>
      <div class="card-body">
        <p class="text-muted">
          <i class="fas fa-info-circle"></i> 
          Interface de realização de provas em desenvolvimento.
        </p>
        <p>Funcionalidades planejadas:</p>
        <ul>
          <li>Ver provas disponíveis</li>
          <li>Iniciar nova tentativa de prova</li>
          <li>Continuar prova em andamento</li>
          <li>Responder questões com cronômetro</li>
          <li>Revisar gabarito após conclusão</li>
          <li>Histórico de tentativas e pontuações</li>
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
      color: #38a169;
    }
    .text-muted {
      padding: 10px;
      background: #f0fff4;
      border-left: 4px solid #48bb78;
      margin-bottom: 15px;
    }
  `]
})
export class MyExamsComponent { }
