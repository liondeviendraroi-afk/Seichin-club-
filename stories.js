document.addEventListener('DOMContentLoaded', function() {
    const stories = {
        vision: {
            title: 'Notre Vision — Le sol froid du dojo',
            text: `<p>Un jeune élève entra pour la première fois dans le dojo. Le sol était froid sous ses pieds et le lieu semblait retenir son souffle. Il hésita, regarda sa main serrer le revers de son kimono, et se demanda s’il appartenait à ce lieu.</p>
                   <p>Le maître posa la main sur son épaule et dit simplement : « Assieds-toi. Écoute le silence. » Jour après jour, il revint. Il tomba, se releva, chercha, perdit, recommença. À force de répétition, ses pas devinrent sûrs ; la peur fit place à la patience. Le sol, d’abord hostile, devint soutien — mémoire des efforts et témoin des progrès. Le silence, qui lui faisait peur au début, lui apprit à entendre sa propre volonté.</p>` ,
            lesson: 'La vraie force se construit dans la patience et la constance.'
        },
        seichine: {
            title: 'Le Nom « Seïchine » — Le bol d\'eau claire',
            text: `<p>Un maître tendit un bol d'eau claire à son élève et lui demanda de traverser la cour sans perdre une goutte. Autour, le monde débordait de sons — coups, rires, remarques — mais l'élève avança lentement, le regard fixé, le souffle mesuré. Arrivé, le maître lui demanda : « Qu'as-tu vu ? »</p>
                   <p>L'élève répondit : « Rien. J'ai tout senti, mais je n'ai rien vu. » Le maître sourit : « Voilà Seïchine. Ce n'est pas un nom, c'est un esprit : clarté, concentration, simplicité. Quand l'esprit est net, le tumulte extérieur ne te dérange pas. »</p>` ,
            lesson: 'Quand ton esprit reste clair, le monde peut être bruyant sans te faire vaciller.'
        },
        objectifs: {
            title: 'Nos Objectifs — La ceinture qui ne parlait pas',
            text: `<p>Un élève demanda : « Maître, quand aurai-je une ceinture noire ? » Le maître répondit : « Quand tu n'en auras plus besoin. »</p>
                   <p>Les années s'écoulèrent. L'élève se leva tôt, aida les plus jeunes, salua avec respect, reçut des corrections sans colère et apprit à enseigner en silence. Un jour, sans cérémonie, le maître posa une ceinture noire devant lui. Il n'y eut ni fanfare ni paroles ; seulement un regard, une main posée sur l'épaule.</p>` ,
            lesson: 'La réussite véritable élève les autres ; elle ne gonfle pas l\'ego.'
        }
    };

    const modal = document.getElementById('story-modal');
    const titleEl = modal.querySelector('.story-title');
    const contentEl = modal.querySelector('.story-content');
    const lessonEl = modal.querySelector('.story-lesson');
    const closeBtn = modal.querySelector('.story-close');

    function openStory(key) {
        const s = stories[key];
        if (!s) return;
        titleEl.textContent = s.title;
        contentEl.innerHTML = s.text;
        lessonEl.textContent = s.lesson;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // focus
        closeBtn.focus();
    }

    function closeStory() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    // open on click
    document.querySelectorAll('.story-card').forEach(card => {
        card.addEventListener('click', function() {
            const key = this.dataset.story;
            openStory(key);
        });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openStory(this.dataset.story);
            }
        });
    });

    // close handlers
    closeBtn.addEventListener('click', closeStory);
    modal.querySelector('.story-modal-backdrop').addEventListener('click', closeStory);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeStory();
    });
});
