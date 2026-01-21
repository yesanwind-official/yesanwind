// SSR hydration mismatch 방지를 위한 인라인 스크립트
// 페이지 로드 시 즉시 실행되어 FOUC(Flash of Unstyled Content) 방지

export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        var storageKey = 'theme-storage';
        var stored = localStorage.getItem(storageKey);
        var theme = 'system';

        if (stored) {
          var parsed = JSON.parse(stored);
          if (parsed.state && parsed.state.theme) {
            theme = parsed.state.theme;
          }
        }

        var resolved = theme;
        if (theme === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolved);
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
