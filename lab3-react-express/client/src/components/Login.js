import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username.length > 0) {
            if (this.state.password.length > 0) {
                var payload = {
                    "username": this.state.username,
                    "password": this.state.password,
                }
                axios.post('/user/login', payload)
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response.data);
                        }
                        else {
                            console.log("Ошибка. Извини!", response.status);
                        }
                    })
                    .catch(function (error) { console.log(error); });
            }
            else {
                alert("Введите пароль!");
            }
        }
        else {
            alert("Введите имя пользователя");
        }
    }
    render() {
        return (
            <MuiThemeProvider>
            <div className="app-login">
                <AppBar title="Вход" />
                <form method="post" onSubmit={this.handleSubmit}>
                    <TextField
                        type="text"
                        name="username"
                        floatingLabelText="Логин"
                        onChange={this.handleChange}
                    /> <br />
                    <TextField
                        type="password"
                        name="password"
                        floatingLabelText="Пароль"
                        onChange={this.handleChange}
                    /> <br /> <br />
                    <RaisedButton
                        type="submit"
                        label="Войти"
                        primary={true}
                    />
                </form> <br />
                <div>Еще не зарегестрированы? <Link to='/register'>Регистрация</Link></div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Login;