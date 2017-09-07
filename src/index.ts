import { Runner } from './implementations/runner'
import { Middleware } from './implementations/middleware'


export { Runner, Middleware }


// import * as util from 'util'
// import { Parser } from 'smartql-parser'



// const query = Parser().parse({
// 	method: 'GET',
// 	resources: [{
// 		resource: 'User',
// 		where: [{
// 			age: [{'>': 18, '<': [50,20]}, 70]
// 		},{
// 			name: 'Donald'
// 		}],
// 		fields: ['id', 'name'],
// 		with: {
// 			posts: {
// 				fields: ['id', 'title'],
// 				with: {
// 					comments: {
// 						fields: ['id']
// 					}
// 				}
// 			}
// 		}
// 	}]
// })

// console.log(util.inspect(query, false, null))







/* Perfomance test */

// const suite = new Benchmark.Suite;

// suite.add('SetNamesToInclusions', function() {
// 	const query = Parser().parse({
// 		method: 'GET',
// 		resources: [{
// 			resource: 'User',
// 			where: [{
// 				age: [{'>': 18, '<': [50,20]}, 70]
// 			},{
// 				name: 'Donald'
// 			}],
// 			fields: ['id', 'name'],
// 			with: {
// 				posts: {
// 					fields: ['id', 'title'],
// 					with: {
// 						comments: {
// 							fields: ['id']
// 						}
// 					}
// 				}
// 			}
// 		}]
// 	})
//   	return new Middle().execute(query, {})
// })
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .run({ async: true })











// componentDidMount(){
// 	api.watch({
// 		resource: 'user',
// 		where: { age: {'>': 18} }
// 	}, users => this.setState({users}))
// }
// onClick(){
// 	api.call('renameUser', { id: this.id, newName: this.name })
// 	api.setOptimistic({
// 		resource: 'user',
// 		name: this.name
// 	})
// }




// Вот так храним условия
const obj = {
	User: [{
		conditions: obj => ((obj.age > 18) || (obj.name === 'Donald')),
		queryId: '_qwdk1bh32' 
	}]
}

// Вот так храним запросы
const queries = {
	_qwdk1bh32: '{resource:"User", where: [{age: {">": 18}},{name: "Donald"}]}'
}


// При коннекте с редисом запрашиваем все запросы заново и парсим, затем добавляем в реестр
// а при сообщении от редиса парсим и добавлям в реестр