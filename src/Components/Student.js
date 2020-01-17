import React, { Component } from 'react';
import '../student.css';

export default class Student extends Component {

    constructor(props){
        super(props);
        this.state={
            on:false,
            showPlusButton:true,
            tagsInput:'',
            tags:[]
        }
    }

    // function for calculating the average score of a student
    getAverage = (arr) =>{
        let sum=0;
        let average=0;
        let i;

        for(i=0;i<arr.length;i++){
            arr[i]=parseInt(arr[i]);
            sum+=arr[i];
        }
        average=sum/8;
        return average;
    }

    // function for changing the state of whether a student tab is open or not
    toggle = () =>{
        this.setState({
            on:!this.state.on,
            showPlusButton:!this.state.showPlusButton
        })
    }

    // function for detecting change on a add-tag input field
    onChangeTagInput = (e) =>{
        this.setState({
            tagsInput: e.target.value
        })
    }

    // function for adding a new tag to a student's profile, also calling the addTag function in AllStudents component
    onSubmit = (e) =>{
        e.preventDefault();

        if(!(this.state.tags.includes(this.state.tagsInput))){
            this.state.tags.push(this.state.tagsInput);
        }
        this.setState({tagsInput: ""});
        this.props.addTag(this.props.id, this.state.tagsInput);
    }


    render() { 
        return(
            <div className="each_student row">

                <div className="col-md-6">
                    <img src={this.props.pic} alt="student avatar"/>      
                </div>

                <div className="col-md-6 row">
                    <div className="col-md-6">
                        <ul>
                            <li key="firstname" className="student">{this.props.firstName}{" "}{this.props.lastName}</li>
                            <li key="email">Email:{this.props.email}</li>
                            <li key="company">Company:{this.props.company}</li>
                            <li key="skill">Skill: {this.props.skill}</li>
                            <li key="grades">Average: {this.getAverage(this.props.grades)}%</li>
                        </ul>

                        {this.state.on &&

                        <div>
                            <ul>
                                {this.props.grades.map(function(name,index){
                                    return <li key={index}>Test {index}: {name}%</li>;
                                }
                                )}
                            </ul>
                            
                            {this.state.tags && this.state.tags.map(tag => <ul className="list-group"><li key={tag} className="list-group-item">{tag}</li></ul>)}

                            <form onSubmit={this.onSubmit}>
                                <input
                                    className="add-tag-input" 
                                    value={this.state.tagsInput}
                                    onChange={this.onChangeTagInput}
                                    type="text" 
                                    placeholder="Add a tag" />

                            </form>
                        </div>
                        }

                    </div>

                    <div className="buttons col-md-6 ">

                    {
                        (this.state.showPlusButton)?
                        <button className="expand-btn" onClick={this.toggle}>+</button>:
                        <button className="expand-btn" onClick={this.toggle}>-</button>
                    }


                    </div>
                        
                </div>
            </div>
        
        );
    }
}
 
