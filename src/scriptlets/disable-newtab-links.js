import { hit } from '../helpers';

/**
 * Prevents opening new tabs and windows if there is `target` attribute in element
 *
 * Related UBO scriptlet:
 * https://github.com/gorhill/uBlock/wiki/Resources-Library#disable-newtab-linksjs-
 *
 * @param {Source} source
 */
export function disableNewtabLinks(source) {
    document.addEventListener('click', (ev) => {
        let { target } = ev;
        while (target !== null) {
            if (target.localName === 'a' && target.hasAttribute('target')) {
                ev.stopPropagation();
                ev.preventDefault();
                hit(source);
                break;
            }
            target = target.parentNode;
        }
    });
}

disableNewtabLinks.names = [
    'disable-newtab-links',
    'disable-newtab-links.js',
    'ubo-disable-newtab-links.js',
];

disableNewtabLinks.injections = [
    hit,
];
