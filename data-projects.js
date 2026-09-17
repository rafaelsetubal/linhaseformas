/**
 * LINHAS & FORMAS — BASE DE DADOS CENTRAL DE PROJETOS
 * Fonte única da verdade para o portfólio de marcenaria sob medida
 */

const PROJECTS_DATA = [
  {
    id: "01",
    slug: "cozinha-gourmet-integrada",
    url: "projetos.html",
    title: "Cozinha Gourmet Integrada",
    shortTitle: "01 · Cozinha Gourmet",
    category: "cozinha",
    categoryLabel: "Cozinhas",
    subtitle: "Residencial · Itabuna — BA ↗",
    location: "Itabuna — BA",
    year: "2026",
    area: "32 m²",
    aspect: "standard",
    coverImage: "assets/images/cozinhas.png",
    description: "Marcenaria sofisticada com integração entre ilha gourmet e área social. Lâmina natural de nogueira, portas sem puxadores usinadas em cava 45º, iluminação linear oculta em perfil LED e ferragens com amortecimento de fechamento suave.",
    highlights: [
      "Ilha com pedra Calacatta e marcenaria em lâmina natural",
      "Amortecedores e dobradiças ocultas de alta durabilidade",
      "Iluminação indireta quente de 2700K embutida",
      "Despensa embutida com portas coplanares ocultas"
    ],
    gallery: [
      { src: "assets/images/cozinhas.png", title: "Vista Geral da Ilha Gourmet", caption: "01 · Integração fluida entre marcenaria e bancada" },
      { src: "assets/images/materialidade.png", title: "Detalhe de Usinagem & Acabamento", caption: "02 · Precisão milimétrica nas junções" },
      { src: "assets/images/unsplash/case-story-det1.jpg", title: "Gavetões Internos com Amortecimento", caption: "03 · Organização interna sob medida" },
      { src: "assets/images/unsplash/case-hero.jpg", title: "Perspectiva Frontal com Nichos Iluminados", caption: "04 · Iluminação cenográfica integrada" }
    ]
  },
  {
    id: "02",
    slug: "suite-master-closet-integrado",
    url: "projetos.html",
    title: "Suíte Master & Closet Integrado",
    shortTitle: "02 · Suíte Master",
    category: "quarto",
    categoryLabel: "Dormitórios",
    subtitle: "Residencial · Conforto & Luz ↗",
    location: "Itabuna — BA",
    year: "2026",
    area: "28 m²",
    aspect: "tall",
    coverImage: "assets/images/quartos.png",
    description: "Ambiente íntimo concebido para o descanso pleno. Painel ripado em freijó com transição suave para cabeceira acolchoada em linho cru, mesas de cabeceira flutuantes e roupeiro com portas de vidro reflecta e iluminação vertical interna.",
    highlights: [
      "Painel ripado sob medida em lâmina natural de freijó",
      "Cabeceira estofada modulada com tomada e interruptor embutidos",
      "Mesas de cabeceira em balanço com gavetas invisíveis",
      "Closet com portas de vidro bronze e perfis de alumínio preto fosco"
    ],
    gallery: [
      { src: "assets/images/quartos.png", title: "Painel Ripado & Cabeceira Estofada", caption: "01 · Acolhimento e precisão de marcenaria" },
      { src: "assets/images/unsplash/showcase-closet.jpg", title: "Closet Integrado com Iluminação Interna", caption: "02 · Portas de vidro reflecta bronze" },
      { src: "assets/images/unsplash/case-story-det2.jpg", title: "Gavetas Ocultas e Detalhe de Cabeceira", caption: "03 · Ferragens de toque suave" }
    ]
  },
  {
    id: "03",
    slug: "living-home-theater-contemporaneo",
    url: "projetos.html",
    title: "Living & Home Theater Contemporâneo",
    shortTitle: "03 · Living Contemporâneo",
    category: "sala",
    categoryLabel: "Salas",
    subtitle: "Painéis & Integração Fluida ↗",
    location: "Ilhéus — BA",
    year: "2026",
    area: "45 m²",
    aspect: "wide",
    coverImage: "assets/images/salas.png",
    description: "Composição visual imersiva para a sala de estar. Grande painel com revestimento microtexturizado e ripado escuro, rack suspenso com passagem inteligente de cabeamento acústico e nicho com iluminação focal para obras de arte.",
    highlights: [
      "Painel monolítico de 6 metros sem emendas visíveis",
      "Rack flutuante com gavetas chanfradas em 45 graus",
      "Ocultação total de cabeamento e equipamentos de áudio/vídeo",
      "Nicho com retroiluminação LED quente difusa"
    ],
    gallery: [
      { src: "assets/images/salas.png", title: "Living e Painel Principal", caption: "01 · Proporção e harmonia de tons quentes" },
      { src: "assets/images/unsplash/showcase-sala.jpg", title: "Aparador e Painel de Integração", caption: "02 · Continuidade visual em todo o ambiente" },
      { src: "assets/images/materialidade.png", title: "Encaixes e Textura Amadeirada", caption: "03 · Detalhe de precisão artesanal" }
    ]
  },
  {
    id: "04",
    slug: "closet-walk-in-iluminado",
    url: "projetos.html",
    title: "Closet Walk-in Iluminado",
    shortTitle: "04 · Closet Inteligente",
    category: "closet",
    categoryLabel: "Closets",
    subtitle: "Organização Sob Medida ↗",
    location: "Itabuna — BA",
    year: "2026",
    area: "18 m²",
    aspect: "standard",
    coverImage: "assets/images/unsplash/showcase-closet.jpg",
    description: "Projeto de closet walk-in milimetricamente planejado para a rotina diária. Cabideiros com sensores de presença, gaveteiros com visores em vidro e veludo para joias e acessórios, e sapateira iluminada com prateleiras deslizantes.",
    highlights: [
      "Sensores de abertura inteligentes acionando LEDs automáticos",
      "Divisores internos em veludo para joias e relógios",
      "Sapateira deslizante com extração total",
      "Penteadeira camarim com espelho iluminado"
    ],
    gallery: [
      { src: "assets/images/unsplash/showcase-closet.jpg", title: "Visão Geral do Closet", caption: "01 · Setorização inteligente por tipos de peças" }
    ]
  },
  {
    id: "05",
    slug: "gabinete-executivo-home-office",
    url: "projetos.html",
    title: "Gabinete Executivo & Home Office",
    shortTitle: "05 · Espaço Corporativo",
    category: "escritorio",
    categoryLabel: "Escritórios",
    subtitle: "Corporativo · Itabuna — BA ↗",
    location: "Itabuna — BA",
    year: "2026",
    area: "22 m²",
    aspect: "standard",
    coverImage: "assets/images/escritorios.png",
    description: "Espaço de trabalho concebido para foco, conforto e ergonomia executiva. Ampla bancada em balanço com caixa de conectividade invisível, estante com iluminação cenográfica e armários de apoio com fechadura digital.",
    highlights: [
      "Bancada estrutural em balanço com reforço metálico oculto",
      "Estante modular com nichos iluminados em LED",
      "Caixa de tomadas e conectividade embutida no tampo",
      "Acabamento fosco antidedadas com toque acetinado"
    ],
    gallery: [
      { src: "assets/images/escritorios.png", title: "Bancada e Estante Integrada", caption: "01 · Funcionalidade e elegância para o trabalho" }
    ]
  },
  {
    id: "06",
    slug: "cozinha-minimalista-louceiro",
    url: "projetos.html",
    title: "Cozinha Minimalista & Louceiro Oculto",
    shortTitle: "06 · Cozinha Minimalista",
    category: "cozinha",
    categoryLabel: "Cozinhas",
    subtitle: "Residencial · Salvador — BA ↗",
    location: "Salvador — BA",
    year: "2025",
    area: "38 m²",
    aspect: "wide",
    coverImage: "assets/images/unsplash/case-hero.jpg",
    description: "Linhas puras e marcenaria de alta densidade com portas do piso ao teto camuflando louceiro e despensa. Torre quente embutida e bancada com detalhes de cantos curvos usinados.",
    highlights: [
      "Portas do piso ao teto camuflando louceiro e despensa",
      "Puxadores embutidos tipo cava usinados em 45º",
      "Gavetas ocultas com corrediças invisíveis de extração total"
    ],
    gallery: [
      { src: "assets/images/unsplash/case-hero.jpg", title: "Cozinha Minimalista", caption: "01 · Pureza formal e materiais nobres" }
    ]
  },
  {
    id: "07",
    slug: "sala-jantar-aparador-flutuante",
    url: "projetos.html",
    title: "Sala de Jantar & Aparador Flutuante",
    shortTitle: "07 · Sala de Jantar",
    category: "sala",
    categoryLabel: "Salas",
    subtitle: "Madeira Nobre & Mármore ↗",
    location: "Itabuna — BA",
    year: "2026",
    area: "26 m²",
    aspect: "standard",
    coverImage: "assets/images/unsplash/showcase-sala.jpg",
    description: "Espaço de celebração com painel ripado que integra a porta pivotante de acesso à cozinha. Aparador suspenso com tampo em mármore e gavetas com fecho-toque magnético.",
    highlights: [
      "Porta pivotante invisível integrada ao painel de madeira",
      "Aparador flutuante com sistema de sustentação oculta",
      "Iluminação focal para valorização de texturas"
    ],
    gallery: [
      { src: "assets/images/unsplash/showcase-sala.jpg", title: "Sala de Jantar e Aparador", caption: "01 · Sofisticação em cada detalhe" }
    ]
  },
  {
    id: "08",
    slug: "suite-hospedes-bancada-multiuso",
    url: "projetos.html",
    title: "Suíte de Hóspedes & Multiuso",
    shortTitle: "08 · Suíte de Hóspedes",
    category: "quarto",
    categoryLabel: "Dormitórios",
    subtitle: "Aproveitamento Inteligente ↗",
    location: "Ilhéus — BA",
    year: "2026",
    area: "16 m²",
    aspect: "tall",
    coverImage: "assets/images/unsplash/showcase-quarto.jpg",
    description: "Solução inteligente de marcenaria para aproveitamento máximo de espaço. Roupeiro embutido com espelho reflecta integrado e bancada multifuncional de estudo/trabalho.",
    highlights: [
      "Aproveitamento inteligente de cada centímetro disponível",
      "Portas de correr com amortecimento e espelhos reflecta",
      "Bancada multifuncional com gaveteiro volante"
    ],
    gallery: [
      { src: "assets/images/unsplash/showcase-quarto.jpg", title: "Suíte com Bancada Multiuso", caption: "01 · Conforto e funcionalidade compacta" }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS_DATA };
}
