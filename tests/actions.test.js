import { showMenu, hideMenu, MENU_SHOW, MENU_HIDE } from '../src/actions';

let showCallback = null;
let hideCallback = null;
let eventObj = {};

describe('actions test', () => {
    beforeAll(() => {
        showCallback = jest.fn(e => {
            eventObj = e;
        });
        window.addEventListener(MENU_SHOW, showCallback);

        hideCallback = jest.fn(e => {
            eventObj = e;
        });
        window.addEventListener(MENU_HIDE, hideCallback);
    });

    test('showMenu', () => {
        showMenu();
        expect(showCallback).toHaveBeenCalled();
        expect(eventObj.type).toBe(MENU_SHOW);
    });

    test('hideMenu', () => {
        hideMenu();
        expect(hideCallback).toHaveBeenCalled();
        expect(eventObj.type).toBe(MENU_HIDE);
    });

    afterAll(() => {
        window.removeEventListener(MENU_SHOW, showCallback);
        window.removeEventListener(MENU_HIDE, hideCallback);
    });
});
