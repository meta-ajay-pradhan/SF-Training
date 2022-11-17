import { api, LightningElement } from 'lwc';

export default class Pagination extends LightningElement {
    @api currentPage
    @api totalPage
    @api itemPerPage
    @api totalItem

    dispatchPageChangeEvent(page) {
        console.log('sdfsdfsdfsdf');
        const pageChangeEvent = new CustomEvent('updatepage', {
            detail: page
        });
        this.dispatchEvent(pageChangeEvent);
    }

    handleFirstPage() {
        if(this.currentPage !== 1) {
            this.dispatchPageChangeEvent(1);
        }
    }

    handlePreviousPage() {
        if(this.currentPage > 1) {
            this.dispatchPageChangeEvent(this.currentPage - 1);
        }
    }

    handleNextPage() {
        if(this.currentPage < this.totalPage) {
            this.dispatchPageChangeEvent(this.currentPage + 1);
        }
    }

    handleLastPage() {
        if(this.currentPage < this.totalPage) {
            this.dispatchPageChangeEvent(this.totalPage);
        }
    }

    get disableFirst() {
        return this.currentPage === 1;
    }
    get disablePrevious() {
        return this.currentPage === 1;
    } 
    get disableNext() {
        console.log(this.totalPage);
        return this.currentPage === this.totalPage;
    }
    get disableLast() {
        return this.currentPage === this.totalPage;
    }
}