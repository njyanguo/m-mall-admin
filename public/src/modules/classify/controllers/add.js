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
            is_show: null,
        }
    }

    submitForm(isValid) {
        if (!isValid) return
        console.log(this.form);
        console.log("+++++++++++++++++");
        console.log(this.classify);
        console.log("+++++++++++++++++");
        this.classify.save(this.form, {
            callback: () => this.$state.go(s'web.clasify.list')
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