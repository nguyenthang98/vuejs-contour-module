import angular from 'angular';
import vueContainer from '../vue-container';
import vueComponent from "./index";
import makeAngularModule from '../utils';

const moduleName = 'contourView';
export default moduleName;

const propList = Array.isArray(vueComponent.props) ? vueComponent.props : Object.keys(vueComponent.props);
const template = `
    <contour-view
        ng-non-bindable
        :values="values" :n-rows="nRows" :n-cols="nCols"
        :min-x="minX" :max-x="maxX"
        :min-y="minY" :max-y="maxY"
        :color-scale="colorScale" :step="step" :major-every="majorEvery"
        :show-grid="showGrid" :grid-major="gridMajor" :grid-minor="gridMinor"
        :grid-nice="gridNice" :y-direction="yDirection"
        :show-scale='showScale' :wells='wells' :show-well='showWell'
        :show-trajectory='showTrajectory' :trajectories='trajectories'
        :show-label="showLabel" :label-font-size="labelFontSize"
        :show-color-scale-legend="showColorScaleLegend" :color-legend-ticks="colorLegendTicks"
        :negative-data="negativeData" :pixel-per-node="pixelPerNode"
        :on-component-mounted="onComponentMounted"
        :on-scale-changed="onScaleChanged">
    </contour-view>
`;
makeAngularModule(moduleName, template, propList);
