import ItemListModel from './model/ItemListModel.js';
import ItemListView from './view/ItemListView.js';
import Controller from './controller/Controller.js';
import Profile from './model/Profile.js';
import ProfileView from './view/ProfileView.js';
import ControllerProfile from './controller/ControllerProfile.js';

let profile = new Profile ('Daryna', 'Saiun', 'saiun@example.com', '19', 'student', 'Ukraine');
let profileView = new ProfileView(profile);

let controllerProfile = new ControllerProfile(profile, profileView);

let itemListModel = new ItemListModel();
let itemListView = new ItemListView(itemListModel);

let controller = new Controller(itemListModel, itemListView, profile);

if (window.location.pathname.includes('publications.html')){
    controller.addItem('Ann Forn', 'Machine Learning', 'Conference Proceedings', 'Computer Science');
}

//controller.addItem('Second Item');

//itemListModel.delete(item1.id);
//itemListModel.toggleDone([item2.id]);

