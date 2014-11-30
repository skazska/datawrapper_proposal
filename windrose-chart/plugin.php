<?php
/**
 * Created by PhpStorm.
 * User: ska
 * Date: 30.11.14
 * Time: 13:25
 */

class DatawrapperPlugin_WindroseChart extends DatawrapperPlugin_Visualization {
    public function init(){
        // define the visualization meta
        $visMeta = array(
            /*
             * The unique visualization id (not to be confused with the plugin id)
             */
            "id" => "windrose-chart",

            /*
             * The title displayed in the editor UI. Wrap in __() to make it
             * localizable.
             */
            "title" => "WindRose Chart (d3)",

            /*
             * Libraries that are used by the visualization.
             */
            "libraries" => array(array(
                "local" => "vendor/d3.v3.min.js",
                "cdn" => "//cdnjs.cloudflare.com/ajax/libs/d3/3.3.11/d3.min.js"
            )),

            /*
             * The axes (or dimensions) provided by the visualization. The bubble
             * chart provides three axes for the bubble radius (size), fill (color)
             * and label.
             */
            "axes" => array(
                "direction" => array(
                    "accepts" => array("text")
                ),
                "length" => array(
                    "accepts" => array("number")
                )
            ),

            /*
             * Config options that are displayed to the user in the right
             * sidebar in the chart editor.
             */
            "options" => array(
//                "show-labels" => array(
//                    "type" => "checkbox",
//                    "label" => "Show bubble labels",
//                    "default" => true
//                )
            ),

            /*
             * Here we define the axis that is used as
             * row keys for the highlight feature
             */
            "highlight-key" => "label"
        );

        // register the visualization
        DatawrapperVisualization::register($this, $visMeta);
    }

} 