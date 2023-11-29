import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import userInviteRequest from "../../../models/user-invite-request.model";
import user from "../../../models/user.model";

@ValidatorConstraint({ async: true })
export class IsUserExistInviteRequestExistConstraint implements ValidatorConstraintInterface {
    public validate(token: any) {
        return userInviteRequest.findOne({
            attributes: ["id", "email"],
            where: {
                uuid: token,
            },
        }).then((_userInviteRequest: any) => {
            if (_userInviteRequest) {
                return user.findOne({
                    where: { email: _userInviteRequest.email },
                }).then((_user) => {
                    if (_user) {
                        return false;
                    } else {
                        return true;
                    }
                });
            }
            return false;
        });
    }

    public defaultMessage() {
        return "User with email address already exist.";
    }
}

export function IsUserExistInviteRequestExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserExistInviteRequestExistConstraint,
        });
    };
}
