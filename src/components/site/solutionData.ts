import type { Locale } from "@/lib/i18n";

export type SolutionMarket = "egypt" | "gcc";

type SolutionCopy = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  directAnswer: string;
  servicesHeading: string;
  services: { title: string; description: string }[];
  questionsHeading: string;
  questions: { question: string; answer: string }[];
  workHeading: string;
  sourcesHeading: string;
  sourcesNote: string;
  nextHeading: string;
  nextText: string;
  contactLabel: string;
  otherMarketLabel: string;
};

type Reference = {
  href: string;
  label: Record<Locale, string>;
};

type SolutionPageData = {
  path: string;
  copy: Record<Locale, SolutionCopy>;
  work: Reference[];
  sources: Reference[];
};

export const solutionPages: Record<SolutionMarket, SolutionPageData> = {
  egypt: {
    path: "/solutions/egypt",
    copy: {
      en: {
        title: "Custom business software in Egypt | TRAFFODATA",
        description:
          "Custom operational software for Egypt: connect commerce, inventory, logistics, finance, and the teams that run them. See our work and practical integration guidance.",
        eyebrow: "Egypt software solutions",
        heading: "Software shaped around the work behind the screen.",
        intro:
          "For Egyptian teams that have outgrown spreadsheets, separate storefronts, and manual handoffs, we design and build owned operational systems around the actual order, stock, and approval flow.",
        directAnswer:
          "Start with one workflow that crosses teams: for example, an order from checkout through stock reservation, fulfillment, delivery, and reconciliation. Map its exceptions and system owners first. Then decide which parts to connect, buy, or build.",
        servicesHeading: "What we can design and build",
        services: [
          {
            title: "Connected commerce and inventory",
            description:
              "Unify catalog, orders, stock movements, returns, and customer state so teams act on the same record.",
          },
          {
            title: "Warehouse and logistics workflows",
            description:
              "Make receiving, picking, dispatch, exceptions, and delivery status visible to the people who own each step.",
          },
          {
            title: "Business integrations and handover",
            description:
              "Define API boundaries, data ownership, retries, and support. Assess any tax-document integration against current Egyptian Tax Authority guidance with the business's advisors.",
          },
        ],
        questionsHeading: "Common questions",
        questions: [
          {
            question: "When should an Egyptian business build custom software?",
            answer:
              "When a repeated, valuable workflow cannot be run reliably in existing tools and the workarounds are measurable. A first release should solve one bounded operational problem, not attempt to replace every system at once.",
          },
          {
            question: "Can existing systems connect to e-invoicing or e-receipts?",
            answer:
              "The Egyptian Tax Authority publishes APIs for taxpayer systems. Whether and how they apply depends on the business, its registration and obligations, and the current technical specifications. We scope the data flow before implementation.",
          },
          {
            question: "What should the first release include?",
            answer:
              "A named owner, the essential roles and decisions, a clear source of truth, exception handling, acceptance checks, and a handover path. Add secondary modules after the core workflow is proven with real operators.",
          },
        ],
        workHeading: "Relevant project work",
        sourcesHeading: "Official integration reference",
        sourcesNote:
          "This source documents available interfaces; it is not a claim that TRAFFODATA is a certified tax provider. Confirm current requirements with qualified local advisors.",
        nextHeading: "Map the operation before commissioning the platform.",
        nextText:
          "Bring one broken handoff, the systems involved, and the people who own it. We can turn that into a practical first-release scope.",
        contactLabel: "Discuss an Egypt project",
        otherMarketLabel: "Explore GCC solutions",
      },
      ar: {
        title: "برمجيات أعمال مخصصة في مصر | TRAFFODATA",
        description:
          "برمجيات تشغيلية مخصصة للشركات في مصر تربط التجارة والمخزون واللوجستيات والمالية والفرق. اطلع على أعمالنا وإرشادات التكامل العملية.",
        eyebrow: "حلول برمجية في مصر",
        heading: "برمجيات تُبنى حول العمل الحقيقي خلف الشاشة.",
        intro:
          "للفرق المصرية التي تجاوزت الجداول والمتاجر المنفصلة والتسليمات اليدوية، نصمم ونبني أنظمة تشغيلية مملوكة للشركة حول تدفق الطلب والمخزون والموافقات الفعلي.",
        directAnswer:
          "ابدأ بتدفق عمل واحد يعبر الفرق، مثل الطلب من الدفع إلى حجز المخزون والتجهيز والتوصيل والتسوية. حدد الاستثناءات ومسؤولية كل نظام أولا، ثم قرر ما الذي يجب ربطه أو شراؤه أو بناؤه.",
        servicesHeading: "ما الذي يمكننا تصميمه وبناؤه؟",
        services: [
          {
            title: "تجارة ومخزون مترابطان",
            description:
              "اربط الكتالوج والطلبات وحركات المخزون والمرتجعات وحالة العميل حتى تعمل الفرق على سجل واحد.",
          },
          {
            title: "تدفقات المستودعات واللوجستيات",
            description:
              "اجعل الاستلام والالتقاط والشحن والاستثناءات وحالة التوصيل واضحة لمن يملك كل خطوة.",
          },
          {
            title: "تكاملات الأعمال وتسليم النظام",
            description:
              "حدد حدود الواجهات وملكية البيانات وإعادة المحاولة والدعم. قيّم أي تكامل للمستندات الضريبية وفق إرشادات مصلحة الضرائب المصرية الحالية مع مستشاري الشركة.",
          },
        ],
        questionsHeading: "أسئلة شائعة",
        questions: [
          {
            question: "متى تحتاج شركة مصرية إلى برنامج مخصص؟",
            answer:
              "عندما يتعذر تشغيل عملية متكررة ومهمة بثبات عبر الأدوات الحالية، وتصبح تكلفة الحلول الالتفافية قابلة للقياس. ينبغي أن يحل الإصدار الأول مشكلة تشغيلية محددة، لا أن يستبدل كل الأنظمة دفعة واحدة.",
          },
          {
            question: "هل يمكن ربط الأنظمة الحالية بالفاتورة أو الإيصال الإلكتروني؟",
            answer:
              "تنشر مصلحة الضرائب المصرية واجهات برمجة لأنظمة الممولين. يعتمد انطباقها وطريقة استخدامها على الشركة وتسجيلها والتزاماتها والمواصفات الحالية. نحدد تدفق البيانات قبل التنفيذ.",
          },
          {
            question: "ماذا يجب أن يتضمن الإصدار الأول؟",
            answer:
              "مالك واضح للعملية والأدوار والقرارات الأساسية ومصدر بيانات موثوق ومعالجة للاستثناءات ومعايير قبول وخطة تسليم. أضف الوحدات الثانوية بعد اختبار التدفق الأساسي مع المشغلين الحقيقيين.",
          },
        ],
        workHeading: "أعمال ذات صلة",
        sourcesHeading: "مرجع رسمي للتكامل",
        sourcesNote:
          "يوثق هذا المصدر الواجهات المتاحة؛ ولا يعني أن TRAFFODATA مزود ضريبي معتمد. تحقق من المتطلبات الحالية مع مستشارين محليين مؤهلين.",
        nextHeading: "ارسم العملية قبل تكليف فريق ببناء المنصة.",
        nextText:
          "أحضر نقطة تسليم متعثرة والأنظمة المعنية والأشخاص المسؤولين عنها. يمكننا تحويلها إلى نطاق عملي للإصدار الأول.",
        contactLabel: "ناقش مشروعا في مصر",
        otherMarketLabel: "استكشف حلول الخليج",
      },
    },
    work: [
      {
        href: "/work/elnasser-backend-dashboard",
        label: { en: "Elnasser backend and logistics engine", ar: "نظام الناصر الخلفي واللوجستي" },
      },
      {
        href: "/work/wikifood-commerce-delivery-backend",
        label: {
          en: "WikiFood commerce and delivery backend",
          ar: "نظام WikiFood للتجارة والتوصيل",
        },
      },
    ],
    sources: [
      {
        href: "https://sdk.invoicing.eta.gov.eg/api/",
        label: {
          en: "Egyptian Tax Authority: eInvoicing and eReceipt APIs",
          ar: "مصلحة الضرائب المصرية: واجهات الفاتورة والإيصال الإلكتروني",
        },
      },
    ],
  },
  gcc: {
    path: "/solutions/gcc",
    copy: {
      en: {
        title: "Custom operational software for GCC businesses | TRAFFODATA",
        description:
          "Operational software for GCC teams: shared workflows with country-specific payment, delivery, language, and tax-document integrations. See work and official references.",
        eyebrow: "GCC software solutions",
        heading: "One operating core. Country-specific edges.",
        intro:
          "A regional business needs shared control over orders, inventory, permissions, and reporting while respecting the different partners and requirements of each market. We design that boundary before writing integrations.",
        directAnswer:
          "Use a shared operational model for the business, then scope each country's payment, delivery, language, and tax-document requirements separately. Do not assume a single GCC compliance integration; check the current Saudi and UAE guidance where those markets are in scope.",
        servicesHeading: "What we can design and build",
        services: [
          {
            title: "Regional order and stock control",
            description:
              "Keep common product, order, inventory, and permission rules visible across markets while preserving local variations.",
          },
          {
            title: "Country-specific integrations",
            description:
              "Separate payment, delivery, and tax-document adapters by market so one provider change does not rewrite the operating core.",
          },
          {
            title: "Arabic and English operations",
            description:
              "Design role-based interfaces, records, and handover workflows for teams working across languages and locations.",
          },
        ],
        questionsHeading: "Common questions",
        questions: [
          {
            question: "Can one system serve multiple GCC markets?",
            answer:
              "Yes, a shared core can handle common operational records, but local rules and partners should be modeled as separate interfaces. Start with the markets and workflows actually in scope.",
          },
          {
            question: "Is there one GCC e-invoicing integration?",
            answer:
              "No. Saudi ZATCA and the UAE Ministry of Finance publish separate guidance and technical requirements. Scope the applicable country, business obligation, provider, and current interface before building.",
          },
          {
            question: "Where should a regional rollout begin?",
            answer:
              "Pilot one market and one end-to-end flow with real operators. Validate data ownership, language needs, exception handling, and reporting before extending the same core to another market.",
          },
        ],
        workHeading: "Relevant project work",
        sourcesHeading: "Official country references",
        sourcesNote:
          "These authorities publish their own current requirements. TRAFFODATA does not claim certification or approval by them; confirm applicability with local advisors and providers.",
        nextHeading: "Start with the market and workflow you can verify.",
        nextText:
          "Tell us which country, systems, and handoffs are in scope. We can define the shared core and the local integration boundaries.",
        contactLabel: "Discuss a GCC project",
        otherMarketLabel: "Explore Egypt solutions",
      },
      ar: {
        title: "برمجيات تشغيلية مخصصة لشركات الخليج | TRAFFODATA",
        description:
          "برمجيات تشغيلية لفرق الخليج تجمع التدفقات المشتركة مع تكاملات الدفع والتوصيل واللغة والمستندات الضريبية الخاصة بكل دولة.",
        eyebrow: "حلول برمجية للخليج",
        heading: "نواة تشغيلية واحدة. وتفاصيل خاصة بكل سوق.",
        intro:
          "تحتاج الشركة الإقليمية إلى تحكم مشترك في الطلبات والمخزون والصلاحيات والتقارير، مع احترام الشركاء والمتطلبات المختلفة في كل سوق. نصمم هذا الحد الفاصل قبل بناء التكاملات.",
        directAnswer:
          "استخدم نموذجا تشغيليا مشتركا للشركة، ثم حدد متطلبات الدفع والتوصيل واللغة والمستندات الضريبية لكل دولة على حدة. لا تفترض وجود تكامل امتثال واحد لكل الخليج؛ راجع الإرشادات الحالية للسعودية والإمارات عندما تكونان ضمن النطاق.",
        servicesHeading: "ما الذي يمكننا تصميمه وبناؤه؟",
        services: [
          {
            title: "تحكم إقليمي في الطلبات والمخزون",
            description:
              "اجعل قواعد المنتجات والطلبات والمخزون والصلاحيات المشتركة واضحة عبر الأسواق مع الحفاظ على الاختلافات المحلية.",
          },
          {
            title: "تكاملات خاصة بكل دولة",
            description:
              "افصل موصلات الدفع والتوصيل والمستندات الضريبية حسب السوق، حتى لا يفرض تغيير مزود واحد إعادة بناء النواة التشغيلية.",
          },
          {
            title: "تشغيل بالعربية والإنجليزية",
            description:
              "صمم الواجهات والسجلات وتدفقات التسليم بحسب الأدوار لفرق تعمل بلغات ومواقع مختلفة.",
          },
        ],
        questionsHeading: "أسئلة شائعة",
        questions: [
          {
            question: "هل يمكن لنظام واحد خدمة أكثر من سوق خليجي؟",
            answer:
              "نعم، يمكن لنواة مشتركة إدارة السجلات التشغيلية العامة، لكن ينبغي نمذجة القواعد والشركاء المحليين كواجهات منفصلة. ابدأ بالأسواق والتدفقات التي تدخل فعلا في نطاق العمل.",
          },
          {
            question: "هل يوجد تكامل فوترة إلكترونية واحد لكل الخليج؟",
            answer:
              "لا. تنشر هيئة الزكاة والضريبة والجمارك السعودية ووزارة المالية الإماراتية إرشادات ومتطلبات تقنية منفصلة. حدد الدولة والالتزام والمزود والواجهة الحالية قبل البناء.",
          },
          {
            question: "من أين يبدأ إطلاق نظام إقليمي؟",
            answer:
              "اختبر سوقا واحدا وتدفقا كاملا واحدا مع مشغلين حقيقيين. تحقق من ملكية البيانات واحتياجات اللغة والاستثناءات والتقارير قبل توسيع النواة نفسها إلى سوق آخر.",
          },
        ],
        workHeading: "أعمال ذات صلة",
        sourcesHeading: "مراجع رسمية لكل دولة",
        sourcesNote:
          "تنشر كل جهة متطلباتها الحالية. لا تدعي TRAFFODATA اعتمادا أو موافقة من هذه الجهات؛ تحقق من انطباق المتطلبات مع مستشارين ومزودين محليين.",
        nextHeading: "ابدأ بالسوق وتدفق العمل اللذين تستطيع التحقق منهما.",
        nextText:
          "أخبرنا بالدولة والأنظمة ونقاط التسليم المطلوبة. يمكننا تحديد النواة المشتركة وحدود التكامل المحلي.",
        contactLabel: "ناقش مشروعا خليجيا",
        otherMarketLabel: "استكشف حلول مصر",
      },
    },
    work: [
      {
        href: "/work/wikifood-commerce-delivery-backend",
        label: {
          en: "WikiFood commerce and delivery backend",
          ar: "نظام WikiFood للتجارة والتوصيل",
        },
      },
      {
        href: "/work/forsa-logistics-website",
        label: { en: "Forsa logistics website", ar: "موقع فورصة للخدمات اللوجستية" },
      },
    ],
    sources: [
      {
        href: "https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Pages/default.aspx",
        label: {
          en: "Saudi ZATCA: e-invoicing guidance",
          ar: "السعودية: إرشادات الفوترة الإلكترونية من هيئة الزكاة والضريبة والجمارك",
        },
      },
      {
        href: "https://mof.gov.ae/en/about-us/initiatives/einvoicing/",
        label: {
          en: "UAE Ministry of Finance: e-invoicing guidance",
          ar: "الإمارات: إرشادات الفوترة الإلكترونية من وزارة المالية",
        },
      },
    ],
  },
};
