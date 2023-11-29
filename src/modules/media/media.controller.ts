import { Request, Response } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import media from "../../models/media.model";

export class MediaController {
    public async create(req: Request, res: Response) {
        const { file } = req.files;
        const filename = `${uuidv4()}${path.extname(file.name)}`;
        await file.mv(`${process.cwd()}/uploads/${filename}`);

        const _media = await media.create({
            mime: file.mimetype,
            key: filename,
        });

        res.status(200).json(_media);
    }
}
