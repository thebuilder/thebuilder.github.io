var ng;
(function (ng) {
  (function (analytics) {
    var AngularyticsProvider = function () {
        function AngularyticsProvider() {
          var _this = this;
          this.eventHandlersNames = ['Google'];
          this.pageChangeEvent = '$locationChangeSuccess';
          this.$get = [
            '$injector',
            '$rootScope',
            '$location',
            function ($injector, $rootScope, $location) {
              var eventHandlers = [];
              angular.forEach(_this.eventHandlersNames, function (handler) {
                eventHandlers.push($injector.get('Angularytics' + handler + 'Handler'));
              });
              var forEachHandlerDo = function (action) {
                angular.forEach(eventHandlers, function (handler) {
                  action(handler);
                });
              };
              $rootScope.$on(_this.pageChangeEvent, function () {
                var url = $location.path();
                if (url) {
                  forEachHandlerDo(function (handler) {
                    handler.trackPageView(url);
                  });
                }
              });
              var service = {};
              service.init = function () {
              };
              service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
                forEachHandlerDo(function (handler) {
                  if (category && action) {
                    handler.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
                  }
                });
              };
              return service;
            }
          ];
        }
        AngularyticsProvider.prototype.setEventHandlers = function (handlers) {
          var _this = this;
          this.eventHandlersNames = [];
          angular.forEach(handlers, function (handler) {
            _this.eventHandlersNames.push(_this.capitalizeHandler(handler));
          });
        };
        AngularyticsProvider.prototype.setPageChangeEvent = function (newPageChangeEvent) {
          this.pageChangeEvent = newPageChangeEvent;
        };
        AngularyticsProvider.prototype.capitalizeHandler = function (handler) {
          return handler.charAt(0).toUpperCase() + handler.substring(1);
        };
        return AngularyticsProvider;
      }();
    analytics.AngularyticsProvider = AngularyticsProvider;
  }(ng.analytics || (ng.analytics = {})));
  var analytics = ng.analytics;
}(ng || (ng = {})));
var ng;
(function (ng) {
  (function (analytics) {
    (function (handler) {
      var AngularyticsConsoleHandler = function () {
          function AngularyticsConsoleHandler($log) {
            this.$log = $log;
          }
          AngularyticsConsoleHandler.prototype.init = function () {
          };
          AngularyticsConsoleHandler.prototype.trackPageView = function (url) {
            this.$log.log('URL visited', url);
          };
          AngularyticsConsoleHandler.prototype.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            if (typeof opt_label === 'undefined') {
              opt_label = null;
            }
            if (typeof opt_value === 'undefined') {
              opt_value = 0;
            }
            if (typeof opt_noninteraction === 'undefined') {
              opt_noninteraction = false;
            }
            this.$log.log('Event tracked', category, action, opt_label, opt_value, opt_noninteraction);
          };
          return AngularyticsConsoleHandler;
        }();
      handler.AngularyticsConsoleHandler = AngularyticsConsoleHandler;
      var AngularyticsGoogleHandler = function () {
          function AngularyticsGoogleHandler() {
          }
          AngularyticsGoogleHandler.prototype.init = function () {
          };
          AngularyticsGoogleHandler.prototype.trackPageView = function (url) {
            _gaq.push([
              '_set',
              'page',
              url
            ]);
            _gaq.push([
              '_trackPageview',
              url
            ]);
          };
          AngularyticsGoogleHandler.prototype.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            if (typeof opt_label === 'undefined') {
              opt_label = null;
            }
            if (typeof opt_value === 'undefined') {
              opt_value = 0;
            }
            if (typeof opt_noninteraction === 'undefined') {
              opt_noninteraction = false;
            }
            _gaq.push([
              '_trackEvent',
              category,
              action,
              opt_label,
              opt_value,
              opt_noninteraction
            ]);
          };
          return AngularyticsGoogleHandler;
        }();
      handler.AngularyticsGoogleHandler = AngularyticsGoogleHandler;
      var AngularyticsGoogleUniversalHandler = function () {
          function AngularyticsGoogleUniversalHandler() {
          }
          AngularyticsGoogleUniversalHandler.prototype.init = function () {
          };
          AngularyticsGoogleUniversalHandler.prototype.trackPageView = function (url) {
            ga('set', 'page', url);
            ga('send', 'pageview', url);
          };
          AngularyticsGoogleUniversalHandler.prototype.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            if (typeof opt_label === 'undefined') {
              opt_label = null;
            }
            if (typeof opt_value === 'undefined') {
              opt_value = 0;
            }
            if (typeof opt_noninteraction === 'undefined') {
              opt_noninteraction = false;
            }
            ga('send', 'event', category, action, opt_label, opt_value, { 'nonInteraction': opt_noninteraction });
          };
          return AngularyticsGoogleUniversalHandler;
        }();
      handler.AngularyticsGoogleUniversalHandler = AngularyticsGoogleUniversalHandler;
      var AngularyticsPhoneGapHandler = function () {
          function AngularyticsPhoneGapHandler() {
          }
          AngularyticsPhoneGapHandler.prototype.init = function () {
          };
          AngularyticsPhoneGapHandler.prototype.trackPageView = function (url) {
            if (!this.gaPlugin)
              this.gaPlugin = window['plugins'].gaPlugin;
            if (this.gaPlugin) {
              this.gaPlugin.trackPage(this.nativePluginResultHandler, this.nativePluginErrorHandler, url);
            }
          };
          AngularyticsPhoneGapHandler.prototype.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            if (typeof opt_label === 'undefined') {
              opt_label = '';
            }
            if (typeof opt_value === 'undefined') {
              opt_value = 0;
            }
            if (typeof opt_noninteraction === 'undefined') {
              opt_noninteraction = false;
            }
            if (!this.gaPlugin)
              this.gaPlugin = window['plugins'].gaPlugin;
            if (this.gaPlugin) {
              this.gaPlugin.trackEvent(this.nativePluginResultHandler, this.nativePluginErrorHandler, category, action, opt_label, opt_value);
            }
          };
          AngularyticsPhoneGapHandler.prototype.nativePluginResultHandler = function (result) {
            console.log('nativePluginResultHandler: ' + result);
          };
          AngularyticsPhoneGapHandler.prototype.nativePluginErrorHandler = function (error) {
            console.log('nativePluginErrorHandler: ' + error);
          };
          return AngularyticsPhoneGapHandler;
        }();
      handler.AngularyticsPhoneGapHandler = AngularyticsPhoneGapHandler;
    }(analytics.handler || (analytics.handler = {})));
    var handler = analytics.handler;
  }(ng.analytics || (ng.analytics = {})));
  var analytics = ng.analytics;
}(ng || (ng = {})));
var ng;
(function (ng) {
  (function (analytics) {
    (function (filters) {
      function TrackEvent(Angularytics) {
        return function (entry, category, action, opt_label, opt_value, opt_noninteraction) {
          if (typeof opt_label === 'undefined') {
            opt_label = null;
          }
          if (typeof opt_value === 'undefined') {
            opt_value = 0;
          }
          if (typeof opt_noninteraction === 'undefined') {
            opt_noninteraction = false;
          }
          Angularytics.trackEvent(category, action, opt_label, opt_value, opt_noninteraction);
          return entry;
        };
      }
      filters.TrackEvent = TrackEvent;
    }(analytics.filters || (analytics.filters = {})));
    var filters = analytics.filters;
  }(ng.analytics || (ng.analytics = {})));
  var analytics = ng.analytics;
}(ng || (ng = {})));
angular.module('angularytics', []).provider('Angularytics', ng.analytics.AngularyticsProvider).service('AngularyticsConsoleHandler', ng.analytics.handler.AngularyticsConsoleHandler).service('AngularyticsGoogleHandler', ng.analytics.handler.AngularyticsGoogleHandler).service('AngularyticsGoogleUniversalHandler', ng.analytics.handler.AngularyticsGoogleUniversalHandler).service('AngularyticsPhoneGapHandler', ng.analytics.handler.AngularyticsPhoneGapHandler).filter('trackEvent', ng.analytics.filters.TrackEvent);
var digi;
(function (digi) {
  (function (model) {
    var MenuVO = function () {
        function MenuVO(name, path, iconUrl, selectedIconUrl, width, height) {
          this.name = name;
          this.path = path;
          this.iconUrl = iconUrl;
          this.selectedIconUrl = selectedIconUrl;
          this.width = width;
          this.height = height;
        }
        return MenuVO;
      }();
    model.MenuVO = MenuVO;
  }(digi.model || (digi.model = {})));
  var model = digi.model;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (services) {
    var DigiService = function () {
        function DigiService($http, HttpFallback, $rootScope) {
          this.$http = $http;
          this.HttpFallback = HttpFallback;
          this.$rootScope = $rootScope;
        }
        DigiService.prototype.preloadData = function () {
          this.getExhibitions();
          this.getSchedule();
          this.getStages();
        };
        DigiService.prototype.getExhibitions = function () {
          var _this = this;
          var live = 'http://www.digitaliseringsmessen.dk/api/udstillerliste/';
          var local = 'data/udstillerliste.json';
          return this.HttpFallback.get(live, local, { cache: true }, true).then(function (response) {
            return _this.parseExhibitions(response);
          });
        };
        DigiService.prototype.parseExhibitions = function (response) {
          if (response.config.url.indexOf('http') != 0) {
            for (var i = 0; i < response.data.length; i++) {
              var obj = response.data[i];
              if (obj.logo != null)
                obj.logo = obj.logo.replace('http://www.digitaliseringsmessen.dk/userres/', 'img/logos/');
            }
          }
          this.$rootScope.cachedExhibits = response.data;
          this.checkDataReady();
          return response.data;
        };
        DigiService.prototype.getExhibitById = function (id) {
          if (this.$rootScope.cachedExhibits) {
            return this.getObjectById(this.$rootScope.cachedExhibits, id, 'id');
          }
          return null;
        };
        DigiService.prototype.getSchedule = function () {
          var _this = this;
          var live = 'http://www.digitaliseringsmessen.dk/api/sceneliste/';
          var local = 'data/schedule.json';
          return this.HttpFallback.get(live, local, { cache: true }, true).then(function (response) {
            return _this.parseSchedule(response);
          });
        };
        DigiService.prototype.parseSchedule = function (response) {
          for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            obj.slut = obj['Slut'];
            obj.start = obj['Start'];
          }
          this.$rootScope.cachedSchedule = response.data;
          this.checkDataReady();
          return response.data;
        };
        DigiService.prototype.getScheduleById = function (id) {
          if (this.$rootScope.cachedSchedule) {
            return this.getObjectById(this.$rootScope.cachedSchedule, id, 'id');
          }
          return null;
        };
        DigiService.prototype.getStages = function () {
          var _this = this;
          return this.$http.get('data/stages.json', { cache: true }).then(function (response) {
            _this.$rootScope.cachedStages = response.data;
            _this.checkDataReady();
            return response.data;
          });
        };
        DigiService.prototype.getStageById = function (id) {
          if (this.$rootScope.cachedStages) {
            return this.getObjectById(this.$rootScope.cachedStages, id, 'id');
          }
          return null;
        };
        DigiService.prototype.getObjectById = function (list, value, prop) {
          if (typeof prop === 'undefined') {
            prop = 'id';
          }
          var l = list.length;
          for (var i = 0; i < l; i++) {
            var o = list[i];
            if (o[prop] == value)
              return o;
          }
          return null;
        };
        DigiService.prototype.checkDataReady = function () {
          if (this.$rootScope.cachedExhibits && this.$rootScope.cachedSchedule && this.$rootScope.cachedStages) {
            this.$rootScope.dataReady = true;
            console.log('Data ready');
          }
        };
        return DigiService;
      }();
    services.DigiService = DigiService;
  }(digi.services || (digi.services = {})));
  var services = digi.services;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (services) {
    var FavouritesService = function () {
        function FavouritesService(webStorage) {
          this.webStorage = webStorage;
        }
        FavouritesService.prototype.toggleExhibitionStarred = function (key) {
          if (!this.getExhibitionStarred(key))
            this.webStorage.add('exhibition_' + key, true);
          else
            this.webStorage.remove('exhibition_' + key);
        };
        FavouritesService.prototype.getExhibitionStarred = function (key) {
          return this.webStorage.get('exhibition_' + key) == true;
        };
        FavouritesService.prototype.toggleScheduleStarred = function (key) {
          if (!this.getScheduleStarred(key))
            this.webStorage.add('schedule' + key, true);
          else
            this.webStorage.remove('schedule' + key);
        };
        FavouritesService.prototype.getScheduleStarred = function (key) {
          return this.webStorage.get('schedule' + key) == true;
        };
        return FavouritesService;
      }();
    services.FavouritesService = FavouritesService;
  }(digi.services || (digi.services = {})));
  var services = digi.services;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (services) {
    var HttpFallback = function () {
        function HttpFallback($http, $q, webStorage) {
          this.$http = $http;
          this.$q = $q;
          this.webStorage = webStorage;
        }
        HttpFallback.prototype.get = function (url, localUrl, config, useLocalStorage) {
          if (typeof useLocalStorage === 'undefined') {
            useLocalStorage = false;
          }
          var _this = this;
          if (!localUrl) {
            return this.$http.get(url, config);
          }
          var deferred = this.$q.defer();
          this.$http.get(url, config).then(function (response) {
            if (response.status === 200 && useLocalStorage) {
              _this.webStorage.add(url, JSON.stringify(response));
            }
            deferred.resolve(response);
          }, function (response) {
            if (useLocalStorage) {
              var jsonStoredResponse = _this.webStorage.get(url);
              if (jsonStoredResponse) {
                var storedResponse = JSON.parse(jsonStoredResponse);
                deferred.resolve(storedResponse);
              }
            }
            if (localUrl) {
              _this.$http.get(localUrl, config).then(function (response) {
                deferred.resolve(response);
              }, function (response) {
                deferred.reject(response);
              });
            } else {
              deferred.reject(response);
            }
          });
          var promise = deferred.promise;
          promise.success = function (fn) {
            promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function (fn) {
            promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
        };
        return HttpFallback;
      }();
    services.HttpFallback = HttpFallback;
  }(digi.services || (digi.services = {})));
  var services = digi.services;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (services) {
    var MenuService = function () {
        function MenuService() {
        }
        MenuService.prototype.getMenuItems = function () {
          return [
            new digi.model.MenuVO('Program', '/schedule', 'img/menu_program.png', 'img/menu_program_selected.png', '24px', '19px'),
            new digi.model.MenuVO('Udstillere', '/exhibitions', 'img/menu_exhibits.png', 'img/menu_exhibits_selected.png', '28px', '24px'),
            new digi.model.MenuVO('Kort', '/map', 'img/menu_map.png', 'img/menu_map_selected.png', '17px', '24px'),
            new digi.model.MenuVO('Mit DIGM13', '/myschedule/schedule', 'img/menu_mydm.png', 'img/menu_mydm_selected.png', '25px', '25px')
          ];
        };
        return MenuService;
      }();
    services.MenuService = MenuService;
  }(digi.services || (digi.services = {})));
  var services = digi.services;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (services) {
    var StateService = function () {
        function StateService() {
        }
        return StateService;
      }();
    services.StateService = StateService;
  }(digi.services || (digi.services = {})));
  var services = digi.services;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var FooterController = function () {
        function FooterController($scope, $location, MenuService) {
          var _this = this;
          this.$scope = $scope;
          this.$location = $location;
          this.MenuService = MenuService;
          $scope.menu = MenuService;
          $scope.items = MenuService.getMenuItems();
          $scope.itemClicked = function (item) {
            return _this.itemClicked(item);
          };
          $scope.$on('$routeChangeSuccess', function () {
            return _this.routeChanged();
          });
          this.routeChanged();
        }
        FooterController.prototype.itemClicked = function (item) {
          this.$location.path(item.path);
        };
        FooterController.prototype.routeChanged = function () {
          var items = this.$scope.items;
          var path = this.$location.path();
          for (var i = 0; i < items.length; i++) {
            var obj = items[i];
            if (path.indexOf(obj.path) == 0) {
              this.$scope.selectedItem = obj;
              return;
            }
          }
          this.$scope.selectedItem = null;
        };
        return FooterController;
      }();
    controllers.FooterController = FooterController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var HeaderController = function () {
        function HeaderController($scope, MenuService) {
          this.$scope = $scope;
          this.MenuService = MenuService;
          $scope.header = 'Header';
          $scope.menu = MenuService;
        }
        return HeaderController;
      }();
    controllers.HeaderController = HeaderController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var WrapperController = function () {
        function WrapperController($scope, MenuService) {
          this.$scope = $scope;
          $scope.menu = MenuService;
        }
        return WrapperController;
      }();
    controllers.WrapperController = WrapperController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var SubPageControl = function () {
        function SubPageControl($scope, $location) {
          var _this = this;
          this.$scope = $scope;
          this.$location = $location;
          $scope.goBack = function () {
            return _this.goBack();
          };
        }
        SubPageControl.prototype.goBack = function () {
          var split = this.$location.path().split('/');
          split.pop();
          this.$location.path(split.join('/'));
        };
        return SubPageControl;
      }();
    controllers.SubPageControl = SubPageControl;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var __extends = this.__extends || function (d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
  };
var digi;
(function (digi) {
  (function (controllers) {
    var ExhibitionDetailsControl = function (_super) {
        __extends(ExhibitionDetailsControl, _super);
        function ExhibitionDetailsControl($scope, $location, $routeParams, FavouritesService, DigiService) {
          var _this = this;
          _super.call(this, $scope, $location);
          this.$scope = $scope;
          this.$routeParams = $routeParams;
          this.FavouritesService = FavouritesService;
          this.DigiService = DigiService;
          $scope.id = $routeParams['exhibitionId'];
          if ($scope['dataReady']) {
            this.dataReady();
          } else {
            $scope.$watch('dataReady', function () {
              if ($scope['dataReady'])
                _this.dataReady();
            });
          }
          $scope.toggleStarred = function () {
            return FavouritesService.toggleExhibitionStarred($scope.id);
          };
          $scope.isStarred = function () {
            return FavouritesService.getExhibitionStarred($scope.id);
          };
          $scope.hasLogo = function (obj) {
            return obj && obj.logo != null && obj.logo.length > 0;
          };
          $scope.getUrl = function (obj) {
            var url = obj.homepage;
            if (url) {
              if (url.indexOf('http') == 0)
                return url;
              else
                return 'http://' + url;
            }
            return null;
          };
        }
        ExhibitionDetailsControl.prototype.dataReady = function () {
          this.$scope.exhibit = this.DigiService.getExhibitById(this.$scope.id);
        };
        return ExhibitionDetailsControl;
      }(digi.controllers.SubPageControl);
    controllers.ExhibitionDetailsControl = ExhibitionDetailsControl;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var ExhibitionsController = function () {
        function ExhibitionsController($scope, $location, FavouritesService, StateService) {
          this.$scope = $scope;
          $scope.StateService = StateService;
          $scope.searchFilter = function (obj) {
            var re = new RegExp($scope.searchText, 'i');
            return !$scope.searchText || re.test(obj.company) || re.test(obj.stand.toString());
          };
          $scope.showDetails = function (obj) {
            $location.path('/exhibitions/' + obj.id);
          };
          $scope.toggleStarred = function (obj) {
            return FavouritesService.toggleExhibitionStarred(obj.id);
          };
          $scope.isStarred = function (obj) {
            return FavouritesService.getExhibitionStarred(obj.id);
          };
          var delayedCalled = TweenLite.delayedCall(0.5, function () {
              if ($scope.cachedExhibits) {
                $scope.$apply(function () {
                  $scope.exhibits = $scope.cachedExhibits;
                  $scope.$emit(digi.events.AppEvents.LIST_READY);
                });
              } else {
                $scope.$watch('cachedExhibits', function () {
                  $scope.exhibits = $scope.cachedExhibits;
                  $scope.$emit(digi.events.AppEvents.LIST_READY);
                });
              }
              delayedCalled = null;
            });
          $scope.$on('$destroy', function () {
            if (delayedCalled)
              delayedCalled.kill();
          });
        }
        return ExhibitionsController;
      }();
    controllers.ExhibitionsController = ExhibitionsController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var FrontPageController = function () {
        function FrontPageController($scope, DigiService) {
          this.$scope = $scope;
          this.DigiService = DigiService;
        }
        return FrontPageController;
      }();
    controllers.FrontPageController = FrontPageController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var MapController = function () {
        function MapController($scope) {
          var _this = this;
          this.$scope = $scope;
          this.WIDTH = 768;
          this.HEIGHT = 320;
          this.FOOTER_HEADER_HEIGHT = 145;
          this.resizeMap();
          window.onresize = function () {
            return _this.resizeMap();
          };
          var mapContainer = document.getElementById('map-container');
          var myScroll;
          if (navigator.userAgent.indexOf('Windows Phone') > -1) {
            mapContainer.style.overflow = 'auto';
          } else {
            myScroll = new IScroll(mapContainer, {
              zoom: true,
              scrollX: true,
              scrollY: true,
              mouseWheel: true,
              zoomMin: 1,
              zoomMax: 3,
              wheelAction: 'zoom'
            });
          }
          $scope.$on('destroy', function () {
            window.onresize = null;
            if (myScroll)
              myScroll.destroy();
          });
        }
        MapController.prototype.resizeMap = function () {
          var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], width = w.innerWidth || e.clientWidth || g.clientWidth, height = w.innerHeight || e.clientHeight || g.clientHeight;
          var scale = Math.max(width / this.WIDTH, (height - this.FOOTER_HEADER_HEIGHT) / this.HEIGHT);
          var mapImage = document.getElementById('map-image');
          if (mapImage) {
            var padding = parseInt(mapImage.style.padding.split('px')[0]);
            mapImage.width = Math.floor(this.WIDTH * scale - padding * 2);
            mapImage.height = Math.floor(this.HEIGHT * scale - padding * 2);
          }
        };
        return MapController;
      }();
    controllers.MapController = MapController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var MyScheduleController = function () {
        function MyScheduleController($scope, $routeParams, $location, FavouritesService, DigiService, StateService) {
          var _this = this;
          this.$scope = $scope;
          this.SCHEDULE = 'schedule';
          this.EXHIBITS = 'exhibits';
          $scope.StateService = StateService;
          $scope.subpage = $routeParams['subpage'];
          var delayedCalled;
          if ($scope.subpage == this.EXHIBITS) {
            DigiService.getExhibitions().then(function (response) {
              $scope.exhibits = [];
              for (var i = 0; i < response.length; i++) {
                if ($scope.isStarred(response[i])) {
                  $scope.exhibits.push(response[i]);
                }
              }
              delayedCalled = TweenLite.delayedCall(0.1, function () {
                $scope.$broadcast(digi.events.AppEvents.LIST_READY);
                delayedCalled = null;
              });
            });
          } else if ($scope.subpage == this.SCHEDULE) {
            DigiService.getSchedule().then(function (response) {
              $scope.schedule = [];
              for (var i = 0; i < response.length; i++) {
                if ($scope.isStarred(response[i])) {
                  $scope.schedule.push(response[i]);
                }
              }
              delayedCalled = TweenLite.delayedCall(0.1, function () {
                $scope.$broadcast(digi.events.AppEvents.LIST_READY);
                delayedCalled = null;
              });
            });
            DigiService.getStages().then(function (response) {
              $scope.stages = response;
            });
          }
          $scope.$on('$destroy', function () {
            if (delayedCalled)
              delayedCalled.kill();
          });
          $scope.changeTab = function (page) {
            $location.path('myschedule/' + page);
          };
          $scope.showDetails = function (item) {
            $location.path($location.path() + '/' + item.id);
          };
          $scope.getStageName = function (scheduleItem) {
            if (!$scope.stages)
              return null;
            var l = $scope.stages.length;
            var stage;
            for (var i = 0; i < l; i++) {
              stage = $scope.stages[i];
              if (stage.id == scheduleItem.stageId)
                return stage.name;
            }
            return null;
          };
          $scope.toggleStarred = function (obj) {
            if ($scope.subpage == _this.SCHEDULE)
              return FavouritesService.toggleScheduleStarred(obj.id);
            else
              return FavouritesService.toggleExhibitionStarred(obj.id);
          };
          $scope.isStarred = function (obj) {
            if ($scope.subpage == _this.SCHEDULE)
              return FavouritesService.getScheduleStarred(obj.id);
            else
              return FavouritesService.getExhibitionStarred(obj.id);
          };
        }
        return MyScheduleController;
      }();
    controllers.MyScheduleController = MyScheduleController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (controllers) {
    var ScheduleController = function () {
        function ScheduleController($scope, $location, FavouritesService, StateService) {
          var _this = this;
          this.$scope = $scope;
          this.$location = $location;
          this.FavouritesService = FavouritesService;
          $scope.StateService = StateService;
          if ($scope.cachedStages) {
            $scope.stages = $scope.cachedStages;
            this.restoreSelectedStage();
          } else {
            $scope.$watch('cachedStages', function () {
              $scope.stages = $scope.cachedStages;
              _this.restoreSelectedStage();
            });
          }
          var delayedCalled = TweenLite.delayedCall(0.5, function () {
              if ($scope.cachedSchedule) {
                $scope.$apply(function () {
                  $scope.schedule = $scope.cachedSchedule;
                  $scope.$emit(digi.events.AppEvents.LIST_READY);
                });
              } else {
                $scope.$watch('cachedSchedule', function () {
                  $scope.schedule = $scope.cachedSchedule;
                  $scope.$emit(digi.events.AppEvents.LIST_READY);
                });
              }
              delayedCalled = null;
            });
          $scope.$on('$destroy', function () {
            if (delayedCalled)
              delayedCalled.kill();
            if ($scope.selectedStage) {
              StateService.selectedScheduleStageId = $scope.selectedStage.id;
            }
          });
          $scope.showDetails = function (scheduleItem) {
            $location.path('/schedule/' + scheduleItem.id);
          };
          $scope.stageFilter = function (scheduleItem) {
            if (!$scope.selectedStage)
              return true;
            return $scope.selectedStage.id == scheduleItem.stageId;
          };
          $scope.getStageName = function (scheduleItem) {
            if (!$scope.stages)
              return null;
            var l = $scope.stages.length;
            var stage;
            for (var i = 0; i < l; i++) {
              stage = $scope.stages[i];
              if (stage.id == scheduleItem.stageId)
                return stage.name;
            }
            return null;
          };
          $scope.toggleStarred = function (obj) {
            return FavouritesService.toggleScheduleStarred(obj.id);
          };
          $scope.isStarred = function (obj) {
            return FavouritesService.getScheduleStarred(obj.id);
          };
        }
        ScheduleController.prototype.restoreSelectedStage = function () {
          var id = this.$scope.StateService.selectedScheduleStageId;
          if (!id)
            return;
          for (var i = 0; i < this.$scope.stages.length; i++) {
            var stage = this.$scope.stages[i];
            if (stage.id == id) {
              this.$scope.selectedStage = stage;
              break;
            }
          }
        };
        return ScheduleController;
      }();
    controllers.ScheduleController = ScheduleController;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var __extends = this.__extends || function (d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
  };
var digi;
(function (digi) {
  (function (controllers) {
    var ScheduleDetailsControl = function (_super) {
        __extends(ScheduleDetailsControl, _super);
        function ScheduleDetailsControl($scope, $location, $routeParams, FavouritesService, DigiService) {
          var _this = this;
          _super.call(this, $scope, $location);
          this.$scope = $scope;
          this.$routeParams = $routeParams;
          this.FavouritesService = FavouritesService;
          this.DigiService = DigiService;
          $scope.id = $routeParams['scheduleId'];
          if ($scope['dataReady']) {
            this.dataReady();
          } else {
            $scope.$watch('dataReady', function () {
              if ($scope['dataReady'])
                _this.dataReady();
            });
          }
          $scope.toggleStarred = function () {
            return FavouritesService.toggleScheduleStarred($scope.id);
          };
          $scope.isStarred = function () {
            return FavouritesService.getScheduleStarred($scope.id);
          };
          $scope.hasLogo = function (obj) {
            return obj && obj.logo != null && obj.logo.length > 0;
          };
        }
        ScheduleDetailsControl.prototype.dataReady = function () {
          this.$scope.scheduleItem = this.DigiService.getScheduleById(this.$scope.id);
          this.$scope.stageItem = this.DigiService.getStageById(this.$scope.scheduleItem.stageId);
          this.$scope.exhibit = this.DigiService.getExhibitById(this.$scope.stageItem.udstillerId);
        };
        return ScheduleDetailsControl;
      }(digi.controllers.SubPageControl);
    controllers.ScheduleDetailsControl = ScheduleDetailsControl;
  }(digi.controllers || (digi.controllers = {})));
  var controllers = digi.controllers;
}(digi || (digi = {})));
var digi;
(function (digi) {
  var isPhonegap;
  var gaPlugin;
  function init() {
    console.log('Init');
    isPhonegap = false;
    if (isPhonegap) {
      console.log('Running on Phonegap');
      document.addEventListener('deviceready', onDeviceReady, false);
      window.addEventListener('onunload', onUnload, false);
    } else {
      onDeviceReady();
    }
  }
  digi.init = init;
  function onDeviceReady() {
    console.log('onDeviceReady');
    configureAngular();
    angular.element(document).ready(function () {
      console.log('Bootstrap digiApp now');
      angular.bootstrap(document, ['digiApp']);
    });
  }
  function onUnload() {
    if (isPhonegap) {
      if (gaPlugin)
        gaPlugin.exit(nativePluginResultHandler, nativePluginErrorHandler);
    }
  }
  function configureAngular() {
    console.log('Configure Angular');
    var App = angular.module('digiApp', [
        'ngSanitize',
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'ngRetina',
        'truncate',
        'webStorageModule',
        'angularytics'
      ]);
    App.config([
      'AngularyticsProvider',
      function (AngularyticsProvider) {
        if (isPhonegap) {
          if (window['plugins'] && window['plugins'].gaPlugin) {
            gaPlugin = window['plugins'].gaPlugin;
            gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, 'UA-43485473-2', 10);
            AngularyticsProvider.setEventHandlers(['PhoneGap']);
          }
        } else {
          AngularyticsProvider.setEventHandlers([
            'Console',
            'Google'
          ]);
        }
      }
    ]);
    App.config([
      '$routeProvider',
      function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'views/frontpage.html',
          controller: 'FrontPageController'
        }).when('/practical', { templateUrl: 'views/practical.html' }).when('/schedule', {
          templateUrl: 'views/schedule.html',
          controller: 'ScheduleController'
        }).when('/schedule/:scheduleId', {
          templateUrl: 'views/schedule-detail.html',
          controller: 'ScheduleDetailsControl'
        }).when('/myschedule', { redirectTo: '/myschedule/schedule/' }).when('/myschedule/:subpage', {
          templateUrl: 'views/myschedule.html',
          controller: 'MyScheduleController'
        }).when('/myschedule/exhibits/:exhibitionId', {
          templateUrl: 'views/exhibit-detail.html',
          controller: 'ExhibitionDetailsControl'
        }).when('/myschedule/schedule/:scheduleId', {
          templateUrl: 'views/schedule-detail.html',
          controller: 'ScheduleDetailsControl'
        }).when('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapController'
        }).when('/exhibitions', {
          templateUrl: 'views/exhibitions.html',
          controller: 'ExhibitionsController'
        }).when('/exhibitions/:exhibitionId', {
          templateUrl: 'views/exhibit-detail.html',
          controller: 'ExhibitionDetailsControl'
        }).otherwise({ redirectTo: '/' });
      }
    ]);
    App.run([
      '$rootScope',
      '$location',
      'DigiService',
      'Angularytics',
      function ($rootScope, $location, DigiService, Angularytics) {
        Angularytics.init();
        $rootScope.isPhonegap = isPhonegap;
        DigiService.preloadData();
        $rootScope.log = function (variable) {
          console.log(variable);
        };
        $rootScope.alert = function (msg) {
          alert(msg);
        };
        $rootScope.changePath = function (path) {
          $location.path(path);
        };
        $rootScope.openPage = function (url) {
          window.open(url, '_system');
          Angularytics.trackEvent('Links', 'Click', url);
        };
      }
    ]);
    if (supportsAnimation()) {
      App.animation('.ng-view-container', function ($location) {
        var currentPage;
        var animationType = 'fade';
        var animationTime = 0.5;
        return {
          enter: function (element, done) {
            switch (animationType) {
            case 'left':
              TweenMax.from(element, animationTime, {
                left: '100%',
                onComplete: done
              });
              break;
            case 'right':
              TweenMax.from(element, animationTime, {
                left: '-100%',
                onComplete: done
              });
              break;
            case 'punch':
              TweenMax.from(element, 0.4, {
                opacity: 0,
                scale: 0.8,
                onComplete: done,
                delay: 0.1
              });
              break;
            case 'fade':
              TweenMax.from(element, animationTime, {
                opacity: 0,
                onComplete: done
              });
              break;
            default:
            case 'none':
              done();
              break;
            }
            currentPage = $location.path();
          },
          leave: function (element, done) {
            var nextPage = $location.path();
            if (currentPage) {
              if (nextPage.indexOf(currentPage) == 0 && currentPage.length > 1) {
                animationType = 'left';
              } else if (currentPage.indexOf(nextPage) == 0 && nextPage.length > 1) {
                animationType = 'right';
              } else if (currentPage.indexOf('/myschedule') == 0 && nextPage.indexOf('/myschedule') == 0) {
                animationType = 'fade';
              } else {
                animationType = 'punch';
              }
            }
            switch (animationType) {
            case 'left':
              TweenMax.to(element, animationTime, {
                left: '-100%',
                onComplete: done
              });
              break;
            case 'right':
              TweenMax.to(element, animationTime, {
                left: '100%',
                onComplete: done
              });
              break;
            case 'punch':
              TweenMax.to(element, 0.2, {
                opacity: 0,
                scale: 1.2,
                onComplete: done
              });
              break;
            case 'fade':
              TweenMax.to(element, animationTime, {
                opacity: 0,
                onComplete: done
              });
              break;
            default:
            case 'none':
              done();
              break;
            }
          }
        };
      });
    }
    App.service('HttpFallback', digi.services.HttpFallback);
    App.service('MenuService', digi.services.MenuService);
    App.service('DigiService', digi.services.DigiService);
    App.service('FavouritesService', digi.services.FavouritesService);
    App.service('StateService', digi.services.StateService);
    App.controller('ExhibitionDetailsControl', digi.controllers.ExhibitionDetailsControl);
    App.controller('ScheduleDetailsControl', digi.controllers.ScheduleDetailsControl);
    App.controller('ExhibitionsController', digi.controllers.ExhibitionsController);
    App.controller('MapController', digi.controllers.MapController);
    App.controller('FrontPageController', digi.controllers.FrontPageController);
    App.controller('ScheduleController', digi.controllers.ScheduleController);
    App.controller('MyScheduleController', digi.controllers.MyScheduleController);
    App.controller('WrapperController', digi.controllers.WrapperController);
    App.controller('FooterController', digi.controllers.FooterController);
    App.controller('HeaderController', digi.controllers.HeaderController);
    registerDirectives();
  }
  function registerDirectives() {
    angular.module('digiApp').directive('digiMenu', function () {
      return {
        restrict: 'EA',
        controller: 'FooterController',
        templateUrl: 'views/directives/footer.html',
        replace: true
      };
    }).directive('digiHeader', function () {
      return {
        restrict: 'EA',
        controller: 'HeaderController',
        templateUrl: 'views/directives/header.html',
        replace: true
      };
    }).directive('exhibitListItem', function () {
      return {
        restrict: 'AC',
        templateUrl: 'views/directives/exhibit-list-item.html'
      };
    }).directive('scheduleListItem', function () {
      return {
        restrict: 'AC',
        templateUrl: 'views/directives/schedule-list-item.html'
      };
    }).directive('ngKeepScroll', function () {
      return function (scope, element, attrs) {
        if (!supportsAnimation())
          return;
        var scrollY = parseInt(scope.$eval(attrs['ngKeepScroll']));
        var el = element[0];
        TweenMax.set(el, { opacity: 0 });
        scope.$on(digi.events.AppEvents.LIST_READY, function () {
          imagesLoaded(el, function () {
            el.scrollTop = scrollY;
            TweenMax.to(el, 0.3, {
              opacity: 1,
              delay: 0.2
            });
          });
        });
        scope.$on('$routeChangeStart', function () {
          scope.$eval(attrs['ngKeepScroll'] + ' = ' + element.prop('scrollTop'));
        });
      };
    });
  }
  function supportsAnimation() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Android') >= 0) {
      var androidversion = parseFloat(ua.slice(ua.indexOf('Android') + 8));
      if (androidversion < 3) {
        return false;
      }
    }
    return true;
  }
  function nativePluginResultHandler(result) {
    console.log('nativePluginResultHandler: ' + result);
  }
  function nativePluginErrorHandler(error) {
    console.log('nativePluginErrorHandler: ' + error);
  }
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (events) {
    var Event = function () {
        function Event(type, targetObj) {
          this._type = type;
          this._target = targetObj;
        }
        Event.prototype.getTarget = function () {
          return this._target;
        };
        Event.prototype.getType = function () {
          return this._type;
        };
        return Event;
      }();
    events.Event = Event;
    var EventDispatcher = function () {
        function EventDispatcher() {
          this._listeners = [];
        }
        EventDispatcher.prototype.hasEventListener = function (type, listener) {
          var exists = false;
          for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
              exists = true;
            }
          }
          return exists;
        };
        EventDispatcher.prototype.addEventListener = function (typeStr, listenerFunc) {
          if (this.hasEventListener(typeStr, listenerFunc)) {
            return;
          }
          this._listeners.push({
            type: typeStr,
            listener: listenerFunc
          });
        };
        EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
          for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
              this._listeners.splice(i, 1);
            }
          }
        };
        EventDispatcher.prototype.dispatchEvent = function (evt) {
          for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].type === evt.getType()) {
              this._listeners[i].listener.call(this, evt);
            }
          }
        };
        return EventDispatcher;
      }();
    events.EventDispatcher = EventDispatcher;
  }(digi.events || (digi.events = {})));
  var events = digi.events;
}(digi || (digi = {})));
var digi;
(function (digi) {
  (function (events) {
    var AppEvents = function () {
        function AppEvents() {
        }
        AppEvents.LOAD = 'app_loaded';
        AppEvents.READY = 'app_ready';
        AppEvents.LIST_READY = 'listReady';
        return AppEvents;
      }();
    events.AppEvents = AppEvents;
  }(digi.events || (digi.events = {})));
  var events = digi.events;
}(digi || (digi = {})));