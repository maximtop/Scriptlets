/* eslint-disable no-console, func-names, no-multi-assign */
import { hit } from '../helpers';

/**
 * Sets static properties PopAds and popns.
 *
 * Related UBO scriptlet:
 * https://github.com/gorhill/uBlock/wiki/Resources-Library#popads-dummyjs-
 *
 * @param {Source} source
 */
export function setPopadsDummy(source) {
    delete window.PopAds;
    delete window.popns;
    Object.defineProperties(window, {
        PopAds: {
            get: () => {
                hit(source);
                return {};
            },
        },
        popns: {
            get: () => {
                hit(source);
                return {};
            },
        },
    });
}

setPopadsDummy.names = [
    'set-popads-dummy',
    'popads-dummy.js',
    'ubo-popads-dummy.js',
];

setPopadsDummy.injections = [hit];
