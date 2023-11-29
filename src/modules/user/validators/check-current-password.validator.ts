import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { Cryptic } from "../../../helpers/cryptic.helper";
import user from "../../../models/user.model";

@ValidatorConstraint({ async: true })
export class CheckCurrentPasswordConstraint implements ValidatorConstraintInterface {
    public async validate(currentPassword: any, args: ValidationArguments) {
        const { object } = args as any;
        const { _me } = object;
        return user.findByPk(_me.id).then((_user: any) => {
            return Cryptic.compare(currentPassword, _user.password)
                .then((checkPass) => {
                    if (checkPass) {
                        return true;
                    }
                    return false;
                });
        });
    }

    public defaultMessage() {
        return "Please check your current password!";
    }
}

export function CheckCurrentPassword(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CheckCurrentPasswordConstraint,
        });
    };
}
