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
- **WhatsApp Business** (`wa.me`) com link rastreável para atribuição de origem de leads

---

## 📁 Estrutura do projeto

```
├── index.html              # Estrutura de todas as seções da página
├── styles.css               # Estilos, layout responsivo e animações
├── google-reviews.css        # Estilos específicos do bloco de avaliações
├── script.js                # Interações: menu, carrosséis, FAQ, contadores, WhatsApp
├── tracking.js              # UTMs, eventos do WhatsApp e integração opcional com GA4
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

Use um único site com os links abaixo em cada canal. Os parâmetros UTM identificam a origem da visita e acompanham o evento `whatsapp_click` em todos os botões de contato.

| Origem | Link a utilizar |
|---|---|
| Bio do Instagram | `https://annawaleskanutri.com.br/?utm_source=instagram&utm_medium=organic_social&utm_campaign=lp_nutri_anna&utm_content=bio` |
| Perfil do Google | `https://annawaleskanutri.com.br/?utm_source=google&utm_medium=organic&utm_campaign=lp_nutri_anna&utm_content=business_profile` |
| Anúncios do Instagram | `https://annawaleskanutri.com.br/?utm_source=instagram&utm_medium=paid_social&utm_campaign=lp_nutri_anna&utm_content=ad` |
| Anúncios do Google | `https://annawaleskanutri.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=lp_nutri_anna&utm_content=ad` |

O Google Analytics 4 está configurado com o ID `G-J1XX8JWWVC`. O Meta Pixel está configurado com o conjunto de dados `1570300633537408`, registrando `PageView` nas visitas e `Contact` nos cliques do WhatsApp.

O token da API de Conversões da Meta não deve ser incluído neste projeto estático ou no repositório público. Uma futura integração de servidor deve armazená-lo exclusivamente como segredo de ambiente.

---

## 👤 Autor

Desenvolvido por **[Felipe Gabriel](https://github.com/felipegaabrieldev)**.

---

## 📄 Licença

Este repositório documenta um projeto de cliente real. O código-fonte pode ser usado como referência de portfólio; imagens, marca, textos e identidade visual pertencem a **Anna Waleska Nutricionista / VALLENCI Saúde Integrada** e não devem ser reutilizados sem autorização.
