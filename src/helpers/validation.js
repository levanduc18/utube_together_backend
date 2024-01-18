//VALIDATION
import { check } from "express-validator";

const validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        check("email", "Email is required").exists(),
        check("email", "Email can be empty string").not().isEmpty(),
        check("email", "Invalid email.").isEmail(),
        check("name", "Name is required").exists(),
        check("name", "Name can be empty string").not().isEmpty(),
        check("password", "Password minimum length is 6 characters.")
          .exists()
          .isLength({ min: 6 }),
      ];
    }
    case "login": {
      return [
        check("email", "Email is required").exists(),
        check("email", "Email can be empty string").not().isEmpty(),
        check("email", "Invalid email.").isEmail(),
        check("password", "Password minimum length is 6 characters.")
          .exists()
          .isLength({ min: 6 }),
      ];
    }
  }
};

export default validate;
