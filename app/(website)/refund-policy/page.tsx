import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { transformBlogImagesInHtml } from '@/lib/transform-blog-html';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | WebDesino',
  description: 'Return and Refund Policy for WebDesino services.',
  alternates: {
    canonical: '/refund-policy',
  },
};

export default async function RefundPolicy() {
  const page = await prisma.page.findUnique({
    where: { slug: 'refund-policy' },
  });

  const content = (page?.content as any) || {};

  return (
    <LegalPageLayout title={page?.title || "Refund Policy"}>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: transformBlogImagesInHtml(content.html || '') }} />
      ) : (
        <>
      <p>
        At WebDesino, we specialize in providing high-quality Website Development, Digital Marketing, SEO Services, App Development, and IT
        solutions tailored to businesses of all sizes. Our focus is on delivering measurable
        results, building strong digital foundations, and helping our clients grow their
        online presence.
      </p>
      <p>
        Because our services involve professional expertise, strategic planning, and
        immediate allocation of resources, we follow a strict <strong>No Refund Policy</strong>. This document outlines our approach to refunds and ensures full transparency
        for our clients.
      </p>

      <h2>Why Refunds Are Not Possible for Service-Based Businesses</h2>
      <p>
        Unlike product-based businesses, service-based businesses like WebDesino do not
        operate with tangible goods that can be returned or exchanged. Once we begin a
        project:
      </p>
      <ul>
        <li>Time and resources are allocated immediately to research, planning, design, and execution.</li>
        <li>Highly skilled professionals are assigned to your project, and their time cannot be reversed or refunded.</li>
        <li>Our work, such as strategy planning, SEO optimization, or digital ad campaigns, starts delivering value right from day one.</li>
      </ul>
      <p>Therefore, refunds are not applicable once the project has started.</p>

      <h2>Our Refund Policy in Detail</h2>
      <p>To maintain clarity and trust, below are the key points of our refund policy:</p>

      <h3>Non-Refundable Payments</h3>
      <ul>
        <li>All payments made towards Website Development, Digital Marketing, SEO, or App Development services are final and non-refundable.</li>
        <li>This applies to consultation fees, advance deposits, milestone-based payments, and full project fees.</li>
      </ul>

      <h3>Project Cancellation</h3>
      <ul>
        <li>If a client chooses to cancel a project midway, no refund will be provided for the work already completed.</li>
        <li>However, depending on the stage of the project, we may allow the client to use the deliverables created up to the cancellation date.</li>
      </ul>

      <h3>Digital Marketing Campaigns</h3>
      <ul>
        <li>Fees paid for Google Ads, Meta Ads, or other ad campaigns are directly spent with third-party platforms. These are non-refundable as WebDesino does not control external ad budgets.</li>
      </ul>

      <h3>SEO and Ranking Services</h3>
      <ul>
        <li>SEO is a time-intensive process that requires consistent effort and cannot guarantee exact positions on search engines (due to ever-changing algorithms). Payments for SEO services are therefore non-refundable.</li>
      </ul>

      <h3>App & Website Development</h3>
      <ul>
        <li>Payments made for design, coding, integrations, or testing cannot be refunded once work has started, as technical hours and expertise are already invested.</li>
      </ul>

      <h2>Commitment to Client Satisfaction</h2>
      <p>
        While we do not provide refunds, we prioritize client satisfaction in every
        project. Our commitment includes:
      </p>
      <ul>
        <li><strong>Transparent Communication</strong> – Clients are kept updated at every stage of the project.</li>
        <li><strong>Agreed Scope of Work</strong> – We strictly follow the service agreement to ensure clarity of deliverables.</li>
        <li><strong>Revisions and Adjustments</strong> – Reasonable revisions are provided as per project scope to ensure the final outcome meets expectations.</li>
        <li><strong>Long-Term Support</strong> – We provide guidance and support even after project completion, depending on the service package selected.</li>
      </ul>

      <h2>Protecting Your Investment</h2>
      <p>
        At WebDesino, we understand that every business invests valuable money and trust when
        choosing a digital partner. Our No Refund Policy is designed not to limit you, but to
        ensure we can deliver dedicated services, focused effort, and professional results without disruption.
      </p>
      <p>
        We strongly recommend that clients review project details, service scope, and
        timelines carefully before making payment. Our team is always available for
        consultation to clarify any doubts before the start of a project.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions regarding this Refund Policy or want to discuss your
        project before getting started, please reach out to us:
      </p>
      <p>
        Email: <a href="mailto:support@webdesino.com">support@webdesino.com</a><br />
        Phone: <a href="tel:+919310851557">+91 93108 51557</a><br />
        Website: <a href="https://webdesino.com">https://webdesino.com</a>
      </p>
        </>
      )}
    </LegalPageLayout>
  );
}
