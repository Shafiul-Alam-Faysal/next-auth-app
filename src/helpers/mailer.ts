import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { verify } from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// create a hashed token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(
				userId,
				{
					verifiedToken: hashedToken,
					verifiedTokenExpiry: Date.now() + 3600000,
				},
				{ new: true, runValidators: true }
			);
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(
				userId,
				{
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpires: Date.now() + 3600000,
				},
				{ new: true, runValidators: true }
			);
		}

		// Looking to send emails in production? Check out our Email API/SMTP product!
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
			debug: true, // 👈 Add this
			logger: true, // 👈 Logs SMTP traffic
		});

		const mailOptions = {
			from: "faysal179038@gmail.com",
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
			html: `<p>
                Click <a href="${
									process.env.DOMAIN
								}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "verify your email" : "reset your password"
			} or copy and past the link below into your browser. <br> ${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}
            </p>`,
		};

		const mailresponse = await transport.sendMail(mailOptions);
		return mailresponse;

		//
	} catch (error: any) {
		throw new Error(error.message);
	}
};
