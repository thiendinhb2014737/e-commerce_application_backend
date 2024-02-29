const UserModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const asyncHandle = require('express-async-handler')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
});

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

const handleSendMail = async (val) => {
    // send mail
    try {
        await transporter.sendMail(val);

        return 'OK';
    } catch (error) {
        return error;
    }
};

const verification = asyncHandle(async (req, res) => {
    const { email } = req.body;

    const verificationCode = Math.round(1000 + Math.random() * 9000);

    try {
        const data = {
            from: `"Support EventHub Appplication" <${process.env.USERNAME_EMAIL}>`,
            to: email,
            subject: 'Verification email code',
            text: 'Your code to verification email',
            html: `<h1>${verificationCode}</h1>`,
        };

        await handleSendMail(data);

        res.status(200).json({
            message: 'Send verification code successfully!!!',
            data: {
                code: verificationCode,
            },
        });
    } catch (error) {
        res.status(401);
        throw new Error('Can not send email');
    }
    res.send('aaaanb')
});


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

const forgotPassword = asyncHandle(async (req, res) => {
    const { email } = req.body;

    const randomPassword = Math.round(100000 + Math.random() * 99000);

    const data = {
        from: `"New Password" <${process.env.USERNAME_EMAIL}>`,
        to: email,
        subject: 'Verification email code',
        text: 'Your code to verification email',
        html: `<h1>${randomPassword}</h1>`,
    };

    const user = await UserModel.findOne({ email });
    if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(`${randomPassword}`, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            isChangePassword: true,
        })
            .then(() => {
                console.log('Done');
            })
            .catch((error) => console.log(error));

        await handleSendMail(data)
            .then(() => {
                res.status(200).json({
                    message: 'Send email new password successfully!!!',
                    data: [],
                });
            })
            .catch((error) => {
                res.status(401);
                throw new Error('Can not send email');
            });
    } else {
        res.status(401);
        throw new Error('User not found!!!');
    }
});

const getDetailsUser = async (req, res) => {
    const userId = req.params.id

    return new Promise(async (resolve, reject) => {
        try {
            // Check email có tồn tại trong database không
            const user = await UserModel.findOne({
                _id: userId
            })

            if (user === null) {
                res.status(200).json({
                    status: 'OK',
                    message: 'The user is not defined!',
                })
            }

            res.status(200).json({
                status: 'OK',
                message: 'get succsessfully!',
                data: user
            })

        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const data = req.body
    console.log(userId, data)

    return new Promise(async (resolve, reject) => {
        try {
            // Check email có tồn tại trong database không
            const checkUser = await UserModel.findOne({
                _id: userId
            })
            //console.log('checkUser', checkUser)
            if (checkUser === null) {
                res.status(200).json({
                    message: 'The user is not defined!',
                })
            }

            const updatedUser = await UserModel.findByIdAndUpdate(userId, data, { new: true })

            res.status(200).json({
                message: 'Update succsessfully!',
                data: updatedUser
            })


        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    register,
    login,
    verification,
    forgotPassword,
    getDetailsUser,
    updateUser
}