#!/usr/bin/env node

/**
 * Roopam Jewellery - Page Generator
 * Generates new pages using the modular template system
 * 
 * Usage: node generate-page.js <page-name> [options]
 * Example: node generate-page.js about-us --title "About Us" --description "Learn about our story"
 */

const fs = require('fs');
const path = require('path');

class PageGenerator {
    constructor() {
        this.baseDir = __dirname;
        this.templateDir = path.join(this.baseDir, 'templates');
        
        // Ensure templates directory exists
        if (!fs.existsSync(this.templateDir)) {
            fs.mkdirSync(this.templateDir, { recursive: true });
        }
        
        this.defaultConfig = {
            title: 'New Page - Roopam Jewellery',
            description: 'A new page for Roopam Jewellery website',
            keywords: 'roopam jewellery, jewelry, custom ornaments',
            activePage: '',
            includeHero: true,
            heroTitle: 'Page Title',
            heroSubtitle: 'Page description goes here',
            showBreadcrumb: true
        };
    }

    /**
     * Generate a new page
     */
    generatePage(pageName, options = {}) {
        const config = { ...this.defaultConfig, ...options };
        
        // Sanitize page name
        const fileName = pageName.toLowerCase().replace(/[^a-z0-9-]/g, '-') + '.html';
        const filePath = path.join(this.baseDir, fileName);
        
        // Check if file already exists
        if (fs.existsSync(filePath)) {
            console.error(`Error: File ${fileName} already exists!`);
            return false;
        }

        // Generate breadcrumbs
        const breadcrumbs = [
            { label: 'Home', href: 'index.html' },
            { label: config.heroTitle, href: '#' }
        ];

        // Create page configuration
        const pageConfig = {
            head: {
                title: config.title,
                description: config.description,
                keywords: config.keywords
            },
            activePage: config.activePage,
            hero: config.includeHero ? {
                title: config.heroTitle,
                subtitle: config.heroSubtitle,
                showBreadcrumb: config.showBreadcrumb,
                breadcrumbs: breadcrumbs
            } : null,
            content: this.generateDefaultContent(config),
            pageSpecificStyles: this.generatePageStyles()
        };

        // Generate the HTML
        const html = this.buildPageHTML(pageConfig);
        
        try {
            fs.writeFileSync(filePath, html);
            console.log(`✅ Successfully generated: ${fileName}`);
            console.log(`📝 File created at: ${filePath}`);
            return true;
        } catch (error) {
            console.error(`❌ Error writing file: ${error.message}`);
            return false;
        }
    }

    /**
     * Build complete HTML using template system
     */
    buildPageHTML(config) {
        const head = this.generateHead(config.head);
        const navigation = this.generateNavigation(config.activePage);
        const hero = config.hero ? this.generateHero(config.hero) : '';
        const footer = this.generateFooter();
        const scripts = this.generateScripts();
        const styles = config.pageSpecificStyles || '';

        return `<!DOCTYPE html>
<html lang="en">
<head>${head}${styles ? `\n    <style>\n${styles}\n    </style>` : ''}
</head>
<body>${navigation}
${hero}
${config.content}
${footer}
${scripts}
</body>
</html>`;
    }

    /**
     * Generate head section
     */
    generateHead(headConfig) {
        return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${headConfig.title}</title>
    <meta name="description" content="${headConfig.description}">
    <meta name="keywords" content="${headConfig.keywords}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#1a365d">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Roopam Jewellery">
    <link rel="apple-touch-icon" href="assets/images/icon-192.svg">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/page-templates.css">
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
    
    <!-- Firebase Environment Variables -->
    <script src="assets/js/firebase-env.js"></script>`;
    }

    /**
     * Generate navigation
     */
    generateNavigation(activePage = '') {
        const navItems = [
            { href: 'index.html#home', label: 'Home', id: 'home' },
            { href: 'index.html#products', label: 'Products', id: 'products' },
            { href: 'index.html#services', label: 'Services', id: 'services' },
            { href: 'index.html#about', label: 'About Us', id: 'about' },
            { href: 'index.html#faq', label: 'FAQ', id: 'faq' },
            { href: 'index.html#privacy', label: 'Privacy', id: 'privacy' },
            { href: 'terms-and-conditions.html', label: 'Terms', id: 'terms' },
            { href: 'index.html#contact', label: 'Contact', id: 'contact' }
        ];

        const navItemsHtml = navItems.map(item => {
            const activeClass = activePage === item.id ? ' active' : '';
            return `
                <li class="nav-item">
                    <a href="${item.href}" class="nav-link${activeClass}">${item.label}</a>
                </li>`;
        }).join('');

        return `
    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2>Loading...</h2>
            </div>
            <ul class="nav-menu" id="nav-menu">${navItemsHtml}
            </ul>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>`;
    }

    /**
     * Generate hero section
     */
    generateHero(heroConfig) {
        const breadcrumbHtml = heroConfig.showBreadcrumb ? `
            <nav class="breadcrumb">
                ${heroConfig.breadcrumbs.map((crumb, index) => {
                    const isLast = index === heroConfig.breadcrumbs.length - 1;
                    return `
                        ${index > 0 ? '<i class="fas fa-chevron-right"></i>' : ''}
                        ${isLast ? 
                            `<span class="current">${crumb.label}</span>` : 
                            `<a href="${crumb.href}">${crumb.label}</a>`
                        }`;
                }).join('')}
            </nav>` : '';

        return `
    <!-- Page Hero -->
    <section class="page-hero">
        <div class="container">
            ${breadcrumbHtml}
            <div class="hero-content">
                <h1>${heroConfig.title}</h1>
                <p>${heroConfig.subtitle}</p>
            </div>
        </div>
    </section>`;
    }

    /**
     * Generate default content section
     */
    generateDefaultContent(config) {
        return `
    <!-- Main Content -->
    <section class="content-section">
        <div class="container">
            <div class="page-content">
                <div class="page-content-body">
                    <h2>Welcome to ${config.heroTitle}</h2>
                    <p>This is a new page generated using the Roopam Jewellery template system. Replace this content with your actual page content.</p>
                    
                    <h3>Getting Started</h3>
                    <p>To customize this page:</p>
                    <ul>
                        <li>Edit the content in the <code>page-content-body</code> section</li>
                        <li>Add your own styles in the <code>&lt;style&gt;</code> section</li>
                        <li>Include any additional JavaScript at the bottom</li>
                        <li>Update the meta tags and title in the head section</li>
                    </ul>
                    
                    <div class="highlight">
                        <p><strong>Note:</strong> This page uses the modular template system to ensure consistency with the main Roopam Jewellery website design.</p>
                    </div>
                </div>
                
                <div class="page-content-footer">
                    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Template Version:</strong> 1.0</p>
                </div>
            </div>
        </div>
    </section>`;
    }

    /**
     * Generate default page styles
     */
    generatePageStyles() {
        return `        /* Page-specific styles */
        .highlight {
            background: var(--gray-50);
            padding: 1rem;
            border-left: 4px solid var(--light-blue);
            margin: 1.5rem 0;
            border-radius: 0 8px 8px 0;
        }
        
        .page-content-body h2 {
            color: var(--primary-blue);
            font-family: var(--font-primary);
            margin-bottom: 1rem;
        }
        
        .page-content-body h3 {
            color: var(--primary-blue);
            font-family: var(--font-primary);
            margin-top: 2rem;
            margin-bottom: 1rem;
        }`;
    }

    /**
     * Generate footer
     */
    generateFooter() {
        return `
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Roopam Jewellery</h3>
                    <p>Crafting memories that last a lifetime with exceptional quality and unparalleled service.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html#products">Products</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="index.html#about">About Us</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="index.html#services">Custom Design</a></li>
                        <li><a href="index.html#services">Repair & Restoration</a></li>
                        <li><a href="index.html#services">Wedding Collections</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Loading address...</p>
                    <p><i class="fas fa-phone"></i> Loading phone...</p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Roopam Jewellery. All rights reserved. | <a href="privacy-policy.html">Privacy Policy</a> | <a href="terms-and-conditions.html">Terms of Service</a></p>
            </div>
        </div>
    </footer>`;
    }

    /**
     * Generate scripts section
     */
    generateScripts() {
        return `
    <!-- Scripts -->
    <script src="assets/js/firebase-config.js"></script>
    <script src="assets/js/config-manager.js"></script>
    <script src="assets/js/content-injector.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/page-template.js"></script>`;
    }

    /**
     * Parse command line arguments
     */
    parseArgs(args) {
        const options = {};
        let pageName = '';

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            
            if (!pageName && !arg.startsWith('--')) {
                pageName = arg;
            } else if (arg.startsWith('--')) {
                const key = arg.substring(2);
                const value = args[i + 1];
                
                if (value && !value.startsWith('--')) {
                    options[key] = value;
                    i++; // Skip next argument
                } else {
                    options[key] = true;
                }
            }
        }

        return { pageName, options };
    }

    /**
     * Show help information
     */
    showHelp() {
        console.log(`
Roopam Jewellery Page Generator

Usage: node generate-page.js <page-name> [options]

Options:
  --title "Page Title"           Set the page title
  --description "Description"    Set the page description  
  --keywords "keywords"          Set SEO keywords
  --hero-title "Hero Title"      Set the hero section title
  --hero-subtitle "Subtitle"     Set the hero section subtitle
  --active-page "page-id"        Set active navigation item
  --no-hero                      Don't include hero section
  --no-breadcrumb               Don't show breadcrumb navigation
  --help                        Show this help message

Examples:
  node generate-page.js about-us --title "About Us" --hero-title "About Roopam Jewellery"
  node generate-page.js contact --description "Contact information" --active-page "contact"
  node generate-page.js gallery --no-hero --title "Photo Gallery"
        `);
    }
}

// Main execution
if (require.main === module) {
    const generator = new PageGenerator();
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('--help')) {
        generator.showHelp();
        process.exit(0);
    }
    
    const { pageName, options } = generator.parseArgs(args);
    
    if (!pageName) {
        console.error('❌ Error: Page name is required');
        generator.showHelp();
        process.exit(1);
    }
    
    // Convert command line options to config
    const config = {};
    if (options.title) config.title = options.title;
    if (options.description) config.description = options.description;
    if (options.keywords) config.keywords = options.keywords;
    if (options['hero-title']) config.heroTitle = options['hero-title'];
    if (options['hero-subtitle']) config.heroSubtitle = options['hero-subtitle'];
    if (options['active-page']) config.activePage = options['active-page'];
    if (options['no-hero']) config.includeHero = false;
    if (options['no-breadcrumb']) config.showBreadcrumb = false;
    
    const success = generator.generatePage(pageName, config);
    process.exit(success ? 0 : 1);
}

module.exports = PageGenerator;
