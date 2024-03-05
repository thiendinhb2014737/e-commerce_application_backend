const ProductModel = require("../models/productModel")
const bcrypt = require('bcrypt')
const asyncHandle = require('express-async-handler')



const getAllType = async (req, res) => {

    return new Promise(async (resolve, reject) => {
        try {
            // Check email có tồn tại trong database không
            const allType = await ProductModel.distinct('type')

            res.status(200).json({
                status: 'OK',
                message: 'Success',
                data: allType,
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = async (req, res) => {

    const { limit, page, sort, filter } = req.query


    // console.log(limit, page, sort, filter)

    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await ProductModel.countDocuments()
            let allProduct = []

            if (filter && limit && sort) {
                if (filter[0] === 'type' && limit && sort || filter[0] === 'name' && limit && sort) {
                    const label = filter[0]
                    const objectSort = {}
                    objectSort[sort[1]] = sort[0]
                    const allObjectFilter = await ProductModel.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort(objectSort)
                    res.status(200).json({
                        status: 'OK',
                        message: 'Success',
                        data: allObjectFilter,
                        total: totalProduct,
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                } else if (filter[0] === 'price') {
                    if (Number(filter[1]) === Number(200000)) {
                        const label = filter[0]
                        //console.log('label', label)
                        const allObjectFilter = await ProductModel.find({ [label]: { '$lte': Number(filter[1]) } }).limit(limit).skip(page * limit)
                        res.status(200).json({
                            status: 'OK',
                            message: 'Success',
                            data: allObjectFilter,
                            total: totalProduct,
                            pageCurrent: Number(page + 1),
                            totalPage: Math.ceil(totalProduct / limit)
                        })
                    } else if (Number(filter[1]) === Number(200001)) {
                        const label = filter[0]
                        const allObjectFilter = await ProductModel.find({ [label]: { '$gte': Number(filter[1]) } }).limit(limit).skip(page * limit)
                        res.status(200).json({
                            status: 'OK',
                            message: 'Success',
                            data: allObjectFilter,
                            total: totalProduct,
                            pageCurrent: Number(page + 1),
                            totalPage: Math.ceil(totalProduct / limit)
                        })
                    }
                }
            }
            if (!filter && sort && limit) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await ProductModel.find().limit(limit).skip(page * limit).sort(objectSort)
                res.status(200).json({
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            // if (!limit) {
            //     allProduct = await ProductModel.find()//video 56
            // }
            // else {
            //     // skip() bỏ bao nhiêu sản phẩm để lấy sp tiếp
            //     allProduct = await ProductModel.find().limit(limit).skip(page * limit)//video 26
            // }
            // res.status(200).json({
            //     status: 'OK',
            //     message: 'Success',
            //     data: allProduct,
            //     total: totalProduct,
            //     pageCurrent: Number(page + 1),
            //     totalPage: Math.ceil(totalProduct / limit)
            // })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsProduct = async (req, res) => {
    const productId = req.params.id
    return new Promise(async (resolve, reject) => {

        try {
            // Check email có tồn tại trong database không
            const product = await ProductModel.findOne({
                _id: productId
            })

            if (product === null) {
                res.status(200).json({
                    status: 'OK',
                    message: 'The product is not defined!',
                })
            }

            res.status(200).json({
                status: 'OK',
                message: 'SUCCESS!',
                data: product
            })


        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    getAllType,
    getAllProduct,
    getDetailsProduct
}