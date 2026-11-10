import type { ReactNode } from "react";
import { BufferRow } from "./Buffer";
import Winbar from "./Winbar";
import ExtLink from "./ExtLink";
import Tags from "./Tags";

type Entry = {
  name: string;
  link?: { href: string; label: string };
  role?: string;
  dates?: string;
  open?: boolean;
  /** Shown on the dim fold row when the entry is closed. */
  summary: string;
  bullets: ReactNode[];
  tags?: string[];
};

const ENTRIES: Entry[] = [
  {
    name: "Flowdia",
    link: { href: "https://flowdia.ai/", label: "flowdia.ai" },
    role: "Technical Co-Founder",
    dates: "12/2025 – 10/2026",
    open: true,
    summary: "10-agent LLM pipeline that turns one prompt into a full-stack app",
    bullets: [
      <>
        <b>10 agents</b> (PM, Architect, Developer, QA, Security and more) turn one prompt into a production-ready
        full-stack app. Each app gets its own frontend, API, <code>MCP</code> server, Postgres and preview + prod
        environments, sandboxed with gVisor.
      </>,
      <>Orchestrated with Elixir/Phoenix on Hetzner with Nomad, Consul and Traefik.</>,
      <>
        Routed across Anthropic, MiniMax, GLM, Kimi and DeepSeek. A rate manager does request pacing, circuit
        breaking and per-provider health scoring, so the pipeline keeps running under rate limits and provider
        failures.
      </>,
      <>
        The Developer agent was ~80% of inference spend over 140+ tool-call rounds. Cut it with prompt caching,
        dropping thinking blocks and context pruning, removing the quadratic token growth: <b>~88% gross margins</b>.
      </>,
      <>
        Found a cryptojacking job on the Nomad cluster that came from a user preview environment through the internal
        network. Traced it and locked down egress between user workloads and the control plane.
      </>,
      <>
        Generated apps evolve across turns, keeping schemas, UI state and architecture decisions instead of
        regenerating from scratch.
      </>,
    ],
    tags: ["elixir", "phoenix", "nomad", "consul", "traefik", "gvisor", "mcp"],
  },
  {
    name: "Accredible",
    role: "Senior → Team Lead → Staff",
    dates: "02/2020 – 06/2025",
    open: true,
    summary: "billing core, analytics at scale, team lead",
    bullets: [
      <>
        Redesigned and reimplemented the billing core, which helped keep big customers from churning. Stopped credits
        from being deducted twice, using optimized locks that don&apos;t sacrifice performance.
      </>,
      <>
        Rebuilt the analytics service as Ruby lambdas on Citus (self-managed), serving <b>40M+ requests a week</b>. Did
        all infra with Terraform and Ansible. Made slow endpoints and queries more than <b>3x faster</b>.
      </>,
      <>
        Led the analytics team of 5–6 senior and mid-level engineers, PM and QA, with goals tied to business metrics.
        Ran incident reviews, RCAs and production disaster recoveries. Mentored senior newcomers and juniors.
      </>,
    ],
    tags: ["ruby", "citus", "terraform", "ansible", "aws"],
  },
  {
    name: "Bardy",
    role: "Technical Co-Founder (side project)",
    dates: "10/2020 – 06/2025",
    summary: "real-time website feedback tool, taken to paying customers",
    bullets: [
      <>A real-time website feedback tool taken to paying customers.</>,
      <>
        Elixir/Phoenix API and reverse proxy so any website can be embedded in an iframe, a React app for customers,
        embeddable vanilla JS inside proxied websites, and a Chrome extension for complex websites.
      </>,
    ],
    tags: ["elixir", "phoenix", "react", "javascript"],
  },
  {
    name: "Walla",
    link: { href: "https://hellowalla.com/", label: "hellowalla.com" },
    role: "Senior Software Engineer",
    dates: "06/2025 – 05/2026",
    summary: "churn prediction engine ported to Ruby, studio performance dashboards",
    bullets: [
      <>
        Ported a Python churn prediction engine to Ruby on Sidekiq background jobs on AWS ECS, and built studio
        performance reporting dashboards.
      </>,
    ],
    tags: ["ruby", "sidekiq", "aws-ecs"],
  },
  {
    name: "Toptal clients",
    role: "Senior Software Engineer (freelance)",
    dates: "04/2019 – present",
    summary: "TaskRabbit, Corsair Gaming, Spin, Lineup, CodePath.org",
    bullets: [
      <>
        <b>TaskRabbit:</b> upgraded a very large legacy codebase from Rails 4 to Rails 5 and Ruby to 2.5.x without
        disruptions, and fixed critical security vulnerabilities in backend and frontend.
      </>,
      <>
        <b>Corsair Gaming:</b> fixed bugs causing serious user experience issues and added features that made
        reserving Sensei slots faster, on Rails, PostgreSQL and AngularJS.
      </>,
      <>
        <b>Spin (Tier Mobility):</b> Rails backend bugs and features that improved app performance, leading to more
        users and more successful scooter rentals.
      </>,
      <>
        <b>Lineup:</b> built an insights dashboard on a 3rd party analytics tool using large complex SQL queries,
        stabilized a Kubernetes project that creates a QA environment per GitHub pull request, and fixed bugs and
        added features across backend, frontend and infra.
      </>,
      <>
        <b>CodePath.org</b> (<ExtLink href="http://codepath.org/">codepath.org</ExtLink>): rewrote a PowerShell script
        as a structured Ruby on Rails project and brought encrypted credentials, db migrations and Active Record into
        a non-Rails project, with 100% test coverage on every service.
      </>,
    ],
  },
  {
    name: "Earlier work",
    summary: "PageInbox, Diatomz, Appenza Studio, PassApp",
    bullets: [
      <>
        PageInbox, an embeddable chat like Intercom, plus Reachbird.io (
        <ExtLink href="http://reachbird.io/">reachbird.io</ExtLink>), Talkcircle and an events system for OTP bank at
        Verycreatives (02/2017 – 01/2019).
      </>,
      <>Real-time chat between nurseries and parents, plus real-time notifications, at Diatomz (10/2017 – 01/2019).</>,
      <>Built, deployed and maintained 14 distributed microservices at Appenza Studio (06/2015 – 02/2017).</>,
      <>Tech Lead at PassApp (01/2019 – 02/2020): mentored 5+ developers and fixed critical bugs and security vulnerabilities.</>,
    ],
  },
];

export default function ShippedSection() {
  return (
    <section id="shipped" className="buffer">
      <Winbar name="shipped.md" filetype="markdown" />
      <BufferRow as="h2" cursor>
        <span className="mk" aria-hidden="true">## </span>shipped
      </BufferRow>
      {ENTRIES.map((e) => {
        const lines = e.bullets.length + (e.tags ? 1 : 0);
        return (
          <div key={e.name} className="entry">
            <BufferRow />
            <details className="fold" open={e.open}>
              <summary>
                <h3 className="row fold__head">
                  <span className="fold__title">
                    <span className="fold__mk" aria-hidden="true">
                      <span className="fold__mk--open">▾ </span>
                      <span className="fold__mk--shut">▸ </span>
                    </span>
                    <span className="mk" aria-hidden="true">### </span>
                    {e.name}
                    {e.link ? (
                      <>
                        {" "}
                        <ExtLink href={e.link.href}>{e.link.label}</ExtLink>
                      </>
                    ) : null}
                    {e.role ? <span className="fold__role"> {e.role}</span> : null}
                  </span>
                  {e.dates ? <span className="fold__dates">{e.dates}</span> : null}
                </h3>
                <span className="row fold__hint" aria-hidden="true">
                  +-- {lines} lines: {e.summary} ·········
                </span>
              </summary>
              <ul className="list">
                {e.bullets.map((b, i) => (
                  <BufferRow as="li" key={i}>
                    <span className="bullet" aria-hidden="true">- </span>
                    {b}
                  </BufferRow>
                ))}
                {e.tags ? <Tags items={e.tags} /> : null}
              </ul>
            </details>
          </div>
        );
      })}
    </section>
  );
}
