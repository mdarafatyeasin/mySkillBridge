import { tutorService } from "./tutor.service";
const createTutorProfile = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.user?.id);
        const user_id = req.user?.id;
        const result = await tutorService.createTutorProfile(req.body, user_id);
        res.status(200).json({
            success: true,
            message: "teacher profile created successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to create profile",
            error: err
        });
    }
};
const getTutorProfile = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const result = await tutorService.getTutorProfile(user_id);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Please crate teacher profile",
            error: err
        });
    }
};
const getAllTutor = async (req, res) => {
    try {
        const { search } = req.query;
        const searchText = search;
        const sortOrder = req.query.sortOrder;
        const result = await tutorService.getAllTutor({ search: searchText, sortOrder });
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Please crate teacher profile",
            error: err
        });
    }
};
const getTutorById = async (req, res) => {
    try {
        const tutorId = req.params;
        const result = await tutorService.getTutorById(tutorId.id);
        res.status(200).json({
            success: true,
            message: "teachers data found",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Tutor not found",
            error: err
        });
    }
};
export const tutorController = {
    createTutorProfile,
    getTutorProfile,
    getAllTutor,
    getTutorById
};
//# sourceMappingURL=tutor.controller.js.map