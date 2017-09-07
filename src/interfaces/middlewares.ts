import { ast } from './'


export type MiddlewareParams = {[paramName: string]: any}

export interface IMiddleware {
	next: (nextMiddleware: IMiddleware) => IMiddleware
	applyNext: (query: ast.IQuery, params: MiddlewareParams, response: any) => Promise<any>
	execute: (query: ast.IQuery, params: MiddlewareParams, response: any) => Promise<any>
	getNext: () => IMiddleware
}

export interface IRunner {
	next: (nextMiddleware: IMiddleware) => IRunner
	run: (query: ast.IQuery, params: MiddlewareParams, response?: any) => Promise<any>
	getFirstMiddleware: () => IMiddleware
	getLastMiddleware: () => IMiddleware
}


