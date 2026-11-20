# Kids Learning Studio Block Theme

Native WordPress block theme for WordPress 6.7+. The public site is built from core Gutenberg blocks, block templates, template parts, patterns, and `theme.json` v3. It does not require Elementor, Astra, Tailwind, Bootstrap, React, or a separate runtime.

## Install

1. In WordPress, open **Appearance → Themes → Add New Theme → Upload Theme**.
2. Upload `kids-learning-studio-block-theme.zip` and activate **Kids Learning Studio Block**.
3. On first activation, the theme creates any missing starter pages and two navigation entities, sets the static front page and posts page, and leaves any existing pages untouched.
4. Add a site logo under **Appearance → Editor → Styles / Site Identity** and set a donation destination under **Appearance → Customize → Kids Learning Studio**.
5. Add a material under **Free Materials → Add Free Material**. Upload its PDF in Media, choose it in the Printable PDF panel, set categories and age, add a featured image, then publish.

The automatic setup runs once per site. It does not overwrite pages that already exist with the same slugs. Before activating any theme on a production site, create a backup.

## Editing

- Edit global colors, typography, layout, buttons, header, footer, and templates in **Appearance → Editor**.
- Insert reusable Kids Learning Studio sections from the **Kids Learning Studio** pattern category.
- Edit or remove the starter page sections in the regular Pages editor.
- Free Materials are WordPress custom post types. Their PDF downloads are counted in the admin list.
- Newsletter opt-ins are stored in WordPress and listed on the **Newsletter** admin page.
- Contact email is sent to the administrator email configured in WordPress. Confirm that the host has working mail delivery before launch.

## Current scope notes

- The starter copy in this FSE theme is English. A complete English/Spanish/Russian content migration needs translated WordPress page entries (or an explicitly selected multilingual plugin); WordPress core does not translate page content automatically.
- Ad placement locations and a third-party ad network are not configured. Connect an ad provider only after its account, privacy consent, and placement code have been supplied.
- Donation links and legal-policy copy must be configured/reviewed by the site owner.
- The theme can be installed alongside the earlier React theme; activating it switches the site's presentation to the block theme.
