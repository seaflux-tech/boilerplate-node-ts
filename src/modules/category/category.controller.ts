import { Request, Response } from "express";
import category from "../../models/category.model";
import { CreateCategoryDto } from "./dto/create.dto";
import { UpdateCategoryDto } from "./dto/update.dto";

export class CategoryController {
    public async create(req: Request, res: Response) {
        const { name } = req.dto as CreateCategoryDto;
        const { me } = req;

        const _category = await category.create({
            name,
            userId: me.id,
        }) as any;

        res.status(200).json(_category);
    }

    public async read(req: Request, res: Response) {
        const { page, limit } = req.pager;

        const { rows: data, count } = await category.findAndCountAll({
            where: {
                status: 1,
            },
            limit,
            offset: (page - 1) * limit,
        }) as any;

        res.status(200).json({
            data, count, limit,
        });
    }

    public async readOne(req: Request, res: Response) {
        const { categoryId } = req.params;

        const _category = await category.findOne({
            where: {
                id: categoryId,
                status: 1,
            },
        }) as any;

        res.status(200).json(_category);
    }

    public async update(req: Request, res: Response) {
        const { name } = req.dto as UpdateCategoryDto;
        const { me } = req;
        const { categoryId } = req.params;

        await category.update({
            name,
        }, {
            where: {
                id: categoryId,
                userId: me.id,
            },
            returning: true,
        }) as any;

        res.status(200).json({ msg: "Category updated successfully!" });
    }

    public async delete(req: Request, res: Response) {
        const { me } = req;
        const { categoryId } = req.params;

        await category.update({
            status: 0,
        }, {
            where: {
                id: categoryId,
                userId: me.id,
            },
        }) as any;

        res.status(200).json({ msg: "Category deleted successfully!" });
    }
}
