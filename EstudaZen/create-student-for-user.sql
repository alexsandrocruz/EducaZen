-- Verificar usuário e criar estudante se necessário

-- Ver usuários existentes
SELECT "Id", "UserName", "Email" FROM "AbpUsers" ORDER BY "CreationTime" DESC LIMIT 5;

-- Ver estudantes existentes
SELECT s."Id", s."UserId", s."FullName", s."Email", s."Status" 
FROM "AppStudents" s
ORDER BY s."CreationTime" DESC LIMIT 5;

-- Criar estudante para o usuário (substitua o ID do usuário se necessário)
-- Execute esta query APENAS se o usuário não tiver um estudante associado

-- Passo 1: Pegar o ID do usuário
-- Copie o ID do usuário da primeira query acima e cole abaixo

-- Passo 2: Criar estudante (descomente e execute)
/*
INSERT INTO "AppStudents" (
    "Id",
    "UserId", 
    "FullName",
    "Email",
    "Status",
    "TotalXp",
    "CurrentLevel",
    "CurrentStreak",
    "HighestStreak",
    "TotalQuizzes",
    "TotalCorrectAnswers",
    "CreationTime"
)
VALUES (
    gen_random_uuid(),
    'COLE_O_ID_DO_USUARIO_AQUI', -- Substitua pelo ID do usuário
    'Teste Usuario',
    'alexcruzti+estudante@gmail.com',
    1, -- 1 = APPROVED
    0,
    1,
    0,
    0,
    0,
    0,
    NOW()
);
*/

-- Verificar se criou
SELECT s."Id", s."UserId", s."FullName", s."Email", s."Status" 
FROM "AppStudents" s
ORDER BY s."CreationTime" DESC LIMIT 5;
