import { format } from "date-fns";

export const formatCategoryName = (name) => {

    return name.replaceAll(' ', '').replaceAll(',', '_').replaceAll('&', '_').toLowerCase();

}

export const formatDate = (date) => {

    return format(new Date(date), "dd MMM'.' yyyy");
    
}

export const formatDate2 = (date) => {

    return format(new Date(date), "dd-MM-yyyy");
    
}