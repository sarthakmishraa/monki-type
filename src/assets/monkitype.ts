export const monkitype = (words: string, typedWords: string) => {
    if(!words || !typedWords) {
        return "Words not defined";
    }
    let noOfCharsTyped = typedWords.length;

    if(words.length < typedWords.length) {
        noOfCharsTyped = words.length;
    };

    let correct = 0;
    
    for(let i=0; i<noOfCharsTyped; i++) {
        if(typedWords[i].toLowerCase() === words[i].toLowerCase()) {
            correct += 1
        }
    }
    return ((correct/noOfCharsTyped)*100).toFixed(2);
}