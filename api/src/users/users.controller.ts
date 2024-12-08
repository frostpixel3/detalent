import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID, randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { utils } from 'ethers';
import { User } from '@prisma/client';

const generateWalletConnectMessage = (
  address: string,
  nonce: string,
) => `Welcome to DeTalent!

Click to sign in and accept the DeTalent of Service (https://detalent.xyz/tos) and Privacy Policy (https://detalent.xyz/privacy).

This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${address}

Nonce:
${nonce}
`;

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Post('/auth/init')
  async initWalletAuthNonce(@Body() body: { address: string }) {
    const nonce = randomUUID();

    await this.prisma.walletAuthNonce.upsert({
      where: { address: body.address },
      update: { nonce },
      create: { address: body.address, nonce },
    });

    return {
      message: generateWalletConnectMessage(body.address, nonce),
    };
  }

  @Post('/auth/verify')
  async verifyWalletAuthNonce(
    @Body() body: { address: string; signedMessage: string },
  ) {
    const walletAuthNonce = await this.prisma.walletAuthNonce.findUnique({
      where: { address: body.address },
    });

    if (!walletAuthNonce) {
      throw new UnauthorizedException('Invalid address');
    }

    const signerAddress = utils.verifyMessage(
      generateWalletConnectMessage(body.address, walletAuthNonce.nonce),
      body.signedMessage,
    );

    if (signerAddress !== walletAuthNonce.address) {
      throw new UnauthorizedException('Invalid signature');
    }

    const token = randomBytes(48).toString('hex');

    const user = await this.prisma.user.upsert({
      where: { address: signerAddress },
      update: {},
      create: { address: signerAddress },
    });

    const authToken = await this.prisma.authTokens.upsert({
      where: { userId: user.id },
      update: { token },
      create: {
        token,
        userId: user.id,
      },
    });

    return {
      token: authToken.token,
    };
  }

  @Get('/me')
  async me(@Req() req) {
    const user = req.user as User;
    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }
    return user;
  }
}
