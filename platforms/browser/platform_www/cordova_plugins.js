cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-sim/www/sim.js",
        "id": "cordova-plugin-sim.Sim",
        "pluginId": "cordova-plugin-sim",
        "merges": [
            "window.plugins.sim"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-datepicker": "0.9.3",
    "cordova-plugin-sim": "1.3.2"
}
// BOTTOM OF METADATA
});