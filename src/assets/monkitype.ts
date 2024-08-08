export const monkitype = (words: string, typedWords: string) => {
    if(!words || !typedWords) {
        return "Words not defined"
    }
    const noOfCharsTyped = typedWords.length;
    let correct = 0;
    
    for(let i=0; i<noOfCharsTyped; i++) {
        if(typedWords[i].toLowerCase() === words[i].toLowerCase()) {
            correct += 1
        }
    }
    return ((correct/noOfCharsTyped)*100).toFixed(2);
}