# EcoPonto SP

Aplicação web fictícia para localização de pontos de descarte eletrônico em São Paulo, orientação de descarte responsável e acompanhamento administrativo de solicitações.

O projeto foi desenvolvido como parte do meu portfólio, com foco em React, organização de código, experiência do usuário e simulação de fluxos reais de uma plataforma GreenTech/GovTech.

## Projeto online

* Deploy: https://ecoponto-sp.vercel.app/
* Repositório: https://github.com/FelipeHolandaNovelino/ecoponto-sp

## Acesso administrativo

A área administrativa utiliza autenticação simulada para fins de demonstração.

```txt
Senha: ecoponto123
```

## Objetivo do projeto

O EcoPonto SP simula uma plataforma pública para ajudar cidadãos a encontrarem locais adequados para descarte de resíduos eletrônicos, além de oferecer uma área administrativa para acompanhamento de pontos de coleta, solicitações e indicadores operacionais.

## Problema abordado

O descarte incorreto de eletrônicos pode gerar impactos ambientais e dificultar o reaproveitamento de materiais. Muitas pessoas não sabem onde descartar celulares, cabos, pilhas, baterias, carregadores e outros dispositivos.

## Solução proposta

A aplicação centraliza informações sobre pontos de coleta, orientações de descarte e registro de intenções de descarte. Na área administrativa, o responsável pode gerenciar pontos, visualizar indicadores e acompanhar o andamento das solicitações.

## Funcionalidades

### Área pública

* Página inicial com apresentação do projeto.
* Listagem de pontos de descarte.
* Filtros por busca, bairro, tipo de resíduo e status.
* Página de detalhes de cada ponto.
* Página com orientações gerais de descarte.
* Formulário para registrar uma solicitação de descarte.
* Página 404 para rotas inexistentes.

### Área administrativa

* Login administrativo simulado.
* Rotas protegidas para páginas administrativas.
* Dashboard com indicadores e gráficos.
* Cadastro, edição e exclusão de pontos de coleta.
* Confirmação antes de remover registros.
* Feedback visual com mensagens de sucesso.
* Listagem de solicitações de descarte.
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
/admin/login            Login administrativo
/admin                  Dashboard administrativo
/admin/pontos           Gestão de pontos
/admin/solicitacoes     Gestão de solicitações
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
* Componentes reutilizáveis de UI.
* Dashboard com gráficos usando Recharts.
* Layout responsivo.
* Deploy configurado para SPA na Vercel.

## Fluxo principal

```txt
Usuário acessa a Home
↓
Consulta pontos de descarte
↓
Visualiza orientações
↓
Registra uma solicitação de descarte
↓
Admin acessa a área administrativa
↓
Admin acompanha a solicitação e altera o status
```

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

## Status do projeto

Projeto em versão de portfólio, com fluxo público e administrativo funcional usando dados simulados e persistência local.

## Possíveis melhorias futuras

* Integração com backend real.
* Autenticação real de administradores.
* Banco de dados para pontos e solicitações.
* Mapa interativo com geolocalização.
* Upload de imagens para pontos de coleta.
* Relatórios administrativos exportáveis.
* Histórico detalhado de alterações de status.

## Autor

Desenvolvido por Felipe Holanda.

* GitHub: https://github.com/FelipeHolandaNovelino
* LinkedIn: https://www.linkedin.com/
