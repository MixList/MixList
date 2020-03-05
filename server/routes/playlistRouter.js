const router = require('express').Router()
const playlistController = require('../controllers/playlistController')
const authorization = require('../middlewares/authorization')

router.get('/',  playlistController.showData);
router.post('/', playlistController.addData);
router.put('/:id', authorization, playlistController.editData);
router.delete('/:id', authorization, playlistController.deleteData);
//   >>>>>>>> /playlists
router.post('/search', playlistController.search);


module.exports = router