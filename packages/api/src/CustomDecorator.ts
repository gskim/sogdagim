import { createParamDecorator, ExecutionContext, ForbiddenException, Injectable, NotFoundException, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

/* tslint:disable */
export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
    	return request.user
	}
)

@Injectable()
export class EmailAuthGuard extends AuthGuard('email') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super()
	}
	canActivate(context: ExecutionContext) {
		return super.canActivate(context)
	}

	handleRequest(err: any, user: any, info: any) {
		if (err || !user) {
			throw err || new UnauthorizedException('유효하지 않은 로그인입니다. 다시 로그인을 시도해주세요.')
		}
		return user
	}
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
