import angular from 'angular';
import vueContainer from '../vue-container';
import vueComponent from "./index";
import makeAngularModule from '../utils';

const moduleName = 'colorScaleGenerator';
export default moduleName;

const propList = Array.isArray(vueComponent.props) ? vueComponent.props : Object.keys(vueComponent.props);
const template = `
    <color-scale-generator
        ng-non-bindable
        :bar-height="barHeight"
        :on-scale-changed="onScaleChanged" :min-val="minVal" :max-val="maxVal">
    </color-scale-generator>
`;
makeAngularModule(moduleName, template, propList);
/*
const bindings = {};
propList.forEach(propKey => bindings[propKey + 'Get'] = '<');

angular
    .module(moduleName, [vueContainer])
    .component(moduleName, {
        template: `
            <vue-container vue-data='ngVue.vueData' vue-methods='ngVue.vueMethods'>
                <color-scale-generator
                    ng-non-bindable
                    :on-scale-changed="onScaleChanged" :min-val="minVal" :max-val="maxVal">
                </color-scale-generator>
            </vue-container>
        `,
        controller: Controller,
        controllerAs: 'ngVue',
        bindings
    })

function Controller($scope) {
    this.vueData = {};
    this.vueMethods = {};
    this.$onInit = function() {
        propList.forEach(propKey => {
            this.vueData[propKey] = this[propKey + 'Get']();
            $scope.$watch(this[propKey + 'Get'], () => {
                console.log(`${propKey} has watched changes`)
                this.vueData[propKey] = this[propKey + 'Get']();
            })
        })
    }
}
*/
