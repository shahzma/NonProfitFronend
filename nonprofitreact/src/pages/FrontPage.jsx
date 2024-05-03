import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {  useRef, useMemo } from 'react'
import Select from 'react-select'



const FrontPage = () => {
    const [nonprofits, setNonprofits] = useState([]);
    const tabeledataref = useRef(null)
    const [players, setplayers] = useState([])
    const [newNonprofit, setNewNonprofit] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [isFormVisible, setFormVisible] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8005/api/nonprofits/');
                let res = await axios.get('http://localhost:8005/api/emailrecords/')
                const uniqueNames = new Set(response.data.map(item => item.name));
                let arr = Array.from(uniqueNames).map(name => ({ value: name, label: name }));
                setplayers(arr);
                res = res.data
                response = response.data.map(i=>{
                    const msg = res.filter((val)=>val.nonprofit===i.id).map((val)=>val.message)
                    return(
                        {...i, msg:msg}
                    )
                })
                setNonprofits(response);
                tabeledataref.current = response;
                console.log('repsonse = ', response)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const handleSelectOptions  = (option) =>{
        console.log('option = ',option, tabeledataref.current)
        let arr = tabeledataref.current.filter((val)=>val.name===option.value)
        setNonprofits(arr)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNonprofit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('nonlen = ',nonprofits.length )
        setNonprofits([...nonprofits, { ...newNonprofit, id: nonprofits.length + 1, msg: '' }]);
        setFormVisible(false);
        setNewNonprofit({ name: '', email: '', address: '' }); // Reset form
    };

    const SendMail = (id)=>{
        axios.post(`http://localhost:8005/api/emailrecords/`, {message:'test', nonprofit:id})
        .then(response => {
            console.log(response);
            window.location.reload()
        })
    }

    return (

        <div>
        <div style={{paddingLeft:'3.5vw', paddingRight:'3.5vw', paddingTop:'2vh', paddingBottom:'2vh'}}>
            <h2>Temelio</h2>
            {/* <>
                    {breadcrumbArr?.map((obj, i) => (
                    <BreadCrumbSpan
                        onClick={(e) => {
                        handleClickTree(i, obj.key);
                        }}
                        key={i}
                    >
                        {obj.label} /{" "}
                    </BreadCrumbSpan>
                    ))}
            </> */}
        </div>
        <div style={{paddingLeft:'3.5vw', paddingRight:'3.5vw', paddingTop:'2vh', paddingBottom:'2vh', backgroundColor:'#E5F5FF'}}>
            <div style={{padding:'3.5vw', backgroundColor:'white', marginTop:'10px'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'40px', gap:'100px'}}>
                    <div>
                        <h3>Welcome to NonProfit Dashboard</h3>
                        Here you can find the information about most recent Non profits that have been made to top of yearly report including email,  address and option to send them mail.
                    </div>
                    <div style={{display:'flex', gap:'20px'}}>
                        <div>
                            <Select
                            name="columns"
                            options={players}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelectOptions}
                            isSearchable = {true}
                            />
                        </div>
                    </div>
                </div>


                <table>
                    <thead>
                        <tr>
                            <Styledth>Name</Styledth>
                            <Styledth>Email</Styledth>
                            <Styledth>Address</Styledth>
                            <Styledth>Action</Styledth>
                        </tr>
                    </thead>
                    <Styledtbody>
                        {nonprofits?nonprofits.map((i)=>{
                            return(<tr>
                                <Styledtd>{i.name}</Styledtd>
                                <Styledtd>{i.email}</Styledtd>
                                <Styledtd>{i.address}</Styledtd>
                                <Styledtd>{i.msg?i.msg:<button onClick={() => SendMail(i.id)}>Send Email</button>}</Styledtd>
                            </tr>)
                        }):null}
                        {isFormVisible && (
                        <tr>
                            <Styledtd><input value={newNonprofit.name} onChange={handleInputChange} name="name" placeholder="Name" /></Styledtd>
                            <Styledtd><input value={newNonprofit.email} onChange={handleInputChange} name="email" placeholder="Email" /></Styledtd>
                            <Styledtd><input value={newNonprofit.address} onChange={handleInputChange} name="address" placeholder="Address" /></Styledtd>
                            <Styledtd><button onClick={handleSubmit}>Save</button></Styledtd>
                        </tr>
                    )}
                    </Styledtbody>
                </table>
                <button onClick={() => setFormVisible(true)}>+ Create</button>
            </div>
        </div>
    </div>
        )
}

export default FrontPage

const Styledth = styled.th`
    border: 1px solid #DBDBDB;
    min-width:250px;
    padding: 15px;
    background-color:#D4EEFF;
`

const Styledtd = styled.td`
    padding:15px;
    border: 1px solid #DBDBDB;
    /* border-bottom: 0px; */
    border-top:0px;
`

const Styledtbody = styled.tbody`
    border: 1px solid #DBDBDB;
`

const BreadCrumbSpan = styled.span`
color:grey;
  &:hover {
    color: #20a6ff;
    cursor: pointer;
  }
`;