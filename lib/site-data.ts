import {
  BarChart3,
  Bot,
  Braces,
  Blocks,
  CloudCog,
  Code2,
  LayoutDashboard,
  PanelsTopLeft,
  Smartphone,
  Workflow
} from "lucide-react";

export const services = [
  {
    title: "Corporate Web Solutions",
    slug: "web-development",
    icon: PanelsTopLeft,
    short: "Professional websites that build credibility, explain your services clearly, and turn visitors into enquiries.",
    solves: "Outdated websites, slow pages, unclear service pages, and weak lead capture.",
    for: "Agencies, clinics, consultants, service businesses, local brands, and growing companies.",
    benefits: ["Clear service pages", "Enquiry paths", "Mobile-first design", "SEO-ready structure"],
    explanation:
      "We build websites that help customers understand your business, trust your capability, and take the next step."
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: Smartphone,
    short: "Mobile apps for customers, teams, field staff, and business workflows.",
    solves: "Phone-based work, scattered updates, repeated calls, and teams that need access on the move.",
    for: "Delivery teams, service teams, founders, customer apps, and internal mobile tools.",
    benefits: ["Simple user flows", "Admin control", "Push-ready workflows", "Reliable performance"],
    explanation:
      "We create mobile apps that support daily work, from login and forms to tracking and dashboards."
  },
  {
    title: "AI Integration",
    slug: "ai-integration",
    icon: Bot,
    short: "Practical AI tools that support customer response, internal efficiency, and better requirement discovery.",
    solves: "Slow replies, repeated questions, manual sorting, and support teams spending time on routine work.",
    for: "Support teams, sales teams, service businesses, and companies with repeated customer questions.",
    benefits: ["Faster response", "Lead qualification", "Human handoff", "Simple controls"],
    explanation:
      "We add AI where it creates business value without making your process harder to manage."
  },
  {
    title: "Business Automation",
    slug: "business-automation",
    icon: Workflow,
    short: "Automation that reduces repetitive manual work across follow-ups, reminders, approvals, reports, and daily tasks.",
    solves: "Manual work, missed follow-ups, delayed approvals, and repeated status checking.",
    for: "Teams that run sales, operations, service delivery, finance, or admin workflows.",
    benefits: ["Less manual work", "Better follow-up", "Fewer delays", "Cleaner handoffs"],
    explanation:
      "We connect the steps in your workflow so tasks move forward without constant chasing."
  },
  {
    title: "CRM Systems",
    slug: "crm-systems",
    icon: LayoutDashboard,
    short: "Custom CRM systems to track leads, customers, follow-ups, and team activity.",
    solves: "Leads lost in WhatsApp, spreadsheets, calls, forms, and team chats.",
    for: "Sales teams, service businesses, consultants, agencies, and businesses with many enquiries.",
    benefits: ["Lead stages", "Follow-up reminders", "Team notes", "Sales visibility"],
    explanation:
      "We build CRM tools around your real sales process, not around features you do not use."
  },
  {
    title: "Dashboard Development",
    slug: "dashboard-development",
    icon: BarChart3,
    short: "Clean dashboards that show sales, operations, team work, and key numbers in one place.",
    solves: "Messy spreadsheets, slow reports, hidden issues, and unclear business performance.",
    for: "Owners, managers, operations teams, sales teams, and finance teams.",
    benefits: ["Live metrics", "Filters and reports", "Export options", "Clear decisions"],
    explanation:
      "We turn your data into simple screens that make daily decisions faster."
  },
  {
    title: "SaaS Development",
    slug: "saas-development",
    icon: Blocks,
    short: "SaaS products, portals, MVPs, and admin systems built for growth.",
    solves: "Unclear MVP scope, weak product structure, and systems that are hard to grow.",
    for: "Founders, agencies, internal product teams, and companies launching a digital platform.",
    benefits: ["User accounts", "Roles", "Admin panels", "Growth-ready code"],
    explanation:
      "We help you build the first useful version, then improve it with real user feedback."
  },
  {
    title: "API Integrations",
    slug: "api-integrations",
    icon: Braces,
    short: "Secure integrations that connect payments, WhatsApp, CRMs, ERPs, dashboards, and apps.",
    solves: "Double data entry, broken handoffs, and tools that do not talk to each other.",
    for: "Businesses using many tools, growing teams, and products that need external services.",
    benefits: ["Data sync", "Webhooks", "Error handling", "Secure access"],
    explanation:
      "We connect your tools so information moves smoothly and your team does less manual entry."
  },
  {
    title: "Custom Software",
    slug: "custom-software",
    icon: Code2,
    short: "Software made around your workflow when off-the-shelf tools are not enough.",
    solves: "Unique processes, tool limits, messy workarounds, and systems that do not fit your team.",
    for: "Businesses with special operations, internal teams, service companies, and growing platforms.",
    benefits: ["Built around your process", "Secure access", "Useful reports", "Room to expand"],
    explanation:
      "We design and build software that matches how your business actually works."
  },
  {
    title: "System Integration",
    slug: "system-integration",
    icon: CloudCog,
    short: "Connect existing tools into cleaner workflows with fewer gaps.",
    solves: "Disconnected tools, repeated updates, and teams switching between too many systems.",
    for: "Teams with existing software, internal tools, CRMs, payment systems, or reporting tools.",
    benefits: ["Cleaner workflows", "Less switching", "Better records", "Reliable alerts"],
    explanation:
      "We make your existing systems work together before adding anything new."
  }
];

export const caseStudies = [
  {
    title: "Nisha Engineering Website & Enquiry Flow",
    link: "https://www.nishaengineering.in/",
    industry: "Engineering & Manufacturing",
    challenge:
      "The company needed a more credible digital presence that could explain industrial capabilities clearly and guide serious buyers toward enquiry.",
    technologies: ["Next.js", "Responsive web design", "SEO-ready page structure", "Enquiry routing"],
    timeline: "Initial website launch completed as a focused corporate web project.",
    outcome:
      "A clearer manufacturing website with stronger service positioning, improved buyer confidence, and direct enquiry paths.",
    mobileSummary:
      "Established a premium corporate online presence for an engineering and manufacturing company with clearer capability positioning and enquiry paths.",
    problem:
      "The business needed a credible digital presence that communicated industrial capability, manufacturing confidence, and buyer-ready contact pathways.",
    solution:
      "Created a modern corporate website structure with focused service content, manufacturing context, responsive pages, and direct enquiry routes.",
    result:
      "Nisha Engineering now has a professional online presence that supports trust, discovery, and manufacturing enquiries."
  },
  {
    title: "Service Business CRM",
    badge: "Internal Demonstration",
    industry: "Service Business",
    challenge:
      "Show how a business can centralize enquiries from calls, forms, WhatsApp, and referrals without losing follow-ups.",
    technologies: ["CRM workflow", "Lead stages", "Reminder logic", "WhatsApp handoff"],
    timeline: "Prototype demonstration",
    outcome: "Demonstrates how enquiry tracking and follow-up visibility can reduce missed opportunities.",
    mobileSummary: "Centralized leads and follow-ups into one CRM with WhatsApp handoff.",
    problem:
      "Leads were coming from calls, forms, WhatsApp, and referrals. Follow-ups were getting missed.",
    solution:
      "Built a simple CRM with lead stages, reminders, team notes, and WhatsApp handoff.",
    result:
      "The team tracked every enquiry in one place and improved response time."
  },
  {
    title: "Operations Dashboard",
    badge: "Internal Demonstration",
    industry: "Operations & Management",
    challenge:
      "Show how managers can replace scattered spreadsheet reporting with a clearer view of daily performance.",
    technologies: ["Dashboard UI", "Filters", "Status tracking", "Report summaries"],
    timeline: "Prototype demonstration",
    outcome: "Demonstrates faster reporting reviews and clearer operational visibility.",
    mobileSummary: "Replaced spreadsheet reporting with one clean operations dashboard.",
    problem:
      "Managers used multiple spreadsheets to track orders, revenue, delays, and workload.",
    solution:
      "Created a dashboard with key data, filters, daily summaries, and clear status tracking.",
    result:
      "Reports became easier to read and review meetings became faster."
  }
];
