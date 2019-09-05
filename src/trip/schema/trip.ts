import * as mongoose from 'mongoose';

export const originSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    lng: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
});

export const tripSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        default: "",
        required: true,
        minlength: 1,
        maxlength: 255
    },
    origin: originSchema,
    destination: {
        _id: mongoose.Schema.Types.ObjectId,
        lat: Number,
        lng: Number
    },
    waypoints: [
        {
            location: {
                _id: mongoose.Schema.Types.ObjectId,
                lat: Number,
                lng: Number
            }
        }
    ],
    route: [
        {
            lat: Number,
            lng: Number,
            imageCount: Number
        }
    ],
    imageCount: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});