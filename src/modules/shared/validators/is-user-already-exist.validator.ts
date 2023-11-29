import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import user from "../../../models/user.model";

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    public validate(email: any) {
        return user.findOne({
            attributes: ["email"],
            where: {
                email: email.trim(),
            },
        }).then((_user) => {
            if (_user) { return false; }
            return true;
        });
    }

    public defaultMessage() {
        return "User $value already exists.";
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
