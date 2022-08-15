const Artist  = require('./artist.model');
const { setError } = require('../../helpers/utils');
//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const artist = await Artist.find().populate("viewsMonth");
    return res.json({
      status: 200,
      message: 'Recovered all artists',
      data: { artist }
    });
  } catch (error) {
    return next(setError(500, 'Failed all artists'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findById(id).populate("viewsMonth");
    if (!artist) return next(setError(404, 'artist not found'))
    return res.json({
      status: 200,
      message: 'Recovered artist by id',
      data: { artist }
    });
  } catch (error) {
    return next(setError(500, 'Failed artist by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const artist = await Artist.find({ name: name });
    if (!artist) return next(setError(404, 'Artist not found'));
    return res.json({
      status: 200,
      message: 'Recovered artist by name',
      data: { artist }
    });
  } catch (error) {
    return next(setError(500, 'Failed artist by name'))
  }
}
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
    const artistToSave = new Artist(req.body)
    const artistInDb = await artistToSave.save()
    return res.json({
      status: 201,
      message: 'Created new artist',
      data: { artistInDb}
    });
  } catch (error) {
    return next(setError(500, 'Failed created artist'))
  }
}
//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const artist = new Artist(req.body);
    artist._id = id;
    const updateArtist = await Artist.findByIdAndUpdate(id,  artist);
    if (! artist) return next(setError(404, 'Artist not found'))
    return res.json({
      status: 200,
      message: 'Updated  artist by id',
      data: { updateArtist}
    });
  } catch (error) {
    return next(setError(500, 'Failed  artist Update by id'))
  }
}
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const  artistRemoved = await  Artist.findByIdAndDelete(id);
    if (!artistRemoved) return next(setError(404, 'Artist not found'));
    return res.json({
      status: 200,
      message: 'Removed artist by id',
      data: { artistRemoved }
    });
  } catch (error) {
    return next(setError(500, 'Failed artist Remove by id'))
  }
}
//----------------------------------------------------------------------------------------------
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
}