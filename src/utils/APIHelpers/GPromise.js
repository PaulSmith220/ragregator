
const GPromise = (func, ...args) => {
    return new Promise((resolve, reject) => {
        func(...args).then(
            (response) => {
                if (response && response.status >= 200 && response.status <300) {
                    resolve(response);
                    return;
                }
                reject(response);
            },
            reject,
        );
    });
};

export default GPromise;
