import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            phone:''
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.username.length>0 && /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/.test(this.state.password) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.state.email) && /^((8|(\+7))(\d){10,10})$|^((8|(\+7))[-](\d){3,3}[-](\d){3,3}[-](\d){2,2}[-](\d){2,2})$/.test(this.state.phone)){
            var user={
                "username": this.state.username,
                "password":this.state.password,
                "email":this.state.email,
                "phone":this.state.phone,
            }
            alert("Вы зарегестрированы!");
            console.log(user.username);
            console.log(user.password);
            console.log(user.email);
            console.log(user.phone);
        }
        else{
            alert("Вы неправильно ввели данные!");
        }
    }
    render(){
        return(
            <div className="App-registration">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Регистрация"/>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <TextField floatingLabelText="Логин" hintText="Введите имя пользователя" onChange = {(event,newValue) => this.setState({username:newValue})}/> <br/>
                            <TextField type="password" floatingLabelText="Пароль" hintText="Введите пароль" onChange = {(event,newValue) => this.setState({password:newValue})}/> <br/>
                            <TextField type="email" floatingLabelText="Email" hintText="Введите email" onChange = {(event,newValue) => this.setState({email:newValue})}/> <br/>
                            <TextField type="tel" floatingLabelText="Телефон" onChange = {(event,newValue) => this.setState({phone:newValue})}/> <br/> <br/>
                            <RaisedButton type="submit" label="Отправить" primary={true}/>
                        </form> <br/>
                        <div>Уже зарегестрированы? <a href="#">Залогиньтесь</a></div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}