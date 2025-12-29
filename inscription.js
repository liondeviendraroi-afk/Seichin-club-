// Gestion du formulaire d'inscription avec génération de PDF

document.addEventListener('DOMContentLoaded', function() {
    // Créer les éléments du modal d'inscription s'ils n'existent pas
    if (!document.getElementById('inscription-modal')) {
        createInscriptionModal();
    }

    // Event listeners pour les boutons S'inscrire
    const inscriptionButtons = document.querySelectorAll('[href*="inscription"], .inscription-btn');
    inscriptionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Empêcher la navigation si c'est un lien
            if (this.tagName === 'A') {
                e.preventDefault();
            }
            // Ouvrir le modal pour tous les éléments marqués inscription
            openInscriptionModal();
        });
    });
});

// Créer le modal d'inscription
function createInscriptionModal() {
    const backdrop = document.createElement('div');
    backdrop.id = 'inscription-backdrop';
    backdrop.className = 'inscription-backdrop';

    const modal = document.createElement('div');
    modal.id = 'inscription-modal';
    modal.className = 'inscription-modal';
    modal.role = 'dialog';
    modal.setAttribute('aria-labelledby', 'inscription-title');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="inscription-modal-content">
            <button class="inscription-close-btn" aria-label="Fermer le formulaire">✕</button>
            <div class="inscription-modal-header">
                <h2 id="inscription-title">Inscription au Dojo Seïchine</h2>
                <p>Complétez le formulaire ci-dessous pour vous inscrire</p>
            </div>
            <form id="inscription-form" class="inscription-form">
                <!-- INFORMATIONS PERSONNELLES -->
                <fieldset>
                    <legend>Informations Personnelles</legend>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nom">Nom complet *</label>
                            <input type="text" id="nom" name="nom" required>
                        </div>
                        <div class="form-group">
                            <label for="prenom">Prénom *</label>
                            <input type="text" id="prenom" name="prenom" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="dateNaissance">Date de naissance *</label>
                            <input type="date" id="dateNaissance" name="dateNaissance" required>
                        </div>
                        <div class="form-group">
                            <label for="genre">Genre *</label>
                            <select id="genre" name="genre" required>
                                <option value="">-- Sélectionner --</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="nationalite">Nationalité *</label>
                        <input type="text" id="nationalite" name="nationalite" placeholder="Ex: Ivoirienne" required>
                    </div>

                    <div class="form-group">
                        <label for="adresse">Adresse complète *</label>
                        <textarea id="adresse" name="adresse" rows="2" required></textarea>
                    </div>
                </fieldset>

                <!-- INFORMATIONS DE CONTACT -->
                <fieldset>
                    <legend>Informations de Contact</legend>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telephone">Téléphone *</label>
                            <input type="tel" id="telephone" name="telephone" placeholder="Ex: +225 05 08 24 07 08" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Ex: nom@example.com">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="personneContact">Personne à contacter en cas d'urgence *</label>
                        <input type="text" id="personneContact" name="personneContact" required>
                    </div>

                    <div class="form-group">
                        <label for="telephoneContact">Téléphone personne de contact *</label>
                        <input type="tel" id="telephoneContact" name="telephoneContact" required>
                    </div>
                </fieldset>

                <!-- INFORMATIONS D'ENTRAÎNEMENT -->
                <fieldset>
                    <legend>Informations d'Entraînement</legend>
                    <div class="form-group">
                        <label for="niveauKarate">Niveau de karaté actuel *</label>
                        <select id="niveauKarate" name="niveauKarate" required>
                            <option value="">-- Sélectionner --</option>
                            <option value="Débutant">Débutant (Sans expérience)</option>
                            <option value="Blanche">Ceinture Blanche</option>
                            <option value="Jaune">Ceinture Jaune</option>
                            <option value="Orange">Ceinture Orange</option>
                            <option value="Verte">Ceinture Verte</option>
                            <option value="Bleue">Ceinture Bleue</option>
                            <option value="Marron">Ceinture Marron</option>
                            <option value="Noire">Ceinture Noire</option>
                            <option value="Autre">Autre (veuillez préciser)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="categorie">Catégorie d'âge *</label>
                        <select id="categorie" name="categorie" required>
                            <option value="">-- Sélectionner --</option>
                            <option value="Enfant">Enfant (5-12 ans)</option>
                            <option value="Adolescent">Adolescent (13-17 ans)</option>
                            <option value="Adulte">Adulte (18+ ans)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="objectif">Objectif d'entraînement *</label>
                        <select id="objectif" name="objectif" required>
                            <option value="">-- Sélectionner --</option>
                            <option value="Loisir">Loisir / Développement personnel</option>
                            <option value="Competition">Compétition</option>
                            <option value="Defense">Autodefense</option>
                            <option value="Forme">Forme physique</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="formule">Formule d'abonnement choisie *</label>
                        <select id="formule" name="formule" required>
                            <option value="">-- Sélectionner --</option>
                            <option value="Mensuel">Forfait Mensuel (2 000 FCFA)</option>
                            <option value="Trimestriel">Forfait Trimestriel (12 000 FCFA)</option>
                            <option value="Inscription">Inscription Annuelle (3 000 FCFA)</option>
                        </select>
                    </div>
                </fieldset>

                <!-- CONDITIONS -->
                <fieldset>
                    <legend>Acceptation des Conditions</legend>
                    <div class="form-group checkbox">
                        <input type="checkbox" id="accepte" name="accepte" required>
                        <label for="accepte">J'accepte les conditions d'inscription et la politique de confidentialité *</label>
                    </div>

                    <div class="form-group checkbox">
                        <input type="checkbox" id="sante" name="sante" required>
                        <label for="sante">Je certifie être en bonne santé et apte à pratiquer le karaté *</label>
                    </div>
                </fieldset>

                <!-- BOUTONS -->
                <div class="form-actions">
                    <button type="reset" class="btn-secondary">Réinitialiser</button>
                    <button type="submit" class="btn-primary">Générer & Télécharger PDF</button>
                </div>
            </form>
        </div>
    </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = modal.querySelector('.inscription-close-btn');
    closeBtn.addEventListener('click', closeInscriptionModal);

    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closeInscriptionModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeInscriptionModal();
        }
    });

    // Soumettre le formulaire
    const form = document.getElementById('inscription-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateAndDownloadPDF();
    });
}

// Ouvrir le modal
function openInscriptionModal() {
    const modal = document.getElementById('inscription-modal');
    const backdrop = document.getElementById('inscription-backdrop');
    
    if (modal && backdrop) {
        modal.classList.add('show');
        backdrop.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Focuser le premier champ du formulaire et le centrer dans la vue
        const firstInput = modal.querySelector('#nom');
        if (firstInput) {
            setTimeout(() => {
                try {
                    firstInput.focus({ preventScroll: false });
                    firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch (err) {
                    firstInput.focus();
                }
            }, 150);
        }
    }
}

// Fermer le modal
function closeInscriptionModal() {
    const modal = document.getElementById('inscription-modal');
    const backdrop = document.getElementById('inscription-backdrop');
    
    if (modal && backdrop) {
        modal.classList.remove('show');
        backdrop.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// Générer et télécharger le PDF
function generateAndDownloadPDF() {
    const form = document.getElementById('inscription-form');
    const formData = new FormData(form);

    // Créer un document HTML pour le PDF
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 800px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #ff0000; padding-bottom: 20px; }
                .header h1 { color: #ff0000; font-size: 24px; margin-bottom: 5px; }
                .header p { color: #666; font-size: 12px; }
                .section { margin-bottom: 25px; }
                .section-title { color: #ff0000; font-size: 14px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #ff0000; padding-bottom: 5px; }
                .row { display: flex; gap: 30px; margin-bottom: 10px; }
                .field { flex: 1; }
                .field-label { font-weight: bold; font-size: 11px; color: #666; }
                .field-value { font-size: 12px; margin-top: 3px; color: #333; }
                .checkbox-field { display: flex; align-items: center; margin-bottom: 8px; font-size: 11px; }
                .checkbox-field input { margin-right: 8px; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #999; }
                .date { text-align: right; font-size: 11px; color: #666; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="date">Créé le: ${new Date().toLocaleDateString('fr-FR')}</div>
                
                <div class="header">
                    <h1>DOJO SEÏCHINE SHITORYU KARATÉ</h1>
                    <p>Formulaire d'Inscription</p>
                    <p>Korhogo, Nouveau Quartier - Côte d'Ivoire</p>
                </div>

                <div class="section">
                    <div class="section-title">INFORMATIONS PERSONNELLES</div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Nom complet</div>
                            <div class="field-value">${formData.get('nom')} ${formData.get('prenom')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Date de naissance</div>
                            <div class="field-value">${formatDate(formData.get('dateNaissance'))}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Genre</div>
                            <div class="field-value">${formData.get('genre')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Nationalité</div>
                            <div class="field-value">${formData.get('nationalite')}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Adresse</div>
                            <div class="field-value">${formData.get('adresse')}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">INFORMATIONS DE CONTACT</div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Téléphone</div>
                            <div class="field-value">${formData.get('telephone')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Email</div>
                            <div class="field-value">${formData.get('email') || '-'}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Personne de contact d'urgence</div>
                            <div class="field-value">${formData.get('personneContact')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Téléphone de contact</div>
                            <div class="field-value">${formData.get('telephoneContact')}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">INFORMATIONS D'ENTRAÎNEMENT</div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Niveau de karaté actuel</div>
                            <div class="field-value">${formData.get('niveauKarate')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Catégorie d'âge</div>
                            <div class="field-value">${formData.get('categorie')}</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <div class="field-label">Objectif d'entraînement</div>
                            <div class="field-value">${formData.get('objectif')}</div>
                        </div>
                        <div class="field">
                            <div class="field-label">Formule choisie</div>
                            <div class="field-value">${formData.get('formule')}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">ACCEPTATION DES CONDITIONS</div>
                    <div class="checkbox-field">
                        <input type="checkbox" checked disabled> Je reconnais avoir complété ce formulaire avec des informations exactes et véridiques.
                    </div>
                </div>

                <div class="footer">
                    <p>Ce document constitue une preuve de votre inscription au Dojo Seïchine Shitoryu Karaté.</p>
                    <p>Veuillez le présenter lors de votre première visite au dojo.</p>
                    <p style="margin-top: 10px;">Seïchine Shitoryu Karaté © 2026 | Tous droits réservés</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Créer un blob et télécharger
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    
    // Utiliser html2pdf s'il est disponible. Tenter d'enregistrer via
    // File System Access API (enregistrement définitif) si supportée,
    // sinon déclencher le téléchargement classique.
    const filename = `Inscription_Seichine_${sanitizeFilename(formData.get('nom'))}_${sanitizeFilename(formData.get('prenom'))}.pdf`;
    const hasHtml2pdf = (typeof html2pdf !== 'undefined');

    if (hasHtml2pdf) {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;

        // Si l'API File System Access est disponible, essayer d'obtenir un Blob PDF
        // puis demander à l'utilisateur où l'enregistrer définitivement.
        const trySaveViaFileSystem = async () => {
            try {
                // Générer un objet jsPDF via html2pdf puis récupérer le blob
                const worker = html2pdf().from(element).toPdf();
                const pdf = await worker.get('pdf');
                const blob = pdf.output('blob');

                if (window.showSaveFilePicker) {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: filename,
                        types: [{ description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }]
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return true;
                }

                // Fallback older browsers: try navigator.storage permission (not guaranteed)
                return false;
            } catch (err) {
                return false;
            }
        };

        (async () => {
            const saved = await trySaveViaFileSystem();
            if (!saved) {
                // Si on n'a pas pu sauvegarder via File System API, lancer la sauvegarde classique
                html2pdf().set({
                    margin: 10,
                    filename: filename,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
                }).save();
            }
        })();
    } else {
        // Fallback: télécharger en HTML si html2pdf n'est pas chargé
        downloadAsHTML(htmlContent, formData.get('nom'), formData.get('prenom'));
    }

    // Afficher un message de succès
    showSuccessMessage();
    
    // Fermer le modal après 1 seconde
    setTimeout(closeInscriptionModal, 1000);
}

// Télécharger en HTML si PDF n'est pas disponible
function downloadAsHTML(htmlContent, nom, prenom) {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Inscription_Seichine_${nom}_${prenom}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Sanitize filename parts to remove problematic characters
function sanitizeFilename(str) {
    if (!str) return 'inconnu';
    return String(str).replace(/[^a-z0-9_\-\u00C0-\u024F ]/gi, '').replace(/\s+/g, '_');
}

// Afficher un message de succès
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✓ Votre inscription a été enregistrée et téléchargée!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Formater la date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}
