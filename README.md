# FewielAdminBanner

A Shopware 6.7 plugin that displays a thin configurable banner at the top of the Administration interface.  
Useful to highlight staging/test environments or provide important context to users working in the backend.

## Compatibility
- Shopware version: ^6.7

## Features
- Adds a thin banner at the top of the Shopware Administration.
- Banner text and background color can be configured via plugin settings.
- Configuration changes are applied immediately after saving (no rebuild required).
- Text color adjusts automatically (black/white) depending on background brightness.


## Installation

1. Copy the plugin into your Shopware installation:

   ```bash
   custom/plugins/FewielAdminBanner/
   ```
2. Install and activate the plugin:

   ```bash
   bin/console plugin:refresh
   bin/console plugin:install --activate FewielAdminBanner
   ```
3. Build the Administration frontend once:

   ```bash
   bin/build-administration.sh
   bin/console cache:clear
   ```
   

## Configuration
- Navigate to Your Extensions
- Click on "Configuration"
- Configure:
  - Banner text → Text shown in the banner.
  - Background color → HEX (#ff0000), RGB, or a CSS color name.
- Save Settings
- Reload Administration to see changes.

Changes to plugin settings do not require a rebuild, only a hard reload of the Admin page.
