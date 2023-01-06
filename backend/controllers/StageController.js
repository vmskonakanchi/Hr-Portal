import dotenv from "dotenv";
import mongoose from "mongoose";
import Candidate from "../models/Candidate.js";
dotenv.config();

import Stage from "../models/Stage.js";

export const register = async (req, res) => {
  try {
    // Create a new Stage
    const stage = await Stage.findOne({ stage: req.body.stage });
    if (stage) return res.status(400).send({ msg: "Stage already exists" });
    const newStage = new Stage({
      ...req.body,
      stage: req.body.stage,
      status: req.body.status,
    });
    const savedStage = await newStage.save();
    res.status(201).send(savedStage);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getAllStages = async (req, res) => {
  try {
    const stages = await Stage.find();

    res.status(200).json(stages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStage = async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.id);
    res.send(stage);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Stage with that id");
    const stage = {
      ...req.body,
      stage: req.body.stage,
    };
    await Stage.findByIdAndUpdate(id, stage, { new: true });
    res.json(stage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteStage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ msg: "No Stage with that id" });
    await Stage.findByIdAndRemove(id);
    res.json({ msg: "Stage deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get How much Candidates are there in each Stages
export const getStagesCount = async (req, res) => {
  try {
    const stages = await Candidate.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
        },
      },
    ]);
    const totalCount = await Candidate.find().count();
    res.status(200).json({ stages, totalCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get day , month and year wise count of candidates
export const getCandidatesCountByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });

      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSelectedCandidatesCountByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const stage = await Stage.find();
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: {
            status: req.query.status,
            stage: stage[stage.length - 1].stage,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$updateDate" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCandidatesCountByMonths = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params2");
    // const data = await cache.get("sort2");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%m", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params2", JSON.stringify(req.query));
      // cache.set("sort2", JSON.stringify(stages));
      // cache.expire("sort2", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCandidatesCountByYear = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    // const params = await cache.get("params3");
    // const data = await cache.get("sort3");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params3", JSON.stringify(req.query));
      // cache.set("sort3", JSON.stringify(stages));
      // cache.expire("sort3", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Added Candidates By HrMembers by date
export const getHrCandidatesCountByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: {
            date: { $gte: fromDate, $lte: toDate },
            hrMembers: req.query.hrMembers,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHrSelectedCandidatesCountByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: {
            updateDate: { $gte: fromDate, $lte: toDate },
            hrMembers: req.query.hrMembers,
            status: req.query.status,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$updateDate" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHrCandidatesCountByMonths = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: { hrMembers: req.query.hrMembers, status: req.query.status },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%m", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHrTotalCandidatesCountByMonths = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: { hrMembers: req.query.hrMembers },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%m", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHrCandidatesCountByYear = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: { hrMembers: req.query.hrMembers, status: req.query.status },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHrTotalCandidatesCountByYear = async (req, res) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    // const params = await cache.get("params1");
    // const data = await cache.get("sort1");
    // if (data && params && params === JSON.stringify(req.query)) {
    //   res.status(200).send(JSON.parse(data));
    //   return;
    // }
    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: { hrMembers: req.query.hrMembers },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y", date: "$date" } },
            count: { $sum: 1 },
          },
        },
      ]);
      stages.sort((a, b) => {
        if (order === "asc") {
          return a._id.localeCompare(b._id);
        }
      });
      // cache.set("params1", JSON.stringify(req.query));
      // cache.set("sort1", JSON.stringify(stages));
      // cache.expire("sort1", 1000);
      res.status(200).json(stages);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const ExportToExcelByDate = async (req, res) => {
  try {
    const sort = req.query.sort;
    const { from, to } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (sort === "_id") {
      const stages = await Candidate.aggregate([
        {
          $match: { date: { $gte: fromDate, $lte: toDate } },
        },
      ]);

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
      res.status(200).send({ headers: fields, data: stages });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
