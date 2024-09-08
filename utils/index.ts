export function getLimitedFormattedText(text:string="",requiredLength:number):string{
    return text.length > requiredLength ? `${text.slice(0,requiredLength+1)}...`:text;
}