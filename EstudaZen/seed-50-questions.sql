-- Script para popular o banco com 50 questões e novas matérias
-- Data: 2024-12-17
-- Requisitos: PostgreSQL com extensão pgcrypto (para gen_random_uuid())

-- ============================================
-- 1. CRIAR NOVAS MATÉRIAS (8 novas + 2 existentes)
-- ============================================

INSERT INTO "AppSubjects" ("Id", "Name", "Code", "Description", "Active", "IsGlobal", "TenantId", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
VALUES 
    ('44444444-4444-4444-4444-444444444444', 'Português', 'PORT', 'Linguagens e Códigos', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('55555555-5555-5555-5555-555555555555', 'Geografia', 'GEO', 'Ciências Humanas', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('66666666-6666-6666-6666-666666666666', 'Biologia', 'BIO', 'Ciências da Natureza', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('77777777-7777-7777-7777-777777777777', 'Física', 'FIS', 'Ciências da Natureza', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('88888888-8888-8888-8888-888888888888', 'Química', 'QUI', 'Ciências da Natureza', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('99999999-9999-9999-9999-999999999999', 'Inglês', 'ING', 'Língua Estrangeira', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa', 'Filosofia', 'FIL', 'Ciências Humanas', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false),
    ('bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb', 'Sociologia', 'SOC', 'Ciências Humanas', true, true, NULL, NOW(), '{}', gen_random_uuid()::text, false)
ON CONFLICT ("Id") DO NOTHING;

-- ============================================
-- 2. FUNÇÃO AUXILIAR PARA INSERIR QUESTÃO
-- ============================================

DO $$
DECLARE
    v_subject_mat UUID := '3a1e3fbc-0e46-dd48-ac84-ac7e9d773260'; -- Matemática (Existente)
    v_subject_his UUID := '3a1e30c4-4664-1d18-78a3-89de442186e0'; -- História (Existente)
    v_subject_port UUID := '44444444-4444-4444-4444-444444444444';
    v_subject_geo UUID := '55555555-5555-5555-5555-555555555555';
    v_subject_bio UUID := '66666666-6666-6666-6666-666666666666';
    v_subject_fis UUID := '77777777-7777-7777-7777-777777777777';
    v_subject_qui UUID := '88888888-8888-8888-8888-888888888888';
    v_subject_ing UUID := '99999999-9999-9999-9999-999999999999';
    v_subject_fil UUID := 'aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa';
    v_subject_soc UUID := 'bbbbbbbb-2222-2222-2222-bbbbbbbbbbbb';
    
    v_question_id UUID;
BEGIN

    -- MATEMÁTICA (5 questões)
    -- Q1
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_mat, 'Qual a raiz quadrada de 144?', 0, 50, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '10', false, 0), (gen_random_uuid(), v_question_id, '12', true, 1), (gen_random_uuid(), v_question_id, '14', false, 2), (gen_random_uuid(), v_question_id, '11', false, 3);

    -- Q2
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_mat, 'Quanto é 15% de 200?', 1, 75, true, 90, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '20', false, 0), (gen_random_uuid(), v_question_id, '25', false, 1), (gen_random_uuid(), v_question_id, '30', true, 2), (gen_random_uuid(), v_question_id, '35', false, 3);

    -- Q3
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_mat, 'Resolva: 2x - 4 = 10', 0, 50, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '5', false, 0), (gen_random_uuid(), v_question_id, '6', false, 1), (gen_random_uuid(), v_question_id, '7', true, 2), (gen_random_uuid(), v_question_id, '8', false, 3);

    -- Q4
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_mat, 'Qual o valor de Pi (aproximado)?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '3.12', false, 0), (gen_random_uuid(), v_question_id, '3.14', true, 1), (gen_random_uuid(), v_question_id, '3.16', false, 2), (gen_random_uuid(), v_question_id, '3.18', false, 3);

    -- Q5
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_mat, 'Qual a área de um quadrado de lado 5?', 0, 50, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '20', false, 0), (gen_random_uuid(), v_question_id, '25', true, 1), (gen_random_uuid(), v_question_id, '30', false, 2), (gen_random_uuid(), v_question_id, '10', false, 3);


    -- HISTÓRIA (5 questões)
    -- Q6
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_his, 'Quem descobriu o Brasil?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Cristóvão Colombo', false, 0), (gen_random_uuid(), v_question_id, 'Pedro Álvares Cabral', true, 1), (gen_random_uuid(), v_question_id, 'Vasco da Gama', false, 2), (gen_random_uuid(), v_question_id, 'Dom Pedro I', false, 3);

    -- Q7
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_his, 'Em que ano iniciou a Segunda Guerra Mundial?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '1914', false, 0), (gen_random_uuid(), v_question_id, '1939', true, 1), (gen_random_uuid(), v_question_id, '1945', false, 2), (gen_random_uuid(), v_question_id, '1929', false, 3);

    -- Q8
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_his, 'Quem foi o primeiro presidente do Brasil?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Getúlio Vargas', false, 0), (gen_random_uuid(), v_question_id, 'Deodoro da Fonseca', true, 1), (gen_random_uuid(), v_question_id, 'Prudente de Morais', false, 2), (gen_random_uuid(), v_question_id, 'Juscelino Kubitschek', false, 3);

    -- Q9
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_his, 'Qual civilização construiu as pirâmides de Gizé?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Romanos', false, 0), (gen_random_uuid(), v_question_id, 'Gregos', false, 1), (gen_random_uuid(), v_question_id, 'Egípcios', true, 2), (gen_random_uuid(), v_question_id, 'Maias', false, 3);

    -- Q10
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_his, 'O que foi a Revolução Francesa?', 1, 75, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Movimento artístico', false, 0), (gen_random_uuid(), v_question_id, 'Guerra religiosa', false, 1), (gen_random_uuid(), v_question_id, 'Movimento político e social', true, 2), (gen_random_uuid(), v_question_id, 'Descoberta científica', false, 3);


    -- PORTUGUÊS (5 questões)
    -- Q11
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_port, 'Qual o antônimo de "efêmero"?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Passageiro', false, 0), (gen_random_uuid(), v_question_id, 'Duradouro', true, 1), (gen_random_uuid(), v_question_id, 'Rápido', false, 2), (gen_random_uuid(), v_question_id, 'Breve', false, 3);

    -- Q12
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_port, 'Qual destas palavras é oxítona?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Mesa', false, 0), (gen_random_uuid(), v_question_id, 'Lâmpada', false, 1), (gen_random_uuid(), v_question_id, 'Café', true, 2), (gen_random_uuid(), v_question_id, 'Árvore', false, 3);
    
    -- Q13
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_port, 'Quem escreveu "Dom Casmurro"?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Jorge Amado', false, 0), (gen_random_uuid(), v_question_id, 'Machado de Assis', true, 1), (gen_random_uuid(), v_question_id, 'Carlos Drummond', false, 2), (gen_random_uuid(), v_question_id, 'Clarice Lispector', false, 3);

    -- Q14
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_port, 'O que é um substantivo?', 0, 50, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Palavra que indica ação', false, 0), (gen_random_uuid(), v_question_id, 'Palavra que nomeia seres', true, 1), (gen_random_uuid(), v_question_id, 'Palavra que qualifica', false, 2), (gen_random_uuid(), v_question_id, 'Palavra que liga orações', false, 3);

    -- Q15
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_port, 'Qual a classificação da palavra "nós"?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Verbo', false, 0), (gen_random_uuid(), v_question_id, 'Pronome', true, 1), (gen_random_uuid(), v_question_id, 'Adjetivo', false, 2), (gen_random_uuid(), v_question_id, 'Artigo', false, 3);


    -- BIOLOGIA (5 questões)
    -- Q16 - Célula
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_bio, 'Qual é a unidade básica da vida?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Átomo', false, 0), (gen_random_uuid(), v_question_id, 'Célula', true, 1), (gen_random_uuid(), v_question_id, 'Tecido', false, 2), (gen_random_uuid(), v_question_id, 'Órgão', false, 3);

    -- Q17 - DNA
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_bio, 'Onde está localizado o DNA nas células eucariontes?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Citoplasma', false, 0), (gen_random_uuid(), v_question_id, 'Núcleo', true, 1), (gen_random_uuid(), v_question_id, 'Ribossomo', false, 2), (gen_random_uuid(), v_question_id, 'Membrana', false, 3);

    -- Q18 - Fotossíntese
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_bio, 'Qual gás as plantas absorvem na fotossíntese?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Oxigênio', false, 0), (gen_random_uuid(), v_question_id, 'Gás Carbônico', true, 1), (gen_random_uuid(), v_question_id, 'Nitrogênio', false, 2), (gen_random_uuid(), v_question_id, 'Hélio', false, 3);

    -- Q19 - Reino
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_bio, 'Cogumelos pertencem a qual reino?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Plantae', false, 0), (gen_random_uuid(), v_question_id, 'Fungi', true, 1), (gen_random_uuid(), v_question_id, 'Animalia', false, 2), (gen_random_uuid(), v_question_id, 'Protista', false, 3);

    -- Q20 - Sangue
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_bio, 'Qual célula transporta oxigênio no sangue?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Leucócito', false, 0), (gen_random_uuid(), v_question_id, 'Hemácia', true, 1), (gen_random_uuid(), v_question_id, 'Plaqueta', false, 2), (gen_random_uuid(), v_question_id, 'Neurônio', false, 3);


    -- GEOGRAFIA (5 questões)
    -- Q21 - Continentes
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_geo, 'Qual é o maior continente do mundo?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'América', false, 0), (gen_random_uuid(), v_question_id, 'Ásia', true, 1), (gen_random_uuid(), v_question_id, 'África', false, 2), (gen_random_uuid(), v_question_id, 'Europa', false, 3);

    -- Q22 - Capital
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_geo, 'Qual a capital da França?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Londres', false, 0), (gen_random_uuid(), v_question_id, 'Paris', true, 1), (gen_random_uuid(), v_question_id, 'Berlim', false, 2), (gen_random_uuid(), v_question_id, 'Madri', false, 3);

    -- Q23 - Rios
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_geo, 'Qual o maior rio do mundo em volume de água?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Nilo', false, 0), (gen_random_uuid(), v_question_id, 'Amazonas', true, 1), (gen_random_uuid(), v_question_id, 'Yangtzé', false, 2), (gen_random_uuid(), v_question_id, 'Mississippi', false, 3);

    -- Q24 - Clima
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_geo, 'Qual clima predomina no Nordeste brasileiro?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Equatorial', false, 0), (gen_random_uuid(), v_question_id, 'Semiárido', true, 1), (gen_random_uuid(), v_question_id, 'Subtropical', false, 2), (gen_random_uuid(), v_question_id, 'Temperado', false, 3);

    -- Q25 - Brasil
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_geo, 'Quantos estados tem o Brasil?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '25', false, 0), (gen_random_uuid(), v_question_id, '26', true, 1), (gen_random_uuid(), v_question_id, '27', false, 2), (gen_random_uuid(), v_question_id, '28', false, 3);


    -- FÍSICA (5 questões)
    -- Q26 - Velocidade
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fis, 'Qual a fórmula da velocidade média?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'F = m.a', false, 0), (gen_random_uuid(), v_question_id, 'V = d/t', true, 1), (gen_random_uuid(), v_question_id, 'E = mc²', false, 2), (gen_random_uuid(), v_question_id, 'P = m.g', false, 3);

    -- Q27 - Newton
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fis, 'Qual lei de Newton é conhecida como Lei da Inércia?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '1ª Lei', true, 0), (gen_random_uuid(), v_question_id, '2ª Lei', false, 1), (gen_random_uuid(), v_question_id, '3ª Lei', false, 2), (gen_random_uuid(), v_question_id, '4ª Lei', false, 3);

    -- Q28 - Gravidade
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fis, 'Qual o valor aproximado da gravidade na Terra?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, '5 m/s²', false, 0), (gen_random_uuid(), v_question_id, '9,8 m/s²', true, 1), (gen_random_uuid(), v_question_id, '12 m/s²', false, 2), (gen_random_uuid(), v_question_id, '20 m/s²', false, 3);

    -- Q29 - Energia
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fis, 'Qual a unidade de energia no S.I.?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Newton', false, 0), (gen_random_uuid(), v_question_id, 'Joule', true, 1), (gen_random_uuid(), v_question_id, 'Watt', false, 2), (gen_random_uuid(), v_question_id, 'Pascal', false, 3);

    -- Q30 - Luz
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fis, 'A luz é uma onda:', 2, 100, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Mecânica', false, 0), (gen_random_uuid(), v_question_id, 'Eletromagnética', true, 1), (gen_random_uuid(), v_question_id, 'Sonora', false, 2), (gen_random_uuid(), v_question_id, 'Gravitacional', false, 3);


    -- QUÍMICA (5 questões)
    -- Q31 - Água
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_qui, 'Qual a fórmula da água?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'CO2', false, 0), (gen_random_uuid(), v_question_id, 'H2O', true, 1), (gen_random_uuid(), v_question_id, 'H2O2', false, 2), (gen_random_uuid(), v_question_id, 'NaCl', false, 3);

    -- Q32 - Tabela
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_qui, 'Qual o símbolo do Ouro na tabela periódica?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Ag', false, 0), (gen_random_uuid(), v_question_id, 'Au', true, 1), (gen_random_uuid(), v_question_id, 'Fe', false, 2), (gen_random_uuid(), v_question_id, 'Cu', false, 3);

    -- Q33 - pH
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_qui, 'Um pH 7 é considerado:', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Ácido', false, 0), (gen_random_uuid(), v_question_id, 'Neutro', true, 1), (gen_random_uuid(), v_question_id, 'Básico', false, 2), (gen_random_uuid(), v_question_id, 'Alcalino', false, 3);

    -- Q34 - Átomo
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_qui, 'Qual partícula tem carga negativa?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Próton', false, 0), (gen_random_uuid(), v_question_id, 'Elétron', true, 1), (gen_random_uuid(), v_question_id, 'Nêutron', false, 2), (gen_random_uuid(), v_question_id, 'Fóton', false, 3);

    -- Q35 - Estados
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_qui, 'A passagem do estado sólido para o líquido chama-se:', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Vaporização', false, 0), (gen_random_uuid(), v_question_id, 'Fusão', true, 1), (gen_random_uuid(), v_question_id, 'Solidificação', false, 2), (gen_random_uuid(), v_question_id, 'Sublimação', false, 3);


    -- INGLÊS (5 questões)
    -- Q36
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_ing, 'Como se diz "livro" em inglês?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Table', false, 0), (gen_random_uuid(), v_question_id, 'Book', true, 1), (gen_random_uuid(), v_question_id, 'Pen', false, 2), (gen_random_uuid(), v_question_id, 'Car', false, 3);

    -- Q37
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_ing, 'Qual o passado do verbo "go"?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Goed', false, 0), (gen_random_uuid(), v_question_id, 'Went', true, 1), (gen_random_uuid(), v_question_id, 'Gone', false, 2), (gen_random_uuid(), v_question_id, 'Going', false, 3);

    -- Q38
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_ing, 'O que significa "blue"?', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Vermelho', false, 0), (gen_random_uuid(), v_question_id, 'Azul', true, 1), (gen_random_uuid(), v_question_id, 'Verde', false, 2), (gen_random_uuid(), v_question_id, 'Amarelo', false, 3);

    -- Q39
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_ing, 'Complete: She ___ a teacher.', 0, 50, true, 30, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'are', false, 0), (gen_random_uuid(), v_question_id, 'is', true, 1), (gen_random_uuid(), v_question_id, 'am', false, 2), (gen_random_uuid(), v_question_id, 'be', false, 3);

    -- Q40
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_ing, 'Qual é o plural de "child"?', 2, 100, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Childs', false, 0), (gen_random_uuid(), v_question_id, 'Children', true, 1), (gen_random_uuid(), v_question_id, 'Childrens', false, 2), (gen_random_uuid(), v_question_id, 'Childes', false, 3);

    
    -- FILOSOFIA (5 questões)
    -- Q41
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fil, 'Quem disse "Penso, logo existo"?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Platão', false, 0), (gen_random_uuid(), v_question_id, 'Descartes', true, 1), (gen_random_uuid(), v_question_id, 'Sócrates', false, 2), (gen_random_uuid(), v_question_id, 'Aristóteles', false, 3);

    -- Q42
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fil, 'O que é ética?', 1, 75, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Estudo dos astros', false, 0), (gen_random_uuid(), v_question_id, 'Reflexão sobre a moral', true, 1), (gen_random_uuid(), v_question_id, 'Estudo da vida', false, 2), (gen_random_uuid(), v_question_id, 'Política partidária', false, 3);

    -- Q43
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fil, 'O Mito da Caverna é de autoria de:', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Nietzsche', false, 0), (gen_random_uuid(), v_question_id, 'Platão', true, 1), (gen_random_uuid(), v_question_id, 'Marx', false, 2), (gen_random_uuid(), v_question_id, 'Kant', false, 3);

    -- Q44
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fil, 'Sócrates é conhecido por qual método?', 2, 100, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Científico', false, 0), (gen_random_uuid(), v_question_id, 'Maiêutica', true, 1), (gen_random_uuid(), v_question_id, 'Dialético', false, 2), (gen_random_uuid(), v_question_id, 'Empírico', false, 3);

    -- Q45
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_fil, 'Qual o tema principal de Maquiavel?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Religião', false, 0), (gen_random_uuid(), v_question_id, 'Política', true, 1), (gen_random_uuid(), v_question_id, 'Arte', false, 2), (gen_random_uuid(), v_question_id, 'Biologia', false, 3);


    -- SOCIOLOGIA (5 questões)
    -- Q46
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_soc, 'Quem é considerado o pai da sociologia?', 1, 75, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Freud', false, 0), (gen_random_uuid(), v_question_id, 'Auguste Comte', true, 1), (gen_random_uuid(), v_question_id, 'Darwin', false, 2), (gen_random_uuid(), v_question_id, 'Einstein', false, 3);

    -- Q47
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_soc, 'O que é cultura?', 1, 75, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Apenas leitura de livros', false, 0), (gen_random_uuid(), v_question_id, 'Conjunto de costumes e saberes', true, 1), (gen_random_uuid(), v_question_id, 'Dinheiro', false, 2), (gen_random_uuid(), v_question_id, 'Tecnologia', false, 3);

    -- Q48
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_soc, 'Karl Marx focou seus estudos em:', 2, 100, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Astronomia', false, 0), (gen_random_uuid(), v_question_id, 'Luta de classes', true, 1), (gen_random_uuid(), v_question_id, 'Psicanálise', false, 2), (gen_random_uuid(), v_question_id, 'Genética', false, 3);

    -- Q49
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_soc, 'O que significa desigualdade social?', 0, 50, true, 45, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Todos ganharem igual', false, 0), (gen_random_uuid(), v_question_id, 'Diferença de acesso a recursos', true, 1), (gen_random_uuid(), v_question_id, 'Serem todos altos', false, 2), (gen_random_uuid(), v_question_id, 'Gostarem de coisas diferentes', false, 3);

    -- Q50
    v_question_id := gen_random_uuid();
    INSERT INTO "AppQuestions" ("Id", "SubjectId", "Content", "Difficulty", "Points", "IsPublished", "TimeLimitSeconds", "CreationTime", "ExtraProperties", "ConcurrencyStamp", "IsDeleted")
    VALUES (v_question_id, v_subject_soc, 'O que é globalização?', 1, 75, true, 60, NOW(), '{}', gen_random_uuid()::text, false);
    INSERT INTO "AppQuestionAnswers" ("Id", "QuestionId", "Content", "IsCorrect", "Order") VALUES 
    (gen_random_uuid(), v_question_id, 'Isolamento dos países', false, 0), (gen_random_uuid(), v_question_id, 'Integração mundial', true, 1), (gen_random_uuid(), v_question_id, 'Criação de novos planetas', false, 2), (gen_random_uuid(), v_question_id, 'Fim do mundo', false, 3);

END $$;
