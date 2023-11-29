import { validate } from "class-validator";

export class Validator {
  public validate<T>(objType: new () => T) {
    return (req, res, next) => {
      const obj = this.createInstanceFromJson(objType, { ...req.body, ...req.params, _me: req.me });
      validate(obj).then((err) => {
        if (err.length) {
          const _error = err[0].constraints;
          const [first] = Object.keys(_error);
          const error = _error[first];
          return res.status(400).json({ error });
        }
        req.dto = obj;
        next();
      });
    };
  }

  public createInstanceFromJson<T>(objType: new () => T, json: any) {
    const newObj = new objType();
    for (const prop in json) {
      if ({}.propertyIsEnumerable.call(json, prop)) {
        newObj[prop] = json[prop];
      }
    }
    return newObj;
  }
}
