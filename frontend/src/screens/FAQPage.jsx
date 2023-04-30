import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <FAQ />
      <Footer />
    </div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {/* return policy*/}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(1)}>
            {activeTab === 1 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium-text-gray-900 pl-3">
              What is your return policy?
            </span>
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                If you're not satisfied with your purchase, we accept returns within 30 days of
                delivery. To initiate a return, please email us at
                <strong> DoNotReturn@please.com</strong> with your order number and a brief
                explanation of why you're returning the item.
              </p>
            </div>
          )}
        </div>

        {/* track order */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(2)}>
            {activeTab === 2 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium text-gray-900 pl-3">How do I track my order?</span>
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                You can track your order by clicking the tracking link in your shipping confirmation
                email, or by logging into your account on our website and viewing the order details.
              </p>
            </div>
          )}
        </div>

        {/* customer support */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(3)}>
            {activeTab === 3 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium text-gray-900 pl-3">
              How do I contact customer support?
            </span>
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                You can contact our customer support team by emailing us at
                support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours
                of 9am and 5pm EST, Monday through Friday.
              </p>
            </div>
          )}
        </div>
        {/* change or cancel order */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(4)}>
            {activeTab === 4 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium text-gray-900 pl-3">
              Can I change or cancel my order?
            </span>
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                Unfortunately, once an order has been placed, we are not able to make changes or
                cancellations. If you no longer want the items you've ordered, you can return them
                for a refund within 30 days of delivery.
              </p>
            </div>
          )}
        </div>
        {/* international shipping */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(5)}>
            {activeTab === 5 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium text-gray-900 pl-3">
              Do you offer international shipping?
            </span>
          </button>
          {activeTab === 5 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                Currently, we only offer shipping within the United States.
              </p>
            </div>
          )}
        </div>
        {/* payment methods */}
        <div className="border-b border-gray-200 pb-4">
          <button className="flex items-center w-full" onClick={() => toggleTab(6)}>
            {activeTab === 6 ? (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            <span className="text-lg font-medium text-gray-900 pl-3">
              What payment methods do you accept?
            </span>
          </button>
          {activeTab === 6 && (
            <div className="mt-4">
              <p className="text-base text-gray-500 pl-9">
                We accept visa,mastercard,paypal payment method also we have cash on delivery
                system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
