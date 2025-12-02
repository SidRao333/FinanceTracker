import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { ConfigType } from "@nestjs/config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(@Inject(refreshConfig.KEY) private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshTokenConfig.secret as string,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }
    validate(req: Request, payload: AuthJwtPayload) {
        const userId = payload.sub;
        const refreshToken = req.headers['authorization']?.replace("Bearer ", "") || "";
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}
