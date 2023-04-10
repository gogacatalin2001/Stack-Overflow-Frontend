function SignupValidation (values) {
    let errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{4,}$/

    if(values.email === "") {
        errors.email = "Email should not be empty"
    } else if(!email_pattern.test(values.email)) {
        errors.email = "Please enter a valid email address"
    } else {
        errors.email = ""
    }

    if(values.username === "") {
        errors.username = "Username should not be me empty"
    } else {
        errors.username =""
    }
    
    if(values.password === "") {
        errors.password = "Password should not be me empty"
    } else if(!password_pattern.test(values.password)) {
        errors.password = "Password doesn't match"
    } else {
        errors.password =""
    }

    if(values.phone === "") {
        errors.phone = "Phone should not be empty"
    } else {
        errors.phone = ""
    }

    return errors;
}

export default SignupValidation;