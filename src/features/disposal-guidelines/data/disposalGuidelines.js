/**
 * Orientações gerais de preparo para descarte eletrônico.
 *
 * Estes dados ficam separados da página para permitir manutenção mais simples
 * e futura evolução, como filtros, busca ou integração com conteúdo vindo de API.
 */
export const disposalGuidelines = [
  {
    id: "celulares",
    wasteType: "Celulares",
    summary:
      "Antes de descartar, proteja seus dados pessoais e entregue o aparelho inteiro em um ponto adequado.",
    rules: [
      "Faça backup dos dados importantes antes do descarte.",
      "Restaure o aparelho para as configurações de fábrica.",
      "Remova chip, cartão de memória e contas vinculadas sempre que possível.",
      "Não quebre, abra ou tente separar componentes internos.",
      "Entregue o celular com acessórios relacionados, como cabos e carregadores, quando aceitos pelo ponto.",
    ],
  },
  {
    id: "notebooks",
    wasteType: "Notebooks",
    summary:
      "Notebooks devem ser preparados com cuidado por conterem bateria, componentes eletrônicos e dados pessoais.",
    rules: [
      "Faça backup e apague arquivos pessoais antes da entrega.",
      "Saia de contas conectadas e restaure o sistema quando possível.",
      "Não remova peças internas sem orientação técnica.",
      "Se a bateria estiver inchada, danificada ou vazando, não pressione nem perfure.",
      "Transporte o equipamento fechado e protegido contra impactos.",
    ],
  },
  {
    id: "tablets",
    wasteType: "Tablets",
    summary:
      "Tablets seguem cuidados parecidos com celulares, especialmente por conterem bateria interna e dados pessoais.",
    rules: [
      "Faça backup dos arquivos importantes.",
      "Restaure o tablet para as configurações de fábrica.",
      "Remova chip e cartão de memória, se houver.",
      "Não descarte o equipamento no lixo comum.",
      "Evite entregar aparelhos quebrados com vidro solto sem proteção.",
    ],
  },
  {
    id: "pilhas",
    wasteType: "Pilhas",
    summary:
      "Pilhas devem ser separadas do lixo comum e entregues em coletores próprios.",
    rules: [
      "Mantenha as pilhas em local seco até o descarte.",
      "Não misture pilhas com lixo orgânico ou recicláveis comuns.",
      "Não abra, amasse, queime ou perfure as pilhas.",
      "Se possível, armazene em recipiente separado antes de levar ao ponto de coleta.",
      "Entregue apenas em locais que recebam pilhas e baterias portáteis.",
    ],
  },
  {
    id: "baterias",
    wasteType: "Baterias",
    summary:
      "Baterias exigem atenção especial, principalmente quando estão inchadas, vazando ou danificadas.",
    rules: [
      "Não perfure, dobre, pressione ou tente abrir a bateria.",
      "Evite contato direto com material vazado.",
      "Mantenha longe de calor, fogo, umidade e objetos metálicos soltos.",
      "Se estiver danificada, transporte com cuidado e informe a condição no ponto de coleta.",
      "Entregue em pontos preparados para receber baterias.",
    ],
  },
  {
    id: "carregadores",
    wasteType: "Carregadores",
    summary:
      "Carregadores são acessórios eletrônicos e devem seguir o fluxo de logística reversa.",
    rules: [
      "Separe carregadores de lixo comum e recicláveis domésticos.",
      "Não corte cabos nem tente abrir a fonte.",
      "Agrupe carregadores com cabos compatíveis, se possível.",
      "Evite entregar itens molhados ou com sujeira excessiva.",
      "Leve a pontos que recebam acessórios eletroeletrônicos.",
    ],
  },
  {
    id: "cabos",
    wasteType: "Cabos",
    summary:
      "Cabos podem ser reaproveitados ou reciclados, desde que sejam entregues em pontos adequados.",
    rules: [
      "Organize os cabos para evitar emaranhados e facilitar triagem.",
      "Não queime fios para separar materiais.",
      "Não descarte cabos em lixo comum.",
      "Separe cabos muito danificados de equipamentos ainda funcionais.",
      "Entregue junto com outros acessórios eletrônicos quando o ponto aceitar.",
    ],
  },
  {
    id: "monitores",
    wasteType: "Monitores",
    summary:
      "Monitores devem ser transportados com cuidado por conterem tela, vidro e componentes eletrônicos.",
    rules: [
      "Não quebre a tela antes do descarte.",
      "Transporte o monitor protegido contra quedas e impactos.",
      "Não remova placas ou componentes internos.",
      "Evite deixar o equipamento exposto à chuva ou umidade.",
      "Confirme se o ponto recebe monitores antes de levar o item.",
    ],
  },
  {
    id: "pequenos-eletronicos",
    wasteType: "Pequenos eletrônicos",
    summary:
      "Pequenos eletrônicos devem ser separados e entregues inteiros sempre que possível.",
    rules: [
      "Remova pilhas ou baterias removíveis antes do descarte, quando possível.",
      "Não misture com resíduos molhados, orgânicos ou cortantes.",
      "Evite desmontar o equipamento sem necessidade.",
      "Agrupe peças pequenas em uma embalagem para facilitar transporte.",
      "Leve a pontos que aceitam eletroeletrônicos de pequeno porte.",
    ],
  },
  {
    id: "perifericos",
    wasteType: "Periféricos",
    summary:
      "Teclados, mouses, webcams e acessórios devem ser tratados como resíduos eletroeletrônicos.",
    rules: [
      "Separe periféricos de lixo comum.",
      "Remova pilhas de mouses ou teclados sem fio, quando houver.",
      "Não quebre plásticos ou placas internas antes da entrega.",
      "Agrupe acessórios pequenos para facilitar a triagem.",
      "Entregue em pontos que recebam eletroeletrônicos e acessórios.",
    ],
  },
];