import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

import { BlurText } from "./BlurText";
import { Footer, Nav, Reveal } from "./Landing";
import { sendContactInquiry } from "@/lib/api/contact.functions";

type ContactErrors = Partial<Record<"name" | "email" | "services" | "message", string>>;
type SubmissionState = "idle" | "sending" | "sent" | "manual" | "error";

const services = [
  "ERP platform",
  "Inventory and warehouse",
  "POS and commerce",
  "Accounting workflows",
  "CRM and AI",
  "Custom software",
  "Not sure yet",
];

const contactMethods = [
  {
    label: "Email",
    value: "hello@traffodata.com",
    href: "mailto:hello@traffodata.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "Schedule by email",
    href: "mailto:hello@traffodata.com?subject=Call%20request",
    icon: PhoneCall,
  },
  {
    label: "Region",
    value: "Dubai operations",
    href: "mailto:hello@traffodata.com?subject=Dubai%20operations",
    icon: MapPin,
  },
];

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const mailtoHref = useMemo(() => {
    const subject =
      selectedServices.length > 0
        ? `TRAFFODATA inquiry: ${selectedServices.join(", ")}`
        : "TRAFFODATA inquiry";
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      selectedServices.length > 0 ? `Services: ${selectedServices.join(", ")}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:hello@traffodata.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [company, email, message, name, selectedServices]);

  const toggleService = (item: string) => {
    setSelectedServices((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setSelectedServices([]);
    setMessage("");
    setWebsite("");
    setErrors({});
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ContactErrors = {};
    if (!name.trim()) nextErrors.name = "Add your name so we know who to reply to.";
    if (!validateEmail(email)) nextErrors.email = "Use a valid work email address.";
    if (selectedServices.length === 0) nextErrors.services = "Choose at least one area.";
    if (message.trim().length < 20)
      nextErrors.message = "Write at least 20 characters about the work.";

    setErrors(nextErrors);
    setSubmissionState("idle");

    if (nextErrors.name) nameRef.current?.focus();
    else if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.services) servicesRef.current?.focus();
    else if (nextErrors.message) messageRef.current?.focus();

    if (Object.keys(nextErrors).length > 0) return;

    setSubmissionState("sending");
    try {
      const result = await sendContactInquiry({
        data: {
          name,
          email,
          company: company.trim() || undefined,
          services: selectedServices,
          message,
          website,
        },
      });

      if (result.ok) {
        clearForm();
        setSubmissionState("sent");
        return;
      }

      if (result.reason === "manual-email") {
        setSubmissionState("manual");
        return;
      }

      setSubmissionState("error");
    } catch (error) {
      console.error(error);
      setSubmissionState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <section className="relative overflow-hidden pt-28 md:pt-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_78%_8%,rgba(115,136,223,0.24),transparent_42%)]" />
          <div className="relative mx-auto grid max-w-[92rem] gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
                  <MessageCircle className="h-3.5 w-3.5 text-primary" />
                  Contact us
                </div>
                <BlurText
                  as="h1"
                  text="Bring us the workflow that keeps slowing the business down."
                  className="mt-7 max-w-4xl font-display text-[clamp(3.1rem,6.2vw,5.9rem)] font-bold leading-[0.94] tracking-[-0.052em] text-balance"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="lg:pb-2">
                <BlurText
                  as="p"
                  text="Tell us what is breaking, what is growing, and what needs to connect. We will map the first useful conversation."
                  delay={0.12}
                  className="max-w-xl text-[16px] leading-[1.68] text-[var(--muted-foreground)] md:text-[18px]"
                />
                <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={method.label}
                        href={method.href}
                        className="group rounded-2xl bg-white p-4 ring-1 ring-[var(--hairline)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface)] text-primary ring-1 ring-[var(--hairline)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="mt-5 block text-[12px] font-medium text-[var(--muted-foreground)]">
                          {method.label}
                        </span>
                        <span className="mt-1 block text-[14px] font-semibold text-[var(--ink)]">
                          {method.value}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="mx-auto grid max-w-[92rem] gap-6 px-5 sm:px-6 lg:grid-cols-[0.64fr_0.36fr]">
            <Reveal>
              <form
                noValidate
                onSubmit={onSubmit}
                className="rounded-[1.5rem] bg-white p-5 ring-1 ring-[var(--hairline)] sm:p-7 lg:p-8"
              >
                {submissionState === "sent" ? (
                  <div
                    aria-live="polite"
                    className="mb-6 flex items-start gap-3 rounded-2xl bg-primary/10 p-4 text-[14px] text-[var(--ink)] ring-1 ring-primary/20"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      Inquiry sent. We will review the workflow and reply with the right next step.
                    </span>
                  </div>
                ) : null}

                {submissionState === "manual" || submissionState === "error" ? (
                  <div
                    aria-live="polite"
                    className="mb-6 rounded-2xl bg-[var(--surface)] p-4 text-[14px] text-[var(--ink)] ring-1 ring-[var(--hairline)]"
                  >
                    <span className="font-semibold">
                      {submissionState === "manual"
                        ? "Email sending is not configured yet."
                        : "The message could not be sent."}
                    </span>{" "}
                    <a
                      href={mailtoHref}
                      className="font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Send it by email instead.
                    </a>
                  </div>
                ) : null}

                <div aria-hidden="true" className="hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13px] font-semibold text-[var(--ink)]"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      ref={nameRef}
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="mt-2 h-12 w-full rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 text-[15px] text-[var(--ink)] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(115,136,223,0.16)]"
                    />
                    {errors.name ? (
                      <p
                        id="contact-name-error"
                        className="mt-2 text-[12px] font-medium text-red-600"
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13px] font-semibold text-[var(--ink)]"
                    >
                      Work email
                    </label>
                    <input
                      id="contact-email"
                      ref={emailRef}
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="mt-2 h-12 w-full rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 text-[15px] text-[var(--ink)] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(115,136,223,0.16)]"
                    />
                    {errors.email ? (
                      <p
                        id="contact-email-error"
                        className="mt-2 text-[12px] font-medium text-red-600"
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-[13px] font-semibold text-[var(--ink)]"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      autoComplete="organization"
                      className="mt-2 h-12 w-full rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 text-[15px] text-[var(--ink)] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(115,136,223,0.16)]"
                    />
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="text-[13px] font-semibold text-[var(--ink)]">
                    What do you need help with?
                  </legend>
                  <p
                    id="contact-services-help"
                    className="mt-1 text-[12px] text-[var(--muted-foreground)]"
                  >
                    Choose one or more. We will route the conversation.
                  </p>
                  <div
                    ref={servicesRef}
                    tabIndex={-1}
                    aria-invalid={Boolean(errors.services)}
                    aria-describedby={
                      errors.services ? "contact-services-error" : "contact-services-help"
                    }
                    className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {services.map((item) => {
                      const selected = selectedServices.includes(item);
                      return (
                        <label
                          key={item}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-[13px] font-semibold transition-[border-color,background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] ${
                            selected
                              ? "border-primary bg-primary/10 text-[var(--ink)]"
                              : "border-[var(--hairline)] bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--ink)]"
                          }`}
                        >
                          <input
                            name="services"
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleService(item)}
                            className="h-4 w-4 accent-[#333da7]"
                          />
                          {item}
                        </label>
                      );
                    })}
                  </div>
                  {errors.services ? (
                    <p
                      id="contact-services-error"
                      className="mt-2 text-[12px] font-medium text-red-600"
                    >
                      {errors.services}
                    </p>
                  ) : null}
                </fieldset>

                <div className="mt-5">
                  <label
                    htmlFor="contact-message"
                    className="block text-[13px] font-semibold text-[var(--ink)]"
                  >
                    What should we understand first?
                  </label>
                  <textarea
                    id="contact-message"
                    ref={messageRef}
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : "contact-message-help"
                    }
                    rows={7}
                    className="mt-2 w-full resize-y rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-3 text-[15px] leading-[1.55] text-[var(--ink)] outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(115,136,223,0.16)]"
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      className="mt-2 text-[12px] font-medium text-red-600"
                    >
                      {errors.message}
                    </p>
                  ) : (
                    <p
                      id="contact-message-help"
                      className="mt-2 text-[12px] text-[var(--muted-foreground)]"
                    >
                      Share the workflow, deadline, systems involved, and what a useful first call
                      should answer.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submissionState === "sending"}
                  aria-disabled={submissionState === "sending"}
                  className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[14px] font-semibold text-white transition-[transform,background-color,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#333da7] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submissionState === "sending" ? "Sending inquiry" : "Send inquiry"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="h-full overflow-hidden rounded-[1.5rem] bg-black text-white ring-1 ring-black/10">
                <div className="relative min-h-[24rem] p-6 sm:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(115,136,223,0.36),transparent_34%),linear-gradient(145deg,#141724,#030409)]" />
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:46px_46px]" />
                  <div className="relative flex min-h-[24rem] flex-col justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/14">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <BlurText
                        as="h2"
                        text="What happens next."
                        className="font-display text-[clamp(2rem,4vw,4.1rem)] font-bold leading-[0.96] tracking-[-0.05em] text-balance"
                      />
                      <div className="mt-7 divide-y divide-white/12">
                        {[
                          "We review the operational context and reply with the right next step.",
                          "If there is fit, we map systems, users, risks, and the first release boundary.",
                          "You leave the first conversation with a clearer path, not a generic proposal.",
                        ].map((item) => (
                          <BlurText
                            key={item}
                            as="p"
                            text={item}
                            delay={0.08}
                            className="py-4 text-[14px] leading-[1.65] text-white/70"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
