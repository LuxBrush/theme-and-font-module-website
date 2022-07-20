/**
 * It takes an array of elements and a string, and sets the innerText of each element to the string.
 * @param array - the array of elements you want to change the innerText of
 * @param item - The item you want to change the innerText to.
 */
const innerTextLoop = (array, item) => {
    let element;
    for (let index = 0; index < array.length; index++) {
        element = array[index];
        element.innerText = item;
    }
}

/**
 * Loop through the array of elements and set the innerText of each element to the corresponding value
 * in the items object.
 * @param array - the array of elements you want to loop through
 * @param items - The object that contains the data to be displayed.
 */
const itemLoop = (array, items) => {
    let element;
    for (let index = 0; index < array.length; index++) {
        element = array[index];
        element.innerText = Object.values(items)[index];
    }
}

/**
 * It changes the href of the link element to the corresponding link in the get object.
 * @param setting - The setting that the user has selected.
 * @param get - The object that contains all the settings.
 */
export const changeSettings = (setting, get) => {
    switch (setting) {
        case 'light': get.themes.sheet.href = get.themes.links[setting]; break;
        case 'dark': get.themes.sheet.href = get.themes.links[setting]; break;
        case 'oswald': get.fonts.sheet.href = get.fonts.links[setting]; break;
        case 'roboto': get.fonts.sheet.href = get.fonts.links[setting]; break;
        default: console.error('Error: Invalid Setting'); break;
    }
}

/**
 * It takes a state and a get object, and depending on the state, it changes the innerText of the
 * elements in the get object.
 * @param state - light, dark, Oswald, Roboto
 * @param get - is an object that contains all the state information.
 */
export const changeText = (state, get) => {
    switch (state) {
        case 'light':
            innerTextLoop(get.exampleText.themeIDClass, get.themes.names[state])
            innerTextLoop(get.exampleText.colorClass, get.exampleText.light.onPrimary)
            innerTextLoop(get.exampleText.colorBgClass, get.exampleText.light.background)
            itemLoop(get.exampleText.hexColor, get.exampleText.light)
            break;
        case 'dark':
            innerTextLoop(get.exampleText.themeIDClass, get.themes.names[state])
            innerTextLoop(get.exampleText.colorClass, get.exampleText.dark.onPrimary)
            innerTextLoop(get.exampleText.colorBgClass, get.exampleText.dark.background)
            itemLoop(get.exampleText.hexColor, get.exampleText.dark)
            break;
        case 'oswald':
            innerTextLoop(get.exampleText.fontFamilyClass, get.fonts.family[state])
            innerTextLoop(get.exampleText.fontNamesClass, get.fonts.names[state])
            itemLoop(get.exampleText.fontSetting, get.exampleText.oswald)
            break
        case 'roboto':
            innerTextLoop(get.exampleText.fontFamilyClass, get.fonts.family[state])
            innerTextLoop(get.exampleText.fontNamesClass, get.fonts.names[state])
            itemLoop(get.exampleText.fontSetting, get.exampleText.roboto)
            break

        default:
            console.error('Incorrect state. Pleas use light, dark, Oswald, or Roboto.')
            break;
    }
}

/**
 * It takes two arguments, a key and a value, and saves the value to localStorage using the key.
 * @param key - The key to store the data under.
 * @param value - The value to be saved.
 */
export const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * It loads data from localStorage, and if it doesn't exist, it returns the default value.
 * @param key - The key to store the data under.
 * @param defaultValue - The default value to return if the key doesn't exist.
 * @returns The value of the key in localStorage or the defaultValue if the key is not found.
 */
export const loadData = (key, defaultValue) => {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

/**
 * This takes in an object containing state information, and sets up an array of items. It changes the settings and the
 * text based on the stare information.
 * @param get - is an object that contains all the state information.
 */
export const loadPage = (get) => {
    const items = ['theme', 'font'];
    const states = { theme: get.themes.state, font: get.fonts.state };
    items.forEach(item => {
        changeSettings(loadData(item, states[item]), get);
        changeText(loadData(item, states[item]), get);
    });
    get.menuState.state = loadData('menuState', get.menuState.state);
    menuItems.style.display = loadData('menuState', get.menuState.state);
    if (window.innerWidth < 699) {
        get.itemBox('container').element.style.marginBottom = loadData('boxHeight', '121px');
    };
};

/**
 * It updates the margin of the container element to the height of the navbar element.
 * @param get - The get object.
 * @returns the value of the last expression.
 */
export const updateMargin = (get) => {
    if (window.innerWidth > 699) {
        get.itemBox('container').element.style.removeProperty('margin-bottom')
        return;
    }
    let boxHeight = get.itemBox('navID').box.height;
    if (window.innerWidth > 332) {
        boxHeight = 121.4;
    }
    get.itemBox('container').element.style.marginBottom = `${boxHeight}px`;
    saveData('boxHeight', `${boxHeight}px`)
}

/**
 * It takes the device pixel ratio and multiplies it by 20 to get the height of the paragraph element.
 * @returns Nothing.
 */
export const displayDPI = () => {
    const dip = window.devicePixelRatio;
    if (document.getElementById('pHeight') === null) {
        return;
    }
    if (document.getElementById('DPI') === null) {
        return;
    }
    const number = document.getElementById('pHeight'),
        dipText = document.getElementById('DPI'),
        disDPI = 20 * dip,
        dipString = dip.toString().split('.');
    let output = '';
    if (dipString.length === 1) {
        output = dipString[0];
    } else {
        const dec = dipString[1].slice(0, 2)
        output = `${dipString[0]}.${dec}`;
    }
    number.innerText = `${Math.round(disDPI)}px`
    dipText.innerText = output;
}