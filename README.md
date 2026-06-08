# EcoPonto SP

EcoPonto SP é um protótipo funcional de uma plataforma GreenTech/GovTech criada para facilitar o descarte correto de resíduos eletrônicos em São Paulo.

A aplicação conecta cidadãos a pontos de coleta, permite consultar locais por bairro, tipo de resíduo e status operacional, oferece orientações gerais de descarte por tipo de resíduo, possibilita registrar intenções de descarte e conta com uma área administrativa protegida por login simulado para gerenciar pontos, acompanhar solicitações e visualizar indicadores operacionais.

---

## Projeto online

Acesse a versão publicada do EcoPonto SP:

[Ver projeto online](https://ecoponto-sp.vercel.app/)

O deploy foi realizado na Vercel.

---

## Objetivo do projeto

O objetivo do EcoPonto SP é criar uma solução digital acessível, responsiva e orientada a dados para apoiar o descarte correto de resíduos eletrônicos em centros urbanos.

Este projeto faz parte do meu portfólio e foi desenvolvido com foco em praticar organização de projeto React, componentização, rotas, filtros, formulários, CRUD, persistência local, dashboard administrativo, gráficos com Recharts, login administrativo simulado, rotas protegidas, responsividade, estados vazios, feedback visual, tratamento de rotas inexistentes e separação entre área pública e área administrativa.

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
- acessar orientações gerais de descarte;
- registrar uma intenção de descarte.

A plataforma também conta com uma área administrativa protegida onde é possível:

- acessar o painel por login simulado;
- visualizar indicadores operacionais;
- gerenciar pontos de coleta;
- cadastrar novos pontos;
- editar pontos existentes;
- remover pontos com modal de confirmação;
- receber feedback visual após ações administrativas;
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

- Home com identidade visual redesenhada e mais enxuta.
- Hero visual com chamada principal, CTA para pontos de coleta, ilustração em CSS e card compacto de impacto.
- Página de pontos de coleta.
- Filtro por busca textual.
- Filtro por bairro.
- Filtro por tipo de resíduo.
- Filtro por status do ponto.
- Cards dinâmicos gerados a partir de dados persistidos.
- Página de detalhes do ponto de coleta.
- Página de orientações gerais de descarte por tipo de resíduo.
- Registro de descarte com formulário.
- Seleção automática do ponto ao registrar descarte a partir da página de detalhes.
- Salvamento das solicitações no LocalStorage.
- Estado de sucesso após envio do formulário.
- Estados vazios para buscas sem resultado.
- Página 404 para rotas inexistentes.

### Área administrativa

- Login administrativo simulado.
- Proteção das rotas administrativas.
- Redirecionamento automático para `/admin/login` quando o usuário não está autenticado.
- Sessão administrativa simulada com LocalStorage.
- Botão de sair na navegação administrativa.
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
- Modal customizado para confirmação de exclusão.
- Feedback visual com toast após criar, editar, validar ou remover pontos.
- Alteração de status operacional.
- Persistência dos pontos no LocalStorage.
- Dashboard com gráficos de barras usando Recharts.
- Gráfico de pontos por status.
- Gráfico de resíduos registrados por tipo.
- Gráfico de pontos cadastrados por bairro.

---

## Fluxo principal

```txt
Admin acessa /admin
  ↓
Sistema verifica se existe sessão administrativa
  ↓
Se não houver sessão, redireciona para /admin/login
  ↓
Admin informa a senha de demonstração
  ↓
Sistema libera o dashboard administrativo
  ↓
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
Usuário consulta orientações gerais de descarte, se necessário
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

/orientacoes-descarte
Orientações gerais de descarte por tipo de resíduo

/registrar-descarte
Formulário de registro de descarte

/admin/login
Login administrativo simulado

/admin
Dashboard administrativo protegido

/admin/pontos
Gerenciamento administrativo de pontos de coleta protegido

/admin/solicitacoes
Listagem administrativa das solicitações protegida

*
Página 404 para rotas inexistentes
```

---

## Login administrativo simulado

A área administrativa do EcoPonto SP possui uma camada de login simulada no front-end.

O objetivo dessa funcionalidade é demonstrar o fluxo de acesso protegido para rotas administrativas, incluindo:

- página de login;
- validação de senha de demonstração;
- sessão salva no LocalStorage;
- proteção das rotas administrativas;
- redirecionamento automático para login;
- botão de sair na navegação administrativa.

A senha de demonstração usada no projeto é:

`ecoponto123`

Essa autenticação é apenas uma simulação para fins de portfólio. Em uma versão de produção, essa camada deve ser substituída por autenticação real com backend, validação no servidor, sessão segura e controle de usuários.

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
    auth/
      ProtectedAdminRoute.jsx

    layout/
      AppLayout.jsx

    ui/
      ConfirmModal.jsx
      EmptyState.jsx
      ToastMessage.jsx

  features/
    auth/
      utils/
        authStorage.js

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

    disposal-guidelines/
      data/
        disposalGuidelines.js

    disposal-requests/
      utils/
        disposalRequestsStorage.js

    waste-types/
      data/
        wasteTypes.js

  pages/
    AdminCollectionPointsPage.jsx
    AdminDashboardPage.jsx
    AdminLoginPage.jsx
    AdminRequestsPage.jsx
    CollectionPointDetailsPage.jsx
    CollectionPointsPage.jsx
    DisposalGuidelinesPage.jsx
    DisposalRequestPage.jsx
    HomePage.jsx
    NotFoundPage.jsx

  styles/
    adminCollectionPoints.css
    adminLogin.css
    confirmModal.css
    dashboard.css
    disposalGuidelines.css
    emptyState.css
    global.css
    home.css
    toastMessage.css
```

---

## Organização técnica

O projeto foi organizado com uma estrutura por domínios de funcionalidade.

### `app/`

Contém a configuração principal da aplicação, como o componente raiz e as rotas.

### `components/`

Contém componentes compartilhados ou estruturais da interface.

Atualmente inclui:

- `AppLayout.jsx`, responsável pelo layout principal;
- `ProtectedAdminRoute.jsx`, responsável por proteger rotas administrativas;
- `EmptyState.jsx`, responsável por estados vazios reutilizáveis;
- `ConfirmModal.jsx`, responsável por confirmações de ações sensíveis;
- `ToastMessage.jsx`, responsável por feedbacks visuais não bloqueantes.

### `features/`

Agrupa funcionalidades específicas do produto, como autenticação simulada, pontos de coleta, solicitações de descarte, orientações de descarte, dashboard e tipos de resíduos.

Essa organização evita que todo o código fique concentrado apenas em uma pasta genérica de componentes. Cada domínio do sistema mantém seus dados, componentes e funções auxiliares mais próximos.

### `pages/`

Contém as telas completas acessadas pelas rotas.

### `styles/`

Contém os estilos globais e arquivos de estilo específicos de áreas mais complexas, como Home, login administrativo, dashboard, estados vazios, modal de confirmação, toast, orientações de descarte e gerenciamento administrativo.

---

## Principais arquivos

### `src/app/App.jsx`

Componente principal da aplicação. Ele configura o `BrowserRouter`, registra as rotas, aplica o layout base por meio do `AppLayout` e envolve as rotas administrativas com proteção.

### `src/app/routes.jsx`

Centraliza as rotas públicas, rotas de autenticação administrativa, rotas administrativas protegidas e a rota de fallback para página 404.

### `src/components/layout/AppLayout.jsx`

Define a estrutura visual principal da aplicação, incluindo cabeçalho, navegação, área de conteúdo e botão de sair quando há sessão administrativa ativa.

### `src/components/auth/ProtectedAdminRoute.jsx`

Componente responsável por proteger as rotas administrativas. Quando não existe sessão ativa, redireciona o usuário para `/admin/login`.

### `src/features/auth/utils/authStorage.js`

Centraliza a autenticação administrativa simulada, incluindo validação da senha de demonstração, criação da sessão local, verificação de autenticação e encerramento da sessão.

### `src/pages/AdminLoginPage.jsx`

Página de login administrativo simulado. Permite acessar o painel usando uma senha de demonstração e prepara a estrutura para uma futura autenticação real com backend.

### `src/styles/adminLogin.css`

Arquivo responsável pelos estilos da tela de login administrativo.

### `src/components/ui/EmptyState.jsx`

Componente reutilizável para exibir estados vazios, buscas sem resultado, rotas inválidas e ausência de registros.

### `src/components/ui/ConfirmModal.jsx`

Componente reutilizável para confirmar ações sensíveis. Atualmente é usado na exclusão de pontos de coleta.

### `src/components/ui/ToastMessage.jsx`

Componente reutilizável para exibir feedbacks visuais após ações importantes, como criar, editar, validar ou remover pontos de coleta.

### `src/pages/HomePage.jsx`

Tela inicial do projeto, com apresentação da solução, CTA principal para pontos de coleta, card compacto de impacto e cards de funcionalidades complementares.

### `src/styles/home.css`

Arquivo responsável pela identidade visual específica da Home, incluindo hero, ilustração em CSS, card de impacto e responsividade da página inicial.

### `src/features/collection-points/data/collectionPoints.js`

Contém os dados simulados iniciais dos pontos de coleta.

### `src/features/collection-points/utils/collectionPointFilters.js`

Contém as funções responsáveis por filtrar pontos de coleta por busca textual, bairro, tipo de resíduo e status.

### `src/features/collection-points/utils/collectionPointsStorage.js`

Centraliza a leitura, criação, edição, remoção e persistência dos pontos de coleta no LocalStorage.

Também normaliza os dados dos pontos para manter apenas informações operacionais, já que as instruções gerais de descarte foram movidas para uma página própria.

### `src/features/disposal-guidelines/data/disposalGuidelines.js`

Contém as orientações gerais de preparo e descarte para cada tipo de resíduo eletrônico considerado pelo sistema.

### `src/pages/DisposalGuidelinesPage.jsx`

Página pública responsável por centralizar as regras gerais de descarte. Ela substitui instruções individuais dentro dos pontos de coleta e organiza as orientações por tipo de resíduo.

### `src/features/disposal-requests/utils/disposalRequestsStorage.js`

Centraliza a leitura e escrita das solicitações de descarte no LocalStorage.

### `src/features/dashboard/utils/dashboardMetrics.js`

Contém funções responsáveis por calcular indicadores e montar dados para os gráficos do dashboard.

### `src/features/dashboard/components/DashboardBarChart.jsx`

Componente reutilizável para exibir gráficos de barras no dashboard administrativo usando Recharts.

### `src/pages/CollectionPointsPage.jsx`

Tela de listagem dos pontos de coleta, com filtros combinados, renderização dinâmica dos cards e estado vazio para buscas sem resultado.

### `src/pages/CollectionPointDetailsPage.jsx`

Tela de detalhes de um ponto de coleta, usando parâmetro dinâmico da URL. Também exibe estado vazio quando o ponto não é encontrado.

### `src/pages/DisposalRequestPage.jsx`

Tela de registro de descarte, com formulário controlado, validação simples e persistência no LocalStorage.

### `src/pages/AdminDashboardPage.jsx`

Tela administrativa principal, com indicadores dinâmicos e gráficos de barras baseados nos pontos e solicitações salvos.

### `src/pages/AdminCollectionPointsPage.jsx`

Tela administrativa de gerenciamento de pontos de coleta, com cadastro, edição, remoção, modal de confirmação, feedback visual e persistência local.

### `src/pages/AdminRequestsPage.jsx`

Tela administrativa que lê e exibe as solicitações salvas pelo usuário.

### `src/pages/NotFoundPage.jsx`

Página exibida quando o usuário acessa uma rota inexistente.

---

## Home

A Home foi redesenhada para funcionar como vitrine do produto.

Ela apresenta:

- proposta principal do EcoPonto SP;
- botão de acesso para pontos de coleta;
- ilustração visual criada com CSS e ícones;
- card compacto de impacto com métricas simuladas;
- card de orientação de descarte;
- card de gestão administrativa.

A interface foi simplificada para evitar links repetidos para a mesma área. O acesso principal aos pontos de coleta fica no hero, enquanto a seção inferior destaca funcionalidades complementares.

---

## Orientações de descarte

O projeto possui uma página pública dedicada às orientações gerais de descarte.

Essa página organiza regras por tipo de resíduo eletrônico, como:

- celulares;
- notebooks;
- tablets;
- pilhas;
- baterias;
- carregadores;
- cabos;
- monitores;
- pequenos eletrônicos;
- periféricos.

As instruções foram centralizadas nessa página para evitar repetição em cada ponto de coleta. Com isso, os pontos ficam responsáveis por informações operacionais, como endereço, bairro, horário, status e resíduos aceitos.

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

## Recharts no deploy

O dashboard utiliza Recharts para renderização dos gráficos administrativos.

Durante o deploy, foi necessário ajustar as dimensões dos containers dos gráficos para evitar erro de largura e altura inválidas no ambiente publicado. A correção manteve o uso de Recharts e tornou os gráficos estáveis tanto localmente quanto na Vercel.

---

## Persistência local

O projeto utiliza LocalStorage para simular persistência de dados sem backend.

Atualmente são persistidos:

- sessão administrativa simulada;
- pontos de coleta cadastrados ou editados pelo administrador;
- solicitações de descarte registradas pelos usuários.

Essa abordagem permite demonstrar fluxo de dados, autenticação simulada, CRUD e atualização do dashboard sem depender de banco de dados ou API externa nesta etapa do projeto.

---

## Estados vazios

O projeto possui estados vazios reutilizáveis para melhorar a experiência quando não há dados disponíveis ou quando uma busca não retorna resultados.

Atualmente os estados vazios aparecem em situações como:

- busca sem resultado na página de pontos;
- ponto de coleta não encontrado;
- ausência de solicitações administrativas;
- ausência de pontos cadastrados;
- rota inexistente.

---

## Modal de confirmação

A exclusão de pontos de coleta utiliza um modal customizado de confirmação.

Esse modal substitui o `window.confirm` nativo do navegador, deixando a experiência mais consistente com a identidade visual do projeto.

O modal informa claramente a ação que será executada e oferece botões para cancelar ou confirmar a remoção.

---

## Feedback visual

O gerenciamento administrativo de pontos conta com mensagens visuais do tipo toast.

Essas mensagens aparecem após ações importantes, como:

- tentativa de salvar com campos obrigatórios vazios;
- entrada no modo de edição;
- cadastro de ponto;
- salvamento de alterações;
- remoção de ponto.

Esse recurso melhora a experiência administrativa, porque o sistema passa a comunicar claramente o resultado das ações executadas.

---

## Página 404

O projeto possui uma página 404 para rotas inexistentes.

Ela evita tela em branco e oferece caminhos seguros para o usuário retornar para:

- Home;
- pontos de coleta.

---

## Deploy

O projeto foi publicado na Vercel.

Como a aplicação usa React Router com `BrowserRouter`, foi adicionado um arquivo `vercel.json` para garantir que rotas internas continuem funcionando ao atualizar a página diretamente no navegador.

Exemplos de rotas que funcionam no deploy:

- `/admin/login`;
- `/admin/pontos`;
- `/admin/solicitacoes`;
- `/pontos/1`;
- `/orientacoes-descarte`;
- `/registrar-descarte`.

---

## Responsividade

O projeto passou por uma revisão de responsividade nas principais áreas:

- layout global;
- cabeçalho;
- Home;
- login administrativo;
- filtros;
- cards;
- formulários;
- página de orientações;
- dashboard;
- gerenciamento administrativo de pontos;
- gráficos;
- botões de ação;
- estados vazios;
- modal de confirmação;
- mensagens de feedback.

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
- criação de login administrativo simulado;
- proteção de rotas com React Router;
- redirecionamento de usuários não autenticados;
- controle de sessão local com LocalStorage;
- preparação da arquitetura para autenticação futura com backend;
- criação de estado vazio;
- criação de modal reutilizável;
- criação de feedback visual com toast;
- criação de página informativa baseada em dados estruturados;
- centralização de regras de orientação em uma fonte única;
- separação entre dados operacionais do ponto e conteúdo educativo do produto;
- separação entre área pública e área administrativa;
- criação de dashboard;
- cálculo de métricas derivadas;
- gráficos de barras com Recharts;
- correção de comportamento de gráficos em ambiente publicado;
- responsividade com CSS;
- criação de identidade visual para Home;
- tratamento de rotas inexistentes;
- configuração de deploy na Vercel;
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
- Vercel

---

## Diferenciais do projeto

O EcoPonto SP foi planejado para mostrar habilidades diferentes de um sistema puramente visual.

Entre os diferenciais estão:

- fluxo público e administrativo;
- login administrativo simulado;
- rotas administrativas protegidas;
- fluxo preparado para futura autenticação com backend;
- filtros funcionais;
- uso de dados estruturados;
- página informativa baseada em dados;
- registro de solicitações;
- CRUD administrativo;
- persistência local;
- dashboard com indicadores dinâmicos;
- gráficos de barras com Recharts;
- navegação por rotas;
- estados vazios reutilizáveis;
- modal customizado de confirmação;
- feedback visual com toast;
- página 404;
- deploy publicado;
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
- Criar login administrativo simulado.
- Proteger rotas administrativas.
- Adicionar sessão administrativa com LocalStorage.
- Adicionar botão de sair da área administrativa.
- Corrigir e consolidar estilos globais.
- Criar dashboard com gráficos de barras.
- Atualizar dashboard com métricas derivadas dos dados salvos.
- Manter gráficos com Recharts e corrigir renderização no deploy.
- Refinar responsividade global.
- Refinar responsividade do dashboard.
- Refinar responsividade do gerenciamento administrativo.
- Redesenhar a Home.
- Compactar e ajustar composição visual do hero da Home.
- Criar página de orientações gerais de descarte.
- Centralizar regras de descarte por tipo de resíduo.
- Remover instruções individuais dos pontos de coleta.
- Simplificar links repetidos na Home.
- Compactar card de impacto da Home.
- Criar estados vazios reutilizáveis.
- Criar página 404.
- Criar modal customizado de confirmação.
- Criar feedback visual com toast para o CRUD de pontos.
- Configurar deploy na Vercel.
- Corrigir fallback de rotas internas no deploy.

### Próximas etapas

- Permitir alteração de status das solicitações.
- Adicionar prints ao README.
- Criar uma seção de demonstração visual no README.
- Evoluir o painel administrativo com histórico por ponto.
- Substituir autenticação simulada por autenticação real com backend.

### Evoluções futuras

- Adicionar mapa real com Leaflet.
- Criar autenticação real.
- Integrar banco de dados real.
- Criar API própria.
- Adicionar perfis de usuário.
- Adicionar painel de métricas ambientais mais completo.
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

## Acesso administrativo de demonstração

Para acessar a área administrativa no ambiente local ou publicado, use:

```txt
Rota: /admin/login
Senha: ecoponto123
```

A autenticação é simulada no front-end e salva a sessão no LocalStorage.

---

## Status do projeto

Projeto em desenvolvimento.

A versão atual já possui um fluxo público de consulta e registro de descarte, página de orientações gerais, área administrativa com login simulado, gerenciamento de pontos de coleta, listagem de solicitações, dashboard com indicadores e gráficos de barras, estados vazios, página 404, modal de confirmação, feedback visual, deploy publicado e uma Home redesenhada e responsiva.

---

## Autor

Desenvolvido por Felipe Holanda como projeto de portfólio.