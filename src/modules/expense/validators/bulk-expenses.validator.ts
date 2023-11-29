import {
    registerDecorator,
    validate,

    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { CreateExpenseDto } from "../dto/create.dto";

@ValidatorConstraint({ async: true })
export class BulkExpensesConstraint implements ValidatorConstraintInterface {
    private createInstanceFromJson<T>(objType: new () => T, json: any) {
        const newObj = new objType();
        for (const prop in json) {
            if ({}.propertyIsEnumerable.call(json, prop)) {
                newObj[prop] = json[prop];
            }
        }
        return newObj;
    }

    public validate(expenses: any) {
        const errors = expenses.map((exp: any) => {
            const expToValidate = this.createInstanceFromJson(CreateExpenseDto, exp);
            return validate(expToValidate).then((err) => {
                return err;
            })
        });

        return Promise.all(errors).then((results) => {
            const err = [];
            results.map((errors: any) => {
                errors.map((e) => {
                    err.push(e);
                })
            });
            if (err.length > 0) {
                console.error(err);
                return false;
            }
            return true;
        });
    }

    public defaultMessage() {
        return "Please check expense objects, it's not matching all validations.";
    }
}

export function BulkExpenses(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: BulkExpensesConstraint,
        });
    };
}
