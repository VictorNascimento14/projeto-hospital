# Sistema de Gerenciamento Hospitalar

API RESTful para gerenciamento de pacientes, médicos e consultas em um hospital.

## Tecnologias Utilizadas

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- PostgreSQL
- Lombok
- Swagger/OpenAPI 3.0

## Requisitos

- Java 17 ou superior
- Maven 3.6 ou superior
- PostgreSQL 12 ou superior

## Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL chamado `hospital_db`
2. Configure as credenciais no arquivo `application.properties`:
   ```properties
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   ```

## Executando o Projeto

1. Clone o repositório
2. Navegue até o diretório do projeto
3. Execute o comando:
   ```bash
   mvn spring-boot:run
   ```

## Documentação da API

A documentação da API está disponível em:
- Swagger UI: http://localhost:8080/api/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/api/api-docs

## Endpoints Disponíveis

### Pacientes
- `GET /api/pacientes` - Lista todos os pacientes
- `GET /api/pacientes/{id}` - Busca um paciente por ID
- `POST /api/pacientes` - Cria um novo paciente
- `PUT /api/pacientes/{id}` - Atualiza um paciente
- `DELETE /api/pacientes/{id}` - Remove um paciente

### Médicos
- `GET /api/medicos` - Lista todos os médicos
- `GET /api/medicos/{id}` - Busca um médico por ID
- `POST /api/medicos` - Cria um novo médico
- `PUT /api/medicos/{id}` - Atualiza um médico
- `DELETE /api/medicos/{id}` - Remove um médico

### Consultas
- `GET /api/consultas` - Lista todas as consultas
- `GET /api/consultas/{id}` - Busca uma consulta por ID
- `POST /api/consultas` - Agenda uma nova consulta
- `PUT /api/consultas/{id}` - Atualiza uma consulta
- `DELETE /api/consultas/{id}` - Cancela uma consulta

## Validações

- CPF deve conter 11 dígitos numéricos
- CRM deve conter entre 4 e 6 dígitos numéricos
- Telefone deve conter 10 ou 11 dígitos numéricos
- Email deve ser válido
- Consultas só podem ser marcadas entre 9h e 17h
- Um médico não pode ter duas consultas no mesmo horário
- Um paciente não pode ter duas consultas com intervalo menor que 1 hora
