# Resoconto tecnico — sito Green Day Italia

Aggiornato all'11 luglio 2026.

## 1. Panoramica

Sito statico a pagina singola, pubblicato su **greenday.unoaventi.it**. Si tratta di un case study/archivio del progetto "Green Day Italia" (2012–2015), un ciclo itinerante di incontri gratuiti su efficienza energetica curato da Andrea Poletti nell'ambito di GEC — Green Energy Campus. Il progetto è concluso: il sito ne è la testimonianza permanente.

- **Repository**: github.com/arstantra/035_GreenDay (branch `main`)
- **Deploy**: GitHub Pages, servito direttamente dal branch `main`, nessuna build
- **Dominio**: greenday.unoaventi.it (dominio personalizzato via file CNAME)
- **Verifica**: sito raggiunto e controllato in data odierna, contenuto corrispondente esattamente a quello del repository

## 2. Stack tecnico

Nessun framework, nessun build tool, nessuna dipendenza da gestire (niente `package.json`, npm, webpack, ecc.). HTML5 + CSS3 + JavaScript vanilla:

| File | Righe | Ruolo |
|---|---|---|
| `index.html` | 422 | struttura e contenuti dell'unica pagina |
| `assets/css/style.css` | 818 | stile, tema, responsive |
| `assets/js/main.js` | 168 | interattività (vanilla JS, IIFE, nessuna libreria esterna) |

Unica dipendenza esterna: Google Fonts (Space Grotesk + Inter), caricato via CDN con `preconnect`.

Nota: la versione precedente del sito (in `_archivio/`) usava jQuery 1.9.1 e uno slider Jssor — tecnologie non più presenti nella versione attuale, completamente riscritta in vanilla JS.

## 3. Struttura del repository

```
035_GreenDay/
├── index.html                  ← pagina unica del sito
├── CNAME                       ← dominio personalizzato (greenday.unoaventi.it)
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── img/1920/                   ← 8 foto della galleria (1.jpg – 8.jpg)
├── style/                      ← 12 loghi città + 2 loghi GEC (PNG)
├── _archivio/                  ← versione precedente del sito, materiale di lavoro
│   ├── home.html, contatti.html, iscrizione.html, location.html,
│   │   mappa.html, bootstrap-carousel.html, GEC.html
│   ├── img/, style/, js/ (jQuery, Jssor slider)
├── .gitignore                  ← creato oggi (vedi sezione 8)
├── .gitattributes
└── README.md
```

## 4. Funzionalità implementate (main.js)

- Anno dinamico nel footer
- Header con stato "scrolled" + barra di avanzamento scroll
- Menu mobile a comparsa
- Animazioni "reveal on scroll" via `IntersectionObserver`
- Contatori numerici animati (le statistiche "12 città", ecc.)
- Galleria con lightbox: apertura, navigazione precedente/successiva, chiusura (click esterno o Esc), frecce tastiera
- Rispetto di `prefers-reduced-motion` per chi disattiva le animazioni

## 5. Design system (CSS)

Tema scuro "eco-tech" (verde lime + emerald su sfondo quasi nero), gestito tramite variabili CSS in `:root` (colori, raggio angoli, font, altezza header) — comodo per modifiche rapide di palette senza toccare le regole sparse nel file.

Breakpoint responsive: 980px, 720px, 480px. Supporto esplicito per `prefers-reduced-motion`.

## 6. Contenuti della pagina

Otto sezioni ancorate (`#origini #progetto #contesto #tappe #foto #nh-hotels #frammenti #contatti`), navigabili da un menu fisso:

1. **Hero** — titolo, sottotitolo, CTA
2. **000 Le origini** — mini-timeline che collega UDS → GEC → Green Day (aggiunta l'11/07/2026), chiusa da una citazione d'epoca di Andrea Poletti (aggiunta l'11/07/2026, vedi punto 13)
3. **001 Il progetto** — descrizione, quote, statistiche (12 città, ingresso gratuito, GEC, 67% ammessi al colloquio di selezione — quarta statistica aggiunta l'11/07/2026)
4. **002 Il contesto** — timeline storica 2011→2021 (dal boom e maturazione del mercato fotovoltaico post-Fukushima — voce aggiunta l'11/07/2026 — all'Accordo di Parigi, Fridays for Future, Green Deal, Superbonus, PNRR)
5. **003 Le tappe** — marquee scorrevole + griglia dei 12 loghi città (Trento → Catania)
6. **004 Foto** — galleria di 8 foto con lightbox
7. **005 NH Hotels** — case study sul TRI Award (CETRI, Jeremy Rifkin), con dettaglio sulle tappe del tour realmente ospitate negli hotel NH nel 2013-2014 (aggiunto l'11/07/2026)
8. **006 Quello che resta** — sezione nuova (aggiunta l'11/07/2026, vedi punto 14): un'unica tappa (Green Tour 00/13, sett. 2013) raccontata per intero con dati reali, a rappresentare per frammenti l'intero tour di cui i resoconti completi sono andati perduti
9. **007 Contatti** — link mailto (nessun form di contatto)

## 7. Asset e peso

- **Foto galleria** (`img/1920/`): 8 file JPG, **4,6 MB totali** (da 472 KB a 728 KB l'una) — pesanti per il web, nessuna versione WebP o responsive, ma con `loading="lazy"` attivo
- **Loghi città** (`style/`): 12 PNG da 56–72 KB + 2 loghi GEC (4–12 KB)
- **Peso repository** (esclusa `.git`): 5,6 MB

## 8. SEO e meta tag

Presenti: `<title>` descrittivo, meta description curata, favicon.

Assenti: `robots.txt`, `sitemap.xml`, tag Open Graph/Twitter Card (le anteprime su social/WhatsApp non saranno curate), dati strutturati Schema.org. Nessun sistema di analytics o tracciamento installato.

## 9. Deploy e dominio

- **Metodo**: GitHub Pages "classico" (deploy da branch, non da GitHub Actions — non esiste alcuna cartella `.github/workflows`)
- Questo significa che GitHub applica il **processing Jekyll di default** (non c'è né un file `.nojekyll` né un `_config.yml` che lo disattivino)
- **Conseguenza pratica e non ovvia**: Jekyll esclude automaticamente dalla pubblicazione qualsiasi file o cartella il cui nome inizia con underscore. La cartella `_archivio` **non è quindi mai stata visibile pubblicamente** sul sito live, pur essendo presente nel repository ([fonte: documentazione ufficiale GitHub Pages](https://help.github.com/en/articles/files-that-start-with-an-underscore-are-missing))
- **Dominio personalizzato**: greenday.unoaventi.it, configurato tramite il file `CNAME` nella root del repository (commit "Create CNAME", aggiunto direttamente da interfaccia GitHub l'11/07/2026). La configurazione DNS vera e propria (il record che punta a GitHub Pages) è gestita presso il provider del dominio unoaventi.it, fuori dal repository.

## 10. Stato del repository

Al momento di questo resoconto: 2 commit totali (`c198389` "Initial commit", `abf1db1` "Create CNAME"), branch `main` allineato a `origin/main`.

**Prima di oggi non esisteva alcun file `.gitignore`**: la cartella `_archivio` (13 file, 220 KB) era interamente tracciata da git, pur non essendo pubblicata sul sito live (vedi punto 9). Contiene la versione precedente del sito: `home.html`, `contatti.html`, `iscrizione.html`, `location.html`, `mappa.html`, `bootstrap-carousel.html`, `GEC.html`, più immagini e le librerie jQuery/Jssor.

## 11. Intervento di oggi e nota tecnica importante

Nel corso di questa sessione ho:

1. Sincronizzato il repository locale con il commit remoto "Create CNAME" (pull, nessun conflitto)
2. Creato il file `.gitignore`, escludendo `_archivio/` e i file di sistema Windows/OneDrive (`Thumbs.db`, `desktop.ini`, `.DS_Store`)
3. Avviato la rimozione di `_archivio` dal tracking di git

Al punto 3, git ha riportato un **indice corrotto** ("index file corrupt"). Causa: la cartella `.git` di questo repository si trova dentro una cartella sincronizzata da OneDrive, e OneDrive sta sincronizzando anche i file interni di `.git`. Git scrive il proprio indice con un meccanismo di lock-e-rinomina molto rapido; se OneDrive blocca uno di quei file nello stesso istante (per caricarlo), la scrittura può risultare incompleta. Ho verificato che **nessun dato è andato perso**: cronologia commit, riferimenti (`refs`) e tutti i file di lavoro (inclusi quelli di `_archivio`) sono integri. Serve però una piccola riparazione manuale, spiegata nella Guida Upgrade allegata (sezione "Da fare subito").

Questo stesso conflitto **può ripresentarsi** in futuro con GitHub Desktop se OneDrive sincronizza nello stesso momento in cui si fa un commit. Raccomandazione operativa nella guida allegata.

## 12. Aggiornamento narrativo (11/07/2026)

Aggiunta la sezione **"000 — Le origini"** (nuova, prima di "001 Il progetto"): mini-timeline che collega UDS → GEC → Green Day, per risolvere la confusione tra i tre nomi. Aggiornati di conseguenza: voce di menu (desktop e mobile), link "Scorri" dell'hero (ora punta a `#origini`), e il credito UDS nel footer, riscritto perché UDS non risulti un semplice fornitore esterno ("sito web a cura di") ma lo studio all'origine del percorso.

**Nota tecnica**: subito dopo questa modifica, il mount bash di questa cartella (sincronizzata OneDrive) ha restituito una versione di `index.html` non aggiornata (conteggio righe e struttura non corrispondenti), mentre il tool di lettura file ha sempre restituito la versione corretta. Per verifiche su questo repository, in caso di dubbio è più affidabile leggere i file direttamente piuttosto che fidarsi di un comando bash lanciato subito dopo una modifica.

## 13. Secondo aggiornamento narrativo (11/07/2026) — materiali da _archivio

Andrea ha aggiunto in `_archivio/` una selezione di materiali originali Green Day/GEC (cartelle `005_GreenDay 2013 (risultati e academy)`, `020_GreenEnergyCampus (format 2015)`, `030_EfficienzaVince (manifestazione a premi)`, `055_GreenDay 2013 (format)`, oltre a `vecchio sito`). Dopo un'analisi del contenuto e un confronto con Andrea su come usarlo, ho integrato in `index.html`:

- **000 Le origini**: citazione verbatim dalla lettera di benvenuto ai candidati del 2013, firmata Dr. Andrea Poletti (fonte: `005_GreenDay 2013.../Gentile candidato.docx`)
- **001 Il progetto**: quarta statistica — 67% dei candidati ammessi al colloquio di selezione — dai riepiloghi della prima tappa del tour, autunno 2013 (fonte: `005_GreenDay 2013.../report GD - Google Drive.pdf`, modulo Google con 33 risposte). La griglia statistiche in CSS è passata da 3 a 4 colonne (`.stats-grid`), con una nuova regola a 2 colonne sotto i 980px
- **002 Il contesto**: nuova voce di timeline 2011–2013 sul boom e la maturazione del mercato fotovoltaico italiano (Fukushima, conto energia, 17 GW installati, fine dell'incentivo a giugno 2013), da `020_GreenEnergyCampus.../GEC Progetto dettagliato.docx` e `.../Dal venditore di impianti fotovoltaici al consulente familiare.docx`
- **005 NH Hotels**: arricchita la frase di apertura con le tappe del tour realmente ospitate da NH (Bologna, Firenze, Ancona, 2013) e il riferimento al Green Tour 2014, da una quotazione reale trovata in archivio (`055_GreenDay 2013 (format).../GREEN ENERGY SRL _ offer NH HOTELS.pdf`)

**Nota su dati sensibili**: `_archivio` contiene anche materiale con dati personali reali di candidati 2013-2014 (nome, telefono, email, data di nascita — es. `LISTA MARCHE.xlsx`, che nonostante il nome non è una lista di marchi ma di candidati, e `GreenDay nomi assegnati.pdf`). Nessun dato individuale è stato usato sul sito pubblico, solo aggregati anonimi come sopra. La cartella resta comunque esclusa dalla pubblicazione (Jekyll + `.gitignore`, vedi punto 9) — attenzione comunque a non condividerne il contenuto individuale altrove.

**Materiale valutato e lasciato fuori**: la cartella `030_EfficienzaVince` (iniziativa promozionale a premi, "in efficienza si vince sempre") non risulta collegata in modo chiaro al marchio Green Day/GEC — i documenti sono soprattutto benchmark di regolamenti altrui (Hyundai Madrid, PagineGialle) e un template Gantt vuoto. Non è stata usata per contenuti sul sito; da rivalutare solo se Andrea conferma che è stata effettivamente parte del percorso Green Day.

## 14. Terzo aggiornamento narrativo (11/07/2026) — sezione "Quello che resta"

Andrea mi ha raccontato che i resoconti completi dell'intero tour (centinaia di tappe, 2012–2015) sono andati perduti in un trasloco: un corriere ha smarrito per errore gli scatoloni che li contenevano, mai più ritrovati. Ha descritto quello che resta come un affresco di cui sono sopravvissuti solo alcuni frammenti — da cui si può intuire il resto, senza poterlo ricostruire per intero.

Su sua indicazione, ho aggiunto una nuova sezione **"006 — Quello che resta"** (tra NH Hotels e Contatti, che diventa "007"), che racconta per intero l'unica tappa di cui abbiamo dati completi e coerenti tra loro — Green Tour 00/13, 4–11 settembre 2013, Torino/Bologna/Roma/Ancona (34 partecipanti, 22 idonei, costo 1.796,65 euro) — invece di tentare una sintesi dell'intero tour, impossibile onestamente con i dati disponibili (solo 3 tappe su centinaia hanno numeri reali, tutte autunno 2013). La sezione dichiara esplicitamente la perdita dei materiali e riusa lo stile "case-card"/"mini-stats" già collaudato per NH Hotels (nessun CSS nuovo). Aggiornata anche la navigazione, desktop e mobile.

## 15. Correzione menu desktop (11/07/2026)

Andrea ha segnalato uno screenshot con il menu desktop **rotto**: le voci di navigazione (incluso il nome del brand) andavano a capo su due righe in modo scomposto, invece di restare su una riga o passare all'hamburger.

**Causa**: con l'aggiunta di "Frammenti" (punto 14), il menu è arrivato a 8 voci. Il breakpoint che nasconde `.nav-links` e mostra l'hamburger era fissato a 980px — lo stesso usato per tutti gli altri riflussi del layout (gallerie, card, ecc.). Con 8 voci, però, il menu desktop completo serve **circa 1.190px** di larghezza per stare su una riga (misurato riproducendo i font-metric reali, non a occhio): tra 980px e quella soglia, il testo dei link — e persino il nome del brand — andava a capo, esattamente come nello screenshot.

**Correzione**:
- Nuovo breakpoint **dedicato alla nav**, separato da quello degli altri contenuti: `.nav-links`/`.nav-toggle` ora cambiano a **1280px** (non più 980px), lasciando ~90px di margine di sicurezza rispetto al fabbisogno reale calcolato. Il breakpoint a 980px resta, invariato, solo per gallerie/card/statistiche.
- `gap` di `.nav-links` ridotto da 30px a 24px, per un po' di margine in più.
- Aggiunto `white-space: nowrap` a `.nav-links a` e `.brand-name`: rete di sicurezza per evitare che il testo vada mai più a capo, qualunque combinazione di zoom/font del browser.

**Verifica**: non sono riuscito a generare uno screenshot reale — l'ambiente sandbox non ha un browser headless preinstallato e il download di Chromium via Playwright (~177 MB) va oltre il limite di tempo di una singola chiamata, senza possibilità di proseguirlo in background tra una chiamata e l'altra. Ho verificato la correzione misurando la larghezza reale del testo con i font disponibili in sandbox (un'approssimazione dei font del sito, leggermente più larga — quindi una stima prudente) e rileggendo il CSS/JS del menu mobile (invariato, logica già funzionante in precedenza). Se possibile, una controllata visiva rapida su browser reale — desktop a larghezza ridotta e mobile — resta consigliata.

## 16. In sintesi

Sito solido, leggero nel codice (nessuna dipendenza da mantenere/aggiornare), ben curato dal punto di vista dell'accessibilità di base (aria-label, rispetto reduced-motion) ma con margine di miglioramento su SEO/social e peso immagini. Il rischio operativo principale non è nel codice del sito ma nella convivenza tra git e la sincronizzazione OneDrive della cartella del repository.
