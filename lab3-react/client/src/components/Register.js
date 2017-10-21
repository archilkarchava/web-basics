import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import InputMask from 'react-input-mask';

export default class Register extends Component{

    styles = {
        errorStyle: {
            textAlign: 'left',
        }
    }

    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/
    emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
    phoneRegex = /^((8|(\+7))(\d){10,10})$|^((8|(\+7))[-(](\d){3,3}[-)](\d){3,3}[-](\d){2,2}[-](\d){2,2})$/

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            email:'',
            phone:'',
            errorUsernameMsg:'',
            errorPassMsg:'',
            errorEmailMsg:'',
            errorPhoneMsg:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    usernameValidator(){
        if(this.state.username.length <= 0){
            this.setState({errorUsernameMsg:"Поле обязательно для заполнения."})
            return false
        }
        else{
            this.setState({errorUsernameMsg:""})
            return true
        }
    }

    passwordValidator(){
        if(!this.passwordRegex.test(this.state.password)){
            if(this.state.password.length < 8){
                this.setState({errorPassMsg:"Пароль должен содержать минимум 8 символов."})
                return false
            }
            if(this.state.password.length > 16){
                this.setState({errorPassMsg:"Пароль не должен содержать больше 16 символов."})
                return false
            }
            if(/^[a-z\d]+$/.test(this.state.password)){
                this.setState({errorPassMsg:"В пароле должна быть как минимум одна заглавная буква."})
                return false
            }
            if(/^[A-Z\d]+$/.test(this.state.password)){
                this.setState({errorPassMsg:"В пароле должна быть как минимум одна прописная буква."})
                return false
            }
        }
        else{
            this.setState({errorPassMsg:""})
            return true
        }
    }

    emailValidator(){
        if(!this.emailRegex.test(this.state.email)){
            this.setState({errorEmailMsg:"Введите email в формате *@*.*."})
            return false
        }
        else{
            this.setState({errorEmailMsg:""})
            return true
        }
    }

    phoneValidator(){
        if(!this.phoneRegex.test(this.state.phone)){
            this.setState({errorPhoneMsg:"Введите телефон по-человечески."})
            return false
        }
        else{
            this.setState({errorPhoneMsg:""})
            return true
        }
    }

    handleChange(e){
        e.preventDefault();
        e.persist()
        this.setState({[e.target.name]: e.target.value}, () => {
            if(e.target.name === "username"){
                this.usernameValidator()
            }
            if(e.target.name === "password"){
                this.passwordValidator()
            }
            if(e.target.name === "email"){
                this.emailValidator()
            }
            if(e.target.name === "phone"){
                this.phoneValidator()
            }
        }, () => {});
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.username.length>0){
            if(this.passwordRegex.test(this.state.password)){
                if(this.emailRegex.test(this.state.email)){
                    if(this.phoneRegex.test(this.state.phone)){
                        var user =
                        {
                            "username": this.state.username,
                            "password": this.state.password,
                            "email": this.state.email,
                            "phone": this.state.phone
                        }

                        console.log(user.username)
                        console.log(user.password)
                        console.log(user.email)
                        console.log(user.phone)
                        alert("Вы зарегестрированы!")
                    }
                    else{
                        alert("Телефон должен начинаться с +7 или 8 и состоит из 11 цифр, допускается ввод через дефисы!")
                    }
                }
                else{
                    alert("Email введен неправильно!")
                }
            }
            else{
                alert("Пароль должен содержать 8-16 символов, строчные и заглавные буквы!")
            }
        }
        else{
            alert("Введите имя пользователя!")
        }
    }
    render(){
        return(
            <div className="App-registration">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Регистрация"/>
                        <form method="post" action="../../../../server/register" onSubmit={this.handleSubmit}>
                            <TextField
                                type="text"
                                name="username"
                                errorText={this.state.errorUsernameMsg}
                                errorStyle={this.styles.errorStyle}
                                floatingLabelText="Логин"
                                onChange={this.handleChange}
                            /> <br/>
                            <TextField
                                type="password"
                                name="password"
                                errorText={this.state.errorPassMsg}
                                errorStyle={this.styles.errorStyle}
                                floatingLabelText="Пароль"
                                onChange = {this.handleChange}
                            /> <br/>
                            <TextField
                                type="email"
                                name="email"
                                errorText={this.state.errorEmailMsg}
                                errorStyle={this.styles.errorStyle}
                                floatingLabelText="Email"
                                onChange = {this.handleChange}
                            /> <br/>
                            <TextField 
                                type="tel"
                                name="phone"
                                errorText={this.state.errorPhoneMsg}
                                errorStyle={this.styles.errorStyle}
                                floatingLabelText="Телефон"
                                onChange = {this.handleChange}
                            >
                            {/* <InputMask mask="+7 (999) 999-99-99" /> */}
                            </TextField> <br/> <br/>
                            <RaisedButton
                                type="submit"
                                label="Отправить"
                                primary={true}
                            />
                        </form> <br/>
                        <div>Уже зарегестрированы? <a href="#">Залогиньтесь</a></div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}