import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Toll from './tolls.json'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,useNavigate
} from "react-router-dom";
function Add_vehicle() {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [bd]=useState([]);
    const [sj]=useState([]);
    const [triff]=useState([]);
    const [a, setTableData] = useState([])
    const[tableData,setTableData3] = useState([])
    const date = new Date();
    const [formData, setFormData] = React.useState(
      {
        TollName:"",
        vehicleType: "",
          vehicleNumber: "", 
          dateTime:"",
          tariff: "",
         
          
      }
  )
  const isEnabled = formData.tariff.length > 0;

  const navigate = new useNavigate()
  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then((data) => data.json())
      .then((data) => setTableData(data))
      openModal()

  }, [])
  
const tolls=[]
 if (a.length!=[]){
  a.map((a,i) =>(
  tolls[i]=a.TollName
  ))
  console.log(tolls)
 }
 var d=[]
    if(a.length !=[]){
      for(var j = 0; j < a.length; j++){
        var b ={}
for (var i = 0;i<a[j].data.length;i++){
  b["id"]=a[j]["id"]
  b["TollName"]=a[j]["TollName"];
  b[a[j].data[i]["vehicleType"]] = a[j].data[i]["singleJourney"].concat("/",a[j].data[i]["returnJourney"])
}
d.push(b);
}
console.log(d);

    }
  const time=  date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    function toSeconds(time_str) {
      var parts = time_str.split(':');
  
      return parts[0] * 3600 + 
             parts[1] * 60 +   
             +parts[2];        
  }
  function handleChange(event) {
      const {name, value, type, checked} = event.target
            console.log(value)
            if(bd.length>=2 && value.length==10)
                  bd.push(value)
            else
              if(bd.length<2)
              bd.push(value)
            console.log(bd,bd.length)
             if(bd.length>2){
              var difference;
              tableData.filter((item)=>(item.TollName==bd[0])&&(item.vehicleNumber==bd[2])).map((it)=>{
                console.log(it.dateTime)
                var x=it.dateTime.split(", ")
                console.log(time)
                var y=time.split(", ")
                console.log(sj)
                 difference = Math.abs(toSeconds(x[1]) - toSeconds(y[1]));
                  console.log(difference)
               })
               if(difference>0)
               difference>3600?triff.push(sj[0][0]):triff.push(sj[0][1])
               else
                  triff.push(sj[0][0])
            }
 



             if(bd.length==2){
              
               d.filter((item)=>(item.TollName==bd[0])).map((it)=>{
                var l=Object.keys(it)
                console.log(l);
                var k=bd[1]
                console.log(it[k])
                sj.push(it[k].split("/"))
               })
               
               
            } 

      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: type === "checkbox" ? checked : value
          }
      })
  }
  
  function handleSubmit(event) {
    setIsOpen(false);

      event.preventDefault()
      // submitToApi(formData)
      console.log(formData)
  }
  
    function openModal() {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
    useEffect(() => {
      fetch("http://localhost:8000/entries")
        .then((data) => data.json())
        .then((data) => setTableData3(data))
  
    }, [])

    const style = {
      content: {
        border: '2px solid black',
        borderRadius: '20px',
        bottom: '5%',
        height: '70%',  // set height
        left: '35%',
        padding: '2rem',
        position: 'fixed',
        right: 'auto',
        top: '20%', // start from center
        width: '25%',
        maxWidth: '40rem'
      }
    };

    const data={
      "id":tableData.length+1,
      "TollName": formData.TollName,
      "vehicleNumber":formData.vehicleNumber,
      "vehicleType":formData.vehicleType,
      "dateTime":time,
      "tariff": triff[0]

    }
    function getData(){
      setIsOpen(false);
      console.log(data);
      console.log(b);
    fetch('http://localhost:8000/entries/', {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(data),
 })
 .then(response => response.json())
 .catch(error => console.error('Error:', error))
 .then(response => console.log('Success:', JSON.stringify(response)));
 alert('Succcessfully add vehicle')
 navigate('/',{state:null})

    }
  return (
    <div>
      <Modal style={style}
        isOpen={modalIsOpen}
      
        contentLabel="Example Modal"
      >
      <div  style={{textAlign:'right'}}>
      
        <Link to="/" className='btn btn-danger'  onClick={closeModal}>X</Link>
        </div>
        <h4 style={{textAlign:'center' ,top:'50%'}}> Add new entry</h4>
<br />
       
        <form onSubmit={handleSubmit} style={{textAlign:'center'}}>
          <label>Select Toll Name<span style={{color:'red'}}>*</span></label>
            <br />
            <select 
                id="TollName" 
                value={formData.TollName}
                onChange={handleChange}
                name="TollName"
                required
                style={{width:'100%'}}
            >
                <option value="Select Toll">Select Toll Name</option>
                {
                  tolls.map((m) =>(
                    <option value={m}>{m}</option>
                  ))
                }
            </select><br /><br/>
            <label>Select vehicle Type<span style={{color:'red'}}>*</span></label>
<br/>

            <select 
                id="vehicleType" 
                value={formData.vehicleType}
                onChange={handleChange}
                name="vehicleType"
                required
            
                style={{width:'100%'}}
            >
                <option value="Select Vehicle Type">Select Vehicle Type</option>
                {
                  Toll.map((m) =>(
                    <option value={m.vehicleType}>{m.vehicleType}</option>
                  ))
                }
            </select><br /><br/>
            <label>Vehicle Number<span style={{color:'red'}}>*</span></label><br />

            <input
                type="text"
                placeholder="vehicle number"
                onChange={handleChange}
                name="vehicleNumber"
                required
                value={formData.vehicleNumber}
            
                style={{width:'100%'}}
            />
            <br /><br/>
                        <label>Tariff<span style={{color:'red'}}>*</span></label>
<br />
            <input
                type="number"
                placeholder="ammount"
                onMouseOut={handleChange}
                name="tariff"
                value={triff[0]}
                required="required"
                disabled
                style={{width:'100%'}}
            />
      
            <br /><br/>
        
            <button className="btn btn-primary"  disabled={!isEnabled} onClick={getData}>Submit</button>
        </form>
        

      </Modal>
    </div>
  );
}


export default Add_vehicle;
