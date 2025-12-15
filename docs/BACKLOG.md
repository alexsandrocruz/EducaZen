# 📝 Backlog - EducaZen

**Última Atualização:** 15 de Dezembro de 2024

---

## 🎯 Product Backlog

Este documento contém todas as funcionalidades planejadas para o EducaZen, organizadas por prioridade e módulo.

---

## 📊 Prioridades

- **P0** - Crítico (MVP / Bloqueador)
- **P1** - Alta (Essencial para lançamento)
- **P2** - Média (Importante, mas não bloqueador)
- **P3** - Baixa (Nice to have)

---

## 🔧 Backend API (ABP.io + .NET 10)

### 🏗️ Infraestrutura e Configuração

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| BE-001 | Configurar Redis no Docker Compose | P0 | 🔴 To Do | 2h |
| BE-002 | Configurar CORS para Angular e Mobile | P0 | 🔴 To Do | 1h |
| BE-003 | Configurar Swagger com documentação rica | P1 | 🔴 To Do | 3h |
| BE-004 | Configurar MinIO para upload de arquivos | P0 | 🔴 To Do | 4h |
| BE-005 | Implementar gerenciamento de arquivos (Application Service) | P1 | 🔴 To Do | 8h |

### 👨‍🎓 Módulo: Alunos

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AL-001 | Criar entidade `Aluno` no Domain | P0 | 🔴 To Do | 2h |
| AL-002 | Criar DTOs (AlunoDto, CreateUpdateAlunoDto) | P0 | 🔴 To Do | 2h |
| AL-003 | Criar IAlunoAppService e implementação | P0 | 🔴 To Do | 4h |
| AL-004 | Criar AlunoController (API) | P0 | 🔴 To Do | 2h |
| AL-005 | Criar migration para tabela Alunos | P0 | 🔴 To Do | 1h |
| AL-006 | Implementar upload de foto do aluno | P1 | 🔴 To Do | 4h |
| AL-007 | Implementar busca/filtros avançados | P1 | 🔴 To Do | 3h |
| AL-008 | Implementar soft delete | P1 | 🔴 To Do | 2h |
| AL-009 | Criar seeds de dados para testes | P2 | 🔴 To Do | 2h |
| AL-010 | Implementar validações de negócio | P0 | 🔴 To Do | 3h |

**Campos da Entidade Aluno:**
- Nome completo
- CPF
- Data de nascimento
- Foto
- Endereço (rua, número, complemento, bairro, cidade, estado, CEP)
- Contatos (telefone, celular, email)
- Responsáveis (nome, CPF, parentesco, contatos)
- Matrícula (número único)
- Data de matrícula
- Status (ativo, inativo, trancado)
- Observações

### 👨‍🏫 Módulo: Professores

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| PR-001 | Criar entidade `Professor` no Domain | P0 | 🔴 To Do | 2h |
| PR-002 | Criar DTOs de Professor | P0 | 🔴 To Do | 2h |
| PR-003 | Criar IProfessorAppService e implementação | P0 | 🔴 To Do | 4h |
| PR-004 | Criar ProfessorController | P0 | 🔴 To Do | 2h |
| PR-005 | Criar migration para tabela Professores | P0 | 🔴 To Do | 1h |
| PR-006 | Implementar upload de foto do professor | P1 | 🔴 To Do | 2h |
| PR-007 | Implementar especialidades/formações do professor | P1 | 🔴 To Do | 4h |
| PR-008 | Relacionar professor com matérias que leciona | P0 | 🔴 To Do | 3h |

**Campos da Entidade Professor:**
- Nome completo
- CPF
- RG
- Data de nascimento
- Foto
- Endereço
- Contatos
- Formação acadêmica
- Especialidades/Matérias
- Data de contratação
- Status (ativo, licença, desligado)

### 🏫 Módulo: Turmas

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| TU-001 | Criar entidade `Turma` no Domain | P0 | 🔴 To Do | 2h |
| TU-002 | Criar DTOs de Turma | P0 | 🔴 To Do | 2h |
| TU-003 | Criar ITurmaAppService e implementação | P0 | 🔴 To Do | 4h |
| TU-004 | Criar TurmaController | P0 | 🔴 To Do | 2h |
| TU-005 | Criar migration para Turmas | P0 | 🔴 To Do | 1h |
| TU-006 | Implementar relação Turma-Alunos (N-N) | P0 | 🔴 To Do | 4h |
| TU-007 | Implementar relação Turma-Matérias (N-N) | P0 | 🔴 To Do | 4h |
| TU-008 | Implementar grade horária da turma | P1 | 🔴 To Do | 8h |
| TU-009 | Limitar capacidade máxima de alunos por turma | P2 | 🔴 To Do | 2h |

**Campos da Entidade Turma:**
- Nome/Código (ex: "9º Ano A", "Turma 301")
- Ano letivo
- Período (manhã, tarde, noite)
- Série/Ano
- Sala/Local
- Capacidade máxima
- Alunos matriculados
- Matérias/Disciplinas
- Professor responsável (tutor)

### 📚 Módulo: Matérias/Disciplinas

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| MA-001 | Criar entidade `Materia` no Domain | P0 | 🔴 To Do | 2h |
| MA-002 | Criar DTOs de Matéria | P0 | 🔴 To Do | 2h |
| MA-003 | Criar IMateriaAppService e implementação | P0 | 🔴 To Do | 3h |
| MA-004 | Criar MateriaController | P0 | 🔴 To Do | 2h |
| MA-005 | Criar migration para Matérias | P0 | 🔴 To Do | 1h |
| MA-006 | Configurar carga horária por matéria | P1 | 🔴 To Do | 3h |

**Campos da Entidade Matéria:**
- Nome (ex: "Matemática", "Português")
- Código (sigla)
- Descrição
- Carga horária semanal
- Ementa

### 📊 Módulo: Avaliações e Notas

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AV-001 | Criar entidade `Avaliacao` no Domain | P0 | 🔴 To Do | 3h |
| AV-002 | Criar entidade `Nota` no Domain | P0 | 🔴 To Do | 2h |
| AV-003 | Criar DTOs de Avaliação e Nota | P0 | 🔴 To Do | 3h |
| AV-004 | Criar IAvaliacaoAppService e implementação | P0 | 🔴 To Do | 6h |
| AV-005 | Criar NotaController | P0 | 🔴 To Do | 3h |
| AV-006 | Criar migrations | P0 | 🔴 To Do | 1h |
| AV-007 | Implementar lançamento de notas em lote | P1 | 🔴 To Do | 6h |
| AV-008 | Implementar cálculo automático de médias | P0 | 🔴 To Do | 4h |
| AV-009 | Implementar boletim completo do aluno | P1 | 🔴 To Do | 6h |
| AV-010 | Configurar períodos avaliativos (bimestre, trimestre) | P1 | 🔴 To Do | 4h |

**Campos da Entidade Avaliação:**
- Tipo (prova, trabalho, seminário, participação)
- Data
- Turma
- Matéria
- Professor
- Valor (peso)
- Descrição

**Campos da Entidade Nota:**
- Avaliação (FK)
- Aluno (FK)
- Valor obtido
- Observações

### 📅 Módulo: Frequência/Presença

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FR-001 | Criar entidade `Presenca` no Domain | P0 | 🔴 To Do | 2h |
| FR-002 | Criar DTOs de Presença | P0 | 🔴 To Do | 2h |
| FR-003 | Criar IPresencaAppService e implementação | P0 | 🔴 To Do | 4h |
| FR-004 | Criar PresencaController | P0 | 🔴 To Do | 2h |
| FR-005 | Criar migrations | P0 | 🔴 To Do | 1h |
| FR-006 | Implementar registro de presença em lote | P1 | 🔴 To Do | 4h |
| FR-007 | Calcular percentual de frequência por aluno/matéria | P1 | 🔴 To Do | 3h |
| FR-008 | Gerar alertas de faltas excessivas | P2 | 🔴 To Do | 4h |
| FR-009 | Relatório de frequência mensal | P1 | 🔴 To Do | 4h |

**Campos da Entidade Presença:**
- Data
- Aula (Turma + Matéria + Horário)
- Aluno
- Status (presente, faltou, atrasado, justificado)
- Justificativa

---

## 🎨 Frontend Web Admin (Angular)

### 🏗️ Infraestrutura

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FE-001 | Configurar tema CoreUI ou similar | P1 | 🔴 To Do | 4h |
| FE-002 | Criar componentes base reutilizáveis | P1 | 🔴 To Do | 8h |
| FE-003 | Configurar interceptors HTTP | P0 | 🔴 To Do | 2h |
| FE-004 | Implementar guards de autenticação | P0 | 🔴 To Do | 3h |
| FE-005 | Configurar toasts/notificações | P1 | 🔴 To Do | 2h |

### 📊 Dashboard

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| DA-001 | Criar layout principal do dashboard | P0 | 🔴 To Do | 6h |
| DA-002 | Cards de estatísticas rápidas | P1 | 🔴 To Do | 4h |
| DA-003 | Gráfico de notas por turma | P2 | 🔴 To Do | 6h |
| DA-004 | Gráfico de frequência geral | P2 | 🔴 To Do | 6h |
| DA-005 | Lista de avisos/tarefas | P2 | 🔴 To Do | 4h |

### 👨‍🎓 Alunos

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AL-FE-001 | Listagem de alunos com paginação | P0 | 🔴 To Do | 6h |
| AL-FE-002 | Formulário de cadastro de aluno | P0 | 🔴 To Do | 8h |
| AL-FE-003 | Edição de aluno | P0 | 🔴 To Do | 4h |
| AL-FE-004 | Visualização de detalhes do aluno | P1 | 🔴 To Do | 4h |
| AL-FE-005 | Upload de foto do aluno | P1 | 🔴 To Do | 4h |
| AL-FE-006 | Filtros (nome, turma, status) | P1 | 🔴 To Do | 4h |
| AL-FE-007 | Busca global | P1 | 🔴 To Do | 3h |
| AL-FE-008 | Ações em massa (ativar/desativar) | P2 | 🔴 To Do | 4h |

### 👨‍🏫 Professores

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| PR-FE-001 | Listagem de professores | P0 | 🔴 To Do | 4h |
| PR-FE-002 | Formulário de cadastro | P0 | 🔴 To Do | 6h |
| PR-FE-003 | Atribuição de matérias ao professor | P0 | 🔴 To Do | 4h |
| PR-FE-004 | Visualização de turmas atribuídas | P1 | 🔴 To Do | 3h |

### 🏫 Turmas

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| TU-FE-001 | Listagem de turmas | P0 | 🔴 To Do | 4h |
| TU-FE-002 | Formulário de cadastro de turma | P0 | 🔴 To Do | 6h |
| TU-FE-003 | Atribuir alunos à turma | P0 | 🔴 To Do | 6h |
| TU-FE-004 | Atribuir matérias/professores à turma | P0 | 🔴 To Do | 6h |
| TU-FE-005 | Visualizar grade horária | P1 | 🔴 To Do | 8h |
| TU-FE-006 | Editar grade horária | P1 | 🔴 To Do | 8h |

### 📊 Notas e Avaliações

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| NT-FE-001 | Criar avaliação | P0 | 🔴 To Do | 4h |
| NT-FE-002 | Lançar notas para turma inteira | P0 | 🔴 To Do | 8h |
| NT-FE-003 | Visualizar boletim individual | P1 | 🔴 To Do | 6h |
| NT-FE-004 | Exportar boletim em PDF | P2 | 🔴 To Do | 6h |
| NT-FE-005 | Relatório de desempenho por turma | P2 | 🔴 To Do | 8h |

### 📅 Frequência

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FR-FE-001 | Registrar frequência por aula | P0 | 🔴 To Do | 6h |
| FR-FE-002 | Visualizar frequência de aluno | P1 | 🔴 To Do | 4h |
| FR-FE-003 | Relatório de frequência mensal | P1 | 🔴 To Do | 6h |
| FR-FE-004 | Alertas de faltas excessivas | P2 | 🔴 To Do | 4h |

---

## 📱 Mobile App (React Native Expo)

### 🏗️ Setup Inicial

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| MB-001 | Criar projeto Expo com TypeScript | P0 | 🔴 To Do | 2h |
| MB-002 | Configurar React Navigation | P0 | 🔴 To Do | 3h |
| MB-003 | Configurar Axios para API | P0 | 🔴 To Do | 2h |
| MB-004 | Configurar Context API (state management) | P0 | 🔴 To Do | 4h |
| MB-005 | Criar componentes base (Button, Input, Card) | P1 | 🔴 To Do | 6h |
| MB-006 | Configurar tema (cores, fonts) | P1 | 🔴 To Do | 4h |

### 🔐 Autenticação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AU-001 | Tela de Login | P0 | 🔴 To Do | 6h |
| AU-002 | Integração com OpenIddict (token) | P0 | 🔴 To Do | 8h |
| AU-003 | Armazenar token no AsyncStorage | P0 | 🔴 To Do | 2h |
| AU-004 | Auto-refresh de token | P1 | 🔴 To Do | 4h |
| AU-005 | Tela de Recuperação de Senha | P1 | 🔴 To Do | 4h |
| AU-006 | Logout | P0 | 🔴 To Do | 2h |

### 📊 Dashboard do Aluno

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| DB-001 | Tela principal com resumo | P0 | 🔴 To Do | 8h |
| DB-002 | Card de próximas aulas | P1 | 🔴 To Do | 4h |
| DB-003 | Card de avisos importantes | P1 | 🔴 To Do | 4h |
| DB-004 | Card de notas recentes | P1 | 🔴 To Do | 4h |

### 📝 Notas

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| NT-MB-001 | Listar notas por matéria | P0 | 🔴 To Do | 6h |
| NT-MB-002 | Visualizar boletim completo | P0 | 🔴 To Do | 6h |
| NT-MB-003 | Gráficos de desempenho | P2 | 🔴 To Do | 6h |

### 📅 Frequência

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FR-MB-001 | Visualizar frequência por matéria | P1 | 🔴 To Do | 4h |
| FR-MB-002 | Percentual de frequência global | P1 | 🔴 To Do | 3h |

### 📅 Calendário

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| CA-001 | Calendário de eventos escolares | P1 | 🔴 To Do | 8h |
| CA-002 | Datas de provas destacadas | P1 | 🔴 To Do | 4h |
| CA-003 | Notificações de eventos próximos | P2 | 🔴 To Do | 6h |

### 💬 Comunicação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| CM-001 | Listar avisos da escola | P1 | 🔴 To Do | 4h |
| CM-002 | Enviar mensagem para professor | P2 | 🔴 To Do | 8h |
| CM-003 | Notificações push | P2 | 🔴 To Do | 12h |

---

## 📚 Documentação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| DOC-001 | Criar README principal | P0 | ✅ Concluído | - |
| DOC-002 | Criar STATUS.md | P0 | ✅ Concluído | - |
| DOC-003 | Criar BACKLOG.md | P0 | ✅ Concluído | - |
| DOC-004 | Documentar API (Swagger enriquecido) | P1 | 🔴 To Do | 8h |
| DOC-005 | Criar diagramas de arquitetura | P1 | 🔴 To Do | 6h |
| DOC-006 | Criar guia de instalação completo | P1 | 🔴 To Do | 4h |
| DOC-007 | Documentar padrões de código | P2 | 🔴 To Do | 4h |

---

## 💡 Features Futuras (Icebox)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FT-001 | Sistema de mensagens em tempo real (SignalR) | P3 | 🔵 Icebox | 16h |
| FT-002 | Portal do Professor (app mobile separado) | P3 | 🔵 Icebox | 80h |
| FT-003 | App para Pais/Responsáveis | P3 | 🔵 Icebox | 40h |
| FT-004 | Integração com sistema de pagamento | P3 | 🔵 Icebox | 24h |
| FT-005 | Relatórios avançados com Power BI | P3 | 🔵 Icebox | 32h |
| FT-006 | Gamificação (badges, conquistas) | P3 | 🔵 Icebox | 40h |
| FT-007 | Sistema de biblioteca escolar | P3 | 🔵 Icebox | 24h |
| FT-008 | Integração com plataforma de videoconferência | P3 | 🔵 Icebox | 16h |
| FT-009 | Sistema de tarefas/deveres de casa | P3 | 🔵 Icebox | 20h |
| FT-010 | Exportação de histórico escolar oficial | P3 | 🔵 Icebox | 12h |

---

## 📈 Métricas Estimadas

- **Total de histórias:** ~150+
- **Estimativa total (MVP):** ~500h
- **Estimativa Backend:** ~150h
- **Estimativa Frontend Web:** ~200h
- **Estimativa Mobile:** ~100h
- **Estimativa Docs/Infra:** ~50h

---

**Próxima Revisão do Backlog:** 22 de Dezembro de 2024
