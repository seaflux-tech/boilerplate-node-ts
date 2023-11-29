import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsDateOnlyConstraint implements ValidatorConstraintInterface {
    public validate(value: any) {
        const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        return typeof value === "string" && regex.test(value);
    }

    public defaultMessage() {
        return "Please provide only date like 2020-12-08";
    }
}

export function IsDateOnly(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDateOnlyConstraint,
        });
    };
}
