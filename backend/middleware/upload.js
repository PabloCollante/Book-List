import multer from "multer";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// "../" sube desde middleware hasta back
export const uploadsDir = fileURLToPath(
    new URL("../upload/", import.meta.url),
);

mkdirSync(uploadsDir, { recursive: true });

const imageExtensions = new Map([
    ["image/jpeg", ".jpg"],
    ["image/png", ".png"],
    ["image/webp", ".webp"],
]);

const storage = multer.diskStorage({
    destination: uploadsDir,

    filename: (_req, file, callback) => {
        const extension = imageExtensions.get(file.mimetype);

        callback(null, `${randomUUID}${extension}`)
    },
});

export const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 10,
    },

    fileFilter: (_req, file, callback) => {
        if (!imageExtensions.has(file.mimetype)) {
            const error = new error(
                "La portada debe ser una imagen jpeg, png o webp",
            );

            error.code = "UNSUPPORTED_IMAGE_TYPE";

            return callback(error)
        }

        return callback(null, true);
    },
});

