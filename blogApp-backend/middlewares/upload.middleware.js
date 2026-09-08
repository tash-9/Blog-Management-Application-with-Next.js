import fs from "fs";
import path from "path";
import multer from "multer";

// process.cwd() rather than import.meta.url - this is an ES module, so
// __dirname is not available, and cwd is reliable because npm scripts
// always run from the project root
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "profile-images");

// created on module load rather than assumed to exist - a fresh clone of
// this repo would otherwise 500 on the very first upload
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    // req.user is set by verify_token, which runs before this middleware on
    // the route, so the filename can be tied to the uploader without trusting
    // anything the client sent
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || ".jpg"
        cb(null, `user-${req.user.id}-${Date.now()}${ext}`)
    },
})

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"])

const file_filter = (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
        return cb(new Error("only JPG, PNG, WEBP or GIF images are allowed"))
    }

    cb(null, true)
}

export const upload_profile_image = multer({
    storage,
    fileFilter: file_filter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB, matches the frontend's own check
})
