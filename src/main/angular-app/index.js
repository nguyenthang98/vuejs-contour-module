import angular from 'angular';
import "lodash";
import * as d3 from 'd3';
import angularComponents from '../../components/index-angular';

angular
    .module('myApp', angularComponents)
    .controller('rootController', ['$scope', '$timeout', function($scope, $timeout) {
        const rootCtrl = this;
        this.headers = {};
        this.values = [];
        this.minValue = 0;
        this.maxValue = 1;
        this.colorScale = d3.scaleLinear().range(['red', 'blue']);
        this.step = 100;
        this.majorEvery = 5;
        this.fontSize = 2;
        this.showLabel = false;
        this.showScale = true;
        this.showGrid = true;
        this.gridMajor = 5;
        this.gridMinor = 4;
        this.gridNice = true;
        this.scale = 1;
        this.yDirection = 'up';
        this.showWell = true;
        this.showTrajectory = true;
        this.colorBarHeight= 20;
        this.negativeData = false;
        this.showColorScaleLegend = true;
        this.pixelPerNode = 1;
        this.trajectories = [
            {
                points: [
                    {xCoord: 444750, yCoord: 1144440},
                    {xCoord: 444560, yCoord: 1144230},
                    {xCoord: 444656, yCoord: 1144135},
                    {xCoord: 444849, yCoord: 1144525},
                    {xCoord: 444465, yCoord: 1144650},
                    {xCoord: 444375, yCoord: 1144754},
                ],
                name: 'test well trajectory',
                color: 'green',
                lineWidth: 2,
            },
            {
                points: [
                    {xCoord: 434040, yCoord: 1135000},
                    {xCoord: 434120, yCoord: 1135120},
                    {xCoord: 434230, yCoord: 1135200},
                    {xCoord: 434340, yCoord: 1135300},
                    {xCoord: 434450, yCoord: 1135400},
                    {xCoord: 434410, yCoord: 1135500},
                    {xCoord: 434320, yCoord: 1135600},
                    {xCoord: 434130, yCoord: 1135700},
                ],
                name: 'TEST WELL trajectory',
                color: 'white',
                lineWidth: 3,
            }
        ];
        this.wells = [
            {
                name: 'test well',
                xCoord: 444750,
                yCoord: 1144440
            },
            {
                name: 'TEST WELL',
                xCoord: 434040,
                yCoord: 1135000
            }
        ];

        this.addRandomWell = function() {
            rootCtrl.wells.push({
                name: `TEST WELL ${rootCtrl.wells.length}`,
                xCoord: Math.random() * 20550 + 434950,
                yCoord: Math.random() * 24250 + 1135350
            });
        }
        this.removeRandomWell = function() {
            rootCtrl.wells.splice(Math.floor(Math.random() * rootCtrl.wells.length), 1);
        }
        this.changeRandomWell = function() {
            rootCtrl.wells[Math.floor(Math.random() * rootCtrl.wells.length)].name = `test well ${Math.floor(Math.random() * rootCtrl.wells.length)}`;
        }
        this.changeRandomScale = function() {
            setContourViewScale(Math.random() * 50 + 0.1);
        }
        this.makeCenter = function() {
            const minX = getter['headers.minX']();
            const maxX = getter['headers.maxX']();
            const minY = getter['headers.minY']();
            const maxY = getter['headers.maxY']();
            setContourViewCenter(
                (maxX - minX) / 2 + minX,
                (maxY - minY) / 2 + minY
            )
        }

        let setContourViewScale = () => {};
        let setContourViewCenter = () => {};
        this.onContourViewMounted = function() {
            const [contourViewComponent] = arguments;
            setContourViewScale = (_scale) => {
                contourViewComponent.setScale.call(contourViewComponent, _scale);
            }
            setContourViewCenter = (xCoord, yCoord) => {
                contourViewComponent.setCenter.call(contourViewComponent, xCoord, yCoord);
            }
        }
        this.onDataChanged = function(changedData) {
            // console.log('on data changed');
            // console.log(changedData);
            rootCtrl.headers = _.clone(changedData.headers);
            rootCtrl.values = _.flatten(changedData.data);
            const domain = d3.extent(rootCtrl.values);
            // rootCtrl.colorScale.domain(domain);
            rootCtrl.minValue = domain[0];
            rootCtrl.maxValue = domain[1];
            $scope.$digest();
        },
        this.onColorScaleChanged = function(colorScale) {
            // console.log("color scale changed");
            rootCtrl.colorScale = colorScale;
            $scope.$digest();
        }
        this.onScaleChanged = (_scl) => {
            rootCtrl.scale = _scl
            $timeout(() => { $scope.$digest(); })
        };

        const getter = {};
        this.getter = (key) => {
            if(!getter[key])
                getter[key] = () => _.get(rootCtrl, key);
            return getter[key];
        }
    }]);

export default angularComponents;


