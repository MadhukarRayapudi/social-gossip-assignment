import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

class ProfilePage extends Component {
    state = { userDetails: null, errorMessage: "" };

    async componentDidMount() {
        const jwtToken = localStorage.getItem("jwtToken");
        if (!jwtToken) {
            const { navigate } = this.props;
            navigate("/login/");
        } else {
            const response = await fetch("http://localhost:3000/profile/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                this.setState({ userDetails: data });
            } else {
                this.setState({ errorMessage: "Failed to fetch profile details" });
            }
        }
    }

    onLogout = () =>{
        const {navigate} = this.props
        navigate("/login/")
    }

    render() {
        const { userDetails, errorMessage } = this.state;

        if (errorMessage) {
            return <p>{errorMessage}</p>;
        }

        if (!userDetails) {
            return <p>Loading...</p>;
        }

        const { firstName, lastName, email, mobileNumber } = userDetails;

        return (
            <div className="profile-page">
                <h1 className = "profile-details-heading">Profile Details</h1>
                <div className = "profile-details-container">
                    <p><strong>First Name:</strong> {firstName}</p>
                    <p><strong>Last Name:</strong> {lastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Mobile Number:</strong> {mobileNumber}</p>
                </div>
                <button className = "logout-btn" onClick = {this.onLogout}> Logout </button> 
            </div>
        );
    }
}

// Wrapper functional component
const ProfilePageWrapper = (props) => {
    const navigate = useNavigate();
    return <ProfilePage {...props} navigate={navigate} />;
};

export default ProfilePageWrapper;
