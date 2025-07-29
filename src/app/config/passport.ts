import passport from "passport";
import { Strategy as LocalStreategy } from 'passport-local'
import User from "../../modules/user/user.models";
import bcrypt from 'bcryptjs'

passport.use(new LocalStreategy({
    usernameField: "email",
    passwordField: "password"
}, async (email: string, password: string, done: any) => {
    try {
        // check if user actually exist
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return done(null, false, {message: 'User does not exist.'})
        }

        const isPasswordMatch = await bcrypt.compare(password as string, existingUser.password as string)

        if (!isPasswordMatch) {
            return done(null, false, {message: "Invalid Passowrd"})
        }

        return done(null, existingUser)

    } catch (error: any) {
        console.log(error)
        done(error)
    }
}))

