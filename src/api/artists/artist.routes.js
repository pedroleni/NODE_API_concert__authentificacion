const ArtistRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./artist.controller");
const rateLimit = require("express-rate-limit");

const artistCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});

ArtistRoutes.get('/', [authorize], getAll);
ArtistRoutes.get('/:id', [authorize], getById);
ArtistRoutes.post('/', [authorize,artistCreateRateLimit], create);
ArtistRoutes.patch('/:id', [authorize], update);
ArtistRoutes.delete('/:id', [authorize], remove);


module.exports = ArtistRoutes;