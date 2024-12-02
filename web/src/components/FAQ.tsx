import { Collapse } from 'react-daisyui'

export const FAQ = () => {
  return (
    <section className="py-8 dark:bg-base-100 lg:py-24" id="faq">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-base-content">App Inquiries?</h2>
          <p className="mt-2 text-lg">Unlocking Answers: Your Guide to AI Mobile App Queries.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>What is an AI mobile app?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  An application that uses AI technologies to enhance user experiences on mobile
                  devices.
                </p>
              </Collapse.Content>
            </Collapse>
            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>How does AI work in mobile apps?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  AI processes data, trains models, and makes predictions for personalized user
                  interactions.
                </p>
              </Collapse.Content>
            </Collapse>

            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>What tasks can AI mobile apps perform?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  They can automate tasks, offer personalized recommendations, understand natural
                  language, and enhance security.
                </p>
              </Collapse.Content>
            </Collapse>

          </div>

          <div className="space-y-6">
            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>Is my data secure with AI mobile apps?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  Yes, many AI apps prioritize data security through encryption and other protective
                  measures.
                </p>
              </Collapse.Content>
            </Collapse>

            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>Can AI mobile apps learn from user interactions?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  Yes, AI mobile apps often have the capability to learn and adapt based on user
                  feedback and usage patterns, providing a more tailored experience over time.
                </p>
              </Collapse.Content>
            </Collapse>

            <Collapse icon={'plus'} className="border border-base-content/10">
              <Collapse.Title className='text-xl font-medium'>Do AI mobile apps require an internet?</Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  It depends on the app. Some AI functionalities may require internet access for
                  data processing or cloud-based services, while others can operate offline with
                  pre-trained models.
                </p>
              </Collapse.Content>
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  )
}
