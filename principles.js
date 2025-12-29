// Gestion des modals pour les 5 Principes Fondamentaux du Shitoryu

document.addEventListener('DOMContentLoaded', function() {
    // Éléments
    const principleButtons = document.querySelectorAll('.principle-btn');
    const closeButtons = document.querySelectorAll('.principles-close-btn');
    const backdrop = document.getElementById('principlesBackdrop');

    // Ouvrir modal
    function openModal(principleId) {
        const modalId = principleId + '-modal';
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            backdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus sur le bouton de fermeture pour l'accessibilité
            const closeBtn = modal.querySelector('.principles-close-btn');
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
    principleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const principleId = this.getAttribute('data-principle');
            openModal(principleId);
        });

        // Support clavier (Entrée et Espace)
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const principleId = this.getAttribute('data-principle');
                openModal(principleId);
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
            const visibleModal = document.querySelector('.principles-modal.show');
            if (visibleModal) {
                const modalId = visibleModal.getAttribute('id');
                closeModal(modalId);
            }
        }
    });

    // Fermer en cliquant sur le backdrop
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            const visibleModal = document.querySelector('.principles-modal.show');
            if (visibleModal) {
                const modalId = visibleModal.getAttribute('id');
                closeModal(modalId);
            }
        }
    });

    // Support du click sur les cartes de principe
    const principleCards = document.querySelectorAll('.principle-card');
    principleCards.forEach(card => {
        // Rendre la carte cliquable au clavier
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('click', function(e) {
            // Éviter d'ouvrir le modal si on clique sur le bouton (qui a son propre listener)
            if (e.target.classList.contains('principle-btn')) {
                return;
            }
            const principleId = this.getAttribute('data-principle');
            openModal(principleId);
        });

        // Support clavier sur les cartes (Entrée)
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const principleId = this.getAttribute('data-principle');
                openModal(principleId);
            }
        });
    });
});
