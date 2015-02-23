<?php
/*
 * Plugin Name: Skills Safari
 * Plugin URI: http://kevinw.de/
 * Description: Skills Safari. Work in progress.
 * Author: Kevin Weber
 * Version: 0.1
 * Author URI: http://kevinw.de/
 * License: GPL v3
 * Text Domain: skills-safari
*/
if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

define( 'KEVINW_SF_VERSION', '0.1' );

if ( ! defined( 'KEVINW_SF_FILE' ) ) {
	define( 'KEVINW_SF_FILE', __FILE__ );
}

if ( ! defined( 'KEVINW_SF_PATH' ) ) {
	define( 'KEVINW_SF_PATH', plugin_dir_path( KEVINW_SF_FILE ) );
}

if ( ! defined( 'KEVINW_SF_BASENAME' ) ) {
	define( 'KEVINW_SF_BASENAME', plugin_basename( KEVINW_SF_FILE ) );
}

kevinw_sf();

/* ***************************** CLASS AUTOLOADING *************************** */

function kevinw_sf_auto_load_frontend($class) {
	kevinw_sf_auto_load($class, 'frontend');
	$Kevinw_SF_Frontend_Setup = new Kevinw_SF_Frontend_Setup();
}

/*
 * Require classes á la "Kevinw_SF_Frontend_Setup()". "Kevinw_SF_Frontend_" gets removed to load files á la "frontend/class-setup.php"
 */
function kevinw_sf_auto_load($class, $folderName) {
	$className = strtolower( $class );
	$className = str_replace("kevinw_sf_".$folderName."_", "", $className);
	$className = str_replace("_", "-", $className);

    $filename = KEVINW_SF_PATH . $folderName . "/class-" . $className . ".php";
    if (is_readable($filename)) {
        require_once $filename;
    }
}

function kevinw_sf() {
	if ( function_exists( 'spl_autoload_register' ) ) {
		spl_autoload_register( 'kevinw_sf_auto_load_frontend' );
	}
}
?>