import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import { CONFIG } from "@/utils/config";

export function Terms() {
  const lastUpdated = "Dec 4, 2024";

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{ backgroundImage: `url(${bgGradientImg})` }}
      ></div>
      <main className="flex-grow container py-24 lg:py-24">
        <h1 className="text-2xl font-bold">Terms of Service</h1>
        <p className="text-sm mt-2">Last updated: {lastUpdated}</p>
        <div className="divider"></div>
        <div className="prose max-w-none">
          <p>
            By using our products and services, you confirm your acceptance of,
            and agree to be bound by, these terms and conditions. This Agreement
            takes effect on the date on which you first use our products and
            services. These terms and conditions apply to all products built and
            maintained by <strong>westech</strong>, including this website and
            any other services we offer.
          </p>
          <h3>Refund Policy</h3>
          <p>
            All unused credits are refundable within 14 days of purchase. If you
            are not satisfied with our product, please contact us.
          </p>
          <h3>Product Usage</h3>
          <p>
            By using our products and services, you agree to receive product
            updates from us via the email linked with your payment account or
            the email you used to register your account. You can opt-out of
            these product updates at any time by clicking on the Unsubscribe
            link at the bottom of each email.
          </p>
          <h3>Disclaimer</h3>
          <p>
            It is not warranted that our products and services will meet your
            requirements or that their operation will be uninterrupted or
            error-free. All express and implied warranties or conditions not
            stated in this Agreement (including without limitation, loss of
            profits, loss or corruption of data, business interruption, or loss
            of contracts), so far as such exclusion or disclaimer is permitted
            under the applicable law, are excluded and expressly disclaimed.
            This Agreement does not affect your statutory rights.
          </p>
          <h3>Warranties and Limitation of Liability</h3>
          <p>
            We do not give any warranty, guarantee, or other term as to the
            quality, fitness for purpose, or otherwise of our products and
            services. We shall not be liable to you by reason of any
            representation (unless fraudulent), or any implied warranty,
            condition, or other term, or any duty at common law, for any loss of
            profit or any indirect, special, or consequential loss, damage,
            costs, expenses, or other claims (whether caused by our negligence
            or the negligence of our servants or agents or otherwise) which
            arise out of or in connection with the provision of any goods or
            services by us. We shall not be liable or deemed to be in breach of
            contract by reason of any delay in performing, or failure to
            perform, any of our obligations if the delay or failure was due to
            any cause beyond our reasonable control. Notwithstanding contrary
            clauses in this Agreement, in the event we are deemed liable to you
            for breach of this Agreement, you agree that our liability is
            limited to the amount actually paid by you for your services or
            product, which amount calculated in reliance upon this clause. You
            hereby release us from any and all obligations, liabilities, and
            claims in excess of this limitation.
          </p>
          <h3>Changes to Products and Services</h3>
          <p>
            Our products and services can change in the future, including adding
            and removing features, restricting the list of features available in
            the free/paid plan, open sourcing some parts or all of the app
            source code. In such cases, you will not receive a refund of your
            purchase (unless your purchase is still within the 14-day refund
            period).
          </p>
          <h3>Service Availability</h3>
          <p>
            Our service availability is not guaranteed. We will try our best to
            keep the service up and running, but we cannot guarantee the
            availability of the service. In the event of natural disasters,
            change of ownership, dependency service outages, and other reasons
            that make us unable to keep the service running, you will not be
            refunded (unless dependency service outages, and other reasons that
            make us unable to keep the service running, you will not be refunded
            (unless your purchase is still within the 14-day refund period).
          </p>
          <h3>Ownership of Content and Data</h3>
          <p>
            All content and data input by users ("User Content") remains the
            property of the respective user. Users grant us a worldwide,
            non-exclusive, royalty-free license to use, reproduce, distribute,
            and display User Content solely for the purpose of providing the
            services outlined in this Agreement.
          </p>
          <h3>Ownership of Software and Services</h3>
          <p>
            All rights, title, and interest in and to our platform, its
            software, services, and all related intellectual property, including
            any updates, modifications, or enhancements, are and shall remain
            the exclusive property of us and our licensors. Except for the
            limited rights expressly granted to users in this Agreement, no
            license or other rights in or to our platform or its associated
            intellectual property are granted to users, whether by implication,
            estoppel, or otherwise.
          </p>
          <h3>Third-Party Intellectual Property</h3>
          <p>
            We may integrate or provide links to third-party services. All
            third-party trademarks, service marks, logos, and intellectual
            property are the property of their respective owners. Use of these
            third-party services may be subject to separate terms and
            conditions, and users are responsible for adhering to those terms.
          </p>
          <h3>General Terms and Law</h3>
          <p>
            You acknowledge that no joint venture, partnership, employment, or
            agency relationship exists between you and us as a result of your
            use of these services. You agree not to hold yourself out as a
            representative, agent, or employee of us. You agree that we will not
            be liable by reason of any representation, act, or omission to act
            by you.
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
