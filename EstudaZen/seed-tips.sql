-- Script para inserir dicas de demonstração
-- Execute no banco de dados PostgreSQL do EstudaZen

INSERT INTO "AppTips" (
    "Id", "Title", "Description", "Category", "Type", "Icon", "IconColor", "IconBgColor", 
    "ImageUrl", "LinkUrl", "IsActive", "Order", "StartDate", "EndDate", "TenantId", 
    "ExtraProperties", "ConcurrencyStamp", "CreationTime", "CreatorId", 
    "LastModificationTime", "LastModifierId", "IsDeleted", "DeleterId", "DeletionTime"
)
VALUES 
('aa2fd051-4f38-4987-857c-51d3ba650cea', 'Fórmula de Bhaskara', 'Revise equações de 2º grau para garantir pontos em Matemática básica. A fórmula é essencial para o ENEM!', 0, 1, 'lightbulb', '#ffffff', NULL, NULL, NULL, true, 1, NULL, NULL, NULL, '{}', gen_random_uuid()::text, NOW(), NULL, NULL, NULL, false, NULL, NULL),
('bb2fd051-4f38-4987-857c-51d3ba650cca', 'Edital FUVEST 2024', 'Confira as principais mudanças no formato da prova e datas de inscrição. Não perca o prazo!', 1, 0, 'newspaper', '#3b82f6', 'rgba(59, 130, 246, 0.1)', NULL, NULL, true, 2, NULL, NULL, NULL, '{}', gen_random_uuid()::text, NOW(), NULL, NULL, NULL, false, NULL, NULL),
('cc2fd051-4f38-4987-857c-51d3ba650cea', 'Aulão de Revisão', 'Participe da live de História Geral hoje às 19h no app. Tema: Revolução Francesa e suas consequências.', 2, 0, 'school', '#7f13ec', 'rgba(127, 19, 236, 0.1)', NULL, NULL, true, 3, NULL, NULL, NULL, '{}', gen_random_uuid()::text, NOW(), NULL, NULL, NULL, false, NULL, NULL),
('dd2fd051-4f38-4987-857c-51d3ba650cea', 'Simuladão ENEM', 'Dia 15 teremos nosso super simulado com 180 questões no estilo ENEM. Inscreva-se já!', 3, 0, 'calendar-star', '#10b981', 'rgba(16, 185, 129, 0.1)', NULL, NULL, true, 4, NULL, NULL, NULL, '{}', gen_random_uuid()::text, NOW(), NULL, NULL, NULL, false, NULL, NULL),
('ee2fd051-4f38-4987-857c-51d3ba650cea', 'Como tirar 1000 na Redação', 'Aprenda as 5 competências avaliadas e técnicas para desenvolver sua argumentação de forma impecável.', 2, 0, 'pencil', '#ec4899', 'rgba(236, 72, 153, 0.1)', NULL, NULL, true, 5, NULL, NULL, NULL, '{}', gen_random_uuid()::text, NOW(), NULL, NULL, NULL, false, NULL, NULL);

-- Category: 0=DicaDoDia, 1=Novidade, 2=Estudos, 3=Evento
-- Type: 0=Normal, 1=Highlight
