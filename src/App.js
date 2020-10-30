import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import data from './data/bank-accounts.json';

const App = () => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState(data);

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
        <div className="ag-theme-alpine" style={ { height: 400, width: 1200 } }>
            <button onClick={onButtonClick}>Get selected rows</button>
            <AgGridReact
                rowData={rowData}
                rowSelection="multiple"
                onGridReady={onGridReady}>
                <AgGridColumn field="account number" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="account type" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="currency" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="balance" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="bank name" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="bank country" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default App;
