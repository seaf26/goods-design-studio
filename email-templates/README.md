# Traffodata client delivery email

`client-delivery.html` is the branded master template for sending project
deliveries, contracts, software access, files, credentials, and next steps.
`client-delivery.txt` is its plain-text companion.

The design uses a 600px email-safe table layout, live editable text, an original
Traffodata hero, a mobile layout, and a VML background fallback for desktop
Outlook. It is intended for direct client communication, not newsletters.

## Required fields

Replace every placeholder before sending:

| Placeholder                | Content                                  |
| -------------------------- | ---------------------------------------- |
| `{{preheader}}`            | Short inbox preview text                 |
| `{{client_name}}`          | Recipient name                           |
| `{{email_title}}`          | Delivery headline                        |
| `{{delivery_type}}`        | Hero label, such as Contract delivery    |
| `{{project_name}}`         | Client-facing project name               |
| `{{intro_message}}`        | Concise handoff summary                  |
| `{{delivery_status}}`      | Current status, such as Ready for review |
| `{{delivery_date}}`        | Human-readable delivery date             |
| `{{project_reference}}`    | Internal or shared project reference     |
| `{{primary_action_label}}` | Main action label                        |
| `{{primary_action_url}}`   | Main absolute HTTPS action URL           |
| `{{support_note}}`         | Contact or support guidance              |

## Optional module fields

### Contract

- `{{contract_name}}`
- `{{contract_reference}}`
- `{{contract_url}}`

### Software access

- `{{software_name}}`
- `{{login_url}}`
- `{{username}}`

### Credentials

- `{{password_setup_url}}` for the recommended secure setup link
- `{{temporary_password}}` only when a temporary password is approved
- `{{password_expiry}}` for the temporary password expiry

### Files and resources

- `{{resource_1_name}}` and `{{resource_1_url}}`
- `{{resource_2_name}}` and `{{resource_2_url}}`
- `{{resource_3_name}}` and `{{resource_3_url}}`

### Next steps

- `{{next_step_1}}`, `{{next_step_2}}`, and `{{next_step_3}}`
- `{{next_step_owner}}`
- `{{next_step_deadline}}`

## Removing modules

Optional HTML sections are enclosed by matching comments such as
`OPTIONAL CONTRACT START` and `OPTIONAL CONTRACT END`. Remove the complete block,
including its outer `<tr>`, when that section is not needed. Do the same between
the matching optional markers in `client-delivery.txt`.

Do not leave empty placeholders in a sent email. Keep either the secure setup
module or the temporary password module unless both are genuinely needed.

For an attachment-only contract email, remove the `OPTIONAL PRIMARY_ACTION`
and `OPTIONAL CONTRACT_LINK` blocks. Keep them only when their URLs open a
secure HTTPS copy of the agreement.

## Forsa Logistics contract email

Use the reusable master with these values for the current agreement:

| Placeholder              | Value                                          |
| ------------------------ | ---------------------------------------------- |
| `{{delivery_type}}`      | Contract delivery                              |
| `{{project_name}}`       | Forsa Logistics                                |
| `{{email_title}}`        | Your agreement is ready.                       |
| `{{delivery_status}}`    | Ready for signature                            |
| `{{delivery_date}}`      | 10 September 2026                              |
| `{{contract_name}}`      | Forsa Logistics Software Development Agreement |
| `{{contract_reference}}` | Effective 10 September 2026                    |

Suggested introduction:

> We have prepared the software development agreement for your review. Please
> read the terms and confirm the project details so we can proceed with the
> signature and project start.

Keep the contract and next-steps modules. Remove software access, secure setup,
temporary password, and resources. Attach
`Forsa Logistics Software Development Agreement Arabic Final.docx` separately
in Zoho Mail. Do not save the client document inside the reusable template.

## Credential safety

Use a single-use secure setup link whenever possible. The temporary password
module is a fallback and must always include an expiry. Require the recipient to
change that password after the first sign-in. Never reuse passwords, place
long-lived secrets in the template, or send production credentials to a shared
mailbox.

## Assets and links

The HTML expects these deployed assets:

- `https://traffodata.com/email-assets/client-delivery-hero.jpg`
- `https://traffodata.com/email-assets/traffodata-email-mark.png`
- `https://traffodata.com/email-assets/traffodata-email-logo.png`

All links must be absolute HTTPS URLs. Deploy the website after changing an
asset, then confirm all asset URLs return successfully before sending a test
message. The template is not send-ready while any hosted asset returns 404.

## Add to Zoho Mail

1. Deploy the website assets and confirm every hosted asset URL opens.
2. Open `client-delivery.html`, keep its placeholders, and remove only modules
   you never want in the reusable contract version.
3. In Zoho Mail, choose **New Mail**, open the formatting options, select
   **HTML**, and paste the template source.
4. Set the subject to `Traffodata - Client Contract Delivery`.
5. Open the menu beside **Save Draft** and choose **Save Template**. Zoho saves
   it in the Templates folder under All Templates.
6. For the Forsa email, start a new message and insert
   `Traffodata - Client Contract Delivery` from **Insert Template**.
7. Replace every placeholder with the Forsa values above and remove any unused
   optional module. Do not leave curly-brace placeholders in the message.
8. Click the attachment icon and select
   `Forsa Logistics Software Development Agreement Arabic Final.docx` from the
   desktop. Add it after inserting the reusable template.
9. Verify the recipient, subject, attachment, links, and visible content. Send a
   test to yourself before sending the client message.

Zoho notes that **Save Template** is available for Zoho IMAP accounts. If that
option is unavailable, create the template through **Insert Template**, then
choose **New template** instead.

Zoho documentation:

- https://www.zoho.com/mail/help/sending-mails.html
- https://www.zoho.com/mail/help/using-templates.html
- https://www.zoho.com/mail/help/attachments.html

## Local verification

Run:

```sh
npm run test:email
```

The check validates required placeholders, module boundaries, email-safe markup,
hosted assets, the Outlook fallback, contact details, and hero dimensions.
