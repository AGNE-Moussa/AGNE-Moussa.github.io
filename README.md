# Portfolio de Moussa Agne

Site personnel : [agne-moussa.github.io](https://agne-moussa.github.io)

Application React construite avec Vite et Framer Motion, déployée automatiquement sur GitHub Pages par GitHub Actions.

## Fonctionnalités

- Animation interactive d'un marcheur en *point-light* (canvas) : il se tourne vers le curseur, accélère quand on s'en approche, et peut afficher son squelette.
- Fenêtre de code qui se tape toute seule, terminal qui rejoue la suite de tests de LabTrack.
- Filtres de projets animés, cartes avec effet de profondeur au survol.
- Frise chronologique qui se remplit au défilement, barre de progression de lecture.
- Formulaire de contact avec validation, envoyé par e-mail via [FormSubmit](https://formsubmit.co), sans serveur.
- Responsive, navigable au clavier, animations désactivées si l'utilisateur les a réduites dans son système.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run lint
```

## Modifier le contenu

Tout le texte (profil, projets, compétences, parcours) est dans `src/data.js`.

## Structure

```
src/
  data.js              contenu du site
  App.jsx              assemblage des sections
  styles.css           styles
  components/
    Walker.jsx         animation point-light (canvas)
    CodeWindow.jsx     code animé de l'en-tête
    Terminal.jsx       terminal de LabTrack
    Nav.jsx  Hero.jsx  About.jsx  Projects.jsx
    Skills.jsx  Timeline.jsx  Contact.jsx  Reveal.jsx  Icons.jsx
.github/workflows/deploy.yml   déploiement GitHub Pages
```
