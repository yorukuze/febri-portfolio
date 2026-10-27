export const profile = {
  name: 'M. Febri Setiawan',
  role: 'Software Engineering Student',
  bioIntro: "I'm a software engineering student passionate about building useful things — from desktop apps and websites to games and tools.",
  location: 'Bogor',
  timezone: 'Asia/Jakarta',
  phone: '0858 1746 9629',
  email: 'mfebriebyii@gmail.com',
  call: 'https://wa.me/6285817469629',
  resume: '',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  x: 'https://x.com'
};

export const companies = {
  smkbm: {
    name: 'SMK Bina Mandiri Multimedia',
    logo: '/logos/smkbm.png',
    url: 'https://smkbinamandirimultimedia.sch.id/',
    host: 'smkbinamandirimultimedia.sch.id',
    preview: '/previews/smkbm.jpg',
    note: 'Rekayasa Perangkat Lunak 2024–2025'
  }
};

export enum ProjectKind {
  WEB = 'web',
  MOBILE = 'mobile',
  OSS = 'oss'
}

export enum ProjectFilter {
  ALL = 'all',
  WEB = 'web',
  MOBILE = 'mobile',
  OSS = 'oss'
}

export enum DemoType {
  VIDEO = 'video',
  IMAGE = 'image'
}

export interface DemoItem {
  type: DemoType;
  src: string;
  label: string;
}

export interface ToolItem {
  label: string;
  icon?: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  kind: ProjectKind;
  year: string;
  tagline: string;
  caption: string;
  summary: string;
  url?: string;
  host?: string;
  featured?: boolean;
  stores?: Array<{ label: string; href: string }>;
  client?: { label: string; href: string };
  design?: { label: string; href: string };
  caseStudy?: {
    role: string;
    tools: ToolItem[];
  };
  stack?: ToolItem[];
  demos?: DemoItem[];
}

const projectDemos: Record<string, DemoItem[]> = {};

export const rawProjects: ProjectItem[] = [
  {
    slug: 'ppdb-kasir',
    title: 'PPDB & Sistem Kasir',
    kind: ProjectKind.WEB,
    year: '2025',
    tagline: 'Desktop App',
    caption: 'Aplikasi desktop · PPDB & Kasir',
    summary: 'Aplikasi desktop untuk penerimaan peserta didik baru (PPDB) dan sistem kasir.',
    featured: true
  },
  {
    slug: 'game-platformer',
    title: 'Game Platformer Edukasi',
    kind: ProjectKind.WEB,
    year: '2025',
    tagline: 'Game edukasi',
    caption: 'Game platformer edukasi · Construct 2 & 3',
    summary: 'Game platformer bertema edukasi yang dibuat menggunakan Construct 2 dan Construct 3.',
    featured: true
  },
  {
    slug: 'website-berita',
    title: 'Website Berita',
    kind: ProjectKind.WEB,
    year: '2025',
    tagline: 'Web',
    caption: 'Website berita · HTML & CSS',
    summary: 'Website berita sederhana yang dibuat menggunakan HTML dan CSS.',
    url: '#',
    host: 'localhost',
    featured: true
  },
  {
    slug: 'ppdb-desktop',
    title: 'Aplikasi PPDB Desktop',
    kind: ProjectKind.WEB,
    year: '2025',
    tagline: 'Desktop App',
    caption: 'Aplikasi desktop berbasis GUI',
    summary: 'Aplikasi penerimaan peserta didik baru berbasis desktop.'
  },
  {
    slug: 'game-cpp',
    title: 'Game Ringan C++',
    kind: ProjectKind.WEB,
    year: '2025',
    tagline: 'Game',
    caption: 'Game ringan · C++',
    summary: 'Game ringan yang dibuat menggunakan bahasa pemrograman C++.'
  },
  {
    slug: 'inventory',
    title: 'Aplikasi Inventory',
    kind: ProjectKind.WEB,
    year: '2024',
    tagline: 'Desktop App',
    caption: 'Manajemen inventaris',
    summary: 'Aplikasi manajemen inventaris untuk pencatatan barang masuk dan keluar.',
    featured: true
  },
  {
    slug: 'ui-figma',
    title: 'UI Website — Figma',
    kind: ProjectKind.WEB,
    year: '2024',
    tagline: 'UI Design',
    caption: 'Desain UI · Figma',
    summary: 'Desain antarmuka website menggunakan Figma.'
  },
  {
    slug: 'kalkulator-python',
    title: 'Kalkulator Python',
    kind: ProjectKind.WEB,
    year: '2024',
    tagline: 'Python',
    caption: 'Kalkulator sederhana · Python',
    summary: 'Aplikasi kalkulator sederhana menggunakan Python.',
    featured: true
  },
  {
    slug: 'perpustakaan-python',
    title: 'Sistem Perpustakaan',
    kind: ProjectKind.WEB,
    year: '2024',
    tagline: 'Python',
    caption: 'Manajemen perpustakaan · Python',
    summary: 'Sistem manajemen perpustakaan menggunakan Python.',
    featured: true
  }
];

export const featuredSlugs = ['ppdb-kasir', 'game-platformer', 'website-berita', 'inventory', 'kalkulator-python', 'perpustakaan-python'];

export const experience = [
  { company: companies.smkbm, description: 'Rekayasa Perangkat Lunak — active student', current: true }
];

export const freelanceExperience = {
  title: 'School Projects',
  description: 'Desktop apps, games, websites, and tools built during school',
  logos: [companies.smkbm]
};

export const toolboxCategories = [
  {
    label: 'Web',
    tools: [
      { label: 'HTML', icon: 'html' },
      { label: 'CSS', icon: 'css' },
      { label: 'PHP', icon: 'php' }
    ]
  },
  {
    label: 'Programming',
    tools: [
      { label: 'Python' },
      { label: 'C++' }
    ]
  },
  {
    label: 'Design',
    tools: [
      { label: 'Figma', icon: 'figma' }
    ]
  },
  {
    label: 'Game Dev',
    tools: [
      { label: 'Construct 2' },
      { label: 'Construct 3' }
    ]
  }
];

export const projects: ProjectItem[] = rawProjects.map(p => {
  const item = { ...p };
  item.demos = projectDemos[item.slug];
  return item;
});

export const isCaseStudy = (project: ProjectItem) => project.kind === ProjectKind.MOBILE || !!project.caseStudy;
export const getProjectLink = (project: ProjectItem) => isCaseStudy(project) ? `/work/${project.slug}` : (project.url ?? `/work/${project.slug}`);
export const findProject = (slug: string) => projects.find(p => p.slug === slug);
export const getProjectIndex = (slug: string) => String(projects.findIndex(p => p.slug === slug) + 1).padStart(2, '0');
export const getKindLabel = (kind: ProjectKind) => kind === ProjectKind.MOBILE ? 'iOS & Android' : kind === ProjectKind.OSS ? 'Open source' : 'Web';
