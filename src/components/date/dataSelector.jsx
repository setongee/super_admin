import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-teal/theme.css";
import './date.scss'
import { format } from "date-fns";

export default function DateSelector({date__add, dateF}) {

    const [date, setDate] = useState(null);


    const handleDateChange = e => {

        setDate(e.value);
        date__add(e.value)

    }

    //format(new Date(date), "dd-MM-yyyy")

    return (

        <Calendar value={date} onChange={ e => handleDateChange(e) } showIcon dateFormat="dd-mm-yy" />
    )
}