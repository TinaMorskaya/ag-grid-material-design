import React, { useState } from 'react';
import {bindActionCreators} from 'redux';
import {connect, useSelector} from 'react-redux';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import "./App.css";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {rowSlice} from './store.js';


const useStyles = makeStyles({

    mainGrid: {
        height: 'auto',
        border: '1px transparent',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 13px 27px -15px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025)'
    },

    headerColumn: {
        fontWeight: 'bold',
        fontSize: '1.6em',
        color: '#34515e',
    },

    cell: {
        color: '#1c313a',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
      
    myGrid: {
        flex: '1 1 0px',
        width: '100%'
    },

    buttons: {
        fontSize: '1em',
        color: '#34515e',
        margin: '1rem',
        boxShadow: '0 13px 27px -15px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025)'
    }


  });

const App = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const classes = useStyles();

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const deleteSelectedRows = () => {
        const selectedNodes = gridApi.getSelectedNodes();
        
        let deleteIndexes = [];
        selectedNodes.map((node) => {
            deleteIndexes.push(node.rowIndex)
        });
        props.actions.deleteRows(deleteIndexes);
    }

    const addOneRow = () => {
        props.actions.addRow()
    }

    const setValue = (params) => {
        if (params.oldValue == params.newValue) {
            return false;
        }

        props.actions.changeRow({ 
            id: params.node.id, 
            column: params.column.colId, 
            data: params.newValue
        });

        return false;
    }


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className={classes.wrapper}>
                <div className={`ag-theme-material ${classes.myGrid}`} style={{height: '100%', width: '100%'}}>
                    <Button
                        onClick={addOneRow}
                        variant="contained"
                        className={classes.buttons}
                        startIcon={<AddIcon />}>
                        Add row
                    </Button>
                    <Button
                        onClick={deleteSelectedRows}
                        variant="contained"
                        className={classes.buttons}
                        startIcon={<DeleteIcon />}>
                        Delete selected rows
                    </Button>
                    <AgGridReact
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            resizable: true,
                            headerCheckboxSelection: isFirstColumn,
                            checkboxSelection: isFirstColumn,
                            cellClass: classes.cell,
                            editable: true
                        }}
                        immutableData={false}
                        enterMovesDownAfterEdit={true}
                        //rowData={props.rows}
                        rowData={props.rows}
                        rowSelection="multiple"
                        onGridReady={onGridReady}
                        suppressRowClickSelection={true}
                        className={classes.mainGrid}
                        domLayout='autoHeight'>
                        <AgGridColumn
                            field="account number"
                            sortable={true}
                            filter={true}
                            headerClass={classes.headerColumn}
                            valueSetter={setValue}
                            minWidth={260}
                            valueParser={newAccountNum}>
                        </AgGridColumn>
                        <AgGridColumn 
                            field="account type" 
                            sortable={true} 
                            filter={true} 
                            headerClass={classes.headerColumn}
                            valueSetter={setValue} 
                            cellEditor="agSelectCellEditor" 
                            cellEditorParams={{values: ['Checking', 'Savings']}}>
                        </AgGridColumn>
                        <AgGridColumn 
                            field="currency" 
                            sortable={true} 
                            filter={true} 
                            headerClass={classes.headerColumn} 
                            editable={false}>
                        </AgGridColumn>
                        <AgGridColumn 
                            field="balance" 
                            sortable={true} 
                            filter={true} 
                            headerClass={classes.headerColumn} 
                            valueSetter={setValue} 
                            type='rightAligned'  
                            valueFormatter={currencyFormatter}>
                        </AgGridColumn>
                        <AgGridColumn 
                            field="bank name" 
                            sortable={true} 
                            filter={true}  
                            valueSetter={setValue} 
                            headerClass={classes.headerColumn}>
                        </AgGridColumn>
                        <AgGridColumn 
                            field="bank country" 
                            sortable={true} 
                            filter={true} 
                            headerClass={classes.headerColumn} 
                            valueSetter={setValue}>
                        </AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    rows: state.rows
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(rowSlice.actions, dispatch)
});

const isFirstColumn = (params) => {
    let displayedColumns = params.columnApi.getAllDisplayedColumns();
    let thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

const newAccountNum = (params) => {
    let valueAsNumber;
    const num = Number(params.newValue);
    valueAsNumber = !num || !(num > 9999999) || !Number.isInteger(num)
        ? 'Write a nine-digit number'
        : num;
    return valueAsNumber;

}

const currencyFormatter = (params) => {
    let valueAsNumber;
    const num = Number(params.value);
    valueAsNumber = !num
        ? 'Write a number'
        : num.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    return valueAsNumber;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(App);
