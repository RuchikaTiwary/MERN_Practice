const uuid = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');

/*let DUMMY_PLACES = [
    {
        // id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];*/

const placesById = async (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Could not find place, try again!!', 500);
        return next(error);
    }

    // const place = DUMMY_PLACES.find(p => {
    //     return p.id === placeId;
    // });

    if (!place) {
        // const error = new Error('Could not find a place for the provided id.');
        // error.code = 404;
        const error = new HttpError('Could not find a place for the provided id.', 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

const placesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Could not find place, try again!!', 500);
        return next(error);
    }
    // DUMMY_PLACES.filter(p => {
    //     return p.creator === userId;
    // });

    if (!places || places.length === 0) {
        // const error = new Error('Could not find a place for the provided user id.');
        // error.code = 404;
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }

    res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = {
            lat: 40.7484474,
            lng: -73.9871516
        };
    } catch (error) {
        return next(error);
    }

    // const title = req.body.title;
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
        creator
    });

    let user;
    try{
        user = User.findById(creator);
    }catch (err) {
        const error = new HttpError(
            'Error Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    if(!user){        
        const error = new HttpError(
            'Could not find user for provided id.', 404,
            500
        );
        return next(error);
    }
    console.log(user);

    try {
        const sess= await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess});
        user.places.push(createdPlace);
        await user.save({ session: sess});

        await sess.commitTransaction();
        // await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlaces = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next( new HttpError('Invalid input, please check your input !!', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId);
    } catch(err){
        const error = new HttpError('Could not find place, try again!!', 500);
        return next(error);
    }
    
    // { ...DUMMY_PLACES.find(p => p.id === placeId) };
    // const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    place.title = title;
    place.description = description;

    // DUMMY_PLACES[placeIndex] = updatedPlace;
    try{
        await place.save();
    } catch(err){
        const error = new HttpError('Something went wrong, could not update', 500);
        return next(error);
    }
    res.status(200).json({ place: place.toObject({ getters: true}) });
}

const deletePlaces = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId).populate('creator');
    } catch(err){        
        const error = new HttpError('Could not find place, try again!!', 500);
        return next(error);
    }

    // if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    //     throw new HttpError("Could not find place for that id", 404);
    // }

    // DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    if(!place){
        const error =new HttpError("Could not find place for that id", 404);
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({session: sess});
        place.creator.places.pull(place);
        await place.creatore.save({session: sess});
        await sess.commitTransaction();
    } catch(err){        
        const error = new HttpError('Something went wrong, try again!!', 500);
        return next(error);
    }
    res.status(200).json({ message: 'Deleted the placeId' });
}

exports.placesById = placesById;
exports.placesByUserId = placesByUserId;
exports.createPlace = createPlace;
exports.updatePlaces = updatePlaces;
exports.deletePlaces = deletePlaces;