class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
        this._profileNameText = document.querySelector(profileNameSelector);
        this._profileAboutText = document.querySelector(profileAboutSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return { name: this._profileNameText.textContent, about: this._profileAboutText.textContent }
    }

    setUserInfo(formValues) {
        if (formValues.name) {
            this._profileNameText.textContent = formValues.name
        }
        if (formValues.about) {
            this._profileAboutText.textContent = formValues.about
        }
        if (formValues.avatar) {
            this._profileAvatar.src = formValues.avatar
        }
        if (formValues.name) {
            this._profileAvatar.alt = formValues.name
        }
    }

    setUserAvatar(formValues) {
        if (formValues.avatarLink) {
            this._profileAvatar.src = formValues.avatarLink
        }
    }
}

export default UserInfo;