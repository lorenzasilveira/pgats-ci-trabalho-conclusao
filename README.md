# Trabalho de Conclusão – Pipeline CI com GitHub Actions

## Objetivo

Este projeto tem como objetivo demonstrar a implementação de uma pipeline de Integração Contínua (CI) utilizando GitHub Actions para automatizar a execução de testes em uma aplicação Node.js.

A solução contempla:

* Desenvolvimento de uma aplicação JavaScript simples;
* Criação de testes automatizados utilizando Mocha;
* Geração de relatórios HTML de execução de testes com Mochawesome;
* Automação da execução dos testes através do GitHub Actions;
* Publicação dos relatórios como artefatos da execução da pipeline.

---

# Estrutura do Projeto

```text
.
├── .github
│   └── workflows
│       └── main.yaml
├── src
│   └── servicoDePagamento.js
├── test
│   └── servicodePagamento.test.js
├── package.json
└── package-lock.json
```

---

# Tecnologias Utilizadas

| Tecnologia     | Finalidade                      |
| -------------- | ------------------------------- |
| Node.js        | Ambiente de execução JavaScript |
| Mocha          | Framework de testes             |
| Mochawesome    | Geração de relatórios HTML      |
| GitHub Actions | Automação da pipeline CI        |
| Git            | Controle de versão              |

---

# Aplicação

A aplicação consiste na classe `ServicoDePagamento`, responsável por:

* Registrar pagamentos;
* Classificar pagamentos por categoria;
* Consultar o último pagamento realizado.

## Regra de Negócio

A categoria do pagamento é definida automaticamente:

| Valor                | Categoria |
| -------------------- | --------- |
| Maior que 100        | cara      |
| Menor ou igual a 100 | padrão    |

---

# Testes Automatizados

Os testes validam:

### Cadastro de pagamentos

* Inclusão correta do pagamento na lista;
* Persistência dos dados informados;
* Classificação correta da categoria.

### Consulta de pagamentos

* Retorno correto do último pagamento realizado.

Atualmente o projeto possui quatro cenários de teste automatizados cobrindo as principais funcionalidades da aplicação.

---

# Instalação

## Clonar o repositório

```bash
git clone https://github.com/lorenzasilveira/pgats-ci-trabalho-conclusao.git
```

## Instalar dependências

```bash
npm install
```

---

# Execução dos Testes

```bash
npm test
```

O comando executa o Mocha utilizando o reporter Mochawesome.

---

# Relatório de Testes

O Mochawesome gera automaticamente um relatório HTML contendo:

* Quantidade de testes executados;
* Testes aprovados;
* Testes falhos;
* Tempo de execução;
* Evidências da execução.

Arquivos gerados:

```text
mochawesome-report/
├── mochawesome.html
└── mochawesome.json
```

---

# Pipeline de Integração Contínua

A pipeline foi implementada utilizando GitHub Actions.

Arquivo:

```text
.github/workflows/main.yaml
```

## Gatilhos da Pipeline

A execução ocorre através de três mecanismos:

### Execução Manual

Permite que o usuário execute a pipeline diretamente pela interface do GitHub.

```yaml
workflow_dispatch:
```

### Push na Branch Principal

Toda alteração enviada para a branch `main` dispara automaticamente a pipeline.

```yaml
push:
  branches:
    - main
```

### Execução Agendada

A pipeline também é executada automaticamente toda segunda-feira às 00:00 UTC.

```yaml
schedule:
  - cron: '0 0 * * 1'
```

---

# Fluxo da Pipeline

## 1. Checkout do Código

Obtém a versão mais recente do projeto.

```yaml
uses: actions/checkout@v4
```

---

## 2. Configuração do Ambiente Node.js

Instala a versão necessária do Node.

```yaml
uses: actions/setup-node@v4
```

---

## 3. Instalação das Dependências

Executa:

```bash
npm ci
```

Este comando garante instalações reproduzíveis utilizando o arquivo `package-lock.json`.

---

## 4. Execução dos Testes

Executa:

```bash
npm run test
```

Responsável por:

* Executar todos os testes;
* Gerar o relatório HTML;
* Retornar sucesso ou falha da build.

---

## 5. Publicação dos Artefatos

Ao final da execução, o relatório é armazenado como artefato do GitHub Actions.

```yaml
uses: actions/upload-artifact@v4
```

Isso permite baixar posteriormente o relatório HTML diretamente pela interface do GitHub.

---

# Conceitos Aplicados

## Integração Contínua (CI)

A pipeline implementa o conceito de Integração Contínua ao executar automaticamente os testes da aplicação sempre que ocorre uma alteração no código. Isso permite identificar falhas rapidamente e garantir a qualidade do software durante o desenvolvimento.

## Pipeline como Código

Toda a automação foi definida em um arquivo YAML versionado junto ao projeto, permitindo rastreabilidade, manutenção simplificada e reprodutibilidade do processo de validação.

## Triggers de Execução

A pipeline pode ser executada por diferentes eventos:

* **Push:** execução automática após alterações na branch principal.
* **Workflow Dispatch:** execução manual pela interface do GitHub.
* **Schedule:** execução programada toda segunda-feira às 00:00 UTC utilizando expressão cron.

## Automação do Processo

A pipeline automatiza as principais etapas de validação da aplicação:

1. Checkout do código-fonte;
2. Configuração do ambiente Node.js;
3. Instalação das dependências;
4. Execução dos testes automatizados;
5. Geração do relatório de testes.

## Relatórios e Artefatos

Os testes geram um relatório HTML utilizando o Mochawesome. Ao final da execução, o relatório é armazenado como artefato da pipeline, permitindo consulta e download dos resultados diretamente pelo GitHub Actions, mesmo em casos de falha na execução dos testes.


# Conclusão

A solução implementada demonstra a aplicação prática dos conceitos de Integração Contínua utilizando GitHub Actions em um projeto Node.js. A automação da execução dos testes, combinada com a geração e armazenamento de relatórios, contribui para a melhoria da qualidade do software, redução de falhas e aumento da confiabilidade do processo de desenvolvimento.
