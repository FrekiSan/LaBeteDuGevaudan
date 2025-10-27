# La Bête du Gévaudan

Application web pour l'escape game "La Bête du Gévaudan" combinant un front statique, une API PHP et un back Tomcat.

## Aperçu

![Capture d'écran 1](docs/screenshot1.png)
![Capture d'écran 2](docs/screenshot2.png)

## Démo rapide
- Lancer: `cp .env.example .env && docker compose up -d --build`
- Ouvrir: `http://localhost:8080`
- Compte: `demo@gevaudan.test` / `demo1234`

## Démarrage local
Consultez [README_INSTALL.md](README_INSTALL.md) pour les instructions détaillées d'installation et de déploiement.

## Reverse proxy / Production
Si vous exposez l'application derrière Nginx (ou un autre reverse proxy), assurez-vous d'appliquer des en-têtes de sécurité minimaux :

```nginx
# Dans le bloc server {}
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:;" always;
```

## Licence
Publié sous licence [MIT](LICENSE).
