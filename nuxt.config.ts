import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  app: {
    head: {
      title: 'M. Febri Setiawan · Software Engineering Student',
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'dark'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Software engineering student at SMK Bina Mandiri Multimedia, building desktop apps, websites, games, and Python tools.' },
        { name: 'theme-color', content: '#0b0b0c' }
      ],
      link: [
        { rel: 'icon', href: 'data:,' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
});
