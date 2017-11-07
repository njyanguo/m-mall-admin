import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase {
    constructor($scope, $state, $timeout, $ionicLoading, GoodsTypesResource, $weuiGallery, $ionicModal, AppService) {
        super('goodsTypes', $scope, $state, $timeout, $ionicLoading, GoodsTypesResource)
        Object.assign(this, {
            $weuiGallery,
            $ionicModal,
            AppService,
        })
        this.init()
    }

    init() {
        this.$scope.goods_id = this.$state.params.goods_id;
        this.$scope.title = '添加类别';
        this.initForm()
        //this.initModal()
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

    submitForm(isValid) {
        if (!isValid) return
        const params = angular.copy(this.form)
        //params.types = this.categorys.map(n => n._id)
        params.goods_id = this.$scope.goods_id;
        console.log(params)
        if (!params.images.length) return

        this.goodsTypes.save(params, {
            callback: () => this.$state.go('web.goodsTypes.list', { goods_id: params.goods_id })
        })
    }

    changeRemind() {}

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

    initModal() {
        this.modal = {}
        this.$ionicModal.fromTemplateUrl('modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        }).then((modal) => {
            this.modal.instance = modal
        })
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
]

export default Ctrl