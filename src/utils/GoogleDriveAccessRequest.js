
class GoogleDriveAccessRequest {
    static SignIn(gapi, apiKey, clientId) {
        const instance = new GoogleDriveAccessRequest(gapi, apiKey, clientId);
        return instance.init();
    }
    apiKey;
    clientId;
    gapi;
    discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    scope = 'https://www.googleapis.com/auth/drive.appfolder';

    constructor(gapi, apiKey, clientId) {
        this.apiKey = apiKey;
        this.clientId = clientId;
        this.gapi = gapi;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.gapi.client.init({
                apiKey: this.apiKey,
                clientId: this.clientId,
                discoveryDocs: this.discoveryDocs,
                scope: this.scope,
            }).then(() => {
                const authInstance = this.gapi.auth2.getAuthInstance();
                if (authInstance.isSignedIn.get()) {
                    resolve(authInstance.currentUser.get());
                    return;
                }
                authInstance.isSignedIn.listen(() => {
                    resolve();
                });
                authInstance.signIn();
            }, error => reject(error));
        });
    };
}

export default GoogleDriveAccessRequest;
