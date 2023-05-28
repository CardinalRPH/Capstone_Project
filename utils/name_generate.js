const getNameEmail = (email) => {
    let atSymbolIndex = email.indexOf('@');
    if (atSymbolIndex !== -1) {
        let userName = email.substring(0, atSymbolIndex);
        return userName;
    }
    return null;
}

export default getNameEmail;
