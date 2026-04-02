import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import { transformBlogImagesInHtml } from "@/lib/transform-blog-html";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({ where: { slug: "privacy-policy" } });
  return {
    title: page?.title || 'Privacy Policy | WebDesino',
    description: page?.description || 'Privacy Policy for WebDesino. Learn how we collect, use, and protect your personal information.',
    alternates: {
      canonical: '/privacy-policy',
    },
  };
}

export default async function PrivacyPolicy() {
  const page = await prisma.page.findUnique({ where: { slug: "privacy-policy" } });
  const content = (page?.content as any) || {};
  const sections = content.sections || [];

  return (
    <LegalPageLayout 
      title={page?.title || "Privacy Policy"} 
      lastUpdated={content.hero?.subtitle?.replace("Last Updated: ", "") || "10/07/2025"}
    >
      {sections.length > 1 ? (
        <div className="prose prose-slate max-w-none">
          {sections.map((s: any, i: number) => (
             <div key={i}>
               {s.title && <h2 className="text-2xl font-bold mb-4">{s.title}</h2>}
               <div dangerouslySetInnerHTML={{ __html: transformBlogImagesInHtml(s.content) }} />
             </div>
          ))}
        </div>
      ) : (
        <>
      <p>
        At WebDesino.com, your privacy is very important to us. This Privacy Policy outlines how we
        collect, use, disclose, and safeguard your information when you visit our website or
        engage with our services. Please read this policy carefully to understand how
        we handle your data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect personal and non-personal information through the website and during
        the course of providing our services.
      </p>

      <h3>A. Personal Information (provided by you):</h3>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Business name and details</li>
        <li>Project information and preferences</li>
        <li>Billing and payment information (via secure third-party processors)</li>
        <li>Login credentials (for platform integrations if required)</li>
      </ul>

      <h3>B. Non-Personal Information (automatically collected):</h3>
      <ul>
        <li>IP address</li>
        <li>Browser type and device information</li>
        <li>Operating system</li>
        <li>Pages visited, duration, and interactions</li>
        <li>Referring URL</li>
        <li>Cookies and tracking data</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect for the following purposes:</p>
      <ul>
        <li>To respond to inquiries and provide requested services</li>
        <li>To process payments and invoices</li>
        <li>To personalize your experience on our website</li>
        <li>To communicate about updates, promotions, or offers</li>
        <li>To improve website functionality and user experience</li>
        <li>To fulfill legal and regulatory obligations</li>
        <li>For internal analytics and performance tracking</li>
      </ul>

      <h2>3. Cookies & Tracking Technologies</h2>
      <p>
        WebDesino.com uses cookies, pixels, and similar technologies to:
      </p>
      <ul>
        <li>Remember your preferences</li>
        <li>Analyze user behavior</li>
        <li>Track marketing performance</li>
        <li>Improve overall site performance</li>
      </ul>
      <p>
        You may choose to disable cookies through your browser settings, but note that
        certain features may not function correctly as a result.
      </p>

      <h2>4. Third-Party Sharing & Integrations</h2>
      <p>
        We do not sell, trade, or rent your personal information. However, we may share your data with
        trusted third parties, including:
      </p>
      <ul>
        <li>Payment gateways (e.g., Razorpay, Stripe, PayPal)</li>
        <li>CRM and email platforms (e.g., Mailchimp, Zoho)</li>
        <li>Cloud hosting and analytics services (e.g., Google Analytics, Cloudflare)</li>
        <li>Contractors and vendors working on your project (under confidentiality agreements)</li>
      </ul>
      <p>We ensure all third-party providers adhere to secure data practices.</p>

      <h2>5. Data Security</h2>
      <p>
        We take reasonable technical and organizational precautions to prevent the loss,
        misuse, or alteration of your personal data, including:
      </p>
      <ul>
        <li>SSL encryption on our website</li>
        <li>Secure server environments</li>
        <li>Role-based access control for internal systems</li>
        <li>Regular updates and monitoring</li>
      </ul>
      <p>
        However, no method of transmission over the internet is 100% secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Depending on your location (e.g., under GDPR or CCPA), you may have the
        following rights:
      </p>
      <ul>
        <li>Right to access, correct, or delete your personal information</li>
        <li>Right to withdraw consent for marketing communications</li>
        <li>Right to restrict or object to data processing</li>
        <li>Right to request data portability</li>
      </ul>
      <p>To exercise any of these rights, email us at support@webdesino.com.</p>

      <h2>7. Data Retention</h2>
      <p>We retain personal information only for as long as necessary:</p>
      <ul>
        <li>To fulfill the purposes outlined above</li>
        <li>To comply with legal obligations</li>
        <li>To resolve disputes and enforce agreements</li>
      </ul>
      <p>
        Inactive or completed project data may be archived for future reference unless
        deletion is requested.
      </p>

      <h2>8. Children’s Privacy</h2>
      <p>
        WebDesino.com does not knowingly collect or solicit personal information from children under the
        age of 13. If we discover such information has been collected without parental consent,
        it will be deleted immediately.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically to reflect changes in our
        practices or legal requirements. Updates will be posted on this page with a revised
        “Effective Date.”
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For any questions or concerns about this Privacy Policy or how your data is
        handled, please contact:
      </p>
      <p>
        <strong>WebDesino.com</strong><br />
        Email: support@webdesino.com<br />
        Website: https://webdesino.com
      </p>
        </>
      )}
    </LegalPageLayout>
  );
}
