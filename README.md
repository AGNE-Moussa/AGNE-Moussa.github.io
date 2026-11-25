# Portfolio de Moussa Agne

[![pipeline](https://gitlab.com/AGNE-moussa/portfolio/badges/main/pipeline.svg)](https://gitlab.com/AGNE-moussa/portfolio/-/pipelines)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)

Site personnel : [agne-moussa.github.io](https://agne-moussa.github.io)

Application React construite avec Vite et Framer Motion : présentation, projets, compétences, parcours, certifications et formulaire de contact.

## Fonctionnalités

- En-tête avec titre animé façon machine à écrire
- Terminal qui « rejoue » la suite de tests de LabTrack lorsqu'il apparaît à l'écran
- Filtres de projets animés, cartes avec effet de profondeur au survol
- Frise chronologique et apparitions progressives au défilement
- Liste de certifications avec liens de vérification
- Formulaire de contact validé, envoyé par e-mail via [FormSubmit](https://formsubmit.co), sans serveur
- Responsive, navigable au clavier ; animations désactivées si l'utilisateur les a réduites dans son système

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # oxlint
npm run build    # génère dist/
```

## Modifier le contenu

Tout le texte (profil, projets, compétences, parcours, certifications) est centralisé dans `src/data.js`.

## Structure

```
src/
├── data.js                 contenu du site
├── App.jsx                 assemblage des sections
├── styles.css
└── components/
    ├── Hero.jsx  Typewriter.jsx       en-tête et titre animé
    ├── About.jsx  Skills.jsx  Timeline.jsx  Certifications.jsx
    ├── Projects.jsx                   filtres et cartes de projets
    ├── Terminal.jsx                   terminal de LabTrack
    ├── Contact.jsx                    formulaire (FormSubmit)
    └── Nav.jsx  Reveal.jsx  Icons.jsx
cv/cv.html                  source du CV (PDF généré depuis ce fichier)
og/                         images de partage (Open Graph, bannière LinkedIn)
.gitlab-ci.yml              lint et build à chaque push
```

## Stack technique

React 19, Vite, Framer Motion, lucide-react, oxlint, GitLab CI.
