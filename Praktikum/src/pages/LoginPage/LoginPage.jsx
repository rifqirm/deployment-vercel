import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('')

    const onLogin = () => {

        console.log(user)
        const url = "https://reqres.in/api/login"

        axios.post(url, user)
            .then( res => {
                const token = res.data.token
                localStorage.setItem("token", token)
                navigate('/getstarted')
            })
            .catch(err => {
                setErrorMessage('Invalid username or password (hint: "email": "eve.holt@reqres.in", "password": "cityslicka")')
                console.log('Error login => ', err);
            })
    }

    return (
        <div className="container w-25 mt-5">
            <h4 className='mb-5'>Login Page</h4>
            <form>
                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                        Email address
                    </label>
                    <input type="email" 
                    id="form2Example1" 
                    className="form-control" 
                    value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />

                </div>
                {/* Password input */}
                <label className="form-label" htmlFor="form2Example2">
                    Password
                </label>
                <div className="form-outline mb-4">
                    <input type="password" 
                    id="form2Example2" 
                    className="form-control" 
                    value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />

                </div>

                <small className='text-danger'>{errorMessage}</small>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                        onClick={onLogin}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>

    )

}

export default LoginPage