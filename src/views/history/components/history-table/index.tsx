import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Button,
    IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Item } from "../../../../types";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteItem } from "../../../../redux/hooks/useItem";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { ReduxState } from "../../../../redux/module";
import AlertComponent, { AlertType, useAlert } from "../../../../components/alert";
import DialogComponent, { useDialog } from "../../../../components/dialog";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: "flex-end"
    }
}));

interface Props {
    items: Item[];
    history: H.History;
    location: H.Location;
    match: match;
}

const convertTableItems = (items: Item[]) => {
    /* FileInfoをmaterial-table用に変換する */
    let tableItems: any[] = []
    items.forEach((item: Item) => {
        tableItems.push([
            item.StartDate, item.TradeType, item.Pair, item.Lot, item.Profit, item.BeforeComment, item.AfterComment
        ])
    })
    console.log("tableItem: ", tableItems)
    return tableItems
}

const HistoryTable: React.FC<Props> = props => {
    //const { className, users, ...rest } = props;
    const { history } = props;
    const items = useSelector((state: ReduxState) => state.Items)
    // alert
    const { openAlert, closeAlert, alertStatus } = useAlert()
    // dialog
    const { open, openDialog, closeDialog } = useDialog()

    const [selectedItem, setSelectedItem] = useState<Item>(new Item)
    const { deleteItem, status } = useDeleteItem()

    const handleDelete = () => {
        console.log("delete: ", selectedItem)
        deleteItem(selectedItem)
    };

    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            openAlert(AlertType.SUCCESS, "finish run command")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
            openAlert(AlertType.ERROR, "error occur while running command")
        }

    }, [status])

    const handleEdit = (item: Item) => {
        console.log("edit: ", item)
        history.push("/entry/" + item.ID);
    };


    const columns = ["Date", "TradeType", "Pair", "Lot", "Profit", "BeforeComment", "AfterComment"];

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        selectableRows: 'single',
        customToolbarSelect: (selectedRows: any) => (
            <div>
                <IconButton
                    onClick={() => {
                        const index: number = selectedRows.data[0].index
                        console.log("edit", index, items)
                        handleEdit(items[index])
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    onClick={() => {
                        const index: number = selectedRows.data[0].index
                        //handleDelete(items[index])
                        setSelectedItem(items[index])
                        openDialog()
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MUIDataTable
                title={"Trade List"}
                data={convertTableItems(items)}
                columns={columns}
                options={options}
            />
            <DialogComponent open={open} closeDialog={closeDialog} runFunc={handleDelete} />
            <AlertComponent closeAlert={closeAlert} alertStatus={alertStatus} />
        </div>
    )
};

export default withRouter(HistoryTable);
