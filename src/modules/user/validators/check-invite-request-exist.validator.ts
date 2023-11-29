import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import userInviteRequest from "../../../models/user-invite-request.model";

@ValidatorConstraint({ async: true })
export class CheckInviteRequestExistConstraint implements ValidatorConstraintInterface {
    public validate(token: any) {
        return userInviteRequest.findOne({
            attributes: ["id"],
            where: {
                uuid: token,
            },
        }).then((_userInviteRequest) => {
            if (_userInviteRequest) { return true; }
            return false;
        });
    }

    public defaultMessage() {
        return "Invite expired!";
    }
}

export function CheckInviteRequestExist(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CheckInviteRequestExistConstraint,
        });
    };
}
