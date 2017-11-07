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
        this.$scope.title = '修改类别'
        this.initForm()
        this.renderHtml()
        //this.initModal()
    }

    renderHtml() {
        this.goodsTypes.detailAsync({ id: this.$state.params.id })
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    const detail = data.data
                    this.$scope.goods_id = detail.goods_id
                    this.form = {
                        id: detail._id,
                        name: detail.name,
                        remark: detail.remark,
                        images: detail.images,
                        goods_id: detail.goods_id,
                        quantity: detail.quantity,
                        saleNum: detail.saleNum,
                        remindNum: (detail.quantity - detail.saleNum) || 0
                    }
                    //this.categorys = detail.types
                }
            })
    }

    initForm() {
        this.max = 1
        this.categorys = []
        this.form = {
            name: null,
            remark: null,
            images: [],
            goods_id: null,
            quantity: null,
            saleNum: null,
        }
    }
    
    
    changeRemind(){
        console.log("1111")
        this.form.remindNum = this.form.quantity - this.form.saleNum
    }


    submitForm(isValid) {
        if (!isValid) return
        const params = angular.copy(this.form)
        //params.saleNum = params.quantity - params.remindNum
        params.goods_id = this.$scope.goods_id;
        console.log(params)
        if (!params.quantity > 0) return
        this.goodsTypes.update(params, {
            callback: () => this.$state.go('web.goodsTypes.list', {goods_id:params.goods_id })
        })
    }

    showGallery(id, index) {
        const vm = this
        vm.$weuiGallery.show({
            index: index,
            urls: vm.form.images.map(n => n.path),
            cancel: function() {
                console.log('cancel')
            },
            delete: function(index, item) {
                vm.delFile(id, index)
                return !0
            },
            animation: 'fade-in-right'
        })
    }

    getFile() {
        this.AppService.uploadFile({
            file: this.file
        }).then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.form.images.push(data.data)
            }
        })
    }

    delFile(id, index) {
        this.AppService.delFile(id)
            .then(data => {
                console.log(data)
                if (data.meta.code == 0) {
                    this.form.images.splice(index, 1)
                }
            })
    }

    getClassify() {
        /*this.classify = {}
        this.ClassifyResource.get({
            page: 1, 
            limit: 100, 
        }).$promise
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.classify.items = data.data.items
            }
        })*/
    }

    initModal() {
        /*this.modal = {}
        this.$ionicModal.fromTemplateUrl('modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.modal.instance = modal
        })

        this.modal.open = () => {
            this.modal.instance.show()
            this.getClassify()
        }

        this.modal.close = () => {
            this.modal.instance.hide()

            angular.forEach(this.classify.items, (value, key) => {
                if (value.selected) {
                    this.onPush(value)
                } 
            })

            console.log(this.categorys)
        }*/
    }

    onPush(value) {
        let categorys = this.categorys
        let len = categorys.length
        let index = -1

        if (len == 0) {
            categorys.push(value)
            return
        }

        for (let i = 0; i < len; i++) {
            if (categorys[i]._id === value._id) {
                index = i
                break
            }
        }

        if (index == -1) {
            categorys.push(value)
        }
    }

    onPull(value) {
        let categorys = this.categorys
        let len = categorys.length
        let index = -1

        if (len == 0) {
            return
        }

        for (let i = 0; i < len; i++) {
            if (categorys[i]._id === value._id) {
                index = i
                break
            }
        }

        if (index !== -1) {
            categorys.splice(index, 1)
        }
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