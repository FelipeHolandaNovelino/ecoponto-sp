# EcoPonto SP

Aplicação web fictícia para localização de pontos de descarte eletrônico em São Paulo, orientação de descarte responsável, registro de solicitações e acompanhamento de status pelo cidadão.

O projeto foi desenvolvido como parte do meu portfólio, com foco em React, organização de código, experiência do usuário, rotas públicas e administrativas, persistência local e simulação de fluxos reais de uma plataforma GreenTech/GovTech.

## Projeto online

* Deploy: https://ecoponto-sp.vercel.app/
* Repositório: https://github.com/FelipeHolandaNovelino/ecoponto-sp

## Acesso administrativo

A área administrativa utiliza autenticação simulada para fins de demonstração.

```txt
Senha: ecoponto123
```

## Objetivo do projeto

O EcoPonto SP simula uma plataforma pública para ajudar cidadãos a encontrarem locais adequados para descarte de resíduos eletrônicos, registrar intenções de descarte e acompanhar o andamento da solicitação pelo CPF ou e-mail informado.

Além da área pública, o projeto possui uma área administrativa para gerenciar pontos de coleta, visualizar indicadores e atualizar o status das solicitações.

## Problema abordado

O descarte incorreto de eletrônicos pode gerar impactos ambientais e dificultar o reaproveitamento de materiais. Muitas pessoas não sabem onde descartar celulares, cabos, pilhas, baterias, carregadores e outros dispositivos.

Além disso, quando existe uma solicitação de descarte, o cidadão precisa de uma forma simples de acompanhar o andamento sem depender de contato manual.

## Solução proposta

A aplicação centraliza informações sobre pontos de coleta, orientações de descarte, registro de solicitações e consulta pública de status.

Na área administrativa, o responsável pode gerenciar pontos, acompanhar solicitações e alterar o status de cada registro.

## Funcionalidades

### Área pública

* Página inicial com apresentação do projeto.
* Listagem de pontos de descarte.
* Filtros por busca, bairro, tipo de resíduo e status.
* Página de detalhes de cada ponto.
* Página com orientações gerais de descarte.
* Formulário para registrar uma solicitação de descarte.
* Campos obrigatórios no registro:

  * Nome
  * CPF
  * E-mail
* Consulta pública de solicitação por CPF ou e-mail.
* Exibição do status atualizado da solicitação.
* Página 404 para rotas inexistentes.

### Área administrativa

* Login administrativo simulado.
* Rotas protegidas para páginas administrativas.
* Dashboard com indicadores e gráficos.
* Cadastro, edição e exclusão de pontos de coleta.
* Confirmação antes de remover registros.
* Feedback visual com mensagens de sucesso.
* Listagem de solicitações de descarte.
* Exibição de nome, CPF, e-mail, tipo de resíduo, quantidade e ponto escolhido.
* Alteração de status das solicitações:

  * Pendente
  * Recebido
  * Processado
  * Cancelado

## Principais rotas

```txt
/                       Página inicial
/pontos                 Pontos de descarte
/pontos/:id             Detalhes do ponto
/orientacoes-descarte   Orientações de descarte
/registrar-descarte     Registro de solicitação
/acompanhar-solicitacao Consulta pública de status
/admin/login            Login administrativo
/admin                  Dashboard administrativo
/admin/pontos           Gestão de pontos
/admin/solicitacoes     Gestão de solicitações
```

## Fluxo principal

```txt
Usuário acessa a Home
↓
Consulta pontos de descarte
↓
Visualiza orientações
↓
Registra uma solicitação com nome, CPF e e-mail
↓
Admin acessa a área administrativa
↓
Admin altera o status da solicitação
↓
Usuário consulta o andamento pelo CPF ou e-mail
```

## Tecnologias utilizadas

* React
* Vite
* JavaScript
* CSS
* React Router
* Recharts
* Lucide React
* LocalStorage
* Vercel

## Organização do projeto

```txt
src/
  app/
    App.jsx
    routes.jsx

  components/
    auth/
    layout/
    ui/

  features/
    auth/
    collection-points/
    dashboard/
    disposal-guidelines/
    disposal-requests/
    waste-types/

  pages/

  styles/
```

## Destaques técnicos

* Estrutura separada por responsabilidades.
* Rotas públicas e administrativas.
* Proteção de rotas administrativas.
* Persistência local com LocalStorage.
* CRUD completo de pontos de coleta.
* Fluxo administrativo para solicitações.
* Consulta pública de status por CPF ou e-mail.
* Normalização de CPF e e-mail para busca.
* Validação de campos obrigatórios no registro.
* Componentes reutilizáveis de UI.
* Dashboard com gráficos usando Recharts.
* Layout responsivo.
* Deploy configurado para SPA na Vercel.

## Observação sobre dados pessoais

Este é um projeto demonstrativo de portfólio. Os dados são salvos apenas no LocalStorage do navegador.

Em uma versão real, o uso de CPF, e-mail e dados de solicitação exigiria backend seguro, autenticação, controle de acesso, criptografia, política de privacidade e adequação à LGPD.

Para testes, recomenda-se utilizar dados fictícios.

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/FelipeHolandaNovelino/ecoponto-sp.git
```

Acesse a pasta do projeto:

```bash
cd ecoponto-sp
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse no navegador:

```txt
http://localhost:5173
```

## Build de produção

```bash
npm run build
```

## Status do projeto

Projeto em versão de portfólio, com fluxo público e administrativo funcional usando dados simulados e persistência local.

## Possíveis melhorias futuras

* Integração com backend real.
* Autenticação real de administradores.
* Banco de dados para pontos e solicitações.
* Mapa interativo com geolocalização.
* Validação completa de CPF.
* Criptografia e proteção adequada de dados pessoais.
* Envio de e-mails de acompanhamento.
* Histórico detalhado de alterações de status.
* Upload de imagens para pontos de coleta.
* Relatórios administrativos exportáveis.

## Autor

Desenvolvido por Felipe Holanda.

* GitHub: https://github.com/FelipeHolandaNovelino
* LinkedIn: https://www.linkedin.com/
