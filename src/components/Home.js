import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate, useLocation} from "react-router-dom";
import { style } from '@mui/system';
const columns = [
  { field: 'vehicleType', headerName: 'VEHICLE TYPE', width: 300 },
  { field: 'vehicleNumber', headerName: 'VEHICLE NUMBER', width: 300 },
  { field: 'dateTime', headerName: 'DATE/TIME', width: 300 },
  { field: 'TollName', headerName: 'TOLL NAME', width: 200 },

  { field: 'tariff', headerName: 'TARIFF' },

]

const Home = (props) => {


  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/entries")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])
 let location = useLocation();
  const toll=location.state
  console.log(toll)
  const dat=[]
      if(toll!=null || toll!='null'){
        tableData.filter((item)=>(item.TollName==toll)||(item.vehicleNumber==toll)).map((item1) =>(
         dat.push({
          id: item1.id,
          TollName: item1.TollName,
          vehicleNumber: item1.vehicleNumber,
          vehicleType: item1.vehicleType,
          dateTime: item1.dateTime,
          tariff: item1.tariff
         })
        ))
      }


  return (
    <div style={{ height: 400, width: '100%'}}>
      <br/><br/>
      {
      (toll!=(null )) ?
      <DataGrid
      sx={{
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
        rows={dat}
        columns={columns}
        pageSize={5}
      />:<DataGrid
      
      rows={tableData}
      columns={columns}
      pageSize={5}/>
}
    </div>
  )
}

export default Home;