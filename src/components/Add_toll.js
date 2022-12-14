import { error } from 'console';
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Toll from './tolls.json'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
function Add_toll() {
    const [modalIsOpen, setIsOpen] = React.useState(true);
    const [a, setTableData] = useState([])

    const [formData, setFormData] = React.useState(
      {
        TollName:"",
        vehicleType: "",
          singleJourney: "", 
          returnJourney: "",
          vehicleType1: "",
          singleJourney1: "", 
          returnJourney1: "",
          vehicleTypeJourney2: "",
          singleJourney2: "", 
          return2: "",
          vehicleTypeJourney3: "",
          singleJourney3: "", 
          returnJourney3: ""
          
      }
  )
  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then((data) => data.json())
      .then((data) => setTableData(data))
      openModal()

  }, [])
    function handleChange(event) {
      const {name, value, type, checked} = event.target
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
    console.log('sai',a)
    var data={}
    if(a.length>0){
    let n=a.length-1;
    console.log(a[n].id)
    
     data={
      "id":a[n].id+1,
      "TollName": formData.TollName,
      "data": [{
        "id":1,
        "vehicleType": formData.vehicleType,
        "singleJourney": formData.singleJourney,
        "returnJourney": formData.returnJourney
      },
      {
        "id":2,
        "vehicleType": formData.vehicleType1,
        "singleJourney": formData.singleJourney1,
        "returnJourney": formData.returnJourney1
      },
      {
        "id":3,
        "vehicleType": formData.vehicleType2,
        "singleJourney": formData.singleJourney2,
        "returnJourney": formData.returnJourney2
      },
      {
        "id":4,
        "vehicleType": formData.vehicleType3,
        "singleJourney": formData.singleJourney3,
        "returnJourney": formData.returnJourney3
      },
    ]
  }
    }
    const style = {
      content: {
        border: '1px solid black',
        borderRadius: '5px',
        bottom: '15%',
        height: '70%',  // set height
        left: '30%',
        padding: '2rem',
        position: 'fixed',
        right: 'auto',
        top: '20%', // start from center
        width: '70%',
        maxWidth: '40rem',
      }
    };
    function getData(){
      setIsOpen(false);
      var tolls=[]
      a.map((item,i)=>(
       tolls[i]=item.TollName
      ))
      console.log(tolls,data.TollName,tolls.includes(data.TollName))
      if(!tolls.includes(data.TollName)){
      console.log(data);
    fetch('http://localhost:8000/data', {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(data),
 })
 .then(response => response.json())
 .catch(error => console.error('Error:', error))
 .then(response => console.log('Success:', JSON.stringify(response)));

    }
    else{
      alert(" Toll is already available");
    }
  }
  
  return (
    
    <div className='container'>
      <Modal style={style}
        isOpen={modalIsOpen}
      
        contentLabel="Example Modal"
      >
       <div style={{textAlign:'right',top:0}} >
        <Link to="/View_tolls" className='btn btn-danger' onClick={closeModal}>X</Link></div>
                <h4 style={{textAlign:'center'}}>Add new toll</h4><br/>
        <form onSubmit={handleSubmit}>
          <label>Toll Name<span style={{color:'red'}}>*</span></label>
            <br />
            <input
                type="text"
                placeholder="Enter Toll Name"
                onChange={handleChange}
                name="TollName"
                value={formData.TollName}
                style={{width: '100%'}}
            />
            <br/><br/>
            <label>Vehicle fare details<span style={{color:'red'}}>*</span></label><br />

            <select 
                id="vehicleType" 
                value={formData.vehicleType}
                onChange={handleChange}
                name="vehicleType"
            >
                <option value="Select Vehicle Type">Select Vehicle Type</option>
                {
                  Toll.map((m) =>(
                    <option value={m.vehicleType}>{m.vehicleType}</option>
                  ))
                }
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="singleJourney"
                onChange={handleChange}
                name="singleJourney"
                value={formData.singleJourney}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="returnJourney"
                onChange={handleChange}
                name="returnJourney"
                value={formData.returnJourney}
            />
      
            <br /><br/>
            <select 
                id="vehicleType1" 
                value={formData.vehicleType1}
                onChange={handleChange}
                name="vehicleType1"
            >
                <option value="Select Vehicle Type">Select Vehicle Type</option>
                {
                  Toll.map((m) =>(
                    <option value={m.vehicleType}>{m.vehicleType}</option>
                  ))
                }
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="singleJourney"
                onChange={handleChange}
                name="singleJourney1"
                value={formData.singleJourney1}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="returnJourney"
                onChange={handleChange}
                name="returnJourney1"
                value={formData.returnJourney1}
            />
      
            <br /><br />
            <select 
                id="vehicleType2" 
                value={formData.vehicleType2}
                onChange={handleChange}
                name="vehicleType2"
            >
                <option value="Select Vehicle Type">Select Vehicle Type</option>
                {
                  Toll.map((m) =>(
                    <option value={m.vehicleType}>{m.vehicleType}</option>
                  ))
                }
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="singleJourney"
                onChange={handleChange}
                name="singleJourney2"
                value={formData.singleJourney2}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="returnJourney"
                onChange={handleChange}
                name="returnJourney2"
                value={formData.returnJourney2}
            />
      
            <br /><br />
            <select 
                id="vehicleType3" 
                value={formData.vehicleType3}
                onChange={handleChange}
                name="vehicleType3"
            >
                <option value="Select Vehicle Type">Select Vehicle Type</option>
                {
                  Toll.map((m) =>(
                    <option value={m.vehicleType}>{m.vehicleType}</option>
                  ))
                }
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="singleJourney"
                onChange={handleChange}
                name="singleJourney3"
                value={formData.singleJourney3}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <input
                type="number"
                placeholder="returnJourney"
                onChange={handleChange}
                name="returnJourney3"
                value={formData.returnJourney3}
            />
      
            <br />
            <br />
            
            <Link to="/View_tolls" className='btn btn-primary' style={{width:'100%',textAlign:'center'}} onClick={getData}>Submit</Link>
        </form>
        

      </Modal>
    </div>
  );
}


export default Add_toll