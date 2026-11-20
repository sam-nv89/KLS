<?php
/**
 * Title: Latest Free Printable Resources
 * Slug: kids-learning-studio-block/free-resources
 * Categories: kls-sections, query
 * Description: A dynamic grid of published free learning resources.
 * Viewport Width: 1280
 */
?>
<!-- wp:group {"align":"wide","layout":{"type":"constrained"}} --><div class="wp-block-group alignwide">
<!-- wp:heading --><h2 class="wp-block-heading">Free Learning Resources</h2><!-- /wp:heading -->
<!-- wp:paragraph {"textColor":"muted"} --><p class="has-muted-color has-text-color">Instant printable PDFs. No sign-up required.</p><!-- /wp:paragraph -->
<!-- wp:query {"query":{"perPage":6,"pages":0,"offset":0,"postType":"learning_resource","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"displayLayout":{"type":"flex","columns":3}} -->
<div class="wp-block-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"style":{"border":{"radius":"16px","color":"#E5E2D9","width":"1px"},"spacing":{"padding":"1rem"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-border-color has-white-background-color has-background" style="border-color:#E5E2D9;border-width:1px;border-radius:16px;padding:1rem"><!-- wp:post-featured-image {"isLink":true,"aspectRatio":"4/3","style":{"border":{"radius":"12px"}}} /--><!-- wp:post-terms {"term":"resource_category","separator":" · ","textColor":"muted","fontSize":"small"} /--><!-- wp:post-title {"isLink":true,"level":3,"fontSize":"large"} /--><!-- wp:post-excerpt {"excerptLength":20,"moreText":"Read more →"} /--><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/resources/">View free resource</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:group -->
<!-- /wp:post-template -->
<!-- wp:query-no-results --><!-- wp:paragraph --><p>New free materials are coming soon. Please check back!</p><!-- /wp:paragraph --><!-- /wp:query-no-results -->
<!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} --><!-- wp:query-pagination-previous /--><!-- wp:query-pagination-numbers /--><!-- wp:query-pagination-next /--><!-- /wp:query-pagination -->
</div><!-- /wp:query -->
</div><!-- /wp:group -->
