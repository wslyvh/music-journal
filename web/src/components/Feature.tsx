import { SparklesIcon, BarChartIcon, Goal, ListMusic } from "lucide-react";
import { Card } from "react-daisyui";

export const Feature = () => {
  return (
    <section className="py-8 lg:py-24" id="features">
      <div className="container">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2  md:gap-16">
          <Card className="border border-base-content/10">
            <div className="p-6">
              <ListMusic className="text-primary" size={32} />
              <p className="mt-2 text-xl font-semibold">Log Practice</p>
              <p className="mt-2 text-base-content/90">
                Easily record and track your practice sessions, including audio
                recordings, to monitor your progress and identify areas for
                improvement.
              </p>
            </div>
          </Card>
          <Card className="border border-base-content/10">
            <div className="p-6">
              <Goal className="text-primary" size={32} />
              <p className="mt-2 text-xl font-semibold">Reflect</p>
              <p className="mt-2 text-base-content/80">
                Write journal entries and reflect on your sessions to gain
                insights, identify patterns, and develop strategies for
                improvement.
              </p>
            </div>
          </Card>
          <Card className="border border-base-content/10">
            <div className="p-6">
              <BarChartIcon className="text-primary" size={32} />
              <p className="mt-2 text-xl font-semibold">Track Progress</p>
              <p className="mt-2 text-base-content/80">
                View detailed statistics about your sessions, including time
                spent, areas for improvement, and achievements such as practice
                streaks and milestones reached.
              </p>
            </div>
          </Card>
          <Card className="border border-base-content/10">
            <div className="p-6">
              <SparklesIcon className="text-primary" size={32} />
              <p className="mt-2 text-xl font-semibold">Improve Your Music</p>
              <p className="mt-2 text-base-content/80">
                Use our app to streamline your practice, stay motivated, and
                achieve your musical goals, whether you're a beginner or a
                seasoned musician.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
