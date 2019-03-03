import FileSystem from "./FileSystem";
import File from "./File";
import GPromise from "../APIHelpers/GPromise";

class GDriveFileSystem extends FileSystem {
    static checkFile(file) {
        if (!(file instanceof File)) {
            throw new TypeError('GDriveFileSystem can only work with File instances');
        }
    }
    client;
    constructor(client) {
        super(client);
        this.client = client;
    }

    async find(name) {
        const query = await GPromise(this.client.drive.files.list, {
            spaces: 'appDataFolder',
            fields: 'files(id, name, mimeType)',
            q: `name = "${name}"`,
        });
        const result = query.result.files;
        if (result.length) {
            return new File(result[0].id, name, result[0].mimeType, ['appDataFolder']);
        }
        return null;
    }

    async create(name, type = 'text/plain') {
        const existingFile = await this.find(name);
        if (existingFile !== null) {
            return existingFile;
        }
        const request = await GPromise(this.client.drive.files.create, {
            resource: {
                name,
                mimeType: type,
                parents: ['appDataFolder'],
            },
            fields: 'id',
        });
        return new File(request.result.id, name, type, ['appDataFolder']);
    }

    async save(file) {
        GDriveFileSystem.checkFile(file);
        return GPromise(this.client.request, {
            path: `/upload/drive/v3/files/${file.id}`,
            method: 'PATCH',
            params: {uploadType: 'media'},
            body: typeof file.content === 'string' ? file.content : JSON.stringify(file.content)
        });
    }

    async loadContent(file) {
        GDriveFileSystem.checkFile(file);
        const request = await GPromise(this.client.drive.files.get, {
            fileId: file.id,
            alt: 'media',
        });
        const content = request.body.length ? JSON.parse(request.body) : {};
        file.setContent(content);
        return file;
    }

    async load(name) {
        const file = await this.create(name);
        return this.loadContent(file);
    }

    async delete(file) {
        GDriveFileSystem.checkFile(file);
        return GPromise(this.client.drive.files.delete, {
            fileId: file.id,
        });
    }
}

export default GDriveFileSystem;
