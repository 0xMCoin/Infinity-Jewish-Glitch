# 🐀 PHONK RAT - Memecoin Website

## 🏗️ **Estrutura de Componentes Refatorada**

O site foi completamente componentizado para melhor organização e manutenibilidade.

### 📁 **Estrutura de Pastas:**

```
src/
├── app/
│   ├── page.tsx          # Página principal (agora limpa e organizada)
│   ├── layout.tsx        # Layout raiz
│   └── globals.css       # Estilos globais
├── components/
│   ├── sections/         # Componentes de seções principais
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── gallery-section.tsx
│   │   └── index.ts
│   ├── layout/           # Componentes de layout
│   │   ├── header.tsx
│   │   └── index.ts
│   └── ui/               # Componentes de interface reutilizáveis
│       ├── video-player.tsx
│       ├── audio-modal.tsx
│       ├── call-to-action.tsx
│       ├── gallery-showcase.tsx
│       ├── theme-toggle.tsx
│       ├── floating-dock.tsx
│       ├── background-lines.tsx
│       ├── 3d-card.tsx
│       ├── lens.tsx
│       └── timeline.tsx
└── data/
    └── gallery-data.ts   # Dados da galeria
```

### 🎯 **Componentes Principais:**

#### **1. HeroSection** (`src/components/sections/hero-section.tsx`)
- Seção principal com vídeos e card de compra
- Inclui componente `BuyCard` para funcionalidade de compra
- Vídeos laterais com controles de reprodução

#### **2. AboutSection** (`src/components/sections/about-section.tsx`)
- Seção "Sobre o Projeto" com recursos interativos
- Card 3D com efeito de lente
- Lista de recursos com animações

#### **3. GallerySection** (`src/components/sections/gallery-section.tsx`)
- Galeria de vídeos com showcase interativo
- Títulos com efeito `text-arcade-shadow`

#### **4. Header** (`src/components/layout/header.tsx`)
- Cabeçalho com navegação e menu mobile
- Header de rolagem com mensagens animadas
- Toggle de tema e links sociais

#### **5. VideoPlayer** (`src/components/ui/video-player.tsx`)
- Componente reutilizável para reprodução de vídeo
- Controles de play/pause e volume
- Labels personalizáveis

#### **6. AudioModal** (`src/components/ui/audio-modal.tsx`)
- Modal para ativação de áudio
- Controle de vídeos ocultos para sincronização

### 🎨 **Características de Design:**

- **Paleta de Cores:** Esquema emerald/green consistente
- **Tipografia:** `Press Start 2P` para títulos, `Inter` para texto
- **Efeitos:** `text-arcade-shadow` em todos os títulos principais
- **Animações:** Framer Motion para transições suaves
- **Responsividade:** Design mobile-first com Tailwind CSS

### 🚀 **Benefícios da Refatoração:**

1. **Código Limpo:** Página principal reduzida de 856 para ~60 linhas
2. **Reutilização:** Componentes podem ser reutilizados em outras páginas
3. **Manutenibilidade:** Cada seção tem sua própria responsabilidade
4. **Testabilidade:** Componentes isolados são mais fáceis de testar
5. **Performance:** Lazy loading e code splitting mais eficientes
6. **Organização:** Estrutura clara e fácil de navegar

### 📱 **Funcionalidades:**

- ✅ Reprodução de vídeo com controles
- ✅ Modal de áudio interativo
- ✅ Toggle de tema claro/escuro
- ✅ Menu mobile responsivo
- ✅ Animações de scroll
- ✅ Efeitos 3D e interativos
- ✅ Galeria de vídeos com carrossel
- ✅ Sistema de compra simulado

### 🔧 **Como Usar:**

```tsx
// Importar seções
import { HeroSection, AboutSection, GallerySection } from "@/components/sections";

// Importar layout
import { Header } from "@/components/layout";

// Usar na página
<Header />
<HeroSection totalRaised={100000} goal={1000000} />
<AboutSection />
<GallerySection />
```

### 🎯 **Próximos Passos Sugeridos:**

1. **Testes:** Adicionar testes unitários para cada componente
2. **Storybook:** Implementar documentação interativa
3. **Performance:** Otimizar carregamento de vídeos
4. **SEO:** Melhorar meta tags e estrutura semântica
5. **Acessibilidade:** Adicionar ARIA labels e navegação por teclado

---

**Status:** ✅ **Refatoração Completa** - Código organizado e componentizado!
