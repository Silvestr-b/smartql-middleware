import { Middleware } from '../../'
import { ast, middlewares } from '../../interfaces'


class SyncMiddleWare extends Middleware {
	execute(query: ast.IQuery, params: middlewares.MiddlewareParams, response: string){
		query.setMethod(query.getMethod() + 'SYNC_MIDDLEWARE')

		return this.applyNext(query, params, response)
	}
}

class AsyncMiddleWare extends Middleware {
	async execute(query: ast.IQuery, params: middlewares.MiddlewareParams, response: string){

		const promise = await new Promise((resolve, reject) => {
	   		setTimeout(() => {
	   			query.setMethod(query.getMethod() + 'ASYNC_MIDDLEWARE')
				resolve()
	        }, 1)
		})

		return this.applyNext(query, params, response)
	}
}


export { SyncMiddleWare, AsyncMiddleWare }