export default class Item {
    constructor(author, publication, collection, field) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.author = author;
        this.publication = publication;
        this.collection = collection;
        this.field = field;

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }

    toggleDone() {
        this.done = !this.done;
        return this.done;
    }
    
    setOnChangeCallback() {
        this.onChangeCallback = onChangeCallback;
    }

    edit(author, publication, collection, field){
        this.author = author;
        this.publication = publication;
        this.collection = collection;
        this.field = field;
    }

    getEdit() {
        return {
            author: this.author,
            publication: this.publication,
            collection: this.collection,
            field: this.field
        };
    }
    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}