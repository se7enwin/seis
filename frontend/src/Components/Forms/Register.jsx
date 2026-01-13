import React from 'react';
import { validate } from './validation';
//import Pantalla from '../../responsive';


export default function Register({ createLogin }) {

    const [userData, setUserData] = React.useState({
        username: '',
        password: '',
        age: 0,

    })

    const [errors, setErrors] = React.useState({})


    return (


        <div>

            <form onSubmit={handleSubmit}>

                <p style={{ color: 'violet' }}>Registrate</p>
                <label htmlFor='username' style={{ color: 'yellow' }}>  E-Mail </label>
                <input type='text' name='username' onChange={handleInputchange} value={userData.username} />
                <p style={{ color: 'red' }}>{errors.username}</p>
                <label htmlFor='username' style={{ color: 'yellow' }}>Nací en el</label>
                <input type='number' name='age' onChange={handleInputchange} value={userData.age} />
                <label htmlFor='password' style={{ color: 'yellow' }}>Password</label>
                <input type='password' name='password' onChange={handleInputchange} value={userData.password} />
                <p style={{ color: 'red' }}>{errors.password}</p>
                <button type='submit' className="btn btn-success">Enviar Datos / Home</button>

            </form>
        </div>

    );
    function handleInputchange(e) {
        setErrors(validate({ ...userData, [e.target.name]: e.target.value }))
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {

        e.preventDefault();
        { Object.keys(errors).length == 0 && createLogin(userData); }
        setUserData({
            username: '',
            age: 0,
            password: '',
        })

    }
}