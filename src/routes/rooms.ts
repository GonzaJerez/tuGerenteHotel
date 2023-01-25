import {Router} from 'express';
import {getRooms, loadDefaultRooms} from '../controllers/rooms';

const router = Router();

router.get('/load', loadDefaultRooms);

router.get('/', getRooms)

module.exports = router;