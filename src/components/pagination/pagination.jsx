import { NavArrowLeft, NavArrowRight } from 'iconoir-react';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './pagination.scss'

export default function Pagination({size, page, topic}) {

let navigate = useNavigate();

const countPages = () => {

    let pages = [];
    let pageNum = Number(page);

    const active = document.querySelector(`.page${pageNum}`);
    const activeInt = document.querySelector('.page1');

    if (document.querySelector('.activePage') !== null) {

        document.querySelector('.activePage').classList.remove('activePage');
    }
    
    if(pageNum < 1) {
        
        activeInt?.classList.add('activePage')

    } else {

        active?.classList.add('activePage')

    }

    if(pageNum < 1) {

        for(var x = 1; x <= 10 && x <= size?.pageCount; x++) {
        pages.push(x);
        }

    } else if (pageNum > 10 && pageNum < 20) {

        for(var x = 11; x < 20 && x <= size?.pageCount; x++) {
        pages.push(x);
        }

    }else if(  pageNum <= 10 && pageNum >= 1){

        for(var x = 1; x <= 10 && x <= size?.pageCount; x++) {
        pages.push(x);
        }

    }else {

        for(var x = (page.split('')[0] * 10) - 9; x <= page.split('')[0] * 10 && x <= size?.pageCount; x++) {
        pages.push(x);
        }

    }

    return pages;

}

const nextPage = () => {

   if( Number(page) < size.pageCount){

        navigate(`/news/${topic}/${Number(page)+1}`);

   } else {

        navigate(`/news/${topic}/${Number(page)}`);
    
   }

}

const previousPage = () => {

    if( Number(page) === 1 ){
 
         navigate(`/news/${topic}/${Number(page)}`);
 
    } else {
 
         navigate(`/news/${topic}/${Number(page)-1}`);
     
    }
 
 }

const handlePageSwitch = (pageNumber) => {

    navigate(`/news/${topic}/${pageNumber}`);

}

  return (

    <div className="pagination__container">

        {/* pagination */}

        {
            size?.pageCount > 0 && Number(page) <= size?.pageCount ?

            (
                <div className="pagination flex">

                    <div className="link__point" onClick={ () => handlePageSwitch(1) } > First Page (1) </div>

                    <div className="controls" onClick={ () => previousPage() }> <NavArrowLeft/> </div>

                    <div className="pageControl">

                        {
                            countPages().map( num => <div className= {`pageIndex page${num}`} onClick={ () => handlePageSwitch(num) } > {num} </div> )
                        }

                    </div>

                    <div className="controls" onClick={ () => nextPage() }> <NavArrowRight/> </div>

                    <div className="link__point" onClick={ () => handlePageSwitch(size.pageCount) } > Last Page ( {size.pageCount} ) </div>

                </div>

            ) : null
        }

    </div>

  )
}
