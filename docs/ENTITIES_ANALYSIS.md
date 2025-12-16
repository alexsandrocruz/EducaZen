# Análise de Entidades - EstudaZen Backend

**Data:** 15 de Dezembro de 2024

---

## ✅ Entidades JÁ EXISTENTES

### 1. Subject ✅ **COMPLETO**
**Arquivo:** `EstudaZen.Domain/Subjects/Subject.cs`

**Campos Existentes:**
- ✅ `Id` (Guid)
- ✅ `Name` (string)
- ✅ `IconName` (string) - Material icon
- ✅ `ColorHex` (string) - #7C3AED
- ✅ `EnemAreaCode` (string?) - Ex: "CN" para Ciências da Natureza
- ✅ `DisplayOrder` (int)
- ✅ `IsActive` (bool)
- ✅ Auditing (CreationTime, CreatorId, etc)

**Status:** ✅ Totalmente implementado e alinhado com nosso plano!

**Observações:**
- Não tem multi-tenancy (global apenas)
- Pode adicionar campo `Description` se necessário

---

### 2. Question ✅ **MUITO BOM**
**Arquivo:** `EstudaZen.Domain/Questions/Question.cs`

**Campos Existentes:**
- ✅ `Id` (Guid)
- ✅ `TenantId` (Guid?) - Multi-tenant! ✨
- ✅ `SubjectId` (Guid) + navegação
- ✅ `Content` (string) - Enunciado
- ✅ `Explanation` (string?) - Explicação após resposta
- ✅ `MediaUrl` (string?) - Imagem/vídeo
- ✅ `Difficulty` (QuestionDifficulty enum)
- ✅ `Points` (int) - Pontuação
- ✅ `TimeLimitSeconds` (int)
- ✅ `Tags` (string?) - JSON array
- ✅ `IsPublished` (bool)
- ✅ `Answers` (Collection\<QuestionAnswer\>)
- ✅ Auditing completo

**Status:** ✅ Muito bem implementado!

**Campos faltando do nosso plano:**
- ❌ `Year` (int?) - Ano da prova (ex: ENEM 2023)
- ❌ `Source` (string?) - Fonte: "ENEM 2023", "FUVEST"

**Ação:** Adicionar campos `Year` e `Source` opcionais

---

### 3. QuestionAnswer ✅ **PERFEITO**
**Arquivo:** `EstudaZen.Domain/Questions/QuestionAnswer.cs`

**Campos:**
- ✅ `Id` (Guid)
- ✅ `QuestionId` (Guid)
- ✅ `Content` (string)
- ✅ `IsCorrect` (bool)
- ✅ `Order` (int) - 0-based
- ✅ Método `GetLetter()` - Retorna 'A', 'B', 'C'...

**Status:** ✅ Implementação perfeita! Corresponde 100% ao `QuestionOption` do nosso plano.

**Observação:** Chamado de `QuestionAnswer` aqui, mas é o mesmo que planejamos como `QuestionOption`.

---

### 4. Student ✅ **EXCELENTE com Gamificação**
**Arquivo:** `EstudaZen.Domain/Students/Student.cs`

**Campos Existentes:**
- ✅ `Id` (Guid)
- ✅ `TenantId` (Guid?) - Multi-tenant
- ✅ `UserId` (Guid) - Link com IdentityUser do ABP
- ✅ `SchoolId` (Guid?) + navegação
- ✅ **Gamificação:**
  - `TotalXp` (int)
  - `CurrentLevel` (int) - Calculado automaticamente!
  - `CurrentStreak` (int)
  - `HighestStreak` (int)
  - `TotalQuizzes` (int)
  - `TotalCorrectAnswers` (int)
  - `LastActivityAt` (DateTime?)
- ✅ **ENEM Scores:**
  - `EnemScoreLinguagens` (int?)
  - `EnemScoreMatematica` (int?)
  - `EnemScoreCienciasHumanas` (int?)
  - `EnemScoreCienciasNatureza` (int?)
  - `EnemScoreRedacao` (int?)
- ✅ Métodos: `AddXp()`, `UpdateStreak()`, `RecordQuizCompletion()`

**Status:** ✅ Implementação EXCELENTE! Já tem gamificação e ENEM integrados!

**Campos faltando do nosso plano:** (dados pessoais do aluno)
- ❌ `FullName`, `CPF`, `BirthDate`, `Gender`
- ❌ `Email`, `Phone`
- ❌ `PhotoUrl`
- ❌ `EnrollmentNumber`, `EnrollmentDate`
- ❌ `ClassId` (turma)
- ❌ `Status` (enum: Active, Inactive, etc)

**Observação:** Esses dados podem estar no `IdentityUser` do ABP. Verificar se precisamos duplicar ou usar apenas profile do Identity.

**Ação:** Decidir se estendemos Student ou usamos claims do IdentityUser.

---

### 5. School ✅ **BOM, mas básico**
**Arquivo:** `EstudaZen.Domain/Schools/School.cs`

**Campos Existentes:**
- ✅ `Id` (Guid)
- ✅ `TenantId` (Guid?) - Multi-tenant
- ✅ `Name` (string)
- ✅ `Code` (string?) - INEP
- ✅ `Address` (string?)
- ✅ `IsActive` (bool)

**Status:** ✅ Estrutura básica OK

**Campos faltando do nosso plano:**
- ❌ `CNPJ`
- ❌ `City`, `State`, `ZipCode` (separados)
- ❌ `Phone`, `Email`

**Ação:** Expandir School com campos adicionais de endereço e contato.

---

### 6. Quiz ✅ **EXISTE**
**Arquivo:** `EstudaZen.Domain/Quizzes/Quiz.cs`

**Observação:** JÁ existe uma entidade `Quiz` no domínio!

**Ação:** Verificar se `Quiz` corresponde ao nosso `Exam` ou se são coisas diferentes. Possível duplicação de conceito.

---

### 7. Simulado ✅ **EXISTE**
**Arquivo:** `EstudaZen.Domain/Simulados/Simulado.cs`

**Observação:** JÁ existe `Simulado`!

**Ação:** Verificar se podemos usar `Simulado` em vez de criar `Exam`, ou consolidar os dois.

---

## ❌ Entidades FALTANDO (do nosso plano ENTITIES.md)

### Gestão Escolar

1. **Teacher** ❌
   - Professor da escola
   - Prioridade: P1

2. **Class** (Turma) ❌
   - Turma/série de alunos
   - Prioridade: P0

### Simulados e Sessões

3. **ExamSession** ❌
   - Tentativa do aluno em um simulado
   - **CRÍTICO** para o sistema funcionar!
   - Prioridade: P0

4. **ExamAnswer** ❌
   - Resposta individual do aluno a uma questão
   - **CRÍTICO** para o sistema funcionar!
   - Prioridade: P0

### Rankings e Gamificação

5. **StudentRanking** ❌
   - Rankings (global, escola, turma)
   - Prioridade: P1

6. **Achievement** ❌
   - Conquistas/badges
   - Prioridade: P2

7. **StudentAchievement** ❌
   - Relacionamento N:M
   - Prioridade: P2

### Simulador ENEM

8. **University** ❌
   - Universidades
   - Prioridade: P2

9. **Course** ❌
   - Cursos oferecidos
   - Prioridade: P2

10. **EntranceExamCutoff** ❌
    - Notas de corte
    - Prioridade: P2

---

## 🎯 Plano de Ação

### Fase 1: Expandir Entidades Existentes ⚡

#### 1.1 Question - Adicionar campos
```csharp
public int? Year { get; set; }                // Ano da prova
public string? Source { get; set; }           // Fonte (ENEM 2023, etc)
```

#### 1.2 School - Expandir detalhes
```csharp
public string? CNPJ { get; set; }
public string? City { get; set; }
public string? State { get; set; }
public string? ZipCode { get; set; }
public string? Phone { get; set; }
public string? Email { get; set; }
```

#### 1.3 Student - Decidir estratégia
**Opção A:** Manter lean, usar IdentityUser para dados pessoais
**Opção B:** Adicionar campos pessoais diretamente

**Recomendação:** Opção A - Usar ExtraProperties do ABP ou criar um `StudentProfile` separado.

---

### Fase 2: Consolidar Quiz vs Simulado vs Exam 🔄

**Investigar:**
1. Verificar estrutura completa de `Quiz.cs`
2. Verificar estrutura completa de `Simulado.cs`
3. Decidir se:
   - Usar `Simulado` como entidade principal (renomear para Exam?)
   - Usar `Quiz` para treinos rápidos e `Simulado` para provas completas
   - Consolidar ambos em uma única entidade `Exam` com type

**Recomendação:** Manter separação Quiz (treino rápido) vs Simulado (prova completa).

---

### Fase 3: Criar Entidades Críticas 🆕

#### Prioridade P0 (MVP)

1. **Class** (Turma)
   ```csharp
   public class Class : FullAuditedAggregateRoot<Guid>, IMultiTenant
   {
       public Guid? TenantId { get; set; }
       public Guid SchoolId { get; set; }
       public string Name { get; set; }
       public string Code { get; set; }
       public GradeLevel GradeLevel { get; set; }
       public Shift Shift { get; set; }
       public int SchoolYear { get; set; }
       public int? MaxStudents { get; set; }
       public bool IsActive { get; set; }
   }
   ```

2. **SimuladoSession** (ou ExamSession)
   ```csharp
   public class SimuladoSession : FullAuditedAggregateRoot<Guid>
   {
       public Guid SimuladoId { get; set; }
       public Guid StudentId { get; set; }
       public DateTime StartedAt { get; set; }
       public DateTime? FinishedAt { get; set; }
       public ExamSessionStatus Status { get; set; }
       public decimal? Score { get; set; }
       public decimal MaxScore { get; set; }
       public int CorrectAnswers { get; set; }
       public int WrongAnswers { get; set; }
       public int SkippedAnswers { get; set; }
       // Collection<SimuladoAnswer>
   }
   ```

3. **SimuladoAnswer** (ou ExamAnswer)
   ```csharp
   public class SimuladoAnswer : Entity<Guid>
   {
       public Guid SimuladoSessionId { get; set; }
       public Guid QuestionId { get; set; }
       public Guid? SelectedAnswerId { get; set; }  // QuestionAnswer
       public bool IsCorrect { get; set; }
       public DateTime? AnsweredAt { get; set; }
       public int TimeSpentSeconds { get; set; }
   }
   ```

#### Prioridade P1

4. **Teacher**
5. **StudentRanking**

#### Prioridade P2

6. **Achievement** + **StudentAchievement**
7. **University** + **Course** + **EntranceExamCutoff**

---

## 📊 Resumo Executivo

### O que JÁ temos ✅
- ✅ Subject (100% pronto)
- ✅ Question + QuestionAnswer (95% pronto - falta Year/Source)
- ✅ Student (70% pronto - tem gamificação e ENEM, falta dados pessoais)
- ✅ School (60% pronto - falta detalhes de contato)
- ✅ Quiz (verificar se serve nossa necessidade)
- ✅ Simulado (verificar se serve nossa necessidade)

### O que FALTA criar ❌

**Crítico (P0):**
- Class (Turma)
- ExamSession/SimuladoSession
- ExamAnswer/SimuladoAnswer

**Importante (P1):**
- Teacher
- StudentRanking

**Nice to Have (P2):**
- Achievement, StudentAchievement
- University, Course, EntranceExamCutoff

---

## 🚦 Próximos Passos Recomendados

1. ✅ **Verificar Quiz e Simulado** - Entender estrutura completa
2. 🔄 **Expandir Question** - Adicionar Year e Source
3. 🔄 **Expandir School** - Adicionar CNPJ, City, State, etc
4. 🆕 **Criar Class** - Essencial para organização
5. 🆕 **Criar ExamSession/SimuladoSession** - Core do sistema!
6. 🆕 **Criar ExamAnswer/SimuladoAnswer** - Core do sistema!
7. 🔄 **Decidir estratégia Student** - Dados pessoais no Identity ou na entidade?

---

**Conclusão:** Temos uma base EXCELENTE já implementada! ~60% das entidades principais já existem. Precisamos focar em criar as entidades de **sessão de prova** (ExamSession/Answer) que são críticas para o funcionamento do sistema de simulados.
