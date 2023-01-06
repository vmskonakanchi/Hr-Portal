import auth from "../auth/auth.js";
import { Router } from "express";
import * as StageController from "../controllers/StageController.js";

const router = Router(); // creating the router from express
router.get("/count", auth, StageController.getStagesCount); //Candidate Count on the basis of Stages

router.post("/register", auth, StageController.register); //adding stages
router.get("/", auth, StageController.getAllStages); //Get all stages
router.put("/edit/:id", auth, StageController.updateStage); //update by Id
router.get("/:id", auth, StageController.getStage); //Get By Id
router.delete("/:id", auth, StageController.deleteStage); // deleting a stage

router.get("/search/date", auth, StageController.getCandidatesCountByDate); //search All candidate by date
router.get("/search/month", auth, StageController.getCandidatesCountByMonths); //search All candidate by month
router.get("/search/year", auth, StageController.getCandidatesCountByYear); //search All candidate by year

router.get("/hrsearch/date", auth, StageController.getHrCandidatesCountByDate); //search date for hrmembers
router.get("/hrsearch/select/date", auth, StageController.getHrSelectedCandidatesCountByDate); //search Selected Candidate date for hrmembers

router.get(
  "/hrsearch/month",
  auth,
  StageController.getHrCandidatesCountByMonths
); //search month for hrmembers
router.get("/hrsearch/year", auth, StageController.getHrCandidatesCountByYear); //search year for hrmembers

//search date for selected candidates
router.get(
  "/selectedsearch/date",
  auth,
  StageController.getSelectedCandidatesCountByDate
); 
router.get("/export/date", auth, StageController.ExportToExcelByDate); // export candidates to excel By dates

export default router;
