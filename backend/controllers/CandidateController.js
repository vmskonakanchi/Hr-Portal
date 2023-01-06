import Candidate from "../models/Candidate.js";
import User from "../models/User.js";
import fs from "fs";

import cache from "../cache/cache.js";

import ResumeParser from "simple-resume-parser";
import mongoose from "mongoose";
import Stage from "../models/Stage.js";
import moment from "moment/moment.js";

// Add Candidates
export const addCandidate = async (req, res) => {
  try {
    const recruiter = await User.findById(req.body.recruiter);
    const emailExist = await Candidate.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send({ msg: "Email already exists" });

    const phoneExist = await Candidate.findOne({ phone: req.body.phone });
    if (phoneExist)
      return res.status(400).send({ msg: "phone already exists" });
    const candidate = new Candidate({
      ...req.body,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      source: req.body.source,
      recruiter: recruiter.name,
      position: req.body.position,
      department: req.body.department,
      qualification: req.body.qualification,
      resume: req.file.filename,
      stage: req.body.stage,
      hrMembers: recruiter.name,
    });
    const savedCandidate = await candidate.save();
    await cache.del("candidates");
    res.send({ candidate: candidate._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

// getCandidates
export const getCandidates = async (req, res) => {
  try {
    // const data = await cache.get("candidates");
    // if (data) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }

    // candidates.map((candidate) => {
    //   candidate._id = candidate._id.toString();
    //   candidate.__v = undefined;
    // });

    const sort = req.query.sort;
    const order = req.query.order;
    if (sort === "date") {
      const candidates = await Candidate.find();

      candidates.sort((a, b) => {
        if (order === "desc") {
          return b.date - a.date;
        }
      });
      // cache.set("candidates", JSON.stringify(candidates));
      // cache.expire("candidates", 600);
      res.status(200).send(candidates);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

// get Candidate By Id
export const getCandidate = async (req, res) => {
  try {
    // const data = await cache.get("candidate");
    // if (data) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const candidate = await Candidate.findById(req.params.id);
    // cache.set("candidate", JSON.stringify(candidate));
    // cache.expire("candidate", 600);
    res.send(candidate);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Add stages to Candidate
export const addStageToCandidate = async (req, res) => {
  try {
    const { candidateId } = req.query;
    const candidate = await Candidate.findById(candidateId);
    const roles = await Stage.findOne({ stage: req.body.stage });

    if (!candidate) {
      res.status(400).send({ msg: "Candidate or Stage not found" });
      return;
    }

    const stage = new Stage({
      ...req.body,
      stage: req.body.stage,
      roles: roles.roles[0],
      date: Date.now,
    });

    const candidates = {
      ...req.body,
      status: req.body.status,
      devStatus: req.body.devStatus,
      hrMembers: req.body.hrMembers,
      developers: req.body.developers,
      roles: roles.roles[0],
      updateDate: Date.now(),
    };

    const existingStage = candidate.stages.filter((s) => {
      return s.stage === req.body.stage;
    });
    if (existingStage.length > 0) {
      res.status(400).send({ msg: "Already Exists stages" });
      return;
    }

    await Candidate.findByIdAndUpdate(candidateId, candidates, { new: true });
    await cache.del("candidates");
    candidate.stages.push(stage);
    await candidate.save();
    res.status(200).send(candidate);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Update Candidate
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No user with that id" });

    const candidate = {
      ...req.body,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      source: req.body.source,
      position: req.body.position,
      department: req.body.department,
      stage: req.body.stage,
      status: req.body.status,
      devStatus: req.body.status,
      qualification: req.body.qualification,
    };

    await Candidate.findByIdAndUpdate(id, candidate, { new: true });

    await cache.del("candidates");
    res.json(candidate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStageCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No user with that id" });
    const candi = await Candidate.findById(id);
    const roles = await Stage.findOne({ stage: req.body.stage });

    const candidate = {
      ...req.body,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      source: req.body.source,
      position: req.body.position,
      department: req.body.department,
      stage: req.body.stage,
      status: req.body.status,
      devStatus: req.body.devStatus,
      qualification: req.body.qualification,
    };

    candi.stages[candi.stages.length - 1] = {
      stage: req.body.stage,
      status: req.body.status,
      devStatus: req.body.devStatus,
      hrMembers: req.body.hrMembers,
      developers: req.body.developers,
      hrComments: req.body.hrComments,
      developerComments: req.body.developerComments,
      roles: roles.roles[0],
      date: moment(Date.now()).format("DD-MM-YYYY h:mm:ss"),
    };
    // console.log(candi.stages[candi.stages.length-1],"array status")
    await Candidate.findByIdAndUpdate(id, candidate, { new: true });

    await candi.save();

    await cache.del("candidates");
    res.json(candidate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    await candidate.remove();
    res.send({ msg: "Candidate deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Search Candidate by name
export const search = async (req, res) => {
  try {
    const result = await Candidate.find({
      $or: [
        { name: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
        { phone: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
        { source: { $regex: req.params.key } },
        { department: { $regex: req.params.key } },
        { stage: { $regex: req.params.key } },
        { developers: { $regex: req.params.key } },
        { hrMembers: { $regex: req.params.key } },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Candidate Count by Status
export const countByStatus = async (req, res) => {
  try {
    const candidate = await Candidate.find();

    const totalCount = await Candidate.find().count();
    const pending = await Candidate.find({ status: "Pending" }).count();
    const selected = await Candidate.find({ status: "Selected" }).count();
    const rejected = await Candidate.find({ status: "Rejected" }).count();

    res
      .status(200)
      .json({ totalCount, pending, selected, rejected, candidate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getCandidatesByRecruiter = async (req, res) => {
//   try {
//     const candidates = await Candidate.find({
//       recruiter: req.params.recruiter,
//     });
//     res.send(candidates);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

// export const getCandidatesByStatus = async (req, res) => {
//   try {
//     const candidates = await Candidate.find({ status: req.params.status });
//     res.send(candidates);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

// export const getCandidatesByDepartment = async (req, res) => {
//   try {
//     const candidates = await Candidate.find({
//       department: req.params.department,
//     });
//     res.send(candidates);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

// Get Candidates by developers Asigned
export const getCandidatesByDevelopers = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    if (sort === "date") {
      const candidates = await Candidate.find({
        developers: req.params.developers,
      });

      candidates.sort((a, b) => {
        if (order === "desc") {
          return b.date - a.date;
        }
      });
      // cache.set("candidates", JSON.stringify(candidates));
      // cache.expire("candidates", 600);
      res.status(200).send(candidates);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get Candidates by HrMembers Asigned
export const getCandidatesByHrMembers = async (req, res) => {
  try {
    const candidates = await Candidate.find({
      hrMembers: req.params.hrMembers,
    });
    res.send(candidates);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const exportToExcel = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const fields = [
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
      { label: "Source", key: "source" },
      { label: "Position", key: "position" },
      { label: "Department", key: "department" },
      { label: "Location", key: "location" },
      { label: "Salary", key: "salary" },
      { label: "Experience", key: "experience" },
      { label: "Skills", key: "skills" },
      { label: "Comments", key: "comments" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
    ];

    res.status(200).send({ headers: fields, data: candidates });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const sort = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params");
    // const data = await cache.get("sort");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "name") {
      const candidates = await Candidate.find().sort({ name: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "email") {
      const candidates = await Candidate.find().sort({ email: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.email.localeCompare(b.email);
        } else {
          return b.email.localeCompare(a.email);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "source") {
      const candidates = await Candidate.find().sort({ source: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.source.localeCompare(b.source);
        } else {
          return b.source.localeCompare(a.source);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }

    if (sort === "stage") {
      const candidates = await Candidate.find().sort({ stage: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.stage.localeCompare(b.stage);
        } else {
          return b.stage.localeCompare(a.stage);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "date") {
      const candidates = await Candidate.find();
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.date - b.date;
        } else {
          return b.date - a.date;
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getCandidatesByStage = async (req, res) => {
  try {
    const candidates = await Candidate.find({ stage: req.params.stage });
    res.send(candidates);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const parseResume = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    }
    const { resume } = req.files;
    const { name, data } = resume;

    if (fs.existsSync(`.public/uploads/${name}`)) {
      res.status(400).send({ message: "File already exists" });
    }
    const file = fs.createWriteStream(`./public/uploads/${name}`);
    file.write(data);
    file.end();
    const parser = new ResumeParser(`./public/uploads/${name}`);
    parser.parseToJSON().then((info) => {
      fs.unlinkSync(`./public/uploads/${name}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).send(info.parts);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const topSources = async (req, res) => {
  try {
    const scount =
      req.query.scount && req.query.scount > 0 && req.query.scount != undefined
        ? req.query.scount
        : 6;

    const candidates = await Candidate.find();
    const sources = candidates.map((candidate) => candidate.source);
    const uniqueSources = [...new Set(sources)];
    const sourceCount = uniqueSources.map((source) => {
      return {
        source,
        count: sources.filter((s) => s === source).length,
      };
    });
    sourceCount.sort((a, b) => b.count - a.count);
    // cache.set("topSources", JSON.stringify(sourceCount.slice(0, scount)));
    // cache.expire("topSources", 1000);
    res.status(200).send(sourceCount.slice(0, scount));
  } catch (err) {
    res.status(400).send(err);
  }
};

export const topDepartments = async (req, res) => {
  try {
    // const data = await cache.get("topDepartments");
    // if (data) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }

    const scount =
      req.query.scount && req.query.scount > 0 && req.query.scount != undefined
        ? req.query.scount
        : 6;
    const candidates = await Candidate.find();
    const departments = candidates.map((candidate) => candidate.department);
    const uniqueDepartments = [...new Set(departments)];
    const departmentCount = uniqueDepartments.map((department) => {
      return {
        department,
        count: departments.filter((d) => d === department).length,
      };
    });
    departmentCount.sort((a, b) => b.count - a.count);
    departmentCount.forEach((d) => {
      d._id = undefined;
    });
    // cache.set(
    //   "topDepartments",
    //   JSON.stringify(departmentCount.slice(0, scount))
    // );
    // cache.expire("topDepartments", 1000);
    res.status(200).send(departmentCount.slice(0, scount));
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const topRecruiters = async (req, res) => {
  try {
    // const data = await cache.get("topRecruiters");
    // if (data) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const scount =
      req.query.scount && req.query.scount > 0 && req.query.scount != undefined
        ? req.query.scount
        : 6;

    const candidates = await Candidate.find();
    const recruiters = candidates.map((candidate) => candidate.recruiter);
    const uniqueRecruiters = [...new Set(recruiters)];
    const recruiterCount = uniqueRecruiters.map((recruiter) => {
      return {
        recruiter,
        count: recruiters.filter((r) => r === recruiter).length,
      };
    });
    recruiterCount.sort((a, b) => b.count - a.count);
    // cache.set("topRecruiters", JSON.stringify(recruiterCount.slice(0, scount)));
    // cache.expire("topRecruiters", 1000);
    res.status(200).send(recruiterCount.slice(0, scount));
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getCandidateByPhoneNumber = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ phone: req.params.phone });
    if (!candidate) {
      res.status(400).send({ message: "Candidate not found" });
    } else {
      res.status(200).send(candidate);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getCandidateByDepartmentAndName = async (req, res) => {
  try {
    const candidate = await Candidate.find({
      $or: [{ name: { $regex: req.params.key } }],
      department: req.query.department,
    });
    // if (!candidate) {
    //   res.status(400).send({ message: "Candidate not found" });
    // } else {
    res.status(200).send(candidate);
    // }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// search by developer and name route
export const searchCandidateByDevelopersAndName = async (req, res) => {
  try {
    const candidate = await Candidate.find({
      $or: [
        { name: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
      ],
      developers: req.query.developers,
    });
    // if (!candidate) {
    //   res.status(400).send({ message: "Candidate not found" });
    // } else {
    res.status(200).send(candidate);
    // }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const sortCandidateByDevelopers = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params");
    // const data = await cache.get("sort");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "name") {
      const candidates = await Candidate.find({
        developers: req.params.developers,
      }).sort({ name: 1 });

      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "email") {
      const candidates = await Candidate.find({
        developers: req.params.developers,
      }).sort({ email: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.email.localeCompare(b.email);
        } else {
          return b.email.localeCompare(a.email);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "source") {
      const candidates = await Candidate.find({
        developers: req.params.developers,
      }).sort({ email: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.source.localeCompare(b.source);
        } else {
          return b.source.localeCompare(a.source);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }

    if (sort === "stage") {
      const candidates = await Candidate.find().sort({ stage: 1 });
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.stage.localeCompare(b.stage);
        } else {
          return b.stage.localeCompare(a.stage);
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
    if (sort === "date") {
      const candidates = await Candidate.find();
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a.date - b.date;
        } else {
          return b.date - a.date;
        }
      });
      // cache.set("params", JSON.stringify(req.query));
      // cache.set("sort", JSON.stringify(candidates));
      // cache.expire("sort", 1000);
      res.status(200).send(candidates);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// export const getCountByHr = async (req, res) => {
//   try {
//     const hrMembers = await Candidate.aggregate([
//       {
//         $group: {
//           _id: "$hrMembers",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     const totalCount = await Candidate.find().count();
//     res.status(200).json({ hrMembers, totalCount });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// sort the candidates by date from and to using query params
export const getCandidatesByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (sort === "_id") {
      const candidates = await Candidate.aggregate([
        {
          $match: { date: { $gte: fromDate, $lte: toDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      candidates.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });

      res.status(200).json(candidates);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// HrMembers Progress Graph from Add Candidates to Selected Candidate
export const getHrProgress = async (req, res) => {
  try {
    const stage = await Stage.find();

    const totalAddCount = await Candidate.find({
      recruiter: req.query.recruiter,
    }).count();
    const totalSelectedCount = await Candidate.find({
      recruiter: req.query.recruiter,
      stage: stage[stage.length - 1].stage,
      status: req.query.status,
    }).count();

    res.status(200).json({
      totalAddCount,
      totalSelectedCount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDeveloperProgress = async (req, res) => {
  try {
    // const data = await cache.get("candidate");
    // if (data) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const stages = await Candidate.aggregate([
      {
        $match: {
          "stages.stage": req.query.stage,
          developers: req.query.developers,
          devStatus: req.query.devStatus,
          // "stages.roles": req.query.roles,
        },
      },
      {
        $group: {
          _id: "$developers",
          count: { $sum: 1 },
        },
      },
    ]);
    // cache.set("candidate", JSON.stringify(candidate));
    // cache.expire("candidate", 600);
    res.send(stages);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAssignedCandidateByDeveloper = async (req, res) => {
  try {
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const stages = await Candidate.aggregate([
      { $match: { developers: req.query.developers } },
      {
        $group: {
          _id: "$developers",
          count: { $sum: 1 },
        },
      },
    ]);

    // cache.set("params1", JSON.stringify(req.query));
    // cache.set("sort1", JSON.stringify(stages));
    // cache.expire("sort1", 1000);
    res.status(200).json(stages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
