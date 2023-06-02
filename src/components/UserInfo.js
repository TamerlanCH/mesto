class UserInfo {
    constructor(profileName, profileAbout) {
        this._profileNameText = profileName;
        this._profileAboutText = profileAbout;
    }

    getUserInfo() {
        return { name: this._profileNameText.textContent, about: this._profileAboutText.textContent }

    }
    setUserInfo({ name, about }) {
        this._profileNameText.textContent = name;
        this._profileAboutText.textContent = about;
    }
}

export default UserInfo;