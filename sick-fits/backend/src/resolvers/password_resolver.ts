import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { MoreThan } from 'typeorm';
import { Resolver, Mutation, InputType, Field, Arg, Ctx } from 'type-graphql';

import { User } from 'src/entity/user';
import { signToken, addTokenToCookie } from 'src/libs/jwt';
import { Context } from 'src/types';
import { sendEmail, decorateEmail } from 'src/libs/email';

// Token last for 1 hour.
const RESET_TOKEN_DURATION = 1000 * 60 * 60;

@InputType()
export class RequestResetInput {
  @Field()
  email!: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  resetToken!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@Resolver()
export class PasswordResolver {
  @Mutation(() => Boolean)
  async requestReset(@Arg('data') data: RequestResetInput): Promise<boolean> {
    const { email } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with ${email} does not exist.`);
    }
    const resetToken = randomBytes(20).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + RESET_TOKEN_DURATION);
    await User.update({ email }, { resetToken, resetTokenExpiry });

    // TODO: Email user the resetToken
    sendEmail({
      from: 'zero@gmail.com',
      to: email,
      subject: 'Your Password Reset Link',
      html: decorateEmail(`
      Your password reset link is here!


      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click here to reset your password
      </a>
      `),
    });
    return true;
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg('data') data: ResetPasswordInput,
    @Ctx() ctx: Context,
  ): Promise<User> {
    const { resetToken, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      throw new Error('Password does not match!');
    }
    const expiry = Date.now() - RESET_TOKEN_DURATION;
    const user = await User.findOne({
      where: {
        resetToken: resetToken,
        resetTokenExpiry: MoreThan(new Date(expiry)),
      },
    });
    if (!user) {
      throw new Error('Invalid or expired reset token.');
    }
    const newPassword = await bcrypt.hash(password, 10);
    await User.update(
      { email: user.email },
      {
        password: newPassword,
        resetToken: undefined,
        resetTokenExpiry: undefined,
      },
    );
    const token = signToken(user.id);
    addTokenToCookie(token, ctx.res);
    return user;
  }
}
