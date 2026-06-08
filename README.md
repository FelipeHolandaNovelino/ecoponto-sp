# EcoPonto SP

EcoPonto SP é um protótipo funcional de uma plataforma GreenTech/GovTech criada para facilitar o descarte correto de resíduos eletrônicos em São Paulo.

A aplicação conecta cidadãos a pontos de coleta, permite consultar locais por bairro, tipo de resíduo e status operacional, possibilita registrar intenções de descarte e oferece uma área administrativa para gerenciar pontos, acompanhar solicitações e visualizar indicadores operacionais.

---

## Objetivo do projeto

O objetivo do EcoPonto SP é criar uma solução digital acessível, responsiva e orientada a dados para apoiar o descarte correto de resíduos eletrônicos em centros urbanos.

Este projeto faz parte do meu portfólio e foi desenvolvido com foco em praticar organização de projeto React, componentização, rotas, filtros, formulários, CRUD, persistência local, dashboard administrativo, responsividade e separação entre área pública e área administrativa.

---

## Problema

Muitas pessoas possuem eletrônicos antigos ou sem uso, como celulares, cabos, carregadores, pilhas, notebooks e pequenos aparelhos, mas não sabem onde descartá-los corretamente.

Além disso, informações sobre pontos de coleta costumam estar espalhadas, desatualizadas ou pouco acessíveis para a população.

Esse cenário dificulta o descarte responsável e pode contribuir para o descarte inadequado de resíduos eletrônicos no ambiente urbano.

---

## Solução proposta

O EcoPonto SP propõe uma plataforma web responsiva onde o usuário pode:

- encontrar pontos de coleta;
- filtrar locais por bairro;
- filtrar pontos por tipo de resíduo eletrônico;
- consultar status operacional;
- visualizar detalhes de um ponto de coleta;
- registrar uma intenção de descarte.

A plataforma também conta com uma área administrativa onde é possível:

- visualizar indicadores operacionais;
- gerenciar pontos de coleta;
- cadastrar novos pontos;
- editar pontos existentes;
- remover pontos;
- visualizar solicitações de descarte;
- acompanhar dados em gráficos de barras.

---

## Público-alvo

### Cidadãos

Pessoas que precisam descartar resíduos eletrônicos de forma correta, mas não sabem onde encontrar pontos de coleta próximos ou compatíveis com o tipo de material que possuem.

### Administradores

Usuários responsáveis por gerenciar pontos de coleta, acompanhar solicitações de descarte e visualizar informações operacionais da plataforma.

---

## Funcionalidades implementadas

### Área pública

- Home com identidade visual redesenhada.
- Hero visual com chamada principal, CTAs, ilustração em CSS e card de impacto.
- Página de pontos de coleta.
- Filtro por busca textual.
- Filtro por bairro.
- Filtro por tipo de resíduo.
- Filtro por status do ponto.
- Cards dinâmicos gerados a partir de dados persistidos.
- Página de detalhes do ponto de coleta.
- Registro de descarte com formulário.
- Seleção automática do ponto ao registrar descarte a partir da página de detalhes.
- Salvamento das solicitações no LocalStorage.
- Estado de sucesso após envio do formulário.

### Área administrativa

- Dashboard operacional com indicadores dinâmicos.
- Cards de resumo baseados nos dados salvos no LocalStorage.
- Página administrativa de solicitações de descarte.
- Leitura das solicitações salvas no LocalStorage.
- Estado vazio quando não há solicitações.
- Cards administrativos com status, tipo de resíduo, quantidade, ponto escolhido e data de registro.
- Página de gerenciamento de pontos de coleta.
- Cadastro de novos pontos.
- Edição de pontos existentes.
- Remoção de pontos.
- Alteração de status operacional.
- Persistência dos pontos no LocalStorage.
- Dashboard com gráficos de barras usando Recharts.
- Gráfico de pontos por status.
- Gráfico de resíduos registrados por tipo.
- Gráfico de pontos cadastrados por bairro.

---

## Fluxo principal

```txt
Admin cadastra ou edita pontos de coleta
  ↓
Área pública exibe os pontos atualizados
  ↓
Usuário consulta pontos de coleta
  ↓
Usuário filtra por bairro, resíduo ou status
  ↓
Usuário abre os detalhes de um ponto
  ↓
Usuário registra uma intenção de descarte
  ↓
A solicitação é salva no LocalStorage
  ↓
Admin visualiza a solicitação na área administrativa
  ↓
Dashboard atualiza indicadores e gráficos com base nos dados salvos
```

---

## Rotas do projeto

```txt
/
Home

/pontos
Listagem de pontos de coleta

/pontos/:id
Detalhes de um ponto de coleta

/registrar-descarte
Formulário de registro de descarte

/admin
Dashboard administrativo

/admin/pontos
Gerenciamento administrativo de pontos de coleta

/admin/solicitacoes
Listagem administrativa das solicitações
```

---

## Tipos de resíduos considerados

O sistema trabalha inicialmente com os seguintes tipos de resíduos eletrônicos:

- Celulares
- Notebooks
- Tablets
- Pilhas
- Baterias
- Carregadores
- Cabos
- Monitores
- Pequenos eletrônicos
- Periféricos

---

## Status dos pontos de coleta

Cada ponto de coleta pode possuir um dos seguintes status:

- Ativo
- Cheio
- Em manutenção

Esses status ajudam o usuário a entender se o ponto está disponível para receber novos descartes.

---

## Status das solicitações

As solicitações de descarte são criadas inicialmente com o status:

- Pendente

Em evoluções futuras, o fluxo poderá incluir:

- Recebido
- Processado
- Cancelado

---

## Estrutura do projeto

```txt
src/
  app/
    App.jsx
    routes.jsx

  components/
    layout/
      AppLayout.jsx

  features/
    collection-points/
      components/
        CollectionPointCard.jsx
      data/
        collectionPoints.js
      utils/
        collectionPointFilters.js
        collectionPointsStorage.js

    dashboard/
      components/
        DashboardBarChart.jsx
      utils/
        dashboardMetrics.js

    disposal-requests/
      utils/
        disposalRequestsStorage.js

    waste-types/
      data/
        wasteTypes.js

  pages/
    AdminCollectionPointsPage.jsx
    AdminDashboardPage.jsx
    AdminRequestsPage.jsx
    CollectionPointDetailsPage.jsx
    CollectionPointsPage.jsx
    DisposalRequestPage.jsx
    HomePage.jsx

  styles/
    adminCollectionPoints.css
    dashboard.css
    global.css
    home.css
```

---

## Organização técnica

O projeto foi organizado com uma estrutura por domínios de funcionalidade.

### `app/`

Contém a configuração principal da aplicação, como o componente raiz e as rotas.

### `components/`

Contém componentes compartilhados ou estruturais da interface, como o layout principal.

### `features/`

Agrupa funcionalidades específicas do produto, como pontos de coleta, solicitações de descarte, dashboard e tipos de resíduos.

Essa organização evita que todo o código fique concentrado apenas em uma pasta genérica de componentes. Cada domínio do sistema mantém seus dados, componentes e funções auxiliares mais próximos.

### `pages/`

Contém as telas completas acessadas pelas rotas.

### `styles/`

Contém os estilos globais e arquivos de estilo específicos de áreas mais complexas, como Home, dashboard e gerenciamento administrativo.

---

## Principais arquivos

### `src/app/App.jsx`

Componente principal da aplicação. Ele configura o `BrowserRouter`, registra as rotas e aplica o layout base por meio do `AppLayout`.

### `src/app/routes.jsx`

Centraliza as rotas públicas e administrativas do projeto.

### `src/components/layout/AppLayout.jsx`

Define a estrutura visual principal da aplicação, incluindo cabeçalho, navegação e área de conteúdo.

### `src/pages/HomePage.jsx`

Tela inicial do projeto, com apresentação da solução, CTAs principais, card de impacto e cards de funcionalidades.

### `src/styles/home.css`

Arquivo responsável pela identidade visual específica da Home, incluindo hero, ilustração em CSS, card de impacto e responsividade da página inicial.

### `src/features/collection-points/data/collectionPoints.js`

Contém os dados simulados iniciais dos pontos de coleta.

### `src/features/collection-points/utils/collectionPointFilters.js`

Contém as funções responsáveis por filtrar pontos de coleta por busca textual, bairro, tipo de resíduo e status.

### `src/features/collection-points/utils/collectionPointsStorage.js`

Centraliza a leitura, criação, edição, remoção e persistência dos pontos de coleta no LocalStorage.

### `src/features/disposal-requests/utils/disposalRequestsStorage.js`

Centraliza a leitura e escrita das solicitações de descarte no LocalStorage.

### `src/features/dashboard/utils/dashboardMetrics.js`

Contém funções responsáveis por calcular indicadores e montar dados para os gráficos do dashboard.

### `src/features/dashboard/components/DashboardBarChart.jsx`

Componente reutilizável para exibir gráficos de barras no dashboard administrativo.

### `src/pages/CollectionPointsPage.jsx`

Tela de listagem dos pontos de coleta, com filtros combinados e renderização dinâmica dos cards.

### `src/pages/CollectionPointDetailsPage.jsx`

Tela de detalhes de um ponto de coleta, usando parâmetro dinâmico da URL.

### `src/pages/DisposalRequestPage.jsx`

Tela de registro de descarte, com formulário controlado, validação simples e persistência no LocalStorage.

### `src/pages/AdminDashboardPage.jsx`

Tela administrativa principal, com indicadores dinâmicos e gráficos de barras baseados nos pontos e solicitações salvos.

### `src/pages/AdminCollectionPointsPage.jsx`

Tela administrativa de gerenciamento de pontos de coleta, com cadastro, edição, remoção e persistência local.

### `src/pages/AdminRequestsPage.jsx`

Tela administrativa que lê e exibe as solicitações salvas pelo usuário.

---

## Home

A Home foi redesenhada para funcionar como vitrine do produto.

Ela apresenta:

- proposta principal do EcoPonto SP;
- botões de acesso para pontos de coleta e dashboard;
- ilustração visual criada com CSS e ícones;
- card de impacto com métricas simuladas;
- cards de funcionalidades;
- chamada final para incentivar o descarte correto.

A identidade visual foi refinada para transmitir uma sensação mais moderna, sustentável e próxima de um produto real de portfólio.

---

## Dashboard administrativo

O dashboard administrativo foi desenvolvido para oferecer uma visão geral da operação simulada da plataforma.

Ele exibe:

- quantidade de pontos ativos;
- quantidade de solicitações pendentes;
- volume estimado registrado em kg;
- quantidade de bairros atendidos;
- gráfico de barras com pontos por status;
- gráfico de barras com resíduos registrados por tipo;
- gráfico de barras com pontos cadastrados por bairro.

Por preferência visual e clareza de leitura, o projeto não utiliza gráfico de pizza. As informações categóricas são apresentadas com gráficos de barras, facilitando comparação direta entre valores.

---

## Persistência local

O projeto utiliza LocalStorage para simular persistência de dados sem backend.

Atualmente são persistidos:

- pontos de coleta cadastrados ou editados pelo administrador;
- solicitações de descarte registradas pelos usuários.

Essa abordagem permite demonstrar fluxo de dados, CRUD e atualização do dashboard sem depender de banco de dados ou API externa nesta etapa do projeto.

---

## Responsividade

O projeto passou por uma revisão de responsividade nas principais áreas:

- layout global;
- cabeçalho;
- Home;
- filtros;
- cards;
- formulários;
- dashboard;
- gerenciamento administrativo de pontos;
- gráficos;
- botões de ação.

A aplicação foi ajustada para funcionar melhor em desktop, tablet e telas menores, com grids adaptáveis, botões mais confortáveis para toque e redução de riscos de vazamento visual em cards e formulários.

---

## Principais aprendizados praticados

Com este projeto, foram praticados:

- criação de projeto com React e Vite;
- estruturação de rotas com React Router;
- componentização;
- organização por domínio de funcionalidade;
- uso de dados mockados;
- persistência com LocalStorage;
- filtros combinados;
- renderização dinâmica com `map`;
- rotas dinâmicas com `useParams`;
- leitura de parâmetros de URL com `useSearchParams`;
- formulários controlados;
- validação simples;
- CRUD no front-end;
- criação, edição e remoção de registros;
- criação de estado vazio;
- separação entre área pública e área administrativa;
- criação de dashboard;
- cálculo de métricas derivadas;
- gráficos de barras com Recharts;
- responsividade com CSS;
- criação de identidade visual para Home;
- uso de Git e GitHub para versionamento.

---

## Stack utilizada

- React
- Vite
- React Router
- JavaScript
- CSS
- LocalStorage
- Recharts
- Lucide React

---

## Diferenciais do projeto

O EcoPonto SP foi planejado para mostrar habilidades diferentes de um sistema puramente visual.

Entre os diferenciais estão:

- fluxo público e administrativo;
- filtros funcionais;
- uso de dados estruturados;
- registro de solicitações;
- CRUD administrativo;
- persistência local;
- dashboard com indicadores dinâmicos;
- gráficos de barras;
- navegação por rotas;
- visual responsivo;
- Home com identidade visual própria;
- tema voltado a sustentabilidade;
- proposta de impacto social e ambiental;
- organização por domínios de funcionalidade.

---

## Roadmap

### Concluído

- Criar base React com Vite.
- Configurar rotas.
- Criar layout principal.
- Criar Home.
- Criar página de pontos de coleta.
- Criar filtros.
- Criar detalhes do ponto.
- Criar registro de descarte.
- Salvar solicitações no LocalStorage.
- Criar dashboard administrativo inicial.
- Criar página administrativa de solicitações.
- Criar gerenciamento administrativo de pontos.
- Implementar cadastro de pontos.
- Implementar edição de pontos.
- Implementar remoção de pontos.
- Persistir pontos no LocalStorage.
- Integrar pontos persistidos à área pública.
- Corrigir e consolidar estilos globais.
- Criar dashboard com gráficos de barras.
- Atualizar dashboard com métricas derivadas dos dados salvos.
- Refinar responsividade global.
- Refinar responsividade do dashboard.
- Refinar responsividade do gerenciamento administrativo.
- Redesenhar a Home.
- Compactar e ajustar composição visual do hero da Home.

### Próximas etapas

- Melhorar estados vazios.
- Criar página 404.
- Melhorar feedback visual após criar, editar ou remover pontos.
- Criar confirmação visual customizada no lugar de `window.confirm`.
- Adicionar prints ao README.
- Publicar deploy.

### Evoluções futuras

- Adicionar mapa real com Leaflet.
- Criar autenticação.
- Integrar banco de dados real.
- Criar API própria.
- Adicionar perfis de usuário.
- Adicionar painel de métricas ambientais mais completo.
- Permitir alteração de status das solicitações.
- Criar histórico de descarte por ponto de coleta.

---

## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/FelipeHolandaNovelino/ecoponto-sp.git
```

Entre na pasta:

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
http://localhost:5173/
```

---

## Status do projeto

Projeto em desenvolvimento.

A versão atual já possui um fluxo público de consulta e registro de descarte, uma área administrativa com gerenciamento de pontos de coleta, listagem de solicitações, dashboard com indicadores e gráficos de barras, além de uma Home redesenhada e responsiva.

---

## Autor

Desenvolvido por Felipe Holanda como projeto de portfólio.