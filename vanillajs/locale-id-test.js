var shadowRoot = null;
class SimpleWebComponent extends HTMLElement {
  constructor() {
    super();
    const languageDisplayNames = { fr: "French", "en-US": "English(US)" };
    const languageAPI = UWF.API.Language.init();
    const currentLocale = languageAPI.getCurrentLocale();

    this.innerHTML = getTemplate(currentLocale, languageDisplayNames);
  }
}
// Define Web Component
customElements.define("locale-id-test", SimpleWebComponent);
// Returns html to use in component
function getTemplate(locale, displayNames) {
  return `
    <div class='neo-widget' style='height:100%'>
      <div class='neo-widget__header'>Locale API Test</div>
      <div id="widget_body">
        <h4>Current Language: ${displayNames[locale]}</h4>
        <h4>Locale ID: ${locale}</h4>
      </div>
    </div>
    <style>
    #widget_body {
        padding:10px;
    }
    </style>`;
}
