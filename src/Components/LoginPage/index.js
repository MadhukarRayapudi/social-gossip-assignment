import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

class LoginPage extends Component {
    state = { email: "", password: "", errorMessage: "" };

    onInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onSubmitLoginForm = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const userDetails = { email, password };

        const response = await fetch("http://localhost:3000/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDetails),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("jwtToken", result.jwtToken); // Save token to localStorage
            const { navigate } = this.props;
            navigate("/profile/"); // Redirect to profile page
        } else {
            this.setState({ errorMessage: result.error });
        }
    };

    onClickHaveAnAcntBtn = () =>{
        const {navigate} = this.props
        navigate("/signup/")
    }

    render() {
        const { email, password, errorMessage } = this.state;

        return (
            <div className="login-page">
                <form className="login-form" onSubmit={this.onSubmitLoginForm}>
                    <h1 className="login-heading">Login</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <label className="label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="input-container"
                        id="email"
                        value={email}
                        onChange={this.onInputChange}
                        placeholder="Email"
                    />
                    <label className="label" htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="input-container"
                        id="password"
                        value={password}
                        onChange={this.onInputChange}
                        placeholder="Password"
                    />
                    <button type="submit" className="login-btn">Login</button>

                    <button
                        type="button"
                        className="have-an-acnt-btn"
                        onClick={this.onClickHaveAnAcntBtn}
                    >
                        Don't have an account?
                    </button>
                </form>
            </div>
        );
    }
}

const LoginPageWrapper = (props) => {
    const navigate = useNavigate();
    return <LoginPage {...props} navigate={navigate} />;
};

export default LoginPageWrapper;
