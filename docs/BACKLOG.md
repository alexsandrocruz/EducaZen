# 📝 Backlog - EstudaZen (EducaZen)

**Sistema Multi-tenant de Simulados ENEM/Vestibular**

**Última Atualização:** 15 de Dezembro de 2024

---

## 🎯 Product Backlog

Este documento contém todas as funcionalidades planejadas para o EstudaZen, organizadas por prioridade e módulo.

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
| BE-004 | Configurar MinIO para upload de imagens | P0 | 🔴 To Do | 2h |
| BE-005 | Implementar serviço de upload para MinIO | P1 | 🔴 To Do | 4h |
| BE-006 | Configurar Multi-tenancy do ABP | P0 | 🔴 To Do | 8h |

### � Módulo: Escolas (Schools)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| SC-001 | Criar entidade `School` no Domain | P0 | 🔴 To Do | 2h |
| SC-002 | Criar DTOs (SchoolDto, CreateUpdateSchoolDto) | P0 | 🔴 To Do | 2h |
| SC-003 | Criar ISchoolAppService e implementação | P0 | 🔴 To Do | 4h |
| SC-004 | Criar SchoolController (API) | P0 | 🔴 To Do | 2h |
| SC-005 | Criar migration para tabela Schools | P0 | 🔴 To Do | 1h |
| SC-006 | Implementar validações (CNPJ, Code único) | P1 | 🔴 To Do | 3h |
| SC-007 | Implementar filtros e busca | P1 | 🔴 To Do | 3h |
| SC-008 | Criar seeds de dados para testes | P2 | 🔴 To Do | 2h |

**Campos da Entidade School:**
- Nome, Código (INEP), CNPJ
- Endereço completo (rua, cidade, estado, CEP)
- Contatos (telefone, email)
- Status (ativo/inativo)
- TenantId (multi-tenancy)

### 👨‍� Módulo: Alunos (Students)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| ST-001 | Criar entidade `Student` no Domain | P0 | 🔴 To Do | 2h |
| ST-002 | Criar DTOs de Student | P0 | 🔴 To Do | 2h |
| ST-003 | Criar IStudentAppService e implementação | P0 | 🔴 To Do | 4h |
| ST-004 | Criar StudentController | P0 | 🔴 To Do | 2h |
| ST-005 | Criar migrations | P0 | 🔴 To Do | 1h |
| ST-006 | Implementar upload de foto do aluno (MinIO) | P1 | 🔴 To Do | 4h |
| ST-007 | Implementar busca/filtros avançados | P1 | 🔴 To Do | 3h |
| ST-008 | Implementar validações (CPF, matrícula única) | P0 | 🔴 To Do | 3h |
| ST-009 | Criar seeds de dados para testes | P2 | 🔴 To Do | 2h |
| ST-010 | Endpoint para estatísticas do aluno | P1 | 🔴 To Do | 4h |

**Campos da Entidade Student:**
- Nome completo, CPF, data nascimento
- Foto (URL MinIO)
- Email, telefone
- Número de matrícula
- SchoolId, ClassId (nullable), TenantId
- Status, TotalPoints (gamificação)

### 👨‍🏫 Módulo: Professores (Teachers)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| TE-001 | Criar entidade `Teacher` no Domain | P1 | 🔴 To Do | 2h |
| TE-002 | Criar DTOs de Teacher | P1 | 🔴 To Do | 2h |
| TE-003 | Criar ITeacherAppService e implementação | P1 | 🔴 To Do | 4h |
| TE-004 | Criar TeacherController | P1 | 🔴 To Do | 2h |
| TE-005 | Criar migrations | P1 | 🔴 To Do | 1h |
| TE-006 | Relacionar teacher com subjects | P1 | 🔴 To Do | 3h |

### 🏫 Módulo: Turmas (Classes)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| CL-001 | Criar entidade `Class` no Domain | P0 | 🔴 To Do | 2h |
| CL-002 | Criar DTOs de Class | P0 | 🔴 To Do | 2h |
| CL-003 | Criar IClassAppService e implementação | P0 | 🔴 To Do | 4h |
| CL-004 | Criar ClassController | P0 | 🔴 To Do | 2h |
| CL-005 | Criar migrations | P0 | 🔴 To Do | 1h |
| CL-006 | Implementar atribuição de alunos à turma | P0 | 🔴 To Do | 4h |
| CL-007 | Validar capacidade máxima | P2 | 🔴 To Do | 2h |

### 📚 Módulo: Matérias (Subjects)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| SU-001 | Verificar entidade Subject existente | P0 | 🔴 To Do | 1h |
| SU-002 | Estender Subject com campos adicionais (Color, Icon) | P1 | 🔴 To Do | 2h |
| SU-003 | Implementar matérias globais vs customizadas | P1 | 🔴 To Do | 3h |
| SU-004 | Criar seeds com matérias padrão (Mat, Port, etc) | P0 | 🔴 To Do | 2h |

### ❓ Módulo: Questões (Questions)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| QU-001 | Verificar entidade Question existente | P0 | ✅ Existe | - |
| QU-002 | Verificar entidade QuestionOption existente | P0 | 🔴 To Do | 1h |
| QU-003 | Estender Question com campos (Year, Source, Tags) | P1 | 🔴 To Do | 3h |
| QU-004 | Implementar upload de imagem da questão | P1 | 🔴 To Do | 3h |
| QU-005 | Implementar validação (1 resposta correta) | P0 | 🔴 To Do | 2h |
| QU-006 | Implementar filtros (subject, difficulty, tags) | P1 | 🔴 To Do | 3h |
| QU-007 | Endpoint para questões aleatórias | P1 | 🔴 To Do | 4h |

### � Módulo: Simulados (Exams)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| EX-001 | Criar entidade `Exam` no Domain | P0 | 🔴 To Do | 3h |
| EX-002 | Criar entidade `ExamQuestion` (N-N) | P0 | 🔴 To Do | 2h |
| EX-003 | Criar DTOs de Exam | P0 | 🔴 To Do | 3h |
| EX-004 | Criar IExamAppService e implementação | P0 | 🔴 To Do | 6h |
| EX-005 | Criar ExamController | P0 | 🔴 To Do | 3h |
| EX-006 | Criar migrations | P0 | 🔴 To Do | 1h |
| EX-007 | Implementar montagem de simulado (selecionar questões) | P0 | 🔴 To Do | 8h |
| EX-008 | Implementar publicação de simulado | P0 | 🔴 To Do | 3h |
| EX-009 | Implementar disponibilidade por data/hora | P1 | 🔴 To Do | 4h |
| EX-010 | Implementar embaralhamento de questões/alternativas | P2 | 🔴 To Do | 4h |
| EX-011 | Endpoint para simulados disponíveis (aluno) | P0 | 🔴 To Do | 3h |

### 🎮 Módulo: Sessões de Prova (Exam Sessions)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| ES-001 | Criar entidade `ExamSession` no Domain | P0 | 🔴 To Do | 3h |
| ES-002 | Criar entidade `ExamAnswer` | P0 | 🔴 To Do | 2h |
| ES-003 | Criar DTOs de ExamSession | P0 | 🔴 To Do | 3h |
| ES-004 | Criar IExamSessionAppService | P0 | 🔴 To Do | 8h |
| ES-005 | Endpoint: Iniciar prova | P0 | 🔴 To Do | 4h |
| ES-006 | Endpoint: Responder questão | P0 | 🔴 To Do | 4h |
| ES-007 | Endpoint: Finalizar prova | P0 | 🔴 To Do | 6h |
| ES-008 | Calcular score e estatísticas | P0 | 🔴 To Do | 6h |
| ES-009 | Implementar timeout automático | P1 | 🔴 To Do | 4h |
| ES-010 | Endpoint: Obter resultado com gabarito | P0 | 🔴 To Do | 4h |
| ES-011 | Validar múltiplas tentativas | P2 | 🔴 To Do | 3h |

### 🏆 Módulo: Rankings

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| RA-001 | Criar entidade `StudentRanking` | P1 | 🔴 To Do | 2h |
| RA-002 | Criar IRankingAppService | P1 | 🔴 To Do | 6h |
| RA-003 | Implementar cálculo de ranking global | P1 | 🔴 To Do | 6h |
| RA-004 | Implementar cálculo de ranking por escola | P1 | 🔴 To Do | 4h |
| RA-005 | Implementar cálculo de ranking por turma | P1 | 🔴 To Do | 4h |
| RA-006 | Background job para atualizar rankings | P1 | 🔴 To Do | 6h |
| RA-007 | Endpoint para rankings (com paginação) | P1 | 🔴 To Do | 4h |

### 🎖️ Módulo: Conquistas (Achievements)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AC-001 | Criar entidade `Achievement` | P2 | 🔴 To Do | 2h |
| AC-002 | Criar entidade `StudentAchievement` (N-N) | P2 | 🔴 To Do | 2h |
| AC-003 | Criar IAchievementAppService | P2 | 🔴 To Do | 4h |
| AC-004 | Implementar lógica de desbloqueio automático | P2 | 🔴 To Do | 8h |
| AC-005 | Criar seeds com conquistas padrão | P2 | 🔴 To Do | 3h |
| AC-006 | Endpoint para conquistas do aluno | P2 | 🔴 To Do | 3h |

### 🎓 Módulo: Simulador ENEM

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| EN-001 | Criar entidade `University` | P2 | 🔴 To Do | 2h |
| EN-002 | Criar entidade `Course` | P2 | 🔴 To Do | 2h |
| EN-003 | Criar entidade `EntranceExamCutoff` | P2 | 🔴 To Do | 2h |
| EN-004 | Criar IEntranceExamSimulatorAppService | P2 | 🔴 To Do | 6h |
| EN-005 | Implementar cálculo de chance de aprovação | P2 | 🔴 To Do | 8h |
| EN-006 | Criar seeds com universidades e cursos | P2 | 🔴 To Do | 4h |
| EN-007 | Endpoint para buscar universidades/cursos | P2 | 🔴 To Do | 3h |

### 🔐 Módulo: Gestão de Tenants

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| TN-001 | Expandir módulo de Tenants do ABP | P0 | 🔴 To Do | 6h |
| TN-002 | Adicionar campos customizados (CNPJ, plano) | P0 | 🔴 To Do | 3h |
| TN-003 | Implementar limites por tenant (escolas, alunos) | P1 | 🔴 To Do | 6h |
| TN-004 | Endpoint para estatísticas do tenant | P1 | 🔴 To Do | 4h |

---

## 🎨 Painel Web Administrativo (Angular)

### 🏗️ Infraestrutura

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| FE-001 | Expandir Zen Design System com componentes adicionais | P1 | 🔴 To Do | 8h |
| FE-002 | Criar componente Table estilizado | P0 | 🔴 To Do | 6h |
| FE-003 | Criar componente Modal/Dialog | P1 | 🔴 To Do | 4h |
| FE-004 | Criar componente Dropdown/Select | P1 | 🔴 To Do | 4h |
| FE-005 | Configurar interceptors HTTP | P0 | 🔴 To Do | 2h |
| FE-006 | Implementar guards de autenticação | P0 | 🔴 To Do | 3h |

### 🏢 Painel do Host

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| HO-001 | Criar módulo `host-admin` | P0 | 🔴 To Do | 2h |
| HO-002 | Dashboard do Host | P1 | 🔴 To Do | 8h |
| HO-003 | Gestão de Tenants (Lista) | P0 | 🔴 To Do | 6h |
| HO-004 | Formulário de Tenant | P0 | 🔴 To Do | 6h |
| HO-005 | Configurar planos e limites | P1 | 🔴 To Do | 6h |
| HO-006 | Gestão de Planos (CRUD) | P2 | 🔴 To Do | 8h |
| HO-007 | Logs de auditoria | P2 | 🔴 To Do | 6h |

### �️ Painel do Tenant (Prefeitura)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| TN-FE-001 | Criar módulo `tenant-admin` | P0 | 🔴 To Do | 2h |
| TN-FE-002 | Dashboard da Prefeitura | P1 | 🔴 To Do | 8h |
| TN-FE-003 | Gestão de Escolas (Lista) | P0 | 🔴 To Do | 6h |
| TN-FE-004 | Formulário de Escola | P0 | 🔴 To Do | 6h |
| TN-FE-005 | Estatísticas consolidadas | P1 | 🔴 To Do | 8h |
| TN-FE-006 | Rankings da rede | P2 | 🔴 To Do | 6h |

### � Painel da Escola

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| SC-FE-001 | Criar módulo `school-admin` | P0 | 🔴 To Do | 2h |
| SC-FE-002 | Dashboard da Escola | P1 | 🔴 To Do | 8h |
| SC-FE-003 | Gestão de Alunos (Lista) | P0 | 🔴 To Do | 6h |
| SC-FE-004 | Formulário de Aluno | P0 | 🔴 To Do | 8h |
| SC-FE-005 | Upload de foto do aluno | P1 | 🔴 To Do | 4h |
| SC-FE-006 | Gestão de Turmas (Lista) | P0 | 🔴 To Do | 6h |
| SC-FE-007 | Formulário de Turma | P0 | 🔴 To Do | 6h |
| SC-FE-008 | Atribuir alunos à turma | P0 | 🔴 To Do | 6h |

### 📝 Gestão de Simulados (Escola)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| EX-FE-001 | Listar simulados disponíveis | P0 | 🔴 To Do | 4h |
| EX-FE-002 | Criar simulado (wizard) | P0 | 🔴 To Do | 12h |
| EX-FE-003 | Selecionar questões do banco | P0 | 🔴 To Do | 10h |
| EX-FE-004 | Configurar (título, duração, disponibilidade) | P0 | 🔴 To Do | 6h |
| EX-FE-005 | Publicar/despublicar simulado | P0 | 🔴 To Do | 3h |
| EX-FE-006 | Visualizar resultados dos alunos | P1 | 🔴 To Do | 8h |

### ❓ Banco de Questões (Escola)

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| QU-FE-001 | Usar módulo Questions existente | P0 | ✅ Existe | - |
| QU-FE-002 | Adaptar para novos campos (Year, Source) | P1 | 🔴 To Do | 4h |
| QU-FE-003 | Filtros avançados (matéria, dificuldade, tags) | P1 | 🔴 To Do | 6h |
| QU-FE-004 | Visualização de imagens | P1 | 🔴 To Do | 3h |

### � Relatórios

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| RE-001 | Relatório de desempenho por aluno | P1 | 🔴 To Do | 8h |
| RE-002 | Relatório de desempenho por turma | P1 | 🔴 To Do | 6h |
| RE-003 | Análise de questões (mais erradas) | P2 | 🔴 To Do | 8h |
| RE-004 | Exportar relatórios em PDF/Excel | P2 | 🔴 To Do | 8h |

---

## 📱 Mobile App (React Native Expo) - Aluno

### 🏗️ Setup Inicial

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| MB-001 | Criar projeto Expo com TypeScript | P0 | 🔴 To Do | 2h |
| MB-002 | Configurar React Navigation | P0 | 🔴 To Do | 3h |
| MB-003 | Configurar Axios para API | P0 | 🔴 To Do | 2h |
| MB-004 | Configurar Context API (state) | P0 | 🔴 To Do | 4h |
| MB-005 | Criar componentes base (Button, Input, Card) | P1 | 🔴 To Do | 6h |
| MB-006 | Configurar tema (cores roxas Zen) | P1 | 🔴 To Do | 4h |

### 🔐 Autenticação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| AU-001 | Tela de Boas-vindas (onboarding) | P1 | 🔴 To Do | 4h |
| AU-002 | Tela de Login | P0 | 🔴 To Do | 6h |
| AU-003 | Tela de Cadastro | P0 | 🔴 To Do | 6h |
| AU-004 | Integração com OpenIddict (token) | P0 | 🔴 To Do | 8h |
| AU-005 | Armazenar token (SecureStore) | P0 | 🔴 To Do | 2h |
| AU-006 | Auto-refresh de token | P1 | 🔴 To Do | 4h |
| AU-007 | Tela de Recuperação de Senha | P1 | 🔴 To Do | 4h |

### 📊 Dashboard do Aluno

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| DA-001 | Home 1: Dashboard principal | P0 | 🔴 To Do | 8h |
| DA-002 | Home 2: Simulados disponíveis | P0 | 🔴 To Do | 6h |
| DA-003 | Home 3: Progresso e estatísticas | P1 | 🔴 To Do | 8h |
| DA-004 | Home 4: Rankings | P1 | 🔴 To Do | 6h |
| DA-005 | Bottom Tab Navigation | P0 | 🔴 To Do | 3h |

### 📝 Simulados

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| QZ-001 | Seleção de Categorias (matérias) | P0 | 🔴 To Do | 6h |
| QZ-002 | Seleção de Dificuldade | P0 | 🔴 To Do | 4h |
| QZ-003 | Tela de Quiz (execução) | P0 | 🔴 To Do | 12h |
| QZ-004 | Navegação entre questões | P0 | 🔴 To Do | 4h |
| QZ-005 | Timer de prova | P0 | 🔴 To Do | 4h |
| QZ-006 | Feedback de Acerto/Erro | P1 | 🔴 To Do | 4h |
| QZ-007 | Tela de Resultado | P0 | 🔴 To Do | 8h |
| QZ-008 | Gabarito detalhado | P1 | 🔴 To Do | 6h |
| QZ-009 | Histórico de simulados realizados | P1 | 🔴 To Do | 6h |

### 🏆 Rankings

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| RK-001 | Tela de Ranking Global | P1 | 🔴 To Do | 6h |
| RK-002 | Ranking da Escola | P1 | 🔴 To Do | 4h |
| RK-003 | Ranking da Turma | P1 | 🔴 To Do | 4h |
| RK-004 | Filtros de ranking | P2 | 🔴 To Do | 4h |

### � Perfil

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| PR-001 | Tela de Perfil | P1 | 🔴 To Do | 6h |
| PR-002 | Estatísticas pessoais | P1 | 🔴 To Do | 6h |
| PR-003 | Editar dados do perfil | P2 | 🔴 To Do | 4h |
| PR-004 | Upload de foto | P2 | 🔴 To Do | 4h |

### 🎓 Simulador ENEM

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| EN-MB-001 | Tela do Simulador ENEM | P2 | 🔴 To Do | 8h |
| EN-MB-002 | Cadastro de Notas ENEM | P2 | 🔴 To Do | 6h |
| EN-MB-003 | Lista de Universidades | P2 | 🔴 To Do | 6h |
| EN-MB-004 | Busca de Cursos | P2 | 🔴 To Do | 6h |
| EN-MB-005 | Cálculo de chance de aprovação | P2 | 🔴 To Do | 4h |

### 🎖️ Gamificação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| GM-001 | Visualizar conquistas | P2 | 🔴 To Do | 6h |
| GM-002 | Notificação de conquista desbloqueada | P3 | 🔴 To Do | 4h |
| GM-003 | Sistema de pontos | P2 | 🔴 To Do | 4h |

---

## 📚 Documentação

| ID | História | Prioridade | Status | Estimativa |
|----|----------|------------|--------|------------|
| DOC-001 | README principal | P0 | ✅ Concluído | - |
| DOC-002 | STATUS.md | P0 | ✅ Concluído | - |
| DOC-003 | BACKLOG.md | P0 | ✅ Concluído | - |
| DOC-004 | ENTITIES.md | P0 | ✅ Concluído | - |
| DOC-005 | Documentar API (Swagger completo) | P1 | 🔴 To Do | 8h |
| DOC-006 | Criar diagramas de arquitetura | P1 | 🔴 To Do | 6h |
| DOC-007 | Guia de instalação | P1 | 🔴 To Do | 4h |
| DOC-008 | Documentar fluxo de simulado | P1 | 🔴 To Do | 4h |

---

## � Métricas Estimadas

### Estimativas por Componente

- **Backend (Core MVP):** ~200h
  - Infraestrutura: 20h
  - Entidades principais: 80h
  - Simulados e Sessões: 60h
  - Rankings: 20h
  - Tenants: 20h

- **Frontend Web (Painéis):** ~180h
  - Infraestrutura: 30h
  - Painel Host: 40h
  - Painel Tenant/Escola: 70h
  - Gestão de Simulados: 40h

- **Mobile App (MVP):** ~150h
  - Setup e Infra: 20h
  - Autenticação: 30h
  - Dashboard: 30h
  - Quiz (core feature): 50h
  - Rankings e Perfil: 20h

- **Documentação:** ~30h

**Total Estimado (MVP):** ~560h

### Features Futuras (Pós-MVP)

- Gamificação completa: ~40h
- Simulador ENEM: ~40h
- Relatórios avançados: ~30h
- Conquistas: ~25h
- App para Professores: ~100h

---

**Próxima Revisão do Backlog:** 22 de Dezembro de 2024
