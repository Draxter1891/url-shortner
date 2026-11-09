export const generateCode = ()=>{
    const fullDictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

    let uniqueCode = ""
    for(let i=0;i<6;i++){
        uniqueCode += fullDictionary.charAt(Math.floor(Math.random()*62));
    }
    return uniqueCode;
}