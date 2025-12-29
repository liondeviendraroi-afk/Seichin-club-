// Gestion des modals pour les styles majeurs du karaté

document.addEventListener('DOMContentLoaded', function() {
    // Éléments
    const styleButtons = document.querySelectorAll('.style-btn');
    const closeButtons = document.querySelectorAll('.styles-close-btn');
    const backdrop = document.getElementById('stylesBackdrop');

    // Ouvrir modal
    function openModal(styleId) {
        const modalId = styleId + '-modal';
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            backdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus sur le bouton de fermeture pour l'accessibilité
            const closeBtn = modal.querySelector('.styles-close-btn');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    // Fermer modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    // Event listeners pour boutons d'ouverture
    styleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const styleId = this.getAttribute('data-style');
            openModal(styleId);
        });

        // Support clavier (Entrée et Espace)
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const styleId = this.getAttribute('data-style');
                openModal(styleId);
            }
        });
    });

    // Event listeners pour boutons de fermeture
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const visibleModal = document.querySelector('.styles-modal.show');
            if (visibleModal) {
                const modalId = visibleModal.getAttribute('id');
                closeModal(modalId);
            }
        }
    });

    // Fermer en cliquant sur le backdrop
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            const visibleModal = document.querySelector('.styles-modal.show');
            if (visibleModal) {
                const modalId = visibleModal.getAttribute('id');
                closeModal(modalId);
            }
        }
    });

    // Support du click sur les cartes de style
    const styleCards = document.querySelectorAll('.style-card');
    styleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Éviter d'ouvrir le modal si on clique sur le bouton (qui a son propre listener)
            if (e.target.classList.contains('style-btn')) {
                return;
            }
            const styleId = this.getAttribute('data-style');
            openModal(styleId);
        });
    });
});
