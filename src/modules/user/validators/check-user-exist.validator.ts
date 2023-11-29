import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import user from "../../../models/user.model";

@ValidatorConstraint({ async: true })
export class CheckUserExistConstraint implements ValidatorConstraintInterface {
    public validate(email: any) {
        return user.findOne({
            attributes: ["email"],
            where: {
                email: email.trim(),
            },
        }).then((_user) => {
            if (_user) { return true; }
            return false;
        });
    }

    public defaultMessage() {
        return "User with $value not exists.";
    }
}

export function CheckUserExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CheckUserExistConstraint,
        });
    };
}
