export default class Profile{
    constructor(name, surname, email, age, position, country){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
        this.position = position;
        this.country = country;
    }

    getFullName(){
        return this.name + " " + this.surname;
    }
    
    getEdit(){
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
            age: this.age,
            position: this.position,
            country: this.country
        };
    }

    edit(name, surname, email, age, position, country){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
        this.position = position;
        this.country = country;
    }
}