//Truncate text helper created by Setonji

export const truncateText = (str, max) => {

    if (str.length > max) {

        const newText = str.substring(0, max) + '...';
        return newText;
        
    }

    else{
        return str;
    }

}
