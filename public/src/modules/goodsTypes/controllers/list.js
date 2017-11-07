import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase {
    constructor($scope, $state, $timeout, $ionicLoading, GoodsTypesResource, $weuiGallery, $ionicModal, AppService, GoodsResource) {
        super('goodsTypes', $scope, $state, $timeout, $ionicLoading, GoodsTypesResource)
        Object.assign(this, {
            $weuiGallery,
            $ionicModal,
            AppService,
            GoodsResource,
        })
        this.init()
    }

    init() {
        const params = { goods_id: this.$state.params.goods_id };
        this.$scope.goods_id = this.$state.params.goods_id;
        this.goodsTypes.list(params)
        this.getGoods()
    }

    getGoods() {
        this.goods = {}
        this.GoodsResource.get({
                id: this.$state.params.goods_id,
                page: 1,
                limit: 100,
            }).$promise
            .then(data => {
                if (data.meta.code == 0) {
                    this.goods.items = data.data
                }
            })
    }

}

Ctrl.$inject = [
    '$scope',
    '$state',
    '$timeout',
    '$ionicLoading',
    'GoodsTypesResource',
    '$weuiGallery',
    '$ionicModal',
    'AppService',
    'GoodsResource',
]

export default Ctrl