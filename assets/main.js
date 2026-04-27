/* ============================================
   Beltrán Auditores - Lógica de Interacción
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // (La lógica del menú móvil ahora reside en load-components.js para manejar elementos dinámicos)


    // --- Manejo del Formulario y Modal ---
    const forms = [
        document.getElementById('diagnosticoForm'),
        document.getElementById('contactoForm'),
        document.getElementById('suscripcionForm')
    ];
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('closeModalBtn');

    forms.forEach(form => {
        if (form && modal && modalContent && closeBtn) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Mostrar Modal animado
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modalContent.classList.remove('scale-95');
                }, 10);

                form.reset();
            });
        }
    });

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

});
