# Modelo de Domínio - EstudaZen (EducaZen)

**Sistema de Simulados ENEM/Vestibular Multi-tenant**

---

## 📐 Arquitetura Multi-tenant

```
Host (Plataforma EstudaZen)
  └── Tenant (Prefeitura/Secretaria de Educação)
       └── School (Escola)
            └── Class (Turma)
                 └── Student (Aluno)
```

---

## 🏗️ Entidades do Domínio

### 1. School (Escola)

**Descrição:** Escola vinculada a um tenant (prefeitura/rede).

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?) - FK para Tenant (multi-tenancy)
- `Name` (string, 200) - Nome da escola
- `Code` (string, 50) - Código INEP ou interno
- `CNPJ` (string, 18, nullable) - CNPJ da escola
- `Address` (string, 300) - Endereço completo
- `City` (string, 100) - Cidade
- `State` (string, 2) - UF
- `ZipCode` (string, 10) - CEP
- `Phone` (string, 20, nullable) - Telefone
- `Email` (string, 100, nullable) - Email
- `Active` (bool) - Escola ativa
- `CreationTime`, `CreatorId`, `LastModificationTime`, `DeletionTime` (Audit)

**Relacionamentos:**
- 1:N com `Class`
- 1:N com `Student`
- 1:N com `Teacher`
- 1:N com `Exam` (simulados próprios da escola)

**Índices:**
- `Code` (unique dentro do tenant)
- `TenantId + Active`

---

### 2. Student (Aluno)

**Descrição:** Estudante que realiza simulados.

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?) - FK para Tenant
- `SchoolId` (Guid) - FK para School
- `ClassId` (Guid?) - FK para Class (nullable - pode não estar em turma)
- `FullName` (string, 200) - Nome completo
- `CPF` (string, 14, nullable) - CPF do aluno
- `BirthDate` (DateTime) - Data de nascimento
- `Gender` (enum, nullable) - Gênero (M/F/Outro/Não informado)
- `PhotoUrl` (string, 500, nullable) - URL da foto (MinIO)
- `Email` (string, 100, nullable) - Email
- `Phone` (string, 20, nullable) - Telefone
- `EnrollmentNumber` (string, 50) - Número de matrícula
- `EnrollmentDate` (DateTime) - Data de matrícula
- `Status` (enum) - Status: Active, Inactive, Transferred, Graduated
- `TotalPoints` (int) - Pontuação total acumulada (gamificação)
- `CreationTime`, `CreatorId`, etc (Audit)

**Relacionamentos:**
- N:1 com `School`
- N:1 com `Class` (nullable)
- 1:N com `ExamSession` (sessões de prova)
- 1:N com `Achievement` (conquistas)
- 1:N com `StudentRanking` (posições em rankings)

**Índices:**
- `SchoolId + EnrollmentNumber` (unique)
- `ClassId`
- `TenantId + Status`

---

### 3. Teacher (Professor)

**Descrição:** Professor da escola.

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?) - FK
- `SchoolId` (Guid) - FK
- `FullName` (string, 200)
- `CPF` (string, 14)
- `Email` (string, 100)
- `Phone` (string, 20, nullable)
- `PhotoUrl` (string, 500, nullable)
- `HireDate` (DateTime) - Data de contratação
- `Active` (bool)
- `CreationTime`, etc (Audit)

**Relacionamentos:**
- N:1 com `School`
- N:M com `Subject` (via `TeacherSubject`) - matérias que leciona
- N:M com `Class` (via `ClassTeacher`) - turmas que leciona

---

### 4. Class (Turma)

**Descrição:** Turma/série de alunos.

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?) - FK
- `SchoolId` (Guid) - FK
- `Name` (string, 100) - Ex: "3º Ano A", "9º Ano - Turma 1"
- `Code` (string, 50) - Código interno
- `GradeLevel` (enum) - Série: Fundamental1-9, EnsinoMedio1-3, PreVestibular
- `Shift` (enum) - Turno: Morning, Afternoon, Evening, FullTime
- `SchoolYear` (int) - Ano letivo (ex: 2024)
- `MaxStudents` (int, nullable) - Capacidade máxima
- `Active` (bool)
- `CreationTime`, etc (Audit)

**Relacionamentos:**
- N:1 com `School`
- 1:N com `Student`
- N:M com `Teacher` (via `ClassTeacher`)
- N:M com `Subject` (via `ClassSubject`) - matérias da grade

**Índices:**
- `SchoolId + Code` (unique)
- `SchoolYear + Active`

---

### 5. Subject (Matéria/Disciplina)

**Descrição:** Matéria/disciplina (Matemática, Português, etc.).

> **NOTA:** Verificar se já existe no backend atual!

**Campos:**
- `Id` (Guid) - PK
- `Name` (string, 100) - Ex: "Matemática", "Português"
- `Code` (string, 20) - Sigla: "MAT", "PORT"
- `Description` (string, 500, nullable)
- `Color` (string, 7, nullable) - Cor hex para UI: "#FF5733"
- `IconUrl` (string, 500, nullable) - URL do ícone
- `Active` (bool)
- `IsGlobal` (bool) - Se true, disponível para todos tenants
- `TenantId` (Guid?, nullable) - Se IsGlobal=false, matéria customizada do tenant
- `CreationTime`, etc (Audit)

**Relacionamentos:**
- 1:N com `Question` (questões da matéria)
- N:M com `Teacher` (via `TeacherSubject`)
- N:M com `Class` (via `ClassSubject`)

---

### 6. Question (Questão)

**Descrição:** Questão de múltipla escolha para simulados.

> **NOTA:** Verificar se já existe no backend atual!

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?, nullable) - Null = questão global (host)
- `SubjectId` (Guid) - FK para Subject
- `Statement` (string, 5000) - Enunciado da questão (HTML)
- `ImageUrl` (string, 500, nullable) - Imagem da questão (MinIO)
- `Difficulty` (enum) - Easy, Medium, Hard, VeryHard
- `Year` (int, nullable) - Ano da prova original (ex: ENEM 2023)
- `Source` (string, 100, nullable) - Fonte: "ENEM 2023", "FUVEST 2024"
- `Tags` (string, 500, nullable) - Tags separadas por vírgula
- `Active` (bool)
- `IsPublic` (bool) - Se false, só criador vê
- `CreationTime`, `CreatorId`, etc (Audit)

**Relacionamentos:**
- N:1 com `Subject`
- 1:N com `QuestionOption` (alternativas)
- N:M com `Exam` (via `ExamQuestion`)

**Índices:**
- `SubjectId + Active`
- `Difficulty`
- `TenantId + IsPublic`

---

### 7. QuestionOption (Alternativa da Questão)

**Descrição:** Alternativa de uma questão múltipla escolha.

**Campos:**
- `Id` (Guid) - PK
- `QuestionId` (Guid) - FK para Question
- `Letter` (string, 1) - A, B, C, D, E
- `Text` (string, 2000) - Texto da alternativa (HTML)
- `ImageUrl` (string, 500, nullable) - Imagem da alternativa
- `IsCorrect` (bool) - Se é a resposta correta
- `Order` (int) - Ordem de exibição (0-4)

**Relacionamentos:**
- N:1 com `Question`

**Índices:**
- `QuestionId + Order`

**Validações:**
- Exatamente 1 alternativa com `IsCorrect = true` por questão
- Letters únicas por questão

---

### 8. Exam (Simulado/Prova)

**Descrição:** Simulado ou prova montada.

**Campos:**
- `Id` (Guid) - PK
- `TenantId` (Guid?, nullable) - Se null, simulado global do host
- `SchoolId` (Guid?, nullable) - Se preenchido, simulado exclusivo da escola
- `Title` (string, 200) - Ex: "Simulado ENEM 2024 - 1ª Aplicação"
- `Description` (string, 1000, nullable)
- `Type` (enum) - Practice (treino), Mock (simulado), Entrance (vestibular), ENEM
- `Difficulty` (enum) - Mixed, Easy, Medium, Hard
- `DurationMinutes` (int) - Duração em minutos (ex: 180)
- `TotalQuestions` (int) - Total de questões (computed)
- `TotalPoints` (decimal) - Pontuação total (computed)
- `AvailableFrom` (DateTime, nullable) - Data/hora início
- `AvailableUntil` (DateTime, nullable) - Data/hora fim
- `Published` (bool) - Se está publicado para os alunos
- `ShowCorrectAnswers` (bool) - Mostrar gabarito após finalizar
- `RandomizeQuestions` (bool) - Embaralhar ordem das questões
- `RandomizeOptions` (bool) - Embaralhar alternativas
- `CreationTime`, `CreatorId`, etc (Audit)

**Relacionamentos:**
- N:M com `Question` (via `ExamQuestion`)
- 1:N com `ExamSession` (sessões dos alunos)

**Índices:**
- `TenantId + Published`
- `SchoolId + Published`
- `AvailableFrom, AvailableUntil`

---

### 9. ExamQuestion (Questão do Simulado)

**Descrição:** Relacionamento N:M entre Exam e Question com metadados.

**Campos:**
- `Id` (Guid) - PK
- `ExamId` (Guid) - FK para Exam
- `QuestionId` (Guid) - FK para Question
- `Order` (int) - Ordem da questão no simulado (1, 2, 3...)
- `Points` (decimal) - Pontos desta questão (padrão: 1.0)

**Relacionamentos:**
- N:1 com `Exam`
- N:1 com `Question`

**Índices:**
- `ExamId + Order` (unique)
- `QuestionId`

---

### 10. ExamSession (Sessão de Prova)

**Descrição:** Tentativa de um aluno em um simulado.

**Campos:**
- `Id` (Guid) - PK
- `ExamId` (Guid) - FK para Exam
- `StudentId` (Guid) - FK para Student
- `StartedAt` (DateTime) - Início da prova
- `FinishedAt` (DateTime, nullable) - Fim da prova (null = em andamento)
- `Status` (enum) - InProgress, Completed, Abandoned, TimedOut
- `Score` (decimal, nullable) - Pontuação obtida
- `MaxScore` (decimal) - Pontuação máxima possível
- `PercentageScore` (decimal, nullable) - Score / MaxScore * 100
- `CorrectAnswers` (int) - Total de acertos
- `WrongAnswers` (int) - Total de erros
- `SkippedAnswers` (int) - Questões não respondidas
- `TimeSpentMinutes` (int, nullable) - Tempo gasto em minutos
- `CreationTime` (Audit)

**Relacionamentos:**
- N:1 com `Exam`
- N:1 com `Student`
- 1:N com `ExamAnswer` (respostas individuais)

**Índices:**
- `StudentId + ExamId`
- `Status`
- `StartedAt DESC`

**Regras:**
- Aluno pode ter múltiplas sessões do mesmo exam (se permitido)
- Score calculado ao finalizar

---

### 11. ExamAnswer (Resposta do Aluno)

**Descrição:** Resposta do aluno a uma questão específica.

**Campos:**
- `Id` (Guid) - PK
- `ExamSessionId` (Guid) - FK para ExamSession
- `QuestionId` (Guid) - FK para Question
- `SelectedOptionId` (Guid, nullable) - FK para QuestionOption (null = não respondeu)
- `IsCorrect` (bool) - Se acertou (computed)
- `AnsweredAt` (DateTime, nullable) - Quando respondeu
- `TimeSpentSeconds` (int) - Tempo gasto nesta questão

**Relacionamentos:**
- N:1 com `ExamSession`
- N:1 com `Question`
- N:1 com `QuestionOption` (nullable)

**Índices:**
- `ExamSessionId + QuestionId` (unique)

---

### 12. StudentRanking (Ranking de Alunos)

**Descrição:** Posição do aluno em rankings (global, escola, turma).

**Campos:**
- `Id` (Guid) - PK
- `StudentId` (Guid) - FK para Student
- `Scope` (enum) - Global, Tenant, School, Class
- `ScopeId` (Guid, nullable) - ID do tenant/school/class dependendo do Scope
- `Position` (int) - Posição no ranking (1, 2, 3...)
- `TotalPoints` (int) - Pontos acumulados
- `TotalExamsCompleted` (int) - Simulados concluídos
- `AverageScore` (decimal) - Média de pontuação
- `LastUpdated` (DateTime) - Última atualização

**Relacionamentos:**
- N:1 com `Student`

**Índices:**
- `Scope + ScopeId + Position`
- `StudentId + Scope`

**Regras:**
- Recalculado periodicamente (job em background)
- Cache de rankings para performance

---

### 13. Achievement (Conquista/Badge)

**Descrição:** Conquistas gamificadas dos alunos.

**Campos:**
- `Id` (Guid) - PK
- `Name` (string, 100) - Ex: "Primeira Vitória", "Mestre da Matemática"
- `Description` (string, 500)
- `IconUrl` (string, 500) - URL do ícone/badge
- `PointsRequired` (int, nullable) - Pontos necessários
- `ExamsRequired` (int, nullable) - Simulados necessários
- `Category` (enum) - Participation, Score, Streak, Subject
- `Active` (bool)

**Relacionamentos:**
- N:M com `Student` (via `StudentAchievement`)

---

### 14. StudentAchievement (Conquista do Aluno)

**Descrição:** Associação de conquistas desbloqueadas pelos alunos.

**Campos:**
- `Id` (Guid) - PK
- `StudentId` (Guid) - FK
- `AchievementId` (Guid) - FK
- `UnlockedAt` (DateTime) - Quando desbloqueou

**Índices:**
- `StudentId + AchievementId` (unique)

---

### 15. University (Universidade)

**Descrição:** Universidade para simulador ENEM.

**Campos:**
- `Id` (Guid) - PK
- `Name` (string, 200) - Ex: "USP - Universidade de São Paulo"
- `Acronym` (string, 20) - Ex: "USP", "UNICAMP"
- `State` (string, 2) - UF
- `City` (string, 100)
- `Type` (enum) - Federal, Estadual, Municipal, Privada
- `LogoUrl` (string, 500, nullable)
- `Active` (bool)

**Relacionamentos:**
- 1:N com `Course`

---

### 16. Course (Curso/Carreira)

**Descrição:** Curso oferecido por uma universidade.

**Campos:**
- `Id` (Guid) - PK
- `UniversityId` (Guid) - FK
- `Name` (string, 200) - Ex: "Medicina", "Engenharia Civil"
- `Shift` (enum) - Morning, Afternoon, Evening, FullTime, Distance
- `Duration` (int) - Duração em semestres
- `VacanciesCount` (int) - Vagas anuais
- `Active` (bool)

**Relacionamentos:**
- N:1 com `University`
- 1:N com `EntranceExamCutoff` (notas de corte)

---

### 17. EntranceExamCutoff (Nota de Corte)

**Descrição:** Nota de corte histórica de cursos.

**Campos:**
- `Id` (Guid) - PK
- `CourseId` (Guid) - FK
- `Year` (int) - Ano (2023, 2024)
- `ExamType` (string, 50) - "ENEM", "SISU", "ProUni"
- `CutoffScore` (decimal) - Nota de corte
- `QuotaType` (enum) - Regular, SocialQuota, RacialQuota, PublicSchool

**Relacionamentos:**
- N:1 com `Course`

**Índices:**
- `CourseId + Year + QuotaType`

---

## 🔗 Relacionamentos Resumidos

### Many-to-Many (Tabelas de Junção)

1. **TeacherSubject**
   - `TeacherId` + `SubjectId`
   - Professor leciona múltiplas matérias

2. **ClassSubject**
   - `ClassId` + `SubjectId`
   - Turma tem múltiplas matérias na grade

3. **ClassTeacher**
   - `ClassId` + `TeacherId` + `SubjectId`
   - Professor leciona matéria X na turma Y

---

## 📊 Enums

### ExamType
- `Practice` - Treino
- `Mock` - Simulado
- `Entrance` - Vestibular
- `ENEM` - ENEM

### Difficulty
- `Easy` - Fácil
- `Medium` - Médio
- `Hard` - Difícil
- `VeryHard` - Muito Difícil
- `Mixed` - Misto (para exams)

### ExamSessionStatus
- `InProgress` - Em andamento
- `Completed` - Concluído
- `Abandoned` - Abandonado
- `TimedOut` - Tempo esgotado

### StudentStatus
- `Active` - Ativo
- `Inactive` - Inativo
- `Transferred` - Transferido
- `Graduated` - Formado

### GradeLevel
- `Fundamental1` até `Fundamental9`
- `EnsinoMedio1` até `EnsinoMedio3`
- `PreVestibular`

### Shift
- `Morning` - Manhã
- `Afternoon` - Tarde
- `Evening` - Noite
- `FullTime` - Integral

### RankingScope
- `Global` - Ranking global
- `Tenant` - Ranking da prefeitura/rede
- `School` - Ranking da escola
- `Class` - Ranking da turma

---

## ✅ Entidades Existentes (Verificar)

> **IMPORTANTE:** Antes de criar, verificar no backend atual:

1. ✅ **Subject** - Provavelmente já existe (módulo `subjects`)
2. ✅ **Question** + **QuestionOption** - Provavelmente já existe (módulo `questions`)

Se existirem, apenas **adaptar/estender** com os campos adicionais necessários.

---

## 🎯 Prioridade de Implementação

### Fase 1 - Core (MVP)
1. School, Student, Class, Teacher
2. Exam, ExamQuestion, ExamSession, ExamAnswer
3. Question, QuestionOption (verificar existentes)
4. Subject (verificar existente)

### Fase 2 - Gamificação
5. StudentRanking
6. Achievement, StudentAchievement

### Fase 3 - ENEM
7. University, Course, EntranceExamCutoff

---

**Total:** 17 entidades principais + 3-4 tabelas de junção

**Revisão Necessária:** Verificar entidades `Subject` e `Question` existentes no código atual.
