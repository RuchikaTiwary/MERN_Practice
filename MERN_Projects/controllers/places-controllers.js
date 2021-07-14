const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];

const placesById = (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        // const error = new Error('Could not find a place for the provided id.');
        // error.code = 404;
        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    res.json({ place }); // => { place } => { place: place }
};

const placesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if (!places || places.length === 0) {
        // const error = new Error('Could not find a place for the provided user id.');
        // error.code = 404;
        return next(new HttpError('Could not find a place for the provided user id.', 404));
    }

    res.json({ places });
};

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid input, please check your input !!', 422);
    }

    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({ place: createdPlace });
}

const updatePlaces = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid input, please check your input !!', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };

    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
}

const deletePlaces = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError("Could not find place for that id", 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);

    res.status(200).json({ message: 'Deleted the placeId' });
}


exports.placesById = placesById;
exports.placesByUserId = placesByUserId;
exports.createPlace = createPlace;
exports.updatePlaces = updatePlaces;
exports.deletePlaces = deletePlaces;