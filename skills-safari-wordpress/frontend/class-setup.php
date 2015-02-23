<?php
/**
 * @package Frontend
 *
 * Main frontend code.
 */
if ( ! defined( 'KEVINW_SF_VERSION' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}

if ( ! class_exists( 'Kevinw_SF_Frontend_Setup' ) ) {

	class Kevinw_SF_Frontend_Setup {

		function __construct() {
			add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		}

		/**
		 * Add JS and CSS
		 */
		function register_scripts() {
			$id = get_the_ID();
			// Only continue if current page is home
			if ( !is_home() ) return;

			wp_enqueue_script( 'jquery' );
			wp_enqueue_script( 'kevinw-sf-react', plugins_url( 'assets/react.min.js', KEVINW_SF_FILE ), array(), false, true );
			wp_enqueue_script( 'kevinw-sf-yp', plugins_url( 'assets/scripts.min.js', KEVINW_SF_FILE ), array(), false, true );
		
			$this->register_scripts_css();
		}

		function register_scripts_css() {
			wp_register_style( 'css-kevinw-sf-basic', plugins_url( 'assets/style.min.css', KEVINW_SF_FILE ) );
			wp_enqueue_style( 'css-kevinw-sf-basic' );
		}

	}
 
} /* End of class-exists wrapper */
?>