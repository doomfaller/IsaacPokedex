function initUserPreferredTheme() {
    const mqlDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const mqlLightTheme = window.matchMedia('(prefers-color-scheme: light)');

    mqlDarkTheme.addEventListener('change', themeChange);
    mqlLightTheme.addEventListener('change', themeChange);
 
    if (mqlDarkTheme.matches) {
        applyTheme('Dark');
    } else if (mqlLightTheme.matches) {
        applyTheme('Light')
    } else {
        applyTheme('Light')
    }

}

function applyTheme(preferredTheme) {
    displayStyle = document.body.style.display;
    document.body.style.display = 'none';
    themeLink = `<link rel="stylesheet" href="CSS/${preferredTheme}Theme.css" theme="${preferredTheme}">`;
    document.head.insertAdjacentHTML('beforeend', themeLink);
    document.body.style.display = displayStyle;
}

function removeThemes() {
    /* Clean up themes */
    const currentThemes = document.querySelectorAll('[theme]');
    for (let i = currentThemes.length - 1; i > -1; i--) {
        currentThemes[i].remove();
    }
}

function themeChange() {
    removeThemes();
    initUserPreferredTheme();
}