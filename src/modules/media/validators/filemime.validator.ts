import { Constants } from "../../../configs/constants";

export class FilemimeValidator {
    public static validate(req, res, next) {
        const { file } = req.files;
        const validMimes = Constants.VALID_MIMETYPES;
        if (!validMimes.includes(file.mimetype)) {
            return res.status(400).json({ error: `Invalid file, allowed file types are [${Constants.VALID_MIMETYPES.join(", ")}]` });
        }
        next();
    }
}
