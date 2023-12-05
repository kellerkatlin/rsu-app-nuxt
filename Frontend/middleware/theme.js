export default function ({ store, app }) {
    const theme = store.state.theme.theme;
    const link = document.querySelector('link[rel="stylesheet"][href*="theme"]');
    if (link) {
      link.href = `/themes/${theme}/theme.css`;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = `/themes/${theme}/theme.css`;
      document.head.appendChild(newLink);
    }
  }