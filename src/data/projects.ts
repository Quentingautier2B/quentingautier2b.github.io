// Ajoutez, supprimez ou modifiez un objet : la grille et la fenêtre modale s'adaptent seules.
// Add, remove or edit an object: the grid and modal adapt automatically.
export type L = { fr: string; en: string }
export type Project = {
  id: string; title: L; category: L; short: L; description: L; role: L
  tools: string[]; contributions: L[]; tags: string[]
  size?: 'wide' | 'normal'          // card size in the grid
  cover?: string; images?: string[] // paths in /public (ex: '/images/micromega-1.jpg'); empty = placeholder
  links?: { label: string; url: string }[]
}
const TBD: L = { fr: '[À COMPLÉTER]', en: '[TO COMPLETE]' }

export const projects: Project[] = [
  {
    id: 'micromega', size: 'wide',
    title: { fr: 'Micromega', en: 'Micromega' },
    category: { fr: 'COVEN · Jeu de puzzle physique 2D', en: 'COVEN · 2D Physics Puzzle Game' },
    short: { fr: 'Puzzle 2D dessiné à la main, inspiré de l’univers de l’artiste lyonnais Mani.', en: 'Hand-drawn 2D puzzle game inspired by Lyon-based artist Mani.' },
    description: {
      fr: 'Un jeu de puzzle 2D dessiné à la main, dans un univers artistique inspiré du travail de l’artiste lyonnais Mani. Le joueur aide différentes créatures à guider une sphère à travers des environnements verticaux grâce à des interactions basées sur la physique.',
      en: 'A hand-drawn 2D puzzle game set in an artistic universe inspired by the work of Lyon-based artist Mani. Players help different creatures guide a sphere through vertical environments using physics-based interactions.',
    },
    role: { fr: 'Game Designer / Level Designer', en: 'Game Designer / Level Designer' },
    tools: ['[ADD ACTUAL TOOLS]'],
    contributions: [
      { fr: 'Level design', en: 'Level design' },
      { fr: 'Documentation de game design', en: 'Game design documentation' },
      { fr: 'Playtests', en: 'Playtesting' },
      { fr: 'Rapports de bugs', en: 'Bug reporting' },
      { fr: 'Itérations de gameplay', en: 'Gameplay iteration' },
    ],
    tags: ['Game Design', 'Level Design', 'Puzzle Design', 'Documentation'],
    links: [],
  },
  {
    id: 'personal', 
    title: { fr: 'Projets personnels', en: 'Personal Projects' },
    category: { fr: 'Placeholder · Projets personnels', en: 'Placeholder · Personal projects' },
    short: { fr: '[Emplacement modifiable pour vos projets personnels.]', en: '[Editable placeholder for your personal projects.]' },
    description: { fr: '[Décrivez ici vos projets personnels : concept, objectifs, résultats.]', en: '[Describe your personal projects here: concept, goals, outcomes.]' },
    role: TBD, tools: ['[TO COMPLETE]'], contributions: [TBD], tags: ['Game Design', 'Prototyping'],
  },
  {
    id: 'studies',
    title: { fr: 'Études de Game & Level Design', en: 'Game Design & Level Design Studies' },
    category: { fr: 'Placeholder · Prototypes & exercices', en: 'Placeholder · Prototypes & exercises' },
    short: { fr: '[Emplacement modifiable : prototypes, exercices de level design, documentation.]', en: '[Editable placeholder: prototypes, level design exercises, documentation.]' },
    description: { fr: '[Décrivez ici vos prototypes expérimentaux, exercices de level design et documents de conception.]', en: '[Describe your experimental prototypes, level design exercises and design documents here.]' },
    role: TBD, tools: ['[TO COMPLETE]'], contributions: [TBD], tags: ['Level Design', 'Documentation'],
  },
]
