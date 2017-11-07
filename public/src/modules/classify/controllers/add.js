import RestBase from 'helpers/RestBase'

class Ctrl extends RestBase{
    constructor($scope, $state, $timeout, $ionicLoading, ClassifyResource){
        super('classify', $scope, $state, $timeout, $ionicLoading, ClassifyResource)
        this.init()
    }

    init() {
        this.initForm()
    }

    initForm() {
        this.form = {
            name  : null,
            remark: null,
            sort   : 99,
            is_show: !1,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        this.classify.save(this.form, {
            callback: () => this.$state.go('web.classify.list')
        })
    }
}

Ctrl.$inject = [
    '$scope', 
    '$state', 
    '$timeout',
    '$ionicLoading',
    'ClassifyResource',
] 

export default Ctrl