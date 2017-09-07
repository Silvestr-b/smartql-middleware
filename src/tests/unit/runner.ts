import { expect } from 'chai'
import { spy } from 'sinon'
import { ast, middlewares } from '../../interfaces'
import { Runner } from '../../implementations/runner'
import { Middleware } from '../../implementations/middleware'


describe('smartql-runner', () => {
	const query = <ast.IQuery>{};
	const options = {};
	const response = 'RESPONSE';
	class Plugin extends Middleware {
		async execute(query: ast.IQuery, params: any, response: any){
			return this.applyNext(query, params, response)
		}
	} 

	describe('.next()', () => {

		it('middleware not setted', () => {
			const runner = new Runner();
			const plugin = new Plugin();

			runner.next(plugin);

			expect(runner.getFirstMiddleware()).to.be.equal(plugin);
			expect(runner.getLastMiddleware()).to.be.equal(plugin);
		})

		it('middleware setted', () => {
			const runner = new Runner();
			const plugin1 = new Plugin();
			const plugin2 = new Plugin();

			runner.next(plugin1);
			runner.next(plugin2);

			expect(runner.getFirstMiddleware()).to.be.equal(plugin1);
			expect(runner.getLastMiddleware()).to.be.equal(plugin2);
			expect(plugin1.getNext()).to.be.equal(plugin2);
		})
		
	})

	describe('.run()', () => {
		
		it('middleware not setted', () => {
			const runner = new Runner();

			expect(() => runner.run(query, options)).to.throw('Cannot find registered middlewares');		
		})

		it('middleware setted', () => {
			const runner = new Runner();
			const plugin = new Plugin();
			const pluginSpy = spy(plugin, 'execute');

			runner.next(plugin);
			runner.run(query, options, response);

			expect(pluginSpy.calledWith(query, options, response)).to.be.true;	
		})

		it('without params and response', () => {
			const runner = new Runner();
			const plugin = new Plugin();
			const pluginSpy = spy(plugin, 'execute');

			runner.next(plugin);
			runner.run(query);

			expect(pluginSpy.args[0][1]).to.be.be.deep.equal({});
			expect(pluginSpy.args[0][2]).to.be.be.deep.equal({});	
		})
	})	

})