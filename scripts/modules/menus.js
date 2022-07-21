
/* It takes an object as input, and creates a menu based on the object's properties */
export class menuObject {
    constructor() {
        this.container = {};
    }

    /**
     * It takes an item object and a menu object and creates a menu item based on the object.
     * @param item - The item of the menu to build.
     * @param menu - The menu the item gets attached to.
     */
    #itemType(item, menu) {
        let p, info, link, button, header;
        Object.keys(item).forEach(key => {
            info = item[key];
            p = create('p');
            switch (key.split('_')[0]) {
                case 'link':
                    link = create('a');
                    link.href = info.href;
                    p.innerText = info.text;
                    if (check.ifExists(info.class) === true) {
                        addClassList(p, info.class);
                    }
                    link.appendChild(p);
                    menu.li.appendChild(link);
                    break;

                case 'button':
                    button = create('button');
                    if (check.ifExists(info.id) === true) {
                        addID(button, info.id);
                    }
                    if (check.ifExists(info.class) === true) {
                        addClassList(button, info.class);
                    }
                    button.innerText = info.text;
                    menu.item.appendChild(button);
                    break;
                case 'header':
                    header = create('h2');
                    if (check.ifExists(item.header) === true) {
                        header.innerText = item.header;
                    }
                    menu.item.appendChild(header);
                    break;
                case 'class':
                    if (check.ifExists(item.class) === true) {
                        addClassList(menu.item, item.class);
                    }
                    break;

                default:
                    console.error('Unable to make item type:', Object.keys(item), menu)
                    break;
            }
        })
    }

    /**
     * It creates a menu with a header and a list of items.
     */
    #ulType() {
        const type = typeStart(this.container);
        type.menu.body = create('div')

        check.forClass(type.menu, type.info)
        check.forID(type.menu, type.info)

        addClassList(type.menu.body, type.menu.class)

        if (check.ifExists(type.info.headerText) === true) {
            type.menu.p = create('p')
            type.menu.p.innerText = type.info.headerText
            type.menu.item = create('div')
            addClassList(type.menu.item, `${type.menu.class}-header`)
            addClassList(type.menu.p, `${type.menu.class}-title`)
            type.menu.item.appendChild(type.menu.p)
            type.menu.body.appendChild(type.menu.item)
        }

        type.menu.item = create('div');
        type.menu.body.appendChild(type.menu.item);
        type.menu.ul = create('ul');
        addClassList(type.menu.item, `${type.menu.class}-menu`);
        addClassList(type.menu.ul, `${type.menu.class}-list`);
        type.menu.item.appendChild(type.menu.ul);

        if (check.ifExists(type.info.menuItems) === true) {
            Object.keys(type.info.menuItems).forEach(key => {
                type.menu.li = create('li');
                this.#itemType(type.info.menuItems[key], type.menu);
                type.menu.ul.appendChild(type.menu.li);
            });
        } else {
            console.error('Container object is missing menuItems.');
            return;
        }

        check.attachment(type.info, type.menu);
    }

    /**
     * It creates a menu with a button and items.
     */
    #divType() {
        const type = typeStart(this.container);
        type.menu.body = create('div');
        check.forClass(type.menu, type.info);
        addClassList(type.menu.body, type.menu.class);
        if (check.ifExists(type.info.headerText) === true) {
            type.menu.button = create('button');
            type.menu.button.innerText = type.info.headerText;
            addID(type.menu.button, 'menuToggle');
            addClassList(type.menu.button, 'menuButton');
            type.menu.body.appendChild(type.menu.button);
        };
        type.menu.items = create('div');
        type.menu.body.appendChild(type.menu.items);
        addID(type.menu.items, 'menuItems');
        if (check.ifExists(type.info.menuItems) === true) {
            Object.keys(type.info.menuItems).forEach(itemKey => {
                type.menu.item = create('div');
                this.#itemType(type.info.menuItems[itemKey], type.menu);
                type.menu.items.appendChild(type.menu.item);
            })
        }
        check.attachment(type.info, type.menu);
    }

    /* A method that is part of a class. It is checking the input to make sure it is an object and that
    it has a property called menuType. If it does not have a property called menuType it will return
    an error. If it does have a property called menuType it will call a method based on the value of
    menuType. */
    buildMenu() {
        if (check.isEmpty.object(this.container) === true) {
            return console.log('buildMenu() input is empty.');
        };
        if (check.isObject(this.container) === false) {
            return console.error('buildMenu() input is not an Object.');
        };
        if (check.ifExists(this.container.menuType) === false) {
            return console.error('Container object is missing a menuType');
        };
        switch (this.container.menuType) {
            case 'ul': this.#ulType(); break;
            case 'div': this.#divType(); break;
            default: console.error('No meneType set.'); break;
        };
    };
};

/* A set of functions that check if the input is what it is supposed to be. */
const check = {
    attachment: (info, menu) => {
        if (check.ifExists(info.attachTo) === false) {
            return console.error('Container object is missing an attachTO.');
        }
        attachTo(info.attachTo, menu.body);
    },
    isEmpty: {
        object: (ob) => {
            if (check.isObject(ob) === false) {
                return console.error('Input is not an Object.');
            }
            return Object.keys(ob).length === 0;
        },
        array: (array) => {
            if (check.isArray(array) === false) {
                return console.error('Input is not an Array.');
            }
            return array.length === 0;
        }
    },
    isObject: (item) => {
        if (Array.isArray(item) === true) {
            return false;
        }
        return typeof item === 'object';
    },
    isArray: (item) => {
        return Array.isArray(item);
    },
    isTypeOf: (item, type) => {
        return typeof item === type;
    },
    isElement: (element) => {
        return element instanceof Element || element instanceof Document;
    },
    ifExists: (item) => {
        return typeof item !== 'undefined';
    },
    forClass: (item, inputClass) => {
        if (check.ifExists(inputClass.class) === false) {
            console.log("Container object doesn't have a class. Class has been set to a default of menu.");
            item.class = 'menu'
            return;
        }
        item.class = inputClass.class;
    },
    forID: (item, inputID) => {
        if (check.ifExists(inputID.id) === false) {
            return;
        }
        addID(item.body, inputID.id)
    }
}

/**
 * The function typeStart takes a container and returns an object with a property info that is equal to
 * the container and a property menu that is equal to an empty object.
 * @param container - The container that holds the menu.
 * @returns An object with a property called info and a property called menu.
 */
const typeStart = (container) => {
    if (check.isObject(container) === false) {
        return console.error('typeStart input is not an Object.')
    }
    const type = {};
    type.info = container;
    type.menu = container.menu = {};
    return type;
}

/**
 * It creates a new element.
 * @param item - The item you want to create.
 * @returns A function that takes an argument and returns a DOM element.
 */
const create = (item) => {
    if (check.isTypeOf(item, 'string') === false) {
        return console.error('Input for create is not a string.')
    }
    return document.createElement(item);
};

/**
 * It returns an array of elements with the class, id, or tag name specified in the input string
 * @param item - The item to get the elements of.
 * @returns the elements that match the input.
 */
const getElements = (item) => {
    if (check.isTypeOf(item, 'string') === false) {
        return console.error('getElements() input is not a string.');
    }

    switch (item.charAt(0)) {
        case '.':
            return document.getElementsByClassName(item.slice(1));
        case '#':
            return document.getElementById(item.slice(1));
        default:
            return document.getElementsByTagName(item);
    }
};

/**
 * This function takes a parent element and a child element and attaches the child to the parent.
 * @param parent - The parent element to attach the child to.
 * @param child - The element you want to attach to the parent.
 */
const attachTo = (parent, child) => {
    const to = getElements(parent);
    if (check.isEmpty.object(to) === false) {
        to[0].appendChild(child)
        return;
    }
    to.appendChild(child)
}

/**
    * It adds a class to an element.
    * @param item - The element you want to add the class to.
    * @param classList - Array or single class.
    */
const addClassList = (item, classList) => {
    if (check.isElement(item) === false) {
        return console.error('addClassList() input is not an element.');
    };

    switch (check.isArray(classList)) {
        case true:
            classList.forEach(element => {
                if (check.isTypeOf(element, 'string') === false) {
                    return console.error('element is not a string.');
                };
                item.classList.add(element);
            });
            break;
        case false:
            if (check.isTypeOf(classList, 'string') === false) {
                return console.error('classList is not a string.');
            };
            item.classList.add(classList);
            break;

        default:
            console.error('Type of classList is noy what is excepted. typeof:', typeof classList)
            break;
    };
}

/**
 * AddID() adds an ID to an element.
 * @param item - The element you want to add an ID to.
 * @param id - The id you want to add to the element.
 */
const addID = (item, id) => {
    if (check.isElement(item) === false) {
        return console.error('addID() input is not an element.');
    }
    if (check.isTypeOf(id, 'string') === false) {
        return console.error('addID() input is not a string.');
    }
    item.id = id
}