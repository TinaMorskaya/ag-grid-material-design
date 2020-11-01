import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import "./App.css";

import data from './data/bank-accounts.json';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
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
        //<div className={classes.root} >
        <div style={{ width: '100%', height: '100%' }}>
            <div className="example-wrapper">
                <div className="ag-theme-material" id="myGrid" style={{height: '100%', width: '100%'}}>
                    <button onClick={onButtonClick}>Get selected rows</button>
                    <AgGridReact
                        defaultColDef={{
                            flex: 1,
                            minWidth: 100,
                            resizable: true,
                        }}
                        rowData={rowData}
                        rowSelection="multiple"
                        onGridReady={onGridReady}
                        suppressRowClickSelection={true}>
                        <AgGridColumn 
                            field="account number" 
                            sortable={true} 
                            filter={true} 
                            headerCheckboxSelection={true}
                            headerCheckboxSelectionFilteredOnly={true}
                            checkboxSelection={true}>
                        </AgGridColumn>
                        <AgGridColumn field="account type" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="currency" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="balance" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="bank name" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="bank country" sortable={true} filter={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default App;
