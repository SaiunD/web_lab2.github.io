export default class itemListModel {
    constructor() {
        this.publications = [];
        this.pub_edit = null;
        this.onChangeCallback = null;
    }

    add(item) {
        item.onChangeCallback = this.onChangeCallback;
        this.items.push(item);
    }

    delete(itemId) {
        const itemIndex = this.items.findIndex( (item) => item.id === itemId); 
        this.items.splice(itemIndex, 1);
    }

    edit(itemIdList, author, publication, collection, field){
        this.publications.map( (item) => {
            if (itemIdList.indexOf(item.id) > -1) item.edit(author, publication, collection, field);
         }); 
    }

    editDisp(itemIdList) {
        return this.publications.find(item => itemIdList.includes(item.id))?.getEdit();
    }    

    toggleDone(itemIdList) {
        this.items.map( (item) => {
            if (itemIdList.indexOf(item.id) > -1) item.toggleDone();
         }); 
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }

}