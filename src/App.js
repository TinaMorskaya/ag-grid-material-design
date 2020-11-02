import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import "./App.css";

import data from './data/bank-accounts.json';

import { makeStyles } from '@material-ui/core/styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

  });

const App = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState(data);

    const classes = useStyles();

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    const onButtonClick = e => {
        const selectedNodes = gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data );
        //console.log(selectedData)
        //const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
        const selectedDataStringPresentation = selectedData.length;
        alert(`Selected ${selectedDataStringPresentation} nodes`);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className={classes.wrapper}>
                <div className={`ag-theme-material ${classes.myGrid}`} style={{height: '100%', width: '100%'}}>
                    <button onClick={onButtonClick}>Get selected rows</button>
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
                        enterMovesDownAfterEdit={true}
                        rowData={rowData}
                        rowSelection="multiple"
                        onGridReady={onGridReady}
                        suppressRowClickSelection={true}
                        className={classes.mainGrid}
                        domLayout='autoHeight'>
                        <AgGridColumn field="account number" sortable={true} filter={true} headerClass={classes.headerColumn} minWidth={260} valueParser={newAccountNum}></AgGridColumn>
                        <AgGridColumn field="account type" sortable={true} filter={true} headerClass={classes.headerColumn} cellEditor="agSelectCellEditor" cellEditorParams={{
                            values: ['Checking', 'Savings']
                            }}></AgGridColumn>
                        <AgGridColumn field="currency" sortable={true} filter={true} headerClass={classes.headerColumn} editable={false}></AgGridColumn>
                        <AgGridColumn field="balance" sortable={true} filter={true} headerClass={classes.headerColumn} type='rightAligned'  valueParser={newBalance} valueFormatter={curBalance}></AgGridColumn>
                        <AgGridColumn field="bank name" sortable={true} filter={true} headerClass={classes.headerColumn}></AgGridColumn>
                        <AgGridColumn field="bank country" sortable={true} filter={true} headerClass={classes.headerColumn}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};


function isFirstColumn(params) {
    let displayedColumns = params.columnApi.getAllDisplayedColumns();
    let thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

function newAccountNum (params) {
    let valueAsNumber;
    const num = Number(params.newValue);
    valueAsNumber = !num || !(num > 9999999) || !Number.isInteger(num)
        ? 'Write a nine-digit number'
        : num;
    return valueAsNumber;

}

function curBalance(params) {
    return currencyFormatter(params.value)
}

function currencyFormatter (value) {
    let valueAsNumber;
    const num = Number(value);
    valueAsNumber = !num
        ? 'Write a number'
        : num.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    return valueAsNumber;
}

function newBalance(params) {
    return currencyFormatter(params.newValue);
}


export default App;
