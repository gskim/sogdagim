import { createParamDecorator, CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '@services/AuthService'
import { UserService } from '@services/UserService'
import { User } from '@sogdagim/orm'
import { Observable } from 'rxjs'
import { jwtConstants } from './Constants'
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
export class WsGuard implements CanActivate {

	constructor(private userService: UserService, private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const data = context.switchToWs().getData()
		const token = data.headers.authorization
		if (!token) return false
		try {
			const decode = this.jwtService.decode(token.split(' ')[1]) as User
			const user = await this.userService.getUser(decode.id)
			context.switchToHttp().getRequest().user = user
			return true
		} catch (ex) {
			console.log(ex)
			return false
		}
	}
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
