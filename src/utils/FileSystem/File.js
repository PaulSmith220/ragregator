
class File {
    id;
    name;
    mimeType;
    parents;
    content;
    constructor(id, name, mimeType, parents) {
        this.id = id;
        this.name = name;
        this.mimeType = mimeType;
        this.parents = parents;
    }
    setContent(content) {
        this.content = content;
    }
}

export default File;
