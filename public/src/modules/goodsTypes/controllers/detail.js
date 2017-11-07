import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase {
    constructor($scope, $state, $timeout, $ionicLoading, GoodsTypesResource, $ionicSlideBoxDelegate,GoodsResource) {
        super('goodsTypes', $scope, $state, $timeout, $ionicLoading, GoodsTypesResource)
        Object.assign(this, {
            $ionicSlideBoxDelegate,
            GoodsResource,
        })
        this.init()
    }

    init() {
        this.goodsTypes.detail({
            id: this.$state.params.id
        }).then(data => {
            this.$ionicSlideBoxDelegate.update()
            console.log(this.goodsTypes.item)
            this.$scope.goods_id = this.goodsTypes.item.goods_id;
            if (this.$scope.goods_id) {
                this.getGoods()
            }
        })

    }

    /**
     * 查询当前商品类别所属商品信息
     * @return {goods.item} 商品信息
     */
    getGoods() {
        this.goods = {}
        this.GoodsResource.get({
                id: this.$scope.goods_id,
                page: 1,
                limit: 100,
            }).$promise
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    this.goods.item = data.data
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
    '$ionicSlideBoxDelegate',
    'GoodsResource',
]

export default Ctrl