
class InjectableScript {
    src;
    callback;

    constructor(src, callback) {
        this.src = src;
        this.callback = callback;
    }

    inject(context = document) {
        const script = context.createElement('script');
        if (this.callback) {
            script.onload = this.callback;
            script.onreadystatechange = function () {
                if (this.readyState === 'complete') {
                    this.onload();
                }
            };
        }
        script.src = this.src;
        context.getElementsByTagName('head')[0].appendChild(script);
    }
}

export default InjectableScript;
