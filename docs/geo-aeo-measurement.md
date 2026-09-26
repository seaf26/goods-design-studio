# GEO/AEO measurement for TRAFFODATA

This is a measurement setup, not a claim that TRAFFODATA currently appears in AI answers. Begin the baseline after the new pages are deployed and indexed.

## Signals available now

| Signal                                                | Where to read it                                                                                                                                         | What it means                                                                                                                                              |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generative AI impressions in Google Search            | [Search Console property](https://search.google.com/search-console?resource_id=https%3A%2F%2Ftraffodata.com%2F), Search Generative AI performance report | Google-reported visibility for AI Overviews and AI Mode; inspect pages, countries, dates, and devices. The dedicated report does not show clicks or queries. |
| Search visibility by page and query                   | Search Console Performance > Web                                                                                                                         | Broader discovery, including clicks and queries for the new solution pages and guides; it cannot isolate AI-feature clicks.                                |
| Known assistant referrals                             | Vercel Analytics custom event `ai_referral_visit`                                                                                                        | Visits with a recognized ChatGPT, Perplexity, Gemini, Copilot, or Claude referrer or matching `utm_source`. The event stores only source and landing path. |
| Contact conversions from those visits                 | Vercel Analytics custom event `contact_submit_success`, property `ai_source`                                                                             | Successful contact submissions within 30 minutes of a recognized assistant referral, without an intervening direct or non-assistant entry.                 |
| Inclusion as a cited source in other answer engines   | Manual prompt log below                                                                                                                                  | A sampled observation, never a comprehensive citation count.                                                                                               |

Google says its generative AI reports were rolled out worldwide by August 31, 2026: [Search Generative AI performance report announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports). The [current report help](https://support.google.com/webmasters/answer/16984139) specifies impressions and the available dimensions. If the property UI does not show the report, record that as unavailable rather than interpreting it as zero visibility.

## Weekly check after deployment

1. Confirm `/solutions/egypt`, `/solutions/gcc`, `/ar/solutions/egypt`, and `/ar/solutions/gcc` are indexed in Search Console. Check representative Arabic guide URLs too.
2. Record Google generative AI impressions by page and country, using the same seven-day window each week. Compare with the preceding seven days and the 28-day trend. Review clicks and queries in the separate Web performance report, but do not label them AI-specific.
3. Review `ai_referral_visit` grouped by `source` and `landing_path`; review `contact_submit_success` grouped by `ai_source`. A missing referrer, direct visit, or Google AI Overview click will not necessarily be labeled by the site event.
4. Sample the prompt set below in the products and locales that matter. Record whether TRAFFODATA is cited, the exact cited URL, and the date. Do not treat an uncited generated answer as proof that a page was not retrieved.
5. If a page is indexed but earns no relevant impressions, improve its evidence and the answer to the buyer's question before adding more schema or repeating keywords.

## Prompt sample

Run the exact same wording on each check; record the answer engine and locale separately.

| Market            | Prompt                                                                            |
| ----------------- | --------------------------------------------------------------------------------- |
| Egypt, Arabic     | ما الذي أبحث عنه عند اختيار برنامج إدارة مستودعات في مصر؟                         |
| Egypt, Arabic     | متى تحتاج شركة مصرية إلى نظام أعمال مخصص بدلا من برنامج جاهز؟                     |
| Egypt, English    | How should an Egyptian ecommerce company connect storefront, stock, and delivery? |
| GCC, Arabic       | كيف أصمم نظام تشغيل للشركة يعمل في السعودية والإمارات مع اختلاف التكاملات؟        |
| GCC, English      | What should I check before building Saudi or UAE e-invoicing integrations?        |
| Delivery, English | Who should own custom software after launch?                                      |

Use a private log with columns: `date`, `engine`, `locale`, `prompt`, `TRAFFODATA cited?`, `cited URL`, `notes`. Store only observations; do not fill past dates with estimates.

## Interpretation limits

- Assistant referral headers can be omitted, and URL parameters can be copied or altered. The classifier is a conservative directional signal, not a complete attribution model. Each recognized external arrival counts as a new referral visit; an internal navigation retains its source for up to 30 minutes, while a direct or other external entry clears it.
- Google Search referrals generally do not distinguish a normal result from an AI feature in browser referrer data. Search Console's dedicated report provides AI impressions, but not AI clicks or queries.
- Structured data must match visible content. Google does not require special GEO markup or an `llms.txt` file for its AI Search features: [Google's AI Search guidance](https://developers.google.com/search/docs/appearance/ai-features), [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- A new page, direct answer, or citation link cannot guarantee indexing, a rich result, or inclusion in generated answers.
