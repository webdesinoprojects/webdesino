import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: "terms-conditions" } });
  return {
    title: page?.title || 'Terms & Conditions | WebDesino',
    description: page?.description || 'Terms and Conditions for using WebDesino services and website.',
    alternates: {
      canonical: '/terms-conditions',
    },
  };
}

export default async function TermsConditions() {
  const page = await prisma.page.findUnique({ where: { slug: "terms-conditions" } });
  const content = (page?.content as any) || {};
  const sections = content.sections || [];

  return (
    <LegalPageLayout 
      title={page?.title || "Terms & Conditions"} 
      lastUpdated={content.hero?.subtitle?.replace("Last Updated: ", "") || "10/07/2025"}
    >
      {sections.length > 1 ? (
        <div className="prose prose-slate max-w-none">
          {sections.map((s: any, i: number) => (
             <div key={i}>
               {s.title && <h2 className="text-2xl font-bold mb-4">{s.title}</h2>}
               <div dangerouslySetInnerHTML={{ __html: s.content }} />
             </div>
          ))}
        </div>
      ) : (
        <>
      <p>
        Welcome to WebDesino.com. By accessing our website or using our services, you agree to comply with and
        be bound by the following Terms and Conditions. Please read them carefully. If
        you do not agree to these terms, you should not use our site or services.
      </p>

      <h2>1. Definitions</h2>
      <ul>
        <li><strong>“We”, “Us”, “Our”</strong> refers to WebDesino.com.</li>
        <li><strong>“Client”, “You”, “Your”</strong> refers to the user or purchaser of our services.</li>
        <li><strong>“Services”</strong> refers to website development, digital marketing, branding, and any related services offered by us.</li>
      </ul>

      <h2>2. Use of Website</h2>
      <ul>
        <li>You may browse our website for personal or business use, but you may not reproduce, distribute, or modify any content without prior written permission.</li>
        <li>You agree not to use our website for any unlawful purpose or in any way that may harm WebDesino.com or its users.</li>
      </ul>

      <h2>3. Scope of Services</h2>
      <p>WebDesino.com offers digital services including but not limited to:</p>
      <ul>
        <li>Website design and development</li>
        <li>E-commerce setup</li>
        <li>SEO and digital marketing</li>
        <li>Branding and content creation</li>
        <li>Consulting and strategy</li>
      </ul>
      <p>Each service may be governed by separate contracts or proposals.</p>

      <h2>4. Payments and Invoicing</h2>
      <ul>
        <li>All services require an advance payment before work begins. This advance is non-refundable, as outlined in our Return & Refund Policy.</li>
        <li>Projects may be billed in full or in milestones depending on the scope and timeline.</li>
        <li>Payment is due within 7 days of invoicing unless otherwise agreed.</li>
      </ul>
      <p>Failure to make payments on time may result in project suspension or termination.</p>

      <h2>5. Intellectual Property</h2>
      <ul>
        <li>Upon full payment, the client will own the final deliverables, such as website files, graphics, and content—unless otherwise agreed in writing.</li>
        <li>WebDesino.com retains the right to display completed projects in portfolios or for marketing purposes, unless a confidentiality agreement has been signed.</li>
      </ul>

      <h2>6. Client Responsibilities</h2>
      <ul>
        <li>You agree to provide all necessary content, feedback, and access credentials in a timely manner.</li>
        <li>Delays in communication or approvals from your side may impact the timeline and are not the responsibility of WebDesino.com.</li>
      </ul>

      <h2>7. Revisions and Approvals</h2>
      <ul>
        <li>Projects include a limited number of revisions as outlined in the proposal. Additional revisions may incur extra charges.</li>
        <li>Once a deliverable is approved (explicitly or after 7 days without response), it is considered final.</li>
      </ul>

      <h2>8. Cancellation & Termination</h2>
      <ul>
        <li>Either party may terminate the agreement with written notice.</li>
        <li>If a project is canceled by the client, any work completed will be billed and advance payments will not be refunded.</li>
        <li>We reserve the right to refuse or terminate service to any client for inappropriate conduct, breach of terms, or unethical project demands.</li>
      </ul>

      <h2>9. Limitation of Liability</h2>
      <p>
        WebDesino.com is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or website. This includes (but is not limited to) data loss, business interruption, or third-party actions.
      </p>

      <h2>10. Confidentiality</h2>
      <p>
        Any information you share with us that is marked confidential will be treated as such. We do not sell, share, or disclose your confidential business information to unauthorized parties.
      </p>

      <h2>11. Privacy Policy</h2>
      <p>
        Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.
      </p>

      <h2>12. Modifications to Terms</h2>
      <p>
        We reserve the right to change or update these Terms and Conditions at any time. Changes will be posted on this page with a revised effective date. Continued use of the site or services after changes constitutes acceptance of the new terms.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms and Conditions are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in New Delhi.
      </p>

      <h2>14. Contact Information</h2>
      <p>
        For any questions or concerns related to these Terms, please contact us:
      </p>
      <p>
        Email: <a href="mailto:support@webdesino.com">support@webdesino.com</a><br />
        Website: <a href="https://webdesino.com">https://webdesino.com</a>
      </p>
        </>
      )}
    </LegalPageLayout>
  );
}
