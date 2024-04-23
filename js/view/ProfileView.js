export default class ProfileView {
    constructor(profileItem) {
        this.profileItem = profileItem;
        //this.editProf = new bootstrap.Modal(document.getElementById('editProfileModal'));
    }

    toHtml() {
        return `
            <tbody>
            <tr>
                <th scope="row">Name</th>
                <td id="nameField">${this.profileItem.name}</td>
            </tr>
            <tr>
                <th scope="row">Surname</th>
                <td id="surnameField">${this.profileItem.surname}</td>
            </tr>
            <tr>
                <th scope="row">Email</th>
                <td id="emailField">${this.profileItem.email}</td>
            </tr>
            <tr>
                <th scope="row">Age</th>
                <td id="ageField">${this.profileItem.age}</td>
            </tr>
            <tr>
                <th scope="row">Position</th>
                <td id="positionField">${this.profileItem.position}</td>
            </tr>
            <tr>
                <th scope="row">Country</th>
                <td id="countryField">${this.profileItem.country}</td>
            </tr>
        </tbody>`;
    }

    edit(e){
        e.preventDefault();
        const editProf = new bootstrap.Modal(document.getElementById('editProfileModal'));
        const prof = this.profileItem.getEdit();
        
        document.getElementById('editName').value = prof.name;
        document.getElementById('editSurname').value = prof.surname;
        document.getElementById('editEmail').value = prof.email;
        document.getElementById('editAge').value = prof.age;
        document.getElementById('editPosition').value = prof.position;
        document.getElementById('editCountry').value = prof.country;
        editProf.show();
        
        // Отримуємо форму з модального вікна
        const editProfileForm = document.getElementById('editProfileForm');
        
        // Додаємо обробник події submit до форми
        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const editName = document.getElementById('editName').value;
            const editSurname = document.getElementById('editSurname').value;
            const editEmail = document.getElementById('editEmail').value;
            const editAge = document.getElementById('editAge').value;
            const editPosition = document.getElementById('editPosition').value;
            const editCountry = document.getElementById('editCountry').value;
    
            this.profileItem.edit(editName, editSurname, editEmail, editAge, editPosition, editCountry);
            editProf.hide();
    
            // Оновлюємо HTML таблиці після внесення змін
            document.querySelector('#my-table').innerHTML = this.toHtml();
        });
        
    }
}