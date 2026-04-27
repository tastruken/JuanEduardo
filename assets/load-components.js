/* ============================================
   Beltrán Auditores - Cargador de Componentes
   Maneja la inyección dinámica de Header y Footer
   ============================================ */

async function loadComponent(id, path) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(path);
        const html = await response.text();
        element.innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Error cargando componente ${path}:`, error);
        return false;
    }
}

function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.remove('text-silver', 'font-medium');
            link.classList.add('text-pure', 'font-bold', 'bg-white/5');
            
            // Si es link de escritorio, añadir el borde inferior
            if (link.classList.contains('nav-link') && !link.classList.contains('btn-premium')) {
                link.classList.add('border-b-2', 'border-silver/30', 'pb-1');
            }
        }
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes
    const headerLoaded = await loadComponent('main-header', 'assets/components/header.html');
    const footerLoaded = await loadComponent('main-footer', 'assets/components/footer.html');

    if (headerLoaded) {
        setActiveLink();
        initMobileMenu();
    }

    // Disparar evento personalizado para que otros scripts sepan que el DOM está listo
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
});
