import ItemView from './ItemView.js';
export default class ItemListView {
    constructor(itemListModel) {
        this.itemListModel = itemListModel;
        this.authorInput = document.getElementById('author');
        this.titleInput = document.getElementById('publication');
        this.collectionInput = document.getElementById('collection');
        this.fieldInput = document.getElementById('field');
        this.editForm = document.getElementById('editPublicationForm');
        
        
        this.myPublicationsButton = document.querySelector('#myPub');
        this.isFilteredByMy = false;
        this.fullName = null;
        this.controllerOnFilter = null;
        this.controllerOnCheckbox = null;
        this.controllerOnEdit = null;
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;
        this.controllerOnSort = null;
        //this.controllerOnMyPub = null;
        this.sortValue = null;
        this.addPublicationModal = null;
        this.page = 1;
        if (window.location.pathname.includes('publications.html')){
            document.querySelector('#pub-tab').addEventListener('click', (e) => this.onClick(e)); // 'this' changes
        }
        
    }

    setControllerOnCheckbox(controllerOnCheckbox) {
        this.controllerOnCheckbox = controllerOnCheckbox;
    }

    setControllerOnEdit(controllerOnEdit){
        this.controllerOnEdit = controllerOnEdit;
    }

    setControllerOnEditDisplay(controllerOnEditDisplay){
        this.controllerOnEditDisplay = controllerOnEditDisplay;
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    setControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }

    setControllerOnFilter(controllerOnFilter){
        this.controllerOnFilter = controllerOnFilter;
    }

    setControllerOnSort(controllerOnSort){
        this.controllerOnSort = controllerOnSort;
    }
    

    onClick(e) {
        if (e.target.type === 'checkbox') {
            this.controllerOnCheckbox(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'btn btn-primary btn-sm rounded ' || e.target.alt === 'Edit') {
            const editValues = this.controllerOnEditDisplay(e.target.dataset.id);
            const editValue = editValues;
            const editModal = new bootstrap.Modal(document.getElementById('editPublicationModal'));
            // Тепер ви можете встановити значення відповідних полів у вашому формі редагування
            document.getElementById('editAuthor').value = editValue.author;
            document.getElementById('editPublication').value = editValue.publication;
            document.getElementById('editCollection').value = editValue.collection;
            document.getElementById('editField').value = editValue.field;
            editModal.show();
            this.editForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const editAuthor = document.getElementById('editAuthor').value;
                const editPublication = document.getElementById('editPublication').value;
                const editCollection = document.getElementById('editCollection').value;
                const editField = document.getElementById('editField').value;
    
                this.controllerOnEdit(e.target.dataset.id, editAuthor, editPublication, editCollection, editField);
                editModal.hide();
            });
            
            return;
        }  
        if (e.target.className === 'btn btn-danger btn-sm ' || e.target.alt === 'Delete') {
            this.controllerOnDelItem(e.target.dataset.id);
            return;
        } 
        
    }

    onShow(e){
        e.preventDefault();
        this.addPublicationModal = new bootstrap.Modal(document.getElementById('addPublicationModal'));
        this.addPublicationModal.show();
    }

    onAddItem(e) {
        //const title = prompt('Enter a new title:', '');
        e.preventDefault();
        //this.addPublicationModal.show();
        
        
        const author = this.authorInput.value;
        const title = this.titleInput.value;
        const collection = this.collectionInput.value;
        const field = this.fieldInput.value;
        this.controllerOnAddItem(author, title, collection, field);
        this.addPublicationModal.hide();
        this.authorInput.value = '';
        this.titleInput.value = '';
        this.collectionInput.value = '';
        this.fieldInput.value = 'Select a field';
        
        
    }

    onSearch(e){
        e.preventDefault();
        document.querySelector('#pub-tab').innerHTML = this.toHtml();
    }

    onSearchMyPub(e, fullName){
        e.preventDefault();
        this.isFilteredByMy = !this.isFilteredByMy;
        if (this.isFilteredByMy) {
            this.myPublicationsButton.classList.add('active');
            this.fullName = fullName;
        } else {
            this.myPublicationsButton.classList.remove('active');
        }
        document.querySelector('#pub-tab').innerHTML = this.toHtml();
    }

    onSort(e){
        e.preventDefault();
        this.sortValue = e.target.value;
        this.toHtml();
        document.querySelector('#pub-tab').innerHTML = this.toHtml();
    }
    
    showPage(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'LI') {
            e.preventDefault();
            const targetPage = e.target.textContent;
            if (targetPage === 'Next') {
                this.page += 1; 
            } else if (e.target.tagName === 'LI') {
                this.page -= 1;
            } else {
                this.page = parseInt(targetPage);
            }
            document.querySelector('#pub-tab').innerHTML = this.toHtml();
        }
    }

    sortValues(){
        const itemsCopy = [...this.itemListModel.publications];
            itemsCopy.sort((a, b) => {
                const fieldA = a[this.sortValue].toLowerCase();
                const fieldB = b[this.sortValue].toLowerCase();

                if (fieldA < fieldB) {
                    return -1;
                }
                if (fieldA > fieldB) {
                    return 1;
                }
                return 0;
            });
            return itemsCopy;
    }

    filterValues(items){
        const query = document.getElementById('searchInput').value;
        let filteredItems = [];
        const startIndex = (this.page - 1) * 5;
        const endIndex = Math.min(startIndex + 5, this.itemListModel.publications.length);

        // Фільтруємо публікації відповідно до пошуку
        if (this.isFilteredByMy) 
        {
            filteredItems = items.filter(item =>
                item.author.toLowerCase().includes(this.fullName.toLowerCase())
            );
        } 
        else 
        {
            if (query !== '') 
            {
                filteredItems = items.filter(item =>
                    item.author.toLowerCase().includes(query.toLowerCase()) ||
                    item.publication.toLowerCase().includes(query.toLowerCase()) ||
                    item.collection.toLowerCase().includes(query.toLowerCase()) ||
                    item.field.toLowerCase().includes(query.toLowerCase())
                );
            } 
            else 
            {
                filteredItems = items;
            }
        }

        const itemsHtml = filteredItems
        .slice(startIndex, endIndex)
        .map(item => {
            const itemView = new ItemView(item);
            return itemView.toHtml();
        })
        .join("");

        return itemsHtml;
    }

    toHtml() {
        let itemsHtml = null;
        let itemsCopy;

        if(this.sortValue){
            itemsCopy = this.sortValues();
        }
        else
        {
            itemsCopy = this.itemListModel.publications;
        }
        itemsHtml = this.filterValues(itemsCopy);
        
        return `<table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Author</th>
                <th scope="col">Publication</th>
                <th scope="col">Collection</th>
                <th scope="col">Field</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        ${itemsHtml}
        </tbody>
    </table>`;
    }
}