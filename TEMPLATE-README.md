# Roopam Jewellery - Modular Page Template System

This modular template system ensures consistent design and functionality across all pages of the Roopam Jewellery website.

## 🎯 Features

- **Consistent Design**: All pages automatically inherit the home page's color scheme and styling
- **Responsive Layout**: Mobile-first design with consistent breakpoints
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Firebase Integration**: Built-in support for Firebase services
- **Accessibility**: WCAG compliant navigation and content structure
- **Performance**: Optimized loading and caching strategies

## 📁 File Structure

```
assets/
├── css/
│   ├── style.css              # Main stylesheet (from home page)
│   └── page-templates.css     # Modular template styles
├── js/
│   ├── page-template.js       # Template system JavaScript
│   ├── main.js               # Site-wide functionality
│   └── firebase-*.js         # Firebase integration
```

## 🚀 Quick Start

### Using the Page Generator

Generate a new page with the command-line tool:

```bash
# Basic page
node generate-page.js about-us --title "About Us" --hero-title "About Roopam Jewellery"

# Advanced options
node generate-page.js gallery \
  --title "Photo Gallery - Roopam Jewellery" \
  --description "Browse our stunning collection" \
  --hero-title "Our Gallery" \
  --hero-subtitle "Discover our beautiful creations" \
  --active-page "gallery"

# Page without hero section
node generate-page.js contact --no-hero --title "Contact Us"
```

### Manual Page Creation

1. **Include Required CSS:**
```html
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/page-templates.css">
```

2. **Use Template Components:**
```html
<!-- Page Hero -->
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb">...</nav>
    <div class="hero-content">
      <h1>Page Title</h1>
      <p>Page description</p>
    </div>
  </div>
</section>

<!-- Content Section -->
<section class="content-section">
  <div class="container">
    <div class="page-content">
      <div class="page-content-body">
        <!-- Your content here -->
      </div>
    </div>
  </div>
</section>
```

3. **Include Required Scripts:**
```html
<script src="assets/js/firebase-config.js"></script>
<script src="assets/js/config-manager.js"></script>
<script src="assets/js/content-injector.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/page-template.js"></script>
```

## 🎨 Design System

### Color Palette
- `--primary-blue`: Main brand color
- `--light-blue`: Secondary brand color  
- `--off-white`: Background color
- `--gray-*`: Various gray shades for text and borders

### Typography
- `--font-primary`: Playfair Display (headings)
- `--font-secondary`: PT Sans (body text)

### Components

#### Page Hero
```html
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb">
      <a href="index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <span class="current">Current Page</span>
    </nav>
    <div class="hero-content">
      <h1>Page Title</h1>
      <p>Page description</p>
    </div>
  </div>
</section>
```

#### Content Container
```html
<div class="page-content">
  <div class="page-content-header">
    <!-- Optional header content -->
  </div>
  <div class="page-content-body">
    <!-- Main content -->
  </div>
  <div class="page-content-footer">
    <!-- Optional footer content -->
  </div>
</div>
```

#### Loading States
```html
<div class="page-loading">
  <div class="page-loading-spinner"></div>
  <p>Loading...</p>
</div>

<div class="page-error">
  <i class="fas fa-exclamation-circle page-error-icon"></i>
  <h3>Error Title</h3>
  <p>Error message</p>
</div>
```

## 🔧 Customization

### Page-Specific Styles
Add custom styles for individual pages:

```html
<style>
/* Page-specific styles */
.custom-section {
  background: var(--primary-blue);
  color: var(--white);
  padding: 2rem;
}

.special-button {
  background: var(--light-blue);
  border-radius: 8px;
  transition: var(--transition-normal);
}
</style>
```

### Navigation Active States
Set the active navigation item:

```javascript
// In your page's JavaScript
const navigation = document.querySelector('.navbar');
// The PageTemplate.js will handle active states automatically
```

## 📱 Responsive Design

The template system includes responsive breakpoints:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: 320px - 767px

All components automatically adapt to these breakpoints.

## 🔗 Integration

### Firebase
All pages automatically include Firebase integration:
- Firestore for data storage
- Authentication (if needed)
- Storage for media files

### SEO
Pages include:
- Proper meta tags
- Structured data
- Semantic HTML
- Open Graph tags

## 📄 Examples

### Existing Pages Using This System

1. **Terms & Conditions** (`terms-and-conditions.html`)
   - Tabbed interface
   - Firebase content loading
   - Rich-text processing

2. **Privacy Policy** (`privacy-policy.html`)
   - Static content
   - Structured sections
   - Legal formatting

## 🛠 Development

### Adding New Components

1. Add styles to `assets/css/page-templates.css`
2. Add JavaScript functionality to `assets/js/page-template.js`
3. Update the page generator if needed

### Best Practices

- Use CSS custom properties for consistency
- Follow BEM naming convention for new classes
- Ensure mobile-first responsive design
- Test with Firebase integration
- Validate HTML and accessibility

## 🎯 Benefits

✅ **Consistency**: All pages share the same design language  
✅ **Maintainability**: Single source of truth for common elements  
✅ **Scalability**: Easy to add new pages and features  
✅ **Performance**: Shared CSS and JavaScript resources  
✅ **SEO**: Consistent meta tags and structure  
✅ **Accessibility**: WCAG compliant components  

## 📞 Support

For questions about the template system:
- Check existing implementations (Terms & Privacy pages)
- Review the PageTemplate JavaScript class
- Test with the page generator tool

---

*This modular system ensures that all Roopam Jewellery pages maintain visual consistency while allowing for page-specific customizations.*
