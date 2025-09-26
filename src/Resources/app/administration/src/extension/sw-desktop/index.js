import template from './sw-desktop.html.twig';

// Ensure the banner component is registered
import '../../component/fewiel-admin-banner';

Shopware.Component.override('sw-desktop', {
    template,
});
