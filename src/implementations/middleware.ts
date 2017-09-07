import { ast, middlewares } from '../interfaces'


abstract class Middleware implements middlewares.IMiddleware {
	nextMiddleware: middlewares.IMiddleware;

	next(nextMiddleware: middlewares.IMiddleware){
		this.nextMiddleware = nextMiddleware;

		return nextMiddleware
	}

	async execute(query: ast.IQuery, params: middlewares.MiddlewareParams, response: string){
		return this.applyNext(query, params, response)
	}

	async applyNext(query: ast.IQuery, params: middlewares.MiddlewareParams, response: string){
		if(!this.nextMiddleware) return response
			
		return this.nextMiddleware.execute(query, params, response)
	}

	getNext(){
		return this.nextMiddleware
	}

}


export { Middleware }