import React from 'react';
import { validate } from './validation';
//import Pantalla from '../../responsive';
import Card from '../Card/Card';


export default function Form({ login }) {

    const [userData, setUserData] = React.useState({
        username: '',
        password: '',

    })

    const [errors, setErrors] = React.useState({})


    return (


        <div>

            <form onSubmit={handleSubmit}>


                <label htmlFor='username' style={{ color: 'green', fontWeight: '900', fontSize: '30px' }}>Username </label>
                <input
                    type='text'
                    name='username'
                    onChange={handleInputchange}
                    value={userData.username} />
                <p style={{ color: 'red', font: '20' }}>{errors.username}</p>
                <label htmlFor='password' style={{ color: 'green', fontWeight: '900', fontSize: '30px' }}>Password</label>

                <input type='password'
                    name='password'
                    onChange={handleInputchange}
                    value={userData.password} />
                <p style={{ color: 'red' }}>{errors.password}</p>
                <button type='submit' className="btn-lg btn-info"  >ENTRAR</button>
                <p></p><a href='/register' nbsp style={{ color: 'yellow' }}>Registrarme</a>
            </form>
        </div>

    );
    function handleInputchange(e) {
        setErrors(validate({ ...userData, [e.target.name]: e.target.value }))
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {

        e.preventDefault();
        { Object.keys(errors).length == 0 && login(userData); }

        // <Card userId={userId} />
        setUserData({
            username: '',
            password: '',
        })

    }

}