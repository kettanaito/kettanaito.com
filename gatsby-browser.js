require('firebase/database')
require('./src/styles/main.css')

function initDarkMode() {
  const localPreference = localStorage.getItem('theme-mode')
  if (
    localPreference === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
initDarkMode()
