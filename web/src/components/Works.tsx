import mobile2Img from '@/assets/images/landing/mobile-2.png'
import {
  ArrowDownToLineIcon,
  ArrowRightIcon,
  ComponentIcon,
  PackagePlusIcon,
  RefreshCcwDotIcon,
  ScanFaceIcon,
} from 'lucide-react'
import { Button, Card } from 'react-daisyui'

export const Works = () => {
  return (
    <section className="py-8 lg:py-24" id="how-it-works">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          <div className="relative">
            <div className="flex justify-center">
              <img alt="Mobile 2" className="h-[500px]" src={mobile2Img} />
            </div>
            <div className="absolute left-8 top-[30%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center gap-3 p-3">
                  <div
                    className="flex items-center justify-center rounded-full bg-primary p-2 text-primary-content">
                    <ComponentIcon size={24} />
                  </div>
                  <div>
                    <p className="text-xl/none font-semibold">10+</p>
                    <p className="">Generative Modals</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="col-span">
            <p className="text-xl font-semibold lg:text-3xl">How it works?</p>
            <p className="mt-3 text-base">
              AI app defines goals, processes data, trains a model, predicts outputs, integrates
              user feedback for improvement, and interacts with external systems for comprehensive
              functionality.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div className="flex items-center gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <ArrowDownToLineIcon size={20} />
                </div>
                <p className="text-base">Download the latest app from store</p>
              </div>
              <div className="flex items-center gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <ScanFaceIcon size={20} />
                </div>
                <p className="text-base">Login with your account or create a new one</p>
              </div>
              <div className="flex items-center gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <RefreshCcwDotIcon size={20} />
                </div>
                <p className="text-base">Syncing all your data</p>
              </div>
              <div className="flex items-center gap-5">
                <div
                  className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                  <PackagePlusIcon size={20} />
                </div>
                <p className="text-base">Ready to generate AI content</p>
              </div>
            </div>
            <Button color={'ghost'} size={'sm'} className="mt-8">
              Read More
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
    </section>

  )
}
