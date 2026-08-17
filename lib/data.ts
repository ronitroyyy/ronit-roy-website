// Site Navigation
export const siteNav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Impact", href: "#impact" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Tools", href: "#tools" },
];

// Impact Metrics
export const impactMetrics = [
  {
    value: "$65M+",
    label: "Revenue Opportunity",
    description: "Identified through market-gap and commercial opportunity analysis across APAC.",
  },
  {
    value: "2×",
    label: "YoY GTV Growth",
    description: "Supported analytics-led sales initiatives contributing to significant year-over-year growth.",
  },
  {
    value: "80%",
    label: "Dormant Business Recovered",
    description: "Reactivated dormant partners through segmentation, prioritization and targeted re-engagement.",
  },
  {
    value: "15.7%",
    label: "ROI Improvement",
    description: "Improved commercial efficiency through data-led sales and performance optimization.",
  },
];

// Career Timeline
export const careerTimeline = [
  {
    id: "current",
    company: "TBO.com",
    title: "Manager – Sales Effectiveness",
    dates: "July 2024 – Present",
    description:
      "Leading analytics-driven sales effectiveness initiatives focused on revenue growth, opportunity prioritization and performance optimization across APAC markets.",
    achievements: [
      "Supported 2× YoY GTV growth through analytics-led sales initiatives",
      "Developed commercial intelligence frameworks for data-driven decision making",
      "Implemented sales effectiveness metrics and performance management systems",
    ],
    tools: ["SQL", "Power BI", "Python", "Excel"],
    isCurrent: true,
  },
  {
    id: "associate",
    company: "TBO.com",
    title: "Associate Manager – Sales Effectiveness",
    dates: "June 2022 – June 2024",
    description:
      "Developed analytical frameworks for partner growth, revenue opportunity analysis and sales performance management.",
    achievements: [
      "Identified $65M+ revenue opportunity across APAC markets",
      "Designed and executed dormant partner recovery program (80% recovery rate)",
      "Built analytical models for opportunity prioritization and sales effectiveness",
    ],
    tools: ["SQL", "Power BI", "Python", "Excel"],
    isCurrent: false,
  },
  {
    id: "better",
    company: "Better.com",
    title: "Business Analyst – Disclosure Audit",
    dates: "July 2021 – May 2022",
    description:
      "Conducted business and disclosure audits, data analysis and process optimization.",
    achievements: [
      "Executed comprehensive audit and reporting initiatives",
      "Developed data analysis frameworks for business intelligence",
    ],
    tools: ["SQL", "Excel", "Python"],
    isCurrent: false,
  },
];

// Education
export const education = [
  {
    degree: "MA in Economics",
    institution: "Ashoka University",
    dates: "2019–2021",
    field: "Economics",
  },
];

// Skills Framework
export const skillsFramework = {
  strategy: [
    "Growth Strategy",
    "Sales Effectiveness",
    "Commercial Analytics",
    "Revenue Analysis",
    "Performance Management",
    "Opportunity Prioritization",
    "ROI Analysis",
  ],
  analytics: [
    "SQL",
    "Python",
    "R",
    "Statistics",
    "Cohort Analysis",
    "Segmentation",
    "Predictive Modeling",
    "Data-Driven Decision Making",
  ],
  tools: [
    "Power BI",
    "Excel",
    "Metabase",
    "Dashboarding",
    "KPI Frameworks",
    "Automated Reporting",
  ],
};

// Work Initiatives
export const workInitiatives = [
  {
    number: "01",
    category: "REVENUE GROWTH · APAC",
    title: "APAC Commercial Growth & Revenue Opportunity",
    metric: "$65M+",
    metricLabel: "Revenue Opportunity",
    oneliner: "Built market opportunity framework across 12 APAC markets.",
    context:
      "APAC markets operated without clear visibility into where meaningful revenue opportunities existed — missing gaps between market demand, competitive positioning, and internal partner capability across 12+ countries.",
    whatIOwned:
      "Owned the development of a market opportunity framework combining demand analysis, competitive positioning, and partner capability assessment across APAC. Built the analytical models, led cross-functional alignment with commercial teams, and established the prioritization framework for opportunity pursuit.",
    approach:
      "Analyzed market demand data, competitive positioning and partner capability across 12+ APAC markets. Built segmentation and prioritization models to identify high-impact revenue opportunities.",
    whatChanged:
      "$65M+ in unrealized revenue opportunity identified and validated across APAC markets, with clear market-by-market and account-level priorities for commercial teams to pursue.",
    tools: ["SQL", "Excel", "Power BI"],
  },
  {
    number: "02",
    category: "PARTNER GROWTH · RETENTION",
    title: "Dormant Partner Recovery & Reactivation",
    metric: "80%",
    metricLabel: "Dormant Business Recovered",
    oneliner: "Reactivated dormant partners through segmentation and prioritization.",
    context:
      "A significant portion of the partner base had remained inactive for 12+ months — representing both lost revenue and an untapped pool of businesses that could be brought back to growth with the right approach.",
    whatIOwned:
      "Owned partner segmentation strategy by recovery potential and business value. Designed the re-engagement program, built the prioritization logic, and worked with the commercial team to structure the outreach and reactivation approach for different partner tiers.",
    approach:
      "Segmented dormant partners by historical value and recovery potential. Built probability models to identify highest-likelihood reactivations. Designed tiered engagement strategy.",
    whatChanged:
      "80% of dormant partners successfully reactivated, recovering meaningful incremental GTV and proving the business case for a proactive retention and reactivation framework.",
    tools: ["Python", "SQL", "Power BI"],
  },
  {
    number: "03",
    category: "GTV GROWTH · SALES EFFECTIVENESS",
    title: "Analytics-Led Sales Effectiveness & GTV Growth",
    metric: "2×",
    metricLabel: "YoY GTV Growth Supported",
    oneliner: "Built analytics systems supporting GTV growth initiatives.",
    context:
      "Scaling GTV required moving beyond reactive sales activity to a data-driven approach that identified where sales effort could create the highest commercial impact and how sales productivity could systematically improve.",
    whatIOwned:
      "Owned the analytics strategy for sales effectiveness, developing performance frameworks, opportunity prioritization models, and executive dashboards for growth tracking. Built the systems and analytical approaches that enabled sales teams to focus on highest-impact opportunities.",
    approach:
      "Developed sales effectiveness metrics, opportunity prioritization algorithms and performance frameworks. Built executive dashboards for real-time visibility into GTV progress and performance drivers.",
    whatChanged:
      "Supported analytics-led initiatives that contributed to 2× YoY GTV growth objectives, with sales teams now operating against clear opportunity prioritization and performance visibility at market, segment, and account levels.",
    tools: ["SQL", "Power BI", "Excel", "Python"],
  },
  {
    number: "04",
    category: "COMMERCIAL INTELLIGENCE · BI",
    title: "Commercial Intelligence & Performance Systems",
    metric: "15.7%",
    metricLabel: "ROI Improvement",
    oneliner: "Built integrated commercial intelligence and performance dashboards.",
    context:
      "Commercial teams needed real-time visibility into performance, sales effectiveness, opportunity gaps, and commercial health — but were working from disconnected data sources and manual reporting that slowed decision-making.",
    whatIOwned:
      "Owned the design and build of the commercial intelligence layer — architecting integrated dashboards, establishing metrics definitions, and creating analytical frameworks that brought performance, revenue, sales, and market data into a single decision-making system.",
    approach:
      "Consolidated performance data from multiple sources. Defined core commercial metrics and KPIs. Built integrated dashboards for real-time visibility. Established automated reporting frameworks.",
    whatChanged:
      "Commercial teams gained unified visibility into performance and opportunity, enabling faster, more confident decisions. Measured through a 15.7% improvement in commercial ROI through more efficient capital allocation and targeted growth investments.",
    tools: ["Power BI", "SQL", "Excel", "Metabase"],
  },
];

// How I Work Framework
export const hoWIWorkFramework = [
  {
    step: "01",
    title: "Understand",
    description: "Frame the business problem. Clarify what we're solving and why it matters.",
  },
  {
    step: "02",
    title: "Analyze",
    description: "Turn data into insight. Find patterns, validate hypotheses, remove guessing.",
  },
  {
    step: "03",
    title: "Prioritize",
    description: "Find the leverage point. What one thing creates disproportionate impact?",
  },
  {
    step: "04",
    title: "Execute",
    description: "Work with stakeholders to turn insight into action and business outcome.",
  },
  {
    step: "05",
    title: "Measure",
    description: "Track the outcome, learn from results, and continuously refine.",
  },
];
