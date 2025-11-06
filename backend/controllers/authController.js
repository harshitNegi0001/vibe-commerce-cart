import db from '../utils/db.js';
import jwt from 'jsonwebtoken';


class Auth{

    login = async(req,res)=>{
        const {email,password} = req.body;

    }
}

export default new Auth();