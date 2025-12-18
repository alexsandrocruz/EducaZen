-- Script para atualizar os ícones das dicas existentes
-- Execute no banco de dados PostgreSQL do EstudaZen

UPDATE "AppTips" SET "Icon" = 'lightbulb' WHERE "Icon" = 'lightbulb-on';
UPDATE "AppTips" SET "Icon" = 'newspaper' WHERE "Icon" = 'newspaper-variant-outline';
UPDATE "AppTips" SET "Icon" = 'pencil' WHERE "Icon" = 'pen';
