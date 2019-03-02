import InjectableScript from './InjectableScript';

class GoogleAPIScript extends InjectableScript {
    static src = 'https://apis.google.com/js/api.js';
    static Create(context = document) {
        return new Promise((resolve) => {
            const instance = new GoogleAPIScript(GoogleAPIScript.src, resolve);
            instance.inject(context);
        });
    }
}

export default GoogleAPIScript;
