import { Constants } from "../../../configs/constants";

export class FilesizeValidator {
    public static validate(req, res, next) {
        const { file } = req.files;
        if (file.truncated) {
            return res.status(413).json({ error: `File size limit has been reached, Max allowed size is ${Constants.MAX_FILE_SIZE / 1024 / 1024}MB` });
        }
        next();
    }
}
