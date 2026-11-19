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
            'siteContent' => kls_get_site_content(),
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

    $wp_customize->add_setting( 'kls_pinterest_url', array( 'default' => 'https://www.pinterest.com/KidsLearningStudio/', 'sanitize_callback' => 'esc_url_raw' ) );
    $wp_customize->add_control( 'kls_pinterest_url', array(
        'label' => __( 'Pinterest URL', 'kids-learning-studio' ), 'section' => 'kls_donations', 'type' => 'url',
    ) );
    $wp_customize->add_setting( 'kls_telegram_url', array( 'default' => 'https://t.me/KidsLearningStudio', 'sanitize_callback' => 'esc_url_raw' ) );
    $wp_customize->add_control( 'kls_telegram_url', array(
        'label' => __( 'Telegram URL', 'kids-learning-studio' ), 'section' => 'kls_donations', 'type' => 'url',
    ) );

    $wp_customize->add_section( 'kls_home_content', array(
        'title'    => __( 'KLS Homepage Content', 'kids-learning-studio' ),
        'priority' => 161,
        'description' => __( 'Edit homepage headings and button labels in each supported language. Empty fields use the built-in text.', 'kids-learning-studio' ),
    ) );
    $home_fields = array(
        'hero_title' => array( 'Hero title', 'text' ),
        'hero_subtitle' => array( 'Hero description', 'textarea' ),
        'hero_cta_primary' => array( 'Main button label', 'text' ),
        'hero_cta_secondary' => array( 'Second button label', 'text' ),
        'popular_title' => array( 'Popular categories heading', 'text' ),
        'popular_subtitle' => array( 'Popular categories description', 'textarea' ),
        'free_title' => array( 'Free materials heading', 'text' ),
        'free_subtitle' => array( 'Free materials description', 'textarea' ),
        'featured_title' => array( 'Featured materials heading', 'text' ),
        'featured_subtitle' => array( 'Featured materials description', 'textarea' ),
    );
    foreach ( array( 'en' => 'English', 'es' => 'Español', 'ru' => 'Русский' ) as $language => $language_name ) {
        foreach ( $home_fields as $key => $field ) {
            $setting_id = 'kls_' . $language . '_' . $key;
            $wp_customize->add_setting( $setting_id, array( 'default' => '', 'sanitize_callback' => 'sanitize_textarea_field' ) );
            $wp_customize->add_control( $setting_id, array(
                'label'   => sprintf( '%1$s — %2$s', __( $field[0], 'kids-learning-studio' ), $language_name ),
                'section' => 'kls_home_content',
                'type'    => $field[1],
            ) );
        }
    }
    foreach ( array( 'kls_home_primary_url' => __( 'Main button destination (optional URL)', 'kids-learning-studio' ), 'kls_home_secondary_url' => __( 'Second button destination (optional URL)', 'kids-learning-studio' ) ) as $setting_id => $label ) {
        $wp_customize->add_setting( $setting_id, array( 'default' => '', 'sanitize_callback' => 'esc_url_raw' ) );
        $wp_customize->add_control( $setting_id, array( 'label' => $label, 'section' => 'kls_home_content', 'type' => 'url' ) );
    }
}
add_action( 'customize_register', 'kls_register_donation_customizer' );

function kls_get_site_content() {
    $home = array();
    $fields = array( 'hero_title', 'hero_subtitle', 'hero_cta_primary', 'hero_cta_secondary', 'popular_title', 'popular_subtitle', 'free_title', 'free_subtitle', 'featured_title', 'featured_subtitle' );
    foreach ( array( 'en', 'es', 'ru' ) as $language ) {
        $home[ $language ] = array();
        foreach ( $fields as $field ) {
            $home[ $language ][ $field ] = get_theme_mod( 'kls_' . $language . '_' . $field, '' );
        }
    }
    return array(
        'home' => $home,
        'homePrimaryUrl' => esc_url_raw( get_theme_mod( 'kls_home_primary_url', '' ) ),
        'homeSecondaryUrl' => esc_url_raw( get_theme_mod( 'kls_home_secondary_url', '' ) ),
        'social' => array(
            'pinterest' => esc_url_raw( get_theme_mod( 'kls_pinterest_url', 'https://www.pinterest.com/KidsLearningStudio/' ) ),
            'telegram' => esc_url_raw( get_theme_mod( 'kls_telegram_url', 'https://t.me/KidsLearningStudio' ) ),
        ),
    );
}

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
            'name'               => __( 'Learning Resources', 'kids-learning-studio' ),
            'singular_name'      => __( 'Learning Resource', 'kids-learning-studio' ),
            'add_new_item'       => __( 'Add Learning Resource', 'kids-learning-studio' ),
            'edit_item'          => __( 'Edit Learning Resource', 'kids-learning-studio' ),
            'new_item'           => __( 'New Learning Resource', 'kids-learning-studio' ),
            'view_item'          => __( 'View Learning Resource', 'kids-learning-studio' ),
            'search_items'       => __( 'Search Learning Resources', 'kids-learning-studio' ),
            'not_found'          => __( 'No learning resources found.', 'kids-learning-studio' ),
            'all_items'          => __( 'All Learning Resources', 'kids-learning-studio' ),
            'menu_name'          => __( 'Free Materials', 'kids-learning-studio' ),
        ),
        'public'       => true,
        'has_archive'  => true,
        'menu_icon'    => 'dashicons-welcome-learn-more',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'page-attributes' ),
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

    $default_categories = array(
        'coloring-pages' => 'Coloring Pages', 'math-numbers' => 'Math & Numbers',
        'alphabet-letters' => 'Alphabet & Letters', 'shapes-colors' => 'Shapes & Colors',
        'puzzles-matching' => 'Puzzles & Matching', 'fine-motor-skills' => 'Fine Motor Skills',
        'creative-activities' => 'Creative Activities',
    );
    foreach ( $default_categories as $slug => $label ) {
        if ( ! term_exists( $slug, 'resource_category' ) ) {
            wp_insert_term( $label, 'resource_category', array( 'slug' => $slug ) );
        }
    }
    foreach ( array( '2-3', '3-4', '4-5', '5-6', '2-6' ) as $age ) {
        if ( ! term_exists( $age, 'age_group' ) ) {
            wp_insert_term( $age, 'age_group', array( 'slug' => $age ) );
        }
    }
}
add_action( 'init', 'kls_register_post_types' );

/** Add a guided, multilingual publishing form to the Learning Resources editor. */
function kls_add_resource_editor_box() {
    add_meta_box(
        'kls_resource_details',
        __( 'Kids Learning Studio — Publishing Details', 'kids-learning-studio' ),
        'kls_render_resource_editor_box',
        'learning_resource',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes_learning_resource', 'kls_add_resource_editor_box' );

function kls_render_resource_editor_box( $post ) {
    wp_nonce_field( 'kls_save_resource_details', 'kls_resource_details_nonce' );
    $pdf_id = absint( get_post_meta( $post->ID, '_kls_pdf_attachment_id', true ) );
    $pdf_url = $pdf_id ? wp_get_attachment_url( $pdf_id ) : '';
    $pages = absint( get_post_meta( $post->ID, '_kls_pages', true ) );
    $file_format = get_post_meta( $post->ID, '_kls_file_format', true ) ?: 'PDF';
    $theme = get_post_meta( $post->ID, '_kls_theme', true ) ?: 'Foundations';
    $preview = get_post_meta( $post->ID, '_kls_preview_variant', true ) ?: 'bundle-mega';
    $featured = (bool) get_post_meta( $post->ID, '_kls_featured', true );
    $languages = array( 'en' => 'English', 'es' => 'Español', 'ru' => 'Русский' );
    $themes = array( 'Foundations', 'Animals', 'Space', 'Seasons', 'Everyday Life' );
    $previews = array( 'coloring-dino', 'coloring-space', 'math-counting', 'math-addition', 'alphabet-tracing', 'alphabet-phonics', 'shapes-geometry', 'shapes-colors', 'puzzles-shadow', 'puzzles-maze', 'motor-scissors', 'motor-lines', 'creative-craft', 'bundle-mega' );
    ?>
    <style>
      .kls-editor-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:16px 0}
      .kls-editor-field{display:flex;flex-direction:column;gap:6px}
      .kls-editor-field input,.kls-editor-field select,.kls-editor-field textarea{width:100%;max-width:none}
      .kls-editor-language{border:1px solid #dcdcde;border-radius:6px;padding:14px;margin:16px 0;background:#fff}
      .kls-editor-language h3{margin:0 0 12px}
      .kls-editor-help{color:#646970;font-size:12px}
    </style>
    <p class="kls-editor-help"><?php esc_html_e( 'Fill in the fields for each language. The English title, excerpt and content above are used as fallbacks.', 'kids-learning-studio' ); ?></p>
    <div class="kls-editor-grid">
      <label class="kls-editor-field"><strong><?php esc_html_e( 'Published PDF', 'kids-learning-studio' ); ?></strong>
        <input type="hidden" id="kls_resource_pdf_id" name="kls_resource_pdf_id" value="<?php echo esc_attr( $pdf_id ); ?>">
        <input type="text" id="kls_resource_pdf_url" value="<?php echo esc_attr( $pdf_url ); ?>" readonly placeholder="<?php esc_attr_e( 'Choose a PDF from the Media Library', 'kids-learning-studio' ); ?>">
        <span><button type="button" class="button" id="kls_choose_pdf"><?php esc_html_e( 'Choose PDF', 'kids-learning-studio' ); ?></button> <button type="button" class="button" id="kls_remove_pdf"><?php esc_html_e( 'Remove', 'kids-learning-studio' ); ?></button></span>
      </label>
      <label class="kls-editor-field"><strong><?php esc_html_e( 'Number of pages', 'kids-learning-studio' ); ?></strong><input type="number" min="1" name="kls_pages" value="<?php echo esc_attr( $pages ?: 1 ); ?>"></label>
      <label class="kls-editor-field"><strong><?php esc_html_e( 'File format', 'kids-learning-studio' ); ?></strong><input type="text" name="kls_file_format" value="<?php echo esc_attr( $file_format ); ?>"></label>
      <label class="kls-editor-field"><strong><?php esc_html_e( 'Learning theme', 'kids-learning-studio' ); ?></strong><select name="kls_theme"><?php foreach ( $themes as $value ) : ?><option value="<?php echo esc_attr( $value ); ?>" <?php selected( $theme, $value ); ?>><?php echo esc_html( $value ); ?></option><?php endforeach; ?></select></label>
      <label class="kls-editor-field"><strong><?php esc_html_e( 'Preview illustration', 'kids-learning-studio' ); ?></strong><select name="kls_preview_variant"><?php foreach ( $previews as $value ) : ?><option value="<?php echo esc_attr( $value ); ?>" <?php selected( $preview, $value ); ?>><?php echo esc_html( $value ); ?></option><?php endforeach; ?></select></label>
      <label class="kls-editor-field"><strong><?php esc_html_e( 'Featured on the home page', 'kids-learning-studio' ); ?></strong><span><input type="checkbox" name="kls_featured" value="1" <?php checked( $featured ); ?>> <?php esc_html_e( 'Show in Featured Activities', 'kids-learning-studio' ); ?></span></label>
    </div>
    <?php foreach ( $languages as $language => $language_name ) : ?>
      <?php $prefix = '_kls_' . $language . '_'; ?>
      <section class="kls-editor-language">
        <h3><?php echo esc_html( $language_name ); ?></h3>
        <div class="kls-editor-grid">
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Title', 'kids-learning-studio' ); ?></strong><input type="text" name="<?php echo esc_attr( $prefix ); ?>title" value="<?php echo esc_attr( get_post_meta( $post->ID, $prefix . 'title', true ) ); ?>"></label>
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Short description', 'kids-learning-studio' ); ?></strong><textarea rows="3" name="<?php echo esc_attr( $prefix ); ?>short_description"><?php echo esc_textarea( get_post_meta( $post->ID, $prefix . 'short_description', true ) ); ?></textarea></label>
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Full description', 'kids-learning-studio' ); ?></strong><textarea rows="5" name="<?php echo esc_attr( $prefix ); ?>full_description"><?php echo esc_textarea( get_post_meta( $post->ID, $prefix . 'full_description', true ) ); ?></textarea></label>
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Skills (one per line)', 'kids-learning-studio' ); ?></strong><textarea rows="4" name="<?php echo esc_attr( $prefix ); ?>skills"><?php echo esc_textarea( get_post_meta( $post->ID, $prefix . 'skills', true ) ); ?></textarea></label>
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Included items (one per line)', 'kids-learning-studio' ); ?></strong><textarea rows="4" name="<?php echo esc_attr( $prefix ); ?>included"><?php echo esc_textarea( get_post_meta( $post->ID, $prefix . 'included', true ) ); ?></textarea></label>
          <label class="kls-editor-field"><strong><?php esc_html_e( 'Sample pages (one per line: title | caption)', 'kids-learning-studio' ); ?></strong><textarea rows="4" name="<?php echo esc_attr( $prefix ); ?>samples"><?php echo esc_textarea( get_post_meta( $post->ID, $prefix . 'samples', true ) ); ?></textarea></label>
        </div>
      </section>
    <?php endforeach; ?>
    <p class="kls-editor-help"><?php esc_html_e( 'Choose the resource category and age group in the taxonomies panel. Use the Featured Image panel for the cover.', 'kids-learning-studio' ); ?></p>
    <?php
}

function kls_enqueue_resource_admin_assets( $hook ) {
    if ( ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
        return;
    }
    $screen = get_current_screen();
    if ( ! $screen || 'learning_resource' !== $screen->post_type ) {
        return;
    }
    wp_enqueue_media();
    wp_enqueue_script( 'kls-resource-admin', get_template_directory_uri() . '/assets/resource-admin.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'admin_enqueue_scripts', 'kls_enqueue_resource_admin_assets' );

function kls_save_resource_details( $post_id ) {
    if ( ! isset( $_POST['kls_resource_details_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['kls_resource_details_nonce'] ) ), 'kls_save_resource_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    $pdf_id = isset( $_POST['kls_resource_pdf_id'] ) ? absint( $_POST['kls_resource_pdf_id'] ) : 0;
    if ( $pdf_id && 'application/pdf' !== get_post_mime_type( $pdf_id ) ) {
        $pdf_id = 0;
    }
    update_post_meta( $post_id, '_kls_pdf_attachment_id', $pdf_id );
    update_post_meta( $post_id, '_kls_pages', isset( $_POST['kls_pages'] ) ? max( 1, absint( $_POST['kls_pages'] ) ) : 1 );
    update_post_meta( $post_id, '_kls_file_format', isset( $_POST['kls_file_format'] ) ? sanitize_text_field( wp_unslash( $_POST['kls_file_format'] ) ) : 'PDF' );
    update_post_meta( $post_id, '_kls_theme', isset( $_POST['kls_theme'] ) ? sanitize_text_field( wp_unslash( $_POST['kls_theme'] ) ) : 'Foundations' );
    update_post_meta( $post_id, '_kls_preview_variant', isset( $_POST['kls_preview_variant'] ) ? sanitize_key( $_POST['kls_preview_variant'] ) : 'bundle-mega' );
    update_post_meta( $post_id, '_kls_featured', isset( $_POST['kls_featured'] ) ? 1 : 0 );

    foreach ( array( 'en', 'es', 'ru' ) as $language ) {
        $prefix = 'kls_' . $language . '_';
        foreach ( array( 'title', 'short_description' ) as $key ) {
            $value = isset( $_POST[ $prefix . $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $prefix . $key ] ) ) : '';
            update_post_meta( $post_id, '_kls_' . $language . '_' . $key, $value );
        }
        foreach ( array( 'full_description', 'skills', 'included', 'samples' ) as $key ) {
            $value = isset( $_POST[ $prefix . $key ] ) ? sanitize_textarea_field( wp_unslash( $_POST[ $prefix . $key ] ) ) : '';
            update_post_meta( $post_id, '_kls_' . $language . '_' . $key, $value );
        }
    }
}
add_action( 'save_post_learning_resource', 'kls_save_resource_details' );

function kls_parse_lines( $value ) {
    $lines = preg_split( '/\r\n|\r|\n/', (string) $value );
    return array_values( array_filter( array_map( 'trim', $lines ) ) );
}

function kls_resource_samples( $value ) {
    $samples = array();
    foreach ( kls_parse_lines( $value ) as $line ) {
        $parts = array_map( 'trim', explode( '|', $line, 2 ) );
        $samples[] = array( 'title' => $parts[0], 'caption' => isset( $parts[1] ) ? $parts[1] : '' );
    }
    return $samples;
}

function kls_resource_category_id( $post_id ) {
    $terms = get_the_terms( $post_id, 'resource_category' );
    if ( empty( $terms ) || is_wp_error( $terms ) ) {
        return 'creative-activities';
    }
    $slug = sanitize_title( $terms[0]->slug );
    $known = array( 'coloring-pages', 'math-numbers', 'alphabet-letters', 'shapes-colors', 'puzzles-matching', 'fine-motor-skills', 'creative-activities' );
    return in_array( $slug, $known, true ) ? $slug : 'creative-activities';
}

function kls_resource_age_group( $post_id ) {
    $terms = get_the_terms( $post_id, 'age_group' );
    if ( empty( $terms ) || is_wp_error( $terms ) ) {
        return '2-6';
    }
    $slug = str_replace( array( '–', '—' ), '-', $terms[0]->slug );
    return in_array( $slug, array( '2-3', '3-4', '4-5', '5-6', '2-6' ), true ) ? $slug : '2-6';
}

function kls_get_resource_payload( $post ) {
    $post_id = $post->ID;
    $pdf_id = absint( get_post_meta( $post_id, '_kls_pdf_attachment_id', true ) );
    $file_path = $pdf_id ? get_attached_file( $pdf_id ) : '';
    $file_size = $file_path && file_exists( $file_path ) ? size_format( filesize( $file_path ) ) : 'PDF';
    $category = kls_resource_category_id( $post_id );
    $age = kls_resource_age_group( $post_id );
    $title_en = get_post_meta( $post_id, '_kls_en_title', true ) ?: get_the_title( $post_id );
    $short_en = get_post_meta( $post_id, '_kls_en_short_description', true ) ?: get_the_excerpt( $post_id );
    $full_en = get_post_meta( $post_id, '_kls_en_full_description', true ) ?: wp_strip_all_tags( $post->post_content );
    $skills_en = kls_parse_lines( get_post_meta( $post_id, '_kls_en_skills', true ) );
    $included_en = kls_parse_lines( get_post_meta( $post_id, '_kls_en_included', true ) );
    $samples_en = kls_resource_samples( get_post_meta( $post_id, '_kls_en_samples', true ) );
    $translations = array();
    foreach ( array( 'en', 'es', 'ru' ) as $language ) {
        $prefix = '_kls_' . $language . '_';
        $translations[ $language ] = array(
            'title'             => get_post_meta( $post_id, $prefix . 'title', true ) ?: $title_en,
            'shortDescription'  => get_post_meta( $post_id, $prefix . 'short_description', true ) ?: $short_en,
            'fullDescription'   => get_post_meta( $post_id, $prefix . 'full_description', true ) ?: $full_en,
            'skills'            => kls_parse_lines( get_post_meta( $post_id, $prefix . 'skills', true ) ) ?: ( 'en' === $language ? $skills_en : array() ),
            'whatsIncluded'     => kls_parse_lines( get_post_meta( $post_id, $prefix . 'included', true ) ) ?: ( 'en' === $language ? $included_en : array() ),
            'samplePages'       => kls_resource_samples( get_post_meta( $post_id, $prefix . 'samples', true ) ) ?: ( 'en' === $language ? $samples_en : array() ),
        );
    }
    $featured_image = get_the_post_thumbnail_url( $post_id, 'large' );
    $url = get_permalink( $post_id );
    return array(
        'id'              => 'wp-' . $post_id,
        'slug'            => $post->post_name,
        'title'           => $title_en,
        'shortDescription'=> $short_en,
        'fullDescription' => $full_en,
        'category'        => $category,
        'ageGroup'        => $age,
        'theme'           => get_post_meta( $post_id, '_kls_theme', true ) ?: 'Foundations',
        'isFree'          => true,
        'price'           => 0,
        'pages'           => absint( get_post_meta( $post_id, '_kls_pages', true ) ) ?: 1,
        'fileCount'       => $pdf_id ? 1 : 0,
        'fileFormat'      => get_post_meta( $post_id, '_kls_file_format', true ) ?: 'PDF',
        'fileSize'        => $file_size,
        'skills'          => $skills_en,
        'whatsIncluded'   => $included_en,
        'samplePages'     => $samples_en,
        'downloadCount'   => absint( get_post_meta( $post_id, '_kls_download_count', true ) ),
        'createdAt'       => get_post_time( 'c', true, $post_id ),
        'featured'        => (bool) get_post_meta( $post_id, '_kls_featured', true ),
        'previewVariant'  => get_post_meta( $post_id, '_kls_preview_variant', true ) ?: 'bundle-mega',
        'translations'    => $translations,
        'thumbnailUrl'    => $featured_image ?: '',
        'downloadUrl'     => $pdf_id ? rest_url( 'kls/v1/resources/' . $post_id . '/download' ) : '',
        'wordpressUrl'    => $url,
    );
}

function kls_register_resource_routes() {
    register_rest_route( 'kls/v1', '/resources', array(
        'methods' => 'GET',
        'callback' => 'kls_get_resources_endpoint',
        'permission_callback' => '__return_true',
    ) );
    register_rest_route( 'kls/v1', '/resources/(?P<id>\d+)/download', array(
        'methods' => 'GET',
        'callback' => 'kls_download_resource_endpoint',
        'permission_callback' => '__return_true',
        'args' => array( 'id' => array( 'validate_callback' => 'is_numeric' ) ),
    ) );
}
add_action( 'rest_api_init', 'kls_register_resource_routes' );

function kls_get_resources_endpoint() {
    $posts = get_posts( array( 'post_type' => 'learning_resource', 'post_status' => 'publish', 'numberposts' => 100, 'orderby' => array( 'menu_order' => 'ASC', 'date' => 'DESC' ) ) );
    $posts = array_filter( $posts, function ( $post ) {
        $pdf_id = absint( get_post_meta( $post->ID, '_kls_pdf_attachment_id', true ) );
        return $pdf_id && 'application/pdf' === get_post_mime_type( $pdf_id );
    } );
    return rest_ensure_response( array_map( 'kls_get_resource_payload', $posts ) );
}

function kls_download_resource_endpoint( WP_REST_Request $request ) {
    $post_id = absint( $request['id'] );
    $post = get_post( $post_id );
    $pdf_id = absint( get_post_meta( $post_id, '_kls_pdf_attachment_id', true ) );
    $url = $pdf_id ? wp_get_attachment_url( $pdf_id ) : false;
    if ( ! $post || 'learning_resource' !== $post->post_type || 'publish' !== $post->post_status || ! $url || 'application/pdf' !== get_post_mime_type( $pdf_id ) ) {
        return new WP_Error( 'kls_pdf_not_found', 'This PDF is not available.', array( 'status' => 404 ) );
    }
    update_post_meta( $post_id, '_kls_download_count', absint( get_post_meta( $post_id, '_kls_download_count', true ) ) + 1 );
    wp_redirect( esc_url_raw( $url ), 302 );
    exit;
}

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

function kls_resource_admin_columns( $columns ) {
    $columns['kls_download_count'] = __( 'Downloads', 'kids-learning-studio' );
    return $columns;
}
add_filter( 'manage_learning_resource_posts_columns', 'kls_resource_admin_columns' );

function kls_render_resource_admin_column( $column, $post_id ) {
    if ( 'kls_download_count' === $column ) {
        echo esc_html( absint( get_post_meta( $post_id, '_kls_download_count', true ) ) );
    }
}
add_action( 'manage_learning_resource_posts_custom_column', 'kls_render_resource_admin_column', 10, 2 );
