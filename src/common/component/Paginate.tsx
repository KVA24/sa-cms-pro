import React, {Component} from 'react';
import ReactPaginate from "react-paginate";
import {observer} from "mobx-react";

interface IProps {
    currentPage: number,
    totalPage: number,
    callback: any
}

@observer
class Paginate extends Component<IProps, any> {


    render() {
        if(this.props.totalPage > 1 && this.props.totalPage > this.props.currentPage){
            return (
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.totalPage}
                    forcePage={this.props.currentPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.props.callback}
                    containerClassName={'pagination'}
                    pageClassName={'paginate_button page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={'paginate_button page-item previous'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'paginate_button page-item next'}
                    nextLinkClassName={'page-link'}
                />
            );
        }else return null

    }
}

export default Paginate;