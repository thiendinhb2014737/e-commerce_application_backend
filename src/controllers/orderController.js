const OrderModel = require("../models/orderModel")
const ProductModel = require("../models/productModel")
const bcrypt = require('bcrypt')
const asyncHandle = require('express-async-handler')


const createOrder = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, isPaid, paidAt, createOrderdAt, statusOder } = req.body
        console.log(req.body)
        try {
            // console.log('orderItems', orderItems)
            const promises = orderItems?.map(async (order) => {
                const size = order.size
                if (size === 'S') {
                    const productData = await ProductModel.findOneAndUpdate(
                        {
                            _id: order.product,
                            countInStock: { $gte: order.amount },
                            countS: { $gte: order.amount },

                        },
                        {
                            $inc: {
                                countInStock: -order.amount,
                                selled: +order.amount,
                                countS: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (productData) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }
                    else {
                        return {
                            status: 'OK',
                            message: 'ERR',
                            id: order.product
                        }
                    }
                } else if (size === 'M') {
                    const productData = await ProductModel.findOneAndUpdate(
                        {
                            _id: order.product,
                            countInStock: { $gte: order.amount },
                            countM: { $gte: order.amount },

                        },
                        {
                            $inc: {
                                countInStock: -order.amount,
                                selled: +order.amount,
                                countM: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (productData) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }
                    else {
                        return {
                            status: 'OK',
                            message: 'ERR',
                            id: order.product
                        }
                    }
                } else if (size === 'L') {
                    const productData = await ProductModel.findOneAndUpdate(
                        {
                            _id: order.product,
                            countInStock: { $gte: order.amount },
                            countL: { $gte: order.amount },

                        },
                        {
                            $inc: {
                                countInStock: -order.amount,
                                selled: +order.amount,
                                countL: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (productData) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }
                    else {
                        return {
                            status: 'OK',
                            message: 'ERR',
                            id: order.product
                        }
                    }
                } else if (size === 'XL') {
                    const productData = await ProductModel.findOneAndUpdate(
                        {
                            _id: order.product,
                            countInStock: { $gte: order.amount },
                            countXL: { $gte: order.amount },

                        },
                        {
                            $inc: {
                                countInStock: -order.amount,
                                selled: +order.amount,
                                countXL: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (productData) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS'
                        }
                    }
                    else {
                        return {
                            status: 'OK',
                            message: 'ERR',
                            id: order.product
                        }
                    }

                }

            })
            const results = await Promise.all(promises)

            const newData = results && results.filter((item) => item.id)

            if (newData?.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                res.status(200).json({
                    status: 'ERR',
                    message: `Sản phẩm với id: ${arrId.join(',')} không còn hàng!`
                })

            } else {
                const createdOrder = await OrderModel.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid,
                    paidAt,
                    createOrderdAt,
                    statusOder
                })
                console.log(createdOrder)
                if (createdOrder) {
                    // await EmailService.sendEmailCreateOrder(email, orderItems)
                    res.status(200).json({
                        status: 'OK',
                        message: 'success',
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const getAllOrderDetails = async (req, res) => {
    const userId = req.params.id
    const { sort, limit } = req.query

    return new Promise(async (resolve, reject) => {
        try {
            if (sort && limit) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const order = await OrderModel.find({
                    user: userId
                }).sort(objectSort).limit(limit)
                if (order === null) {
                    res.status(200).json({
                        status: 'ERR',
                        message: 'The order is not defined'
                    })
                }

                res.status(200).json({
                    status: 'OK',
                    message: 'Get all order details seccess!',
                    data: order,
                })
            }

        } catch (e) {
            console.log('e', e)
            reject(e)
        }

    })
}
const getDetailsOrder = async (req, res) => {
    const orderId = req.params.id
    return new Promise(async (resolve, reject) => {
        try {
            const order = await OrderModel.findById({
                _id: orderId
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                res.status(200).json({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            res.status(200).json({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelOrderDetails = async (req, res) => {
    const data = req.body.orderItems
    const orderId = req.body.orderId

    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await ProductModel.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    order = await OrderModel.findByIdAndDelete(orderId)
                    if (order === null) {
                        res.status(200).json({
                            status: 'ERR',
                            message: 'The order is not defined'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                res.status(200).json({
                    status: 'ERR',
                    message: `Sản phẩm với id: ${newData} không tồn tại`
                })
            }
            res.status(200).json({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}





module.exports = {
    createOrder,
    getDetailsOrder,
    getAllOrderDetails,
    cancelOrderDetails
}