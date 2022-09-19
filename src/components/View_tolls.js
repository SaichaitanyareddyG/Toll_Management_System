import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { useNavigate, useLocation} from "react-router-dom";


  const View_tolls = () => { 
    const [a, setTableData] = useState([])
    const [deletedRows, setDeletedRows] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch("http://localhost:3000/data")
        .then((data) => data.json())
        .then((data) => setTableData(data))
  
    }, [])
 

    const handleRowSelection = (event, cellValues) => {
      console.log('sai',cellValues.row.id)
      fetch('http://localhost:3000/data/'+cellValues.row.id, { method: 'DELETE' })
      .then(() => console.log('successfully'+cellValues.row.id))
      window.location.reload(false);    };
      const columns = [
        { field: 'TollName', headerName: 'TOLL NAME', width: 200 },
        { field: 'Car/Jeep/Van', headerName: 'CAR/JEEP/VAN', width: 200 },
        { field: 'LCV', headerName: 'LCV', width: 200 },
        { field: 'Truck/Bus', headerName: 'TRUCK/BUS', width: 260 },
        { field: 'Heavy vehicle', headerName: 'HEAVY VEHICLE', width: 200 },
        {
          field: "Delete",
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                style={{backgroundColor:'#E52F2F' ,color:'white'}}
                onClick={(event) => {
                  handleRowSelection(event, cellValues);
                }}
              >
                Delete
              </Button>
            );
          }
        }
      
      ]




    let location = useLocation();
    const toll=location.state
    var d=[]
    var tols=[]
    if(a.length !=[]){
      for(var j = 0; j < a.length; j++){
        var b ={}
for (var i = 0;i<a[j].data.length;i++){
  b["id"]=a[j]["id"]
  b["TollName"]=a[j]["TollName"];
  b[a[j].data[i]["vehicleType"]] = a[j].data[i]["singleJourney"].concat("/",a[j].data[i]["returnJourney"])
}
d.push(b);
//c=[{"id":1,"Toll Name": 'kadapa', "Car/Jeep/Van": '55/66', "LCV": '77/88', "Heavy vehicle": '99/100', "Truck/Bus": '11/22'}]
if(b.TollName==toll){
    tols.push(b)
}
}
console.log(d);

    }

   
    
    
  return (
    <div>
   <br/><br/>
      <div style={{ height: 300, width: '100%' }}>
      {
      (toll!=(null )) ?
      <DataGrid 
        rows={tols}
        columns={columns}
        checkboxSelection
        pageSize={5}
      />: <DataGrid
      rows={d}
      columns={columns}
      pageSize={5}/>
  }
    </div>
    </div>
  )
}

export default View_tolls;
