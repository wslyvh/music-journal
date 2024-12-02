import mobile3Img from '@/assets/images/landing/mobile-3.png'
import { BlocksIcon, ListRestartIcon, MonitorSmartphoneIcon, TrendingUpIcon } from 'lucide-react'
import { Card } from 'react-daisyui'

export const Organize = () => {
  return (
    <section className="py-8 lg:py-24" id="organize">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xl font-semibold lg:text-3xl">
              Organize your tasks. Set priorities. Boost Productivity?
            </p>
            <p className="mt-8 text-base">
              This organized feature list provides a clear overview of the AI landing page's
              capabilities, making it easier for users to understand the key functionalities of the
              app.
            </p>
            <div className="mt-8 space-y-8">
              <div className="flex items-start gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <TrendingUpIcon size={24}/>
                </div>
                <div>
                  <p className="text-base font-medium">Real-time Data Processing</p>
                  <p className="mt-1 text-base-content/80">
                    Swift processing of data for instant insights and responses. Ensure up-to-date
                    information and analysis in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <MonitorSmartphoneIcon size={24}/>
                </div>
                <div>
                  <p className="text-base font-medium">Cross-platform Compatibility</p>
                  <p className="mt-1 text-base-content/80">
                    Access the app seamlessly across various devices and platforms. Consistent
                    performance on mobile, desktop, and other platforms.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <ListRestartIcon size={24}/>
                </div>
                <div>
                  <p className="text-base font-medium">Continuous Updates and Support</p>
                  <p className="mt-1 text-base-content/80">
                    Regular updates to introduce new features and improvements. Responsive customer
                    support for any queries or issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              <img alt="Mobile 3" className="h-[500px]" src={mobile3Img} />
            </div>
            <div className="absolute end-0 top-[30%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2">
                    <BlocksIcon className="size-6 text-primary-content"/>
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">50+</p>
                    <p className="">Third Party Integrations</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
