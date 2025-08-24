import express from 'express'
import { addPlant, getPlants } from '../controllers/plant.controllers.js';

const router = express.Router();

router.route("/plant").post(addPlant);

router.route("/plant").get(getPlants);

export default router;

