const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title:{
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

}, {
    timestamps: true
})




module.exports = mongoose.model('Course', courseSchema)