// Content and data for Ronit Roy's professional portfolio

export const siteNav = [
  { label: "Home", href: "#home" },
  { label: "Impact", href: "#impact" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Currently", href: "#currently" },
];

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

export const careerTimeline = [
  {
    id: "tbo-2",
    company: "TBO.com",
    title: "Manager – Sales Effectiveness",
    dates: "July 2024 – Present",
    location: "India",
    description:
      "Leading sales effectiveness analytics and commercial strategy initiatives. Owning analytics-led growth programs, performance optimization, and data-driven decision systems for the commercial team.",
    achievements: [
      "Owned development of market opportunity framework across APAC markets ($65M+ opportunity identified)",
      "Led analytics-driven sales effectiveness initiatives supporting 2× YoY GTV growth",
      "Designed and implemented dormant partner recovery program (80% reactivation rate)",
      "Built commercial intelligence layer improving ROI by 15.7%",
    ],
    tools: ["SQL", "Power BI", "Python", "Excel", "Metabase"],
  },
  {
    id: "tbo-1",
    company: "TBO.com",
    title: "Associate Manager – Sales Effectiveness",
    dates: "June 2022 – June 2024",
    location: "India",
    description:
      "Developed and executed analytics initiatives to improve sales effectiveness and commercial performance. Collaborated with stakeholders to translate data insights into actionable strategies.",
    achievements: [
      "Built performance dashboards and KPI frameworks for commercial teams",
      "Conducted partner segmentation and opportunity prioritization analysis",
      "Led projects analyzing sales productivity, partner health, and revenue performance",
    ],
    tools: ["SQL", "Power BI", "Excel", "Python"],
  },
  {
    id: "better",
    company: "Better.com",
    title: "Business Analyst – Disclosure Audit",
    dates: "July 2021 – May 2022",
    location: "India",
    description:
      "Analyzed disclosure processes and audit workflows. Supported financial and compliance operations through data analysis and process optimization.",
    achievements: [
      "Conducted audit analysis and disclosure process reviews",
      "Developed analytical frameworks for compliance tracking",
    ],
    tools: ["SQL", "Excel", "Python"],
  },
];

export const education = [
  {
    institution: "Madhav University",
    degree: "B.Tech",
    field: "Computer Science",
    dates: "2017 – 2021",
  },
];

export const skillsFramework = {
  strategy: [
    "Growth Strategy",
    "Sales Effectiveness",
    "Commercial Analytics",
    "Revenue Analysis",
    "Performance Management",
    "Segmentation",
    "Opportunity Prioritization",
    "ROI Analysis",
    "Business Intelligence",
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

export const workInitiatives = [
  {
    number: "01",
    category: "REVENUE GROWTH · APAC",
    title: "APAC Commercial Growth & Revenue Opportunity",
    context:
      "APAC markets operated without clear visibility into where meaningful revenue opportunities existed — missing gaps between market demand, competitive positioning, and internal partner capability across 12+ countries.",
    whatIOwned:
      "Owned the development of a market opportunity framework combining demand analysis, competitive positioning, and partner capability assessment across APAC. Built the analytical models, led cross-functional alignment with commercial teams, and established the prioritization framework for opportunity pursuit.",
    approach:
      "Analyzed market data, competitor positioning, and partner capability across 12+ APAC markets. Built a comprehensive scoring model to identify and prioritize revenue opportunities based on market size, competitive intensity, and partner readiness.",
    whatChanged:
      "$65M+ in unrealized revenue opportunity identified and validated across APAC markets, with clear market-by-market and account-level priorities for commercial teams to pursue.",
    metric: "$65M+",
    metricLabel: "Revenue Opportunity Identified",
    tools: ["SQL", "Excel", "Power BI"],
  },
  {
    number: "02",
    category: "PARTNER GROWTH · RETENTION",
    title: "Dormant Partner Recovery & Reactivation Program",
    context:
      "A significant portion of the partner base had remained inactive for 12+ months — representing both lost revenue and an untapped pool of businesses that could be brought back to growth with the right approach.",
    whatIOwned:
      "Owned partner segmentation strategy by recovery potential and business value. Designed the re-engagement program, built the prioritization logic, and worked with the commercial team to structure the outreach and reactivation approach for different partner tiers.",
    approach:
      "Segmented dormant partners using RFM analysis and potential value scoring. Built a tiered re-engagement framework with targeted outreach strategies. Tracked reactivation rates, recovery economics, and success factors.",
    whatChanged:
      "80% of dormant partners successfully reactivated, recovering meaningful incremental GTV and proving the business case for a proactive retention and reactivation framework.",
    metric: "80%",
    metricLabel: "Dormant Business Recovered",
    tools: ["Python", "SQL", "Power BI"],
  },
  {
    number: "03",
    category: "GTV GROWTH · SALES EFFECTIVENESS",
    title: "Analytics-Led Sales Effectiveness & GTV Growth",
    context:
      "Scaling GTV required moving beyond reactive sales activity to a data-driven approach that identified where sales effort could create the highest commercial impact and how sales productivity could systematically improve.",
    whatIOwned:
      "Owned the analytics strategy for sales effectiveness, developing performance frameworks, opportunity prioritization models, and executive dashboards for growth tracking. Built the systems and analytical approaches that enabled sales teams to focus on highest-impact opportunities.",
    approach:
      "Developed opportunity scoring models to prioritize sales efforts. Built performance dashboards tracking conversion, productivity, and pipeline health. Conducted cohort analysis to identify high-impact sales patterns and replicate success factors.",
    whatChanged:
      "Sales teams gained real-time visibility into opportunity prioritization and performance metrics. Analytics-led initiatives contributed to 2× YoY GTV growth objectives with improved focus on highest-leverage opportunities.",
    metric: "2×",
    metricLabel: "YoY GTV Growth Supported",
    tools: ["SQL", "Power BI", "Excel", "Python"],
  },
  {
    number: "04",
    category: "COMMERCIAL INTELLIGENCE · BI",
    title: "Commercial Intelligence & Performance Decision Systems",
    context:
      "Commercial teams needed real-time visibility into performance, sales effectiveness, opportunity gaps, and commercial health — but were working from disconnected data sources and manual reporting that slowed decision-making.",
    whatIOwned:
      "Owned the design and build of the commercial intelligence layer — architecting integrated dashboards, establishing metrics definitions, and creating analytical frameworks that brought performance, revenue, sales, and market data into a single decision-making system.",
    approach:
      "Designed an integrated BI architecture combining multiple data sources. Built executive dashboards with leading and lagging indicators. Created self-service analytics capability for commercial teams.",
    whatChanged:
      "Commercial teams gained unified visibility into performance and opportunity, enabling faster, more confident decisions. Measured through a 15.7% improvement in commercial ROI through more efficient capital allocation and targeted growth investments.",
    metric: "15.7%",
    metricLabel: "ROI Improvement",
    tools: ["Power BI", "SQL", "Excel", "Metabase"],
  },
];

export const hoWIWorkFramework = [
  {
    step: 1,
    title: "Understand",
    description: "Frame the business problem, constraints, and opportunity.",
  },
  {
    step: 2,
    title: "Analyze",
    description: "Turn data into insight. Find patterns, validate hypotheses.",
  },
  {
    step: 3,
    title: "Prioritize",
    description: "Identify the highest-leverage opportunity or solution.",
  },
  {
    step: 4,
    title: "Execute",
    description: "Work with stakeholders to turn insight into action.",
  },
  {
    step: 5,
    title: "Measure",
    description: "Track outcomes, learn, and continuously improve.",
  },
];
