import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileUser() {
    const [user, setUser] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        axios.get("")
            .then(response => {
                const userData = response.data;
                setUser({
                    username: userData.username,
                    email: userData.email
                });
            })
            .catch(error => {
                console.error("There was an error fetching the user data!", error);
                setUser({ username: 'Error', email: 'Error fetching email' });  
            });
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}
