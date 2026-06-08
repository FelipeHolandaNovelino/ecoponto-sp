# EcoPonto SP

EcoPonto SP é um protótipo funcional de uma plataforma GreenTech/GovTech criada para facilitar o descarte correto de resíduos eletrônicos em São Paulo.

A aplicação conecta cidadãos a pontos de coleta, permite consultar locais por bairro, tipo de resíduo e status operacional, além de oferecer uma área administrativa para visualizar solicitações de descarte registradas pelos usuários.

---

## Objetivo do projeto

O objetivo do EcoPonto SP é criar uma solução digital acessível, responsiva e orientada a dados para apoiar o descarte correto de resíduos eletrônicos em centros urbanos.

Este projeto faz parte do meu portfólio e foi desenvolvido com foco em praticar organização de projeto React, componentização, rotas, filtros, formulários, persistência local e separação entre área pública e área administrativa.

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

A plataforma também conta com uma área administrativa onde é possível visualizar solicitações registradas pelos usuários.

---

## Público-alvo

### Cidadãos

Pessoas que precisam descartar resíduos eletrônicos de forma correta, mas não sabem onde encontrar pontos de coleta próximos ou compatíveis com o tipo de material que possuem.

### Administradores

Usuários responsáveis por acompanhar solicitações de descarte e visualizar informações operacionais da plataforma.

---

## Funcionalidades implementadas

### Área pública

- Home com apresentação do projeto.
- Página de pontos de coleta.
- Filtro por busca textual.
- Filtro por bairro.
- Filtro por tipo de resíduo.
- Filtro por status do ponto.
- Cards dinâmicos gerados a partir de dados mockados.
- Página de detalhes do ponto de coleta.
- Registro de descarte com formulário.
- Seleção automática do ponto ao registrar descarte a partir da página de detalhes.
- Salvamento das solicitações no LocalStorage.
- Estado de sucesso após envio do formulário.

### Área administrativa

- Dashboard operacional inicial.
- Página de solicitações de descarte.
- Leitura das solicitações salvas no LocalStorage.
- Estado vazio quando não há solicitações.
- Cards administrativos com status, tipo de resíduo, quantidade, ponto escolhido e data de registro.

---

## Fluxo principal

```txt
Usuário acessa a Home
  ↓
Consulta pontos de coleta
  ↓
Filtra por bairro, resíduo ou status
  ↓
Abre os detalhes de um ponto
  ↓
Registra uma intenção de descarte
  ↓
A solicitação é salva no LocalStorage
  ↓
Admin visualiza a solicitação na área administrativa
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

    disposal-requests/
      utils/
        disposalRequestsStorage.js

    waste-types/
      data/
        wasteTypes.js

  pages/
    AdminDashboardPage.jsx
    AdminRequestsPage.jsx
    CollectionPointDetailsPage.jsx
    CollectionPointsPage.jsx
    DisposalRequestPage.jsx
    HomePage.jsx

  styles/
    global.css
```

---

## Organização técnica

O projeto foi organizado com uma estrutura por domínios de funcionalidade.

### `app/`

Contém a configuração principal da aplicação, como o componente raiz e as rotas.

### `components/`

Contém componentes compartilhados ou estruturais da interface, como o layout principal.

### `features/`

Agrupa funcionalidades específicas do produto, como pontos de coleta, solicitações de descarte e tipos de resíduos.

Essa organização evita que todo o código fique concentrado apenas em uma pasta genérica de componentes. Cada domínio do sistema mantém seus dados, componentes e funções auxiliares mais próximos.

### `pages/`

Contém as telas completas acessadas pelas rotas.

### `styles/`

Contém os estilos globais da aplicação.

---

## Principais arquivos

### `src/app/App.jsx`

Componente principal da aplicação. Ele configura o `BrowserRouter`, registra as rotas e aplica o layout base por meio do `AppLayout`.

### `src/app/routes.jsx`

Centraliza as rotas públicas e administrativas do projeto.

### `src/components/layout/AppLayout.jsx`

Define a estrutura visual principal da aplicação, incluindo cabeçalho, navegação e área de conteúdo.

### `src/features/collection-points/data/collectionPoints.js`

Contém os dados simulados dos pontos de coleta.

### `src/features/collection-points/utils/collectionPointFilters.js`

Contém as funções responsáveis por filtrar pontos de coleta por busca textual, bairro, tipo de resíduo e status.

### `src/features/disposal-requests/utils/disposalRequestsStorage.js`

Centraliza a leitura e escrita das solicitações de descarte no LocalStorage.

### `src/pages/CollectionPointsPage.jsx`

Tela de listagem dos pontos de coleta, com filtros combinados e renderização dinâmica dos cards.

### `src/pages/CollectionPointDetailsPage.jsx`

Tela de detalhes de um ponto de coleta, usando parâmetro dinâmico da URL.

### `src/pages/DisposalRequestPage.jsx`

Tela de registro de descarte, com formulário controlado, validação simples e persistência no LocalStorage.

### `src/pages/AdminRequestsPage.jsx`

Tela administrativa que lê e exibe as solicitações salvas pelo usuário.

---

## Principais aprendizados praticados

Com este projeto, foram praticados:

- criação de projeto com React e Vite;
- estruturação de rotas com React Router;
- componentização;
- organização por domínio de funcionalidade;
- uso de dados mockados;
- filtros combinados;
- renderização dinâmica com `map`;
- rotas dinâmicas com `useParams`;
- leitura de parâmetros de URL com `useSearchParams`;
- formulários controlados;
- validação simples;
- persistência com LocalStorage;
- criação de estado vazio;
- separação entre área pública e área administrativa;
- responsividade com CSS global;
- uso de Git e GitHub para versionamento.

---

## Stack utilizada

- React
- Vite
- React Router
- JavaScript
- CSS
- LocalStorage
- Lucide React

---

## Diferenciais do projeto

O EcoPonto SP foi planejado para mostrar habilidades diferentes de um sistema puramente visual.

Entre os diferenciais estão:

- fluxo público e administrativo;
- filtros funcionais;
- uso de dados estruturados;
- registro de solicitações;
- persistência local;
- navegação por rotas;
- visual responsivo;
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
- Corrigir e consolidar estilos globais.

### Próximas etapas

- Criar gerenciamento administrativo de pontos de coleta.
- Implementar criação, edição e remoção de pontos.
- Criar dashboard com gráficos.
- Melhorar indicadores administrativos.
- Adicionar persistência dos pontos no LocalStorage.
- Refinar responsividade.
- Adicionar prints ao README.
- Publicar deploy.

### Evoluções futuras

- Adicionar mapa real com Leaflet.
- Criar autenticação.
- Integrar banco de dados real.
- Criar API própria.
- Adicionar perfis de usuário.
- Adicionar painel de métricas ambientais mais completo.

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

A versão atual já possui o fluxo público de consulta e registro de descarte, além de uma área administrativa inicial para visualização das solicitações.

---

## Autor

Desenvolvido por Felipe Holanda como projeto de portfólio.