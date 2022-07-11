import React, {Component} from 'react';
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {wheelItemsStore} from "./WheelItemsStore";
import {observer} from "mobx-react";
import {requestUtils} from "../../../common/utils/RequestUtil";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Add from "./components/Add";
import Delete from "./components/Delete";
import Edit from "./components/Edit";

@observer
class WheelItems extends Component {

    async componentDidMount() {
        // await itemsStore.getSource()
        await wheelItemsStore.getItems();
    }

    handlePageClick = async (data: any) => {
        wheelItemsStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: wheelItemsStore.page});
        await wheelItemsStore.getItems();
    }

    onDragEnd(result: any) {
        if (!result.destination) {
            return
        }

        wheelItemsStore.reorder(
            result.source.index,
            result.destination.index
        );
        wheelItemsStore.isChanged = true;
    }

    render() {
        return (
            <div className="collection">
                <div className="content-wrapper">

                    <div className="d-flex justify-content-end align-items-center">
                        <button type="button" onClick={() => wheelItemsStore.clearForm()} data-toggle="modal"
                                data-target="#addWheel" className="btn btn-md btn-outline-info">Create
                        </button>
                        <button type="button" onClick={() => wheelItemsStore.publishWheelSort()} data-toggle="modal"
                                className="btn btn-md btn-outline-info ml-3"
                                disabled={!wheelItemsStore.isChanged}>Publish
                        </button>
                    </div>
                    {wheelItemsStore.isLoading ? <Loading/> :
                        <div className="table-responsive border mt-4">
                            {wheelItemsStore.listItems && wheelItemsStore.listItems.length > 0 ?
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Sort</strong></TableCell>
                                                <TableCell><strong>ID</strong></TableCell>
                                                <TableCell><strong>ItemId</strong></TableCell>
                                                <TableCell><strong>Name</strong></TableCell>
                                                <TableCell><strong>Image</strong></TableCell>
                                                <TableCell><strong>ItemType</strong></TableCell>
                                                <TableCell><strong>Ratio</strong></TableCell>
                                                <TableCell><strong>Actions</strong></TableCell>
                                                <TableCell/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody component={DroppableComponent(this.onDragEnd)}>
                                            {wheelItemsStore.listItems.map((item: any, i: number) => {
                                                return (
                                                    <TableRow component={DraggableComponent(item.id.toString(), i)}
                                                              key={item.id}>
                                                        <TableCell>{i + 1}</TableCell>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>{item.itemId}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.image}</TableCell>

                                                        <TableCell>{item.itemType}</TableCell>
                                                        <TableCell>
                                                            <span>
                                                                 Gold: <br/> {item.percentGold}%
                                                            </span>
                                                            <br/>
                                                            <span>
                                                                Diamond: <br/> {item.percentDiamond}%
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <button type="button"
                                                                    onClick={() => wheelItemsStore.getDetail(item.id)}
                                                                    data-toggle="modal"
                                                                    data-target="#editWheel"
                                                                    className="btn btn-inverse-warning ml-1 mr-1 mt-1 btn-icon">
                                                                <i className="fas fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => wheelItemsStore.id = item.id}
                                                                    data-toggle="modal"
                                                                    data-target="#deleteWheel"
                                                                    className="btn btn-inverse-danger ml-1 mr-1 mt-1 btn-icon">
                                                                <i className="fas fa-trash-alt"/>
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                :
                                <div className="p-5">
                                    <NoContent message="Chưa có dữ liệu"/>
                                </div>
                            }
                        </div>
                    }

                    <Add/>
                    <Delete/>
                    <Edit/>


                </div>
            </div>
        );
    }
}

export default WheelItems;

// @ts-ignore
const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
});

const DraggableComponent = (id: string, index: number) => (props: any) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}

                    {...props}
                >
                    {props.children}
                </TableRow>
            )}
        </Draggable>
    )
};

const DroppableComponent = (
    onDragEnd: (result: any, provided: any) => void) => (props: any) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'1'} direction="vertical">
                {(provided) => {
                    return (
                        <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
                            {props.children}
                            {provided.placeholder}
                        </TableBody>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
};
