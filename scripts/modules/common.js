export const exampleText = {
    themeIDClass: document.getElementsByClassName('themeID'),
    fontFamilyClass: document.getElementsByClassName('fontFamily'),
    fontNamesClass: document.getElementsByClassName('fontNames'),
    colorClass: document.getElementsByClassName('color'),
    colorBgClass: document.getElementsByClassName('colorBG'),
    hexColor: document.getElementsByClassName('hexColor'),
    fontSetting: document.getElementsByClassName('fontSettings'),
    light: {
        primary: '#9ac6ff',
        primaryVariant: '#5478e6',
        secondary: '#03DAC6',
        secondaryVariant: '#018786',
        background: '#ffffff',
        surface: '#ffffff',
        error: '#B00020',
        onPrimary: '#000000',
        onSecondary: '#000000',
        onBackground: '#000000',
        onSurface: '#000000',
        onError: '#ffffff',
        alphaColor: '#00000000',
    },
    dark: {
        primary: '#0C072E',
        primaryVariant: '#99715A',
        secondary: '#03DAC6',
        secondaryVariant: '#008CAC',
        background: '#010003',
        surface: '#0C072E',
        error: '#BF3207',
        onPrimary: '#ffffff',
        onSecondary: '#000000',
        onBackground: '#ffffff',
        onSurface: '#ffffff',
        onError: '#000000',
        alphaColor: '#00000000',
    },
    oswald: {
        rootFontSize: '1.238px',
        fontTop: '-2px',
        fontBottom: '2px',
        indent: '1.7ch',
    },
    roboto: {
        rootFontSize: '1.4px',
        fontTop: '0px',
        fontBottom: '0px',
        indent: '1.6ch'
    },
};

export const menuState = {
    state: 'none',
    states: ['none', 'grid'],
    /* A function that toggles the menu state between 'none' and 'grid'. */
    menuToggle: () => {
        if (menuState.state === 'none') {
            menuState.state = menuState.states[1];
        } else {
            menuState.state = menuState.states[0];
        };
    }
};

export const themeKeys = ['lightTheme', 'darkTheme']
export const themes = {
    state: 'light',
    sheet: document.getElementById('theme'),
    links: {
        light: './themes/light.css',
        dark: './themes/dark.css'
    },
    names: {
        light: 'light',
        dark: 'dark'
    }
};

export const fontKeys = ['oswaldFont', 'robotoFont']
export const fonts = {
    state: 'oswald',
    sheet: document.getElementById('font'),
    links: {
        oswald: './themes/oswald.css',
        roboto: './themes/roboto.css'
    },
    family: {
        oswald: "'Oswald', sans-serif",
        roboto: "'Roboto', sans-serif"
    },
    names: {
        oswald: 'Oswald',
        roboto: 'Roboto'
    }
};

export const nav = {
    attachTo: 'body',
    menuType: 'ul',
    class: 'nav',
    id: 'navID',
    headerText: 'Main Nav:',
    menuItems: {
        home: {
            link_home: {
                class: 'nav-item',
                href: 'index.html',
                text: 'Home'
            }
        },
        howToUse: {
            link_use: {
                class: 'nav-item',
                href: './pages/howToUse.html',
                text: 'How to Use'
            }
        },
        fontDemo: {
            link_font: {
                class: 'nav-item',
                href: './pages/fontDemo.html',
                text: 'Font Demo'
            }
        },
        themeDemo: {
            link_theme: {
                class: 'nav-item',
                href: './pages/themeDemo.html',
                text: 'Theme Demo'
            }
        }
    }
};

export const settingMenu = {
    attachTo: 'body',
    menuType: 'div',
    class: 'menu',
    headerText: 'Menu',
    menuItems: {
        themes: {
            class: 'themeMenu',
            header: 'Themes',
            button_light: {
                id: 'lightTheme',
                class: 'bThemeName',
                text: 'Light'
            },
            button_dark: {
                id: 'darkTheme',
                class: 'bThemeName',
                text: 'Dark'
            }
        },
        fonts: {
            class: 'fontMenu',
            header: 'Fonts',
            button_oswald: {
                id: 'oswaldFont',
                class: 'bFontName',
                text: 'Oswald'
            },
            button_roboto: {
                id: 'robotoFont',
                class: 'bFontName',
                text: 'Roboto'
            },
        }
    }
};

/**
 * The function takes an id string as an argument and returns an object with the element, box, and
 * offset properties.
 * @param id - The id of the element you want to get the box of.
 * @returns An object with the element, box, and offset properties.
 */
export const itemBox = (id) => {
    if (typeof id !== 'string') {
        return console.error('id is not a string.');
    };
    const item = {};
    item.element = document.getElementById(id);
    item.box = item.element.getBoundingClientRect();
    item.offset = {
        height: item.element.offsetHeight,
        width: item.element.offsetWidth
    };
    return item;
}