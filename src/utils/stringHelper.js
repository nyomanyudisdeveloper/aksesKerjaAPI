import path from 'path'

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



export const getFilePathImage = (fileName) => {
    const rootPath = process.cwd()
    const filePath = path.join(rootPath, `public/images/${fileName}`);

    return filePath
}

export const getFormatDateToString = (date) => {
    const temp_date = new Date(date)
    const day = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"][temp_date.getDay()]
    const month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][temp_date.getMonth()];
    
    return `${day}, ${temp_date.getDate()} ${month} ${temp_date.getFullYear()}`
}