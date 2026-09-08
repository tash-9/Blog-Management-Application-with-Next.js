import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { ServiceError } from "../middlewares/error.middleware.js";

const MIN_PASSWORD_LENGTH = 6;

// shared by register and by the password-update service in phase 7
export const hash_password = async (password) => {
    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
        throw new ServiceError(
            400,
            `password must be at least ${MIN_PASSWORD_LENGTH} characters`
        )
    }

    return bcrypt.hash(password, 10)
}

export const register_user = async ({ firstname, lastname, email, password }) => {
    // note what is NOT in this signature: role and isActive. the controller
    // never forwards them, so a caller cannot make themselves an admin here.
    // the model defaults supply role = "user" and isActive = true
    if (!firstname || !lastname || !email || !password) {
        throw new ServiceError(400, "firstname, lastname, email and password are required")
    }

    const trimmedFirstname = String(firstname).trim()
    const trimmedLastname = String(lastname).trim()
    const trimmedEmail = String(email).trim().toLowerCase()

    if (!trimmedFirstname || !trimmedLastname) {
        throw new ServiceError(400, "firstname and lastname cannot be empty")
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(trimmedEmail)) {
        throw new ServiceError(400, "email must be a valid email address")
    }

    const existing = await User.findOne({ where: { email: trimmedEmail } })
    if (existing) {
        throw new ServiceError(409, "email already registered")
    }

    const hashedPassword = await hash_password(password)

    const user = await User.create({
        firstname: trimmedFirstname,
        lastname: trimmedLastname,
        email: trimmedEmail,
        password: hashedPassword,
    })

    // the model's defaultScope already strips password from reads, but this row
    // came back from create(), so drop it explicitly
    const { password: _password, ...safeUser } = user.toJSON()

    return safeUser
}

export const login_user = async ({ email, password }) => {
    if (!email || !password) {
        throw new ServiceError(400, "email and password are required")
    }

    // the only place in the app that opts back into the password column
    const user = await User.scope("withPassword").findOne({
        where: { email: String(email).trim().toLowerCase() },
    })

    // same message for an unknown email and a wrong password, so this endpoint
    // cannot be used to discover which emails are registered
    if (!user) {
        throw new ServiceError(401, "invalid email or password")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new ServiceError(401, "invalid email or password")
    }

    // checked after the password, so a wrong guess still gets the generic 401
    // and cannot reveal that a given account exists but is deactivated
    if (!user.isActive) {
        throw new ServiceError(403, "this account has been deactivated")
    }

    // role travels inside the token, so is_admin can decide without a db read.
    // a token issued before a role change still carries the old role until the
    // user logs in again
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    )

    return {
        token,
        user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        },
    }
}

// --- forgot / reset password -------------------------------------------
//
// no email service is wired into this project (no SMTP credentials), so
// rather than silently doing nothing, forgot_password logs the reset link
// to the server console and also returns it in the response. that keeps the
// flow fully testable locally. swap the console.log below for a real mailer
// call (nodemailer, SES, etc.) once one is configured, and drop resetUrl
// from the response at that point since it would otherwise leak the token
// to the browser
const RESET_TOKEN_BYTES = 32
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

export const forgot_password = async ({ email }) => {
    if (!email) {
        throw new ServiceError(400, "email is required")
    }

    const user = await User.findOne({ where: { email: String(email).trim().toLowerCase() } })

    // same shape whether or not the email exists, so this endpoint cannot be
    // used to discover which addresses are registered - mirrors login_user
    const generic_message = "If that email is registered, a password reset link has been sent."

    if (!user) {
        return { message: generic_message }
    }

    const raw_token = crypto.randomBytes(RESET_TOKEN_BYTES).toString("hex")
    const hashed_token = crypto.createHash("sha256").update(raw_token).digest("hex")

    user.resetPasswordToken = hashed_token
    user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS)
    await user.save()

    const reset_url = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${raw_token}`

    console.log(`[forgot-password] reset link for ${user.email}: ${reset_url}`)

    return { message: generic_message, resetUrl: reset_url }
}

export const reset_password = async ({ token, password }) => {
    if (!token) {
        throw new ServiceError(400, "reset token is required")
    }

    const hashed_token = crypto.createHash("sha256").update(String(token)).digest("hex")

    const user = await User.scope("withResetToken").findOne({
        where: { resetPasswordToken: hashed_token },
    })

    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
        throw new ServiceError(400, "this reset link is invalid or has expired")
    }

    const hashed_password = await hash_password(password)

    user.password = hashed_password
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    await user.save()

    return { message: "password successfully changed" }
}
