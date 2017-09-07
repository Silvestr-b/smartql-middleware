import { ast } from './'


export type MiddlewareParams = {[paramName: string]: any}

export interface IMiddleware {
	next: (nextMiddleware: IMiddleware) => IMiddleware
	applyNext: (query: ast.IQuery, params: MiddlewareParams, response: string) => Promise<string>
	execute: (query: ast.IQuery, params: MiddlewareParams, response: string) => Promise<string>
	getNext: () => IMiddleware
}

export interface IRunner {
	next: (nextMiddleware: IMiddleware) => IRunner
	run: (query: ast.IQuery, params?: MiddlewareParams) => Promise<string>
	getFirstMiddleware: () => IMiddleware
	getLastMiddleware: () => IMiddleware
}


