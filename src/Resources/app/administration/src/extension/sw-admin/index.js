import template from './sw-admin.html.twig';

// Ensure the banner component is registered
import '../../component/fewiel-admin-banner';

Shopware.Component.override('sw-admin', {
    template,
});
