const { z } = require("zod");

const internshipSchema = z.object({

    companyName: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    qualification: z.string().min(1, "Qualification is required"),
    experienceRequired: z.string().min(1, "Experience is required"),
    description: z.string().optional(),

   
    stipend: z.string().min(1, "Stipend is required"),

    workMode: z.string().min(1, "Work mode is required"),
    duration: z.string().min(1, "Duration is required"),
    workingHours: z.string().min(1, "Working hours is required")
});

module.exports = internshipSchema;