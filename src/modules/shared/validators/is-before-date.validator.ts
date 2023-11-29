import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsBeforeDateConstraint implements ValidatorConstraintInterface {
    public validate(propertyValue: any, args: ValidationArguments) {
        return new Date(propertyValue) <= new Date(args.object[args.constraints[0]]);
    }

    public defaultMessage(args: ValidationArguments) {
        return `"${args.property}" must be before "${args.constraints[0]}"`;
    }
}

export function IsBeforeDate(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsBeforeDateConstraint,
        });
    };
}
