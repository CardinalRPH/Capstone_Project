export const modifyProvince = (input) => {
    const words = input.toLowerCase().split(' ');
    if (words.length === 2) {
        if (words[0].length <= 3) {
            words[0] = words[0].toUpperCase();
        } else {
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
        return words.join('');
    } else {
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join('');
    }
}
export const modifyRegence = (input) => {
    const lowerCaseInput = input.toLowerCase();
    const words = lowerCaseInput.split(' ');

    if (words[0] === 'kabupaten') {
        words[0] = 'Kab.';
    }

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
}
