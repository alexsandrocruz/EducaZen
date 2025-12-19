-- Script para atribuir todos os alunos de teste à escola principal
-- Escola ID: 3a1e3992-fce2-7c2d-9f74-8b97e14c84af

UPDATE "AppStudents"
SET "SchoolId" = '3a1e3992-fce2-7c2d-9f74-8b97e14c84af'
WHERE "Email" LIKE '%@estudazen.com';

-- Verificar quantos foram atualizados
SELECT "FullName", "Email", "TotalXp", "CurrentLevel", "CurrentStreak", "SchoolId"
FROM "AppStudents"
WHERE "SchoolId" = '3a1e3992-fce2-7c2d-9f74-8b97e14c84af'
ORDER BY "TotalXp" DESC;
