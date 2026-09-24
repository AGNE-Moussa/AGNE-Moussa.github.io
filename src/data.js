// Tout le contenu du site est ici : modifier ce fichier suffit pour mettre à jour le portfolio.

export const PROFILE = {
  name: 'Moussa Agne',
  email: 'agnemoussa019@gmail.com',
  github: 'https://github.com/AGNE-Moussa',
  linkedin: 'https://www.linkedin.com/in/moussa-agne',
}

// Envoi du formulaire de contact via FormSubmit (https://formsubmit.co).
// Après la première soumission, FormSubmit envoie un e-mail d'activation :
// une fois activé, vous pouvez remplacer l'adresse par l'identifiant aléatoire fourni
// pour ne plus exposer l'e-mail dans le code.
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${PROFILE.email}`

export const NAV = [
  { id: 'apropos', label: 'À propos' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

export const NOW = {
  title: 'Ce sur quoi je travaille',
  where: 'CeRCA, CNRS et Université de Poitiers, depuis septembre 2026',
  points: [
    "Conception et développement du prototype d'un outil web de rééducation des troubles moteurs et du langage, fondé sur l'observation d'actions.",
    'Génération de séances personnalisées pour les patients, validées par le praticien, puis évaluation automatisée des réponses.',
    'Automatisation en Python de traitements de stimuli vidéo existants sous MATLAB.',
    'Prise en compte des exigences liées aux données de santé.',
  ],
  stack: ['Symfony', 'Python', 'PostgreSQL', 'MATLAB', 'Docker', 'Git'],
}

export const FEATURED = {
  name: 'LabTrack',
  kind: "Gestion d'études de recherche",
  url: 'https://github.com/AGNE-Moussa/labtrack',
  intro:
    "Une application web où chaque chercheur crée, suit, recherche et filtre ses projets d'étude, avec une isolation stricte des données entre utilisateurs.",
  ai: "Développée avec Claude Code comme binôme de programmation : conventions de projet, permissions encadrées, sous-agents de revue de code et d'écriture de tests, une branche par fonctionnalité. L'agent écrivait le code ; je gardais l'architecture et la validation.",
  points: [
    'API Django REST Framework sécurisée par JWT, avec renouvellement automatique du token et limitation des inscriptions.',
    "Recherche plein texte, filtres, tri et pagination, conservés dans l'URL.",
    'Interface React et TypeScript, responsive, avec tableau de bord par statut.',
    '44 tests backend, intégration continue GitHub Actions, environnement Docker Compose.',
  ],
  stack: ['Django REST Framework', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'GitHub Actions'],
}

export const PROJECTS = [
  {
    name: 'CollabAnnotate',
    desc: "Plateforme collaborative d'annotation d'images, avec pré-annotation automatique par un modèle de vision YOLOv8. Réalisée pendant mon Master à l'INSA Hauts-de-France.",
    stack: ['Django REST', 'React', 'YOLOv8', 'JWT'],
    tags: ['Python', 'React', 'IA'],
    note: 'Code non public',
  },
  {
    name: 'E-commerce en microservices',
    desc: 'Gestion des produits et des commandes répartie en services indépendants, avec découverte de services et répartition de charge.',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'Eureka'],
    tags: ['Java'],
    url: 'https://github.com/AGNE-Moussa/Developpement-d-application-e-commerce-avec-Spring-Boot',
  },
  {
    name: 'API bancaire',
    desc: "API REST de gestion de comptes et d'opérations bancaires, organisée en couches : contrôleurs, services, accès aux données.",
    stack: ['Java', 'Spring Boot', 'SQL'],
    tags: ['Java'],
    url: 'https://github.com/AGNE-Moussa/Developpement-d-API-RESTful-pour-un-systeme-bancaire-avec-Java-Spring-Boot',
  },
  {
    name: 'Application CRUD avec FastAPI',
    desc: 'API REST en FastAPI associée à une interface web légère en HTML et JavaScript.',
    stack: ['Python', 'FastAPI', 'JavaScript'],
    tags: ['Python'],
    url: 'https://github.com/AGNE-Moussa/Application-CRUD-avec-FastAPI',
  },
  {
    name: 'Calculateur de checksum conteneurisé',
    desc: "Application Flask qui calcule l'empreinte d'une chaîne de caractères selon l'algorithme choisi, livrée sous forme de conteneur Docker.",
    stack: ['Python', 'Flask', 'Docker'],
    tags: ['Python', 'DevOps'],
    url: 'https://github.com/AGNE-Moussa/Dockerisation-d-une-Application-Python-Flask-Checksum-Calculator',
  },
]

export const FILTERS = ['Tous', 'Python', 'React', 'Java', 'IA', 'DevOps']

export const SKILLS = [
  { group: 'Back-end', items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'Symfony (PHP)', 'Spring Boot (Java)'] },
  { group: 'Front-end', items: ['React', 'TypeScript', 'Interfaces responsives'] },
  { group: 'Données', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { group: 'DevOps et outils', items: ['Docker', 'Docker Compose', 'GitHub Actions', 'GitLab CI', 'Git', 'Linux', 'Notion'] },
  { group: 'IA et calcul scientifique', items: ['LLM', 'RAG', 'LangChain', 'YOLOv8', 'MATLAB'] },
  { group: 'Méthodes', items: ['Tests automatisés', 'Revue de code', 'Claude Code', 'Conventional Commits'] },
]

export const TIMELINE = [
  {
    date: '2026',
    title: 'Ingénieur de recherche',
    org: 'CNRS, CeRCA, Poitiers',
    text: "Développement d'une solution numérique de rééducation clinique.",
    current: true,
  },
  {
    date: '2025',
    title: 'Ingénieur R&D, développement Python et Django (stage)',
    org: 'Natural Grass, Paris',
    text: 'Plateforme IoT de suivi agronomique de terrains sportifs : heatmaps interactives, validation automatique des données, tests Pytest, déploiement Docker et monitoring Grafana.',
  },
  {
    date: '2023 – 2025',
    title: 'Master Informatique, parcours TNSID',
    org: 'INSA Hauts-de-France',
    text: "Technologies Nouvelles des Systèmes d'Information et Décisionnels.",
  },
  {
    date: '2023',
    title: 'Administration de réseau SDN avec les outils DevOps (stage)',
    org: 'ESTM, Dakar',
    text: "Mise en place et configuration d'un réseau SDN avec Open vSwitch et OpenDaylight.",
  },
  {
    date: '2020 – 2023',
    title: 'Licence Réseaux informatiques et télécommunications',
    org: 'ESTM, Dakar',
    text: 'Mention Bien.',
  },
]
