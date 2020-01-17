import React from 'react';
import axios from 'axios';
import Student from './Student';

export default class AllStudents extends React.Component{
    // calling the constructor for setting the initial state
    constructor(props){
        super(props);
        this.state={
            students:[],
            nameSearch:'',
            tagSearch:'',
            on:false
        }
    }

    // fetch the API as soon as the page loads to retrieve student list
    componentDidMount(){
        axios.get('https://APIKEY')
            .then(res=>{
                let studentsArr = res.data.students;
                for(let i=0; i<studentsArr.length; i++){
                    // changing the id attribute of each student to its index in the array
                    studentsArr[i]["id"] = i;
                    // adding the tags attribute for each student
                    studentsArr[i]["tags"] = [];
                }
                this.setState({students:studentsArr});
            });
    }


    // function for matching the student names with search term, by comparing the lower case of first and last name
    onSearchName = (name) => {
            return a=>{
                return a.firstName.toLowerCase().includes(name.toLowerCase()) || a.lastName.toLowerCase().includes(name.toLowerCase()) || !name;
            }
        }
        

    // function for matching the tags with search term
    onSearchTags = (tag) => {
        return s=>{
            if(tag === ""){
                return true;
            }else{
                let match = false;
                for(let i=0; i<s.tags.length; i++){
                    if(s.tags[i].indexOf(tag)>=0){
                        match = true;
                        break;
                    }
                }
                return match;
            }
        }
    }

    // function for changing the state when the name search bar value changes
    onChangeNameInput = (e) => {
        this.setState({nameSearch:e.target.value});
    }

    // function for changing the state when the tag search bar value changes
    onChangeTagInput = (e) => {
        this.setState({tagSearch:e.target.value});
    }

    // function called when a tag is added to a student's state
    addTag = (id, tag) =>{
        console.log("Student id with new tag is: " + id);
        console.log("New Student tag is: " + tag);
        // adding new tag to student's tags array
        let newStudentsState = this.state.students;
        newStudentsState[id]["tags"].push(tag);
        this.setState({students:newStudentsState})
    }

    render(){
        return(
            <div>
                <form>
                    <input 
                        id="name-input" 
                        type="text"  
                        onChange={this.onChangeNameInput} 
                        placeholder="Search by name" 
                        value={this.state.nameSearch}
                    />
                    <br></br>
                    <input 
                        id="tag-input" 
                        type="text"  
                        onChange={this.onChangeTagInput} 
                        placeholder="Search by tag" 
                        value={this.state.tagSearch}
                    />
                </form> 
                    {this.state.students.filter(this.onSearchName(this.state.nameSearch)).filter(this.onSearchTags(this.state.tagSearch)).map((student, id)=>{
                        return (
                            <Student id={id} pic={student.pic} firstName={student.firstName} lastName={student.lastName} email={student.email} company={student.company} skill={student.skill} grades={student.grades} addTag={this.addTag}/>    
                        )
                        })
                    }
            </div>
        )
    }

}