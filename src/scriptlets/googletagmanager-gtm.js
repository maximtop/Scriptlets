import { hit } from '../helpers/hit';
import { noop } from '../helpers/noop';

/**
 * Mocks Google Tag Maneger API
 *
 * Related UBO scriptlet:
 * https://github.com/gorhill/uBlock/blob/a94df7f3b27080ae2dcb3b914ace39c0c294d2f6/src/web_accessible_resources/googletagmanager_gtm.js
 */
export function GoogleTagManagerGtm(source) {
    window.ga = window.ga || noop;
    const { dataLayer } = window;
    if (dataLayer instanceof Object === false) {
        return;
    }

    if (dataLayer.hide instanceof Object && typeof dataLayer.hide.end === 'function') {
        dataLayer.hide.end();
    }

    if (typeof dataLayer.push === 'function') {
        dataLayer.push = (data) => {
            if (data instanceof Object && typeof data.eventCallback === 'function') {
                setTimeout(data.eventCallback, 1);
            }
        };
    }

    hit(source);
}

GoogleTagManagerGtm.names = [
    'googletagmanager-gtm',
    'ubo-googletagmanager_gtm.js',
    'googletagmanager_gtm.js',
];

GoogleTagManagerGtm.injections = [
    hit,
    noop,
];
