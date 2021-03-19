import axios from 'axios';
import bcrypt from 'bcryptjs';

export const UserRegistration = data => {
    const password = data.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(data)
    data["password"] = hash;
    return axios.post('http://localhost:4000/register', data)
        .then(res => res.status);
};

export const UsernameValidation = data => (
    axios.post('http://localhost:4000/validateUsername', data)
    .then(exist => exist.status)
)