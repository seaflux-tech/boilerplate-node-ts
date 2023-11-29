import { Router } from "express";
import fileUpload from "express-fileupload";
import { Constants } from "../../configs/constants";
import { MediaController } from "./media.controller";
import { FilemimeValidator } from "./validators/filemime.validator";
import { FilesizeValidator } from "./validators/filesize.validator";

const router: Router = Router();
const mediaController = new MediaController();

router.post("/", fileUpload({
    limits: { fileSize: Constants.MAX_FILE_SIZE },
}),
    FilemimeValidator.validate,
    FilesizeValidator.validate,
    mediaController.create,
);

export const mediaRoute: Router = router;
