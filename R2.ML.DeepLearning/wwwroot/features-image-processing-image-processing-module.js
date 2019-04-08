(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-image-processing-image-processing-module"],{

/***/ "./src/app/features/image-processing/image-processing-routing.module.ts":
/*!******************************************************************************!*\
  !*** ./src/app/features/image-processing/image-processing-routing.module.ts ***!
  \******************************************************************************/
/*! exports provided: ImageProcessingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageProcessingRoutingModule", function() { return ImageProcessingRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _train_train_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./train/train.component */ "./src/app/features/image-processing/train/train.component.ts");




var routes = [
    {
        path: '',
        data: {
            title: 'Image Processing'
        },
        children: [
            {
                path: '',
                redirectTo: 'train'
            },
            {
                path: 'train',
                component: _train_train_component__WEBPACK_IMPORTED_MODULE_3__["TrainComponent"],
                data: {
                    title: 'Train'
                }
            },
        ]
    }
];
var ImageProcessingRoutingModule = /** @class */ (function () {
    function ImageProcessingRoutingModule() {
    }
    ImageProcessingRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], ImageProcessingRoutingModule);
    return ImageProcessingRoutingModule;
}());



/***/ }),

/***/ "./src/app/features/image-processing/image-processing.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/features/image-processing/image-processing.module.ts ***!
  \**********************************************************************/
/*! exports provided: ImageProcessingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageProcessingModule", function() { return ImageProcessingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _image_processing_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image-processing-routing.module */ "./src/app/features/image-processing/image-processing-routing.module.ts");
/* harmony import */ var _train_train_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./train/train.component */ "./src/app/features/image-processing/train/train.component.ts");
/* harmony import */ var _image_processing_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./image-processing.service */ "./src/app/features/image-processing/image-processing.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");







var ImageProcessingModule = /** @class */ (function () {
    function ImageProcessingModule() {
    }
    ImageProcessingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_train_train_component__WEBPACK_IMPORTED_MODULE_4__["TrainComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _image_processing_routing_module__WEBPACK_IMPORTED_MODULE_3__["ImageProcessingRoutingModule"]
            ],
            providers: [_image_processing_service__WEBPACK_IMPORTED_MODULE_5__["ImageProcessingService"]]
        })
    ], ImageProcessingModule);
    return ImageProcessingModule;
}());



/***/ }),

/***/ "./src/app/features/image-processing/image-processing.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/features/image-processing/image-processing.service.ts ***!
  \***********************************************************************/
/*! exports provided: ImageProcessingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageProcessingService", function() { return ImageProcessingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var ImageProcessingService = /** @class */ (function () {
    function ImageProcessingService(http) {
        this.http = http;
    }
    ImageProcessingService.prototype.train = function () {
        var url = 'api/ImageProceesing/Train';
        return this.http.get(url);
    };
    ImageProcessingService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ImageProcessingService);
    return ImageProcessingService;
}());



/***/ }),

/***/ "./src/app/features/image-processing/train/train.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/features/image-processing/train/train.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn btn-primary\" (click)=\"startTraining()\">Start Training</div>\n\n\n<div class=\"row\" *ngIf=\"trainResult$ | async as trainResult\">\n  <div class=\"col-lg-12\">\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <i class=\"fa fa-align-justify\"></i> Train Result\n      </div>\n      <div class=\"card-body\" >\n        <table class=\"table table-bordered table-striped table-sm\">\n          <thead>\n            <tr>\n              <th>Image</th>\n              <th>Name</th>\n              <th>Score</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let item of trainResult\">\n              <td>\n                <img src=\"api/image/{{item.imageId}}\" width=\"90\">\n              </td>\n              <td>{{item.user}}</td>\n              <td>\n                <span class=\"badge\"\n                  [class.badge-success]=\"item.score >= .85\"\n                  [class.badge-warning]=\"item.score > .70 && item.score < .85\"\n                  [class.badge-danger]=\"item.score <=.70\">{{item.score | percent : '0.0-2'}}</span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <!-- <nav>\n          <ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n            <li class=\"page-item active\">\n              <a class=\"page-link\" href=\"#\">1</a>\n            </li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n          </ul>\n        </nav> -->\n      </div>\n    </div>\n  </div>\n  <!--/.col-->\n</div>\n<!--/.row-->\n"

/***/ }),

/***/ "./src/app/features/image-processing/train/train.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/features/image-processing/train/train.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL2ltYWdlLXByb2Nlc3NpbmcvdHJhaW4vdHJhaW4uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/features/image-processing/train/train.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/features/image-processing/train/train.component.ts ***!
  \********************************************************************/
/*! exports provided: TrainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrainComponent", function() { return TrainComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _image_processing_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../image-processing.service */ "./src/app/features/image-processing/image-processing.service.ts");



var TrainComponent = /** @class */ (function () {
    function TrainComponent(ipService) {
        this.ipService = ipService;
    }
    TrainComponent.prototype.ngOnInit = function () {
    };
    TrainComponent.prototype.startTraining = function () {
        this.trainResult$ = this.ipService.train();
    };
    TrainComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-train',
            template: __webpack_require__(/*! ./train.component.html */ "./src/app/features/image-processing/train/train.component.html"),
            styles: [__webpack_require__(/*! ./train.component.scss */ "./src/app/features/image-processing/train/train.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_image_processing_service__WEBPACK_IMPORTED_MODULE_2__["ImageProcessingService"]])
    ], TrainComponent);
    return TrainComponent;
}());



/***/ })

}]);
//# sourceMappingURL=features-image-processing-image-processing-module.js.map