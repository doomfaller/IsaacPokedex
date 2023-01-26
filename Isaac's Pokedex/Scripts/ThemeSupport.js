function initUserPreferredTheme() {

    let theme = localStorage.getItem('theme');

    if (theme) {
        applyTheme(theme);
        return;
    }

    const mqlDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const mqlLightTheme = window.matchMedia('(prefers-color-scheme: light)');

    mqlDarkTheme.addEventListener('change', themeChange);
    mqlLightTheme.addEventListener('change', themeChange);
 
    if (mqlDarkTheme.matches) {
        applyTheme('Dark');
        saveTheme('Dark');
    } else if (mqlLightTheme.matches) {
        applyTheme('Light');
        saveTheme('Light');
    } else {
        applyTheme('Light')
        saveTheme('Light');
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

function saveTheme(currentTheme) {
    localStorage.setItem('theme', currentTheme);
}

function toggleTheme(currentTheme) {
    if (currentTheme == 'Light') {
        applyTheme('Dark')
        saveTheme('Dark')
    }
    else {
        applyTheme('Light')
        saveTheme('Light')
    }
}
