import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {  useRef, useMemo } from 'react'
import Select from 'react-select'

const Foundation = () => {
    const [nonprofits, setNonprofits] = useState([]);
    const tabeledataref = useRef(null)
    const [players, setplayers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8005/api/foundations/')
            .then(response => {
                tabeledataref.current = response.data
                setNonprofits(response.data);
                const uniqueNames = new Set(response.data.map(item => item.name));
                let arr = Array.from(uniqueNames).map(name => ({ value: name, label: name }));
                console.log('players =', arr)
                setplayers(arr)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleSelectOptions  = (option) =>{
        let arr = tabeledataref.current.filter((val)=>val.player_name===option.value)
        setNonprofits(arr)

    }

    return (
        // <div>
        //     <h1>Nonprofits</h1>
        //     <ul>
        //         {nonprofits.map(nonprofit => (
        //             <li key={nonprofit.id}>{nonprofit.name}</li>
        //         ))}
        //     </ul>
        // </div>
        <div>
        {/* <Header3/> */}
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
                        <h3>Welcome to Foundation Dashboard</h3>
                        Here you can find the information about most recent Foundations that have been made to top of yearly report with email
                    <div style={{display:'flex', gap:'20px'}}>
                    </div>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <Styledth>Name</Styledth>
                                <Styledth>Email</Styledth>
                            </tr>
                        </thead>
                        <Styledtbody>
                            {nonprofits?nonprofits.map((i)=>{
                                return(<tr>
                                    <Styledtd>{i.name}</Styledtd>
                                    <Styledtd>{i.email}</Styledtd>
                                </tr>)
                            }):null}
                        </Styledtbody>
                    </table>
                    <button>Create</button>
                </div>
            </div>
        </div>
    </div>
    </div>
        )
}

export default Foundation

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