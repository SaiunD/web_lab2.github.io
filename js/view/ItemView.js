export default class ItemView {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }

    toHtml() {
        return `
            <tr>
            <td>${this.itemModel.author}</td>
            <td>${this.itemModel.publication}</td>
            <td>${this.itemModel.collection}</td>
            <td>${this.itemModel.field}</td>
            <td>
                <button data-id="${this.itemModel.id}" class="btn btn-primary btn-sm rounded "><img src="icons/edit.svg" data-id="${this.itemModel.id}" alt="Edit" width="16" height="16"></button>
                <button data-id="${this.itemModel.id}" class="btn btn-danger btn-sm "><img src="icons/delete.svg" alt="Delete" width="16" height="16" data-id="${this.itemModel.id}" ></button>
            </td>
            </tr>`;
    }
}