export const getLetterCount = (string) => {
    let letters = {};
    string.split('').forEach(element => {
        if (letters[element]) {
            letters[element] += 1;
        } else {
            letters[element] = 1;
        }
    });
    return letters;
};