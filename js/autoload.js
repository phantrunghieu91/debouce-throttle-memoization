/**
 * Loads a script dynamically by creating a script element and appending it to the document head.
 * @param {string} scriptSrc - The source URL of the script to be loaded.
 * @param {string} [type] - The type of the script. (Optional)
 */
export function autoloadScript(scriptSrc, type) {
  const script = document.createElement('script');
  script.src = scriptSrc;
  if(type) script.type = type;
  script.addEventListener('load', function () {
    console.log(`${scriptSrc} has been loaded.`);
  });
  document.head.appendChild(script);
}