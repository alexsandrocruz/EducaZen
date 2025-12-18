-- Script to clear existing questions and answers so the seeder can recreate them with correct IsCorrect values
-- Run this BEFORE running dotnet run on EstudaZen.DbMigrator

-- First, delete quiz questions (they reference questions)
DELETE FROM "AppQuizQuestions";

-- Delete quizzes
DELETE FROM "AppQuizzes";

-- Delete question answers
DELETE FROM "AppQuestionAnswers";

-- Delete questions  
DELETE FROM "AppQuestions";

-- Verify cleanup
SELECT 'Questions remaining:' as info, COUNT(*) as count FROM "AppQuestions"
UNION ALL
SELECT 'Answers remaining:', COUNT(*) FROM "AppQuestionAnswers"
UNION ALL
SELECT 'Quizzes remaining:', COUNT(*) FROM "AppQuizzes";
