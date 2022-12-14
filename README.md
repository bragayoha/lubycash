O objetivo do sistema é simular as ações bancárias de um banco chamado LubyCash.

Requisitos Não Funcionais:

RNF01 – O Backend deve ser implementado utilizando o AdonisJS. OK

RNF02 – O Microsserviço deve ser implementado em ExpressJS OK

RNF03 – Para fazer a comunicação entre o MS e o Backend Principal, deve ser utilizado o Kafka. (SOMENTE PARA E-MAILS) OK

RNF04 – Obrigatório a utilização do Docker. OK

Requisitos Funcionais:

RF01 – Crud de Admins: Apenas administradores poderão cadastrar outros. OK

RF02 – Listagem de todos os clientes: Apenas para administradores. OK

Observações: o usuário poderá filtrar o cliente por status (approved ou desaproved) ou pelo intervalo de datas referente a criação (from {{date}} to {{date}}). OK

RF03 – Extrato do cliente: Apenas para administradores. OK

Observações: O usuário poderá filtrar por intervalo de datas. OK

RF04 – Cadastro de novos clientes: Os usuários terão uma rota pública onde vão mandar os dados para ser cliente do banco, todos os dados passarão por uma esteira de aprovação automática. Para isso, vamos criar um microsserviço avaliar os novos clientes. (Admins não poderão aprovar manualmente um cliente). OK

Sobre o MS: Será em Express e utilizaremos o axios para as requisições. A tabela de clientes ficará no microsserviço e poderá ser consultado através de API REST (Sem autenticação). OK

Regras para Avaliação: Renda Mensal < 500 = Reprovado || Renda Mensal >= 500 = Aprovado. Todo cliente aprovado ganhará R$ 200,00 de boas vindas. OK

Observações: O microsserviço deverá mandar um e-mail informando o cliente sobre o status da solicitação. Um CPF reprovado, não poderá enviar nova solicitação. OK

RF05 – Pix: Os clientes aprovados poderão fazer um PIX para outros clientes do banco utilizando o CPF. OK

RF06 – Login de acesso para admins/clientes e recuperar senha. OK

Atenção: Antes de iniciar a prova, envie o DIAGRAMA DE BANCO DE DADOS para o seu líder.

Objeto Client:

"clients": {

"full_name": "",

"email": "",

"phone": "",

"cpf_number": "",

"address": "",

"city": "",

"state": "",

"zipcode": "",

"current_balance": "",

"average_salary": "",

"status": ""

}
