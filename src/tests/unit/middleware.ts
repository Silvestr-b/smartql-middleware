import { expect } from 'chai'
import { stub } from 'sinon'
import { ast, middlewares } from '../../interfaces'
import { Middleware } from '../../'


describe('smartql-middleware', () => {
	const query = <ast.IQuery>{};
	const options = {};
	const response = 'RESPONSE';

	class Plugin extends Middleware {
		async execute(query: ast.IQuery, params: any, response: any){
			return this.applyNext(query, params, response)
		}
	} 

	describe('.next()', () => {

		it('currect', () => {
			const plugin = new Plugin();
			const nextPlugin = new Plugin();

			plugin.next(nextPlugin);

			expect(plugin.getNext()).to.be.equal(nextPlugin)
		})

	})
	

	describe('.applyNext()', () => {

		it('with_next', async () => {
			const plugin = new Plugin();
			const nextPlugin = stub(new Plugin());
			plugin.next(<Plugin>nextPlugin);

			await plugin.applyNext(query, options, response);

			expect(nextPlugin.execute.calledWith(query, options, response)).to.be.true
		})

		it('without_next', async () => {
			const plugin = new Plugin();
			
			const result = await plugin.applyNext(query, options, response);

			expect(result).to.be.equal(response)
		})
		
	})

	describe('.execute()', () => {

		it('with_next', async () => {
			const plugin = new Plugin();
			const nextPlugin = stub(new Plugin());
			plugin.next(<Plugin>nextPlugin);

			await plugin.execute(query, options, response);

			expect(nextPlugin.execute.calledWith(query, options, response)).to.be.true
		})	

		it('without_next', async () => {
			const plugin = new Plugin();
			
			const result = await plugin.execute(query, options, response);

			expect(result).to.be.equal(response)
		})

	})

})


