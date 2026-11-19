<?php
/**
 * Kids Learning Studio Theme Functions
 *
 * @package Kids_Learning_Studio
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function kls_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'kids-learning-studio' ),
        'footer'  => __( 'Footer Menu', 'kids-learning-studio' ),
    ) );
}
add_action( 'after_setup_theme', 'kls_theme_setup' );

function kls_enqueue_assets() {
    $theme_uri = get_template_directory_uri();
    $theme_dir = get_template_directory();
    $version   = '1.1.0';
    $js_files  = glob( $theme_dir . '/assets/index-*.js' );
    $css_files = glob( $theme_dir . '/assets/index-*.css' );

    wp_enqueue_style(
        'kls-google-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    if ( ! empty( $css_files ) ) {
        $css_file = basename( $css_files[0] );
        wp_enqueue_style( 'kls-app-style', $theme_uri . '/assets/' . $css_file, array(), filemtime( $css_files[0] ) );
    }

    if ( ! empty( $js_files ) ) {
        $js_file = basename( $js_files[0] );
        wp_enqueue_script( 'kls-app-script', $theme_uri . '/assets/' . $js_file, array(), filemtime( $js_files[0] ), true );
        wp_localize_script( 'kls-app-script', 'klsConfig', array(
            'restUrl' => esc_url_raw( rest_url() ),
            'nonce'   => wp_create_nonce( 'wp_rest' ),
            'donationUrl' => esc_url_raw( get_theme_mod( 'kls_donation_url', '' ) ),
        ) );
    }
}
add_action( 'wp_enqueue_scripts', 'kls_enqueue_assets' );

function kls_add_module_attribute( $tag, $handle, $src ) {
    if ( 'kls-app-script' === $handle ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>' . "\n";
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'kls_add_module_attribute', 10, 3 );

function kls_register_donation_customizer( $wp_customize ) {
    $wp_customize->add_section( 'kls_donations', array(
        'title'    => __( 'KLS Donations', 'kids-learning-studio' ),
        'priority' => 160,
    ) );
    $wp_customize->add_setting( 'kls_donation_url', array( 'sanitize_callback' => 'esc_url_raw' ) );
    $wp_customize->add_control( 'kls_donation_url', array(
        'label'       => __( 'Donation page URL', 'kids-learning-studio' ),
        'description' => __( 'Link to your payment provider donation page (PayPal, Buy Me a Coffee, etc.).', 'kids-learning-studio' ),
        'section'     => 'kls_donations',
        'type'        => 'url',
    ) );
}
add_action( 'customize_register', 'kls_register_donation_customizer' );

/** Store newsletter opt-ins in WordPress without requiring visitor accounts. */
function kls_register_newsletter_endpoint() {
    register_rest_route( 'kls/v1', '/newsletter', array(
        'methods'             => 'POST',
        'callback'            => 'kls_save_newsletter_subscription',
        'permission_callback' => '__return_true',
        'args'                => array(
            'email' => array( 'required' => true, 'sanitize_callback' => 'sanitize_email' ),
        ),
    ) );
    register_rest_route( 'kls/v1', '/contact', array(
        'methods'             => 'POST',
        'callback'            => 'kls_send_contact_message',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'kls_register_newsletter_endpoint' );

function kls_save_newsletter_subscription( WP_REST_Request $request ) {
    $email = sanitize_email( $request->get_param( 'email' ) );
    if ( ! is_email( $email ) ) {
        return new WP_Error( 'kls_invalid_email', 'Enter a valid email address.', array( 'status' => 400 ) );
    }
    $subscribers = get_option( 'kls_newsletter_subscribers', array() );
    if ( ! in_array( strtolower( $email ), array_map( 'strtolower', $subscribers ), true ) ) {
        $subscribers[] = $email;
        update_option( 'kls_newsletter_subscribers', $subscribers, false );
    }
    return new WP_REST_Response( array( 'subscribed' => true ), 200 );
}

/** Send a contact form message to the administrator email configured in WordPress. */
function kls_send_contact_message( WP_REST_Request $request ) {
    // Honeypot: quietly accept bot submissions without sending email.
    if ( ! empty( $request->get_param( 'website' ) ) ) {
        return new WP_REST_Response( array( 'sent' => true ), 200 );
    }

    $ip       = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
    $rate_key = 'kls_contact_' . md5( $ip );
    $attempts = (int) get_transient( $rate_key );
    if ( $attempts >= 4 ) {
        return new WP_Error( 'kls_contact_rate_limited', 'Please wait a minute before sending another message.', array( 'status' => 429 ) );
    }
    set_transient( $rate_key, $attempts + 1, MINUTE_IN_SECONDS );

    $name    = sanitize_text_field( $request->get_param( 'name' ) );
    $email   = sanitize_email( $request->get_param( 'email' ) );
    $topic   = sanitize_text_field( $request->get_param( 'topic' ) );
    $message = sanitize_textarea_field( $request->get_param( 'message' ) );

    if ( '' === $name || ! is_email( $email ) || '' === $topic || '' === $message ) {
        return new WP_Error( 'kls_contact_invalid', 'Please complete all fields with a valid email address.', array( 'status' => 400 ) );
    }

    $body = "Name: {$name}\nEmail: {$email}\nTopic: {$topic}\n\n{$message}";
    $sent = wp_mail( get_option( 'admin_email' ), 'New message from klstudio.org', $body, array( 'Reply-To: ' . $name . ' <' . $email . '>' ) );
    if ( ! $sent ) {
        return new WP_Error( 'kls_contact_mail_failed', 'The message could not be delivered. Please try again later.', array( 'status' => 500 ) );
    }

    return new WP_REST_Response( array( 'sent' => true ), 200 );
}

/**
 * Register Learning Resource Custom Post Type & Taxonomies for WordPress Admin
 */
function kls_register_post_types() {
    register_post_type( 'learning_resource', array(
        'labels' => array(
            'name'          => __( 'Learning Resources', 'kids-learning-studio' ),
            'singular_name' => __( 'Learning Resource', 'kids-learning-studio' ),
        ),
        'public'       => true,
        'has_archive'  => true,
        'menu_icon'    => 'dashicons-welcome-learn-more',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest' => true,
        'rewrite'      => array( 'slug' => 'resources' ),
    ) );

    register_taxonomy( 'resource_category', 'learning_resource', array(
        'label'        => __( 'Resource Categories', 'kids-learning-studio' ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ) );

    register_taxonomy( 'age_group', 'learning_resource', array(
        'label'        => __( 'Age Groups', 'kids-learning-studio' ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ) );
}
add_action( 'init', 'kls_register_post_types' );

/**
 * Serve theme SPA routes cleanly without 404 headers
 */
function kls_spa_route_fallback( $template ) {
    if ( is_404() ) {
        $path = trim( parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ), '/' );
        $prefixes = array( 'free-resources', 'resources', 'blog', 'about', 'contact', 'faq', 'support', 'privacy', 'cookies', 'terms', 'studio-admin' );
        foreach ( $prefixes as $prefix ) {
            if ( $path === $prefix || strpos( $path, $prefix . '/' ) === 0 ) {
                status_header( 200 );
                return get_template_directory() . '/index.php';
            }
        }
    }
    return $template;
}
add_filter( 'template_include', 'kls_spa_route_fallback' );
