import {Router} from 'express';
import {getRooms, loadDefaultRooms} from '../controllers/rooms';

const router = Router();

// Load default rooms to DB
router.get('/load', loadDefaultRooms);

// Get all rooms in the hotel
router.get('/', getRooms)

module.exports = router;