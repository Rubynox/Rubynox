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
    title: "Web Development",
    slug: "web-development",
    icon: PanelsTopLeft,
    short: "Fast websites and web apps that explain your business clearly and turn visitors into leads.",
    solves: "Outdated websites, slow pages, unclear service pages, and weak lead capture.",
    for: "Agencies, clinics, consultants, service businesses, local brands, and growing companies.",
    benefits: ["Clear service pages", "Fast loading", "Mobile-first design", "SEO-ready structure"],
    explanation:
      "We build websites and web apps that are easy to use, easy to manage, and ready for real customers."
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
    short: "Practical AI tools that answer questions, sort leads, and reduce repeated work.",
    solves: "Slow replies, repeated questions, manual sorting, and support teams spending time on routine work.",
    for: "Support teams, sales teams, service businesses, and companies with repeated customer questions.",
    benefits: ["Faster response", "Lead qualification", "Human handoff", "Simple controls"],
    explanation:
      "We add AI where it saves time without making your process harder to manage."
  },
  {
    title: "Business Automation",
    slug: "business-automation",
    icon: Workflow,
    short: "Automation for follow-ups, reminders, approvals, reports, and daily tasks.",
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
    title: "Service Business CRM",
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
    mobileSummary: "Replaced spreadsheet reporting with one clean operations dashboard.",
    problem:
      "Managers used multiple spreadsheets to track orders, revenue, delays, and workload.",
    solution:
      "Created a dashboard with key data, filters, daily summaries, and clear status tracking.",
    result:
      "Reports became easier to read and review meetings became faster."
  },
  {
    title: "AI Assisted Support",
    mobileSummary: "Handled routine queries and routed serious enquiries to the team.",
    problem:
      "Customer questions were repeated often, but important enquiries still needed people.",
    solution:
      "Built a guided assistant for common questions, lead details, and WhatsApp handoff.",
    result:
      "Routine replies became faster and valuable leads reached the team quickly."
  }
];
