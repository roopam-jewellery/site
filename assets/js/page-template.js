/**
 * Roopam Jewellery - Page Template System
 * Provides modular components for consistent page layouts
 */

class PageTemplate {
    constructor() {
        this.config = {
            siteName: 'Roopam Jewellery',
            siteTagline: 'Luxury Custom Ornaments',
            currentYear: new Date().getFullYear()
        };
    }

    /**
     * Get common head elements for all pages
     */
    getHeadElements(pageConfig = {}) {
        const defaultConfig = {
            title: 'Roopam Jewellery - Luxury Custom Ornaments',
            description: 'Discover exquisite handcrafted jewellery and custom ornament creation services. Premium quality with elegant designs for every occasion.',
            keywords: 'jewellery, custom ornaments, handcrafted, luxury, gold, silver, diamonds, engagement rings',
            canonical: '',
            themeColor: '#1a365d'
        };

        const config = { ...defaultConfig, ...pageConfig };

        return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.keywords}">
    ${config.canonical ? `<link rel="canonical" href="${config.canonical}">` : ''}
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="${config.themeColor}">
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
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>
    
    <!-- Firebase Environment Variables -->
    <script src="assets/js/firebase-env.js"></script>`;
    }

    /**
     * Get navigation HTML with active page highlighting
     */
    getNavigation(activePage = '') {
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
     * Get footer HTML
     */
    getFooter() {
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
                <p>&copy; ${this.config.currentYear} Roopam Jewellery. All rights reserved. | <a href="privacy-policy.html">Privacy Policy</a> | <a href="terms-and-conditions.html">Terms of Service</a></p>
            </div>
        </div>
    </footer>`;
    }

    /**
     * Get common script tags
     */
    getScripts() {
        return `
    <!-- Scripts -->
    <script src="assets/js/firebase-config.js"></script>
    <script src="assets/js/config-manager.js"></script>
    <script src="assets/js/content-injector.js"></script>
    <script src="assets/js/main.js"></script>`;
    }

    /**
     * Create a page hero section
     */
    createPageHero(config = {}) {
        const defaultConfig = {
            title: 'Page Title',
            subtitle: 'Page description',
            backgroundGradient: 'linear-gradient(135deg, var(--primary-blue), var(--light-blue))',
            showBreadcrumb: true,
            breadcrumbs: [
                { label: 'Home', href: 'index.html' },
                { label: 'Current Page', href: '#' }
            ]
        };

        const heroConfig = { ...defaultConfig, ...config };

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
     * Generate a complete page template
     */
    generatePage(pageConfig = {}) {
        const defaultPageConfig = {
            head: {},
            activePage: '',
            hero: null,
            content: '<main><!-- Page content goes here --></main>',
            additionalScripts: '',
            pageSpecificStyles: ''
        };

        const config = { ...defaultPageConfig, ...pageConfig };

        return `<!DOCTYPE html>
<html lang="en">
<head>${this.getHeadElements(config.head)}${config.pageSpecificStyles ? `\n    <style>\n${config.pageSpecificStyles}\n    </style>` : ''}
</head>
<body>${this.getNavigation(config.activePage)}
${config.hero ? this.createPageHero(config.hero) : ''}
${config.content}
${this.getFooter()}
${this.getScripts()}${config.additionalScripts}
</body>
</html>`;
    }
}

// Make PageTemplate available globally
if (typeof window !== 'undefined') {
    window.PageTemplate = PageTemplate;
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTemplate;
}
