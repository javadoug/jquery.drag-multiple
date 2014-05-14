# Drag Multiple Plugin

A jQueryUI plugin enabling the selection, drag and drop of multiple ui-draggable elements.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/javadoug/jquery.drag-multiple/master/dist/jquery-ui.drag-multiple.min.js
[max]: https://raw.github.com/javadoug/jquery.drag-multiple/master/dist/jquery-ui.drag-multiple.js

In your web page:

    <script src="jquery.js"></script>
    <script src="jquery-ui.js"></script>
    <script src="dist/jquery-ui.drag-multiple.min.js"></script>
    <script>
    jQuery(function($) {
      $('div').draggable({multiple: true});
    });
    </script>

Then add .ui-selected class to .ui-draggable elements to drag them as a group.

## Documentation

### Options
You can pass the following parameters within the multiple option hash object:

#### multiple.items
Specify the selection of elements to move. The default selection is $(".ui-draggable.ui-selected").

    multiple.items = function getSelectedItems() {
        return $(".ui-draggable.ui-selected");
    };


#### multiple.beforeStart
Cancel drag multiple and other setup work you might need. The default implementation is shown here.

    multiple.beforeStart = function beforeDragStart(jqEvent, ui) {
        // make sure target is selected, otherwise deselect others
        if (!(this.is('.ui-draggable') && this.is('.ui-selected'))) {
            $(".ui-draggable").removeClass('ui-selected');
            return false;
        }
    };


#### multiple.beforeDrag
Called on before each draggable.drag event. The default is $.noop.

    multiple.beforeDrag = function beforeDrag(jqEvent, ui) {
        
    };


#### multiple.beforeStop
Called before draggable.stop event. The default is $.noop.

    multiple.beforeStop = function beforeDragStop(jqEvent, ui) {
        
    };


## Examples
_(Coming soon)_

## Release History
### _0.1.0_ inital release
### _0.1.1_ fix
- https://github.com/javadoug/jquery.drag-multiple/issues/3
- https://github.com/javadoug/jquery.drag-multiple/issues/2

