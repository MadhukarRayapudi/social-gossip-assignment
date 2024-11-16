import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

class SignUpPage extends Component {
    state = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
        errorMessage: ""
    };

    onInputChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    onSubmitSignUpForm = async (event) => {
        event.preventDefault();
        const { firstName, lastName, mobileNumber, email, password } = this.state;
        const userDetails = { firstName, lastName, mobileNumber, email, password };

        try {
            const response = await fetch("http://localhost:3000/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDetails),
            });

            const result = await response.json();

            if (response.ok) {
                this.props.navigate("/login/"); // Redirect to login
            } else {
                this.setState({ errorMessage: result.error });
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            this.setState({ errorMessage: "Something went wrong. Please try again later." });
        }
    };

    onClickHaveAnAcntBtn = () => {
        this.props.navigate("/login/");
    };

    render() {
        const { firstName, lastName, mobileNumber, email, password, errorMessage } = this.state;

        return (
            <div className="sign-up-page">
                <form className="sign-up-form" onSubmit={this.onSubmitSignUpForm}>
                    <h1 className="sign-up-heading">Signup</h1>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <label className="label" htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        className="input-container"
                        id="firstName"
                        value={firstName}
                        onChange={this.onInputChange}
                        placeholder="First name"
                    />

                    <label className="label" htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        className="input-container"
                        id="lastName"
                        value={lastName}
                        onChange={this.onInputChange}
                        placeholder="Last name"
                    />

                    <label className="label" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="input-container"
                        id="email"
                        value={email}
                        onChange={this.onInputChange}
                        placeholder="Email"
                    />

                    <label className="label" htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="text"
                        className="input-container"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={this.onInputChange}
                        placeholder="Mobile number"
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

                    <button
                        type="button"
                        className="have-an-acnt-btn"
                        onClick={this.onClickHaveAnAcntBtn}
                    >
                        Already have an account?
                    </button>
                    <button type="submit" className="sign-up-btn">Sign Up</button>
                </form>
            </div>
        );
    }
}

// Wrapper functional component
const SignUpPageWrapper = (props) => {
    const navigate = useNavigate();
    return <SignUpPage {...props} navigate={navigate} />;
};

export default SignUpPageWrapper;
