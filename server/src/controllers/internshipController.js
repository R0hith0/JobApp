const Internship = require("../models/Internship");
const internshipSchema = require("../validators/internshipValidator");

// CREATE
exports.createInternship = async (req, res) => {
    try {
        // Validate request body
        const result = internshipSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
        }

        // Convert workMode to uppercase if provided
        if (req.body.workMode) {
            req.body.workMode = req.body.workMode.toUpperCase();
        }

        const data = await Internship.create(req.body);

        res.status(201).json({
            message: "Internship created successfully",
            data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

// Get all internships with optional features included 
exports.getInternships = async (req, res) => {
    try {
        const filter = {};

        // Filters
        if (req.query.companyName) {
            filter.companyName = req.query.companyName;
        }

        if (req.query.role) {
            filter.role = req.query.role;
        }

        if (req.query.workMode) {
            filter.workMode = req.query.workMode.toUpperCase();
        }

        // Search
        if (req.query.search) {
            filter.$or = [
                {
                    companyName: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    role: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    qualification: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                }
            ];
        }

        // Page making
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // Sorting (newest first default, oldest optional)
        let sortOption = { createdAt: -1 };

        if (req.query.order === "oldest") {
            sortOption = { createdAt: 1 };
        }

        
        const totalInternships = await Internship.countDocuments(filter);

        const totalPages = Math.max(1, Math.ceil(totalInternships / limit));
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

   
        const data = await Internship.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Internships fetched successfully",
            page,
            limit,
            totalInternships,
            totalPages,
            hasNextPage,
            hasPreviousPage,
            data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

// searching by the id 
exports.getInternshipById = async (req, res) => {
    try {
        const data = await Internship.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({
            message: "Internship fetched successfully",
            data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

// updating info
exports.updateInternship = async (req, res) => {
    try {
        if (req.body.workMode) {
            req.body.workMode = req.body.workMode.toUpperCase();
        }

        const data = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!data) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({
            message: "Internship updated successfully",
            data
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

// deleting
exports.deleteInternship = async (req, res) => {
    try {
        const data = await Internship.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        res.status(200).json({
            message: "Internship deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};