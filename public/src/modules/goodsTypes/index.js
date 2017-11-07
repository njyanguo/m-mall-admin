import { plugin, loadPlugin } from 'etc/loadplugin'
import authService from '../app/resolves/authService'

function Router($stateProvider, $ocLazyLoadProvider) {
    
    //set router
    $stateProvider

        .state('web.goodsTypes', {
            abstract: true,
            url: '/goodsTypes',
            views: {
                'menu-content': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!../web/tpl/tabs.html'))
                            }, 'tabs.html')
                        })
                    }]
                }
            },
            resolve: {
                authService: authService,
                loadModule: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            $ocLazyLoad.load({name: require('./main').default.name})
                            resolve()
                        }, 'goodsTypes')
                    })
                }]
            }
        })

        .state('web.goodsTypes.list', {
            url: '/{goods_id}/list',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/list.html'))
                            }, 'web.list.html')
                        })
                    }],
                    controller: 'GoodsTypesListCtrl as vm'
                }
            }
        })

        .state('web.goodsTypes.add', {
            tabsHidden: true,
            url: '/{goods_id}/add',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'web.add.html')
                        })
                    }],
                    controller: 'GoodsTypesAddCtrl as vm'
                }
            }
        })

        .state('web.goodsTypes.detail', {
            tabsHidden: true,
            url: '/{id}',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/detail.html'))
                            }, 'web.detail.html')
                        })
                    }],
                    controller: 'GoodsTypesDetailCtrl as vm'
                }
            }
        })

        .state('web.goodsTypes.edit', {
            tabsHidden: true,
            url: '/{id}/edit',
            views: {
                'tab-admin': {
                    templateProvider: ['$q', ($q) => {
                        return $q((resolve) => {
                            require.ensure([], () => {
                                resolve(require('html!./tpl/add.html'))
                            }, 'web.add.html')
                        })
                    }],
                    controller: 'GoodsTypesEditCtrl as vm'
                }
            }
        })
}

Router.$inject = [
    '$stateProvider', 
    '$ocLazyLoadProvider'
]

export default angular
    .module('app.goodsTypes.router', [])
    .config(Router)