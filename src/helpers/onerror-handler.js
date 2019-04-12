export function onErrorHandler(rid) {
    // eslint-disable-next-line consistent-return
    const nativeOnError = window.onerror;
    return function onError(error, ...args) {
        if (typeof error === 'string' && error.indexOf(rid) !== -1) {
            return true;
        }
        if (nativeOnError instanceof Function) {
            return nativeOnError.apply(this, [error, ...args]);
        }
        return false;
    };
}