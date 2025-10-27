
# Escape Front — Pack complet (auth + timer + classement)

Ce paquet contient :
- `index.html` (login/logout/register + timer connecté + bouton Démarrer verrouillé tant que non connecté + modale Classement connectée)
- `ending.html` (scelle le temps via `/api/complete_run.php` et ouvre le Top 100 depuis la BdD)
- `histoire.html`, `enigmeintro.html`, `enigme7.html` → `enigme14.html` (header unifié, `<span id="timer"></span>`, modale Classement connectée)
- `assets/js/app.js` (patch complet pour lier le front à l'API PHP)

## Installation
1. Sauvegardez vos fichiers actuels.
2. Dézippez **le contenu** de ce pack **dans la racine** de votre site.
   - Remplacez `index.html`, `ending.html` et les pages d'énigmes correspondantes.
   - Remplacez `assets/js/app.js`.
3. Assurez-vous que le backend est présent avec ces endpoints :
   - `POST /api/register.php`, `POST /api/login.php`, `POST /api/logout.php`
   - `GET /api/me.php`, `POST /api/start_run.php`, `POST /api/complete_run.php`
   - `GET /api/leaderboard.php`
4. Vérifiez que vos handlers puzzle existent encore dans `assets/js/` :
   - `ordreClicHandler.js` (intro)
   - `zoneTexteHandler.js`, `zoneTexteHandlerNoDelay.js` (7, 8, 14)
   - `pianoHandler.js` (10)
   - `motDePasseHandler.js` (11, 12)
   - (Facultatif) `flecheDirectionHandler.js` si utilisé ailleurs

## Notes
- Le timer est piloté par `#timer` (format mm:ss.mmm). Ne plus utiliser `#time` ni le bouton "Reset".
- Le Top 100 est chargé automatiquement quand la modale Classement s'ouvre.
- Le bouton Démarrer est désactivé tant que l'utilisateur n'est pas connecté.
