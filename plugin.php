<?php
/**
 * Plugin Name: popup-component
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: popup-component — is a Gutenberg plugin created via create-guten-block.
 * Author: 7Span
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';



add_action('enqueue_block_assets', function() {
	
	wp_enqueue_style( 'block-editor-styles', plugin_dir_url( __FILE__ ).'src/block/normalize.css');
	wp_enqueue_style( 'site-editor-styles', plugin_dir_url( __FILE__ ).'src/block/popup-component.webflow.css');
	wp_enqueue_style( 'webflow-styles', plugin_dir_url( __FILE__ ).'src/block/webflow.css' );
});