import { expect } from 'chai'
import { Parser } from 'smartql-parser'
import { ast, middlewares } from '../../interfaces'
import { Runner } from '../../implementations/runner'
import { Middleware } from '../../implementations/middleware'
import { SyncMiddleWare, AsyncMiddleWare } from './mocks'


describe('smartql-runner', () => {
	const options = {};
	const response = 'RESPONSE';

	it('Runner can be used as chain', async () => {
		const astQuery = Parser().parse({
			method: 'GET',
			resources: [{
				resource: 'User',
				fields: ['Id']
			}]
		});
		const runner1 = new Runner().next(new SyncMiddleWare());
		const runner2 = new Runner().next(runner1).next(new SyncMiddleWare());

		await runner1.run(astQuery, options, response);

		expect(astQuery.getMethod()).to.be.equal('GETSYNC_MIDDLEWARESYNC_MIDDLEWARE')
	})

	it('Async and sync middlewares should be in right order', async () => {
		const astQuery = Parser().parse({
			method: 'GET',
			resources: [{
				resource: 'User',
				fields: ['Id']
			}]
		});

		await new Runner()
			.next(new SyncMiddleWare())
			.next(new AsyncMiddleWare())
			.next(new SyncMiddleWare())
			.next(new AsyncMiddleWare())
			.run(astQuery, options, response);

		expect(astQuery.getMethod()).to.be.equal('GETSYNC_MIDDLEWAREASYNC_MIDDLEWARESYNC_MIDDLEWAREASYNC_MIDDLEWARE')
	})

	it('Runner should return response', async () => {
		const astQuery = Parser().parse({
			method: 'GET',
			resources: [{
				resource: 'User',
				fields: ['Id']
			}]
		});

		const result = await new Runner()
			.next(new SyncMiddleWare())
			.run(astQuery, options, response)

		expect(result).to.be.equal(response)
	})

})






