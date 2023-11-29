import { Request, Response } from "express";
import category from "../../models/category.model";
import expense from "../../models/expense.model";
import media from "../../models/media.model";
import merchant from "../../models/merchant.model";
import report from "../../models/report.model";
import { BulkCreateExpenseDto } from "./dto/bulk-create.dto";
import { CreateExpenseDto } from "./dto/create.dto";
import { UpdateExpenseDto } from "./dto/update.dto";

export class ExpenseController {
    public async create(req: Request, res: Response) {
        const {
            refNo, reportId,
            expDate, amount,
            description, canReimburse,
            receiptMediaId,
            merchantId, categoryId,
        } = req.dto as CreateExpenseDto;

        const { me } = req;

        const _expense = await expense.create({
            userId: me.id,
            categoryId,
            merchantId,
            receiptMediaId: receiptMediaId || null,
            canReimburse,
            description: description || null,
            amount,
            expDate,
            refNo,
            reportId,
        }) as any;

        res.status(200).json(_expense);
    }

    public async bulkCreate(req: Request, res: Response) {
        const { me } = req;
        const { expenses } = req.dto as BulkCreateExpenseDto;

        const promises = expenses.map((exp) => {
            const {
                refNo, reportId,
                expDate, amount,
                description, canReimburse,
                receiptMediaId,
                merchantId, categoryId,
            } = exp as CreateExpenseDto;
            return expense.create({
                userId: me.id,
                categoryId,
                merchantId,
                receiptMediaId: receiptMediaId || null,
                canReimburse,
                description: description || null,
                amount,
                expDate,
                refNo,
                reportId,
            }) as any;
        });

        await Promise.all(promises);

        res.status(200).json({ msg: "Expenses created" });
    }

    public async read(req: Request, res: Response) {
        const { me } = req;
        const { page, limit } = req.pager;

        const { rows: data, count } = await expense.findAndCountAll({
            include: [
                { model: media, as: "receipt", attributes: ["id", "key", "mime"] },
                { model: category, attributes: ["id", "name"] },
                { model: merchant, attributes: ["id", "name"] },
                { model: report, attributes: ["id", "title"] },
            ],
            where: {
                userId: me.id,
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
        const { me } = req;
        const { expenseId } = req.params;

        const _expense = await expense.findOne({
            include: [
                { model: media, as: "receipt", attributes: ["id", "key", "mime"] },
                { model: category, attributes: ["id", "name"] },
                { model: merchant, attributes: ["id", "name"] },
                { model: report, attributes: ["id", "title"] },
            ],
            where: {
                id: expenseId,
                userId: me.id,
                status: 1,
            },
        }) as any;

        res.status(200).json(_expense);
    }

    public async update(req: Request, res: Response) {
        const {
            refNo, reportId,
            expDate, amount,
            description, canReimburse,
            receiptMediaId,
            merchantId, categoryId,
        } = req.dto as UpdateExpenseDto;

        const { me } = req;
        const { expenseId } = req.params;

        await expense.update({
            categoryId,
            merchantId,
            receiptMediaId: receiptMediaId || null,
            canReimburse,
            description: description || null,
            amount,
            expDate,
            refNo,
            reportId,
        }, {
            where: {
                id: expenseId,
                userId: me.id,
                status: 1,
            },
        }) as any;

        res.status(200).json({ msg: "Expense updated successfully!" });
    }

    public async delete(req: Request, res: Response) {
        const { me } = req;
        const { expenseId } = req.params;

        await expense.update({
            status: 0,
        }, {
            where: {
                id: expenseId,
                userId: me.id,
            },
        }) as any;

        res.status(200).json({ msg: "Expense deleted successfully!" });
    }
}
