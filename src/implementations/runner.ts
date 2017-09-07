import { ast, middlewares } from '../interfaces'
import { Middleware } from './middleware'


class Runner extends Middleware implements middlewares.IRunner {
	firstMiddleware: middlewares.IMiddleware;
	lastMiddleware: middlewares.IMiddleware;
	
	next(nextMiddleware: middlewares.IMiddleware){
		if(!this.firstMiddleware) this.firstMiddleware = nextMiddleware; 
		if(this.lastMiddleware) this.lastMiddleware.next(nextMiddleware)

		this.lastMiddleware = nextMiddleware;

		return this	
	}

	run(query: ast.IQuery, params: any = {}, response: any = {}){
		if(!this.firstMiddleware) throw new Error('Cannot find registered middlewares')
		
		return this.firstMiddleware.execute(query, params, response)
	}

	getFirstMiddleware(){
		return this.firstMiddleware
	}

	getLastMiddleware(){
		return this.lastMiddleware
	}

}


export { Runner }