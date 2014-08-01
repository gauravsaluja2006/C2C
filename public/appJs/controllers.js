'use strict';

var loggedInUser = false,sLogin;

/* Controllers */

angular.module('myApp.controllers', [])
        .controller('MyCtrl1', ['$scope', function($scope) {

            }])
        .controller('MyCtrl2', ['$scope', function($scope) {

            }])
        .controller('mainCtrl', ['$scope', 'addOrderService', '$location', 'toaster', function($scope, addOrderService, $location, toaster, dragAndDrop) {
                $scope.routeIs = function(routeName) {
                    $scope.showComp = $location.path() == '/intelProcessors' || $location.path() == '/intelMotherboards';
                    //console.log($scope.showComp);
                    return $location.path() === routeName;
                };
                $scope.createPC = true;
                $scope.sLogin;
                $scope.finalised = 0;
                $scope.username;
                $scope.password;
                $scope.checkLogin = function() {

                    console.log('checking');
                    if (($scope.username === 'admin') && ($scope.password === 'admin'))
                    {
                        loggedInUser = true;
                        console.log('login successful');
                        sLogin = sLogin || '/dashboard';
                        $location.path(sLogin);
                    }
                    else {
                        toaster.pop('error', "Sorry", 'Not Authorised.');
                         
                    }
                };



                $scope.compPath;
                $scope.goCompare = function() {
                    if ($scope.comparelist.length >= 2)
                        $location.path($scope.compPath);
                    else
                        toaster.pop('error', "Sorry", 'Cannot compare less than two products.');
                }



                $scope.pop = function() {

                };
                $scope.myPc = {};
                $scope.myPc.set = {};
                $scope.myPc.price = {
                    "motherboard": 0,
                    "processor": 0,
                    "keyboard": 0,
                    "mouse": 0,
                    "monitor": 0
                };
                $scope.myPc.total = 0;
                $scope.myPc.getPrice = function() {
                    var price = 0;
                    for (var item in $scope.myPc.price) {
                        price = price + $scope.myPc.price[item];

                    }
                    $scope.myPc.total = price;


                };
                $scope.setManufacturer = function(manufacturer) {
                    $scope.myPc.manufacturer = manufacturer;
                    toaster.pop('success', "Selected Manufacturer", manufacturer);
                    toaster.pop('note', "Next", 'Select a Motherboard');
                    //$scope.finalised += 1;
                    $location.path('/intelMotherboards');

                };
                $scope.setMotherboard = function(motherboard) {
                    console.log(motherboard);
                    $scope.myPc.motherboard = motherboard;
                    console.log($scope.myPc.motherboard);
                    $scope.myPc.set.motherboard = 'Y';
                    $scope.myPc.price.motherboard = $scope.myPc.motherboard.Price;
                    $scope.myPc.getPrice();

                    toaster.pop('success', "Selected Motherboard", motherboard.Name);
                    toaster.pop('note', "Next", 'Select a Processor');
                    $scope.finalised += 1;
                    $location.path('/intelProcessors');


                };
                $scope.setProcessor = function(processor) {
                    $scope.myPc.processor = processor;
                    $scope.myPc.price.processor = $scope.myPc.processor.Price;
                    $scope.myPc.getPrice();

                    $scope.myPc.set.processor = 'Y';
                    toaster.pop('success', "Selected Processor", processor.Name);
                    toaster.pop('note', "Next", 'Select a Mouse');
                    $scope.finalised += 1;
                    $location.path('/mouse');
                };
                $scope.setMouse = function(mouse) {
                    $scope.myPc.mouse = mouse;
                    $scope.myPc.price.mouse = $scope.myPc.mouse.Price;
                    $scope.myPc.getPrice();

                    $scope.myPc.set.mouse = 'Y';
                    toaster.pop('success', "Selected Mouse", mouse.Name);
                    toaster.pop('note', "Next", 'Select a Keyboard');
                    $scope.finalised += 1;
                    $location.path('/keyboard');
                };
                $scope.setKeyboard = function(keyboard) {
                    $scope.myPc.keyboard = keyboard;
                    $scope.myPc.price.keyboard = $scope.myPc.keyboard.Price;
                    $scope.myPc.getPrice();

                    $scope.myPc.set.keyboard = 'Y';
                    toaster.pop('success', "Selected Keyboard", keyboard.Name);
                    toaster.pop('note', "Next", 'Select a Monitor');
                    $scope.finalised += 1;
                    $location.path('/monitor');
                };
                $scope.setMonitor = function(monitor) {
                    $scope.myPc.monitor = monitor;
                    $scope.myPc.price.monitor = $scope.myPc.monitor.Price;
                    $scope.myPc.getPrice();

                    $scope.myPc.set.monitor = 'Y';
                    toaster.pop('success', "Selected Monitor", monitor.Name);
                    $scope.finalised += 1;
                    //$location.path('/intelMotherboards');
                    $scope.myPc.getPrice();
                    console.log($scope.myPc);
                };
                $scope.comparelist = [];
                $scope.compItem;
                $scope.cars = [
                    {name: 'Volvo'},
                    {name: 'Audi'},
                    {name: 'BMW'},
                    {name: 'Mercedes'}
                ];
                $scope.sold = [{name: 'Volvo'}];
                $scope.moveToSold = function(item, element) {

                    //var index = $scope.cars.indexOf(item);
                    //if(index === -1) return;
                    //$scope.cars.splice(index, 1);


                    var found = false;
                    var conflict = false;
                    var i;
                    for (i = 0; i < $scope.comparelist.length; i++) {
                        if ($scope.comparelist[i].Name === item.Name) {
                            found = true;
                        }

                        if ($scope.comparelist[i].type !== item.type)
                        {
                            toaster.pop('error', "Sorry", 'Cannot compare different type of products.');
                            return;
                        }

                    }

                    if (!found) {
                        $scope.comparelist.push(item);
                        $scope.compPath = '/' + item.type + '/compare';
                        //console.log('compare path is '+ $scope.compPath);
                        //console.log($scope.comparelist);
                    }
                    else {
                        toaster.pop('error', "Sorry", 'Already added to compare.');

                        found = false;
                    }

                };
                $scope.moveToSelling = function(car, element) {

                    var index = $scope.sold.indexOf(car);
                    if (index == -1)
                        return;
                    $scope.sold.splice(index, 1);
                    $scope.cars.push(car);
                };


                $scope.removeCompare = function(item) {
                    var index = $scope.comparelist.indexOf(item);
                    if (index === -1)
                        return;
                    $scope.comparelist.splice(index, 1);
                };

                $scope.myOrder = {};
                $scope.order = function() {
                    $scope.myOrder.components = {};
                    $scope.myOrder.components.motherboard = $scope.myPc.motherboard._id;
                    $scope.myOrder.components.processor = $scope.myPc.processor._id;
                    $scope.myOrder.components.mouse = $scope.myPc.mouse._id;
                    $scope.myOrder.components.monitor = $scope.myPc.monitor._id;
                    $scope.myOrder.components.keyboard = $scope.myPc.keyboard._id;
                    $scope.myOrder.price = $scope.myPc.total;
                    $scope.myOrder.time = new Date();
                    console.log($scope.myOrder);
                    addOrderService.save($scope.myOrder);
                };


            }])
        .controller('intelProcessorsCtrl', ['$scope', 'getProcessors', function($scope, getProcessors) {


                $scope.processors = getProcessors.query();
                //console.log($scope.processors);

                /*  $scope.processors = [
                 {
                 "Name": "DUAL CORE",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 2790,
                 "img": "img/intel/processors/core2.png",
                 "type":"processor"
                 },
                 {
                 "Name": "APU 4000",
                 "Platform": "AMD",
                 "Manufacturer": "AMD",
                 "Price": 2190,
                 "img": "img/intel/processors/AMD.png",
                 "type":"processor"
                 },
                 {
                 "Name": "BULLDOZER FX 4300",
                 "Platform": "AMD",
                 "Manufacturer": "AMD",
                 "Price": 5540,
                 "img": "img/intel/processors/AMD.png",
                 "type":"processor"
                 },
                 {
                 "Name": "BULLDOZER FX 8320",
                 "Platform": "AMD",
                 "Manufacturer": "AMD",
                 "Price": 9390,
                 "img": "img/intel/processors/AMD.png",
                 "type":"processor"
                 },
                 {
                 "Name": "BULLDOZER FX 8350",
                 "Platform": "AMD",
                 "Manufacturer": "AMD",
                 "Price": 11790,
                 "img": "img/intel/processors/AMD.png",
                 "type":"processor"
                 },
                 {
                 "Name": "E3 1245 V3 (SERVER)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 9390,
                 "img": "img/intel/processors/xeon.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-3 (2120)(1155)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 5990,
                 "img": "img/intel/processors/i3.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-5 (3330)(1155)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 9990,
                 "img": "img/intel/processors/i5.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-7 (3770K)(1155)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 19990,
                 "img": "img/intel/processors/i7.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-7 (4820K) (2011)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 24990,
                 "img": "img/intel/processors/i7.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-7 (4930K) (2011)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 37990,
                 "img": "img/intel/processors/i7.png",
                 "type":"processor"
                 },
                 {
                 "Name": "I-5 (4790) (1150)",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 18790,
                 "img": "img/intel/processors/i5.png",
                 "type":"processor"
                 }
                 ];
                 */

            }])
        .controller('intelMotherboardsCtrl', ['$scope', 'getMotherboards', function($scope, getMotherboards) {

                $scope.motherboards = getMotherboards.query();


                /*$scope.motherboards = [
                 {
                 "Name": "Z97 EXTREME 3",
                 "Platform": "INTEL",
                 "Manufacturer": "ASRock",
                 "Price": 9990,
                 "img": "img/intel/motherboards/7ASROCK Z97 EXTREME 3.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "H81M-HDS",
                 "Platform": "INTEL",
                 "Manufacturer": "ASRock",
                 "Price": 3890,
                 "img": "img/intel/motherboards/ASROCK H81M-HDS (1150).jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "H81MK",
                 "Platform": "INTEL",
                 "Manufacturer": "ASUS",
                 "Price": 3690,
                 "img": "img/intel/motherboards/ASUS H81MK (1150).jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "M5A 97 LE (970)",
                 "Platform": "AMD",
                 "Manufacturer": "ASUS",
                 "Price": 5650,
                 "img": "img/intel/motherboards/ASUS M5A 97 LE (970) AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "M5A 99FX PRO",
                 "Platform": "AMD",
                 "Manufacturer": "ASUS",
                 "Price": 10990,
                 "img": "img/intel/motherboards/ASUS M5A 99FX PRO (990 AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "Z87PRO",
                 "Platform": "INTEL",
                 "Manufacturer": "ASUS",
                 "Price": 15990,
                 "img": "img/intel/motherboards/ASUS Z87PRO (1150).jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "78LMT-S2",
                 "Platform": "AMD",
                 "Manufacturer": "Gigabyte",
                 "Price": 2700,
                 "img": "img/intel/motherboards/GIGABYTE 78LMT-S2 AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "78LMT-S2 USB3",
                 "Platform": "AMD",
                 "Manufacturer": "Gigabyte",
                 "Price": 4050,
                 "img": "img/intel/motherboards/GIGABYTE 78LMT-S2 USB3 AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "990XA-UD3",
                 "Platform": "AMD",
                 "Manufacturer": "Gigabyte",
                 "Price": 9390,
                 "img": "img/intel/motherboards/GIGABYTE 990XA-UD3 AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "B75M-D3V",
                 "Platform": "INTEL",
                 "Manufacturer": "Gigabyte",
                 "Price": 5190,
                 "img": "img/intel/motherboards/GIGABYTE B75M-D3V (1155).jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "F2A55M-S1",
                 "Platform": "AMD",
                 "Manufacturer": "Gigabyte",
                 "Price": 3090,
                 "img": "img/intel/motherboards/GIGABYTE F2A55M-S1 AMD.jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "G1 SNIPER",
                 "Platform": "INTEL",
                 "Manufacturer": "Gigabyte",
                 "Price": 11390,
                 "img": "img/intel/motherboards/GIGABYTE G1 SNIPER (Z 77).jpg",
                 "type":"motherboard"
                 },
                 {
                 "Name": "DX79SR",
                 "Platform": "INTEL",
                 "Manufacturer": "INTEL",
                 "Price": 19990,
                 "img": "img/intel/motherboards/INTELDX79SR (2011).jpg",
                 "type":"motherboard"
                 }
                 ];
                 */
            }])
        .controller('mouseCtrl', ['$scope', 'getMouse', function($scope, getMouse) {

                $scope.mouses = getMouse.query();
            }])
        .controller('keyboardCtrl', ['$scope', 'getKeyboards', function($scope, getKeyboards) {
                $scope.keyboards = getKeyboards.query();
            }])
        .controller('monitorCtrl', ['$scope', 'getMonitors', function($scope, getMonitors) {
                $scope.monitors = getMonitors.query();
            }])
        .controller('finalCtrl', ['$scope', function($scope) {

                $scope.itemSel = 'Flight';
                $scope.itemIs = function(iSel) {
                    return $scope.itemSel === iSel;
                };
            }])
        .controller('dragCtrl', ['$scope', function($scope, dragAndDrop) {


                $scope.try = 'yep';
            }])
        .controller('dashCtrl', ['$scope', 'addProductService', '$fileUploader', '$location', 'toaster', function($scope, addProductService, $fileUploader, $location, toaster) {


                if (loggedInUser) {
                    
                }

                else {
                    console.log('not authorised');
                    $location.path('/intelMotherboards');
                    toaster.pop('error', "Sorry", 'Not Authorised');
                    $('#loginButton').click();
                }
                ;





                $scope.done;
                $scope.addProduct = {};
                $scope.add = function() {
                    addProductService.save($scope.addProduct);
                };


                var uploader = $scope.uploader = $fileUploader.create({
                    scope: $scope,
                    url: 'uploadImage',
                    formdata: ['ZZZZZZZZZZZZZZZZZZZZZZzz']

                });


                // ADDING FILTERS

                // Images only
                uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
                    var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                    type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                });


                // REGISTER HANDLERS

                uploader.bind('afteraddingfile', function(event, item) {
                    console.info('After adding a file', item);
                });

                uploader.bind('whenaddingfilefailed', function(event, item) {
                    console.info('When adding a file failed', item);
                });

                uploader.bind('afteraddingall', function(event, items) {
                    console.info('After adding all files', items);
                });

                uploader.bind('beforeupload', function(event, item) {
                    console.info('Before upload', item);
                });

                uploader.bind('progress', function(event, item, progress) {
                    console.info('Progress: ' + progress, item);
                });

                uploader.bind('success', function(event, xhr, item, response) {
                    console.log('Success', xhr, item, response);
                    $scope.addProduct.img = response;
                    console.log($scope.addProduct.img);
                    $scope.$apply();
                    $scope.done = true;

                });

                uploader.bind('cancel', function(event, xhr, item) {
                    console.info('Cancel', xhr, item);
                });

                uploader.bind('error', function(event, xhr, item, response) {
                    console.info('Error', xhr, item, response);
                });

                uploader.bind('complete', function(event, xhr, item, response) {
                    console.info('Complete', xhr, item, response);
                });

                uploader.bind('progressall', function(event, progress) {
                    console.info('Total progress: ' + progress);
                });

                uploader.bind('completeall', function(event, items) {
                    console.info('Complete all', items);
                });




            }])
        .controller('uploadCtrl', ['$scope', '$fileUploader', function($scope, $fileUploader) {



            }])
        .controller('ordersCtrl', ['$scope','deliverOrderService','$timeout','nodemailer', 'getOrders','$location','toaster', function($scope, deliverOrderService,$timeout, nodemailer,  getOrders, $location, toaster) {

                if (loggedInUser) {
                    
                }

                else {
                    //console.log('not authorised');
                    //$location.path('/intelMotherboards');
                    //sLogin = '/orders';
                    
                    //toaster.pop('error', "Sorry", 'Not Authorised');
                    //$('#loginButton').click();

                };


                $scope.orders = getOrders.query();
                
                $scope.refreshOrders = function(){
                    console.log('Refreshing Orders List...');
                    $scope.orders = getOrders.query();
                };
                
                $scope.deliver = function(order){
                   console.log(order._id); 
                   var data = {};
                   data.id = order._id;
                   data.email = order.email;
                   console.log(data);
                   deliverOrderService.save(data);
                   $timeout($scope.refreshOrders, 1000);
                };
                
                
                $scope.sendmail = function(){
                    nodemailer.send();
                };

            }])
        .controller('statusCtrl', ['$scope', 'getStatus', function($scope, getStatus) {
                    
                    $scope.getStatus = function(id){
                        $scope.order.id = id;
                        $scope.orderStatus = getStatus.save({'id':id}, function(data){
                            $scope.status = data.status || 'Pending';
                            //console.log(data);
                        });
                    };


            }]);
