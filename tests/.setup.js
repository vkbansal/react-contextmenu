const jsdom = require('jsdom');

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.document = jsdom.jsdom(documentHTML);
global.window = document.parentWindow;
global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = width || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
    global.window.requestAnimationFrame = jest.fn();
};
