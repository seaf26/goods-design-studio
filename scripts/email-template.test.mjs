import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlPath = resolve("email-templates/client-delivery.html");
const textPath = resolve("email-templates/client-delivery.txt");
const forsaHtmlPath = resolve("email-templates/ready-to-send/forsa-logistics-contract.html");
const paymentHtmlPath = resolve("email-templates/payment-received.html");
const paymentTextPath = resolve("email-templates/payment-received.txt");
const forsaPaymentHtmlPath = resolve(
  "email-templates/ready-to-send/forsa-logistics-milestone-1-payment-received.html",
);
const heroPath = resolve("public/email-assets/client-delivery-hero.jpg");
const logoPath = resolve("public/email-assets/traffodata-email-logo.png");
const markPath = resolve("public/email-assets/traffodata-email-mark.png");

assert.ok(existsSync(htmlPath), "Client delivery HTML email template must exist");
assert.ok(existsSync(textPath), "Client delivery plain-text email template must exist");
assert.ok(existsSync(forsaHtmlPath), "Ready-to-send Forsa contract email must exist");
assert.ok(existsSync(paymentHtmlPath), "Payment-received HTML email template must exist");
assert.ok(existsSync(paymentTextPath), "Payment-received plain-text email template must exist");
assert.ok(existsSync(forsaPaymentHtmlPath), "Ready-to-send Forsa payment email must exist");
assert.ok(existsSync(heroPath), "Client delivery hero asset must exist");
assert.ok(existsSync(logoPath), "Cropped email wordmark must exist");
assert.ok(existsSync(markPath), "Cropped email mark must exist");
assert.ok(
  !existsSync(resolve("email-templates/general-client.html")),
  "Retired general client HTML template must be removed",
);
assert.ok(
  !existsSync(resolve("email-templates/general-client.txt")),
  "Retired general client text template must be removed",
);

const html = readFileSync(htmlPath, "utf8");
const text = readFileSync(textPath, "utf8");
const forsaHtml = readFileSync(forsaHtmlPath, "utf8");
const paymentHtml = readFileSync(paymentHtmlPath, "utf8");
const paymentText = readFileSync(paymentTextPath, "utf8");
const forsaPaymentHtml = readFileSync(forsaPaymentHtmlPath, "utf8");
const hero = readFileSync(heroPath);
const logo = existsSync(logoPath) ? readFileSync(logoPath) : Buffer.alloc(0);
const mark = existsSync(markPath) ? readFileSync(markPath) : Buffer.alloc(0);

const requiredFields = [
  "{{preheader}}",
  "{{client_name}}",
  "{{email_title}}",
  "{{delivery_type}}",
  "{{project_name}}",
  "{{intro_message}}",
  "{{delivery_status}}",
  "{{delivery_date}}",
  "{{project_reference}}",
  "{{contract_name}}",
  "{{contract_reference}}",
  "{{contract_url}}",
  "{{software_name}}",
  "{{login_url}}",
  "{{username}}",
  "{{password_setup_url}}",
  "{{temporary_password}}",
  "{{password_expiry}}",
  "{{resource_1_name}}",
  "{{resource_1_url}}",
  "{{resource_2_name}}",
  "{{resource_2_url}}",
  "{{resource_3_name}}",
  "{{resource_3_url}}",
  "{{next_step_1}}",
  "{{next_step_2}}",
  "{{next_step_3}}",
  "{{next_step_owner}}",
  "{{next_step_deadline}}",
  "{{primary_action_label}}",
  "{{primary_action_url}}",
  "{{support_note}}",
];

for (const field of requiredFields) {
  assert.ok(html.includes(field), `HTML template is missing ${field}`);
  assert.ok(text.includes(field), `Plain-text template is missing ${field}`);
}

for (const moduleName of [
  "PRIMARY_ACTION",
  "CONTRACT",
  "CONTRACT_LINK",
  "SOFTWARE_ACCESS",
  "SECURE_SETUP",
  "TEMPORARY_PASSWORD",
  "RESOURCES",
  "NEXT_STEPS",
]) {
  assert.ok(
    html.includes(`OPTIONAL ${moduleName} START`) && html.includes(`OPTIONAL ${moduleName} END`),
    `${moduleName} module must have removable boundaries`,
  );
}

function withoutModule(source, moduleName) {
  const pattern = new RegExp(
    `\\s*<!-- OPTIONAL ${moduleName} START:[\\s\\S]*?<!-- OPTIONAL ${moduleName} END -->`,
    "g",
  );
  const result = source.replace(pattern, "");
  assert.notEqual(result, source, `${moduleName} module must be removable as one complete block`);
  return result;
}

const secureCredentialVariant = withoutModule(html, "TEMPORARY_PASSWORD");
assert.ok(secureCredentialVariant.includes("{{password_setup_url}}"));
assert.ok(!secureCredentialVariant.includes("{{temporary_password}}"));

const temporaryCredentialVariant = withoutModule(html, "SECURE_SETUP");
assert.ok(temporaryCredentialVariant.includes("{{temporary_password}}"));
assert.ok(!temporaryCredentialVariant.includes("{{password_setup_url}}"));

const withoutOptionalModules = [
  "PRIMARY_ACTION",
  "CONTRACT",
  "SOFTWARE_ACCESS",
  "SECURE_SETUP",
  "TEMPORARY_PASSWORD",
  "RESOURCES",
  "NEXT_STEPS",
].reduce(withoutModule, html);
assert.ok(withoutOptionalModules.includes("{{project_name}}"));
assert.ok(withoutOptionalModules.includes("mailto:info@traffodata.com"));
assert.match(withoutOptionalModules, /<\/html>\s*$/i);

assert.match(html, /<table[^>]+role="presentation"/i, "Email layout must use presentation tables");
assert.match(
  html,
  /@media\s+only screen and \(max-width:\s*599px\)/i,
  "Email must include the approved mobile breakpoint",
);
assert.match(
  html,
  /@media\s+only screen and \(min-width:\s*600px\) and \(max-width:\s*624px\)/i,
  "Email must protect the narrow desktop boundary from outer padding overflow",
);
assert.match(html, /class="outer-cell"/i, "Email shell must expose its responsive outer cell");
assert.match(html, /<v:rect\b/i, "Hero must include an Outlook VML fallback");
assert.match(
  html,
  /<v:fill[^>]+src="https:\/\/traffodata\.com\/email-assets\/client-delivery-hero\.jpg"/i,
  "Outlook hero must use the hosted Traffodata background",
);
assert.match(
  html,
  /https:\/\/traffodata\.com\/email-assets\/client-delivery-hero\.jpg/i,
  "Email must use the hosted Traffodata delivery hero",
);
assert.match(
  html,
  /https:\/\/traffodata\.com\/email-assets\/traffodata-email-logo\.png/i,
  "Email must use the tightly cropped hosted email wordmark",
);
assert.match(
  html,
  /https:\/\/traffodata\.com\/email-assets\/traffodata-email-mark\.png/i,
  "Email hero must use the tightly cropped hosted brand mark",
);
assert.match(html, /mailto:info@traffodata\.com/i, "Email must use the Traffodata contact address");
assert.match(
  html,
  /Secure setup link \(recommended\)/i,
  "Secure credential delivery must be preferred",
);
assert.match(
  readFileSync(resolve("email-templates/README.md"), "utf8"),
  /Traffodata - Client Contract Delivery/,
  "Zoho instructions must provide the reusable contract template name",
);
assert.match(
  html,
  /change this password after your first sign-in/i,
  "Temporary credentials must include a mandatory change warning",
);
assert.match(html, /mso-hide:\s*all/i, "Preheader must stay hidden in Word-based Outlook clients");

assert.deepEqual([...hero.subarray(0, 3)], [0xff, 0xd8, 0xff], "Hero asset must be a JPEG");

function readJpegDimensions(buffer) {
  let offset = 2;
  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    if (startOfFrameMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    const segmentLength = buffer.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }

  throw new Error("Could not read JPEG dimensions");
}

const heroDimensions = readJpegDimensions(hero);
assert.equal(heroDimensions.width, 1200, "Hero asset must be 1200px wide");
assert.ok(
  heroDimensions.height >= 760,
  "Hero asset must have enough height for the live-text crop",
);
assert.ok(hero.length < 350_000, "Hero asset must stay below 350KB for email delivery");
assert.equal(logo.subarray(1, 4).toString("ascii"), "PNG", "Email wordmark must be a PNG");
assert.ok(logo.readUInt32BE(16) / logo.readUInt32BE(20) > 3, "Email wordmark must use a wide crop");
assert.ok(logo.length < 100_000, "Email wordmark must stay below 100KB");
assert.equal(mark.subarray(1, 4).toString("ascii"), "PNG", "Email mark must be a PNG");
assert.ok(mark.length < 50_000, "Email mark must stay below 50KB");

assert.doesNotMatch(
  html,
  /<(script|form|video|canvas)\b/i,
  "Email must avoid unsupported interactive elements",
);
assert.doesNotMatch(html, /noonlab/i, "Reference-template branding must not remain");
assert.doesNotMatch(
  html,
  /src="(?:images\/|\.\/|\.\.\/)/i,
  "Email images must not use relative URLs",
);
assert.doesNotMatch(html, /[—–]/, "Visible email copy must not use em or en dashes");
assert.doesNotMatch(text, /[—–]/, "Plain-text email copy must not use em or en dashes");

const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
assert.ok(imageTags.length > 0, "Email must contain the Traffodata logo");
for (const image of imageTags) {
  assert.match(image, /\balt="[^"]+"/i, "Every email image must have descriptive alt text");
  assert.match(image, /\bsrc="https:\/\//i, "Every email image must use an absolute HTTPS URL");
}

assert.doesNotMatch(forsaHtml, /\{\{[^}]+\}\}/, "Forsa email must not contain placeholders");
assert.match(forsaHtml, /Hello Ahmed,/i, "Forsa email must address the client");
assert.match(forsaHtml, /Forsa Logistics/i, "Forsa email must identify the project");
assert.match(forsaHtml, /Ready for signature/i, "Forsa email must show the contract status");
assert.match(
  forsaHtml,
  /https:\/\/traffodata\.com\/email-assets\/client-delivery-hero\.jpg/i,
  "Forsa email must use the production hero asset",
);
assert.doesNotMatch(
  forsaHtml,
  /127\.0\.0\.1|localhost/i,
  "Forsa email must not reference local preview assets",
);
for (const removedModule of [
  "PRIMARY_ACTION",
  "CONTRACT_LINK",
  "SOFTWARE_ACCESS",
  "SECURE_SETUP",
  "TEMPORARY_PASSWORD",
  "RESOURCES",
]) {
  assert.ok(
    !forsaHtml.includes(`OPTIONAL ${removedModule} START`),
    `Forsa email must not include the ${removedModule} module`,
  );
}

for (const field of [
  "{{preheader}}",
  "{{client_name}}",
  "{{project_name}}",
  "{{email_title}}",
  "{{milestone_name}}",
  "{{payment_amount}}",
  "{{payment_date}}",
  "{{payment_reference}}",
  "{{intro_message}}",
  "{{next_step_message}}",
  "{{support_note}}",
]) {
  assert.ok(paymentHtml.includes(field), `Payment HTML template is missing ${field}`);
  assert.ok(paymentText.includes(field), `Payment text template is missing ${field}`);
}
assert.match(
  paymentHtml,
  /https:\/\/traffodata\.com\/email-assets\/client-delivery-hero\.jpg/i,
  "Payment email must use the production hero asset",
);
assert.match(
  paymentHtml,
  /mailto:info@traffodata\.com/i,
  "Payment email must use the Traffodata contact address",
);
assert.doesNotMatch(
  paymentHtml,
  /password|software access|open secure document/i,
  "Payment email must not include delivery or credential modules",
);

assert.doesNotMatch(
  forsaPaymentHtml,
  /\{\{[^}]+\}\}/,
  "Forsa payment email must not contain placeholders",
);
assert.match(forsaPaymentHtml, /Hello Ahmed,/i, "Forsa payment email must address the client");
assert.match(forsaPaymentHtml, /EGP 33,000/i, "Forsa payment email must show the confirmed amount");
assert.match(
  forsaPaymentHtml,
  /9 September 2026/i,
  "Forsa payment email must show the received date",
);
assert.match(
  forsaPaymentHtml,
  /First milestone/i,
  "Forsa payment email must identify the milestone",
);
assert.doesNotMatch(
  forsaPaymentHtml,
  /127\.0\.0\.1|localhost/i,
  "Forsa payment email must not reference local preview assets",
);

console.log("Client delivery email template verified");
