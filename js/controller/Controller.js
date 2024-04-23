import Item from "../model/Item.js";
//import Profile from "../model/Profile.js";

export default class Controller {
    constructor(itemListModel, itemListView, Profile) {
        this.itemListModel = itemListModel;
        this.itemListView = itemListView;
        this.Profile = Profile;
        this.itemListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.itemListView.setControllerOnEdit(this.editItem);
        this.itemListView.setControllerOnEditDisplay(this.editDisplay);
        this.itemListView.setControllerOnAddItem(this.addItem);
        this.itemListView.setControllerOnDelItem(this.delItem);
        this.itemListView.setControllerOnFilter(this.searchItems);
        this.itemListView.setControllerOnSort(this.sortItems);
        //this.itemListView.setControllerOnMyPub(this.getProfile);
        this.initOnModelChange();
        this.itemListView.setControllerOnCheckbox(this.itemToggleDone);        
        if (window.location.pathname.includes('publications.html')){
            document.querySelector('#buttAdd').addEventListener('click', (e)=>itemListView.onShow(e));
            document.querySelector('#add-pub').addEventListener('click', (e)=>itemListView.onAddItem(e));
            document.querySelector('#SearchButton').addEventListener('click', (e)=>itemListView.onSearch(e));
            document.querySelector('#sortSelect').addEventListener('change',(e)=>itemListView.onSort(e));
            document.querySelector('#myPub').addEventListener('click', (e)=>itemListView.onSearchMyPub(e, this.Profile.getFullName()));
            document.querySelector('.pagination').addEventListener('click', (e)=>itemListView.showPage(e));
        }
        
        //document.getElementById('editProfileButton').addEventListener('click', (e)=>ProfileView.edit(e));
    }

    onChangeCallback() {
        /* updates UI when a model has changed (title, done attributes) */
        document.querySelector('#pub-tab').innerHTML = this.itemListView.toHtml();
    }

    itemToggleDone(id) { 
        this.itemListModel.toggleDone([id]);
    }

    editItem(id, author, publication, collection, field){
        this.itemListModel.edit([id], author, publication, collection, field);
    }

    editDisplay(id){
        return this.itemListModel.editDisp([id]);
    }

    addItem(author, publication, collection, field) {
        const item = new Item(author, publication, collection, field);
        this.itemListModel.add(item);
    }

    delItem(id) { 
        this.itemListModel.delete(id);
    }

    initOnModelChange() {
        /* updates UI when a model list has changed (adds, deletes items) */
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#pub-tab').innerHTML = this.itemListView.toHtml();
                return true;
            }
        }
        this.itemListModel.items = new Proxy(this.itemListModel.publications, handler);
    }

    setProfile(name, surname, email, age, position, country){
        this.Profile.edit(name, surname, email, age, position, country);
        document.querySelector('#my-table').innerHTML = this.ProfileView.toHtml();
    }

    getProfile(){
        return this.Profile.getFullName();
    }


}