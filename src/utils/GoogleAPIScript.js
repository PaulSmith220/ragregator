import InjectableScript from './InjectableScript';

class GoogleAPIScript extends InjectableScript {
    static src = 'https://apis.google.com/js/api.js';
    static Create(callback = null, context = document) {
        const instance = new GoogleAPIScript(GoogleAPIScript.src, callback);
        instance.inject(context);
        return instance;
    }
}

export default GoogleAPIScript;
