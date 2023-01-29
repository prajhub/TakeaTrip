import * as Yup from 'yup'

const passwordRules = /^(?=.*\d) (?=.*[a-z]) (?=.*[A-Z]).{3,}$/;

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is required"),
  
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),
  
    
  
    email: Yup.string().email().required("Email is required"),
  
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });