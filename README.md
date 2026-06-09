# EcoPonto SP

EcoPonto SP é um protótipo funcional de uma plataforma GreenTech/GovTech para apoiar o descarte correto de resíduos eletrônicos em São Paulo.

O projeto permite consultar pontos de coleta, filtrar locais por bairro, tipo de resíduo e status, acessar orientações gerais de descarte, registrar intenções de descarte e gerenciar dados por meio de uma área administrativa protegida por login simulado.

---

## Projeto online

Acesse a versão publicada:

[Ver EcoPonto SP online](https://ecoponto-sp.vercel.app/)

---

## Acesso administrativo

Para acessar a área administrativa de demonstração:

**Rota:** `/admin/login`  
**Senha:** `ecoponto123`

A autenticação é simulada no front-end com LocalStorage. Em uma aplicação real, essa camada deveria ser substituída por autenticação com backend, sessão segura e validação no servidor.

---

## Objetivo

O objetivo do EcoPonto SP é demonstrar uma aplicação web completa, com fluxo público e administrativo, usando React, rotas, formulários, filtros, persistência local, dashboard, gráficos, login simulado e deploy.

O projeto foi desenvolvido como parte do meu portfólio, com foco em praticar organização de projeto, componentização, experiência de usuário e evolução incremental de funcionalidades.

---

## Problema

Muitas pessoas possuem celulares, cabos, pilhas, baterias, notebooks e outros eletrônicos antigos, mas não sabem onde descartá-los corretamente.

Além disso, informações sobre pontos de coleta costumam estar espalhadas, pouco acessíveis ou desatualizadas, dificultando o descarte responsável.

---

## Solução

O EcoPonto SP propõe uma plataforma web onde o cidadão pode:

- encontrar pontos de coleta;
- filtrar pontos por bairro, resíduo e status;
- visualizar detalhes de cada ponto;
- consultar orientações de descarte;
- registrar uma intenção de descarte.

A área administrativa permite:

- acessar o painel com login simulado;
- visualizar indicadores operacionais;
- gerenciar pontos de coleta;
- acompanhar solicitações registradas;
- analisar dados em gráficos de barras.

---

## Funcionalidades

### Área pública

- Home com identidade visual própria.
- Página de pontos de coleta.
- Filtros por busca, bairro, tipo de resíduo e status.
- Cards dinâmicos de pontos de coleta.
- Página de detalhes do ponto.
- Página de orientações gerais de descarte.
- Registro de descarte com formulário.
- Estados vazios para buscas sem resultado.
- Página 404 para rotas inexistentes.

### Área administrativa

- Login administrativo simulado.
- Rotas administrativas protegidas.
- Sessão administrativa salva no LocalStorage.
- Dashboard com indicadores dinâmicos.
- Gráficos de barras com Recharts.
- Gerenciamento de pontos de coleta.
- Cadastro, edição e remoção de pontos.
- Modal de confirmação para exclusão.
- Feedback visual com toast.
- Listagem de solicitações de descarte.

---

## Rotas principais

| Rota | Descrição |
|---|---|
| `/` | Home |
| `/pontos` | Listagem de pontos de coleta |
| `/pontos/:id` | Detalhes de um ponto |
| `/orientacoes-descarte` | Orientações gerais de descarte |
| `/registrar-descarte` | Registro de descarte |
| `/admin/login` | Login administrativo simulado |
| `/admin` | Dashboard administrativo |
| `/admin/pontos` | Gerenciamento de pontos |
| `/admin/solicitacoes` | Solicitações registradas |
| `*` | Página 404 |

---

## Fluxo principal

1. O cidadão acessa a Home.
2. Consulta pontos de coleta.
3. Filtra por bairro, tipo de resíduo ou status.
4. Abre os detalhes de um ponto.
5. Consulta orientações gerais de descarte, se necessário.
6. Registra uma intenção de descarte.
7. A solicitação fica salva no LocalStorage.
8. O administrador acessa a área protegida.
9. O dashboard atualiza indicadores e gráficos com base nos dados salvos.

---

## Tecnologias utilizadas

- React
- Vite
- React Router
- JavaScript
- CSS
- LocalStorage
- Recharts
- Lucide React
- Vercel

---

## Organização do projeto

```text
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

A estrutura foi organizada por domínio de funcionalidade, separando páginas, componentes reutilizáveis, regras de armazenamento local, dados simulados e estilos específicos.

---

## Destaques técnicos

- Rotas públicas e administrativas com React Router.
- Proteção de rotas administrativas com login simulado.
- Persistência de dados usando LocalStorage.
- CRUD completo de pontos de coleta.
- Dashboard com métricas derivadas dos dados salvos.
- Gráficos de barras usando Recharts.
- Componentes reutilizáveis para modal, toast e estados vazios.
- Página 404 para rotas inexistentes.
- Deploy na Vercel com configuração para rotas internas.
- Layout responsivo para desktop, tablet e mobile.

---

## Observações sobre autenticação

A autenticação administrativa é uma simulação feita no front-end para fins de demonstração.

Ela permite mostrar o fluxo de:

- login;
- sessão local;
- rotas protegidas;
- redirecionamento automático;
- logout.

Em uma versão futura com backend, essa camada pode evoluir para autenticação real com API, banco de dados, tokens e controle de usuários.

---

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/FelipeHolandaNovelino/ecoponto-sp.git
```

Acesse a pasta:

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

```text
http://localhost:5173/
```

---

## Status do projeto

Projeto em desenvolvimento.

A versão atual já possui fluxo público, área administrativa protegida por login simulado, CRUD de pontos de coleta, registro de solicitações, dashboard com gráficos, página de orientações, estados vazios, página 404, feedback visual, modal de confirmação, responsividade e deploy publicado.

---

## Próximas melhorias

- Permitir alteração de status das solicitações.
- Evoluir o painel administrativo com histórico por ponto.
- Adicionar mapa real aos pontos de coleta.
- Criar backend para autenticação e persistência real.
- Integrar banco de dados.
- Adicionar prints ao README.

---

## Autor

Desenvolvido por Felipe Holanda como projeto de portfólio.