// /security/ article content (specs/pages-b.md section 9). Headings and TOC entries match the live page; every paragraph is original
// placeholder copy written to the same character / line count as the original (the live text is long policy copy and is not reproduced).
// Block kinds: h3 | h4 | p (parts = strings and { href, label } links) | ul (items = strings) | embed.

export const pullQuote =
  "Security-minded teams everywhere run their most important workflows on this platform, so protecting customer information is built into how we operate. This page summarizes the practices behind our product and our company, and shows how to reach us if you spot a problem. We hope it makes clear how seriously we take the trust placed in us every day, and how much we value the."

export const blocks = [
  { kind: 'h3', text: "Compliance" },
  { kind: 'p', parts: ["Our information security program follows a recognized industry framework and is reviewed on a regular cycle by independent assessors. The policies that guide it describe how we protect the confidentiality, integrity and availability of the systems we run, and how we handle the information customers place in our care.", {"br": true}, "Auditors test those controls each year and report on the results, and we share summaries of that work when customers ask. We know that holding a certification is never the same as being secure, so we treat the framework as a baseline and keep adding safeguards that go beyond the checklist, measured against how attackers really behave. When expectations change, we update our practices and document what moved. We review this regularly."] },
  { kind: 'h3', text: "Security in the product" },
  { kind: 'p', parts: ["We provide a range of security features inside the product that let each customer shape protection around their own risk and policies, from sign-in."] },
  { kind: 'h4', text: "Customized session timeout" },
  { kind: 'p', parts: ["Administrators can set how long a session may stay open before a user has to sign in again, matching your own access policy."] },
  { kind: 'h4', text: "SSO/SAML" },
  { kind: 'p', parts: ["Single sign-on through SAML is available on every plan, and we encourage customers to turn it on for their whole tenant."] },
  { kind: 'h4', text: "Granular control over data retention" },
  { kind: 'p', parts: ["Customer data should be kept only as long as it is useful. Retention settings let teams choose how long records stay in the platform, so information leaves."] },
  { kind: 'h4', text: "Cloud or on-premise deployment" },
  { kind: 'p', parts: ["The platform runs as a hosted cloud service that we operate, or inside your own environment when your requirements call for it, so teams with strict residency rules can keep everything within boundaries they control."] },
  { kind: 'h4', text: "Full audit log capabilities" },
  { kind: 'p', parts: ["Whenever someone changes a workflow, a setting or a permission, an entry is written to the audit log, available from both the interface and the API for review and."] },
  { kind: 'h4', text: "Control access to stories and other resources" },
  { kind: 'p', parts: ["Using ", {"href": "/product/teams/", "label": "teams"}, ", you can separate users, credentials and resources into groups."] },
  { kind: 'h3', text: "Security in the organization" },
  { kind: 'p', parts: ["Security matters just as much in how our company operates as it does in the product itself. Below is an overview of the measures we have put in place across the organization, from access to training and."] },
  { kind: 'h4', text: "BeyondCorp" },
  { kind: 'p', parts: ["We follow a zero trust approach that moves access decisions away from the network perimeter and onto individual users and devices. Employees reach internal systems securely from any location, and no one needs a traditional VPN to."] },
  { kind: 'h4', text: "Access to production systems" },
  { kind: 'p', parts: ["Production access is limited to a small group of employees. Contractors and vendors do not have it, and customer data is not permitted to leave the production environment. The list of people who hold access is reviewed on a regular schedule and trimmed whenever."] },
  { kind: 'h4', text: "Security and privacy council" },
  { kind: 'p', parts: ["A cross-functional group sponsored by senior leadership meets on a regular cadence to discuss security and privacy matters. Its agenda covers recent incidents, upcoming features that touch customer information, and how each risk is being handled, so that decisions are shared across the company and followed through on."] },
  { kind: 'h4', text: "Awareness training" },
  { kind: 'p', parts: ["Every employee completes security awareness training when they join, and again every year after that to."] },
  { kind: 'h4', text: "Security automation" },
  { kind: 'p', parts: ["We rely heavily on automation to flag suspicious activity across our production and corporate environments."] },
  { kind: 'h3', text: "The Tines Trust Center" },
  { kind: 'p', parts: ["Our ", {"href": "https://trust.tines.com/", "label": "Trust Center"}, " is where customers can obtain up-to-date security reports and attestations, including documents such as:"] },
  { kind: 'ul', items: ["SOC2 Type II Report", "Results of our most recent vulnerability scan", "List of Tines security policies and procedures", "Results of a third-party risk assessment"] },
  { kind: 'p', parts: ["Because of how sensitive these documents are, you may be asked to sign a non-disclosure agreement before they are shared with."] },
  { kind: 'h3', text: "Reporting security vulnerabilities" },
  { kind: 'h4', text: "Responsible Disclosure" },
  { kind: 'p', parts: ["As a security company we are committed to offering a safe and trusted platform to our users. We value the researchers and others who keep a careful eye out and report issues responsibly. If you find a vulnerability, please send it through our Vulnerability Disclosure Program, which is hosted by an independent provider and reviewed by our team as soon as it."] },
  { kind: 'p', parts: ["We ask that you adhere to the following guidelines:"] },
  { kind: 'ul', items: ["Do not disclose the vulnerability outside of the VDP", "Do not violate any laws", "Do not disrupt services (DoS/DDoS)", "Do not access, change or destroy any accounts or data that are not yours"] },
  { kind: 'h4', text: "Out of Scope" },
  { kind: 'ul', items: ["HTTPS / TLS security headers suggestions", "Direct testing of 3rd parties", "SPF / DMARC / DKIM / DNSSEC suggestions", "Banner/version disclosure", "Social engineering / phishing / spam"] },
  { kind: 'embed' },
]

export const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
