/**
 * Created by roch dardie on 08/06/15.
 */


angular.module('app.controllers.note_edit', [])

    .controller('NoteEditController', function NoteEditController($scope, $log, $ionicPlatform,$location,sContext,$timeout,uuid4) {

        var me = this;

        var canvas =  null;

        //recuperration de l'image d'arriere plans dans les paramettre.
        //me.fond=$stateParams.fond;
        //$log.debug("FOND");
        //$log.debug(me.fond);
        //$log.debug($stateParams);


        me.gotoHome=function(){

            $location.path("/main");

        }

        me.currentText = "";
        me.tmpFileName=null;


        me.success = angular.noop;

        me.exit = angular.noop;

        me.error = angular.noop;

        me.setup = function(success, exit, error) {
            me.success = success || me.success;
            me.exit = exit || me.exit;
            me.error = error || me.error;
        };

        $ionicPlatform.ready(function () {


            me.load = function () {
                var $ = function (id) {
                    return document.getElementById(id)
                };

                canvas = this.__canvas = new fabric.Canvas('canvasFabric', {
                    isDrawingMode: true,
                    isTextMode: false
                });


                me.validate=function(){

                    window.canvas2ImagePlugin.saveImageDataToLibrary(
                        function(msg){
                            console.log(msg);

                            window.resolveLocalFileSystemURL("file://"+msg, me.success, me.error);
                            me.exit();
                        },
                        function(err){
                            console.log(err);
                        },
                        //document.getElementById('myCanvas')
                        canvas
                    );
                }

                //write on good file
                me._copyFile= function(fileEntry) {

                    window.resolveLocalFileSystemURL(sContext.mediaDir, function(fs2) {
                            var fileName = me.objectId + '_' + uuid4.generate() + '.png';

                            fileEntry.copyTo(
                                fs2,
                                fileName,
                                function() {

                                    // Force digest.
                                    $timeout(function() {
                                        // Store the photo in the object document.
                                        me.photos.push({
                                            '@class': 'fr.sirs.core.model.Photo',
                                            'chemin': fileName
                                        });
                                    });
                                },
                                me._onCopyFail
                            );
                        },
                        me._onCopyFail);
                }

                //kill not edited file
                me._onCopySuccess= function (msg) {
                    $log.debug(msg)
                    sContext.noteImg=null;

                }

                me._onCopyFail = function fail(error) {
                    $log.debug(error)
                    console.log("fail: " + error.code);
                }


                $timeout(function(){
                    canvas.setHeight(window.innerHeight - 45);
                    canvas.setWidth(window.innerWidth - (window.innerWidth * 0.25));
                    canvas.calcOffset();
                    canvas.renderAll();
                },300)


                fabric.Object.prototype.transparentCorners = false;

                var drawingModeEl = $('drawing-mode'),
                    drawingOptionsEl = $('drawing-mode-options'),
                    drawingColorEl = $('drawing-color'),
                    drawingShadowColorEl = $('drawing-shadow-color'),
                    drawingLineWidthEl = $('drawing-line-width'),
                    drawingShadowWidth = $('drawing-shadow-width'),
                    drawingShadowOffset = $('drawing-shadow-offset'),
                    clearEl = $('clear-canvas'),
                    textModeEl = $('text-mode'),
                    textModeOptionEl = $('text-mode-options'),
                    editModeEl = $('edit-mode');

                clearEl.onclick = function () {
                    canvas.clear()
                };

                drawingModeEl.onclick = function () {
                    canvas.isDrawingMode = !canvas.isDrawingMode;
                    if (canvas.isDrawingMode) {
                        textModeOptionEl.style.display = 'none';
                        drawingOptionsEl.style.display = '';
                        canvas.isTextMode = false;
                        canvas.isEditingMode = false;
                        drawingModeEl.style.backgroundColor="#FFEB3B";
                        textModeEl.style.backgroundColor="transparent";
                        editModeEl.style.backgroundColor="transparent";
                    }
                    else {
                        drawingOptionsEl.style.display = 'none';
                        drawingModeEl.style.backgroundColor="transparent";
                    }
                };
                textModeEl.onclick = function () {
                    canvas.isTextMode = !canvas.isTextMode;
                    if(canvas.isTextMode){
                        drawingOptionsEl.style.display = 'none';
                        textModeOptionEl.style.display = '';
                        canvas.isDrawingMode = false;
                        canvas.isEditingMode = false;
                        textModeEl.style.backgroundColor="#FFEB3B";
                        drawingModeEl.style.backgroundColor="transparent";
                        editModeEl.style.backgroundColor="transparent";

                    }
                    else {
                        textModeOptionEl.style.display = 'none';
                        textModeEl.style.backgroundColor="transparent";
                    }
                };
                editModeEl.onclick = function () {
                    canvas.isEditingMode = !canvas.isEditingMode;
                    if (canvas.isEditingMode) {
                        textModeOptionEl.style.display = 'none';
                        drawingOptionsEl.style.display = 'none';
                        canvas.isTextMode = false;
                        canvas.isDrawingMode = false;
                        editModeEl.style.backgroundColor="#FFEB3B";
                        textModeEl.style.backgroundColor="transparent";
                        drawingModeEl.style.backgroundColor="transparent";
                    }
                    else {
                        drawingModeEl.style.backgroundColor="transparent";
                    }
                };

                if (fabric.PatternBrush) {
                    var vLinePatternBrush = new fabric.PatternBrush(canvas);
                    vLinePatternBrush.getPatternSrc = function () {

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = 10;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(0, 5);
                        ctx.lineTo(10, 5);
                        ctx.closePath();
                        ctx.stroke();

                        return patternCanvas;
                    };

                    var hLinePatternBrush = new fabric.PatternBrush(canvas);
                    hLinePatternBrush.getPatternSrc = function () {

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = 10;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 5;
                        ctx.beginPath();
                        ctx.moveTo(5, 0);
                        ctx.lineTo(5, 10);
                        ctx.closePath();
                        ctx.stroke();

                        return patternCanvas;
                    };

                    var squarePatternBrush = new fabric.PatternBrush(canvas);
                    squarePatternBrush.getPatternSrc = function () {

                        var squareWidth = 10, squareDistance = 2;

                        var patternCanvas = fabric.document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                        var ctx = patternCanvas.getContext('2d');

                        ctx.fillStyle = this.color;
                        ctx.fillRect(0, 0, squareWidth, squareWidth);

                        return patternCanvas;
                    };

                    var diamondPatternBrush = new fabric.PatternBrush(canvas);
                    diamondPatternBrush.getPatternSrc = function () {

                        var squareWidth = 10, squareDistance = 5;
                        var patternCanvas = fabric.document.createElement('canvas');
                        var rect = new fabric.Rect({
                            width: squareWidth,
                            height: squareWidth,
                            angle: 45,
                            fill: this.color
                        });

                        var canvasWidth = rect.getBoundingRectWidth();

                        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                        rect.set({left: canvasWidth / 2, top: canvasWidth / 2});

                        var ctx = patternCanvas.getContext('2d');
                        rect.render(ctx);

                        return patternCanvas;
                    };

                    //var img = new Image();
                    //img.src = sContext.noteImg;
                    //
                    //var texturePatternBrush = new fabric.PatternBrush(canvas);
                    //texturePatternBrush.source = img;
                }

                $('drawing-mode-selector').onchange = function () {

                    if (this.value === 'hline') {
                        canvas.freeDrawingBrush = vLinePatternBrush;
                    }
                    else if (this.value === 'vline') {
                        canvas.freeDrawingBrush = hLinePatternBrush;
                    }
                    else if (this.value === 'square') {
                        canvas.freeDrawingBrush = squarePatternBrush;
                    }
                    else if (this.value === 'diamond') {
                        canvas.freeDrawingBrush = diamondPatternBrush;
                    }
                    //else if (this.value === 'texture') {
                    //    canvas.freeDrawingBrush = texturePatternBrush;
                    //}
                    else {
                        canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
                    }

                    if (canvas.freeDrawingBrush) {
                        canvas.freeDrawingBrush.color = drawingColorEl.value;
                        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                        canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
                    }
                };

                drawingColorEl.onchange = function () {
                    canvas.freeDrawingBrush.color = this.value;
                };
                drawingShadowColorEl.onchange = function () {
                    canvas.freeDrawingBrush.shadowColor = this.value;
                };
                drawingLineWidthEl.onchange = function () {
                    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
                    this.previousSibling.innerHTML = this.value;
                };
                drawingShadowWidth.onchange = function () {
                    canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
                    this.previousSibling.innerHTML = this.value;
                };
                drawingShadowOffset.onchange = function () {
                    canvas.freeDrawingBrush.shadowOffsetX =
                        canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;
                    this.previousSibling.innerHTML = this.value;
                };

                if (canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush.color = drawingColorEl.value;
                    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                    canvas.freeDrawingBrush.shadowBlur = 0;
                }
            };

            me.write= function(texte){
                canvas.add(new fabric.IText(texte, {
                    fontFamily: 'arial black',
                    left: 100,
                    top: 100 ,
                }));
            }


            me.load();




        });
    })


