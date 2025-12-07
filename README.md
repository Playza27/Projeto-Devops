Projeto DevOps Integrado: Aplicação + Monitoramento
Este projeto demonstra a implementação de uma aplicação web Full Stack (Front-end e Back-end) containerizada com Docker Compose, integrada com persistência de dados em MariaDB (para o Zabbix) e monitoramento de saúde via Zabbix.
Requisitos Atendidos
O projeto atende aos requisitos de desenvolvimento da aplicação e monitoramento/testes:
 * Front-end: HTML, CSS e JavaScript (Vanilla JS).
 * Back-end: Node.js com Express (API REST).
 * Containerização: Todos os serviços orquestrados via Docker Compose.
 * Funcionalidade: API com rotas GET e POST trocando dados no formato JSON.
 * Testes Funcionais: Validação das rotas via Postman.
 * Monitoramento: Infraestrutura de Zabbix configurada para verificar a saúde (Status 200 OK) dos serviços Front-end e Back-end.
Estrutura do Projeto e Tecnologias
A aplicação é dividida em serviços isolados, conforme definido no docker-compose.yml.
| Serviço | Tecnologia/Linguagem | Porta Exposta (Acesso) | Função |
|---|---|---|---|
| backend | Node.js (Express) | 3000 | API REST com lógica de negócios e CORS configurado. |
| frontend | Nginx + HTML/JS | 8080 | Servidor Web que consome a API. |
| zabbix-db-mysql | MariaDB 10.5 | (Interna)  | Banco de dados para o Zabbix Server. |
| zabbix-server | Zabbix Server | 10051 | Motor de coleta e processamento de dados. |
| zabbix-web | Zabbix Web Interface | 8000 | Interface para visualização do monitoramento. |
Como Iniciar o Projeto (Deploy)
Para subir todo o ambiente (Aplicação e Monitoramento), execute o comando na pasta raiz do projeto (projeto-devops/):
1. Reconstrução e Subida
O parâmetro --build é crucial para compilar as imagens com as correções de CORS e Anti-Cache do Nginx.
docker compose up --build -d

2. Verificar Status
Confirme que todos os serviços estão ativos:
docker ps

3. Pontos de Acesso (URLs)
| Componente | Endereço (URL) | Credenciais (Se houver) |
|---|---|---|
| Aplicação Web (Front-end) | http://localhost:8080 | N/A |
| API Back-end | http://localhost:3000/api/mensagens | N/A |
| Painel Zabbix | http://localhost:8000 | User: Admin / Pass: zabbix |
4. Monitoramento e Testes (Fase 3)
4.1. Testes Funcionais (Postman)
As rotas foram testadas e validadas: GET e POST funcionam corretamente com transferência de dados JSON.
4.2. Monitoramento de Saúde (Zabbix)
O Zabbix Server está configurado para monitorar a disponibilidade da aplicação via HTTP (Web Scenarios/HTTP Items):
 * Caminho no Zabbix: Data collection -> Hosts -> "Zabbix Server".
 * Verificações:
   * Monitoramento do API (http://backend:3000/api/mensagens).
   * Monitoramento do Front-end (http://frontend/).
 * Ambos os cenários verificam se o serviço retorna o código de status HTTP 200, garantindo que a aplicação esteja sempre UP.
Como Encerrar o Projeto
Para desligar e remover todos os contêineres e redes (liberando as portas), execute o comando a seguir na pasta raiz:
docker compose down

