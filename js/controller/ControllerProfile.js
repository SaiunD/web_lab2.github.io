export default class ControllerProfile{
    constructor(Profile, ProfileView)
    {
        this.Profile = Profile;
        this.ProfileView = ProfileView;
        if (window.location.pathname.includes('my_profile.html')) {
            document.querySelector('#my-table').innerHTML = ProfileView.toHtml();
            document.getElementById('editProfileButton').addEventListener('click', (e)=>ProfileView.edit(e));
        }
        
    }

}
