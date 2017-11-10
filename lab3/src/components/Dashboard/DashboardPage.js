import React from "react"
import { Link } from "react-router-dom"
import { AppBar, FlatButton, Toggle } from "material-ui"

const Dashboard = isLogged => (
  <div>
    <AppBar
      title={isLogged ? "Добро пожаловать " : ""}
      iconElementRight={
        isLogged ? (
          <FlatButton label="Выйти" />
        ) : (
          <div>
            <FlatButton containerElement={<Link to="/login" />} label="Вход" />
            <FlatButton
              containerElement={<Link to="/register" />}
              label="Регистрация"
            />
          </div>
        )
      }
    />
    <Toggle
      label="Logged"
      defaultToggled={false}
      onToggle={this.handleChange}
      labelPosition="right"
    />
  </div>
)

export default Dashboard
