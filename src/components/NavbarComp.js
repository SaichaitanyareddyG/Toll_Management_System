import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './Home'
import View_tolls from './View_tolls';
import Add_toll from './Add_toll';
import Add_vehicle from './Add_vehicle';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TextField from "@mui/material/TextField";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate
  } from "react-router-dom";
  

  export default function NavbarComp() {
    const [a, setTableData] = useState([])
    const[title,setTitle]=useState('Toll entries/vehicle entries')
    useEffect(() => {
      fetch("http://localhost:3000/data")
        .then((data) => data.json())
        .then((data) => setTableData(data))
  
    }, [])
    const navigate= useNavigate()
    const use= useLocation()
    console.log(use.pathname)
    
  const tolls=[]
   if (a.length!=[]){
    a.map((a,i) =>(
    tolls[i]=a.TollName
    ))
   }
      const handleSelect=(e)=>{
         navigate('/',{state:e})
    console.log(e)
  }
  useEffect(() => {
    console.log(use.pathname)
    use.pathname=='/View_tolls'?setTitle('Tollgate List'):setTitle('Toll entries/vehicle entries')
  })

  const tollChange=(e)=>{
    if(e.target.value!==''){
  navigate('/View_tolls',{state:e.target.value})
    
  console.log('sai',e.target.value)
  }
  else{
  navigate('/View_tolls',{state:null})
    
  console.log('sai',e.target.value)
  }
  
  }
  const handleChange=(e)=>{
       if(e.target.value!==''){
    navigate('/',{state:e.target.value})
       
console.log('sai',e.target.value)
}
else{
  navigate('/',{state:null})
       
console.log('sai',e.target.value)
}


}
    return (
        <div>
         
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > {
            
            title==='Tollgate List'?<div></div>:
          <NavDropdown  title={<FilterAltOutlinedIcon/>} id="navbarScrollingDropdown" eventKey={'default'} onSelect={handleSelect}>
          <NavDropdown.Item eventKey={null}>All</NavDropdown.Item>

          {
                  tolls.map((m) =>(
                    <NavDropdown.Item eventKey={m}>{m}</NavDropdown.Item>

                  ))
                }
        </NavDropdown>
  }
          
           { title==='Tollgate List'?<input style={{border: '1px solid black', borderRadius: 50,textAlign: 'center'}}
          id="outlined-basic"
          hover
          onMouseOut={tollChange}
          variant="outlined"
          fullWidth
          placeholder="Search"/>:<input style={{border: '1px solid black', borderRadius: 50,textAlign: 'center'}}
          id="outlined-basic"
          hover
          onMouseOut={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Search"/>}
          
        <Nav.Link as={Link} to={"/"} style={{width:80}} >Home</Nav.Link>
            <Nav.Link as={Link} to={"/Add_vehicle"} >Add vehicle entry</Nav.Link>
            <Nav.Link as={Link} to={"/Add_toll"} style={{width:80}}>Add Toll</Nav.Link>

            <Nav.Link as={Link} to={"/View_tolls"}>view all tolls</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
      <div>
      
      <Routes>
      <Route exact path="/" element={<Home data={'null'}/>}/>
      <Route  path="/View_tolls" element={<View_tolls/>}/>
      <Route  path="/Add_toll" element={<Add_toll/>}/>
      <Route  path="/Add_vehicle" element={<Add_vehicle />}/>

    

          
        </Routes>
        
        </div>
      </div>
    )
  }