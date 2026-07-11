# Guida per modifiche e upgrade futuri — sito Green Day Italia

Istruzioni operative per chiunque intervenga in futuro su questo sito (te stesso o altri). Per il quadro tecnico completo vedi `RESOCONTO-TECNICO.md`.

## 1. Cosa serve per lavorare sul sito

Nulla di particolare: è HTML/CSS/JS puro, senza build. Bastano:

- Un editor di testo (consigliato VS Code)
- Un browser per l'anteprima: si può aprire `index.html` direttamente, oppure per un'anteprima più fedele usare un piccolo server locale (estensione "Live Server" di VS Code, o `python3 -m http.server` nella cartella del progetto)

## 2. Come modificare i contenuti

Tutto il contenuto testuale è in `index.html`, diviso in sezioni segnate da commenti (`<!-- 001 IL PROGETTO -->`, ecc.).

- **Aggiungere una tappa/città**: aggiungi un blocco `<figure class="city-card">` dentro `#tappe` e l'immagine corrispondente in `style/` (formato PNG, ~60-70KB, stesso stile delle altre)
- **Aggiungere una foto alla galleria**: aggiungi un `<button class="gallery-item" data-index="N">` dentro `#foto`, con l'immagine in `img/1920/` e `data-index` progressivo. Non serve toccare `main.js`: legge automaticamente tutti i `.gallery-item` presenti in pagina.
- **Aggiungere una voce al menu**: aggiorna sia `.nav-links` sia `.mobile-menu` in `index.html`, più la relativa `<section id="...">`

## 3. Come modificare lo stile

In `assets/css/style.css`, le prime righe contengono le variabili in `:root`: colori (`--bg`, `--lime`, `--emerald`...), font, raggio angoli, altezza header. Cambiare la palette o il font si fa lì, senza cercare le regole sparse nel resto del file.

Breakpoint responsive già previsti: 980px, 720px, 480px.

## 4. Immagini — attenzione al peso

Le 8 foto della galleria pesano **4,6 MB totali** (fino a 728 KB l'una): tanto per un sito che deve caricarsi in fretta. Se aggiungi nuove foto o intervieni su quelle esistenti:

- Comprimile prima di caricarle (es. [Squoosh](https://squoosh.app), TinyPNG) o convertile in WebP
- Mantieni `loading="lazy"` sulle immagini (già presente su tutte)

## 5. Come si pubblica (deploy)

Non serve alcuna build. Tutto ciò che è sul branch `main` viene pubblicato **automaticamente** da GitHub Pages su greenday.unoaventi.it, di solito entro 1-2 minuti dal push.

Flusso: modifica i file in locale → anteprima nel browser → commit e push da GitHub Desktop → il sito si aggiorna da solo.

**Non esiste un ambiente di staging/test**: ogni push su `main` va live immediatamente. Per modifiche importanti, testa con calma in locale prima di fare push.

## 6. Nota su Jekyll e cartelle con underscore

GitHub Pages processa questo repository con Jekyll per default (nessun `.nojekyll` presente). Effetto pratico: **qualsiasi cartella il cui nome inizia con underscore viene automaticamente esclusa dalla pubblicazione** — è per questo che `_archivio` non è mai comparsa sul sito live, anche prima di oggi.

Utile saperlo per il futuro: se servisse un'altra cartella di soli materiali di lavoro, il prefisso `_` la nasconde già dal sito pubblicato (va comunque tenuta fuori da git con `.gitignore`, come fatto oggi, per non appesantire il repository e la lista di modifiche in GitHub Desktop). Attenzione solo se un giorno aggiungerai un file `.nojekyll` (per usare funzionalità incompatibili con Jekyll): a quel punto l'esclusione automatica delle cartelle con underscore sparisce.

## 7. Dominio e DNS

Il dominio greenday.unoaventi.it è collegato tramite il file `CNAME` nella root del repository. La configurazione DNS vera e propria (il record presso il provider di unoaventi.it che punta ai server di GitHub Pages) **non è nel repository**: se in futuro il dominio smette di risolvere, il problema va cercato lì, non nel codice.

Se il file `CNAME` viene rimosso dal repository, il dominio personalizzato smette di funzionare e il sito torna raggiungibile solo dall'URL di default di GitHub Pages.

## 8. Cosa esclude il .gitignore e perché

```
Thumbs.db / desktop.ini / .DS_Store   → file di sistema generati da Windows/OneDrive/macOS, da non versionare mai
_archivio/                             → materiali di lavoro e versione precedente del sito, non fanno parte del sito pubblicato
```

## 9. Idee per upgrade futuri (facoltative)

Nessuna di queste è urgente; da valutare solo se/quando servirà:

- **SEO/social**: aggiungere `robots.txt`, `sitemap.xml` e meta tag Open Graph/Twitter Card (per anteprime curate quando il link viene condiviso su WhatsApp o social)
- **Immagini**: comprimere/convertire in WebP le foto della galleria
- **Analytics**: se interessa sapere quante visite arrivano, uno strumento privacy-friendly come Plausible o Fathom si integra con una riga di script, senza bisogno di banner cookie complessi
- **Oltre la pagina singola**: se in futuro il sito crescesse a più pagine, valutare un generatore statico leggero (es. Eleventy/Astro) — oggi non necessario, la struttura attuale è adatta alle dimensioni del sito
