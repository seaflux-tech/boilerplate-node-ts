import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { Op } from "sequelize";
import category from "../../../models/category.model";

@ValidatorConstraint({ async: true })
export class IsCategoryAlreadyExistConstraint implements ValidatorConstraintInterface {
    public validate(name: any, args: ValidationArguments) {
        const { object } = args as any;
        const where = { name, status: 1 } as any;
        if (object.categoryId) {
            where.id = {
                [Op.ne]: object.categoryId,
            };
        }
        return category.findOne({
            attributes: ["id"],
            where,
        }).then((_category) => {
            if (_category) { return false; }
            return true;
        });
    }

    public defaultMessage() {
        return "Category $value alredy exist!";
    }
}

export function IsCategoryAlreadyExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCategoryAlreadyExistConstraint,
        });
    };
}
