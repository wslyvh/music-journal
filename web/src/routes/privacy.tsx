import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import { CONFIG } from "@/utils/config";

export function Privacy() {
  const lastUpdated = "Dec 4, 2024";

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${bgGradientImg})` }}
      ></div>
      <main className="flex-grow container py-24 lg:py-24">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p className="text-sm mt-2">Last updated: {lastUpdated}</p>
        <div className="divider"></div>
        <div className="prose max-w-none">
          <p>
            We are committed to protecting your privacy and handling your
            personal data with care. This privacy policy outlines how we
            collect, use, and disclose your information when you interact with
            our products and services, including our website and any other
            services we offer. This policy applies to all products built and
            maintained by
            <strong>westech</strong>, including this website and any other
            services we offer.
          </p>
          <h3>Data Collection</h3>
          <p>
            We collect information about you to provide you with a better
            experience when using our products and services. The information we
            collect includes:
          </p>
          <ul>
            <li>
              Personal data: email address, and other information you provide
              when you register for our services or contact us.
            </li>
            <li>
              Usage data: information about how you use our services, such as
              which pages you visit and how long you spend on each page.
            </li>
            <li>
              Device data: information about the device you use to access our
              services, such as your IP address, device type, and browser type.
            </li>
          </ul>
          <h3>Data Handling</h3>
          <p>
            We use your data to provide you with our products and services, to
            improve and personalize your experience, and to communicate with
            you. We may also use your data to:
          </p>
          <ul>
            <li>Send you notifications about new features and updates.</li>
            <li>
              Provide customer support and address any questions or concerns you
              may have.
            </li>
            <li>Analyze usage data to improve our products and services.</li>
            <li>
              Customize your experience based on your preferences and behavior.
            </li>
          </ul>
          <h3>Data Disclosure</h3>
          <p>
            We do not sell your data to third parties. We may share your data
            with third-party service providers who help us operate our products
            and services, such as sending emails or providing customer support.
            We require these service providers to keep your data confidential
            and to use it only for the purposes we specify.
          </p>
          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Object to the processing of your personal data.</li>
            <li>
              Request the transfer of your personal data to another
              organization.
            </li>
          </ul>
          <h3>Account Deletion</h3>
          <p>
            You have the right to delete your user account and remove all
            associated personal data at any time. You can do this by following
            the instructions provided on our website or by contacting our
            support team.
          </p>
          <h3>Policy Updates</h3>
          <p>
            We reserve the right to update or change this policy at any time
            without prior notice. It is your responsibility to review and be
            aware of any changes to our privacy practices. By using our products
            and services, you signify your acceptance of this policy.
          </p>
          <h3>Contact</h3>
          <p>
            If you have any questions regarding this Privacy Policy, feel free
            to contact us via email at {CONFIG.CONTACT_EMAIL}. We are committed
            to protecting your privacy and maintaining a trustworthy
            relationship with our users.
          </p>
        </div>
      </main>
    </div>
  );
}
