const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
    sectionTitle: {type: String},
    description: {type: String},
    Information: {type: String},
    file: {type: String},
}, {
    timestamps: true
})

const courseSchema = new Schema({
    title:{
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    outcomes: {
        type: [String],
        default: undefined,
    },
    contents: [contentSchema]
}, {
    timestamps: true
})




module.exports = mongoose.model('Course', courseSchema)