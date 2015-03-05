Skills Safari for WordPress by [Kevin Weber](http://kevinw.de/)
====================

Work in progress.

# Instruction
1. Upload the plugin to your site.
2. Move the file 'data.json' to whereever you want.
3. Edit 'data.json'.
4. Paste the required HTML into your template and setup the path to your 'data.json' file, such as:

```
<?php if ( function_exists( 'kevinw_sf' ) ) { ?>
<div class="skills-safari-wrapper">
    <h2 class="skills-safari-heading">Skills Safari by Kevin Weber</h2>
    <div id="skills-safari" data-source="<?php echo plugins_url( 'skills-safari/data.json' ) ?>"></div>
</div>
<?php } ?>
```

5. Activate the plugin.