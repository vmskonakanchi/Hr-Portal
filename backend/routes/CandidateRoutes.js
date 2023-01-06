import express from "express";
import multer from "multer";
import auth from "../auth/auth.js";
import { Router } from "express";
import * as CandidateController from "../controllers/CandidateController.js";
import path from "path";
import fileUpload from "express-fileupload";

const __dirname = path.resolve();

const router = Router(); // creating the router from express
/**
 * @swagger
 * /api/v1/candidates:
 *      get:
 *          description: Get all candidates
 */

// For Resume Upload
router.use(express.static(__dirname + "./public/"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("resume");

// Candidate Count By Hr
// router.get("/count", auth, CandidateController.getCountByHr);

// search candidates by name and department
router.get(
  "/search/department",
  auth,
  CandidateController.getCandidateByDepartmentAndName
);

//get candidate count By Status
router.get("/candidatecount", auth, CandidateController.countByStatus);

// sort candidates based on name, email, source
router.get("/sort", auth, CandidateController.sort);

// export candidates to excel
router.get("/export", auth, CandidateController.exportToExcel);

// parse resume
router.post("/parse", fileUpload(), CandidateController.parseResume);

/**
 * For the graph data
 */

router.get("/sources/top", auth, CandidateController.topSources); // get top sources
router.get("/departments/top", auth, CandidateController.topDepartments); // get top departments
router.get("/recruiters/top", auth, CandidateController.topRecruiters); // get count of candidates based on recruiters

// search the candidates by date from and to using query params
router.get("/searchByDate", auth, CandidateController.getCandidatesByDate);

router.get("/", auth, CandidateController.getCandidates); // getting all candidates
router.get("/:id", CandidateController.getCandidate); // getting a candidate by id
router.post("/", auth, upload, CandidateController.addCandidate); // adding a candidate
router.put("/:id", auth, CandidateController.updateCandidate); // updating a candidate
router.put("/stage/:id", auth, CandidateController.updateStageCandidate); // updating a stage in candidate
router.delete("/:id", auth, CandidateController.deleteCandidate); // deleting a candidate
router.get("/search/:key", auth, CandidateController.search); // change search route

router.get(
  "/search/phone/:phone",
  auth,
  CandidateController.getCandidateByPhoneNumber
); // change search route by phone

router.put("/stages/add", auth, CandidateController.addStageToCandidate); // adding a stage to a candidate

router.get(
  "/developers/:developers",
  auth,
  CandidateController.getCandidatesByDevelopers
); //get candidates by developers route

router.get(
  "/hrMembers/:hrMembers",
  auth,
  CandidateController.getCandidatesByHrMembers
); //get candidates by hrmembers route

router.get(
  "/search/developers/:key",
  auth,
  CandidateController.searchCandidateByDevelopersAndName
); //search by developer and name route

router.get(
  "/developers/:developers/sort",
  auth,
  CandidateController.sortCandidateByDevelopers
); //sort by developer route

// Recruiter Progress graph
router.get(
  "/recruiterProgress/recruiter",
  auth,
  CandidateController.getHrProgress
);

// Developer Progress Graph
router.get(
  "/developerProgress/dev",
  auth,
  CandidateController.getDeveloperProgress
);

// 
router.get(
  "/devsearch/developer",
  auth,
  CandidateController.getAssignedCandidateByDeveloper
); //search date for hrmembers

export default router;
