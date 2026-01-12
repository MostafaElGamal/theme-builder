# 🎨 Theme Builder

A powerful visual theme builder that separates configuration (React) from rendering (Astro), allowing you to create and customize page layouts without writing code.

## ✨ Features

- 🎯 **Visual Theme Builder** - Drag-and-drop like interface for building themes
- 🎨 **Multiple Component Variants** - Each component type has different design options
- 🔄 **Dynamic Rendering** - Components load based on configuration
- 🔀 **Flexible Ordering** - Reorder components to create different layouts
- 👁️ **Toggle Visibility** - Show/hide components without deleting
- 💾 **Persistent Storage** - Changes saved to JSON configuration
- 📱 **Responsive Design** - All components are mobile-friendly
- 🚀 **Type Safe** - Full TypeScript support

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# Visit in browser
# Home page: http://localhost:4321/
# Theme builder: http://localhost:4321/theme-builder
```

### Building for Production

```bash
npm run build
npm run preview
```

## 📖 Documentation

- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - Complete overview of what's been built
- **[USAGE.md](USAGE.md)** - Quick start guide and usage instructions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed system architecture
- **[SYSTEM-FLOW.md](SYSTEM-FLOW.md)** - Visual flow diagrams and data flow
- **[LOCALSTORAGE.md](LOCALSTORAGE.md)** - How localStorage is used for theme persistence

## 🎯 How It Works

### 1. Configure Your Theme
Visit `/theme-builder` to:
- Add components (banners, categories, products)
- Choose component variants
- Reorder components with ↑ ↓ arrows
- Toggle component visibility
- **Save to browser localStorage** (click "Save Theme")
- **Reset to default** (click "Reset to Default")

### 2. View Your Theme
Visit `/` to see your theme with:
- Components in the order you specified
- Only enabled components showing
- The variants you selected
- **Refresh after saving** to see changes

> 💾 **Storage**: Theme configurations are saved in your browser's localStorage. This means they persist across sessions but are specific to each browser.

## 📦 What's Included

### Component Variants

**Banners** (3 variants)
- `banner-1` - Hero with gradient background
- `banner-2` - Minimal centered design
- `banner-3` - Split screen layout

**Categories** (2 variants)
- `category-1` - Grid layout with cards
- `category-2` - Horizontal scrolling

**Products** (3 variants)
- `product-1` - Grid with cards
- `product-2` - Carousel style
- `product-3` - List with large images

## 🔧 Adding New Components

### Quick Method (Using Helper Script)

```bash
./scripts/add-component.sh banner banner-4
```

### Manual Method

1. **Create component file**:
```astro
// src/components/home/banners/banner-4.astro
---
---
<section class="banner-4 py-20">
  <h1>My Custom Banner</h1>
</section>
```

2. **Update configuration**:
```json
// src/data/theme-config.json
{
  "availableComponents": {
    "banner": ["banner-1", "banner-2", "banner-3", "banner-4"]
  }
}
```

3. **Import in renderer**:
```astro
// src/components/DynamicPageRenderer.astro
import Banner4 from "@/components/home/banners/banner-4.astro";

const componentMap = {
  "banner-4": Banner4,
  // ...
};
```

## 🏗️ Project Structure

```
src/
├── components/       # Astro component variants
│   ├── home/
│   │   ├── banners/
│   │   ├── categories/
│   │   └── products/
│   └── DynamicPageRenderer.astro
├── data/            # Theme configuration
│   └── theme-config.json
├── pages/           # Application pages
│   ├── index.astro
│   ├── theme-builder.astro
│   └── api/
│       └── save-theme.ts
├── react/           # React components
│   └── ThemeBuilder.tsx
├── types/           # TypeScript definitions
│   └── theme.ts
└── utils/           # Utility functions
    └── theme.ts
```

## 🎨 Example Use Cases

### E-commerce Store
Build different layouts for:
- Homepage (banner → categories → featured products)
- Sale page (sale banner → discounted products → categories)
- New arrivals (minimal banner → new products)

### Marketing Website
Create pages with:
- Hero banners
- Feature sections
- Testimonials
- Product showcases

### Portfolio Site
Design with:
- Project galleries
- About sections
- Contact forms

## 🛠️ Tech Stack

- **Astro** - Static site generator
- **React/Preact** - Interactive UI components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## 📝 Configuration Example

```json
{
  "themeName": "My Theme",
  "pages": {
    "home": {
      "components": [
        {
          "id": "banner-1",
          "type": "banner",
          "variant": "banner-2",
          "order": 1,
          "enabled": true
        },
        {
          "id": "products-1",
          "type": "products",
          "variant": "product-1",
          "order": 2,
          "enabled": true
        }
      ]
    }
  }
}
```

## 🎯 Roadmap

- [ ] Add more component types (testimonials, features, etc.)
- [ ] Implement component props for dynamic content
- [ ] Add preview mode in theme builder
- [ ] Support for multi-page configurations
- [ ] Export/import theme configurations
- [ ] CMS integration
- [ ] Real-time preview

## 🤝 Contributing

Feel free to add new component variants or types! Follow the patterns in existing components.

## 📄 License

MIT

---

**Built with ❤️ using Astro + React + TypeScript**

For detailed documentation, see [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)
