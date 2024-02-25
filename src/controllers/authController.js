const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const asyncHandle = require('express-async-handler')
const jwt = require('jsonwebtoken');

const getJsonWebToken = async (email, id) => {
    const payload = {
        email,
        id,
    };
    //console.log(email, id)
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });

    return token
}

const register = asyncHandle(async (req, res) => {
    const { email, name, password, createOrderdAt } = req.body

    // timf trong database xem cos nguoi dung nay chua
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
        res.status(401)
        throw new Error('Email has already exist!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        email,
        name: name ?? "",
        password: hashedPassword,
        createOrderdAt

    })
    await newUser.save()
    res.status(200).json({
        message: 'Register new user succsessfully!',
        data: {
            email: newUser.email,
            id: newUser.id,
            access_token: await getJsonWebToken(email, newUser.id)
        }
    })

})

const login = asyncHandle(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        res.status(403);
        throw new Error('User not found!!!');
    }

    const isMatchPassword = await bcrypt.compare(password, existingUser.password);
    //console.log(isMatchPassword)


    if (!isMatchPassword) {
        res.status(401);
        throw new Error('Email or Password is not correct!');
    }

    res.status(200).json({
        message: 'Login successfully!',
        data: {
            id: existingUser.id,
            email: existingUser.email,
            access_token: await getJsonWebToken(email, existingUser.id),
        },
    });

});

module.exports = {
    register,
    login
}