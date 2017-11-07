// register
import register from 'helpers/register'

// controllers
import GoodsTypesAddCtrl from './controllers/add'
import GoodsTypesEditCtrl from './controllers/edit'
import GoodsTypesListCtrl from './controllers/list'
import GoodsTypesDetailCtrl from './controllers/detail'

// services
import GoodsTypesResource from './resource'
import ClassifyResource from '../classify/resource'
import GoodsResource from '../goods/resource'

export default 
	angular
		.module('app.goodsTypes', [])
    	.controller('GoodsTypesAddCtrl', GoodsTypesAddCtrl)
    	.controller('GoodsTypesEditCtrl', GoodsTypesEditCtrl)
    	.controller('GoodsTypesListCtrl', GoodsTypesListCtrl)
    	.controller('GoodsTypesDetailCtrl', GoodsTypesDetailCtrl)


    register('app.goodsTypes')
    	.factory('GoodsTypesResource', GoodsTypesResource)
    	.factory('ClassifyResource', ClassifyResource)
    	.factory('GoodsResource', GoodsResource)