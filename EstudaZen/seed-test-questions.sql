-- Script para criar questões de teste no EstudaZen
-- Data: 2024-12-17

-- ============================================
-- 1. CRIAR MATÉRIAS (SUBJECTS)
-- ============================================

-- Matemática
INSERT INTO "AppSubjects" ("Id", "Name", "Code", "Description", "Active", "IsGlobal", "TenantId", "CreationTime")
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Matemática', 'MAT', 'Matemática e suas Tecnologias', true, true, NULL, NOW())
ON CONFLICT ("Id") DO NOTHING;

-- Português
INSERT INTO "AppSubjects" ("Id", "Name", "Code", "Description", "Active", "IsGlobal", "TenantId", "CreationTime")
VALUES 
    ('22222222-2222-2222-2222-222222222222', 'Português', 'PORT', 'Linguagens, Códigos e suas Tecnologias', true, true, NULL, NOW())
ON CONFLICT ("Id") DO NOTHING;

-- História
INSERT INTO "AppSubjects" ("Id", "Name", "Code", "Description", "Active", "IsGlobal", "TenantId", "CreationTime")
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'História', 'HIST', 'Ciências Humanas e suas Tecnologias', true, true, NULL, NOW())
ON CONFLICT ("Id") DO NOTHING;

-- ============================================
-- 2. CRIAR QUESTÕES (QUESTIONS)
-- ============================================

-- Questão 1: Matemática Fácil
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Qual é o resultado de 2 + 2?',
    0, -- Easy
    50,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- Questão 2: Matemática Média  
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '11111111-1111-1111-1111-111111111111',
    'Calcule o valor de x na equação: 3x + 6 = 15',
    1, -- Medium
    75,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- Questão 3: Português Fácil
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '22222222-2222-2222-2222-222222222222',
    'Qual é o plural de "cidadão"?',
    0, -- Easy
    50,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- Questão 4: Português Média
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '22222222-2222-2222-2222-222222222222',
    'Identifique a figura de linguagem: "O tempo voa quando estamos felizes."',
    1, -- Medium
    75,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- Questão 5: História Média
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    '33333333-3333-3333-3333-333333333333',
    'Em que ano foi proclamada a Independência do Brasil?',
    1, -- Medium
    75,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- Questão 6: Matemática Difícil
INSERT INTO "AppQuestions" (
    "Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", 
    "TimeLimitSeconds", "TenantId", "CreationTime"
)
VALUES (
    'ffffffff-ffff-ffff-ffff-ffffffffffff',
    '11111111-1111-1111-1111-111111111111',
    'Qual é a derivada de f(x) = x² + 3x - 5?',
    2, -- Hard
    100,
    true,
    0,
    NULL,
    NOW()
) ON CONFLICT ("Id") DO NOTHING;

-- ============================================
-- 3. CRIAR ALTERNATIVAS (QUESTION ANSWERS)
-- ============================================

-- Alternativas para Questão 1: 2+2
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '3', false, 0, NOW()),
    (gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '4', true, 1, NOW()),
    (gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '5', false, 2, NOW()),
    (gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '6', false, 3, NOW());

-- Alternativas para Questão 2: 3x+6=15
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'x = 2', false, 0, NOW()),
    (gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'x = 3', true, 1, NOW()),
    (gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'x = 4', false, 2, NOW()),
    (gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'x = 5', false, 3, NOW());

-- Alternativas para Questão 3: plural de cidadão
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'cidadões', false, 0, NOW()),
    (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'cidadãos', true, 1, NOW()),
    (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'cidadães', false, 2, NOW()),
    (gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'cidadans', false, 3, NOW());

-- Alternativas para Questão 4: figura de linguagem
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Metáfora', true, 0, NOW()),
    (gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Comparação', false, 1, NOW()),
    (gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Hipérbole', false, 2, NOW()),
    (gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Metonímia', false, 3, NOW());

-- Alternativas para Questão 5: Independência do Brasil
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1820', false, 0, NOW()),
    (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1822', true, 1, NOW()),
    (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1889', false, 2, NOW()),
    (gen_random_uuid(), 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '1500', false, 3, NOW());

-- Alternativas para Questão 6: derivada
INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order", "CreationTime")
VALUES 
    (gen_random_uuid(), 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'f''(x) = x + 3', false, 0, NOW()),
    (gen_random_uuid(), 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'f''(x) = 2x + 3', true, 1, NOW()),
    (gen_random_uuid(), 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'f''(x) = 2x - 5', false, 2, NOW()),
    (gen_random_uuid(), 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'f''(x) = x² + 3', false, 3, NOW());

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Ver matérias criadas
SELECT "Id", "Name", "Code" FROM "AppSubjects" WHERE "IsGlobal" = true;

-- Ver questões criadas
SELECT q."Id", s."Name" as "Subject", q."Content", q."Difficulty", q."Points"
FROM "AppQuestions" q
INNER JOIN "AppSubjects" s ON q."SubjectId" = s."Id"
WHERE q."IsPublished" = true
ORDER BY s."Name", q."Difficulty";

-- Ver alternativas por questão
SELECT q."Content" as "Question", qa."Content" as "Answer", qa."IsCorrect", qa."Order"
FROM "AppQuestionAnswers" qa
INNER JOIN "AppQuestions" q ON qa."QuestionId" = q."Id"
ORDER BY q."Content", qa."Order";

-- Contagem
SELECT 
    (SELECT COUNT(*) FROM "AppSubjects" WHERE "IsGlobal" = true) as "Subjects",
    (SELECT COUNT(*) FROM "AppQuestions" WHERE "IsPublished" = true) as "Questions",
    (SELECT COUNT(*) FROM "AppQuestionAnswers") as "Answers";
