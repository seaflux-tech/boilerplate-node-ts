import bcrypt from "bcrypt";

export class Cryptic {
    public static crypt(password) {
        return bcrypt.hash(password, 10);
    }

    public static compare(plainPass, hashword) {
        return bcrypt.compare(plainPass, hashword);
    }
}
