export function getLimitedFormattedText(text:string="",requiredLength:number):string{
    return text.length > requiredLength ? `${text.slice(0,requiredLength+1)}...`:text;
}

export function getFormattedImageUrl(imageUrl:string){
    return imageUrl?.replace("{w}", "300")?.replace("{h}", "300") || "";
}