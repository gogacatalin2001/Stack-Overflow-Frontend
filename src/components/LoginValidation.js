
function LoginValidation (values) {
    let errors = {}
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{4,}$/

    // TODO implement validation from backend

    if(values.username === "") {
        errors.username = "Username should not be me empty"
    } else {
        errors.username =""
    }

    // TODO implement validation from backend
    if(values.password === "") {
        errors.password = "Password should not be me empty"
    } else if(!password_pattern.test(values.password)) {
        errors.password = "Password doesn't match"
    } else {
        errors.password =""
    }

    return errors;
}

export default LoginValidation;