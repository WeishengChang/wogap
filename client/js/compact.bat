@echo off
TYPE NUL > compact.js
SET FILE_LIST=("jquery-2.1.1.min.js" "jquery.widget.min.js" "jquery.mousewheel.js" "handlebars-1.1.2.js" "ember-1.6.0.js" "metro.min.js" "jquery.jqplot.min.js" "jquery.jqGrid.min.js" "i18n\grid.locale-tw.js" "jquery.contextmenu.r2.js")

FOR %%G IN %FILE_LIST% DO copy /A compact.js+"%%G" && echo. >> compact.js
pause