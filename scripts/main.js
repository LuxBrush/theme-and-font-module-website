import * as get from './modules/common.js'
import * as make from './modules/menus.js'
import * as run from './modules/functions.js'

const mainNav = new make.menuObject();
const setting = new make.menuObject();

/* Creating a new menuObject and then calling the buildMenu function on it. */
mainNav.container = get.nav;
mainNav.buildMenu();

setting.container = get.settingMenu;
setting.buildMenu();

const menuButton = document.getElementById('menuToggle');
const menuItems = document.getElementById('menuItems');

get.themeKeys.forEach(key => {
    get.themes.button = document.getElementById(key)
    get.themes.button.addEventListener('click', () => {
        get.themes.state = key.split('T')[0];
        run.changeSettings(get.themes.state, get);
        run.changeText(get.themes.state, get)
        run.saveData('theme', get.themes.state);
    });
});

get.fontKeys.forEach(key => {
    get.fonts.button = document.getElementById(key);
    get.fonts.button.addEventListener('click', () => {
        get.fonts.state = key.split('F')[0];
        run.changeSettings(get.fonts.state, get);
        run.changeText(get.fonts.state, get)
        run.saveData('font', get.fonts.state);
    });
});

menuButton.addEventListener('click', () => {
    get.menuState.menuToggle();
    run.saveData('menuState', get.menuState.state);
    menuItems.style.display = get.menuState.state;
});

run.displayDPI();

run.loadPage(get);

get.fonts.sheet.addEventListener('load', () => {
    run.updateMargin(get);
});

window.addEventListener('resize', () => {
    run.updateMargin(get);
});