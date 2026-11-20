<?php
/**
 * Kids Learning Studio Block Theme
 *
 * @package Kids_Learning_Studio_Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'KLS_BLOCK_THEME_VERSION', '1.0.0' );

function kls_block_theme_setup() {
	load_theme_textdomain( 'kids-learning-studio-block', get_theme_file_path( 'languages' ) );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array( 'height' => 96, 'width' => 240, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array( 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'kls_block_theme_setup' );

function kls_block_theme_enqueue_fonts() {
	wp_enqueue_style(
		'kls-block-fonts',
		'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
		array(),
		KLS_BLOCK_THEME_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'kls_block_theme_enqueue_fonts' );
add_action( 'enqueue_block_editor_assets', 'kls_block_theme_enqueue_fonts' );

function kls_register_pattern_category() {
	if ( function_exists( 'register_block_pattern_category' ) ) {
		register_block_pattern_category( 'kls-sections', array( 'label' => __( 'Kids Learning Studio', 'kids-learning-studio-block' ) ) );
	}
}
add_action( 'init', 'kls_register_pattern_category', 5 );

function kls_register_resource_content_type() {
	register_post_type(
		'learning_resource',
		array(
			'labels' => array(
				'name' => __( 'Free Materials', 'kids-learning-studio-block' ),
				'singular_name' => __( 'Free Material', 'kids-learning-studio-block' ),
				'add_new_item' => __( 'Add Free Material', 'kids-learning-studio-block' ),
				'edit_item' => __( 'Edit Free Material', 'kids-learning-studio-block' ),
				'menu_name' => __( 'Free Materials', 'kids-learning-studio-block' ),
			),
			'public' => true,
			'has_archive' => 'resources',
			'menu_icon' => 'dashicons-welcome-learn-more',
			'show_in_rest' => true,
			'rewrite' => array( 'slug' => 'resources', 'with_front' => false ),
			'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes', 'revisions' ),
		)
	);
	register_taxonomy( 'resource_category', 'learning_resource', array( 'label' => __( 'Resource Categories', 'kids-learning-studio-block' ), 'hierarchical' => true, 'show_in_rest' => true, 'rewrite' => array( 'slug' => 'resource-category' ) ) );
	register_taxonomy( 'age_group', 'learning_resource', array( 'label' => __( 'Age Groups', 'kids-learning-studio-block' ), 'hierarchical' => true, 'show_in_rest' => true ) );

	$categories = array(
		'coloring-pages' => 'Coloring Pages', 'math-numbers' => 'Math & Numbers', 'alphabet-letters' => 'Alphabet & Letters',
		'shapes-colors' => 'Shapes & Colors', 'puzzles-matching' => 'Puzzles & Matching', 'fine-motor-skills' => 'Fine Motor Skills',
		'creative-activities' => 'Creative Activities',
	);
	foreach ( $categories as $slug => $name ) {
		if ( ! term_exists( $slug, 'resource_category' ) ) {
			wp_insert_term( $name, 'resource_category', array( 'slug' => $slug ) );
		}
	}
	foreach ( array( '2-3', '3-4', '4-5', '5-6', '2-6' ) as $age ) {
		if ( ! term_exists( $age, 'age_group' ) ) {
			wp_insert_term( $age, 'age_group', array( 'slug' => $age ) );
		}
	}
}
add_action( 'init', 'kls_register_resource_content_type' );

function kls_add_resource_file_metabox() {
	add_meta_box( 'kls-resource-file', __( 'Printable PDF', 'kids-learning-studio-block' ), 'kls_render_resource_file_metabox', 'learning_resource', 'side', 'high' );
}
add_action( 'add_meta_boxes_learning_resource', 'kls_add_resource_file_metabox' );

function kls_render_resource_file_metabox( $post ) {
	wp_nonce_field( 'kls_save_resource_file', 'kls_resource_file_nonce' );
	$pdf_id = absint( get_post_meta( $post->ID, '_kls_pdf_attachment_id', true ) );
	$pages = absint( get_post_meta( $post->ID, '_kls_pages', true ) );
	$pdf_url = $pdf_id ? wp_get_attachment_url( $pdf_id ) : '';
	printf( '<p><strong>%s</strong></p>', esc_html__( 'Choose a PDF from the Media Library', 'kids-learning-studio-block' ) );
	printf( '<input type="hidden" id="kls-pdf-id" name="kls_pdf_attachment_id" value="%d">', $pdf_id );
	printf( '<input class="widefat" type="text" id="kls-pdf-url" value="%s" readonly placeholder="%s">', esc_attr( $pdf_url ), esc_attr__( 'No PDF selected', 'kids-learning-studio-block' ) );
	echo '<p><button type="button" class="button" id="kls-choose-pdf">' . esc_html__( 'Choose PDF', 'kids-learning-studio-block' ) . '</button> <button type="button" class="button" id="kls-remove-pdf">' . esc_html__( 'Remove', 'kids-learning-studio-block' ) . '</button></p>';
	printf( '<p><label for="kls-pages">%s</label><input class="widefat" type="number" min="1" id="kls-pages" name="kls_pages" value="%d"></p>', esc_html__( 'Number of pages', 'kids-learning-studio-block' ), $pages ? $pages : 1 );
	printf( '<p class="description">%s</p>', esc_html__( 'The download button appears on the public material page when a valid PDF is attached.', 'kids-learning-studio-block' ) );
}

function kls_enqueue_resource_media_picker( $hook ) {
	if ( ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( ! $screen || 'learning_resource' !== $screen->post_type ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_script( 'kls-block-resource-media', get_theme_file_uri( 'assets/js/resource-media.js' ), array( 'jquery' ), KLS_BLOCK_THEME_VERSION, true );
}
add_action( 'admin_enqueue_scripts', 'kls_enqueue_resource_media_picker' );

function kls_save_resource_file_metabox( $post_id ) {
	if ( ! isset( $_POST['kls_resource_file_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kls_resource_file_nonce'] ) ), 'kls_save_resource_file' ) ) {
		return;
	}
	if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$pdf_id = isset( $_POST['kls_pdf_attachment_id'] ) ? absint( $_POST['kls_pdf_attachment_id'] ) : 0;
	if ( $pdf_id && 'application/pdf' !== get_post_mime_type( $pdf_id ) ) {
		$pdf_id = 0;
	}
	update_post_meta( $post_id, '_kls_pdf_attachment_id', $pdf_id );
	update_post_meta( $post_id, '_kls_pages', isset( $_POST['kls_pages'] ) ? max( 1, absint( $_POST['kls_pages'] ) ) : 1 );
}
add_action( 'save_post_learning_resource', 'kls_save_resource_file_metabox' );

function kls_register_resource_download_route() {
	register_rest_route( 'kls/v1', '/resources/(?P<id>\d+)/download', array(
		'methods' => 'GET',
		'callback' => 'kls_download_resource',
		'permission_callback' => '__return_true',
		'args' => array( 'id' => array( 'validate_callback' => 'is_numeric' ) ),
	) );
}
add_action( 'rest_api_init', 'kls_register_resource_download_route' );

function kls_download_resource( WP_REST_Request $request ) {
	$post_id = absint( $request['id'] );
	$post = get_post( $post_id );
	$pdf_id = absint( get_post_meta( $post_id, '_kls_pdf_attachment_id', true ) );
	$pdf_url = $pdf_id ? wp_get_attachment_url( $pdf_id ) : false;
	if ( ! $post || 'learning_resource' !== $post->post_type || 'publish' !== $post->post_status || ! $pdf_url || 'application/pdf' !== get_post_mime_type( $pdf_id ) ) {
		return new WP_Error( 'kls_pdf_not_found', __( 'This PDF is not available.', 'kids-learning-studio-block' ), array( 'status' => 404 ) );
	}
	update_post_meta( $post_id, '_kls_download_count', absint( get_post_meta( $post_id, '_kls_download_count', true ) ) + 1 );
	wp_safe_redirect( $pdf_url, 302 );
	exit;
}

function kls_resource_admin_columns( $columns ) {
	$columns['kls_download_count'] = __( 'Downloads', 'kids-learning-studio-block' );
	return $columns;
}
add_filter( 'manage_learning_resource_posts_columns', 'kls_resource_admin_columns' );

function kls_render_resource_admin_column( $column, $post_id ) {
	if ( 'kls_download_count' === $column ) {
		echo esc_html( absint( get_post_meta( $post_id, '_kls_download_count', true ) ) );
	}
}
add_action( 'manage_learning_resource_posts_custom_column', 'kls_render_resource_admin_column', 10, 2 );

function kls_resource_download_shortcode() {
	if ( ! is_singular( 'learning_resource' ) ) {
		return '';
	}
	$pdf_id = absint( get_post_meta( get_the_ID(), '_kls_pdf_attachment_id', true ) );
	if ( ! $pdf_id || 'application/pdf' !== get_post_mime_type( $pdf_id ) ) {
		return current_user_can( 'edit_posts' ) ? '<p>' . esc_html__( 'Attach a PDF in the Printable PDF panel to enable downloads.', 'kids-learning-studio-block' ) . '</p>' : '';
	}
	$url = rest_url( 'kls/v1/resources/' . get_the_ID() . '/download' );
	return '<p class="wp-block-buttons"><a class="wp-element-button" href="' . esc_url( $url ) . '">' . esc_html__( 'Download Free PDF', 'kids-learning-studio-block' ) . '</a></p>';
}
add_shortcode( 'kls_resource_download', 'kls_resource_download_shortcode' );

function kls_newsletter_form_shortcode() {
	$message = isset( $_GET['kls_newsletter'] ) ? sanitize_key( wp_unslash( $_GET['kls_newsletter'] ) ) : '';
	$output = '';
	if ( 'success' === $message ) {
		$output .= '<p role="status">' . esc_html__( 'Thank you for subscribing!', 'kids-learning-studio-block' ) . '</p>';
	} elseif ( 'error' === $message ) {
		$output .= '<p role="alert">' . esc_html__( 'Please enter a valid email address and try again.', 'kids-learning-studio-block' ) . '</p>';
	}
	$output .= '<form class="kls-inline-form" method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	$output .= '<input type="hidden" name="action" value="kls_subscribe">' . wp_nonce_field( 'kls_subscribe', 'kls_subscribe_nonce', true, false );
	$output .= '<label class="kls-sr-only" for="kls-newsletter-email">' . esc_html__( 'Email address', 'kids-learning-studio-block' ) . '</label>';
	$output .= '<input id="kls-newsletter-email" type="email" name="email" autocomplete="email" required placeholder="' . esc_attr__( 'Email address', 'kids-learning-studio-block' ) . '"> ';
	$output .= '<button class="wp-element-button" type="submit">' . esc_html__( 'Subscribe', 'kids-learning-studio-block' ) . '</button></form>';
	return $output;
}
add_shortcode( 'kls_newsletter_form', 'kls_newsletter_form_shortcode' );

function kls_handle_newsletter_submission() {
	if ( ! isset( $_POST['kls_subscribe_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kls_subscribe_nonce'] ) ), 'kls_subscribe' ) ) {
		wp_die( esc_html__( 'Security check failed.', 'kids-learning-studio-block' ), 403 );
	}
	$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$valid = is_email( $email );
	if ( $valid ) {
		$subscribers = get_option( 'kls_newsletter_subscribers', array() );
		$known = array_map( 'strtolower', $subscribers );
		if ( ! in_array( strtolower( $email ), $known, true ) ) {
			$subscribers[] = $email;
			update_option( 'kls_newsletter_subscribers', $subscribers, false );
		}
	}
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	wp_safe_redirect( add_query_arg( 'kls_newsletter', $valid ? 'success' : 'error', $redirect ) );
	exit;
}
add_action( 'admin_post_nopriv_kls_subscribe', 'kls_handle_newsletter_submission' );
add_action( 'admin_post_kls_subscribe', 'kls_handle_newsletter_submission' );

function kls_contact_form_shortcode() {
	$message = isset( $_GET['kls_contact'] ) ? sanitize_key( wp_unslash( $_GET['kls_contact'] ) ) : '';
	$output = '';
	if ( 'success' === $message ) {
		$output .= '<p role="status">' . esc_html__( 'Your message has been sent. Thank you!', 'kids-learning-studio-block' ) . '</p>';
	} elseif ( 'error' === $message ) {
		$output .= '<p role="alert">' . esc_html__( 'Message could not be sent. Please check the form and try again.', 'kids-learning-studio-block' ) . '</p>';
	}
	$output .= '<form class="kls-contact-form" method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
	$output .= '<input type="hidden" name="action" value="kls_contact">' . wp_nonce_field( 'kls_contact', 'kls_contact_nonce', true, false );
	$output .= '<p><label>' . esc_html__( 'Your name', 'kids-learning-studio-block' ) . '<br><input type="text" name="name" autocomplete="name" required></label></p>';
	$output .= '<p><label>' . esc_html__( 'Email address', 'kids-learning-studio-block' ) . '<br><input type="email" name="email" autocomplete="email" required></label></p>';
	$output .= '<p><label>' . esc_html__( 'Topic', 'kids-learning-studio-block' ) . '<br><select name="topic"><option>General Question</option><option>Download Help</option><option>Preschool / Classroom</option><option>Printable Request</option></select></label></p>';
	$output .= '<p><label>' . esc_html__( 'Message', 'kids-learning-studio-block' ) . '<br><textarea name="message" rows="6" required></textarea></label></p>';
	$output .= '<p class="kls-sr-only"><label>Leave this field empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>';
	$output .= '<p><button class="wp-element-button" type="submit">' . esc_html__( 'Send message', 'kids-learning-studio-block' ) . '</button></p></form>';
	return $output;
}
add_shortcode( 'kls_contact_form', 'kls_contact_form_shortcode' );

function kls_handle_contact_submission() {
	if ( ! isset( $_POST['kls_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kls_contact_nonce'] ) ), 'kls_contact' ) ) {
		wp_die( esc_html__( 'Security check failed.', 'kids-learning-studio-block' ), 403 );
	}
	$referer = wp_get_referer() ? wp_get_referer() : home_url( '/contact/' );
	if ( ! empty( $_POST['website'] ) ) {
		wp_safe_redirect( add_query_arg( 'kls_contact', 'success', $referer ) );
		exit;
	}
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$rate_key = 'kls_block_contact_' . md5( $ip );
	$attempts = (int) get_transient( $rate_key );
	if ( $attempts >= 4 ) {
		wp_safe_redirect( add_query_arg( 'kls_contact', 'error', $referer ) );
		exit;
	}
	set_transient( $rate_key, $attempts + 1, MINUTE_IN_SECONDS );
	$name = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$topic = isset( $_POST['topic'] ) ? sanitize_text_field( wp_unslash( $_POST['topic'] ) ) : '';
	$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
	$sent = false;
	if ( $name && is_email( $email ) && $topic && $message ) {
		$sent = wp_mail( get_option( 'admin_email' ), __( 'New message from Kids Learning Studio', 'kids-learning-studio-block' ), "Name: {$name}\nEmail: {$email}\nTopic: {$topic}\n\n{$message}", array( 'Reply-To: ' . $name . ' <' . $email . '>' ) );
	}
	wp_safe_redirect( add_query_arg( 'kls_contact', $sent ? 'success' : 'error', $referer ) );
	exit;
}
add_action( 'admin_post_nopriv_kls_contact', 'kls_handle_contact_submission' );
add_action( 'admin_post_kls_contact', 'kls_handle_contact_submission' );

function kls_register_block_theme_customizer( $customize ) {
	$customize->add_section( 'kls_block_theme_settings', array( 'title' => __( 'Kids Learning Studio', 'kids-learning-studio-block' ), 'priority' => 160 ) );
	$controls = array(
		'kls_donation_url' => array( 'label' => __( 'Donation page URL', 'kids-learning-studio-block' ), 'type' => 'url', 'sanitize' => 'esc_url_raw', 'default' => '' ),
		'kls_pinterest_url' => array( 'label' => __( 'Pinterest URL', 'kids-learning-studio-block' ), 'type' => 'url', 'sanitize' => 'esc_url_raw', 'default' => 'https://www.pinterest.com/KidsLearningStudio/' ),
		'kls_telegram_url' => array( 'label' => __( 'Telegram URL', 'kids-learning-studio-block' ), 'type' => 'url', 'sanitize' => 'esc_url_raw', 'default' => 'https://t.me/KidsLearningStudio' ),
	);
	foreach ( $controls as $setting => $control ) {
		$customize->add_setting( $setting, array( 'default' => $control['default'], 'sanitize_callback' => $control['sanitize'] ) );
		$customize->add_control( $setting, array( 'label' => $control['label'], 'section' => 'kls_block_theme_settings', 'type' => $control['type'] ) );
	}
}
add_action( 'customize_register', 'kls_register_block_theme_customizer' );

function kls_donation_link_shortcode() {
	$url = get_theme_mod( 'kls_donation_url', '' );
	if ( ! $url ) {
		return current_user_can( 'manage_options' ) ? '<p>' . esc_html__( 'Set a donation URL under Appearance → Customize → Kids Learning Studio.', 'kids-learning-studio-block' ) . '</p>' : '';
	}
	return '<a class="wp-element-button" href="' . esc_url( $url ) . '" target="_blank" rel="noopener noreferrer">' . esc_html__( 'Support our free library', 'kids-learning-studio-block' ) . '</a>';
}
add_shortcode( 'kls_donation_link', 'kls_donation_link_shortcode' );

function kls_get_registered_pattern_content( $slug ) {
	if ( ! class_exists( 'WP_Block_Patterns_Registry' ) ) {
		return '';
	}
	$pattern = WP_Block_Patterns_Registry::get_instance()->get_registered( 'kids-learning-studio-block/' . $slug );
	return is_array( $pattern ) && isset( $pattern['content'] ) ? $pattern['content'] : '';
}

function kls_create_navigation_entity( $title, $items ) {
	$blocks = '';
	foreach ( $items as $item ) {
		$label = wp_json_encode( $item['label'] );
		$url = wp_json_encode( $item['url'] );
		$blocks .= '<!-- wp:navigation-link {"label":' . $label . ',"type":"custom","url":' . $url . '} /-->';
	}
	$navigation = get_page_by_title( $title, OBJECT, 'wp_navigation' );
	$post = array(
		'post_type' => 'wp_navigation',
		'post_status' => 'publish',
		'post_title' => $title,
		'post_content' => $blocks,
	);
	if ( $navigation ) {
		$post['ID'] = $navigation->ID;
		return wp_update_post( $post, true );
	}
	return wp_insert_post( $post, true );
}

function kls_install_block_theme_content() {
	if ( get_option( 'kls_block_theme_installed_v1' ) ) {
		return;
	}
	$pages = array(
		'home' => array( 'title' => 'Home', 'slug' => 'home', 'patterns' => array( 'hero', 'categories', 'free-resources', 'benefits', 'newsletter', 'support' ) ),
		'free-resources' => array( 'title' => 'Free Resources', 'slug' => 'free-resources', 'patterns' => array( 'free-resources' ) ),
		'blog' => array( 'title' => 'Blog', 'slug' => 'blog', 'patterns' => array() ),
		'about' => array( 'title' => 'About Us', 'slug' => 'about', 'patterns' => array( 'about' ) ),
		'contact' => array( 'title' => 'Contact Us', 'slug' => 'contact', 'patterns' => array( 'contact' ) ),
		'faq' => array( 'title' => 'FAQ', 'slug' => 'faq', 'patterns' => array( 'faq' ) ),
		'support' => array( 'title' => 'Support', 'slug' => 'support', 'patterns' => array( 'support' ) ),
		'privacy-policy' => array( 'title' => 'Privacy Policy', 'slug' => 'privacy-policy', 'patterns' => array() ),
		'cookie-policy' => array( 'title' => 'Cookie Policy', 'slug' => 'cookie-policy', 'patterns' => array() ),
		'terms-and-conditions' => array( 'title' => 'Terms & Conditions', 'slug' => 'terms-and-conditions', 'patterns' => array() ),
	);
	$page_ids = array();
	foreach ( $pages as $key => $definition ) {
		$existing = get_page_by_path( $definition['slug'], OBJECT, 'page' );
		if ( $existing ) {
			$page_ids[ $key ] = $existing->ID;
			continue;
		}
		$content = '';
		foreach ( $definition['patterns'] as $pattern_slug ) {
			$content .= kls_get_registered_pattern_content( $pattern_slug ) . "\n";
		}
		if ( 'privacy-policy' === $key ) {
			$content = '<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">Privacy Policy</h1><!-- /wp:heading --><!-- wp:paragraph --><p>Last updated: November 2026</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">1. Information We Collect</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Free worksheets can be downloaded without creating an account or submitting personal details. If you voluntarily subscribe to our newsletter or contact us, we process the information you provide to deliver email updates or respond to your inquiry.</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">2. Children’s Privacy</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Kids Learning Studio is designed for parents, guardians, and preschool educators. We do not knowingly collect personal information directly from children under 13.</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">3. Downloads and Advertising</h2><!-- /wp:heading --><!-- wp:paragraph --><p>We count downloads of published printable files to maintain and improve the library. Advertising services, if enabled by the site owner, may use their own cookies and consent controls.</p><!-- /wp:paragraph -->';
		} elseif ( 'cookie-policy' === $key ) {
			$content = '<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">Cookie Policy</h1><!-- /wp:heading --><!-- wp:paragraph --><p>Last updated: November 2026</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">1. Essential Functional Storage</h2><!-- /wp:heading --><!-- wp:paragraph --><p>We use essential browser storage for site functionality and preferences. WordPress and hosting services may set cookies needed for security and administration.</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">2. Advertising and Analytics</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Optional analytics and advertising technologies will only be used if enabled by the site owner and configured with appropriate consent controls. This theme does not connect an advertising network by itself.</p><!-- /wp:paragraph -->';
		} elseif ( 'terms-and-conditions' === $key ) {
			$content = '<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">Terms &amp; Conditions</h1><!-- /wp:heading --><!-- wp:paragraph --><p>Last updated: November 2026</p><!-- /wp:paragraph --><!-- wp:heading {"level":2} --><h2 class="wp-block-heading">1. Personal and Single-Classroom License</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Printable PDFs from Kids Learning Studio are provided for personal family use and single-classroom educator use. Redistribution, reselling, or uploading raw PDF files to public file-sharing repositories is prohibited.</p><!-- /wp:paragraph -->';
		}
		$page_id = wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_title' => $definition['title'], 'post_name' => $definition['slug'], 'post_content' => $content ), true );
		if ( ! is_wp_error( $page_id ) ) {
			$page_ids[ $key ] = $page_id;
			if ( 'contact' === $key ) {
				update_post_meta( $page_id, '_wp_page_template', 'page-contact.html' );
			} elseif ( 'about' === $key ) {
				update_post_meta( $page_id, '_wp_page_template', 'page-about.html' );
			}
		}
	}
	if ( isset( $page_ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_ids['home'] );
	}
	if ( isset( $page_ids['blog'] ) ) {
		update_option( 'page_for_posts', $page_ids['blog'] );
	}

	$header_items = array();
	foreach ( array( 'Free Resources' => 'free-resources', 'Blog' => 'blog', 'About Us' => 'about', 'Contact' => 'contact' ) as $label => $key ) {
		if ( isset( $page_ids[ $key ] ) ) {
			$header_items[] = array( 'label' => $label, 'url' => get_permalink( $page_ids[ $key ] ) );
		}
	}
	$footer_items = array();
	foreach ( array( 'About Us' => 'about', 'Contact Us' => 'contact', 'FAQ' => 'faq', 'Support' => 'support', 'Privacy Policy' => 'privacy-policy', 'Cookie Policy' => 'cookie-policy', 'Terms & Conditions' => 'terms-and-conditions' ) as $label => $key ) {
		if ( isset( $page_ids[ $key ] ) ) {
			$footer_items[] = array( 'label' => $label, 'url' => get_permalink( $page_ids[ $key ] ) );
		}
	}
	$header_id = kls_create_navigation_entity( __( 'Kids Learning Studio — Header', 'kids-learning-studio-block' ), $header_items );
	$footer_id = kls_create_navigation_entity( __( 'Kids Learning Studio — Footer', 'kids-learning-studio-block' ), $footer_items );
	if ( ! is_wp_error( $header_id ) ) {
		update_option( 'kls_header_navigation_id', absint( $header_id ) );
	}
	if ( ! is_wp_error( $footer_id ) ) {
		update_option( 'kls_footer_navigation_id', absint( $footer_id ) );
	}
	update_option( 'kls_block_theme_installed_v1', 1, false );
}
add_action( 'after_switch_theme', 'kls_install_block_theme_content' );

function kls_inject_navigation_references( $parsed_block ) {
	if ( empty( $parsed_block['blockName'] ) || 'core/navigation' !== $parsed_block['blockName'] ) {
		return $parsed_block;
	}
	$class_name = isset( $parsed_block['attrs']['className'] ) ? $parsed_block['attrs']['className'] : '';
	$map = array(
		'kls-primary-navigation' => 'kls_header_navigation_id',
		'kls-footer-explore-navigation' => 'kls_header_navigation_id',
		'kls-footer-policy-navigation' => 'kls_footer_navigation_id',
	);
	foreach ( $map as $class => $option ) {
		if ( false !== strpos( $class_name, $class ) ) {
			$reference = absint( get_option( $option, 0 ) );
			if ( $reference ) {
				$parsed_block['attrs']['ref'] = $reference;
			}
			break;
		}
	}
	return $parsed_block;
}
add_filter( 'render_block_data', 'kls_inject_navigation_references' );

function kls_register_newsletter_admin_page() {
	add_menu_page( __( 'Newsletter Subscribers', 'kids-learning-studio-block' ), __( 'Newsletter', 'kids-learning-studio-block' ), 'manage_options', 'kls-newsletter', 'kls_render_newsletter_admin_page', 'dashicons-email-alt', 61 );
}
add_action( 'admin_menu', 'kls_register_newsletter_admin_page' );

function kls_render_newsletter_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$subscribers = get_option( 'kls_newsletter_subscribers', array() );
	echo '<div class="wrap"><h1>' . esc_html__( 'Newsletter Subscribers', 'kids-learning-studio-block' ) . '</h1><p>' . esc_html( sprintf( __( '%d email addresses stored in WordPress.', 'kids-learning-studio-block' ), count( $subscribers ) ) ) . '</p><ol>';
	foreach ( $subscribers as $email ) {
		echo '<li>' . esc_html( $email ) . '</li>';
	}
	echo '</ol></div>';
}
