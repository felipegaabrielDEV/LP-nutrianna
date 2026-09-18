# 🌿 Anna Waleska — Landing Page | Nutrição sem Extremismos

Landing page institucional e comercial desenvolvida para **Anna Waleska**, nutricionista especialista em emagrecimento e fundadora da **VALLENCI Saúde Integrada**. O projeto foi construído do zero como uma página única (*one-page*), focada em apresentar o método de trabalho, gerar autoridade profissional e converter visitantes em contatos qualificados via WhatsApp.

**🔗 Acesse o site publicado:** [felipegaabrieldev.github.io/LP-nutrianna] (https://annawaleskanutri.com.br/)

![Preview da landing page](assets/anna-hero-2026.webp)

---

## 📋 Sobre o projeto

O objetivo central da página é comunicar uma proposta de emagrecimento **sem restrições ou radicalismos**, guiando o visitante por uma jornada que combina storytelling, prova social e chamadas para ação estrategicamente posicionadas — do primeiro scroll até o contato direto pelo WhatsApp.

A página foi pensada e construída com foco em:

- **Conversão** — múltiplos CTAs para WhatsApp com link rastreável, permitindo mensurar a origem de cada lead;
- **Confiança** — depoimentos reais integrados via widget do Google Reviews, resultados de pacientes e credenciais profissionais;
- **Experiência** — microinterações, transições suaves e uma hierarquia visual que guia o olhar do visitante sem poluir a leitura;
- **Acessibilidade e performance** — respeito a `prefers-reduced-motion`, estados de foco visíveis para navegação por teclado, imagens otimizadas em WebP e carregamento sem *layout shift*.

---

## ✨ Funcionalidades

| Seção | Destaques |
|---|---|
| **Hero** | Título editorial, estatísticas com contagem animada, cartão de credenciais e imagem com efeito de respiração sutil |
| **Faixa de benefícios** | Ícones ilustrados com microinteração no hover (apenas em dispositivos com mouse) |
| **Método** | Carrossel de fotos automático com paginação e citação em destaque |
| **Resultados** | Carrossel *antes/depois* com navegação por setas, teclado, toque (*swipe*) e *lightbox* para ampliar as imagens |
| **Para quem é a jornada** | Cards com elevação e mudança de cor no hover |
| **Jornada de atendimento** | Grade de 6 etapas com zoom sutil nas fotos ao passar o mouse |
| **Quem é a Nutri** | Storytelling pessoal + cards de autoridade (anos de atuação, especializações) |
| **Espaço da clínica** | Carrossel alternando entre foto do ambiente e **mapa interativo do Google Maps**, com pausa inteligente ao interagir (mouse ou toque) para não atrapalhar o uso do mapa |
| **Avaliações do Google** | Integração via widget [Elfsight](https://elfsight.com/) |
| **Perguntas frequentes** | Acordeão com abertura suave (animação de altura via `grid-template-rows`) |
| **Rodapé** | Contato, localização e horários com links diretos (WhatsApp, Instagram, Google Maps) |

**Menu mobile:** overlay de tela cheia com fundo escurecido, fecha com toque fora, tecla `Esc` ou reabrindo o botão — com trava de rolagem do fundo enquanto está aberto.

---

## 🛠️ Tecnologias

Projeto **100% estático**, sem frameworks, bundlers ou dependências de build — publicado diretamente via **GitHub Pages**.

- **HTML5** semântico
- **CSS3** puro (custom properties, Grid, Flexbox, animações e transições nativas)
- **JavaScript** vanilla (ES6+), sem bibliotecas externas
- **[Elfsight](https://elfsight.com/)** — widget de avaliações do Google
- **Google Maps Embed API** — localização interativa
- **[Tintim](https://tintim.link/)** — links de WhatsApp rastreáveis, com destino trocado por origem (UTM)

---

## 📁 Estrutura do projeto

```
├── index.html              # Estrutura de todas as seções da página
├── styles.css               # Estilos, layout responsivo e animações
├── google-reviews.css        # Estilos específicos do bloco de avaliações
├── script.js                # Interações: menu, carrosséis, FAQ, contadores, WhatsApp
├── tracking.js              # GA4, Meta Pixel, conversão do Google Ads e captura/uso das UTMs
└── assets/                  # Imagens, ícones e fotografias (WebP otimizado)
```

---

## 📱 Responsividade

Layout desenvolvido com abordagem **mobile-first** e testado nas principais larguras de tela:

`320px` · `375px` · `390px` · `430px` · `768px` (tablet) · `1024px+` (desktop)

Sem rolagem horizontal, sobreposição de elementos ou conteúdo cortado em nenhuma faixa testada.

---

## ♿ Acessibilidade e performance

- Navegação por teclado com estados de foco visíveis (`:focus-visible`)
- Todas as animações respeitam `prefers-reduced-motion`
- Imagens com `loading="lazy"` e formato WebP otimizado
- Textos alternativos descritivos em todas as imagens de conteúdo
- Áreas de toque adequadas para uso confortável em dispositivos móveis

---

## 🚀 Como rodar localmente

Por ser um projeto estático, não há necessidade de instalação de dependências:

```bash
git clone https://github.com/felipegaabrieldev/LP-nutrianna.git
cd avalia-o
```

Depois, basta abrir o `index.html` no navegador ou servir a pasta com uma extensão como **Live Server** (VS Code) para visualizar com recarregamento automático durante o desenvolvimento.

---

## 🌐 Deploy

O projeto é publicado automaticamente via **GitHub Pages**, a partir da branch principal do repositório.

### Rastreamento das origens

Existe **um único site**. Os parâmetros UTM na URL de entrada identificam a origem da visita e, com base nisso, o site **troca automaticamente o link de destino** de todos os botões de WhatsApp para o link **[Tintim](https://tintim.link/)** correspondente ao canal. O visual, o texto e a posição dos botões não mudam — muda apenas o `href`.

**Fluxo:** entra com UTM → o site identifica a origem → guarda em `sessionStorage` (não se perde ao navegar pela página) → aplica o link Tintim do canal em todos os botões → o clique dispara a conversão do Google Ads → a Tintim registra o acesso → abre o WhatsApp.

#### Links de entrada por canal

Use um destes links em cada canal:

| Origem | Link a utilizar |
|---|---|
| Bio do Instagram | `https://annawaleskanutri.com.br/?utm_source=instagram&utm_medium=organic&utm_campaign=bio` |
| Anúncios do Instagram/Meta | `https://annawaleskanutri.com.br/?utm_source=meta&utm_medium=paid_social&utm_campaign=emagrecimento` |
| Anúncios do Google | `https://annawaleskanutri.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=emagrecimento` |
| Perfil do Google | `https://annawaleskanutri.com.br/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile` |

#### Reconhecimento flexível

Para tolerar variações de marcação usadas nos anúncios, a identificação da origem aceita mais de uma combinação de `utm_source` / `utm_medium`:

| Origem | Regra (source / medium) | Link Tintim de destino |
|---|---|---|
| Anúncio pago (Meta/Instagram) | `paid_social` + (`meta` ou `instagram`) | `.../e1b1ae47-2e17-4d43-bfeb-caa40514d977` |
| Anúncio do Google | `google` + `cpc` | `.../c966b600-39a9-449f-b415-f5b72ebe84c8` |
| Bio do Instagram | `instagram` + (`organic` ou `organic_social`) | `.../a004cde9-7e33-488c-9e11-f527de87c225` |
| Perfil do Google | `google` + `organic` | `.../eb5c2031-7893-491a-870c-a4b4841df48f` |

Todos os links compartilham o prefixo `https://tintim.link/whatsapp/dd13be2e-477f-4631-a830-a0a6e9837a21/`. **Sem UTM reconhecida** (acesso direto ou canal não mapeado), os botões mantêm o link padrão (Bio do Instagram), garantindo que nenhum botão deixe de funcionar.

#### Ferramentas de análise

| Ferramenta | ID | Função |
|---|---|---|
| Google Analytics 4 | `G-J1XX8JWWVC` | `PageView` nas visitas e evento `whatsapp_click` nos cliques |
| Meta Pixel | `1570300633537408` | `PageView` nas visitas e `Contact` nos cliques do WhatsApp |
| Google Ads | `AW-16866637598` (rótulo `.../QGNzCPyywrAaEJ7u0eo-`) | Conversão disparada no clique do botão de WhatsApp |
| Tintim | link por canal (acima) | Atribuição da origem do lead |

Os IDs de GA4, Meta Pixel e Google Ads ficam em tags `<meta>` no `<head>` do `index.html`, o que permite atualizá-los sem mexer no JavaScript. Toda a lógica de tracking está em `tracking.js` (carregamento das tags e disparo dos eventos/conversão) e em `script.js` (leitura das UTMs e troca do link dos botões).

O token da API de Conversões da Meta não deve ser incluído neste projeto estático ou no repositório público. Uma futura integração de servidor deve armazená-lo exclusivamente como segredo de ambiente.

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

---

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código-fonte pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem a **Anna Waleska Nutricionista / VALLENCI Saúde Integrada** e não devem ser reutilizados sem autorização.
