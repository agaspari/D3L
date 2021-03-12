import React, {Component} from 'react';
import styled from 'styled-components'

class facultyGrades extends Component{
    constructor(props){
        super(props);
        this.state= {
            students: [
                {id: 8852123,Name:'Tony Stark',Grade:'87%'},
                {id: 25836274,Name:'Thor Odinson',Grade:'72%'},
                {id: 6974185,Name:'Bruce Banner',Grade:'100%'},
                {id: 9236754,Name:'Clinton Barton',Grade:'70%'},
                {id: 6309781,Name:'Natalia Alianovna',Grade:'95%'},
                {id: 1346297,Name:'Henry Pym',Grade:'99%'},
                {id: 8643129,Name:'Carol Danvers',Grade:'78%'},
            ]
        };
    }
    onClickEdit(student){
        console.log(student)
    }
    renderTableData(){
        return this.state.students.map((student,index)=>{
            const{id,Name,Grade} = student
            return(
                <tr key={id}>
                    <td>{id}</td>
                    <td>{Name}</td>
                    <td>{Grade}</td>
                    <button onClick={()=>console.log("Edit clicked")}>Edit</button>
                </tr>
            )
        })
    }
    renderTableHeader(){
        let header = Object.keys(this.state.students[0])
        return header.map((key,index)=>{
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    
    render(){
        const ButtonGroup = styled.div`display: flex;`
        return(
            <div className = "studentGrades">
                <h1 id='title'>Grade Book</h1>
                <div className="studentInfo">
                    <table style=
                    {{"borderWidth":"1px",'borderColor':"#000000",'borderStyle':'solid',
                        borderCollapse: 'separate',paddingLeft: 260,'display':"flex"}} id='students'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div >   
            </div>
        )
    }
}

export default facultyGrades









